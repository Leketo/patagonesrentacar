// Datos del negocio. Todo lo que aparece en el sitio sale de aquí,
// de fleet.ts y de routes.ts: para cambiar un precio o un texto,
// se edita el dato y se vuelve a publicar.

export const site = {
  name: 'Patagones Rent a Car',
  shortName: 'Patagones',
  slogan: 'Explora Patagonia a tu ritmo y sin complicaciones.',
  url: 'https://patagonesrentacar.cl',
  city: 'Puerto Natales',
  region: 'Región de Magallanes',
  country: 'Chile',
  /** WhatsApp en formato internacional, solo dígitos (wa.me). */
  whatsapp: '56999898671',
  /** El mismo número, para mostrar. */
  phoneDisplay: '+56 9 9989 8671',
  phoneHref: 'tel:+56999898671',
  /** Correo de contacto. Pendiente: lo entrega el dueño. */
  email: null as string | null,
  hours: 'Todos los días, de 8:00 a 21:00',
  /** Para datos estructurados (schema.org). */
  openingHours: 'Mo-Su 08:00-21:00',
  minAge: 21,
  pricesIncludeVat: true,
  waDefault: 'Hola, vengo de patagonesrentacar.cl y quiero consultar por el arriendo de un auto.',
};

export interface Condition {
  label: string;
  /** null = dato pendiente del dueño; el sitio muestra "Consúltanos". */
  value: string | null;
}

// Pendientes del dueño: depósito, cruce a Argentina y cancelación.
// Cuando lleguen, se reemplaza null por el texto.
export const conditions: Condition[] = [
  { label: 'Seguro', value: 'Incluido' },
  { label: 'Kilometraje', value: 'Libre' },
  { label: 'Entrega', value: 'Aeropuerto u hotel' },
  { label: 'Estanque', value: 'Lleno al retirar' },
  { label: 'Edad mínima', value: `${site.minAge} años` },
  { label: 'Precios', value: 'IVA incluido' },
  { label: 'Depósito', value: null },
  { label: 'Cruce a Argentina', value: null },
  { label: 'Cancelación', value: null },
];

export const requirements = [
  'Cédula de identidad o pasaporte vigente.',
  'Licencia de conducir vigente, a nombre de quien retira el auto.',
  `Tener ${site.minAge} años o más.`,
];

export const services = [
  'Seguro incluido en cada arriendo',
  'Kilometraje libre',
  'Asistencia en ruta 24/7',
  'Entrega en el aeropuerto o en tu hotel',
  'Conductores adicionales',
  'Estanque lleno al retirar',
];
