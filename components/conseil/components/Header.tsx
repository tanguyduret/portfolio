import { useState, useEffect, type MouseEvent } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { label: 'Accueil', href: '/conseil#accueil' },
    { label: 'Solutions', href: '/conseil#solutions' },
    { label: 'Comment ça marche', href: '/conseil#comment-ca-marche' },
    { label: 'Offres', href: '/conseil#offres' },
    { label: 'FAQ', href: '/conseil#faq' },
  ];

  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);
    if (location.pathname !== '/conseil') return;

    const hash = href.split('#')[1];
    const element = hash ? document.getElementById(hash) : null;
    if (!element) return;

    event.preventDefault();
    window.history.replaceState(null, '', href);
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Handle scrolling to hash when navigating from another page
  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }, [location]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-3">
            <Link to="/conseil" aria-label="Accueil Conseil Tanguy Duret" className="w-9 h-9 flex items-center justify-center">
              <img src="/TD-logo-dark.svg" alt="" className="w-8 h-8 object-contain" />
            </Link>
            <Link to="/conseil" className="font-semibold text-lg text-stone-900 tracking-tight">
              Tanguy Duret
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8 items-center">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={(event) => scrollToSection(event, link.href)} className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
                {link.label}
              </a>
            ))}
            <a href="/conseil#contact" onClick={(event) => scrollToSection(event, '/conseil#contact')} className="inline-flex items-center px-5 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-emerald-800 hover:bg-emerald-900 transition-colors">
              Contact
            </a>
          </nav>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-600 hover:text-stone-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-stone-50 border-b border-stone-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => scrollToSection(event, link.href)}
                className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-100"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/conseil#contact"
              onClick={(event) => scrollToSection(event, '/conseil#contact')}
              className="block w-full text-center mt-4 px-3 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-800 hover:bg-emerald-900"
            >
              Parlons de votre projet
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
