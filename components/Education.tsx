import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const Education: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const { content } = useLanguage();

  const toggleOpen = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section id="education" className="bg-page-alt py-24 md:py-32 relative border-t border-black/5">
      <div className="container mx-auto px-6 md:px-8 max-w-6xl">
        <div className="mb-14 reveal-section">
          <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase block mb-3">
            {content.education.subtitle}
          </span>
          <h2 className="font-display text-3xl md:text-4xl tracking-[-0.06em] text-black leading-tight whitespace-pre-line">
            {content.education.title}
          </h2>
        </div>

        <div className="space-y-5">
          {content.education.items.map((edu, index) => {
            const isOpen = openId === edu.id;
            return (
              <button
                key={edu.id}
                type="button"
                onClick={() => toggleOpen(edu.id)}
                className={`
                  reveal-section
                  w-full text-left rounded-2xl border transition-all duration-300 ease-out px-6 md:px-8 py-6 md:py-7 
                  flex flex-col gap-2 group
                  ${isOpen 
                    ? 'bg-ivory border-accent/20 shadow-lg ring-1 ring-accent/20 -translate-y-1' 
                    : 'bg-ivory border-black/5 shadow-md hover:shadow-lg hover:-translate-y-1 hover:border-black/10'
                  }
                `}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Tag Uniformisé */}
                    <span className={`
                        inline-flex items-center px-2.5 py-1 mb-2 rounded-full text-[0.65rem] font-mono uppercase tracking-[0.25em] 
                        transition-colors duration-300
                        ${isOpen ? 'bg-accent/10 text-black' : 'bg-black/5 text-charcoal/60'}
                    `}>
                      {edu.tag}
                    </span>

                    <h3 className="font-display text-lg md:text-2xl tracking-[-0.03em] text-black group-hover:text-charcoal transition-colors mt-2">
                      {edu.degree}
                    </h3>
                    
                    <div className="mt-1 flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-steel">
                        <span className="text-black font-semibold text-sm md:text-base">
                            {edu.school}
                        </span>
                        <span className="hidden md:inline w-1 h-1 rounded-full bg-steel/40" />
                        <span className="text-[0.7rem] font-medium tracking-wide">
                            {edu.period} · {edu.location}
                        </span>
                    </div>
                  </div>
                  
                  <div className={`
                    mt-1 flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300
                    ${isOpen 
                        ? 'bg-black text-ivory border-black' 
                        : 'bg-transparent text-charcoal/40 border-charcoal/20 group-hover:border-accent group-hover:text-accent'
                    }
                  `}>
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </div>

                <div
                  className={`
                    overflow-hidden transition-all duration-300 ease-out
                    ${isOpen ? 'max-h-80 opacity-100 mt-5' : 'max-h-0 opacity-0 mt-0'}
                  `}
                >
                  <p className="text-sm md:text-[1.05rem] text-charcoal/80 leading-relaxed max-w-[85%] border-l-2 border-accent/30 pl-4">
                    {edu.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};