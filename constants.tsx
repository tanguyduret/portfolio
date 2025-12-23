import { ExperienceItem, ProjectItem, SkillItem, EducationItem } from './types';

// Raw data separated by language
const experienceItemsFr: ExperienceItem[] = [
  {
    id: 'holidu',
    tag: 'Travel Tech · Account Management',
    title: 'Account Manager — Holidu',
    period: '08/2025 – 02/2026 · Bordeaux',
    description:
      "Gestion d'un portefeuille de +100 comptes propriétaires. Optimisation de la visibilité sur les plateformes (Airbnb, Booking). Pilotage de la stratégie prix générant une augmentation de 20% du GMV annuel. Utilisation de Looker et CRM pour identifier les opportunités de croissance.",
  },
  {
    id: 'airbus',
    tag: 'Aviation · Procurement',
    title: 'Intern Buyer Seats — Airbus',
    period: '01/2025 – 08/2025 · Toulouse',
    description:
      "Gestion des relations contractuelles avec des fournisseurs internationaux (France, Italie, Chine). Coordination avec la production et la logistique pour assurer le ramp-up. Développement d'un outil d'analyse de données pour réduire les réclamations fournisseurs et optimiser les coûts.",
  },
  {
    id: 'ams',
    tag: 'Junior-Entreprise · Consulting',
    title: 'Marketing & Communication Manager — AMS Conseil',
    period: '10/2023 – 12/2024 · Bordeaux',
    description:
      "Réalisation d'études de marché pour des clients variés (PME, LVMH, Airbus, BNP Paribas). Management d'équipes jusqu'à 18 personnes et gestion de la relation client via Hubspot. Élaboration de la stratégie de communication et refonte du site web.",
  },
  {
    id: 'staffme',
    tag: 'Freelance · Field',
    title: 'Freelance Consultant — StaffMe',
    period: 'Depuis 2022 · France',
    description:
      "Missions de merchandising (ex: Hollywood Chewing Gum), inventaires en pharmacie (Inv'stock) et opérations promotionnelles. Forte adaptabilité aux différents contextes commerciaux terrain.",
  },
];

const experienceItemsEn: ExperienceItem[] = [
  {
    id: 'holidu',
    tag: 'Travel Tech · Account Management',
    title: 'Account Manager — Holidu',
    period: '08/2025 – 02/2026 · Bordeaux',
    description:
      "Managed a portfolio of 100+ property owner accounts. Optimized visibility on booking platforms (Airbnb, Booking). Led pricing strategies driving a 20% GMV increase year-over-year. Used Google Suite, Excel, Looker, and CRM tools to identify performance opportunities.",
  },
  {
    id: 'airbus',
    tag: 'Aviation · Procurement',
    title: 'Intern Buyer Seats — Airbus',
    period: '01/2025 – 08/2025 · Toulouse',
    description:
      "Managed supplier relationships with key international suppliers (France, Italy, China). Monitored delivery schedules and coordinated with logistics to ensure the delivery ramp-up. Developed a data analysis tool to track supplier claims and contribute to cost optimization.",
  },
  {
    id: 'ams',
    tag: 'Junior-Entreprise · Consulting',
    title: 'Marketing & Communication Manager — AMS Conseil',
    period: '10/2023 – 12/2024 · Bordeaux',
    description:
      "Conducted market studies and benchmarks for clients ranging from SMEs to large corporations (e.g., Airbus, LVMH, BNP Paribas). Managed teams of up to 18 people and oversaw the full client relationship using Hubspot. Developed the communication plan and updated the company website.",
  },
  {
    id: 'staffme',
    tag: 'Freelance · Field',
    title: 'Freelance Consultant — StaffMe',
    period: 'Since 2022 · France',
    description:
      "Delivered merchandising services for major retail chains (Hollywood Chewing Gum). Completed pharmacy inventory missions and participated in various promotional campaigns, demonstrating strong adaptability.",
  },
];

const educationItemsFr: EducationItem[] = [
  {
    id: 'kedge',
    tag: 'Master · Achats & Supply Chain',
    school: 'Kedge Business School',
    degree: 'Programme Grande École — Majeure MOSI',
    period: '09/2023 – 06/2027',
    location: 'Bordeaux, France',
    description:
      "Top 7 France et #29 Europe (FT 2024). Cursus spécialisé : Sourcing Stratégique, Management des Achats & Supply Chain, Logistique, Analyse des Coûts, Gestion des Risques Fournisseurs, Achats Responsables, Droit des Affaires.",
  },
  {
    id: 'uba',
    tag: 'Mobilité Internationale · Économie · Management',
    school: 'Université de Buenos Aires (UBA)',
    degree: 'Semestre d’Échange International',
    period: '02/2026 – 08/2026',
    location: 'Buenos Aires, Argentine',
    description:
      "Durant mon semestre à l'Université de Buenos Aires, j'ai renforcé mes compétences en stratégie, gestion organisationnelle et analyse économique grâce à des cours avancés ancrés dans les réalités du marché latino-américain. Cette expérience académique a également accru mon adaptabilité et ma communication interculturelle, en collaborant au quotidien avec des étudiants internationaux et des professeurs aux perspectives académiques variées.",
  },
  {
    id: 'prepa',
    tag: 'CPGE · Économie & Maths',
    school: 'Lycée Charles de Gaulle',
    degree: 'Classes Préparatoires aux Grandes Écoles',
    period: '09/2021 – 06/2023',
    location: 'Caen, France',
    description:
      "Formation intensive et sélective préparant aux concours nationaux des Grandes Écoles. Programme centré sur les Mathématiques Avancées, l'Économie et la Culture Générale. Développement d'une forte capacité d'analyse, de synthèse et de travail sous pression.",
  },
];

const educationItemsEn: EducationItem[] = [
  {
    id: 'kedge',
    tag: 'Master · Purchasing & Supply Chain',
    school: 'Kedge Business School',
    degree: 'Grande École Program — Major in MOSI',
    period: '09/2023 – 06/2027',
    location: 'Bordeaux, France',
    description:
      "Top-tier French Business School — Ranked #7 in France and #29 in Europe by the Financial Times in 2024. Core coursework: Strategic Sourcing, Procurement & Supply Chain Management, Logistics, Cost Analysis, Supplier Relationship & Risk Management, Sustainable Procurement, Business Law.",
  },
  {
    id: 'uba',
    tag: 'International Mobility · Economics · Management',
    school: 'University of Buenos Aires (UBA)',
    degree: 'International Exchange Semester',
    period: '02/2026 – 08/2026',
    location: 'Buenos Aires, Argentina',
    description:
      "During my semester at the University of Buenos Aires, I strengthened my skills in strategy, organizational management, and economic analysis through advanced coursework rooted in real Latin American market conditions. This academic experience also enhanced my adaptability and intercultural communication, as I collaborated daily with international students and professors with diverse academic perspectives.",
  },
  {
    id: 'prepa',
    tag: 'Preparatory Classes',
    school: 'Lycée Charles de Gaulle',
    degree: 'Preparatory Classes for Business Schools',
    period: '09/2021 – 06/2023',
    location: 'Caen, France',
    description:
      "Highly selective and intensive two-year program preparing for national competitive exams to enter top-tier French business schools. Curriculum focused on Advanced Mathematics, Economics, and Social Sciences. Developed strong analytical, quantitative, and critical thinking skills.",
  },
];

const projectsDataFr: ProjectItem[] = [
  {
    id: 'photo',
    tag: 'Photo · Creative',
    title: 'Photographie & Esthétique',
    description:
      "Une approche systémique de l'image. Création de presets Lightroom et curation de séries (Aviation, Paysages) pour maintenir une cohérence visuelle stricte et une narration continue sur le long terme.",
  },
  {
    id: 'notion',
    tag: 'Systems · Templates',
    title: 'Systèmes Notion pour structurer le quotidien',
    description:
      "Concevoir des environnements numériques pour réduire la charge mentale. Des tableaux de bord interconnectés pour piloter finances et objectifs, transformant le chaos en clarté opérationnelle.",
  },
  {
    id: 'portfolio',
    tag: 'Web · Design',
    title: 'Portfolio & Identité Visuelle',
    description:
      "Traiter son identité personnelle comme un produit. Un travail de précision sur la typographie, la hiérarchie de l'information et l'expérience utilisateur pour refléter une rigueur professionnelle.",
  },
  {
    id: 'habits',
    tag: 'Product · Side Project',
    title: 'Design Comportemental & Systèmes',
    description:
      "Explorer l'intersection entre produit et psychologie. Conception de mécanismes pour visualiser la progression, gamifier la régularité et ancrer des habitudes durables grâce à des boucles de feedback.",
  },
];

const projectsDataEn: ProjectItem[] = [
  {
    id: 'photo',
    tag: 'Photo · Creative',
    title: 'Photography & Aesthetics',
    description:
      "A systemic approach to imagery. Developing custom Lightroom presets and curating series (Aviation, Landscapes) to maintain strict visual consistency and continuous storytelling over the long term.",
  },
  {
    id: 'notion',
    tag: 'Systems · Templates',
    title: 'Notion Systems for Daily Structure',
    description:
      "Designing digital environments to reduce cognitive load and enhance decision-making. Interconnected dashboards to manage finances, knowledge, and goals—transforming chaos into structured clarity.",
  },
  {
    id: 'portfolio',
    tag: 'Web · Design',
    title: 'Portfolio & Visual Identity',
    description:
      "Treating personal branding as a product. A deep dive into typography, information hierarchy, and micro-interactions to create a digital experience that reflects precision and modern design standards.",
  },
  {
    id: 'habits',
    tag: 'Product · Side Project',
    title: 'Behavioral Design & Habit Systems',
    description:
      "Exploring the intersection of product design and psychology. Conceptualizing a system to visualize progress, gamify consistency, and influence long-term behavior through feedback loops and data-driven motivation.",
  },
];

const skillsDataFr: SkillItem[] = [
  { name: 'Procurement & Négotiation', description: 'Sourcing, cycle contractuel et négociation.' },
  { name: 'Supplier Management', description: 'Pilotage de la performance et relations long-terme.' },
  { name: 'Data & Analytics', description: 'Excel (TOSA), Power BI et Looker.' },
  { name: 'CRM Ecosystems', description: 'Hubspot, Pipedrive & Account Management.' },
  { name: 'Notion Architecture', description: 'Création de systèmes et tableaux de bord.' },
  { name: 'AI & Prompting', description: 'Levier de performance pour analyser, créer et résoudre plus efficacement.' },
  { name: 'Photography & Creative', description: 'Lightroom, retouche et direction artistique.' },
  { name: 'Leadership & Teamwork', description: 'Management d’équipe et intelligence collective.' },
  { name: 'Adaptability', description: 'Agilité et efficacité en environnements mouvants.' },
  { name: 'Communication', description: 'Aisance relationnelle, écoute active et persuasion.' },
  { name: 'Problem Solving', description: 'Esprit analytique orienté vers la résolution de problèmes.' },
  { name: 'Langues (FR, EN, ES)', description: 'Français natif, Anglais C1, Espagnol B1.' },
];

const skillsDataEn: SkillItem[] = [
  { name: 'Procurement & Negotiation', description: 'Sourcing, contract lifecycle, and negotiation.' },
  { name: 'Supplier Management', description: 'Performance tracking and long-term relationships.' },
  { name: 'Data & Analytics', description: 'Excel (TOSA), Power BI, and Looker.' },
  { name: 'CRM Ecosystems', description: 'Hubspot, Pipedrive & Account Management.' },
  { name: 'Notion Architecture', description: 'System design and dashboard creation.' },
  { name: 'AI & Prompting', description: 'Performance lever to analyze, create, and solve more efficiently.' },
  { name: 'Photography & Creative', description: 'Lightroom, editing, and art direction.' },
  { name: 'Leadership & Teamwork', description: 'Team management and collective intelligence.' },
  { name: 'Adaptability', description: 'Agility and efficiency in changing environments.' },
  { name: 'Communication', description: 'Interpersonal skills, active listening, and persuasion.' },
  { name: 'Problem Solving', description: 'Analytical mindset oriented towards problem resolution.' },
  { name: 'Languages (FR, EN, ES)', description: 'French Native, English C1, Spanish B1.' },
];

// Main export containing all translations
export const translations = {
  fr: {
    nav: { experience: 'Expérience', education: 'Formation', projects: 'Projets', skills: 'Skills', contact: 'Contact' },
    hero: {
      role: "Recherche d’alternance de 1 an en Achats",
      date: "Septembre 2026",
      subrole: "Achats & Procurement · Business & Operations",
      cta: "Décoller"
    },
    experience: {
      subtitle: "Expérience",
      title: "Les contextes où j’ai appris\nà être opérationnel.",
      description: "Un fil conducteur : des environnements exigeants, orientés résultats, où il faut relier les chiffres, le terrain et les personnes.",
      items: experienceItemsFr
    },
    education: {
        subtitle: "Education",
        title: "Mon socle académique.",
        items: educationItemsFr
    },
    projects: {
      subtitle: "Projets",
      title: "Des projets perso pour\ntester, créer, ajuster.",
      description: "Photo, systèmes Notion, side projects : tout ce qui me permet d’expérimenter sans attendre un cadre “officiel”.",
      items: projectsDataFr
    },
    skills: {
      subtitle: "Skills",
      title: "Ce que je sais vraiment\nmettre en mouvement.",
      description: "Un mélange de \"Hard Skills\" analytiques et de \"Soft Skills\" relationnelles.",
      cta: "Cliquez pour explorer",
      key_skill: "Compétence Clé",
      items: skillsDataFr
    },
    about: {
      title: "Une approche très simple :",
      titleSuffix: "enlever le bruit, garder l’essentiel.",
      p1: "Je viens des prépas, des tableaux Excel et des environnements où les détails comptent vraiment. Aujourd’hui, je relie cette rigueur au terrain : fournisseurs, partenaires, données, et décisions à prendre rapidement.",
      p2: "Ce site est une extension de cette philosophie : peu d’éléments, mais chacun a une raison d’être. L’objectif : vous permettre de comprendre en quelques écrans qui je suis, ce que j’ai fait, et comment je peux contribuer.",
      p3: "Si vous cherchez quelqu’un de structuré, à l’aise avec les chiffres comme avec le relationnel, et qui aime autant l’aviation que les systèmes bien pensés, on devrait bien s’entendre."
    },
    footer: {
      headline: "Let's Fly Together.",
      contact_title: "Me Contacter",
      send_email: "Envoyer un email",
      download_cv: "Télécharger mon CV",
      copyright: "© 2026 Tanguy Duret",
      location: "Bordeaux, France"
    },
    }
  },
  en: {
    nav: { experience: 'Experience', education: 'Education', projects: 'Projects', skills: 'Skills', contact: 'Contact' },
    hero: {
      role: "Seeking a 1-Year Purchasing Apprenticeship",
      date: "September 2026",
      subrole: "Purchasing & Procurement · Business & Operations",
      cta: "Scroll to take off"
    },
    experience: {
      subtitle: "Experience",
      title: "Contexts where I learned\nto be operational.",
      description: "A common thread: demanding, result-oriented environments where connecting numbers, the field, and people is key.",
      items: experienceItemsEn
    },
    education: {
        subtitle: "Education",
        title: "Academic Background.",
        items: educationItemsEn
    },
    projects: {
      subtitle: "Projects",
      title: "Personal projects to\ntest, create, adjust.",
      description: "Photography, Notion systems, side projects: everything that allows me to experiment without waiting for an “official” framework.",
      items: projectsDataEn
    },
    skills: {
      subtitle: "Skills",
      title: "What I really know how\nto set in motion.",
      description: "A mix of analytical \"Hard Skills\" and relational \"Soft Skills\".",
      cta: "Click to explore",
      key_skill: "Key Skill",
      items: skillsDataEn
    },
    about: {
      title: "A very simple approach:",
      titleSuffix: "remove the noise, keep the essential.",
      p1: "I come from preparatory classes, Excel spreadsheets, and environments where details truly matter. Today, I connect this rigor to the field: suppliers, partners, data, and decisions that need to be made quickly.",
      p2: "This site is an extension of this philosophy: few elements, but each has a reason to exist. The goal: to allow you to understand in a few screens who I am, what I have done, and how I can contribute.",
      p3: "If you are looking for someone structured, comfortable with numbers as well as relationships, and who loves aviation as much as well-thought-out systems, we should get along well."
    },
    footer: {
      headline: "Let's Fly Together.",
      contact_title: "Contact Me",
      send_email: "Send Email",
      download_cv: "Download my CV",
      copyright: "© 2026 Tanguy Duret",
      location: "Bordeaux, France"
    },
  }
};