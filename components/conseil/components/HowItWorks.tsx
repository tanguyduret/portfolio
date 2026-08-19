import { Reveal } from './Reveal';

export function HowItWorks() {
  const steps = [
    {
      title: "On échange",
      desc: "Vous m'expliquez votre activité, vos clients, et vos besoins spécifiques."
    },
    {
      title: "J'analyse",
      desc: "J'identifie les points d'amélioration de votre présence locale et de votre parcours client."
    },
    {
      title: "Je mets en place",
      desc: "Je propose les actions pertinentes et, si nécessaire, le support QR/NFC adapté."
    },
    {
      title: "Vos clients agissent",
      desc: "Le support reste visible dans votre établissement pour faciliter le dépôt d'avis authentiques."
    }
  ];

  return (
    <section id="comment-ca-marche" className="py-16 md:py-24 bg-stone-900 text-stone-50 border-y border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-white">Comment ça marche ?</h2>
          <p className="text-lg text-stone-400">
            Un processus extrêmement simple, conçu pour ne pas vous faire perdre de temps.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <Reveal key={index} className="relative" delay={index * 0.08}>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-12 w-full h-px border-t border-dashed border-stone-700" />
              )}
              <div className="relative z-10 bg-stone-800 w-12 h-12 rounded-full flex items-center justify-center font-bold text-emerald-200 mb-6 border-[3px] border-stone-900">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                {step.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
