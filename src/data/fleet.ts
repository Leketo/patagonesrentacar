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
  /**
   * Cilindrada, tal como la dio el dueño (ej.: "1.6"). Opcional a propósito:
   * del resto de la flota no la tenemos, y se deja vacía antes que suponerla.
   * La ficha muestra la fila "Motor" solo si este dato existe.
   */
  engine?: string;
  /** Precio por día, CLP, IVA incluido. */
  price: number;
  /** Foto procesada a 3:2. */
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
    // El dueño corrigió los datos el 16-11-2026: es 2018 y es mecánica, no
    // 2019 automática como figuraba. Cambia el slug, así que la dirección
    // /flota/renault-duster-2019/ deja de existir.
    slug: 'renault-duster-2018',
    name: 'Renault Duster',
    year: 2018,
    type: 'SUV',
    seats: 5,
    // Él lo dijo como "caja manual 1.6". En el sitio los cambios manuales se
    // escriben "Mecánica", como en el Colorado, para no tener dos palabras
    // para lo mismo.
    transmission: 'Mecánica',
    engine: '1.6',
    price: 68000,
    photo: renaultDuster,
    photoAlt:
      'Renault Duster 2018 blanco, de tres cuartos, al borde de un camino de ripio con el sol bajo',
    // Dejó de ser "el más reciente de la flota" cuando entró el Colorado 2022,
    // pero sigue siendo la SUV más nueva: el Colorado es camioneta y las otras
    // tres SUV son 2017, 2016 y 2011.
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
    // Dejó de ser "la 4x4 de la flota" cuando entró el Colorado, que también
    // lo es. Lo que sigue siendo cierto y la distingue: es la SUV 4x4.
    bestFor: 'SUV 4x4 automática: la mejor opción para ripio y Base Torres.',
  },
  {
    slug: 'kia-sorento-2011',
    name: 'Kia Sorento',
    year: 2011,
    type: 'SUV',
    seats: 7,
    transmission: 'Automática',
    // Subió de $78.000 a $85.000 el 16-11-2026, por encargo del dueño.
    price: 85000,
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
  // Hay dos 4x4 en la flota, así que ninguna puede decir "La 4x4": eso
  // afirmaría que es la única. Cada una dice lo que la distingue de la otra.
  if (car.type.includes('Camioneta')) return 'La camioneta';
  if (car.type.includes('4x4')) return 'SUV 4x4';
  if (car.seats >= 7) return `${car.seats} asientos`;
  if (car.year === Math.max(...fleet.map((c) => c.year))) return 'La más nueva';
  return undefined;
}
