import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const studioPreviewRoutes: Plugin = {
  name: 'studio-preview-routes',
  configureServer(server) { server.middlewares.use(rewriteStudioRoute); },
  configurePreviewServer(server) { server.middlewares.use(rewriteStudioRoute); },
};

function rewriteStudioRoute(req: import('node:http').IncomingMessage, _res: import('node:http').ServerResponse, next: () => void) {
  const [pathname, query] = (req.url ?? '').split(/\?(.*)/s);
  const suffix = query === undefined ? '' : `?${query}`;
  if (pathname === '/web') req.url = `/web/index.html${suffix}`;
  if (pathname === '/web/confidentialite') req.url = `/web/confidentialite.html${suffix}`;
  next();
}

export default defineConfig({
    server: {
      port: 3011,
      host: '127.0.0.1',
      strictPort: true,
      headers: { 'X-Robots-Tag': 'noindex, nofollow', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin' },
    },

    preview: { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },

    // 👇 IMPORTANT : Tailwind DOIT être avant React
    plugins: [
      tailwindcss(),
      react(),
      studioPreviewRoutes,
    ],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    // Pages HTML distinctes : portfolio FR, portfolio EN et Conseil.
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          es: path.resolve(__dirname, 'es/index.html'),
          en: path.resolve(__dirname, 'en/index.html'),
          conseil: path.resolve(__dirname, 'conseil/index.html'),
          webStudio: path.resolve(__dirname, 'web/index.html'),
          webStudioPrivacy: path.resolve(__dirname, 'web/confidentialite.html'),
          conseilMentionsLegales: path.resolve(__dirname, 'conseil/mentions-legales.html'),
          conseilPolitiqueConfidentialite: path.resolve(__dirname, 'conseil/politique-confidentialite.html'),
          conseilGuide: path.resolve(__dirname, 'conseil/guide/index.html'),
          guidePourquoiLesAvisComptent: path.resolve(__dirname, 'conseil/guide/pourquoi-les-avis-comptent.html'),
          guideDemanderUnAvisCorrectement: path.resolve(__dirname, 'conseil/guide/demander-un-avis-correctement.html'),
          guideCeQuIlNeFautPasFaire: path.resolve(__dirname, 'conseil/guide/ce-qu-il-ne-faut-pas-faire.html'),
          guideRepondreAuxAvis: path.resolve(__dirname, 'conseil/guide/repondre-aux-avis-google.html'),
        },
      },
    },
});
