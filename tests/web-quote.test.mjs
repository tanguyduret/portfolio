import assert from 'node:assert/strict';
import { test } from 'node:test';
import handler, { validateQuote } from '../api/web-quote.ts';

const quote = {
  name: 'Camille Test', email: 'camille@example.test', company: '', project: 'creation',
  budget: '', offer: 'business', message: 'Je cherche un site vitrine pour présenter mes services.', companyWebsite: '',
};

async function submit({ headers, ...request } = {}) {
  const response = { headers: {} };
  await handler({ method: 'POST', body: quote, ...request, headers: {
    origin: 'https://tanguyduret.com', 'content-type': 'application/json',
    'x-vercel-forwarded-for': '192.0.2.1', ...headers,
  } }, {
    setHeader(name, value) { response.headers[name] = value; },
    writeHead(status, headers) { response.status = status; Object.assign(response.headers, headers); },
    end(body) { response.payload = JSON.parse(body); },
  });
  return response;
}

test('structured fields, content bounds and honeypot', () => {
  assert.equal(validateQuote(quote)?.offer, 'Business+');
  for (const body of [null, [], { ...quote, project: 'toString' }, { ...quote, companyWebsite: 'filled' },
    { ...quote, email: 'camille@example.test\nCc:someone@example.test' }, { ...quote, unexpected: 1 },
    { ...quote, message: 'x'.repeat(2501) }]) assert.equal(validateQuote(body), null);
});

test('request validation, quota and delivery status with mocked providers', async (t) => {
  const assertReply = async (request, status) => {
    const response = await submit(request);
    assert.equal(response.status, status);
    assert.deepEqual(response.payload, { ok: status === 200 });
    assert.equal(response.headers['Cache-Control'], 'no-store');
    return response;
  };
  const sandboxEnv = {
    WEB_QUOTE_REDIS_URL: 'https://studio-test.upstash.io', WEB_QUOTE_REDIS_TOKEN: 'test',
    WEB_QUOTE_HASH_SECRET: 'a-fake-secret-used-only-in-tests-thirty-two-characters',
    WEB_QUOTE_FROM_EMAIL: 'studio@example.test', RESEND_API_KEY: 're_test',
  };
  const saved = Object.fromEntries(Object.keys(sandboxEnv).map((key) => [key, process.env[key]]));
  Object.assign(process.env, sandboxEnv);
  t.after(() => {
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });

  let redisResult = 1;
  let resendStatus = 200;
  let calls = 0;
  t.mock.method(globalThis, 'fetch', async (input, init) => {
    calls++;
    const url = new URL(input.toString());
    const payload = JSON.parse(init.body);
    if (url.hostname === 'studio-test.upstash.io') {
      assert.equal(payload[0], 'EVAL');
      assert.match(payload[3], /^web-quote:(preview|prod):ip:[0-9a-f]{64}$/);
      assert.ok(!init.body.includes('192.0.2.1') && !init.body.includes(quote.email));
      return Response.json({ result: redisResult });
    }
    assert.equal(url.href, 'https://api.resend.com/emails');
    assert.equal(payload.from, 'studio@example.test');
    assert.deepEqual([payload.to].flat(), ['tanguyduretpro@gmail.com']);
    assert.equal(payload.reply_to, quote.email);
    assert.equal(payload.html, undefined);
    assert.match(payload.text, /site vitrine/);
    return Response.json(resendStatus === 200 ? { id: 'fixture-id' } : { message: 'Test provider error' }, { status: resendStatus });
  });

  assert.equal((await assertReply({ method: 'GET' }, 405)).headers.Allow, 'POST');
  await assertReply({ headers: { origin: 'https://other.example.test' } }, 403);
  await assertReply({ headers: { 'content-type': 'text/plain' } }, 415);
  await assertReply({ headers: { 'content-length': '10241' } }, 413);
  await assertReply({ body: '{' }, 400);
  await assertReply({ body: { ...quote, companyWebsite: 'spam' } }, 400);
  await assertReply({ headers: { 'x-vercel-forwarded-for': undefined } }, 503);
  assert.equal(calls, 0);
  delete process.env.WEB_QUOTE_REDIS_TOKEN;
  await assertReply({}, 503);
  assert.equal(calls, 0);
  process.env.WEB_QUOTE_REDIS_TOKEN = sandboxEnv.WEB_QUOTE_REDIS_TOKEN;
  redisResult = 0;
  await assertReply({}, 429);
  assert.equal(calls, 1);
  redisResult = 1;
  resendStatus = 422;
  await assertReply({}, 502);
  resendStatus = 200;
  await assertReply({}, 200);
  assert.equal(calls, 5);
});
