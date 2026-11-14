import { site } from '../data/site';
import { parkRoutes } from '../data/routes';

/** 62000 -> "$62.000" */
export function clp(value: number): string {
  return '$' + Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * 5 -> "cinco". Los textos que cuentan autos se arman con esto y con
 * fleet.length, no a mano: así entrar un auto nuevo no deja al sitio diciendo
 * "los cuatro autos" cuando ya son cinco. Hasta diez alcanza de sobra.
 */
const NUMEROS = [
  'cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco',
  'seis', 'siete', 'ocho', 'nueve', 'diez',
];

export function enLetras(n: number): string {
  return NUMEROS[n] ?? String(n);
}

/** Enlace de WhatsApp con mensaje prellenado. */
export function waLink(text: string = site.waDefault): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

/**
 * Rutas del parque para las que este auto es el recomendado. Sale del cruce
 * con routes.ts: nadie escribe esto a mano, así que no puede contradecirse
 * con la guía de rutas.
 */
export function routesForCar(slug: string) {
  return parkRoutes.filter((r) => r.carSlug === slug);
}

/**
 * Columnas para la reja de autos: la mayor que cabe sin dejar **un solo auto**
 * en la última fila. Con cinco autos y hasta cuatro columnas devuelve 3 (3 + 2)
 * en vez de 4 (4 + 1); con cuatro autos y hasta tres columnas devuelve 2
 * (2 + 2) en vez de 3 (3 + 1).
 *
 * Si ninguna reparte bien —cinco autos en dos columnas, por ejemplo— devuelve
 * el máximo: antes de quedar en una sola columna, mejor la fila corta. Por eso
 * solo se usa de dos columnas para arriba.
 */
export function columnas(n: number, maximo: number): number {
  for (let c = Math.min(maximo, n); c >= 2; c--) {
    if (n <= c || n % c !== 1) return c;
  }
  return maximo;
}

/**
 * Anchos para astro:assets, recortados al ancho real de la foto.
 * Sin esto Astro amplía las fotos chicas (la del Duster mide 300 px) y las
 * deja borrosas. Nunca se pide más de lo que la foto tiene.
 */
export function widthsUpTo(photoWidth: number, wanted: number[] = [420, 760, 1100]): number[] {
  const ok = wanted.filter((w) => w <= photoWidth);
  return ok.length > 0 ? ok : [photoWidth];
}
