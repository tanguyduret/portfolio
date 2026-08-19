import { Reveal } from './Reveal';

export function Reassurance() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <h2 className="text-3xl font-bold text-stone-900 mb-6">Pourquoi travailler avec moi ?</h2>
          <p className="text-xl md:text-2xl font-medium text-stone-800 leading-relaxed max-w-3xl mx-auto">
            Parce que vous n'avez pas besoin d'une usine à gaz. Vous avez besoin de quelqu'un qui regarde votre situation, vous explique simplement ce qui peut être amélioré et vous aide à le mettre en place.
          </p>
        </Reveal>
        
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 mt-16 max-w-3xl mx-auto">
          
          <Reveal>
            <h4 className="text-lg font-bold text-stone-900 mb-2 flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-600 mr-3"></span>
              Un interlocuteur unique
            </h4>
            <p className="text-stone-600 pl-5">Vous échangez directement avec moi, pas avec un service commercial ou une agence impersonnelle.</p>
          </Reveal>

          <Reveal delay={0.08}>
            <h4 className="text-lg font-bold text-stone-900 mb-2 flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-600 mr-3"></span>
              Des conseils concrets
            </h4>
            <p className="text-stone-600 pl-5">Je regarde votre fiche et je vous explique ce que vous pouvez réellement améliorer aujourd'hui.</p>
          </Reveal>

          <Reveal delay={0.04}>
            <h4 className="text-lg font-bold text-stone-900 mb-2 flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-600 mr-3"></span>
              Adapté à votre activité
            </h4>
            <p className="text-stone-600 pl-5">Une boulangerie n'a pas les mêmes besoins ou la même clientèle qu'un restaurant, un hôtel ou un garage.</p>
          </Reveal>

          <Reveal delay={0.12}>
            <h4 className="text-lg font-bold text-stone-900 mb-2 flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-600 mr-3"></span>
              Pas d'abonnement
            </h4>
            <p className="text-stone-600 pl-5">Vous payez pour une prestation claire et des conseils précis, sans engagement inutile ou caché.</p>
          </Reveal>

          <Reveal className="md:col-span-2 md:w-1/2 md:mx-auto" delay={0.08}>
            <h4 className="text-lg font-bold text-stone-900 mb-2 flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-600 mr-3"></span>
              De la transparence
            </h4>
            <p className="text-stone-600 pl-5">Aucune promesse de faux avis, de résultats miraculeux ou de positionnement magique garanti sur Google.</p>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
