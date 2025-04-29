import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel'; // si estás usando vercel

export default defineConfig({
  adapter: vercel(),
  integrations: [react()],
});
