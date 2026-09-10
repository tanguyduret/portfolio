import { Reveal } from './Reveal';

export function Product() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <Reveal className="flex-1 order-2 md:order-1">
            <div className="bg-[#f6f1e6] rounded-3xl p-4 sm:p-6 lg:p-8 aspect-[4/5] md:aspect-auto md:h-[500px] relative overflow-hidden shadow-inner border border-stone-200">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8)_0%,_transparent_100%)]" />
              <div className="relative z-10 grid h-full grid-cols-[1.15fr_0.85fr] items-center gap-1 sm:gap-4">
                <figure className="flex h-full min-w-0 flex-col items-center justify-center py-4 sm:py-6">
                  <img
                    src="/plaque-google-avis.png"
                    alt="Plaque Google avec QR code et technologie NFC pour faciliter les avis clients"
                    className="min-h-0 w-full max-h-[82%] flex-1 object-contain drop-shadow-[0_18px_20px_rgba(41,37,30,0.14)]"
                  />
                  <figcaption className="mt-3 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-600 sm:text-xs">
                    Plaque à fixer
                  </figcaption>
                </figure>
                <figure className="flex h-full min-w-0 flex-col items-center justify-center py-4 sm:py-6">
                  <img
                    src="/support-google-avis.png"
                    alt="Support Google à poser avec QR code et technologie NFC"
                    className="min-h-0 w-full max-h-[88%] flex-1 object-contain drop-shadow-[0_18px_20px_rgba(41,37,30,0.14)]"
                  />
                  <figcaption className="mt-3 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-600 sm:text-xs">
                    Support à poser
                  </figcaption>
                </figure>
              </div>
            </div>
          </Reveal>
          
          <Reveal className="flex-1 order-1 md:order-2" delay={0.08}>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">
              Un support simple, inclus dans votre accompagnement
            </h2>
            <p className="text-lg text-stone-600 mb-8 leading-relaxed">
              Un support est inclus dans votre accompagnement, à choisir selon votre établissement : plaque compacte à fixer ou support à poser sur le comptoir, à la caisse ou sur une table. Vos clients le voient, le scannent ou approchent leur téléphone, et accèdent facilement à votre espace Google.
            </p>
            
            <ul className="space-y-6">
              {[
                { title: "Élégant et discret", desc: "S'intègre parfaitement à la décoration de votre établissement." },
                { title: "Technologie sans contact", desc: "QR Code universel et puce NFC pour un accès instantané sans application." },
                { title: "Le support n'est pas une finalité", desc: "L'objectif reste de clarifier votre présence Google et de faciliter le passage à l'action de vos clients." }
              ].map((item, i) => (
                <li key={i} className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-[#f4e8ce] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#a07d3d]" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-stone-900">{item.title}</h4>
                    <p className="text-stone-600 mt-1">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
