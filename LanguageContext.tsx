import React, { createContext, useContext, useState, ReactNode, PropsWithChildren } from 'react';
import { Language } from './types';
import { translations } from './constants';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  content: typeof translations['fr'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  // Select the content based on current language
  const content = translations[language];

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