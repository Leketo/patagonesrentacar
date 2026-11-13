import { site } from '../data/site';
import { parkRoutes } from '../data/routes';

/** 62000 -> "$62.000" */
export function clp(value: number): string {
  return '$' + Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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
 * Anchos para astro:assets, recortados al ancho real de la foto.
 * Sin esto Astro amplía las fotos chicas (la del Duster mide 300 px) y las
 * deja borrosas. Nunca se pide más de lo que la foto tiene.
 */
export function widthsUpTo(photoWidth: number, wanted: number[] = [420, 760, 1100]): number[] {
  const ok = wanted.filter((w) => w <= photoWidth);
  return ok.length > 0 ? ok : [photoWidth];
}
