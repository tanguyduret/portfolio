# Tanguy Duret | Personal Portfolio

A multilingual portfolio about my work in business, procurement and international operations, and the digital tools I build along the way.

**[Visit tanguyduret.com](https://tanguyduret.com)** · [English](https://tanguyduret.com/en/) · [Español](https://tanguyduret.com/es/)

## About

I am completing the Programme Grande École at KEDGE Business School, specialising in Operations Management, Supply Chain and Innovation. My experience spans aerospace procurement at Airbus, account management at Holidu and project management at AMS Conseil. An exchange semester in Buenos Aires gave me the opportunity to study and work with classmates in Spanish.

**Available for an international V.I.E. assignment from October 2027.**

## Explore the portfolio

The professional timeline brings together my current and previous roles. Three personal projects show another side of my work: helping local businesses improve their Google presence, automating parts of client follow-up and designing this portfolio. The site also covers my education, languages and interests in aviation, photography and travel.

The design follows one principle: **Remove the noise. Keep the essential.** A dark palette, restrained gold accents and editorial typography frame the content. The rotating globe, departure board and expandable sections draw on my interest in aviation.

| Language | Route |
| --- | --- |
| Français | [/](https://tanguyduret.com/) |
| English | [/en/](https://tanguyduret.com/en/) |
| Español (Latinoamérica) | [/es/](https://tanguyduret.com/es/) |

Each edition has its own page metadata and CV. The language switcher preserves the current section where possible. Contact and professional references are available from the footer.

## Technology and local development

React and TypeScript power the interface. Vite builds the site, React Router handles navigation, and CSS controls the responsive layouts and portfolio animations.

With Node.js 22 LTS (22.12 or newer) and npm installed, run:

```sh
npm ci
npm run dev
```

Open the [local portfolio](http://127.0.0.1:3011/). Before pushing:

```sh
npm run check
```

This type-checks the application and builds the production files in `dist/`. To inspect that build locally, run `npm run preview`.

## Deployment, SEO and accessibility

The production site is hosted on Vercel at [tanguyduret.com](https://tanguyduret.com). French, English and Spanish have separate HTML entry points with canonical URLs, reciprocal hreflang annotations, structured data and social previews. The repository includes a sitemap and robots.txt. Each edition supports keyboard navigation, descriptive image text and reduced motion.

`vercel.json` configures routing and security headers, including a Content Security Policy for the portfolio. The portfolio itself has no public input form. The separate Conseil section uses a server-side contact endpoint; keep its email credentials in environment variables, never in frontend code or version control.

## Contact

**Tanguy Duret** · [Email](mailto:tanguy.duret@kedgebs.com) · [LinkedIn](https://www.linkedin.com/in/tanguy-duret-kedgebs)

