// Flota. Precio por día en pesos chilenos, con IVA incluido.
// Para agregar un auto: copiar un bloque, cambiar los datos y dejar
// su foto en public/images/flota/.

export interface Car {
  slug: string;
  name: string;
  year: number;
  type: string;
  seats: number;
  transmission: string;
  /** Precio por día, CLP, IVA incluido. */
  price: number;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  /** Para qué viaje conviene, en una línea. */
  bestFor: string;
  tag: string;
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
    image: '/images/flota/subaru-xv.webp',
    imageAlt: 'Subaru XV 2016 de color rojo en Puerto Natales',
    imageWidth: 1280,
    imageHeight: 960,
    bestFor: 'Parejas o familias pequeñas que recorren la ruta y el parque.',
    tag: 'Ruta y parque',
  },
  {
    slug: 'renault-duster-2019',
    name: 'Renault Duster',
    year: 2019,
    type: 'SUV',
    seats: 5,
    transmission: 'Automática',
    price: 68000,
    image: '/images/flota/renault-duster.webp',
    imageAlt: 'Renault Duster 2019 de color blanco',
    imageWidth: 800,
    imageHeight: 600,
    bestFor: 'El modelo más reciente de la flota, para cinco pasajeros.',
    tag: 'Ruta y parque',
  },
  {
    slug: 'suzuki-grand-nomade-2017',
    name: 'Suzuki Grand Nomade',
    year: 2017,
    type: 'SUV 4x4',
    seats: 5,
    transmission: 'Automática',
    price: 70000,
    image: '/images/flota/suzuki-grand-nomade.webp',
    imageAlt: 'Suzuki Grand Nomade 2017 de color café',
    imageWidth: 800,
    imageHeight: 600,
    bestFor: 'La 4x4 de la flota: la mejor opción para ripio y Base Torres.',
    tag: '4x4 · ripio',
  },
  {
    slug: 'kia-sorento-2011',
    name: 'Kia Sorento',
    year: 2011,
    type: 'SUV',
    seats: 7,
    transmission: 'Automática',
    price: 78000,
    image: '/images/flota/kia-sorento.webp',
    imageAlt: 'Kia Sorento 2011 de color plata',
    imageWidth: 800,
    imageHeight: 600,
    bestFor: 'Siete asientos: grupos y familias con equipaje.',
    tag: '7 pasajeros',
  },
];

export const minPrice = Math.min(...fleet.map((c) => c.price));

export function findCar(slug: string): Car | undefined {
  return fleet.find((c) => c.slug === slug);
}
