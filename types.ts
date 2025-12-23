export type Language = 'fr' | 'en';

export interface ExperienceItem {
  id: string;
  tag: string;
  title: string;
  period: string;
  description: string;
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

export interface SkillItem {
  name: string;
  description: string;
}

// Global definition for GSAP on window object since we load it via CDN
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
    MotionPathPlugin: any;
    lenis: any;
  }
}