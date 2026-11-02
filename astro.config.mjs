import { defineConfig } from 'astro/config';

// Sitio estático: las páginas se generan al compilar con el catálogo de la API.
// Para que un cambio de precios o servicios se vea, hay que volver a compilar
// (o pasar a render bajo demanda cuando la web también reserve).
export default defineConfig({
  output: 'static',
  site: process.env.PUBLIC_SITE_URL ?? 'http://localhost:4321',
  devToolbar: { enabled: false },
});
