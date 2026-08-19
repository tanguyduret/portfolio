import { useState } from 'react';
import { FAQItem } from '../types';
import { Plus, Minus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "Est-ce que je dois avoir une fiche Google ?",
      answer: "Oui, c'est indispensable aujourd'hui. C'est souvent la première chose que voient vos clients lorsqu'ils vous cherchent ou cherchent un commerce comme le vôtre à proximité. Si vous n'en avez pas, je peux vous aider à la créer."
    },
    {
      question: "Comment fonctionne le QR code / NFC ?",
      answer: "C'est très simple : le client approche son smartphone du support (NFC) ou ouvre son appareil photo pour scanner le QR code. Il est immédiatement redirigé vers la page permettant de laisser un avis sur votre fiche Google."
    },
    {
      question: "Est-ce que mes clients doivent télécharger une application ?",
      answer: "Non, absolument aucune. Le scan du QR code se fait avec l'appareil photo classique du téléphone. Le NFC fonctionne nativement. Et pour laisser l'avis, ils utilisent leur compte Google existant."
    },
    {
      question: "Est-ce que vous garantissez davantage d'avis ?",
      answer: "Je vous garantis que nous rendrons le processus beaucoup plus simple pour vos clients. Je ne peux pas garantir un nombre exact d'avis, mais faciliter l'accès est le meilleur moyen d'obtenir plus de retours spontanés."
    },
    {
      question: "Pouvez-vous m'aider à améliorer ma fiche Google ?",
      answer: "C'est l'essence même de mon approche ! Au-delà du support physique, je regarde votre fiche, vos informations, vos photos, et je vous explique très concrètement ce que vous pouvez optimiser pour mieux ressortir localement."
    },
    {
      question: "Est-ce que je dois prendre un abonnement ?",
      answer: "Non. Mon approche se fait sous forme de prestation unique. Vous achetez le support et mon accompagnement, il n'y a aucun frais mensuel récurrent caché."
    },
    {
      question: "Combien de temps faut-il pour mettre en place la solution ?",
      answer: "C'est très rapide. Dès notre échange, j'analyse votre situation et je configure votre lien. Le support physique vous est expédié rapidement, et vous pouvez commencer immédiatement."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-stone-900 mb-4">Questions fréquentes</h2>
          <p className="text-lg text-stone-600">Des réponses simples, transparentes et honnêtes.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border border-stone-200 rounded-2xl overflow-hidden transition-colors ${openIndex === index ? 'bg-stone-50' : 'bg-white'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
                className="flex items-center justify-between w-full p-6 text-left focus:outline-none"
              >
                <span className="font-bold text-stone-900 pr-8">{faq.question}</span>
                <span className="flex-shrink-0 text-emerald-700">
                  {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </span>
              </button>
              
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.24, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-stone-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
