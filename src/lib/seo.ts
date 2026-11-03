/** Datos estructurados (schema.org) que leen buscadores y asistentes de IA. */
import type { Service } from './api';

export const SITE_NAME = 'El Bokete';

/** El hotel como entidad: la base de todos los demás datos. */
export function hotelJsonLd(site: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    '@id': new URL('/#hotel', site).href,
    name: 'El Bokete Hotel & Resort',
    url: site.href,
    logo: new URL('/brand/logo_white.png', site).href,
    image: new URL('/brand/logo_cover.webp', site).href,
    description:
      'Hotel y resort a orillas del lago Cocibolca, en Nicaragua, con habitaciones, restaurante, kayak, pádel y Day Pass.',
    inLanguage: 'es',
    address: { '@type': 'PostalAddress', addressCountry: 'NI' },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Restaurante', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Piscina', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Vista al lago', value: true },
    ],
  };
}

/** Un servicio publicado como producto con su precio "desde". */
export function serviceJsonLd(service: Service, site: URL) {
  const url = new URL(`/servicios/${service.id}`, site).href;
  const priced = service.priceFrom.minorUnits > 0;
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: service.name,
    description: service.description || undefined,
    url,
    image: service.imageUrls.length > 0 ? service.imageUrls : [new URL('/brand/logo_cover.webp', site).href],
    brand: { '@type': 'Brand', name: SITE_NAME },
    category: service.kind === 'room' ? 'Habitación' : 'Experiencia',
    ...(priced && {
      offers: {
        '@type': 'Offer',
        url,
        priceCurrency: service.priceFrom.currency,
        price: (service.priceFrom.minorUnits / 100).toFixed(2),
        availability: 'https://schema.org/InStock',
      },
    }),
  };
}

/** Migas de pan: "Inicio > Habitaciones > Suite". */
export function breadcrumbJsonLd(items: { name: string; path: string }[], site: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.path, site).href,
    })),
  };
}
