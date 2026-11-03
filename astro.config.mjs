import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// Sitio estático: las páginas se generan al compilar con el catálogo de la API.
// Para que un cambio de precios o servicios se vea, hay que volver a compilar
// (o pasar a render bajo demanda cuando la web también reserve).
//
// PUBLIC_SITE_URL debe ser la dirección real del sitio al compilar para producción:
// de ella salen el sitemap, los enlaces canónicos y los datos para buscadores.
export default defineConfig({
  output: 'static',
  site: process.env.PUBLIC_SITE_URL ?? 'http://localhost:4321',
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  devToolbar: { enabled: false },
});
