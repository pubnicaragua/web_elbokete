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

## Pendiente

* Reservar desde la web: necesita CORS en la API, inicio de sesión del cliente y pasar a render bajo demanda.
* Inglés (la app ya tiene es/en).
* Fotos reales de cada servicio (hoy se ve el fondo de curvas de nivel).
* Despliegue y seguridad de cabeceras (CSP, HSTS) según dónde se publique.
