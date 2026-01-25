import React, { createContext, useContext, useMemo, useState, PropsWithChildren, useEffect } from 'react';
import { Language } from './types';
import { translations } from './constants';

declare global {
  interface Window {
    __APP_LANG__?: Language;
  }
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  content: typeof translations['fr'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function detectInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'fr';

  // 1) URL (SEO-first)
  const path = window.location.pathname || '/';
  if (path.startsWith('/en')) return 'en';

  // 2) fallback: window.__APP_LANG__ si tu le gardes dans index.html
  if (window.__APP_LANG__ === 'en' || window.__APP_LANG__ === 'fr') return window.__APP_LANG__;

  return 'fr';
}

export const LanguageProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => detectInitialLanguage());

  // si jamais l’URL change (rare chez toi car tu reload), on resync quand même
  useEffect(() => {
    const next = detectInitialLanguage();
    setLanguage(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const content = useMemo(() => translations[language], [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, content }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};