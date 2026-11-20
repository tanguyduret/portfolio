import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function installStudioMotion(media: MediaQueryList) {
  gsap.registerPlugin(ScrollTrigger);
  const modes = gsap.matchMedia();
  let firstLayout = true;
  modes.add(media.media, () => {
    const home = document.body;
    // Preserve the reader's position when enabling the wider layout mid-page.
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main > section, footer'));
    const current = sections.find(section => section.getBoundingClientRect().bottom > 0);
    const oldTop = current?.getBoundingClientRect().top ?? 0;
    home.classList.add('studio-motion');

    // CSS sticky owns the layout. Both the sticky release and the timeline
    // end use the same travel distance, including after a viewport resize.
    function scene(selector: string) {
      const track = home.querySelector<HTMLElement>(selector)!;
      const stage = track.querySelector<HTMLElement>('.motion-stage')!;
      return gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: track,
          start: () => 'top ' + getComputedStyle(stage).top,
          end: () => '+=' + (track.offsetHeight - stage.offsetHeight),
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }

    const [atelier, cafe, bureau] = gsap.utils.toArray<HTMLElement>('.project-grid > article');
    const deck = scene('.portfolio-track');
    deck
      .addLabel('lift', .08)
      .to(atelier, { y: -14, rotation: -2.4, scale: 1.045, duration: .16, ease: 'sine.inOut' }, 'lift')
      .to(atelier, { '--lift': 1, duration: .16 }, 'lift')
      .addLabel('open', .24)
      .to(atelier, { x: 0, y: 0, rotation: 0, scale: 1, duration: .38, ease: 'sine.inOut' }, 'open')
      .to(cafe, { opacity: 1, duration: .13 }, 'open')
      .to(cafe, { x: 0, y: 0, scale: 1, duration: .36, ease: 'sine.inOut' }, .36)
      .to(atelier, { '--lift': 0, duration: .22 }, .42)
      .addLabel('lastCard', .51)
      .to(bureau, { opacity: 1, duration: .16 }, 'lastCard')
      .to(bureau, { x: 0, y: 0, scale: 1, duration: .40, ease: 'sine.inOut' }, 'lastCard')
      .to({}, { duration: .09 });

    const steps = gsap.utils.toArray<HTMLElement>('.process > li');
    const method = scene('.method-track');
    const last = steps.length - 1;
    method.to('.process', {
      x: () => steps[0].offsetLeft - steps[last].offsetLeft,
      duration: last,
    }, 0);
    method.fromTo('.method-progress i', { scaleX: 0 }, { scaleX: 1, duration: last }, 0);
    steps.forEach((step, i) => {
      if (i) method.fromTo(step, { opacity: .16, scale: .94 }, { opacity: 1, scale: 1, duration: .85 }, i - .85);
      if (i < last) method.to(step, { opacity: .16, scale: .94, duration: .85 }, i);
    });

    const promises = gsap.utils.toArray<HTMLElement>('.assurance-grid > div');
    const collaboration = scene('.collaboration-track');
    promises.forEach((item, i) => {
      if (i) collaboration.fromTo(item, { opacity: 0, y: 34, scale: .97 },
        { opacity: 1, y: 0, scale: 1, duration: .30 }, i - .14);
      if (i < promises.length - 1) collaboration.to(item,
        { opacity: 0, y: -28, scale: .98, duration: .24 }, i + .64);
    });
    collaboration.to({}, { duration: .30 });

    // Refresh can interrupt the browser's fragment jump while sticky tracks
    // are being inserted. Finish that navigation using the final geometry.
    let target = document.getElementById(location.hash.slice(1));
    if (!firstLayout && target && Math.abs(target.getBoundingClientRect().top) > 48) target = null;
    firstLayout = false;
    const abort = new AbortController();
    const options = { passive: true, signal: abort.signal };
    const forgetTarget = () => { target = null; };
    for (const event of ['wheel', 'touchstart', 'pointerdown', 'keydown']) {
      window.addEventListener(event, forgetTarget, options);
    }
    const alignTarget = () => {
      target?.scrollIntoView({ block: 'start', behavior: 'instant' });
    };
    ScrollTrigger.addEventListener('refresh', alignTarget);
    // Native in-page links keep their smooth transition. URL entry and
    // history traversal resolve immediately against the current layout.
    let clickedHash = '';
    home.addEventListener('click', event => {
      const anchor = event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      clickedHash = anchor?.hash ?? '';
    }, { signal: abort.signal });
    window.addEventListener('hashchange', () => {
      target = document.getElementById(location.hash.slice(1));
      if (location.hash !== clickedHash) alignTarget();
      clickedHash = '';
    }, options);
    ScrollTrigger.refresh();
    if (target) alignTarget();
    else if (current && window.scrollY > 0) {
      window.scrollBy({ top: current.getBoundingClientRect().top - oldTop, behavior: 'instant' });
    }
    void document.fonts.ready.then(() => {
      if (abort.signal.aborted) return;
      ScrollTrigger.refresh();
      alignTarget();
    });
    return () => {
      abort.abort();
      ScrollTrigger.removeEventListener('refresh', alignTarget);
      home.classList.remove('studio-motion');
    };
  });
  if (import.meta.hot) import.meta.hot.dispose(() => modes.revert());
}
