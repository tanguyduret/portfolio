import { PricingPlan } from '../types';
import { Check } from 'lucide-react';
import type { MouseEvent } from 'react';
import { Reveal } from './Reveal';

export function Pricing() {
  const scrollToContact = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const contact = document.getElementById('contact');
    if (!contact) return;
    window.history.replaceState(null, '', '#contact');
    contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const plans: PricingPlan[] = [
    {
      id: 'essentiel',
      name: 'Essentiel',
      price: 50,
      description: 'Pour mettre en place une solution simple d\'accès aux avis.',
      features: [
        'Support physique QR/NFC',
        'Configuration du lien direct',
        'Design élégant et discret',
        'Sans abonnement',
        'Échange personnalisé (20 min)'
      ]
    },
    {
      id: 'visibilite',
      name: 'Visibilité',
      price: 80,
      description: 'Pour améliorer sa présence et faciliter la récolte d\'avis.',
      features: [
        'Tout de l\'offre Essentiel',
        'Analyse de la fiche Google',
        'Identification des améliorations',
        'Conseils d\'optimisation',
        'Échange approfondi (1 h)'
      ]
    },
    {
      id: 'accompagnement',
      name: 'Accompagnement',
      price: 120,
      description: 'Pour une approche complète et totalement personnalisée.',
      recommended: true,
      features: [
        'Tout de l\'offre Visibilité',
        'Analyse plus complète',
        'Recommandations détaillées',
        'Accompagnement de mise en place',
        'Échange approfondi'
      ]
    }
  ];

  return (
    <section id="offres" className="py-16 md:py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-stone-900 mb-6">Des offres simples et transparentes</h2>
          <p className="text-lg text-stone-600">
            Des tarifs uniques et transparents, sans abonnement ni frais récurrents.
          </p>
        </Reveal>

        <Reveal className="max-w-4xl mx-auto rounded-2xl bg-stone-100 border border-stone-200 p-6 md:p-8 mb-10" delay={0.04}>
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-stone-900">Ce qui est inclus</h3>
            <p className="mt-3 text-stone-600 leading-relaxed">
              Chaque offre correspond à un établissement et à un support physique. Nous échangeons d'abord pour comprendre votre activité, puis je prépare un accompagnement adapté et un lien Google prêt à utiliser.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 mt-6 text-sm text-stone-700">
            {[
              'Un échange direct pour comprendre votre besoin',
              'La configuration de votre lien vers Google',
              'Un support QR/NFC prêt à être utilisé',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-10">
          {plans.map((plan) => (
            <Reveal 
              key={plan.id}
              delay={plan.id === 'essentiel' ? 0 : plan.id === 'visibilite' ? 0.08 : 0.16}
              className={`min-w-0 bg-white rounded-2xl p-6 lg:p-8 border ${plan.recommended ? 'border-2 border-emerald-700 shadow-lg relative transform xl:-translate-y-2' : 'border border-stone-200 shadow-sm'} flex flex-col transition-transform`}
            >
              {plan.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-700 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                  Recommandé
                </div>
              )}
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2 break-words">{plan.name}</h3>
              <p className="text-stone-500 text-sm mb-6 min-h-10">{plan.description}</p>
              <div className="mb-8">
                <span className="text-4xl font-extrabold text-stone-900">{plan.price}€</span>
                <span className="text-stone-500 font-medium"> / unique</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className={`w-5 h-5 mr-3 flex-shrink-0 ${plan.recommended ? 'text-emerald-700' : 'text-stone-400'}`} />
                    <span className="text-stone-700 text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              <a 
                href="#contact" 
                onClick={scrollToContact}
                className={`w-full py-3 px-4 rounded-full text-center font-medium transition-colors ${plan.recommended ? 'bg-emerald-800 text-white hover:bg-emerald-900' : 'bg-stone-100 text-stone-800 hover:bg-stone-200'}`}
              >
                Parler de cette offre
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="max-w-3xl mx-auto rounded-2xl bg-stone-100 border border-stone-200 p-6 md:p-8 text-center" delay={0.08}>
          <h3 className="text-xl font-bold text-stone-900">Plusieurs boutiques ou plusieurs supports ?</h3>
          <p className="mt-3 text-stone-600 leading-relaxed">
            Chaque offre correspond à un établissement et à un support physique. Pour plusieurs boutiques, plusieurs supports ou un besoin spécifique, je prépare une proposition sur mesure adaptée à votre organisation.
          </p>
          <a href="#contact" onClick={scrollToContact} className="inline-block mt-5 text-emerald-800 hover:text-emerald-900 font-semibold underline underline-offset-4">
            Parlons de votre besoin
          </a>
        </Reveal>

        <div className="text-center mt-8">
          <a href="#contact" onClick={scrollToContact} className="inline-block text-stone-600 hover:text-stone-900 font-medium underline underline-offset-4">
            M'aider à choisir l'offre adaptée
          </a>
        </div>
      </div>
    </section>
  );
}
