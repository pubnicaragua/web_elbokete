# Web de El Bokete

Sitio público de El Bokete (hotel y resort, Nicaragua) hecho con [Astro](https://astro.build).
Es estático: al compilar lee el catálogo de la **API de El Bokete** y genera una página por servicio.
Igual que la app, no habla nunca con el ERP.

## Cómo correrlo

```bash
cp .env.example .env     # ajusta PUBLIC_API_URL si la API no está en el puerto 3000
npm install
npm run dev              # http://localhost:4321 (la API debe estar encendida)
npm run build            # genera dist/
```

## Qué hay

| Ruta | Archivo | Qué muestra |
|------|---------|-------------|
| `/` | `src/pages/index.astro` | portada, habitaciones y experiencias destacadas |
| `/habitaciones` | `src/pages/habitaciones.astro` | todas las habitaciones |
| `/experiencias` | `src/pages/experiencias.astro` | todo lo que no es habitación |
| `/servicios/:id` | `src/pages/servicios/[id].astro` | detalle de un servicio |

* `src/lib/api.ts` es el único lugar que conoce la API: tipos, tiempo de espera y formato de precios.
* Colores y tipografías vienen de la marca (mismos tokens que la app) en `src/styles/global.css`.
* El logo y la foto son los entregados por el cliente (`public/brand/`).

## SEO y asistentes de IA

* Cada página tiene título propio, descripción, enlace canónico, Open Graph y Twitter Card (`src/layouts/Base.astro`).
* Datos estructurados schema.org: el hotel (inicio), un producto con su precio por servicio y migas de pan (`src/lib/seo.ts`).
* `/sitemap-index.xml` (automático), `/robots.txt` (permite buscadores y rastreadores de IA de forma explícita) y `/llms.txt`
  (resumen del sitio para asistentes de IA, generado del catálogo).
* La imagen principal se pide con prioridad (`fetchpriority="high"`) y las tipografías se precargan.
* **Antes de publicar:** compilar con `PUBLIC_SITE_URL` real; de ahí salen canónicos, sitemap y `llms.txt`.

## Cookies

El sitio no usa cookies de analítica ni de publicidad. Si se define `PUBLIC_ANALYTICS_ID` (Google Analytics 4), aparece el aviso de
cookies (`src/components/ConsentBanner.astro`): nada se carga hasta que el visitante acepta, aceptar y rechazar pesan igual, la
elección dura 6 meses en la cookie `bokete_consent` y se puede cambiar desde el pie de página. Las páginas `/cookies` y
`/privacidad` son versiones preliminares que debe revisar un abogado.

## Pendiente

* Reservar desde la web: necesita inicio de sesión del cliente y pasar a render bajo demanda (el CORS de la API ya se configura con `CORS_ORIGINS`).
* Inglés (la app ya tiene es/en) con `hreflang`.
* Fotos reales de cada servicio (hoy se ve el fondo de curvas de nivel) y optimización de imágenes con `astro:assets`.
* Dirección, teléfono, redes y mapa reales en los datos estructurados (hoy solo el país).
* Dominio y hosting; cabeceras de seguridad (`public/_headers` sirve en Netlify y Cloudflare Pages).
* Revisión legal de privacidad y cookies.
