import { Resend } from 'resend';

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  company?: string;
  activity?: string;
  contactMethod?: string;
  message?: string;
  website?: string;
};

const requiredFields = [
  'firstName',
  'lastName',
  'company',
  'activity',
  'contactMethod',
] as const;

const clean = (value: unknown, maximumLength: number) =>
  typeof value === 'string' ? value.trim().slice(0, maximumLength) : '';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Méthode non autorisée.' });
  }

  const body = (req.body ?? {}) as ContactPayload;

  // Champ invisible : les robots le remplissent généralement, pas les visiteurs.
  if (clean(body.website, 200)) {
    return res.status(200).json({ success: true, message: 'Votre demande a bien été envoyée.' });
  }

  const payload = {
    firstName: clean(body.firstName, 100),
    lastName: clean(body.lastName, 100),
    company: clean(body.company, 200),
    activity: clean(body.activity, 200),
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

  return res.status(200).json({
    success: true,
    message: 'Votre demande a bien été envoyée. Je vous recontacterai très prochainement.',
  });
}
