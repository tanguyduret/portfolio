const form = document.querySelector<HTMLFormElement>('#quote-form');
const status = document.querySelector<HTMLParagraphElement>('#quote-status');
const submit = form?.querySelector<HTMLButtonElement>('button[type="submit"]');

if (form && status && submit) {
  const showStatus = (state: 'pending' | 'error' | 'success', message: string) => {
    status.dataset.state = state;
    status.textContent = message;
  };
  submit.disabled = false;
  for (const link of document.querySelectorAll<HTMLAnchorElement>('[data-offer]')) {
    link.addEventListener('click', () => {
      const offer = form.elements.namedItem('offer');
      if (offer instanceof HTMLSelectElement) offer.value = link.dataset.offer ?? '';
    });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (submit.disabled) return;
    const data = Object.fromEntries(new FormData(form));
    submit.disabled = true;
    showStatus('pending', 'Envoi de votre demande…');
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) {
        showStatus('error', response.status === 429
          ? 'Trop de tentatives. Réessayez dans quelques minutes ou contactez-moi par e-mail.'
          : response.status === 400
            ? 'Vérifiez les champs, notamment l’adresse e-mail et la description du projet.'
            : 'La demande n’a pas pu être envoyée. Vous pouvez me contacter par e-mail.');
        return;
      }
      form.reset();
      showStatus('success', 'Votre demande a bien été envoyée. Merci, je vous répondrai par e-mail.');
    } catch {
      showStatus('error', 'L’envoi n’a pas pu être confirmé. Vous pouvez me contacter par e-mail.');
    } finally {
      submit.disabled = false;
    }
  });
}
