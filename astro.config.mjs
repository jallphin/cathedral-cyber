import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  site: 'https://jallphin.github.io',
  base: '/cathedral-cyber',
  vite: {
    plugins: [tailwindcss()]
  }
});
