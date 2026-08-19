import { Search, MapPin, Star, Smartphone, Frown } from 'lucide-react';

export function Problem() {
  const steps = [
    { icon: Search, label: "Recherche un commerce" },
    { icon: MapPin, label: "Découvre votre fiche" },
    { icon: Star, label: "Consulte les avis" },
    { icon: Smartphone, label: "Vient chez vous" },
  ];

  return (
    <section className="py-16 md:py-24 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-stone-900 mb-6">Le parcours de vos clients</h2>
          <p className="text-lg text-stone-600">
            Le problème n'est pas forcément que vos clients ne sont pas satisfaits. C'est souvent qu'il est trop difficile ou trop peu naturel pour eux de passer à l'action.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto mb-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-emerald-800 mb-4 relative border border-stone-200">
                <step.icon className="w-8 h-8" />
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-full h-px bg-stone-300 -z-10" />
                )}
              </div>
              <span className="text-sm font-medium text-stone-800">{step.label}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 max-w-3xl mx-auto text-center shadow-sm border border-stone-200">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto mb-4">
            <Frown className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-stone-900 mb-2">Le constat</h3>
          <p className="text-stone-600">
            Après une bonne expérience, un client satisfait repart. S'il n'est pas sollicité simplement et naturellement, il ne pensera pas forcément à laisser un avis pour vous aider.
          </p>
        </div>
      </div>
    </section>
  );
}
