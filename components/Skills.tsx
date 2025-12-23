import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const Skills: React.FC = () => {
  const [activeSkillName, setActiveSkillName] = useState<string | null>(null);
  const { content } = useLanguage();

  const getFloatClass = (index: number) => {
    const animations = ['animate-float-1', 'animate-float-2', 'animate-float-3', 'animate-float-4'];
    return animations[index % animations.length];
  };

  const activeSkillData = content.skills.items.find((s) => s.name === activeSkillName);

  return (
    <section
      id="skills"
      className="relative py-24 md:py-32 bg-accent/5 overflow-hidden"
    >
      {/* Decorative background blur (Reduced Opacity to 0.2) */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/60 rounded-full blur-[120px] pointer-events-none transition-opacity duration-500 mix-blend-soft-light" 
        style={{ opacity: activeSkillName ? 0 : 0.2 }} 
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-[100px] pointer-events-none transition-opacity duration-500 mix-blend-multiply" 
        style={{ opacity: activeSkillName ? 0 : 0.2 }} 
      />

      {/* Text Container */}
      <div className={`reveal-section container mx-auto px-6 md:px-12 max-w-5xl mb-16 md:mb-24 relative z-10 text-center md:text-left skills-text-content transition-all duration-700 ease-in-out ${activeSkillName ? 'opacity-20 blur-sm' : 'opacity-100'}`}>
        <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase block mb-3">
          {content.skills.subtitle}
        </span>
        <h2 className="font-display text-3xl md:text-4xl tracking-[-0.06em] text-black leading-tight whitespace-pre-line">
          {content.skills.title}
        </h2>
        <p className="mt-6 text-sm md:text-base text-charcoal/80 max-w-xl leading-relaxed mx-auto md:mx-0">
          {content.skills.description}
          <br className="hidden md:block" />
          <span className="text-xs opacity-60 uppercase tracking-widest mt-2 block">{content.skills.cta}</span>
        </p>
      </div>

      {/* Cloud Container */}
      {/* PERFORMANCE OPTIMIZATION: will-change-transform added to hint browser for GPU layering */}
      <div className="relative max-w-[1400px] mx-auto px-4 md:px-8 pb-12 z-30">
        <div className="reveal-section skills-cloud relative flex flex-wrap gap-4 md:gap-6 justify-center will-change-transform transform-gpu">
          {content.skills.items.map((skill, index) => {
            const isActive = skill.name === activeSkillName;

            return (
              <div
                key={skill.name}
                className={getFloatClass(index)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  onClick={() => setActiveSkillName(skill.name)}
                  className={`
                    group relative rounded-full h-12 md:h-14 px-8
                    flex items-center justify-center cursor-pointer
                    transition-all duration-300 ease-out
                    bg-white/80 backdrop-blur-md border border-white/60
                    shadow-[0_4px_20px_-5px_rgba(0,0,0,0.03)]
                    hover:scale-105 hover:-translate-y-1 hover:bg-white hover:border-accent/40
                    hover:shadow-[0_10px_30px_-5px_rgba(215,195,137,0.3)]
                    active:scale-95
                    overflow-hidden
                    ${isActive ? 'bg-accent text-black scale-105 border-accent' : ''}
                    ${activeSkillName && !isActive ? 'opacity-30 blur-[1px] scale-95 grayscale' : 'opacity-100'}
                  `}
                >
                  {/* Shimmer Effect on Hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/80 to-transparent z-10 pointer-events-none" />
                  
                  {/* Subtle Gradient Background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white via-ivory to-accent/10 transition-opacity duration-500" />

                  {/* Centered Text */}
                  <span className="relative z-20 text-xs md:text-sm font-medium tracking-widest uppercase text-charcoal/80 group-hover:text-black transition-colors">
                    {skill.name}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ACTIVE FULL SCREEN OVERLAY */}
      {activeSkillData && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop Blur */}
          <div 
            className="absolute inset-0 bg-ivory/80 backdrop-blur-xl animate-[fade-in_0.4s_ease-out_forwards]" 
            onClick={() => setActiveSkillName(null)}
          >
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
             `}</style>
          </div>

          {/* Expanded Bubble */}
          <div 
            className="relative z-110 bg-ivory rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.1)] 
                       p-8 md:p-16 flex flex-col items-center justify-center gap-6 text-center 
                       max-w-2xl w-full
                       border border-black/5
                       animate-[modal-up_0.5s_cubic-bezier(0.2,0.8,0.2,1)_forwards]"
          >
            <style>
                {`
                @keyframes modal-up {
                    0% { opacity: 0; transform: scale(0.95) translateY(20px); }
                    100% { opacity: 1; transform: scale(1) translateY(0); }
                }
                `}
            </style>
            
            <button 
                onClick={() => setActiveSkillName(null)}
                className="absolute top-6 right-6 text-charcoal/40 hover:text-black transition-colors p-2"
            >
                <X size={24} />
            </button>
            
            <span className="text-accent text-[0.65rem] font-mono uppercase tracking-[0.4em] bg-accent/5 px-4 py-2 rounded-full border border-accent/10">
              {content.skills.key_skill}
            </span>
            
            <h3 className="font-display text-3xl md:text-5xl text-black leading-none tracking-tight mt-2">
                {activeSkillData.name}
            </h3>
            
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent my-2" />
            
            <p className="text-base md:text-xl text-charcoal/70 leading-relaxed font-light">
                {activeSkillData.description}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};