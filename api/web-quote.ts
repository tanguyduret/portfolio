import { createHmac } from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { isIP } from 'node:net';
import { Resend } from 'resend';

type Request = IncomingMessage & { body?: unknown };
const MAX_BYTES = 10_240;
const projects = { creation: 'Création de site', refonte: 'Refonte de site', autre: 'Autre projet' };
const budgets = { 'under-1000': 'Moins de 1 000 €', '1000-2000': '1 000 à 2 000 €', 'over-2000': 'Plus de 2 000 €' };
const offers = { essentiel: 'Essentiel', professionnel: 'Professionnel', business: 'Business+' };
const fields = ['name', 'email', 'company', 'project', 'budget', 'offer', 'message', 'companyWebsite'];
const emailPattern = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+$/i;

function text(value: unknown, min: number, max: number, multiline = false) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  const normalized = multiline ? trimmed.replace(/\r\n?/g, '\n') : trimmed;
  if (normalized.length < min || normalized.length > max) return null;
  if (Array.from(normalized).some((char) => {
    const code = char.charCodeAt(0);
    return (code < 32 && !(multiline && (char === '\n' || char === '\t'))) || code === 127;
  })) return null;
  return normalized;
}

function option(value: unknown, labels: Record<string, string>, optional = false) {
  if (value === '' && optional) return '';
  return typeof value === 'string' && Object.hasOwn(labels, value) ? labels[value] : null;
}

export function validateQuote(body: unknown) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null;
  const data = body as Record<string, unknown>;
  if (Object.keys(data).some((key) => !fields.includes(key))) return null;
  if (text(data.companyWebsite ?? '', 0, 100) !== '') return null;
  const name = text(data.name, 1, 90);
  const email = text(data.email, 3, 254);
  const company = text(data.company ?? '', 0, 110);
  const project = option(data.project, projects);
  const budget = option(data.budget ?? '', budgets, true);
  const offer = option(data.offer ?? '', offers, true);
  const message = text(data.message, 20, 2500, true);
  if (!name || !email || !emailPattern.test(email) || company === null || !project || budget === null || offer === null || !message) return null;
  return { name, email, company, project, budget, offer, message };
}

async function readJson(req: Request) {
  if (req.body !== undefined) {
    const raw = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    return Buffer.byteLength(raw) <= MAX_BYTES ? JSON.parse(raw) as unknown : null;
  }
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of req.iterator({ destroyOnReturn: false })) {
    const bytes = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += bytes.length;
    if (size > MAX_BYTES) { req.resume(); return null; }
    chunks.push(bytes);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown;
}

// Atomic across function instances. Counters expire; rejected traffic cannot renew them.
const quotaScript = `
local ip = tonumber(redis.call('GET', KEYS[1]) or '0')
local total = tonumber(redis.call('GET', KEYS[2]) or '0')
if ip >= 4 or total >= 40 then return 0 end
if redis.call('INCR', KEYS[1]) == 1 then redis.call('EXPIRE', KEYS[1], 900) end
if redis.call('INCR', KEYS[2]) == 1 then redis.call('EXPIRE', KEYS[2], 3600) end
return 1`;

export default async function handler(req: Request, res: ServerResponse) {
  const reply = (status: number) => {
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end(JSON.stringify({ ok: status === 200 }));
  };
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return reply(405); }
  const allowedOrigins = new Set(['https://tanguyduret.com']);
  for (const host of [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL]) {
    if (host?.endsWith('.vercel.app')) allowedOrigins.add(`https://${host}`);
  }
  if (!req.headers.origin || !allowedOrigins.has(req.headers.origin)) return reply(403);
  if (req.headers['content-type']?.split(';')[0].trim().toLowerCase() !== 'application/json') return reply(415);
  if (req.headers['content-length'] && Number(req.headers['content-length']) > MAX_BYTES) return reply(413);

  let data;
  try { data = validateQuote(await readJson(req)); } catch { return reply(400); }
  if (!data) return reply(400);

  const { WEB_QUOTE_REDIS_URL: url, WEB_QUOTE_REDIS_TOKEN: token, WEB_QUOTE_HASH_SECRET: secret, WEB_QUOTE_FROM_EMAIL: from, RESEND_API_KEY: key } = process.env;
  if (!url || !token || !secret || secret.length < 32 || !from || !key) return reply(503);
  try {
    const endpoint = new URL(url);
    if (endpoint.protocol !== 'https:' || !endpoint.hostname.endsWith('.upstash.io')) return reply(503);
    const forwarded = req.headers['x-vercel-forwarded-for'];
    const candidate = typeof forwarded === 'string' ? forwarded.trim() : '';
    if (!isIP(candidate)) return reply(503);
    const bucket = createHmac('sha256', secret).update(candidate).digest('hex');
    const namespace = `web-quote:${process.env.VERCEL_ENV === 'production' ? 'prod' : 'preview'}`;
    const limit = await fetch(endpoint, {
      method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(['EVAL', quotaScript, 2, `${namespace}:ip:${bucket}`, `${namespace}:total`]),
      signal: AbortSignal.timeout(3500),
    });
    if (!limit.ok) return reply(503);
    const { result } = await limit.json() as { result?: number };
    if (result === 0) return reply(429);
    if (result !== 1) return reply(503);
  } catch { return reply(503); }

  try {
    const { data: sent, error } = await new Resend(key).emails.send({
      from, to: 'tanguyduretpro@gmail.com', replyTo: data.email,
      subject: 'Nouvelle demande de devis · Tanguy Duret Web Studio',
      text: [
        `Nom : ${data.name}`, `E-mail : ${data.email}`, `Entreprise : ${data.company || 'Non précisée'}`,
        `Type de projet : ${data.project}`, `Budget : ${data.budget || 'À définir'}`, `Offre : ${data.offer || 'À définir'}`,
        '', 'Description :', data.message,
      ].join('\n'),
    });
    return reply(!error && sent?.id ? 200 : 502);
  } catch { return reply(502); }
}
