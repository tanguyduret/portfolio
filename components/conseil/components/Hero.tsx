import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import type { MouseEvent } from 'react';

export function Hero() {
  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const section = document.getElementById(id);
    if (!section) return;

    window.history.replaceState(null, '', `#${id}`);
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="accueil" className="pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-tight mb-6">
          Vos clients vous trouvent sur Google.<br />
          <span className="text-emerald-800">Que voient-ils ?</span>
        </h1>
        
        <p className="text-lg md:text-xl text-stone-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          J'aide les commerces locaux à rendre leur fiche Google plus claire et à faciliter les avis clients grâce à des conseils concrets et un support QR/NFC.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            onClick={(event) => scrollToSection(event, 'contact')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-emerald-800 hover:bg-emerald-900 transition-colors"
          >
            Améliorer ma visibilité
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#comment-ca-marche"
            onClick={(event) => scrollToSection(event, 'comment-ca-marche')}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 border border-stone-300 text-base font-medium rounded-full text-stone-700 bg-white hover:bg-stone-50 transition-colors"
          >
            Découvrir comment ça marche
          </a>
        </div>

        <p className="mt-6 text-sm font-medium text-stone-500">
          Sans abonnement <span className="mx-2 text-stone-300">·</span> Un accompagnement ponctuel <span className="mx-2 text-stone-300">·</span> Échange direct avec moi
        </p>
      </motion.div>
    </section>
  );
}
