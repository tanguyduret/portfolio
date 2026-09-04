import { Resend } from 'resend';

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  company?: string;
  activity?: string;
  location?: string;
  locationCount?: string;
  supportNeed?: string;
  contactMethod?: string;
  message?: string;
  website?: string;
};

const requiredFields = [
  'firstName',
  'lastName',
  'company',
  'activity',
  'location',
  'locationCount',
  'contactMethod',
] as const;

const MAX_REQUESTS_PER_WINDOW = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1_000;
const requestLog = new Map<string, number[]>();

const clean = (value: unknown, maximumLength: number) =>
  typeof value === 'string' ? value.trim().slice(0, maximumLength) : '';

const getClientIp = (req: any) => {
  const forwarded = req.headers?.['x-forwarded-for'];
  const rawIp = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0];
  return (rawIp || req.socket?.remoteAddress || 'unknown').trim();
};

const hasReachedRateLimit = (ip: string) => {
  const now = Date.now();
  const recentRequests = (requestLog.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    requestLog.set(ip, recentRequests);
    return true;
  }

  recentRequests.push(now);
  requestLog.set(ip, recentRequests);
  return false;
};

export default async function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Méthode non autorisée.' });
  }

  const body = (req.body ?? {}) as ContactPayload;

  if (hasReachedRateLimit(getClientIp(req))) {
    return res.status(429).json({
      error: 'Trop de demandes ont été envoyées récemment. Merci de réessayer dans quelques minutes.',
    });
  }

  // Champ invisible : les robots le remplissent généralement, pas les visiteurs.
  if (clean(body.website, 200)) {
    return res.status(200).json({ success: true, message: 'Votre demande a bien été envoyée.' });
  }

  const payload = {
    firstName: clean(body.firstName, 100),
    lastName: clean(body.lastName, 100),
    company: clean(body.company, 200),
    activity: clean(body.activity, 200),
    location: clean(body.location, 200),
    locationCount: clean(body.locationCount, 100),
    supportNeed: clean(body.supportNeed, 200),
    contactMethod: clean(body.contactMethod, 200),
    message: clean(body.message, 2_000),
  };

  if (requiredFields.some((field) => !payload[field])) {
    return res.status(400).json({ error: 'Merci de renseigner tous les champs obligatoires.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_RECIPIENT_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !recipient || !from) {
    console.error('Configuration e-mail manquante.');
    return res.status(500).json({ error: "Le formulaire n'est pas encore configuré. Réessayez plus tard." });
  }

  try {
    const resend = new Resend(apiKey);
    const contactIsAnEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.contactMethod);
    const { error } = await resend.emails.send({
      from,
      to: [recipient],
      ...(contactIsAnEmail ? { replyTo: payload.contactMethod } : {}),
      subject: `Nouvelle demande conseil — ${payload.company}`,
      text: [
        `Prénom : ${payload.firstName}`,
        `Nom : ${payload.lastName}`,
        `Entreprise : ${payload.company}`,
        `Activité : ${payload.activity}`,
        `Ville ou zone : ${payload.location}`,
        `Nombre d'établissements : ${payload.locationCount}`,
        `Besoin principal : ${payload.supportNeed || 'Non précisé'}`,
        `Téléphone ou e-mail : ${payload.contactMethod}`,
        '',
        'Message :',
        payload.message || 'Aucun message.',
      ].join('\n'),
    });

    if (error) {
      console.error('Échec de l’envoi du formulaire :', error.message);
      return res.status(502).json({ error: "Une erreur est survenue lors de l'envoi. Merci de réessayer." });
    }

    if (contactIsAnEmail) {
      const { error: confirmationError } = await resend.emails.send({
        from,
        to: [payload.contactMethod],
        replyTo: recipient,
        subject: 'Votre demande a bien été reçue — Tanguy Duret',
        text: [
          `Bonjour ${payload.firstName},`,
          '',
          'Merci pour votre message. Votre demande concernant votre établissement a bien été reçue.',
          'Je reviendrai vers vous sous 48 heures ouvrées afin d’échanger sur ce qui peut être pertinent pour votre visibilité locale.',
          '',
          'À bientôt,',
          'Tanguy Duret',
          'contact@tanguyduret.com',
        ].join('\n'),
      });

      if (confirmationError) {
        console.error('Échec de l’e-mail de confirmation :', confirmationError.message);
      }
    }
  } catch (error) {
    console.error('Erreur inattendue lors de l’envoi du formulaire :', error);
    return res.status(502).json({ error: "Une erreur est survenue lors de l'envoi. Merci de réessayer." });
  }

  return res.status(200).json({
    success: true,
    message: 'Votre demande a bien été envoyée. Je vous recontacterai sous 48 heures ouvrées.',
  });
}
