const form = document.querySelector<HTMLFormElement>('#quote-form');
const status = document.querySelector<HTMLParagraphElement>('#quote-status');
const submit = form?.querySelector<HTMLButtonElement>('button[type="submit"]');
const projectStep = form?.querySelector<HTMLElement>('#project-step');
const contactStep = form?.querySelector<HTMLElement>('#contact-step');
const next = form?.querySelector<HTMLButtonElement>('#quote-next');
const back = form?.querySelector<HTMLButtonElement>('#quote-back');
const progress = form?.querySelector<HTMLElement>('.form-progress');
const stepHeading = form?.querySelector<HTMLElement>('#step-heading');

if (form && status && submit && projectStep && contactStep && next && back && progress && stepHeading) {
  const showStep = (contact: boolean, focus = true) => {
    projectStep.hidden = contact;
    contactStep.hidden = !contact;
    next.hidden = contact;
    back.hidden = !contact;
    submit.hidden = !contact;
    stepHeading.textContent = contact ? 'Étape 2 sur 2 · Vos coordonnées' : 'Étape 1 sur 2 · Votre projet';
    progress.dataset.step = contact ? '2' : '1';
    status.textContent = '';
    if (focus) stepHeading.focus();
  };
  const advance = () => {
    const invalid = projectStep.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(':is(input, select, textarea):invalid');
    if (invalid) invalid.reportValidity();
    else showStep(true);
  };
  progress.hidden = false;
  form.noValidate = true;
  showStep(false, false);
  next.addEventListener('click', advance);
  back.addEventListener('click', () => showStep(false));
  const showStatus = (state: 'pending' | 'error' | 'success', message: string) => {
    status.dataset.state = state;
    status.textContent = message;
  };
  submit.disabled = false;
  for (const link of document.querySelectorAll<HTMLAnchorElement>('[data-offer]')) {
    link.addEventListener('click', () => {
      if (submit.disabled) return;
      showStep(false, false);
      const offer = form.elements.namedItem('offer');
      if (offer instanceof HTMLSelectElement) offer.value = link.dataset.offer ?? '';
    });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (submit.disabled) return;
    if (contactStep.hidden) { advance(); return; }
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    submit.disabled = true;
    back.disabled = true;
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
      showStep(false);
      showStatus('success', 'Votre demande a bien été envoyée. Merci, je vous répondrai par e-mail.');
    } catch {
      showStatus('error', 'L’envoi n’a pas pu être confirmé. Vous pouvez me contacter par e-mail.');
    } finally {
      submit.disabled = false;
      back.disabled = false;
    }
  });
}

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12 });
  for (const item of document.querySelectorAll('.intro, .section-heading')) {
    observer.observe(item);
  }
}

// Keep the static reading order on small screens and for reduced motion.
// Load the scroll engine only when there is room for the pinned compositions.
const immersive = window.matchMedia('(min-width: 1080px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)');
async function enableStudioMotion() {
  if (!immersive.matches) return;
  const { installStudioMotion } = await import('./studio-motion');
  installStudioMotion(immersive);
}
if (document.querySelector('.portfolio-stage')) {
  if (immersive.matches) void enableStudioMotion();
  else immersive.addEventListener('change', function onChange() {
    if (!immersive.matches) return;
    immersive.removeEventListener('change', onChange);
    void enableStudioMotion();
  });
}
