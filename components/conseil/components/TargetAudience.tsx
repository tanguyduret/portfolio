import { Reveal } from './Reveal';

export function TargetAudience() {
  const targets = [
    { icon: "🥐", label: "Boulangeries & pâtisseries" },
    { icon: "🍽️", label: "Restaurants & cafés" },
    { icon: "✂️", label: "Coiffeurs & instituts" },
    { icon: "🚗", label: "Garages & automobile" },
    { icon: "🏨", label: "Hôtels & hébergements" },
    { icon: "🛍️", label: "Commerces locaux" },
    { icon: "🔧", label: "Artisans" },
    { icon: "🏪", label: "Indépendants" },
  ];

  return (
    <section className="py-16 md:py-24 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-stone-900 mb-6">Pour qui ?</h2>
          <p className="text-lg text-stone-600">
            Toute entreprise recevant du public ou interagissant localement a besoin d'une vitrine numérique rassurante.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {targets.map((target, i) => (
            <Reveal key={i} className="bg-white rounded-2xl p-6 text-center border border-stone-200 shadow-sm hover:shadow-md transition-shadow" delay={(i % 4) * 0.06}>
              <div className="text-4xl mb-4">{target.icon}</div>
              <h3 className="text-sm font-semibold text-stone-800">{target.label}</h3>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
