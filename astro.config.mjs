import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@layouts':    path.resolve(__dirname, 'src/components/layout'),
        '@ui':         path.resolve(__dirname, 'src/components/ui'),
        '@sections':   path.resolve(__dirname, 'src/components/sections'),
        '@assets':     path.resolve(__dirname, 'src/assets'),
        '@data':       path.resolve(__dirname, 'src/data'),
        '@styles':     path.resolve(__dirname, 'src/styles'),
      },
    },
  },
});
