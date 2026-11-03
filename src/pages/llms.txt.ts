import type { APIRoute } from 'astro';
import { formatMoney, services, unitLabel } from '../lib/api';

/**
 * Resumen del sitio en texto plano para asistentes de IA (formato llms.txt).
 * Se genera al compilar con el catálogo actual, así nunca queda desactualizado
 * respecto a las páginas.
 */
export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('http://localhost:4321');
  const all = await services();
  const line = (s: (typeof all)[number]) => {
    const price =
      s.priceFrom.minorUnits > 0 ? ` — desde ${formatMoney(s.priceFrom)} ${unitLabel(s.priceUnit)}`.trimEnd() : '';
    const detail = s.description ? `: ${s.description}` : '';
    return `- [${s.name}](${new URL(`/servicios/${s.id}`, base).href})${detail}${price}`;
  };

  const rooms = all.filter((s) => s.kind === 'room');
  const others = all.filter((s) => s.kind !== 'room');

  const body = [
    '# El Bokete Hotel & Resort',
    '',
    '> Hotel y resort a orillas del lago Cocibolca, en Nicaragua. Habitaciones, restaurante, kayak, pádel, Day Pass y experiencias. Las reservas se hacen desde la app de El Bokete.',
    '',
    '## Habitaciones',
    ...rooms.map(line),
    '',
    '## Experiencias y servicios',
    ...others.map(line),
    '',
    '## Páginas',
    `- [Habitaciones](${new URL('/habitaciones', base).href})`,
    `- [Experiencias](${new URL('/experiencias', base).href})`,
    `- [Privacidad](${new URL('/privacidad', base).href})`,
    `- [Cookies](${new URL('/cookies', base).href})`,
    '',
  ].join('\n');

  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
