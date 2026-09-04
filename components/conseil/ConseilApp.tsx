import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { Article } from './pages/Article';
import { GuidePage } from './pages/Guide';
import { MentionsLegales } from './pages/MentionsLegales';
import { PolitiqueConfidentialite } from './pages/PolitiqueConfidentialite';
import { conseilArticleBySlug } from './articles';

function ConseilDocumentTitle() {
  const location = useLocation();

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute('content') ?? null;

    const slug = location.pathname.split('/').at(-1);
    const article = location.pathname.includes('/guide/') ? conseilArticleBySlug(slug) : undefined;
    const page = article
      ? {
          title: `${article.title} | Guide Google du commerçant`,
          description: article.introduction,
        }
      : location.pathname.endsWith('/guide')
        ? {
            title: 'Le guide Google du commerçant | Tanguy Duret',
            description: 'Des conseils simples et concrets pour mieux utiliser votre fiche Google et gérer les avis clients.',
          }
        : location.pathname.endsWith('/mentions-legales')
          ? { title: 'Mentions légales | Tanguy Duret', description: 'Mentions légales du site Tanguy Duret.' }
          : location.pathname.endsWith('/politique-confidentialite')
            ? { title: 'Politique de confidentialité | Tanguy Duret', description: 'Politique de confidentialité du site Tanguy Duret.' }
            : {
                title: 'Conseil Google Business Profile & avis clients | Tanguy Duret',
                description: 'Améliorez votre visibilité locale sur Google et collectez des avis authentiques avec des conseils concrets et un support QR/NFC.',
              };

    document.title = page.title;
    description?.setAttribute('content', page.description);

    return () => {
      document.title = previousTitle;
      if (previousDescription) description?.setAttribute('content', previousDescription);
    };
  }, [location.pathname]);

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
