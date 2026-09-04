import React, { useMemo, useState } from "react";
import { CtaButton } from "./CtaButton";
import { useLanguage } from "../LanguageContext";

export const Footer: React.FC = () => {
  const { content, language } = useLanguage() as any;

  const email = "tanguy.duret@kedgebs.com";
  const isFR = (language || "en").toLowerCase().startsWith("fr");

  const [copied, setCopied] = useState(false);

  const mailSubject = useMemo(() => {
    return isFR
      ? "Prise de contact - Portfolio"
      : "Contact - Portfolio";
  }, [isFR]);

  const mailBody = useMemo(() => {
    const refsLine = isFR
      ? "PS : Vous pouvez aussi demander mes lettres de recommandation (Airbus - Purchasing Manager + Holidu - Senior Sales Advisor)."
      : "PS: You can also request my recommendation letters (Airbus - Purchasing Manager + Holidu - Senior Sales Advisor).";

    return isFR
      ? `Bonjour Tanguy,

Je vous contacte suite à votre portfolio.
Je souhaiterais échanger avec vous au sujet de votre parcours ou d'une opportunité professionnelle.

— Nom :
— Entreprise :
— Poste :
— Disponibilités :

${refsLine}

Bien cordialement,`
      : `Hi Tanguy,

I'm reaching out after reviewing your portfolio.
I'd like to discuss your background or a professional opportunity.

— Name:
— Company:
— Role:
— Availability:

${refsLine}

Best regards,`;
  }, [isFR]);

  const mailtoHref = useMemo(() => {
    const s = encodeURIComponent(mailSubject);
    const b = encodeURIComponent(mailBody);
    return `mailto:${email}?subject=${s}&body=${b}`;
  }, [email, mailSubject, mailBody]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      // fallback: do nothing (no visual noise)
    }
  };

  // ✅ ONLY CHANGE: language-based CV file
  const cvHref = isFR ? "/FR_CV_Tanguy_Duret.pdf" : "/EN_CV_Tanguy_Duret.pdf";
  const cvDownloadName = isFR ? "FR_CV_Tanguy_Duret.pdf" : "EN_CV_Tanguy_Duret.pdf";

  return (
    <section
      id="contact"
      className="bg-black pt-24 pb-12 md:pt-32 md:pb-16 text-ivory relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="reveal-section container mx-auto px-6 md:px-8 max-w-6xl relative z-10">
        {/* ✅ DO NOT TOUCH headline */}
        <h2 className="text-[11vw] md:text-[8vw] lg:text-[7rem] xl:text-[8rem] font-display font-bold leading-none mb-12 md:mb-16 tracking-tighter bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent break-words md:whitespace-nowrap">
          {content.footer.headline}
        </h2>

        {/* ✅ DO NOT TOUCH divider (top) */}
        <div className="border-t border-white/10 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* LEFT */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div>
                <p className="text-steel text-xs uppercase tracking-widest mb-4">
                  {content.footer.contact_title}
                </p>

                {/* Email (copy on click + small badge "Copié/Copied") */}
                <button
                  type="button"
                  onClick={handleCopy}
                  className="group inline-flex items-center gap-3 text-left"
                  aria-label={isFR ? "Copier l’email" : "Copy email"}
                >
                  <span className="text-2xl md:text-3xl lg:text-4xl text-white group-hover:text-accent transition-colors font-display break-all leading-[1.1]">
                    {email}
                  </span>

                  {/* small badge */}
                  <span
                    className={`
                      rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm
                      px-3 py-1 text-[11px] tracking-wide
                      transition-all duration-200
                      ${copied ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"}
                    `}
                  >
                    {isFR ? "Copié" : "Copied"}
                  </span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[520px]">
                <a href={mailtoHref} className="flex-1">
                  <CtaButton
                    icon={true}
                    className="w-full justify-center h-12 text-xs md:text-sm whitespace-nowrap"
                  >
                    {isFR ? "Envoyer un email" : "Send an email"}
                  </CtaButton>
                </a>

                <a
                  href={cvHref}
                  download={cvDownloadName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <CtaButton
                    icon={false}
                    className="w-full justify-center h-12 text-xs md:text-sm whitespace-nowrap"
                  >
                    {isFR ? "Télécharger le CV" : "Download CV"}
                  </CtaButton>
                </a>
              </div>
            </div>

            {/* RIGHT (Recommendations) */}
            <div className="lg:col-span-5 lg:pt-2">
              <p className="text-steel text-xs uppercase tracking-widest mb-4">
                {isFR ? "Recommandations" : "Recommendations"}
              </p>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-4">
                {/* One-line title + ":" (as requested) */}
                <p className="text-white/85 text-[13px] leading-snug md:leading-none md:whitespace-nowrap">
                  {isFR
                    ? "Lettres de recommandation disponibles sur demande :"
                    : "Recommendation letters available on request:"}
                </p>

                {/* Tight chips */}
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/5 text-white/80 text-[11px] leading-none">
                    Airbus - Purchasing Manager
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-white/80 text-[11px] leading-none">
                    Holidu - Senior Sales Advisor
                  </span>
                </div>

                {/* CTA moved BELOW chips (gold) */}
                <a
                  href={mailtoHref}
                  className="mt-3 inline-flex items-center gap-2 text-accent/90 hover:text-accent transition-colors text-[12px]"
                >
                  <span className="underline decoration-white/15 underline-offset-4">
                    {isFR ? "Demander" : "Request"}
                  </span>
                  <span aria-hidden="true">→</span>
                </a>

                {/* Small grey note kept at bottom */}
                <p className="mt-2 text-steel/50 text-[11px] leading-snug">
                  {isFR
                    ? "Identités et coordonnées partagées uniquement aux recruteurs."
                    : "Names and contact details shared only with recruiters."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar (unchanged) */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[0.7rem] text-steel/60 gap-6 md:gap-4">
          <div className="flex gap-6">
            <span>{content.footer.copyright}</span>
            <span className="hidden md:inline text-steel/20">|</span>
            <span>{content.footer.location}</span>
            <span className="hidden md:inline text-steel/20">|</span>
            <a href="/conseil" className="hover:text-white transition-colors">
              {isFR ? 'Ma page de consulting' : 'My consulting page'}
            </a>
          </div>

          <a
            href="https://www.linkedin.com/in/tanguy-duret-kedgebs"
            target="_blank"
            rel="noreferrer"
            className="uppercase tracking-[0.2em] hover:text-white transition-colors relative group"
          >
            LinkedIn
            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
      </div>
    </section>
  );
};
