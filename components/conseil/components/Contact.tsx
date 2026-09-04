import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send } from 'lucide-react';

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(result.message);
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
        setMessage(result.error || "Une erreur est survenue.");
      }
    } catch (error) {
      setStatus('error');
      setMessage(
        import.meta.env.DEV
          ? "En local, le formulaire ne peut pas envoyer d’e-mail. L’envoi réel sera disponible après la configuration de Resend sur Vercel."
          : "Impossible de contacter le serveur. Merci de réessayer plus tard."
      );
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-stone-100 text-stone-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">On regarde ça ensemble ?</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Vous ne savez pas exactement ce qui pourrait être amélioré sur votre fiche Google ? Aucun problème. Expliquez-moi simplement votre activité et votre situation, et nous verrons ensemble ce qui est pertinent pour vous.
          </p>
          <p className="mt-4 text-sm font-medium text-stone-500">
            Réponse sous 48 heures ouvrées, sans engagement.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-stone-200 max-w-2xl mx-auto">
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-6 relative overflow-hidden">
                <motion.div
                  initial={{ x: -20, y: 20, opacity: 0 }}
                  animate={{ x: 0, y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                >
                  <Send className="w-8 h-8 ml-1" />
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-3">Message bien envoyé !</h3>
              <p className="text-stone-600 text-lg max-w-md mx-auto">
                Votre message a bien été envoyé.<br/>Je reviendrai vers vous sous 48 heures ouvrées.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-bold text-stone-800 mb-2">Prénom</label>
                  <input required type="text" id="firstName" name="firstName" className="w-full rounded-xl border border-stone-300 px-4 py-3.5 focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none transition-shadow text-base bg-stone-50 hover:bg-white" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-bold text-stone-800 mb-2">Nom</label>
                  <input required type="text" id="lastName" name="lastName" className="w-full rounded-xl border border-stone-300 px-4 py-3.5 focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none transition-shadow text-base bg-stone-50 hover:bg-white" />
                </div>
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-bold text-stone-800 mb-2">Nom de l'établissement</label>
                <input required type="text" id="company" name="company" placeholder="Le nom visible sur Google" className="w-full rounded-xl border border-stone-300 px-4 py-3.5 focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none transition-shadow text-base placeholder-stone-400 bg-stone-50 hover:bg-white" />
              </div>

              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Ne pas remplir ce champ</label>
                <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <div>
                <label htmlFor="activity" className="block text-sm font-bold text-stone-800 mb-2">Type d'activité</label>
                <input required type="text" id="activity" name="activity" placeholder="Boulangerie, restaurant, coiffeur, artisan…" className="w-full rounded-xl border border-stone-300 px-4 py-3.5 focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none transition-shadow text-base placeholder-stone-400 bg-stone-50 hover:bg-white" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="location" className="block text-sm font-bold text-stone-800 mb-2">Ville ou zone de l'établissement</label>
                  <input required type="text" id="location" name="location" placeholder="Cherbourg, Valognes…" className="w-full rounded-xl border border-stone-300 px-4 py-3.5 focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none transition-shadow text-base placeholder-stone-400 bg-stone-50 hover:bg-white" />
                </div>
                <div>
                  <label htmlFor="locationCount" className="block text-sm font-bold text-stone-800 mb-2">Nombre d'établissements</label>
                  <select required id="locationCount" name="locationCount" defaultValue="" className="w-full rounded-xl border border-stone-300 px-4 py-3.5 focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none transition-shadow text-base bg-stone-50 hover:bg-white">
                    <option value="" disabled>Sélectionnez</option>
                    <option value="1">1 établissement</option>
                    <option value="2 à 5">2 à 5 établissements</option>
                    <option value="6 ou plus">6 établissements ou plus</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="supportNeed" className="block text-sm font-bold text-stone-800 mb-2">Besoin principal <span className="text-stone-400 font-normal">(facultatif)</span></label>
                <select id="supportNeed" name="supportNeed" defaultValue="" className="w-full rounded-xl border border-stone-300 px-4 py-3.5 focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none transition-shadow text-base bg-stone-50 hover:bg-white">
                  <option value="">Je ne sais pas encore</option>
                  <option value="Un support QR/NFC">Un support QR/NFC</option>
                  <option value="Plusieurs supports">Plusieurs supports</option>
                  <option value="Une offre sur mesure">Une offre sur mesure</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="contactMethod" className="block text-sm font-bold text-stone-800 mb-2">Téléphone ou e-mail</label>
                <input required type="text" id="contactMethod" name="contactMethod" className="w-full rounded-xl border border-stone-300 px-4 py-3.5 focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none transition-shadow text-base bg-stone-50 hover:bg-white" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-stone-800 mb-2">Message <span className="text-stone-400 font-normal">(facultatif)</span></label>
                <textarea id="message" name="message" rows={4} placeholder="Quelques mots sur votre besoin…" className="w-full rounded-xl border border-stone-300 px-4 py-3.5 focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none transition-shadow text-base placeholder-stone-400 bg-stone-50 hover:bg-white"></textarea>
              </div>

              {status === 'error' && (
                <div role="alert" className="p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100 font-medium">
                  {message || "Impossible de contacter le serveur."}
                </div>
              )}

              <p className="text-xs leading-relaxed text-stone-500">
                Les informations transmises servent uniquement à répondre à votre demande. <a href="/conseil/politique-confidentialite" className="underline underline-offset-2 hover:text-stone-700">Consulter la politique de confidentialité</a>.
              </p>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full px-8 py-4 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition-all disabled:opacity-70 flex justify-center items-center text-lg shadow-sm"
                >
                  {status === 'submitting' ? 'Envoi en cours...' : 'Envoyer'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
