export type Language = 'fr' | 'en' | 'es';

import type Lenis from 'lenis';

// types.ts
export interface ExperienceItem {
  id: string;
  contribution?: string;
  chips?: string[];
  role?: string;
  company?: string;
  date?: string;
  location?: string;
  bullets?: string[];
}

export interface EducationItem {
  id: string;
  tag: string;
  school: string;
  degree: string;
  period: string;
  location: string;
  description: string;
  ranking?: { label: string; source: string; url: string };
}

export interface ProjectItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  impact?: string;
  bullets?: string[];
  stack?: string[];
  links?: { live?: string; repo?: string };
}

export type SkillItem = {
  name: string;
  description: string;
  sentence?: string;
  where?: string[];
};

// Global definitions used by the portfolio animation layer.
declare global {
  interface Window {
    gsap?: any;
    ScrollTrigger?: any;
    MotionPathPlugin?: any;
    lenis?: Lenis;
  }
}
