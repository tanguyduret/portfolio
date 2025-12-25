import React, { useEffect, useState, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const HEADER_OFFSET = -96; // Décalage pour ne pas cacher le haut des sections sous le header

export const Header: React.FC = () => {
  const { language, setLanguage, content } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'none'>('none');
  const [activeSection, setActiveSection] = useState<string>('hero');

  const navItems = [
    { id: 'experience', label: content.nav.experience },
    { id: 'education', label: content.nav.education },
    { id: 'projects', label: content.nav.projects },
    { id: 'skills', label: content.nav.skills },
    { id: 'contact', label: content.nav.contact },
  ];

  // ----- Smooth scroll vers une section (Lenis si dispo, sinon fallback smooth natif)
  const scrollToId = useCallback((id: string) => {
    const el = document.querySelector(id) as HTMLElement | null;
    if (!el) return;

    const win = window as any;

    if (win.lenis?.scrollTo) {
      win.lenis.scrollTo(el, {
        offset: HEADER_OFFSET,
        duration: 1.15,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });
    } else {
      const y = el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    scrollToId(id);
  };

  // ----- Lock scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // ----- Gestion scroll : direction + header state + section active
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const sectionIds = ['hero', ...navItems.map((item) => item.id)];

    const updateOnScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;

      // 1) Etat "scrolled"
      setIsScrolled(currentY > 40);

      // 2) Direction
      if (Math.abs(delta) > 6) {
        setScrollDirection(delta > 0 ? 'down' : 'up');
        lastY = currentY;
      }

      // 3) Section active
      const viewportHeight = window.innerHeight;
      const focusLine = viewportHeight * 0.28; // ligne de "focus" (~haut de l'écran)

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
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    // Initial call
    updateOnScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [navItems]);

  // ----- Switch langage
  const toggleLanguage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  // ----- Classes header dynamiques
  const baseHeaderClasses =
    'fixed top-0 left-0 w-full z-50 px-6 md:px-12 flex justify-between items-center text-ivory transition-all duration-500';

  const stateClasses = [
    'py-5 md:py-6',
    isScrolled
      ? 'bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)]'
      : 'bg-gradient-to-b from-black/60 via-black/40 to-transparent border-b border-transparent',
    scrollDirection === 'down' && isScrolled
      ? '-translate-y-full opacity-0'
      : 'translate-y-0 opacity-100',
  ].join(' ');

  return (
    <>
      <nav className={`${baseHeaderClasses} ${stateClasses} border-b-0`}>
        {/* Logo / Back-to-top */}
        <button
  type="button"
  onClick={() => scrollToId('#hero')}
  className="flex items-center gap-3 cursor-pointer text-ivory hover:text-accent transition-colors duration-300 relative z-50"
  aria-label="Scroll back to top"
>
  <img
    src="/TD-logo-light.png.png"
    alt="Logo Tanguy Duret"
    className="h-6 w-auto md:h-7"
  />
  <span className="font-display font-semibold text-base md:text-lg tracking-tight">
  Tanguy&nbsp;Duret
</span>
</button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-8 text-[0.7rem] font-medium tracking-[0.2em] uppercase">
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

          {/* Language Switcher Desktop */}
          <button
            onClick={toggleLanguage}
            className="text-[0.65rem] font-mono border border-white/20 rounded-full px-3 py-1 hover:bg-white/10 hover:border-accent/50 transition-all uppercase tracking-widest text-steel"
          >
            <span className={language === 'fr' ? 'text-accent' : ''}>FR</span>
            <span className="mx-1 opacity-50">|</span>
            <span className={language === 'en' ? 'text-accent' : ''}>EN</span>
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-4 relative z-50">
          <button
            onClick={toggleLanguage}
            className="text-xs font-mono uppercase border border-white/20 px-2 py-1 rounded text-ivory hover:border-accent/50 transition-colors"
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
          fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden
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
            onClick={() => scrollToId('#hero')}
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