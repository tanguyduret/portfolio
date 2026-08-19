import { BarChart3, QrCode } from 'lucide-react';
import { Reveal } from './Reveal';

export function Solution() {
  return (
    <section id="solutions" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-stone-900 mb-6">Ma démarche en deux étapes</h2>
          <p className="text-lg text-stone-600">
            Une approche saine et durable pour transformer la satisfaction de vos clients en visibilité locale.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {/* Solution 1 */}
          <Reveal className="bg-white rounded-2xl p-8 md:p-10 border border-stone-200 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-stone-100 text-emerald-800 flex items-center justify-center mb-6 border border-stone-200">
              <span className="font-bold text-sm">01</span>
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-4 flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-emerald-700" />
              Optimiser votre présence
            </h3>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Analyse et recommandations autour de votre fiche Google Business Profile pour s'assurer qu'elle donne envie de vous rendre visite.
            </p>
            <ul className="space-y-3">
              {['Informations claires et à jour', 'Présentation et cohérence visuelle', 'Conseils sur les photos et contenus', 'Expérience utilisateur locale'].map((item, i) => (
                <li key={i} className="flex items-start text-stone-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 mr-3 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Solution 2 */}
          <Reveal className="bg-white rounded-2xl p-8 md:p-10 border border-stone-200 shadow-sm" delay={0.1}>
            <div className="w-10 h-10 rounded-full bg-stone-100 text-emerald-800 flex items-center justify-center mb-6 border border-stone-200">
              <span className="font-bold text-sm">02</span>
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-4 flex items-center gap-3">
              <QrCode className="w-6 h-6 text-emerald-700" />
              Faciliter la collecte d'avis
            </h3>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Mise en place de supports physiques (QR code et NFC) qui rendent l'accès aux avis beaucoup plus simple.
            </p>
            <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 mt-4">
              <div className="flex items-center justify-between text-sm font-medium text-stone-600 text-center">
                <div className="flex-1">Client<br/>satisfait</div>
                <div className="px-2 text-stone-300">→</div>
                <div className="flex-1">Scan /<br/>NFC</div>
                <div className="px-2 text-stone-300">→</div>
                <div className="flex-1 text-emerald-800 font-bold">Avis<br/>Google</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
