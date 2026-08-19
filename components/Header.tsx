import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const Header: React.FC = () => {
  const { language, setLanguage, content } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'none'>('none');
  const [activeSection, setActiveSection] = useState<string>('hero');

  // 👉 progression “dilatation” du nom (0 = serré, 1 = très espacé)
  const [titleSpread, setTitleSpread] = useState(1);

  // ✅ déclenche l’anim d’entrée du logo une fois
  const [logoReady, setLogoReady] = useState(false);

  const navRef = useRef<HTMLElement | null>(null);

  const navItems = [
    { id: 'experience', label: content.nav.experience },
    { id: 'education', label: content.nav.education },
    { id: 'projects', label: content.nav.projects },
    { id: 'skills', label: content.nav.skills },
    { id: 'contact', label: content.nav.contact },
  ];

  // ✅ Offset dynamique = header height réel (évite le décalage des ancres)
  const getHeaderOffset = () => {
    const header = navRef.current ?? document.querySelector('nav[data-site-header="true"]');
    const h = header ? (header as HTMLElement).getBoundingClientRect().height : 96;
    return -h - 8; // petit “air” sous le header
  };

  // ----- Smooth scroll vers une section
  // ----- Smooth scroll vers une section
const scrollToId = useCallback((id: string) => {
  const win = window as any;

  // ✅ Hero = vrai top de page (pas d'offset)
  const isHero =
    id === "#hero" ||
    id === "hero" ||
    id === "#top" ||
    id === "top";

  if (isHero) {
    if (win.lenis?.scrollTo) {
      win.lenis.scrollTo(0, {
        duration: 1.05,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return;
  }

  // ✅ Autres sections = offset dynamique header
  const el = document.querySelector(id) as HTMLElement | null;
  if (!el) return;

  const offset = getHeaderOffset();

  if (win.lenis?.scrollTo) {
    win.lenis.scrollTo(el, {
      offset,
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });
  } else {
    const y = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}, []);

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    scrollToId(id);
  };

  // ----- Lock scroll quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // ✅ anim d’entrée logo (CSS), déclenchée après mount
  useEffect(() => {
    const t = window.setTimeout(() => setLogoReady(true), 60);
    return () => window.clearTimeout(t);
  }, []);

  // ----- Gestion du scroll : direction + header state + section active + titre
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const sectionIds = ['hero', ...navItems.map((item) => item.id)];

    const updateOnScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;

      setIsScrolled(currentY > 40);

      if (Math.abs(delta) > 6) {
        setScrollDirection(delta > 0 ? 'down' : 'up');
        lastY = currentY;
      }

      const viewportHeight = window.innerHeight;
      const focusLine = viewportHeight * 0.28;

      let currentActive = 'hero';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= focusLine && rect.bottom >= focusLine) {
          currentActive = id;
          break;
        }
      }
      setActiveSection(currentActive);

      const maxOffset = 220;
      const clamped = 1 - Math.min(Math.max(currentY, 0), maxOffset) / maxOffset;
      setTitleSpread(clamped);

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    updateOnScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [navItems]);

  // ----- Switch langage (SEO-friendly via URL: / ↔ /en/)
  const resolveLangFromPath = () => {
    if (typeof window === 'undefined') return language;
    return window.location.pathname.startsWith('/en') ? 'en' : 'fr';
  };

  const buildLangUrl = (nextLang: 'fr' | 'en') => {
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
    const search = typeof window !== 'undefined' ? window.location.search : '';

    // base target
    const targetBase = nextLang === 'en' ? '/en/' : '/';

    // on garde un hash “propre” (section active) si tu veux
    const hash =
      activeSection && activeSection !== 'hero' ? `#${activeSection}` : '';

    // si tu as d’autres routes plus tard, tu peux adapter ici
    // pour l’instant, on force juste la home FR/EN (SEO clean)
    return `${targetBase}${search}${hash}`;
  };

  const toggleLanguage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    const currentByUrl = resolveLangFromPath();
    const next = currentByUrl === 'fr' ? 'en' : 'fr';

    // UX: on met à jour l’état tout de suite (au cas où la nav prend 100ms)
    setLanguage(next);

    // Navigation SEO: charge la page / ou /en/
    if (typeof window !== 'undefined') {
      window.location.assign(buildLangUrl(next));
    }
  };

  // ----- Classes header dynamiques
  const baseHeaderClasses =
    'fixed top-0 left-0 w-full z-50 px-6 md:px-12 flex justify-between items-center text-ivory transition-all duration-500';

  const stateClasses = [
    'py-5 md:py-6',
    isScrolled
      ? 'bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)]'
      : 'bg-gradient-to-b from-black/60 via-black/40 to-transparent border-b border-transparent',
    scrollDirection === 'down' && isScrolled ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100',
  ].join(' ');

  // Valeurs dérivées pour le nom
  const baseLetterEm = 0.14;
  const extraLetterEm = 0.26;
  const letterSpacingEm = baseLetterEm + extraLetterEm * titleSpread;
  const translateY = (1 - titleSpread) * 2;

  return (
    <>
      {/* ✅ CSS local pour animation logo + nom (fiable, visible, sans Tailwind config) */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .td-logo--enter,
          .td-logo--float,
          .td-logoWrap::after { animation: none !important; transition: none !important; }
        }

        @keyframes tdLogoEnter {
          0%   { opacity: 0; transform: translateY(2px) scale(0.92) rotate(-1deg); filter: blur(6px) drop-shadow(0 0 0 rgba(215,195,137,0)); }
          70%  { opacity: 1; transform: translateY(0) scale(1.02) rotate(0deg); filter: blur(0px) drop-shadow(0 12px 22px rgba(215,195,137,0.28)); }
          100% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); filter: blur(0px) drop-shadow(0 10px 18px rgba(215,195,137,0.22)); }
        }

        @keyframes tdLogoFloat {
          0%   { transform: translateY(0) }
          50%  { transform: translateY(-1.5px) }
          100% { transform: translateY(0) }
        }

        @keyframes tdShimmer {
          0%   { transform: translateX(-140%) skewX(-18deg); opacity: 0; }
          20%  { opacity: 0.55; }
          55%  { opacity: 0.0; }
          100% { transform: translateX(220%) skewX(-18deg); opacity: 0; }
        }

        @keyframes tdNameEnter {
          0% { opacity: 0; transform: translateY(4px); letter-spacing: 0.08em; }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes tdNameBreath {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-0.6px); }
        }

        .td-logoWrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          isolation: isolate;
        }

        .td-logoWrap::after {
          content: "";
          position: absolute;
          inset: -6px -10px;
          border-radius: 12px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(215,195,137,0.18),
            transparent
          );
          transform: translateX(-140%) skewX(-18deg);
          opacity: 0;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        .group:hover .td-logoWrap::after {
          animation: tdShimmer 1.1s cubic-bezier(.2,.8,.2,1) 1;
        }

        .td-logo {
          display: block;
          will-change: transform, filter, opacity;
          transform-origin: 50% 50%;
        }

        .td-logo--enter {
          animation: tdLogoEnter 1.05s cubic-bezier(.2,.8,.2,1) both;
        }

        .td-logo--float {
          animation: tdLogoFloat 3.6s ease-in-out infinite;
        }
      `}</style>

      <nav
        ref={(el) => {
          navRef.current = el;
        }}
        data-site-header="true"
        className={`${baseHeaderClasses} ${stateClasses} border-b-0`}
      >
        {/* Logo / Back-to-top */}
        <button
          type="button"
          onClick={() => scrollToId('#hero')}
          className="group flex items-center gap-3 cursor-pointer text-ivory hover:text-accent transition-colors duration-300 relative z-50"
          aria-label="Scroll back to top"
        >
          <span className="td-logoWrap">
            <img
              src="/TD-logo-light.svg"
              alt="Logo Tanguy Duret"
              className={['td-logo h-6 w-auto md:h-7', logoReady ? 'td-logo--enter td-logo--float' : ''].join(' ')}
              style={{
                transform: isScrolled ? 'scale(0.96)' : 'scale(1)',
                transition: 'transform 420ms cubic-bezier(0.2, 0.8, 0.2, 1)',
              }}
            />
          </span>

          <span
            className="
              font-display font-semibold text-sm md:text-base uppercase
              transform-gpu transition-all duration-500
            "
            style={{
              letterSpacing: `${letterSpacingEm}em`,
              transform: `translateY(${translateY}px)`,
              opacity: 0.9 + 0.1 * titleSpread,
              animation: logoReady
                ? 'tdNameEnter 0.9s cubic-bezier(.2,.8,.2,1) both, tdNameBreath 4s ease-in-out infinite'
                : undefined,
            }}
          >
            Tanguy&nbsp;Duret
          </span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-8">
          <div className="flex gap-5 xl:gap-8 text-[0.7rem] font-medium tracking-[0.2em] uppercase">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleScrollClick(e, `#${item.id}`)}
                  className="relative group py-2"
                >
                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      isActive ? 'text-accent' : 'text-ivory'
                    } group-hover:text-accent`}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`absolute bottom-0 left-0 h-[1px] bg-accent transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              );
            })}
          </div>

          {/* Language Switcher Desktop (URL-based) */}
          <button
            onClick={toggleLanguage}
            className="text-[0.65rem] font-mono border border-white/20 rounded-full px-3 py-1 hover:bg-white/10 hover:border-accent/50 transition-all uppercase tracking-widest text-steel"
            aria-label="Switch language"
          >
            <span className={language === 'fr' ? 'text-accent' : ''}>FR</span>
            <span className="mx-1 opacity-50">|</span>
            <span className={language === 'en' ? 'text-accent' : ''}>EN</span>
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="lg:hidden flex items-center gap-4 relative z-50">
          <button
            onClick={toggleLanguage}
            className="text-xs font-mono uppercase border border-white/20 px-2 py-1 rounded text-ivory hover:border-accent/50 transition-colors"
            aria-label="Switch language"
          >
            {language}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="text-ivory hover:text-accent transition-colors p-1"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Full Screen Menu Overlay */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/95 backdrop-blur-xl lg:hidden
          flex flex-col items-center justify-center
          transition-all duration-500 ease-in-out
          ${isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}
        `}
      >
        <div className="flex flex-col items-center gap-8 text-center p-6">
          {navItems.map((item, idx) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleScrollClick(e, `#${item.id}`)}
                className={`
                  text-3xl font-display font-medium tracking-tight uppercase
                  hover:text-accent transition-all duration-300
                  ${isActive ? 'text-accent' : 'text-ivory'}
                  ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                `}
                style={{ transitionDelay: `${100 + idx * 50}ms` }}
              >
                {item.label}
              </a>
            );
          })}

          <div
            className={`w-12 h-[1px] bg-white/10 my-4 transition-all duration-500 ${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          />

          <button
            onClick={() => {
              if (isMobileMenuOpen) setIsMobileMenuOpen(false);
              scrollToId('#hero');
            }}
            className={`
              text-sm font-mono tracking-[0.2em] text-steel/60 uppercase mt-4
              ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
            `}
            style={{ transitionDelay: '500ms' }}
          >
            Back to Top
          </button>
        </div>
      </div>
    </>
  );
};
