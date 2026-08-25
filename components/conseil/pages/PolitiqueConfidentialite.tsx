import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { LEGAL_INFO } from '../config/legal';

export function PolitiqueConfidentialite() {
  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-stone-50 text-stone-900">
      <Link to="/conseil" className="inline-flex items-center text-sm font-medium text-emerald-700 hover:text-emerald-800 hover:underline mb-8">
        <ArrowLeft className="w-4 h-4 mr-1" /> Retour à l'accueil
      </Link>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-stone-900">Politique de confidentialité</h1>
      
      <div className="space-y-10 text-stone-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-stone-900 mb-4">1. Responsable du traitement</h2>
          <p>
            Le responsable du traitement des données personnelles collectées sur ce site est :<br />
            <strong>{LEGAL_INFO.publisherName}</strong><br />
            {LEGAL_INFO.publisherStatus}
          </p>
          <ul className="mt-2 space-y-1">
            <li><strong>Adresse de domiciliation de l'entreprise :</strong> {LEGAL_INFO.publisherAddress}</li>
            <li>E-mail : <a href={`mailto:${LEGAL_INFO.publisherEmail}`} className="text-emerald-700 hover:underline">{LEGAL_INFO.publisherEmail}</a></li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900 mb-4">2. Données collectées par le formulaire</h2>
          <p>
            Le formulaire de contact présent sur le site collecte uniquement les informations suivantes transmises volontairement par l'utilisateur :
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Prénom</li>
            <li>Nom</li>
            <li>Nom de l'entreprise</li>
            <li>Type d'activité</li>
            <li>Téléphone ou e-mail de contact</li>
            <li>Message (facultatif)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900 mb-4">3. Finalité du traitement et base juridique</h2>
          <p>
            Ces données sont utilisées uniquement pour :
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>recevoir et traiter les demandes envoyées via le formulaire ;</li>
            <li>reprendre contact avec la personne ayant formulé une demande ;</li>
            <li>comprendre son activité et son besoin ;</li>
            <li>préparer éventuellement une proposition commerciale ou un échange.</li>
          </ul>
          <p className="mt-4">
            Le traitement des données transmises volontairement via le formulaire de contact repose sur les mesures précontractuelles pouvant être nécessaires à la demande de la personne concernée et, selon le contexte, sur l'intérêt légitime de l'entreprise à répondre aux sollicitations professionnelles qui lui sont adressées.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900 mb-4">4. Destinataires des données</h2>
          <p>
            Les données collectées sont principalement destinées à <strong>{LEGAL_INFO.publisherName}</strong> et aux prestataires techniques strictement nécessaires au fonctionnement du site et à la transmission des messages.
          </p>
          <p className="mt-4">
            Les demandes envoyées par le formulaire sont reçues à l'adresse interne {LEGAL_INFO.internalContactEmail}. L'adresse publique de contact reste <a href={`mailto:${LEGAL_INFO.publisherEmail}`} className="text-emerald-700 hover:underline">{LEGAL_INFO.publisherEmail}</a>. Les données peuvent transiter par les services techniques nécessaires à l'acheminement des messages électroniques. Le site est hébergé par {LEGAL_INFO.hostName}.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900 mb-4">5. Hébergement et données techniques</h2>
          <p>
            Le site étant hébergé sur Vercel, certaines données techniques peuvent être traitées automatiquement dans le cadre du fonctionnement, de la sécurité et de la maintenance du site, notamment des informations techniques telles que les journaux de connexion ou l'adresse IP lorsque cela est nécessaire.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900 mb-4">6. Cookies</h2>
          <p>
            Le site n'utilise actuellement pas de cookies publicitaires ou de cookies de mesure d'audience nécessitant un consentement. Des cookies ou technologies strictement nécessaires au fonctionnement technique du site peuvent toutefois être utilisés par les services techniques assurant son fonctionnement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900 mb-4">7. Durée de conservation</h2>
          <p>
            Les données sont conservées pendant la durée nécessaire au traitement de la demande et à la relation qui peut en découler. Lorsqu'une personne reste un prospect, ses données peuvent être conservées pendant une durée maximale de trois ans à compter de leur collecte ou du dernier contact émanant de sa part, sauf obligation légale contraire ou demande d'effacement préalable.
          </p>
          <p className="mt-4">
            Pour les données devenant nécessaires à une relation contractuelle ou commerciale, elles peuvent être conservées pendant les durées légales applicables.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900 mb-4">8. Vos droits</h2>
          <p>
            Conformément à la réglementation applicable en matière de protection des données, vous disposez notamment des droits suivants : d'accès, de rectification, d'effacement, de limitation du traitement, d'opposition et de portabilité (lorsque ce droit est applicable).
          </p>
          <p className="mt-4">
            Pour exercer ces droits, vous pouvez nous contacter :
          </p>
          <ul className="mt-2 space-y-1">
            <li>Par e-mail : <a href={`mailto:${LEGAL_INFO.publisherEmail}`} className="text-emerald-700 hover:underline">{LEGAL_INFO.publisherEmail}</a></li>
            <li>Par courrier : {LEGAL_INFO.publisherName}, à l'adresse de domiciliation de l'entreprise indiquée ci-dessus.</li>
          </ul>
          <p className="mt-4">
            Si vous estimez, après nous avoir contactés, que vos droits concernant vos données personnelles ne sont pas respectés, vous pouvez introduire une réclamation auprès de la Commission nationale de l'informatique et des libertés (CNIL). (<a href="https://www.cnil.fr/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">https://www.cnil.fr/</a>)
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900 mb-4">9. Sécurité</h2>
          <p>
            Des mesures techniques et organisationnelles raisonnables sont mises en œuvre afin de protéger les données personnelles contre les accès, modifications, divulgations ou destructions non autorisés.
          </p>
        </section>

        <section className="pt-8 border-t border-stone-200">
          <p className="text-sm text-stone-500">
            Cette politique de confidentialité peut être mise à jour afin de tenir compte de l'évolution du site, des services utilisés ou des obligations légales applicables.<br />
            Dernière mise à jour : {LEGAL_INFO.lastUpdated}
          </p>
        </section>
      </div>
    </div>
  );
}
