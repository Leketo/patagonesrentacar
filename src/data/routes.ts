// Rutas en Torres del Paine, según la información del dueño.
// Pendiente: verificar distancias y el punto de salida de la
// navegación al Glaciar Grey antes de agregar más detalle.

export interface ParkRoute {
  slug: string;
  name: string;
  duration: string;
  detail: string;
  recommended: string;
  /** Auto sugerido de la flota (slug), si aplica. */
  carSlug?: string;
}

export const parkRoutes: ParkRoute[] = [
  {
    slug: 'base-torres',
    name: 'Base Torres',
    duration: 'Día completo',
    detail:
      'Acceso por Laguna Amarga. Los últimos kilómetros son de ripio: conviene un auto con buen despeje.',
    recommended: 'SUV o 4x4',
    carSlug: 'suzuki-grand-nomade-2017',
  },
  {
    slug: 'circuito-w',
    name: 'Circuito W',
    duration: '5 días y 4 noches',
    detail:
      'Acceso por Laguna Amarga o Pudeto. El auto queda en un estacionamiento habilitado mientras haces el trekking.',
    recommended: 'SUV con maletero amplio',
    carSlug: 'kia-sorento-2011',
  },
  {
    slug: 'glaciar-grey',
    name: 'Glaciar Grey',
    duration: 'Día completo',
    detail: 'Navegación hacia el glaciar. Coordina horarios y entradas antes de salir.',
    recommended: 'SUV familiar',
    carSlug: 'renault-duster-2019',
  },
  {
    slug: 'mirador-cuernos',
    name: 'Mirador Cuernos y Salto Grande',
    duration: 'Medio día',
    detail: 'Caminata corta cerca de Pudeto, ideal si tienes poco tiempo.',
    recommended: 'Cualquier auto de la flota',
    carSlug: 'subaru-xv-2016',
  },
];

export const parkTips = [
  'El parque queda a poco más de dos horas de Puerto Natales.',
  'Los accesos al parque requieren entrada oficial: cómprala antes de viajar.',
  'Dentro del parque, el auto se deja solo en estacionamientos habilitados.',
];
