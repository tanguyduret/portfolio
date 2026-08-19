import { SmartphoneNfc } from 'lucide-react';

export function Product() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 order-2 md:order-1">
            <div className="bg-stone-100 rounded-3xl p-8 lg:p-12 aspect-[4/5] md:aspect-auto md:h-[500px] flex flex-col items-center justify-center text-center relative overflow-hidden shadow-inner border border-stone-200">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8)_0%,_transparent_100%)]" />
              
              <div className="relative z-10 w-48 h-64 bg-white rounded-2xl shadow-lg border border-stone-200 flex flex-col items-center justify-between p-6 transform -rotate-6 transition-transform hover:rotate-0">
                <div className="w-16 h-16 bg-stone-50 border border-stone-100 rounded-full flex items-center justify-center">
                  <SmartphoneNfc className="w-8 h-8 text-emerald-800" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-stone-800 mb-1">Laissez un avis</div>
                  <div className="w-24 h-24 bg-stone-50 border border-stone-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    {/* Placeholder for QR Code */}
                    <div className="grid grid-cols-2 gap-1 w-16 h-16 opacity-30">
                      <div className="bg-stone-800 rounded-tl-sm"/>
                      <div className="bg-stone-800 rounded-tr-sm"/>
                      <div className="bg-stone-800 rounded-bl-sm"/>
                      <div className="bg-stone-800 rounded-br-sm"/>
                    </div>
                  </div>
                  <div className="text-xs text-stone-500 font-medium">Scannez ou approchez votre téléphone</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">
              Un objet simple, fait pour votre commerce
            </h2>
            <p className="text-lg text-stone-600 mb-8 leading-relaxed">
              Vous le posez sur le comptoir, à la caisse ou sur une table. Vos clients le voient, le scannent ou approchent leur téléphone, et peuvent accéder facilement à votre espace Google.
            </p>
            
            <ul className="space-y-6">
              {[
                { title: "Élégant et discret", desc: "S'intègre parfaitement à la décoration de votre établissement." },
                { title: "Technologie sans contact", desc: "QR Code universel et puce NFC pour un accès instantané sans application." },
                { title: "L'outil n'est pas la finalité", desc: "La vraie finalité, c'est de faciliter le passage à l'action de vos clients." }
              ].map((item, i) => (
                <li key={i} className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-emerald-700" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-stone-900">{item.title}</h4>
                    <p className="text-stone-600 mt-1">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
