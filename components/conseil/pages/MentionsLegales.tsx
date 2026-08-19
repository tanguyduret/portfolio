import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { LEGAL_INFO } from '../config/legal';

export function MentionsLegales() {
  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-stone-50 text-stone-900">
      <Link to="/conseil" className="inline-flex items-center text-sm font-medium text-emerald-700 hover:text-emerald-800 hover:underline mb-8">
        <ArrowLeft className="w-4 h-4 mr-1" /> Retour à l'accueil
      </Link>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-stone-900">Mentions légales</h1>
      
      <div className="space-y-10 text-stone-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-stone-900 mb-4">1. Éditeur du site</h2>
          <p>
            Le présent site est édité par :<br />
            <strong>{LEGAL_INFO.publisherName}</strong><br />
            {LEGAL_INFO.publisherStatus}
          </p>
          <ul className="mt-2 space-y-1">
            <li><strong>Adresse de domiciliation :</strong> {LEGAL_INFO.publisherAddress}</li>
            <li><strong>Téléphone :</strong> {LEGAL_INFO.publisherPhone}</li>
            <li><strong>E-mail de contact :</strong> <a href={`mailto:${LEGAL_INFO.publisherEmail}`} className="text-emerald-700 hover:underline">{LEGAL_INFO.publisherEmail}</a></li>
            <li><strong>Site internet :</strong> <a href={`https://${LEGAL_INFO.publisherWebsite}`} className="text-emerald-700 hover:underline">{LEGAL_INFO.publisherWebsite}</a></li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900 mb-4">2. Informations d'immatriculation</h2>
          <ul className="space-y-1">
            <li><strong>SIREN :</strong> {LEGAL_INFO.siren}</li>
            <li><strong>SIRET :</strong> {LEGAL_INFO.siret}</li>
            <li><strong>Code APE :</strong> {LEGAL_INFO.apeCode}</li>
            <li className="mt-3"><strong>TVA :</strong> {LEGAL_INFO.vatStatus}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900 mb-4">3. Directeur de la publication</h2>
          <p>
            Le directeur de la publication est : <strong>{LEGAL_INFO.publicationDirector}</strong><br />
            Contact : <a href={`mailto:${LEGAL_INFO.publisherEmail}`} className="text-emerald-700 hover:underline">{LEGAL_INFO.publisherEmail}</a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900 mb-4">4. Hébergement</h2>
          <p>
            Ce site est hébergé par :<br />
            <strong>{LEGAL_INFO.hostName}</strong><br />
            {LEGAL_INFO.hostAddress}<br />
            Site internet : <a href={`https://${LEGAL_INFO.hostWebsite}`} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">{LEGAL_INFO.hostWebsite}</a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900 mb-4">5. Propriété intellectuelle</h2>
          <p>
            Sauf mention contraire, l'ensemble des éléments accessibles sur le site (notamment les textes, photographies, éléments graphiques, identité visuelle, logo, design, éléments de présentation, code et composants développés pour le site) sont protégés par les règles applicables en matière de propriété intellectuelle et demeurent la propriété exclusive de l'éditeur.
          </p>
          <p className="mt-4">
            La photographie personnelle utilisée sur le site est une photographie réalisée par l'éditeur et dont il possède les droits exclusifs.
          </p>
          <p className="mt-4">
            Toute reproduction, représentation, adaptation ou exploitation non autorisée de tout ou partie du site, par quelque procédé que ce soit, sans l'autorisation préalable et écrite de l'éditeur, peut être interdite et sanctionnée par la législation applicable.
          </p>
        </section>
      </div>
    </div>
  );
}
