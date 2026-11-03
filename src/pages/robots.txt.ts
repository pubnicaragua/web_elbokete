import type { APIRoute } from 'astro';

/** Los rastreadores de IA se permiten de forma explícita: queremos aparecer en sus respuestas. */
const AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'PerplexityBot', 'Google-Extended'];

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('http://localhost:4321');
  const body = [
    '# El Bokete: sitio público; buscadores y asistentes de IA son bienvenidos.',
    'User-agent: *',
    'Allow: /',
    '',
    ...AI_BOTS.flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /', '']),
    `Sitemap: ${new URL('/sitemap-index.xml', base).href}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
