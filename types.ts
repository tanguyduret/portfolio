export type Language = 'fr' | 'en';

// types.ts
export interface ExperienceItem {
  id: string;
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
}

export interface ProjectItem {
  id: string;
  tag: string;
  title: string;
  description: string;
}

export type SkillItem = {
  name: string;
  description: string;
  sentence?: string;
  where?: string[];
};

// Global definition for GSAP on window object since we load it via CDN
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
    MotionPathPlugin: any;
    lenis: any;
  }
}