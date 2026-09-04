export type ConseilArticle = {
  slug: string;
  title: string;
  category: string;
  readingTime: string;
  introduction: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
  sources: Array<{ label: string; url: string }>;
};

export const conseilArticles: ConseilArticle[] = [
  {
    slug: 'pourquoi-les-avis-comptent',
    title: 'Pourquoi les avis comptent pour votre commerce',
    category: 'Les bases',
    readingTime: '2 min',
    introduction: "Les avis ne remplacent ni un bon accueil ni un bon produit. Ils rendent simplement l'expérience de vos clients plus visible au moment où une nouvelle personne hésite entre plusieurs établissements.",
    sections: [
      {
        heading: 'Ils répondent à une question très concrète',
        paragraphs: [
          "Quand une personne cherche un commerce sur Google ou Maps, elle veut surtout savoir si l'adresse semble fiable, ouverte et adaptée à son besoin. Les horaires, la catégorie, les photos et les avis sont consultés ensemble : ce sont des repères utiles avant une première visite.",
          "Un avis authentique donne du contexte. Il peut confirmer la qualité d'un accueil, la facilité d'accès, un savoir-faire ou une ambiance. Ce n'est pas une promesse parfaite ; c'est le retour réel d'une personne qui est venue.",
        ],
      },
      {
        heading: 'Ils s’inscrivent dans une présence locale plus large',
        paragraphs: [
          "Google explique que les résultats locaux reposent principalement sur la pertinence, la distance et la notoriété. Des informations complètes et à jour aident à faire correspondre la fiche aux bonnes recherches ; les avis et les réponses utiles peuvent aider un établissement à se démarquer.",
          "Il ne s'agit donc pas de chercher une recette rapide pour “monter” dans les résultats. Le bon réflexe consiste à soigner l'ensemble : adresse, horaires, catégorie, services, photos, site web et qualité de l'expérience proposée sur place.",
        ],
        bullets: [
          'Vérifier régulièrement les horaires, y compris les jours fériés.',
          'Choisir une catégorie qui décrit réellement l’activité.',
          'Ajouter des photos fidèles à ce que le client verra.',
          'Répondre lorsque cela apporte une information utile.',
        ],
      },
      {
        heading: 'Le plus important : rester authentique',
        paragraphs: [
          "Une fiche qui inspire confiance ne cherche pas à paraître parfaite. Elle permet à de vrais clients de s'exprimer facilement, puis montre que le commerce les écoute. Les avis moins enthousiastes sont aussi une occasion de répondre calmement et de résoudre un problème hors ligne lorsque c'est nécessaire.",
          "L'objectif est simple : rendre visible une satisfaction qui existe déjà, sans forcer la main à personne.",
        ],
      },
    ],
    sources: [
      { label: 'Google — Conseils pour améliorer le classement local', url: 'https://support.google.com/business/answer/7091?hl=fr' },
      { label: 'Google — Gérer les avis clients', url: 'https://support.google.com/business/answer/3474050?hl=fr' },
    ],
  },
  {
    slug: 'demander-un-avis-correctement',
    title: 'Comment demander un avis correctement',
    category: 'En pratique',
    readingTime: '2 min',
    introduction: "Demander un avis peut rester très simple. Le bon moment est celui où l'échange est terminé et où le client est libre de répondre — ou de ne pas répondre.",
    sections: [
      {
        heading: 'Choisir un moment naturel',
        paragraphs: [
          "Un client qui vient de vivre une bonne expérience comprend immédiatement votre demande. À la caisse, après un rendez-vous ou dans un message de remerciement, une invitation sobre suffit. Inutile de transformer le moment en discours commercial.",
          "La formulation doit laisser une vraie liberté. Par exemple : “Si vous avez une minute, votre retour sur Google nous aiderait beaucoup.” On demande un retour d'expérience, pas une note précise ni un texte prédéfini.",
        ],
      },
      {
        heading: 'Réduire la friction, pas influencer la réponse',
        paragraphs: [
          "Un lien direct ou un QR code peut éviter au client de chercher votre fiche. Google permet justement aux établissements vérifiés de partager un lien ou un QR code pour demander des avis. Le support sert à simplifier l'accès ; il ne doit pas servir à pousser une personne à publier sur le moment.",
        ],
        bullets: [
          'Placez le support là où le client a le temps de le voir.',
          'Gardez une phrase courte, compréhensible et sans promesse.',
          'Laissez le client décider s’il souhaite publier un avis.',
          'Ne demandez ni une note précise ni certains mots-clés.',
        ],
      },
      {
        heading: 'Prévoir la suite',
        paragraphs: [
          "La demande n'est que le début. Consultez les nouveaux avis de façon régulière. Une réponse publique courte, polie et concrète montre que le retour a été lu. En cas de problème, remerciez la personne, reconnaissez ce qui doit l'être et proposez un échange privé si des détails personnels sont concernés.",
          "Cette régularité compte davantage qu'une sollicitation massive pendant quelques jours.",
        ],
      },
    ],
    sources: [
      { label: 'Google — Gérer les avis clients', url: 'https://support.google.com/business/answer/3474050?hl=fr' },
      { label: 'Google — Règles relatives aux contenus trompeurs et faux engagements', url: 'https://support.google.com/contributionpolicy/answer/7400114?hl=fr' },
    ],
  },
  {
    slug: 'ce-qu-il-ne-faut-pas-faire',
    title: 'Ce qu’il ne faut surtout pas faire avec les avis',
    category: 'Bonnes pratiques',
    readingTime: '2 min',
    introduction: "La confiance se gagne difficilement et se perd vite. Les avis doivent représenter une expérience réelle et rester libres : c'est meilleur pour les clients comme pour la fiche Google.",
    sections: [
      {
        heading: 'Ne jamais acheter ni récompenser un avis',
        paragraphs: [
          "Une réduction, un cadeau, un remboursement ou une participation à un tirage au sort en échange d'un avis fausse la décision des futurs clients. Google interdit les avis influencés par un avantage, qu'il soit financier ou en nature.",
          "Même intentionné, un système de récompense crée un biais. La solution durable reste de demander un avis à l'ensemble des clients qui ont réellement vécu l'expérience, sans condition.",
        ],
      },
      {
        heading: 'Ne pas sélectionner uniquement les clients satisfaits',
        paragraphs: [
          "Inviter seulement les personnes dont on imagine qu'elles mettront cinq étoiles revient à orienter le résultat. Les politiques de Google interdisent aussi de décourager les avis négatifs ou de solliciter de manière sélective les seuls avis positifs.",
          "L'approche la plus saine consiste à proposer le même accès simple à tous les clients, puis à utiliser les retours pour améliorer ce qui peut l'être.",
        ],
      },
      {
        heading: 'Ne pas fabriquer de faux avis',
        paragraphs: [
          "Les avis rédigés par l'établissement, ses proches ou ses salariés sans expérience client authentique ne rendent service à personne. Les faux comptes, les volumes anormaux et les contenus rédigés à la demande peuvent être retirés par Google.",
          "Évitez également de répondre à un avis négatif avec de l'agacement ou des informations privées. Une réponse publique doit rester professionnelle, brève et respectueuse. Pour résoudre un cas précis, proposez plutôt de poursuivre la conversation par téléphone ou e-mail.",
        ],
        bullets: [
          'Pas d’avis achetés, offerts ou échangés contre une remise.',
          'Pas de note ou de formulation imposée.',
          'Pas de pression au comptoir pour publier immédiatement.',
          'Pas de réponse contenant une donnée personnelle du client.',
        ],
      },
    ],
    sources: [
      { label: 'Google Maps — Avis incités ou biaisés', url: 'https://support.google.com/contributionpolicy/answer/16597558?hl=fr' },
      { label: 'Google Maps — Contenu interdit et restreint', url: 'https://support.google.com/contributionpolicy/answer/7400114?hl=fr' },
      { label: 'Google — Conseils pour répondre aux avis', url: 'https://support.google.com/business/answer/3474050?hl=fr' },
    ],
  },
  {
    slug: 'repondre-aux-avis-google',
    title: 'Répondre à un avis Google : exemples positifs et négatifs',
    category: 'En pratique',
    readingTime: '3 min',
    introduction: "Une réponse à un avis est publique. Elle s'adresse à la personne qui a écrit, mais aussi à celles qui découvrent votre établissement. L'idée n'est pas d'avoir une formule parfaite : c'est de montrer que vous écoutez et que vous agissez quand c'est utile.",
    sections: [
      {
        heading: 'Avant de répondre : rester simple et personnel',
        paragraphs: [
          "Votre fiche doit être validée pour pouvoir répondre aux avis. Une fois publiée, votre réponse apparaît sous l'avis au nom de votre établissement : écrivez donc comme vous parleriez à un client en face de vous.",
          "Prenez le temps de relire le commentaire, remerciez la personne et évitez les réponses copiées-collées à l'identique. Ne publiez jamais d'information personnelle, de détail de commande ou de discussion privée.",
        ],
      },
      {
        heading: 'Face à un avis positif',
        paragraphs: [
          "Un avis positif mérite une réponse courte et sincère. Vous pouvez remercier le client, reprendre un élément précis de son expérience et lui dire que vous serez heureux de le revoir. Inutile d'en faire trop : une réponse naturelle renforce déjà la confiance.",
        ],
        bullets: [
          'Exemple : « Merci beaucoup pour votre retour. Nous sommes ravis que votre passage vous ait plu et serons heureux de vous accueillir à nouveau. »',
          'Si un détail est cité : « Merci pour votre confiance, nous transmettrons votre retour à toute l’équipe. »',
        ],
      },
      {
        heading: 'Face à un avis négatif',
        paragraphs: [
          "Un avis négatif n'est pas forcément agréable, mais il peut montrer aux futurs clients que vous prenez les problèmes au sérieux. Remerciez la personne d'avoir pris le temps d'écrire, reconnaissez son ressenti sans vous justifier publiquement, puis proposez un échange direct pour comprendre ce qui s'est passé.",
          "L'objectif est de rouvrir le dialogue, pas de gagner une discussion sous l'avis. Si le contenu enfreint les règles de Google, vous pouvez le signaler ; ne le signalez pas uniquement parce qu'il est défavorable.",
        ],
        bullets: [
          'Exemple : « Bonjour, merci d’avoir pris le temps de nous faire ce retour. Nous sommes désolés que votre expérience n’ait pas été à la hauteur. Nous aimerions comprendre ce qui s’est passé et vous inviter à nous contacter directement afin d’en reparler. »',
          'Évitez les réponses défensives, les détails personnels et les promesses impossibles à tenir.',
        ],
      },
      {
        heading: 'Faire de la réponse une habitude',
        paragraphs: [
          "Répondre régulièrement est plus utile qu'une grande opération ponctuelle. Vous montrez ainsi que les retours sont lus, que les bonnes expériences comptent et que les difficultés peuvent être traitées. C'est aussi une source concrète d'amélioration pour l'établissement.",
        ],
      },
    ],
    sources: [
      { label: 'Google — Gérer les avis client', url: 'https://support.google.com/business/answer/3474050?hl=fr' },
      { label: 'Google — Signaler des avis inappropriés', url: 'https://support.google.com/business/answer/4596773?hl=fr' },
    ],
  },
];

export const conseilArticleBySlug = (slug: string | undefined) =>
  conseilArticles.find((article) => article.slug === slug);
