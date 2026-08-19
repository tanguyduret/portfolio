import { Store, Clock, Image, MessageCircle, Map, Layout, Target, Eye } from 'lucide-react';
import { Reveal } from './Reveal';

export function Analysis() {
  const points = [
    { icon: Store, title: "Informations & Catégories", desc: "Votre commerce est-il bien référencé pour les bonnes recherches ?" },
    { icon: Clock, title: "Horaires & Infos pratiques", desc: "Les données essentielles sont-elles claires et à jour pour vos clients ?" },
    { icon: Image, title: "Photos & Visuels", desc: "Votre devanture et vos produits sont-ils mis en valeur ?" },
    { icon: MessageCircle, title: "Gestion des avis", desc: "Comment répondez-vous aujourd'hui et comment l'améliorer ?" },
    { icon: Layout, title: "Cohérence globale", desc: "Votre fiche inspire-t-elle immédiatement confiance ?" },
    { icon: Map, title: "Parcours local", desc: "Que voit un client lorsqu'il cherche un commerce comme le vôtre dans votre rue ?" }
  ];

  return (
    <section className="py-16 md:py-24 bg-stone-100 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-stone-900 mb-6">Votre fiche Google mérite un vrai regard</h2>
          <p className="text-lg text-stone-600">
            Je ne me contente pas de vous envoyer un QR code. J'analyse réellement votre vitrine numérique et je vous explique simplement ce qui peut être optimisé.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {points.map((point, i) => (
            <Reveal key={i} className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex items-start gap-4" delay={(i % 3) * 0.07}>
              <div className="w-10 h-10 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-center flex-shrink-0 text-emerald-800">
                <point.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 mb-1">{point.title}</h4>
                <p className="text-sm text-stone-600 leading-relaxed">{point.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
