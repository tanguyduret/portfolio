# Web Studio · Prévisualisation et mise en ligne

## Périmètre

`/web` est une page HTML statique du site Vite existant. Elle n’utilise pas le routeur, le CSS ou les animations du portfolio. Le studio réutilise uniquement le logo d’origine et la structure de déploiement. La fonction de devis est indépendante de celle de Conseil. Aucune dépendance n’est ajoutée.

Prévisualisation locale : `npm ci`, `npm run check`, puis `npm run preview -- --host 127.0.0.1 --port 3022`. Ouvrir `/web`. Ce serveur prévisualise les pages, pas les fonctions Vercel.

## Référencement

Une page principale cible la création et la refonte de sites vitrines. Les usages s’organisent autour des réalisations, du tarif, de la méthode et des questions d’achat. La lecture de concurrents est qualitative : l’objectif est de rendre comparables les offres et de montrer le travail plutôt que de répéter des promesses. Aucun volume de recherche n’est avancé.

Le contenu, les titres, le canonical, les métadonnées sociales et le JSON-LD `Service` sont dans le HTML. `/web` est présent dans le sitemap existant ; la prévisualisation est exclue de l’indexation. Les projets présentés sont des concepts, sans clients ni résultats fictifs.

| Adresse envisagée | Condition pour la créer |
|---|---|
| `/web/creation-site-vitrine` | Détailler le choix des pages, les livrables et les contenus à préparer. |
| `/web/refonte-site-internet` | Expliquer l’inventaire, les redirections, la recette et la reprise du site. |
| `/web/realisations` | Disposer d’au moins un cas suffisamment documenté, identifié comme concept ou projet client. |
| `/web/creation-site-internet-artisan` | Montrer des cas d’usage propres aux artisans : réalisations, demandes de devis, zones d’intervention. |
| `/web/tarifs-creation-site-internet` | Apporter un guide de décision, avec coûts récurrents et exemples de périmètre. |

Pas de pages Toulouse/Bordeaux sans élément réellement propre à chaque ville. À la mise en production, vérifier la réponse HTTPS, le `canonical`, l’absence de `noindex` en production, sa présence en prévisualisation et le vrai 404 d’une URL inconnue. Dans Search Console, soumettre le sitemap à jour, inspecter l’URL canonique, puis suivre les impressions par requête et page.

## Formulaire et prévisualisation Vercel

1. Utiliser le projet Vercel existant, sur une offre autorisant l’usage commercial. Ne pas changer la branche de production pour tester. Une fois la branche poussée, générer une prévisualisation et la protéger si l’offre le permet.
2. Configurer `WEB_QUOTE_REDIS_URL` et `WEB_QUOTE_REDIS_TOKEN` avec les identifiants REST Upstash, `WEB_QUOTE_HASH_SECRET` avec une valeur aléatoire d’au moins 32 caractères (différente entre Preview et Production), `WEB_QUOTE_FROM_EMAIL` avec une adresse d’expédition vérifiée et `RESEND_API_KEY` côté serveur. Préférer une base Redis de test séparée ou vérifier l’isolation par environnement. Ne pas préfixer ces variables par `VITE_` ni les committer. Ne pas modifier les paramètres Conseil sans raison.
3. Vérifier le domaine d’envoi dans Resend et les entrées DNS SPF/DKIM indiquées par le service. Vérifier l’alignement et la politique DMARC sans écraser les entrées existantes. Confirmer que l’adresse publique de contact accepte bien les messages entrants : l’authentification d’envoi Resend ne crée pas de boîte ni de redirection entrante.
4. Depuis la vraie prévisualisation, soumettre un devis fictif marqué « test », puis contrôler sa réception dans la boîte prévue, la provenance et le fonctionnement de « Répondre ». Tester également le refus au dépassement de quota et le comportement si la livraison échoue. Un succès de l’API Resend n’est pas une preuve d’arrivée dans la boîte.
5. Après validation visuelle et technique, revue de PR et confirmation commerciale/légale, seulement : fusionner sur la branche de production et vérifier `/web`, le formulaire et les pages existantes. En cas de problème, la référence de rollback est le déploiement précédent du projet Vercel ; ensuite corriger ou rétablir la branche Git pour éviter de republier le problème.

Protections : JSON borné et validé, méthode et origine contrôlées, honeypot, quota atomique par identifiant pseudonymisé et quota global, e-mail en texte brut à destinataire fixe, réponse d’erreur générique, CSP du studio et aucun secret dans les ressources navigateur. Le contrôle d’origine ne remplace pas le quota. Le serveur refuse l’envoi si la configuration ou le service de limitation manque. Le service ne journalise pas les demandes dans le code de l’application ; vérifier séparément les réglages et durées des prestataires.

## Points légaux et commerciaux à valider

- Confirmer identité/statut de l’éditeur, immatriculation, coordonnées, hébergeur et applicabilité des mentions existantes de Conseil au Studio. Ne pas publier d’informations d’identification supplémentaires sans validation.
- Compléter la page de confidentialité : durée de conservation des devis et échanges, destinataires, droits applicables, sous-traitants et éventuels transferts hors EEE. Aucun traceur non essentiel activé ; les polices sont actuellement externes.
- Confirmer la présentation des prix (TTC et/ou régime de TVA applicable), le périmètre du devis, les frais récurrents et les CGV. Pour les contrats avec des particuliers, vérifier notamment les mentions précontractuelles, les règles de rétractation et la médiation lorsqu’elles s’appliquent.
- Vérifier les coûts et limites du plan commercial Vercel, de Resend et d’Upstash ; aucune souscription n’est effectuée par cette branche. Pas de promesse de classement ou de résultat commercial.

## Contrôles

- `npm run check` : TypeScript et build de production.
- `node --test tests/web-quote.test.mjs` : validation et réponses de la fonction avec Redis et Resend simulés ; pas d’e-mail réel.
- `npm audit --omit=dev --audit-level=high` : dépendances de production au moment du contrôle.
- Prévisualisation : contrôle des routes du portefeuille, de Conseil, du Studio et des ressources. Contrôle navigateur à 390, 784 et 1440 px : largeur, chargement du visuel, FAQ et présélection de l’offre.

Mesures Lighthouse sur Chrome et le build local, après correction des contrastes et ajout d’une image mobile d’environ 116 Kio :

| Profil | Performance | Accessibilité | Bonnes pratiques | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|
| Mobile | 91 | 100 | 100 | 2,4 s | 0,001 | 0 ms |
| Bureau | 96 | 100 | 100 | 1,0 s | 0,002 | 0 ms |

Le score SEO local est de 69 sur les deux profils : le contrôle d’indexabilité échoue volontairement avec l’en-tête `noindex` de prévisualisation. Ces scores sont automatisés et ne remplacent pas une vérification manuelle. Le serveur Vite peut renvoyer le portfolio pour une URL inconnue ; vérifier le statut 404 sur le déploiement Vercel.

Après configuration distante : vérifier les en-têtes réels, la délivrabilité, le rendu Safari et les scores Lighthouse sur l’aperçu distant. Les seuils LCP, INP et CLS en conditions réelles ne pourront être confirmés qu’avec des données de terrain ; le TBT ne mesure pas l’INP.
