import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white text-stone-500 py-10 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center md:flex-row md:justify-between md:items-start md:text-left gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-3">
            <img src="/TD-logo-dark.svg" alt="" className="w-7 h-7 object-contain" />
            <span className="font-bold text-lg tracking-tight text-stone-900">Tanguy Duret</span>
          </div>
          <a href="mailto:contact@tanguyduret.com" className="text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors">contact@tanguyduret.com</a>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-3 text-sm font-medium">
          <Link to="/conseil/mentions-legales" className="hover:text-stone-900 transition-colors">Mentions légales</Link>
          <Link to="/conseil/politique-confidentialite" className="hover:text-stone-900 transition-colors">Politique de confidentialité</Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs mt-8 text-stone-400">
        &copy; {new Date().getFullYear()} Tanguy Duret. Tous droits réservés.
      </div>
    </footer>
  );
}
