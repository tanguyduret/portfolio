import React from 'react';
import { GeminiButton } from './GeminiButton';
import { useLanguage } from '../LanguageContext';

export const Footer: React.FC = () => {
  const { content } = useLanguage();

  return (
    <section
      id="contact"
      className="bg-black pt-24 pb-12 md:pt-32 md:pb-16 text-ivory relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="reveal-section container mx-auto px-6 md:px-8 max-w-6xl relative z-10">
        <h2 className="text-[11vw] md:text-[8vw] lg:text-[7rem] xl:text-[8rem] font-display font-bold leading-none mb-12 md:mb-16 tracking-tighter bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent break-words md:whitespace-nowrap">
          {content.footer.headline}
        </h2>

        <div className="flex flex-col md:flex-row justify-between items-start gap-12 border-t border-white/10 pt-12">
          {/* Email & Buttons Section */}
          <div className="flex flex-col gap-8 w-full md:max-w-lg">
            <div>
              <p className="text-steel text-xs uppercase tracking-widest mb-4">
                {content.footer.contact_title}
              </p>
              <a
                href="mailto:tanguy.duret@kedgebs.com"
                className="text-2xl md:text-3xl lg:text-4xl text-white hover:text-accent transition-colors font-display"
              >
                tanguy.duret@kedgebs.com
              </a>
            </div>

            {/* Buttons Container */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <a href="mailto:tanguy.duret@kedgebs.com" className="flex-1">
                <GeminiButton icon={true} className="w-full justify-center h-12 text-xs md:text-sm">
                  {content.footer.send_email}
                </GeminiButton>
              </a>

              <a
                href="/Tanguy_Duret_CV.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <GeminiButton icon={false} className="w-full justify-center h-12 text-xs md:text-sm">
                  {content.footer.download_cv}
                </GeminiButton>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[0.7rem] text-steel/60 gap-6 md:gap-4">
          <div className="flex gap-6">
            <span>{content.footer.copyright}</span>
            <span className="hidden md:inline text-steel/20">|</span>
            <span>{content.footer.location}</span>
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