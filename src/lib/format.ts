import { site } from '../data/site';

/** 62000 -> "$62.000" */
export function clp(value: number): string {
  return '$' + Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/** Enlace de WhatsApp con mensaje prellenado. */
export function waLink(text: string = site.waDefault): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
