import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    server: {
      port: 3000,
      host: '0.0.0.0',
    },

    // 👇 IMPORTANT : Tailwind DOIT être avant React
    plugins: [
      tailwindcss(),
      react(),
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
          en: path.resolve(__dirname, 'en/index.html'),
          conseil: path.resolve(__dirname, 'conseil/index.html'),
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
