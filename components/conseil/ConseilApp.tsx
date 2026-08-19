import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { Article } from './pages/Article';
import { GuidePage } from './pages/Guide';
import { MentionsLegales } from './pages/MentionsLegales';
import { PolitiqueConfidentialite } from './pages/PolitiqueConfidentialite';

function ConseilDocumentTitle() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute('content') ?? null;

    document.title = 'Tanguy Duret — Conseil en présence locale';
    description?.setAttribute(
      'content',
      'Améliorez votre visibilité locale sur Google et collectez des avis authentiques avec des supports QR/NFC personnalisés.',
    );

    return () => {
      document.title = previousTitle;
      if (previousDescription) description?.setAttribute('content', previousDescription);
    };
  }, []);

  return null;
}

export function ConseilApp() {
  return (
    <div className="conseil-site min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      <ConseilDocumentTitle />
      <ScrollToTop />
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="mentions-legales" element={<MentionsLegales />} />
        <Route path="politique-confidentialite" element={<PolitiqueConfidentialite />} />
        <Route path="guide" element={<GuidePage />} />
        <Route path="guide/:slug" element={<Article />} />
        <Route path="*" element={<Navigate to="/conseil" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}
