import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const Header: React.FC = () => {
  const { language, setLanguage, content } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    // Close mobile menu if open
    if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
    }

    if (window.lenis) {
      window.lenis.scrollTo(id);
    } else {
      const element = document.querySelector(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Lock body scroll when mobile menu is open
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

  const navItems = [
      { id: 'experience', label: content.nav.experience },
      { id: 'education', label: content.nav.education },
      { id: 'projects', label: content.nav.projects },
      { id: 'skills', label: content.nav.skills },
      { id: 'contact', label: content.nav.contact }
  ];

  const toggleLanguage = (e?: React.MouseEvent) => {
    if(e) e.stopPropagation();
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <>
    <nav className="fixed top-0 left-0 w-full z-50 py-6 px-6 md:px-12 flex justify-between items-center text-ivory bg-black/40 backdrop-blur-md border-b border-white/5 transition-colors duration-300">
      <a 
        href="#hero"
        onClick={(e) => handleScroll(e, '#hero')}
        className="font-display font-semibold text-sm md:text-base tracking-[0.3em] uppercase hover:text-accent transition-colors duration-300 cursor-pointer text-ivory relative z-50"
        aria-label="Scroll back to top"
      >
        Tanguy&nbsp;Duret
      </a>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        <div className="flex gap-8 text-xs font-medium tracking-[0.2em] uppercase">
            {navItems.map((item) => (
            <a 
                key={item.id} 
                href={`#${item.id}`}
                onClick={(e) => handleScroll(e, `#${item.id}`)}
                className="relative group py-2"
            >
                <span className="relative z-10 group-hover:text-accent transition-colors duration-300">
                {item.label}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
            ))}
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
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
            {navItems.map((item, idx) => (
                <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleScroll(e, `#${item.id}`)}
                    className={`
                        text-3xl font-display font-medium tracking-tight text-ivory uppercase
                        hover:text-accent transition-all duration-300
                        ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                    `}
                    style={{ transitionDelay: `${100 + idx * 50}ms` }}
                >
                    {item.label}
                </a>
            ))}
            
            <div 
                className={`w-12 h-[1px] bg-white/10 my-4 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} 
                style={{ transitionDelay: '400ms' }}
            />
            
            <button
                onClick={(e) => {
                    handleScroll(e as any, '#hero');
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