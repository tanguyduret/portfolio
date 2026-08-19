import { ExperienceItem, ProjectItem, SkillItem, EducationItem } from './types';

// Raw data separated by language
const experienceItemsFr: ExperienceItem[] = [
  {
    id: "holidu",
    chips: ["TRAVEL TECH", "ACCOUNT MANAGEMENT"],
    role: "Account Manager - Intern",
    company: "Holidu",
    date: "08/2025 – 02/2026",
    location: "Bordeaux",
    bullets: [
      "Gestion d’un portefeuille de propriétaires : performance, rétention, relation client.",
      "Suivi des KPI (occupation, visibilité, conversion) et mise en œuvre de plans d’action.",
      "Coordination avec les équipes internes pour améliorer l’expérience client et la valeur partenaire.",
    ],
  },
  {
    id: "airbus",
    chips: ["AVIATION", "PROCUREMENT"],
    role: "Stagiaire Acheteur - Sièges",
    company: "Airbus",
    date: "01/2025 – 08/2025",
    location: "Toulouse",
    bullets: [
      "Suivi d’un périmètre fournisseurs sièges (linefit) : performance, risques et escalations.",
      "Consolidation d’indicateurs et préparation de supports (KPI, inputs stakeholders, workshops).",
      "Participation à des workshops et visites terrain (mock-up, FAL) pour connecter data et opérationnel.",
    ],
  },
  {
    id: "ams",
    chips: ["JUNIOR-ENTREPRISE", "CONSULTING"],
    role: "Responsable Marketing & Communication - Chef de projet",
    company: "AMS Conseil",
    date: "10/2023 – 12/2024",
    location: "Bordeaux",
    bullets: [
      "Acquisition de clients (ETI & grands comptes) : prospection, scrapping, qualification et suivi sur Hubspot.",
      "Gestion de projets d'une équipe de 18 personnes pour des clients tels qu’Airbus, LVMH et BNP Paribas.",
      "Création de supports et contenus marketing pour renforcer la crédibilité et la performance commerciale.",
    ],
  },
  {
    id: "staffme",
    chips: ["FREELANCE", "FIELD"],
    role: "Freelance Consultant",
    company: "StaffMe",
    date: "Depuis 2022",
    location: "France",
    bullets: [
      "Réalisation de missions terrain : inventaires en pharmacie, merchandising et opérations promotionnelles.",
      "Participation à des campagnes de distribution, de sondages et d’animations commerciales selon les besoins.",
      "Adaptation rapide aux différents contextes et aux consignes, avec un focus sur la fiabilité d’exécution.",
    ],
  },
];

const experienceItemsEn: ExperienceItem[] = [
  {
    id: "holidu",
    chips: ["TRAVEL TECH", "ACCOUNT MANAGEMENT"],
    role: "Account Manager - Intern",
    company: "Holidu",
    date: "08/2025 – 02/2026",
    location: "Bordeaux",
    bullets: [
      "Managed a portfolio of property owners: performance, retention, client relationship.",
      "Tracked KPIs (occupancy, visibility, conversion) and implemented action plans.",
      "Collaborated with internal teams to improve client experience and partner value.",
    ],
  },
  {
    id: "airbus",
    chips: ["AVIATION", "PROCUREMENT"],
    role: "Buyer Intern - Seats",
    company: "Airbus",
    date: "01/2025 – 08/2025",
    location: "Toulouse",
    bullets: [
      "Monitored seat suppliers scope (linefit): performance, risks, escalations.",
      "Built indicators and stakeholder-ready supports (KPIs, workshops, inputs).",
      "Joined workshops and on-site visits (mock-up, FAL) to connect data and operations.",
    ],
  },
  {
    id: "ams",
    chips: ["JUNIOR-ENTREPRISE", "CONSULTING"],
    role: "Marketing & Communication Manager - Project Manager",
    company: "AMS Conseil",
    date: "10/2023 – 12/2024",
    location: "Bordeaux",
    bullets: [
      "Client acquisition (mid-sized companies & large corporates): prospecting, scraping, qualification and follow-up with Hubspot.",
      "Project management of an 18 people team for clients such as Airbus, LVMH and BNP Paribas.",
      "Created marketing assets and content to strengthen credibility and commercial performance.",
    ],
  },
  {
    id: "staffme",
    chips: ["FREELANCE", "FIELD"],
    role: "Freelance Consultant",
    company: "StaffMe",
    date: "Since 2022",
    location: "France",
    bullets: [
      "Handled field missions: pharmacy inventory checks, merchandising, and promotional operations.",
      "Supported campaigns involving leaflet distribution, surveys, and in-store animations depending on needs.",
      "Adapted quickly to different environments and guidelines, with a focus on reliable execution.",
    ],
  },
];

const educationItemsFr: EducationItem[] = [
  {
    id: 'kedge',
    tag: 'Master · Achats & Supply Chain',
    school: 'Kedge Business School',
    degree: 'Programme Grande École - Majeure MOSI (Achats & Supply Chain)',
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
      "Semestre d’échange à l’Université de Buenos Aires, où je développe actuellement mes compétences en stratégie, gestion des organisations et analyse économique à travers des cours ancrés dans les réalités du marché latino-américain. Cette expérience me permet également de renforcer mon adaptabilité et ma communication interculturelle au contact quotidien d’étudiants et d’enseignants internationaux.",
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
    degree: 'Grande École Program - Major in MOSI (Procurement & Supply Chain)',
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
      "Exchange semester at the University of Buenos Aires, where I am currently developing skills in strategy, organizational management and economic analysis through coursework rooted in real Latin American market conditions. This experience is also strengthening my adaptability and cross-cultural communication through daily collaboration with international students and professors.",
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
    tag: 'Photo · Création',
    title: 'Photographie',
    description:
      "Explorer la lumière, le cadrage et la narration visuelle à travers la photo de paysages, d’aviation et de voyage. Pratique régulière de la prise de vue et de la retouche (Lightroom, presets personnalisés), avec une attention constante portée à la cohérence et à la qualité.",
  },
  {
    id: 'notion',
    tag: 'Organisation · Systèmes',
    title: 'Organisation personnelle',
    description:
      "J’aime structurer mon quotidien pour éviter de perdre de l’énergie sur le superflu. Création de tableaux de bord Notion pour organiser objectifs, finances et projets, afin de garder l’esprit clair et me concentrer sur ce qui compte vraiment.",
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
    tag: 'Projet perso · Discipline',
    title: 'Gamification - progression',
    description:
      "Transformer les objectifs en système de progression : points, niveaux, visualisation des efforts. Une approche ludique pour rendre la discipline plus motivante et plus durable au quotidien.",
  },
];

const projectsDataEn: ProjectItem[] = [
  {
    id: 'photo',
    tag: 'Photo · Creative',
    title: 'Photography',
    description:
      "Exploring light, framing, and visual storytelling through landscape, aviation, and travel photography. Regular shooting and editing practice (Lightroom, custom presets), with a constant focus on consistency and quality.",
  },
  {
    id: 'notion',
    tag: 'Organization · Systems',
    title: 'Personal Organization',
    description:
      "I like structuring my daily life to avoid wasting energy on non-essential things. I build Notion dashboards to organize goals, finances, and projects, helping me stay focused on what really matters.",
  },
  {
    id: 'portfolio',
    tag: 'Web · Design',
    title: 'Portfolio - Visual Identity',
    description:
      "Treating personal branding as a product. A deep dive into typography, information hierarchy, and micro-interactions to create a digital experience that reflects precision and modern design standards.",
  },
  {
    id: 'habits',
    tag: 'Side Project · Discipline',
    title: 'Gamification & Progress',
    description:
      "Turning goals into a progression system: points, levels, and progress visualization. A playful approach to make discipline more motivating and more sustainable over time.",
  },
];

const skillsDataFr: SkillItem[] = [
  {
    name: "Procurement & Négotiation",
    description: "Sourcing, cycle contractuel et négociation.",
    sentence:
      "Chez Airbus, j’ai géré les contrats de trois fournisseurs (amendements, suivi, et négociation sur des pénalités de livraison) avec une approche très terrain : claire, structurée, et orientée résultat.",
    where: ["Airbus · Seats Buyer Intern", "AMS Conseil · Négociation & cadrage"],
  },
  {
    name: "Supplier Management",
    description: "Pilotage de la performance et relations long-terme.",
    sentence:
      "J’ai construit un suivi fournisseur régulier (livraisons, points durs, décisions) pour garder une relation saine et éviter que les sujets sensibles ne s’enlisent.",
    where: ["Airbus · Supplier follow-up"],
  },
  {
    name: "Data & Analytics",
    description: "Excel (TOSA), Power BI et Looker.",
    sentence:
      "Je transforme les chiffres en décisions : Excel/Sheets, Power BI et Looker m’ont servi à analyser les performances et à recommander les actions les plus rentables, notamment chez Holidu.",
    where: ["Holidu · Data-driven account mgmt", "Airbus · KPI follow-up"],
  },
  {
    name: "CRM Ecosystems",
    description: "Hubspot, Pipedrive & Account Management.",
    sentence:
      "Entre HubSpot (AMS) et Pipedrive (Holidu), j’ai développé des réflexes solides de suivi : pipeline, relances, priorisation et qualité de la relation, côté client comme côté fournisseur.",
    where: ["AMS Conseil · HubSpot", "Holidu · Pipedrive"],
  },
  {
    name: "Notion Architecture",
    description: "Création de systèmes et tableaux de bord.",
    sentence:
      "Je conçois des espaces Notion propres et scalables pour piloter des projets perso : structuration, automatisation légère, et une organisation qui tient dans le temps.",
    where: ["Projets perso · Notion systems"],
  },
  {
    name: "AI & Prompting",
    description: "Levier de performance pour analyser, créer et résoudre plus efficacement.",
    sentence:
      "J’utilise l’IA comme un vrai copilote (ChatGPT, Claude, Gemini Pro) pour déléguer le répétitif, accélérer l’analyse et automatiser ce qui peut l’être, y compris sur des sujets pro chez Airbus et Holidu.",
    where: ["Airbus · Gemini Pro", "Holidu · Gemini Pro", "AMS Conseil · AI workflows"],
  },
  {
    name: "Photography & Creative",
    description: "Lightroom, retouche et direction artistique.",
    sentence:
      "La photo, c’est mon terrain d’exigence perso : je pousse le sens du détail, la composition et la retouche, et ça nourrit aussi ma rigueur sur les outils numériques au quotidien.",
    where: ["Projets perso · Photography"],
  },
  {
    name: "Leadership & Teamwork",
    description: "Management d’équipe et intelligence collective.",
    sentence:
      "J’aime prendre le lead quand il faut : coordonner, clarifier, et faire avancer — que ce soit sur des projets annexes chez Holidu (sites propriétaires) ou sur des initiatives internes chez Airbus.",
    where: ["Holidu · Side projects", "Airbus · Initiatives / Leadership University"],
  },
  {
    name: "Adaptability",
    description: "Agilité et efficacité en environnements mouvants.",
    sentence:
      "Je m’adapte vite : nouveaux outils, nouveaux sujets, nouvelles équipes — je sais trouver le bon rythme sans perdre la qualité d’exécution.",
    where: ["Airbus", "Holidu", "AMS Conseil", "Projets perso"],
  },
  {
    name: "Communication",
    description: "Aisance relationnelle, écoute active et persuasion.",
    sentence:
      "Je privilégie une communication simple et propre : aligner les attentes, donner de la visibilité, et garder un vrai esprit d’équipe, quel que soit le contexte.",
    where: ["Airbus", "Holidu", "AMS Conseil", "Projets perso"],
  },
  {
    name: "Problem Solving",
    description: "Esprit analytique orienté vers la résolution de problèmes.",
    sentence:
      "J’ai un réflexe solution : je cherche le vrai blocage, je structure une réponse, et j’optimise jusqu’à ce que ça tourne — sans surcomplexifier.",
    where: ["Airbus", "Holidu", "AMS Conseil"],
  },
  {
    name: "Langues (FR, EN, ES)",
    description: "Français natif, Anglais C1, Espagnol B1.",
    sentence:
      "Français natif, anglais C1 (très utilisé en contexte pro), et espagnol C1 grâce à une pratique régulière et une vraie immersion en Amérique du Sud.",
    where: ["Projets internationaux", "Airbus · daily English", "Expériences Amérique du Sud"],
  },
];

const skillsDataEn: SkillItem[] = [
  {
    name: "Procurement & Negotiation",
    description: "Sourcing, contract lifecycle, and negotiation.",
    sentence:
      "At Airbus, I managed contracts for three suppliers (amendments, follow-up, and delivery penalty negotiations) with a very hands-on approach: clear, structured, and outcome-driven.",
    where: ["Airbus · Seats Buyer Intern", "AMS Conseil · Negotiation & scoping"],
  },
  {
    name: "Supplier Management",
    description: "Performance tracking and long-term relationships.",
    sentence:
      "I set up a consistent supplier follow-up (deliveries, blockers, decisions) to keep the relationship healthy and prevent sensitive topics from drifting.",
    where: ["Airbus · Supplier follow-up"],
  },
  {
    name: "Data & Analytics",
    description: "Excel (TOSA), Power BI, and Looker.",
    sentence:
      "I turn data into decisions: Excel/Sheets, Power BI and Looker helped me analyze performance and recommend the most impactful next actions, especially at Holidu.",
    where: ["Holidu · Data-driven account mgmt", "Airbus · KPI follow-up"],
  },
  {
    name: "CRM Ecosystems",
    description: "Hubspot, Pipedrive & Account Management.",
    sentence:
      "Across HubSpot (AMS) and Pipedrive (Holidu), I built strong follow-up habits: pipeline hygiene, smart reminders, prioritization, and relationship quality—client-side and supplier-side.",
    where: ["AMS Conseil · HubSpot", "Holidu · Pipedrive"],
  },
  {
    name: "Notion Architecture",
    description: "System design and dashboard creation.",
    sentence:
      "I design clean, scalable Notion workspaces for personal projects: structure, light automation, and systems that stay reliable over time.",
    where: ["Personal projects · Notion systems"],
  },
  {
    name: "AI & Prompting",
    description: "Performance lever to analyze, create, and solve more efficiently.",
    sentence:
      "I use AI as a real co-pilot (ChatGPT, Claude, Gemini Pro) to offload repetitive work, speed up analysis, and automate what can be automated—including in professional contexts at Airbus and Holidu.",
    where: ["Airbus · Gemini Pro", "Holidu · Gemini Pro", "AMS Conseil · AI workflows"],
  },
  {
    name: "Photography & Creative",
    description: "Lightroom, editing, and art direction.",
    sentence:
      "Photography is my personal challenge space: I push attention to detail, composition, and editing—and it also sharpens my day-to-day digital rigor.",
    where: ["Personal projects · Photography"],
  },
  {
    name: "Leadership & Teamwork",
    description: "Team management and collective intelligence.",
    sentence:
      "I’m comfortable taking ownership: coordinating, clarifying, and moving things forward—whether on side projects at Holidu (owner websites) or internal initiatives at Airbus.",
    where: ["Holidu · Side projects", "Airbus · Initiatives / Leadership University"],
  },
  {
    name: "Adaptability",
    description: "Agility and efficiency in changing environments.",
    sentence:
      "I adapt fast: new tools, new topics, new teams—I find the right pace quickly without sacrificing execution quality.",
    where: ["Airbus", "Holidu", "AMS Conseil", "Personal projects"],
  },
  {
    name: "Communication",
    description: "Interpersonal skills, active listening, and persuasion.",
    sentence:
      "I keep communication simple and sharp: align expectations, give visibility, and maintain a strong team mindset in any context.",
    where: ["Airbus", "Holidu", "AMS Conseil", "Personal projects"],
  },
  {
    name: "Problem Solving",
    description: "Analytical mindset oriented towards problem resolution.",
    sentence:
      "I have a strong solution reflex: find the real blocker, structure a response, and optimize until it runs—without overcomplicating.",
    where: ["Airbus", "Holidu", "AMS Conseil"],
  },
  {
    name: "Languages (FR, EN, ES)",
    description: "French Native, English C1, Spanish B1.",
    sentence:
      "Native French, C1 English (used heavily in professional settings), and C1 Spanish thanks to consistent practice and real immersion in South America.",
    where: ["International exposure", "Airbus · daily English", "South America experience"],
  },
];

// Main export containing all translations
export const translations = {
  fr: {
    nav: { experience: 'Expérience', education: 'Formation', projects: 'Projets', skills: 'Skills', contact: 'Contact' },
    hero: {
      role: "Achats · Procurement · Opérations",
      date: "",
      subrole: "Achats & Procurement · Business & Operations",
      cta: "Décoller"
    },
    experience: {
      subtitle: "Expérience",
      title: "Les contextes où j’ai grandi\nopérationnellement.",
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
      description: "Un mélange de \"Hard Skills\" analytiques et de \"Soft Skills\" relationnels.",
      cta: "Cliquez pour explorer",
      key_skill: "Compétence Clé",
      items: skillsDataFr
    },
    about: {
      title: "Une approche très simple :",
      titleSuffix: "enlever le bruit, garder l’essentiel.",
      p1: "Je viens des prépas, des tableaux Excel et des environnements où les détails comptent vraiment. Aujourd’hui, je relie cette rigueur au terrain : fournisseurs, partenaires, données, et décisions à prendre rapidement.",
      p2: "Ce site est une extension de cette philosophie : peu d’éléments, mais chacun a une raison d’être. L’objectif : vous permettre de comprendre en quelques écrans qui je suis, ce que j’ai fait, et comment je peux aider.",
      p3: "Si vous cherchez quelqu’un de structuré, à l’aise avec les chiffres comme avec le relationnel, et qui aime autant l’aviation que les systèmes bien pensés, on devrait bien s’entendre !"
    },
    footer: {
      headline: "Let's Fly Together.",
      contact_title: "Me Contacter",
      send_email: "Envoyer un email",
      download_cv: "Télécharger mon CV",
      copyright: "© 2026 Tanguy Duret",
      location: "Bordeaux, France"
    },
  },
  en: {
    nav: { experience: 'Experience', education: 'Education', projects: 'Projects', skills: 'Skills', contact: 'Contact' },
    hero: {
      role: "Purchasing · Procurement · Operations",
      date: "",
      subrole: "Purchasing & Procurement · Business & Operations",
      cta: "Scroll to take off"
    },
    experience: {
      subtitle: " ",
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
      title: "Personal projects to\ntest, create and adjust.",
      description: "Photography, Notion systems, side projects: everything that allows me to experiment without an “official” framework.",
      items: projectsDataEn
    },
    skills: {
      subtitle: "Skills",
      title: "What I know how\nto set in motion.",
      description: "A mix of analytical \"Hard Skills\" and relational \"Soft Skills\".",
      cta: "Click to explore",
      key_skill: "Key Skill",
      items: skillsDataEn
    },
    about: {
      title: "A very simple approach:",
      titleSuffix: "remove the noise and keep the essential.",
      p1: "I come from preparatory classes, Excel spreadsheets, and environments where details truly matter. Today, I connect this rigor to the field: suppliers, partners, data, and decisions that need to be made quickly.",
      p2: "This website is an extension of this philosophy: few elements, but each has a reason to exist. The goal: to allow you to understand in a few screens who I am, what I have done, and how I can contribute.",
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
