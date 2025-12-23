import React from 'react';
import { ArrowRight } from 'lucide-react';

interface GeminiButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: boolean;
}

export const GeminiButton: React.FC<GeminiButtonProps> = ({ children, icon = true, className = '', ...props }) => {
  return (
    <button
      className={`
        group relative inline-flex items-center gap-3 px-6 py-3 rounded-md
        text-sm font-medium tracking-[0.2em] uppercase 
        text-ivory bg-transparent border border-steel/30
        transition-all duration-300 ease-out
        hover:bg-ivory hover:text-black hover:border-ivory
        overflow-hidden
        ${className}
      `}
      {...props}
    >
      {/* Content */}
      <span className="relative z-10 transition-colors">
        {children}
      </span>

      {icon && (
        <span className="relative z-10 flex items-center justify-center">
           <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      )}
    </button>
  );
};