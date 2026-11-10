import { ExperienceItem, ProjectItem, SkillItem, EducationItem } from './types';

// Raw data separated by language
const experienceItemsFr: ExperienceItem[] = [
  {
    "id": "holidu",
    "chips": [
      "TRAVEL TECH",
      "ACCOUNT MANAGEMENT"
    ],
    "role": "Sales & Account Manager · Stage",
    "company": "Holidu",
    "date": "08/2025 - 02/2026",
    "location": "Bordeaux",
    "bullets": [
      "Analyse des performances commerciales, fidélisation et réactivation des comptes.",
      "Pilotage du projet Google Business Profile : plus de 200 fiches créées ou configurées directement.",
      "Traitement de plus de 500 dossiers de vérification d’identité (KYC) avec les équipes internes et les prestataires de paiement."
    ],
    "contribution": "80 propriétaires en portefeuille ; un projet de visibilité Google distinct auprès d’environ 1 500 partenaires."
  },
  {
    "id": "airbus",
    "chips": [
      "AVIATION",
      "PROCUREMENT"
    ],
    "role": "Stagiaire acheteur · Sièges",
    "company": "Airbus",
    "date": "01/2025 - 08/2025",
    "location": "Toulouse",
    "bullets": [
      "Relations fournisseurs en France, en Italie et en Chine : suivi des performances et des livraisons.",
      "Calcul, rédaction et suivi des réclamations fournisseurs. Préparation des revues de performance et des réunions avec les fournisseurs et la direction Airbus.",
      "Consolidation des indicateurs, ateliers et visites de lignes d’assemblage."
    ],
    "contribution": "J’ai rédigé des amendements contractuels, préparé les négociations et y ai participé avec l’équipe de gestion des contrats."
  },
  {
    "id": "ams",
    "chips": [
      "JUNIOR-ENTREPRISE",
      "CONSULTING"
    ],
    "role": "Chargé de mission marketing & chef de projet",
    "company": "AMS Conseil",
    "date": "10/2023 - 12/2024",
    "location": "Bordeaux",
    "bullets": [
      "Qualification des besoins, préparation des budgets, coordination des intervenants et présentation des résultats.",
      "Missions pour des entreprises et des acteurs institutionnels ; prospection ciblée, suivi dans HubSpot et création de contenus marketing."
    ],
    "contribution": "Études de marché et benchmarks, de la prospection à la restitution, avec des équipes allant jusqu’à 18 personnes."
  },
  {
    "id": "staffme",
    "chips": [
      "FREELANCE",
      "FIELD"
    ],
    "role": "Freelance Consultant",
    "company": "StaffMe",
    "date": "Depuis 2022",
    "location": "France",
    "bullets": [
      "Réalisation de missions terrain : inventaires en pharmacie, merchandising et opérations promotionnelles.",
      "Participation à des campagnes de distribution, de sondages et d’animations commerciales selon les besoins.",
      "Adaptation rapide aux différents contextes et aux consignes, avec un focus sur la fiabilité d’exécution."
    ]
  }
];

const experienceItemsEn: ExperienceItem[] = [
  {
    "id": "holidu",
    "chips": [
      "TRAVEL TECH",
      "ACCOUNT MANAGEMENT"
    ],
    "role": "Sales & Account Management Intern",
    "company": "Holidu",
    "date": "08/2025 - 02/2026",
    "location": "Bordeaux",
    "bullets": [
      "Tracked commercial performance, retention and account reactivation.",
      "Led the Google Business Profile project and personally created or configured over 200 profiles.",
      "Processed over 500 identity verification (KYC) cases with internal teams and payment providers."
    ],
    "contribution": "80 property owners in my portfolio. A separate Google visibility project targeted around 1,500 partners."
  },
  {
    "id": "airbus",
    "chips": [
      "AVIATION",
      "PROCUREMENT"
    ],
    "role": "Procurement Intern · Aircraft Seating",
    "company": "Airbus",
    "date": "01/2025 - 08/2025",
    "location": "Toulouse",
    "bullets": [
      "Managed supplier relationships in France, Italy and China, tracking performance and deliveries.",
      "Calculated, drafted and tracked supplier claims. Prepared performance reviews and executive meetings with suppliers and Airbus management.",
      "Consolidated indicators and joined workshops and assembly-line visits."
    ],
    "contribution": "I drafted contract amendments and helped prepare and conduct supplier negotiations with the contract management team."
  },
  {
    "id": "ams",
    "chips": [
      "JUNIOR-ENTREPRISE",
      "CONSULTING"
    ],
    "role": "Marketing & Communications · Project Manager",
    "company": "AMS Conseil",
    "date": "10/2023 - 12/2024",
    "location": "Bordeaux",
    "bullets": [
      "Qualified client needs, prepared budgets and coordinated contributors through delivery.",
      "Led studies and benchmarks for corporate and institutional clients; tracked prospects in HubSpot and created marketing materials."
    ],
    "contribution": "Led market studies from initial outreach to client presentations, coordinating teams of up to 18."
  },
  {
    "id": "staffme",
    "chips": [
      "FREELANCE",
      "FIELD"
    ],
    "role": "Freelance Consultant",
    "company": "StaffMe",
    "date": "Since 2022",
    "location": "France",
    "bullets": [
      "Handled field missions: pharmacy inventory checks, merchandising, and promotional operations.",
      "Supported campaigns involving leaflet distribution, surveys, and in-store animations depending on needs.",
      "Adapted quickly to different environments and guidelines, with a focus on reliable execution."
    ]
  }
];

const educationItemsFr: EducationItem[] = [
  {
    "id": "kedge",
    "tag": "Master · Achats & Supply Chain",
    "school": "KEDGE Business School",
    "degree": "Programme Grande École · MOSI · Diplôme prévu en 2027",
    "period": "09/2023 - 06/2027",
    "location": "Bordeaux, France",
    "ranking": {
      "label": "Top 7 des Grandes Écoles de management françaises",
      "source": "Financial Times · European Business Schools 2023",
      "url": "https://etudiant.kedge.edu/actualites-etudiant/kedge-29eme-meilleure-business-school-europeenne"
    },
    "description": "Dernière année de spécialisation en Management des Opérations, Supply Chain et Innovation. Le cursus associe sourcing stratégique, analyse des coûts et gestion des risques fournisseurs."
  },
  {
    "id": "uba",
    "tag": "Mobilité Internationale · Économie · Management",
    "school": "Universidad de Buenos Aires (UBA)",
    "degree": "Semestre d’échange · Argentine",
    "period": "02/2026 - 08/2026",
    "location": "Buenos Aires, Argentine",
    "ranking": {
      "label": "1re université d’Amérique latine",
      "source": "QS World University Rankings 2025",
      "url": "https://www.prnewswire.com/mx/comunicados-de-prensa/qs-world-university-rankings-2025-las-universidades-latinoamericanas-en-las-ultimas-clasificaciones-mundiales-302163496.html"
    },
    "description": "De février à août 2026, j’ai étudié la stratégie, le management et la négociation en espagnol à Buenos Aires."
  },
  {
    "id": "prepa",
    "tag": "CPGE · Économie & Maths",
    "school": "Lycée Charles de Gaulle",
    "degree": "Classe préparatoire ECG · Caen",
    "period": "09/2021 - 06/2023",
    "location": "Caen, France",
    "description": "Deux années de mathématiques, d’économie et de géopolitique pour préparer les concours des grandes écoles de commerce."
  }
];

const educationItemsEn: EducationItem[] = [
  {
    "id": "kedge",
    "tag": "Master · Purchasing & Supply Chain",
    "school": "KEDGE Business School",
    "degree": "Programme Grande École · MOSI · Expected graduation 2027",
    "period": "09/2023 - 06/2027",
    "location": "Bordeaux, France",
    "ranking": {
      "label": "Top 7 French Grandes Écoles of management",
      "source": "Financial Times · European Business Schools 2023",
      "url": "https://etudiant.kedge.edu/actualites-etudiant/kedge-29eme-meilleure-business-school-europeenne"
    },
    "description": "Final year in Operations Management, Supply Chain and Innovation, with coursework in strategic sourcing, costs and supplier risk."
  },
  {
    "id": "uba",
    "tag": "International Mobility · Economics · Management",
    "school": "Universidad de Buenos Aires (UBA)",
    "degree": "Exchange semester · Argentina",
    "period": "02/2026 - 08/2026",
    "location": "Buenos Aires, Argentina",
    "ranking": {
      "label": "Highest-ranked university in Latin America",
      "source": "QS World University Rankings 2025",
      "url": "https://www.prnewswire.com/mx/comunicados-de-prensa/qs-world-university-rankings-2025-las-universidades-latinoamericanas-en-las-ultimas-clasificaciones-mundiales-302163496.html"
    },
    "description": "From February to August 2026, I studied strategy, management and negotiation in Spanish in Buenos Aires."
  },
  {
    "id": "prepa",
    "tag": "Preparatory Classes",
    "school": "Lycée Charles de Gaulle",
    "degree": "ECG preparatory programme · Caen",
    "period": "09/2021 - 06/2023",
    "location": "Caen, France",
    "description": "Two intensive years of mathematics, economics and geopolitics preparing for competitive entrance exams to French business schools."
  }
];

const projectsDataFr: ProjectItem[] = [
  {
    "id": "entrepreneurship",
    "tag": "Entrepreneuriat",
    "title": "D’une idée à une offre locale concrète",
    "description": "J’aide des commerçants, notamment en dehors des grandes villes, à tenir leur fiche Google à jour et à faciliter les avis de leurs clients.",
    "bullets": [
      "Construction de l’offre : positionnement, identité, site web, parcours de prise de contact et supports physiques. L’offre associe accompagnement sur Google Business Profile, supports NFC/QR et guides pratiques.",
      "Prospection ciblée : recherche et qualification d’établissements, préparation de séquences de contact et suivi commercial.",
      "Une approche B2B de proximité : comprendre le contexte des commerçants et proposer une réponse simple, utile et humaine."
    ],
    "stack": [
      "Positionnement",
      "Prospection ciblée",
      "Funnel",
      "Relation client"
    ]
  },
  {
    "id": "automation",
    "tag": "Automatisation · IA · Opérations",
    "title": "Fiabiliser le suivi, sans alourdir la relation",
    "description": "Mise en place de flux simples pour organiser le suivi client de l’activité : déclenchement d’actions après certains échanges, préparation de relances et centralisation des informations utiles.",
    "bullets": [
      "J’utilise n8n pour déclencher des tâches de suivi après certains e-mails. Je teste aussi ChatGPT et Gemini pour préparer des messages.",
      "Réduire les oublis, garder une vision claire des échanges et préserver du temps pour les conversations qui comptent.",
      "Je garde la main sur les messages envoyés aux clients."
    ],
    "stack": [
      "n8n",
      "ChatGPT",
      "Gemini",
      "Suivi client"
    ]
  },
  {
    "id": "portfolio",
    "tag": "Produit digital · Branding · UX",
    "title": "Concevoir une présence digitale cohérente",
    "description": "Conception de mon portfolio et développement assisté par l’IA : identité visuelle, logo, charte graphique, architecture de l’information, parcours de navigation et micro-interactions.",
    "bullets": [
      "Chaque choix répond à un objectif : présenter un profil lisible, fluide et cohérent avec mon positionnement.",
      "Une approche de personal branding pensée comme un produit : structure, performance, expérience et évolutivité.",
      "Un projet mené de bout en bout, de la direction artistique au développement et à l’optimisation du site."
    ],
    "stack": [
      "React",
      "UX/UI",
      "Identité visuelle",
      "SEO"
    ]
  }
];

const projectsDataEn: ProjectItem[] = [
  {
    "id": "entrepreneurship",
    "tag": "Entrepreneurship",
    "title": "From an idea to a tangible local offer",
    "description": "I help local businesses, especially outside major cities, keep their Google profiles up to date and make it easier for customers to leave reviews.",
    "bullets": [
      "Built the offer end to end: positioning, identity, website, contact journey, and physical materials. The offer includes Google Business Profile support, NFC/QR displays and practical guides.",
      "Structured targeted outreach: business research and qualification, contact sequences, and commercial follow-up.",
      "A local B2B approach: understand each merchant’s context and offer a simple, useful, human response."
    ],
    "stack": [
      "Positioning",
      "Targeted outreach",
      "Funnel",
      "Client relations"
    ]
  },
  {
    "id": "automation",
    "tag": "Automation · AI · Operations",
    "title": "Making follow-up reliable, without making it impersonal",
    "description": "Built simple workflows to organize the activity’s client follow-up: triggering actions after key exchanges, preparing follow-ups, and centralizing useful information.",
    "bullets": [
      "I use n8n to trigger follow-up tasks after specific emails. I also experiment with ChatGPT and Gemini to draft messages.",
      "Reduce missed follow-ups, retain a clear view of conversations, and preserve time for the interactions that matter.",
      "I review messages before they go to clients."
    ],
    "stack": [
      "n8n",
      "ChatGPT",
      "Gemini",
      "Client follow-up"
    ]
  },
  {
    "id": "portfolio",
    "tag": "Digital product · Branding · UX",
    "title": "Designing a coherent digital presence",
    "description": "Portfolio design and AI-assisted development: visual identity, logo, brand guidelines, information architecture, navigation journey, and micro-interactions.",
    "bullets": [
      "Every choice serves a purpose: presenting a profile that is clear, fluid, and consistent with my positioning.",
      "A personal branding approach treated like a product: structure, performance, experience, and room to evolve.",
      "A project delivered end to end, from art direction to development and site optimization."
    ],
    "stack": [
      "React",
      "UX/UI",
      "Visual identity",
      "SEO"
    ]
  }
];

const skillsDataFr: SkillItem[] = [
  {
    name: "Procurement & Négotiation",
    description: "Sourcing, cycle contractuel et négociation.",
    sentence:
      "Chez Airbus, j’ai rédigé des amendements et participé aux négociations fournisseurs.",
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
    description: "Systèmes de suivi, centralisation et tableaux de bord.",
    sentence:
      "Je conçois des espaces Notion pour centraliser l’information, piloter les tâches et fiabiliser les routines simples. L’objectif : moins d’éparpillement, un suivi plus clair et du temps rendu aux sujets à valeur.",
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
    description: "Français natif, Anglais C1, Espagnol C1.",
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
      "At Airbus, I drafted amendments and took part in supplier negotiations.",
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
    description: "Tracking systems, information centralization, and dashboards.",
    sentence:
      "I design Notion workspaces to centralize information, track tasks, and make simple routines more reliable. The goal: less fragmentation, clearer follow-up, and more time for value-creating work.",
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
    description: "French Native, English C1, Spanish C1.",
    sentence:
      "Native French, C1 English (used heavily in professional settings), and C1 Spanish thanks to consistent practice and real immersion in South America.",
    where: ["International exposure", "Airbus · daily English", "South America experience"],
  },
];

// Main export containing all translations
export const translations = {
  es: {
  "nav": {
    "experience": "Trayectoria",
    "education": "Formación",
    "projects": "Proyectos",
    "skills": "Competencias",
    "contact": "Contacto"
  },
  "hero": {
    "role": "Negocios y operaciones",
    "date": "",
    "subrole": "Compras internacionales",
    "cta": "Despegar"
  },
  "experience": {
    "subtitle": "Trayectoria",
    "title": "Experiencia profesional",
    "description": "",
    "items": [
      {
        "id": "holidu",
        "chips": [
          "TRAVEL TECH",
          "ACCOUNT MANAGEMENT"
        ],
        "role": "Sales & Account Manager · Prácticas",
        "company": "Holidu",
        "date": "08/2025 - 02/2026",
        "location": "Burdeos",
        "bullets": [
          "Analicé indicadores comerciales y trabajé en la fidelización y reactivación de cuentas.",
          "Creé o configuré directamente más de 200 perfiles de empresa en Google.",
          "Tramité más de 500 expedientes de verificación de identidad (KYC) con equipos internos y proveedores de servicios de pago."
        ],
        "contribution": "Gestioné una cartera de 80 propietarios. Por separado, dirigí un proyecto de visibilidad en Google para unos 1.500 socios."
      },
      {
        "id": "airbus",
        "chips": [
          "AVIATION",
          "PROCUREMENT"
        ],
        "role": "Practicante de compras · Asientos de aeronaves",
        "company": "Airbus",
        "date": "01/2025 - 08/2025",
        "location": "Toulouse",
        "bullets": [
          "Gestioné relaciones con proveedores de Francia, Italia y China y di seguimiento al desempeño y a las entregas.",
          "Calculé los importes de los reclamos, los redacté y les di seguimiento. Preparé evaluaciones de desempeño y reuniones entre los proveedores y la dirección de Airbus.",
          "Consolidé indicadores y participé en talleres y visitas a líneas de ensamblaje."
        ],
        "contribution": "Redacté modificaciones contractuales y participé tanto en la preparación como en las negociaciones con proveedores junto con el equipo de contratos."
      },
      {
        "id": "ams",
        "chips": [
          "JUNIOR-ENTREPRISE",
          "CONSULTING"
        ],
        "role": "Marketing y comunicación · Líder de proyectos",
        "company": "AMS Conseil",
        "date": "10/2023 - 12/2024",
        "location": "Burdeos",
        "bullets": [
          "Definí necesidades con los clientes, elaboré presupuestos y coordiné los equipos de trabajo.",
          "Realicé estudios comparativos para empresas e instituciones, di seguimiento a oportunidades en HubSpot y elaboré materiales comerciales."
        ],
        "contribution": "Dirigí estudios de mercado desde la prospección hasta la presentación de resultados, con equipos de hasta 18 personas."
      },
      {
        "id": "staffme",
        "chips": [
          "FREELANCE",
          "FIELD"
        ],
        "role": "Profesional independiente · Misiones puntuales",
        "company": "StaffMe",
        "date": "Desde 2022",
        "location": "Francia",
        "bullets": [
          "Misiones de inventario, logística, promoción y atención en comercios.",
          "Aprendí a adaptarme a distintos equipos y contextos operativos."
        ]
      }
    ]
  },
  "education": {
    "subtitle": "Formación",
    "title": "Formación académica",
    "items": [
      {
        "id": "kedge",
        "tag": "Master · Purchasing & Supply Chain",
        "school": "KEDGE Business School",
        "degree": "Programme Grande École · MOSI · Graduación prevista en 2027",
        "period": "09/2023 - 06/2027",
        "location": "Bordeaux, France",
        "ranking": {
          "label": "Entre las siete mejores grandes escuelas francesas de gestión",
          "source": "Financial Times · European Business Schools 2023",
          "url": "https://etudiant.kedge.edu/actualites-etudiant/kedge-29eme-meilleure-business-school-europeenne"
        },
        "description": "Curso el último año de la especialización en Gestión de Operaciones, Cadena de Suministro e Innovación, con materias de abastecimiento estratégico, costos y riesgos de proveedores."
      },
      {
        "id": "uba",
        "tag": "International Mobility · Economics · Management",
        "school": "Universidad de Buenos Aires (UBA)",
        "degree": "Semestre de intercambio · Argentina",
        "period": "02/2026 - 08/2026",
        "location": "Buenos Aires, Argentina",
        "ranking": {
          "label": "Universidad mejor clasificada de América Latina",
          "source": "QS World University Rankings 2025",
          "url": "https://www.prnewswire.com/mx/comunicados-de-prensa/qs-world-university-rankings-2025-las-universidades-latinoamericanas-en-las-ultimas-clasificaciones-mundiales-302163496.html"
        },
        "description": "De febrero a agosto de 2026 estudié estrategia, gestión y negociación en español en Buenos Aires, en contacto con otras formas de trabajar y aprender."
      },
      {
        "id": "prepa",
        "tag": "Preparatory Classes",
        "school": "Lycée Charles de Gaulle",
        "degree": "Clases preparatorias ECG · Caen",
        "period": "09/2021 - 06/2023",
        "location": "Caen, France",
        "description": "Dos años de formación intensiva en matemáticas, economía y geopolítica para los concursos de ingreso a las escuelas francesas de negocios."
      }
    ]
  },
  "projects": {
    "subtitle": "Proyectos",
    "title": "De la idea a la práctica",
    "description": "",
    "items": [
      {
        "id": "entrepreneurship",
        "tag": "Actividad independiente",
        "title": "Visibilidad para comercios locales",
        "description": "Ayudo a comercios locales a mejorar su presencia en Google Business Profile. La propuesta combina acompañamiento, soportes NFC o QR y guías prácticas.",
        "bullets": [
          "Diseñé el servicio, el sitio y el recorrido desde el primer contacto hasta la instalación.",
          "Identifico establecimientos y preparo el seguimiento comercial.",
          "Las conversaciones con los comerciantes me ayudan a ajustar el servicio."
        ],
        "stack": [
          "Posicionamiento",
          "Prospección",
          "Relación con clientes"
        ]
      },
      {
        "id": "automation",
        "tag": "Automatización · IA · Operaciones",
        "title": "Seguimiento comercial",
        "description": "Organicé el seguimiento de mi actividad para que ciertos correos activen tareas y preparen recordatorios.",
        "bullets": [
          "Uso n8n para activar tareas de seguimiento a partir de ciertos correos. También pruebo ChatGPT y Gemini para preparar borradores de mensajes.",
          "Centralizo la información para retomar cada conversación y reviso las acciones importantes."
        ],
        "stack": [
          "n8n",
          "ChatGPT",
          "Gemini",
          "Seguimiento comercial"
        ]
      },
      {
        "id": "portfolio",
        "tag": "Producto digital · Identidad · UX",
        "title": "Un portafolio con identidad propia",
        "description": "Diseñé la identidad visual y la navegación de este sitio y lo desarrollé con apoyo de IA.",
        "bullets": [
          "Definí el logotipo, la tipografía y el recorrido de lectura.",
          "Cuidé la adaptación a distintos dispositivos y las interacciones.",
          "Reviso la calidad y mantengo el portafolio a medida que cambia mi trayectoria."
        ],
        "stack": [
          "React",
          "UX/UI",
          "Identidad visual",
          "SEO"
        ]
      }
    ]
  },
  "skills": {
    "subtitle": "Competencias",
    "title": "Competencias",
    "description": "",
    "cta": "Explorar",
    "key_skill": "Competencia",
    "items": []
  },
  "about": {
    "title": "Mi enfoque es sencillo:",
    "titleSuffix": "quitar el ruido y conservar lo esencial.",
    "p1": "",
    "p2": "",
    "p3": ""
  },
  "footer": {
    "headline": "Let’s fly together.",
    "contact_title": "Contacto",
    "send_email": "Enviar un correo",
    "download_cv": "Ver mi CV",
    "copyright": "© Tanguy Duret",
    "location": "Francia"
  }
},
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
      title: "Des projets pour\nconcevoir, tester, structurer.",
      description: "Trois initiatives concrètes à la croisée du business, des systèmes, de l’IA et de l’expérience digitale.",
      items: projectsDataFr
    },
    skills: {
      subtitle: "Skills",
      title: "Ce que je sais vraiment\nmettre en mouvement.",
      description: "Des compétences développées sur le terrain, complétées par des systèmes, l’IA et un vrai sens du détail.",
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
      title: "Projects to\ndesign, test, and structure.",
      description: "Three concrete initiatives at the intersection of business, systems, AI, and digital experience.",
      items: projectsDataEn
    },
    skills: {
      subtitle: "Skills",
      title: "What I know how\nto set in motion.",
      description: "Skills developed in the field, complemented by systems thinking, AI, and a genuine eye for detail.",
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
