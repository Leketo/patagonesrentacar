// Flota. Precio por día en pesos chilenos, con IVA incluido.
// Para agregar un auto: copiar un bloque, cambiar los datos, dejar su foto
// procesada en src/assets/flota/ e importarla arriba.

import subaruXv from '../assets/flota/subaru-xv.jpg';
import renaultDuster from '../assets/flota/renault-duster.jpg';
import suzukiGrandNomade from '../assets/flota/suzuki-grand-nomade.jpg';
import kiaSorento from '../assets/flota/kia-sorento.jpg';
import chevroletColorado from '../assets/flota/chevrolet-colorado.jpg';

export interface Car {
  slug: string;
  name: string;
  year: number;
  type: string;
  seats: number;
  transmission: string;
  /** Precio por día, CLP, IVA incluido. */
  price: number;
  /** Foto procesada a 3:2 (salvo la del Duster, ver nota). */
  photo: ImageMetadata;
  photoAlt: string;
  /** Para qué viaje conviene, en una línea. */
  bestFor: string;
}

export const fleet: Car[] = [
  {
    slug: 'subaru-xv-2016',
    name: 'Subaru XV',
    year: 2016,
    type: 'SUV',
    seats: 5,
    transmission: 'Automática',
    price: 62000,
    photo: subaruXv,
    photoAlt: 'Subaru XV 2016 rojo, de tres cuartos, en una calle de Puerto Natales',
    bestFor: 'Parejas o familias pequeñas que recorren la ruta y el parque.',
  },
  {
    slug: 'renault-duster-2019',
    name: 'Renault Duster',
    year: 2019,
    type: 'SUV',
    seats: 5,
    transmission: 'Automática',
    price: 68000,
    photo: renaultDuster,
    photoAlt: 'Renault Duster 2019 blanco, estacionado al borde de un camino',
    // Dejó de ser "el más reciente de la flota" cuando entró el Colorado 2022.
    bestFor: 'La SUV más nueva de la flota, para cinco pasajeros.',
  },
  {
    slug: 'suzuki-grand-nomade-2017',
    name: 'Suzuki Grand Nomade',
    year: 2017,
    type: 'SUV 4x4',
    seats: 5,
    transmission: 'Automática',
    price: 70000,
    photo: suzukiGrandNomade,
    photoAlt: 'Suzuki Grand Nomade 2017 café, de tres cuartos, sobre gravilla',
    bestFor: 'La 4x4 de la flota: la mejor opción para ripio y Base Torres.',
  },
  {
    slug: 'kia-sorento-2011',
    name: 'Kia Sorento',
    year: 2011,
    type: 'SUV',
    seats: 7,
    transmission: 'Automática',
    price: 78000,
    photo: kiaSorento,
    photoAlt: 'Kia Sorento 2011 plata, de perfil, en un estacionamiento techado',
    bestFor: 'Siete asientos: grupos y familias con equipaje.',
  },
  {
    slug: 'chevrolet-colorado-2022',
    name: 'Chevrolet Colorado',
    year: 2022,
    type: 'Camioneta 4x4',
    seats: 5,
    transmission: 'Mecánica',
    price: 128000,
    photo: chevroletColorado,
    photoAlt:
      'Chevrolet Colorado 2022 plateada, doble cabina, de tres cuartos sobre gravilla',
    bestFor: 'La camioneta de la flota: doble cabina, 4x4 y espacio de carga atrás.',
  },
];

export const minPrice = Math.min(...fleet.map((c) => c.price));

export function findCar(slug: string): Car | undefined {
  return fleet.find((c) => c.slug === slug);
}

/**
 * Distintivo de la tarjeta. Sale de los datos de arriba, no se escribe a mano:
 * así nunca dice algo que los datos no respalden, y las tarjetas dicen
 * cosas distintas en vez de repetir "ruta y parque".
 */
export function badge(car: Car): string | undefined {
  if (car.price === minPrice) return 'La más económica';
  // La camioneta va antes que la 4x4 porque las dos son 4x4: si no, dos
  // tarjetas dirían lo mismo y el distintivo dejaría de distinguir.
  if (car.type.includes('Camioneta')) return 'La camioneta';
  if (car.type.includes('4x4')) return 'La 4x4';
  if (car.seats >= 7) return `${car.seats} asientos`;
  if (car.year === Math.max(...fleet.map((c) => c.year))) return 'La más nueva';
  return undefined;
}
