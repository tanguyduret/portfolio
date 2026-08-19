import { ArrowRight } from 'lucide-react';

export function About() {
  return (
    <section id="a-propos" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          <div className="w-full md:w-2/5 order-2 md:order-1">
            <div className="aspect-[4/5] bg-stone-100 border border-stone-200 rounded-2xl relative overflow-hidden">
              <img
                src="https://i.ibb.co/mCfV80Jh/ed61771a-0676-4dfe-88ad-ae83a0e92391.jpg"
                alt="Tanguy Duret"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 via-transparent to-transparent" />
            </div>
          </div>
          
          <div className="w-full md:w-3/5 order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6 leading-tight">
              On échange directement,<br/>
              <span className="text-emerald-800">simplement.</span>
            </h2>
            
            <div className="space-y-6 text-lg text-stone-600">
              <p>
                Je m'appelle Tanguy et j'accompagne directement les commerces et entreprises locales dans l'amélioration de leur présence sur Google.
              </p>
              <p>
                Mon approche est simple : prendre le temps de comprendre votre activité, regarder ce qui peut être amélioré et vous proposer des solutions concrètes, sans abonnement ni jargon inutile.
              </p>
              <p>
                Chaque accompagnement commence par un échange. Même avec l'offre Essentiel, je prends le temps de comprendre votre activité et de vous partager quelques conseils concrets que vous pourrez appliquer au quotidien.
              </p>
            </div>
            
            <div className="mt-8 pt-8 border-t border-stone-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-800 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  20'
                </div>
                <div>
                  <h4 className="font-bold text-stone-900">Un échange personnalisé est inclus</h4>
                  <p className="text-stone-600 mt-1">Dans chaque accompagnement, nous prenons le temps de parler de votre établissement et de vos besoins.</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <a 
                href="https://tanguyduret.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center text-sm font-medium text-emerald-700 hover:text-emerald-800 hover:underline transition-all"
              >
                Si vous souhaitez en savoir plus sur mon parcours, découvrez mon portfolio <ArrowRight className="ml-1 w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
