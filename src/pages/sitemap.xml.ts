import type { APIRoute } from 'astro';
import { fleet } from '../data/fleet';

const pages = [
  '/',
  '/flota/',
  ...fleet.map((car) => `/flota/${car.slug}/`),
  '/torres-del-paine/',
  '/condiciones/',
  '/contacto/',
  '/terminos/',
  '/privacidad/',
];

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://patagonesrentacar.cl');
  const urls = pages
    .map((path) => `  <url><loc>${new URL(path, base).toString()}</loc></url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
