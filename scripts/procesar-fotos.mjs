// Procesa las fotos originales del dueño (../img, fuera del repo) y deja
// copias listas en src/assets/. La carpeta ../img es solo lectura: nunca se
// edita, renombra ni borra nada ahí.
//
//   node scripts/procesar-fotos.mjs
//
// Todas las fotos de autos quedan en 3:2 con el auto centrado, para que las
// tarjetas y las fichas se vean parejas. Se eligió 3:2 en vez de 4:3 porque
// la foto del Sorento viene de una captura de pantalla con barras negras:
// la banda util es 716x433 y un recorte 4:3 (577 px de ancho) le corta la
// trompa o la cola al auto. En 3:2 (650 px) el auto entra entero.
//
// El recorte de cada foto esta escrito a mano mirando la imagen, no calculado:
// si llega una foto nueva, se agrega su entrada aqui.
//
// La conversion a WebP y los tamanos los hace astro:assets al compilar; aqui
// solo se recorta y se guarda en JPEG de buena calidad.

import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// sharp ya viene con Astro (es su servicio de imágenes), así que no se agrega
// ninguna dependencia nueva para esto.
const cargar = createRequire(import.meta.url);
const sharp = cargar('sharp');

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORIGEN = path.resolve(raiz, '..', 'img');
const DESTINO = path.join(raiz, 'src', 'assets');

/**
 * extraer: recorte previo para sacar las barras negras de una captura de
 *          pantalla, antes de encuadrar.
 * encuadre: recorte final. 'alto' recorta arriba/abajo desde 'y';
 *           'ancho' recorta a los lados desde 'x'.
 * tapar:   rectangulos a pixelar, en coordenadas de la foto YA encuadrada.
 *          Se usa para las patentes. Una sola regla para todas las fotos:
 *          si la patente se lee, se tapa.
 */
const trabajos = [
  {
    origen: 'WhatsApp Image 2026-11-13 at 14.11.22 (1).jpeg',
    destino: 'portada/puerto-natales-subaru.jpg',
    nota: 'Subaru XV en la costanera, con el letrero de Puerto Natales. 16:9 para la portada.',
    encuadre: { x: 0, y: 180, ancho: 1284, alto: 722 },
  },
  {
    origen: 'WhatsApp Image 2026-11-13 at 14.11.22.jpeg',
    destino: 'portada/costanera-subaru.jpg',
    nota: 'Panoramica de la costanera. Ya viene en 3.5:1, se usa tal cual como banda ancha.',
  },
  // NO AGREGAR "WhatsApp Image 2026-11-13 at 14.15.50.jpeg" (Kia Sorento de
  // frente, en el servicentro). El PO la descarto: se ven dos personas dentro
  // del auto, una aparentemente menor de edad. El original se queda en ../img,
  // pero no se copia al repo ni se publica. El Sorento usa la del
  // estacionamiento, sin personas.
  // El Colorado llego con dos fotos: la de tres cuartos (20.48.31) y una
  // trasera (20.48.30). Se publica la de tres cuartos, que es el encuadre que
  // usan las otras de la flota. La trasera no se copia al repo: no hay donde
  // mostrarla sin armar una galeria, y ademas su patente se lee entera.
  // En la que si se publica, la patente delantera no entra en cuadro, no se ve
  // ninguna persona, y la patente de la camioneta roja del fondo no se lee ni
  // ampliandola. El recorte deja esa camioneta fuera igual.
  {
    origen: 'WhatsApp Image 2026-11-13 at 20.48.31.jpeg',
    destino: 'flota/chevrolet-colorado.jpg',
    nota: 'Colorado de tres cuartos. 3:2 cerrado sobre el auto, sin la camioneta roja del fondo.',
    encuadre: { x: 200, y: 160, ancho: 1080, alto: 720 },
  },
  // El Duster llego con tres fotos nuevas el 16-11-2026, todas de 1600x716, y
  // con ellas reemplaza a la vieja de 300x168. Se publica la de las 21.30.29
  // porque es la unica en la que el auto entra ENTERO en un 3:2 (1074x716 es
  // el recorte mas ancho posible a esa altura): en la 21.30.28 el auto cruza
  // casi los 1600 px y cualquier 3:2 le corta la cola, y en la 21.30.29 (1)
  // la cola queda fuera por unos 160 px. Ademas es de tres cuartos delanteros,
  // el mismo encuadre del resto de la flota. Las otras dos se quedan en ../img
  // sin copiarse al repo. No se ve ninguna persona; la patente se lee entera,
  // asi que va pixelada.
  {
    origen: 'WhatsApp Image 2026-11-16 at 21.30.29.jpeg',
    destino: 'flota/renault-duster.jpg',
    nota: 'Duster de tres cuartos, al sol bajo. 3:2 con el auto entero. Patente pixelada.',
    encuadre: { x: 140, y: 0, ancho: 1074, alto: 716 },
    tapar: [{ x: 68, y: 534, ancho: 160, alto: 114 }],
  },
  {
    origen: 'WhatsApp Image 2026-11-13 at 14.12.48.jpeg',
    destino: 'flota/kia-sorento.jpg',
    nota: 'Captura de galeria: primero se saca la banda util (y 548..980), despues 3:2.',
    extraer: { x: 0, y: 548, ancho: 716, alto: 433 },
    encuadre: { x: 20, y: 0, ancho: 650, alto: 433 },
  },
];

// Fotos que ya estaban en el repo y solo necesitan encuadre. Los originales
// viven en src/fotos-originales/: estan versionados pero nadie los importa,
// asi que Astro no los procesa ni los publica.
const yaEnRepo = [
  {
    // La foto nueva del Subaru (la del letrero) se reserva para la portada. En
    // la tarjeta y la ficha va esta otra, tambien real y tambien tomada en
    // Puerto Natales: si se repitiera la misma, el hero y la primera tarjeta
    // mostrarian la misma imagen una debajo de la otra.
    origen: path.join(raiz, 'src', 'fotos-originales', 'subaru-xv.jpg'),
    destino: 'flota/subaru-xv.jpg',
    nota: 'Subaru de frente, en Puerto Natales. Encuadrada 3:2.',
    encuadre: { x: 0, y: 60, ancho: 1200, alto: 800 },
  },
  {
    origen: path.join(raiz, 'src', 'fotos-originales', 'suzuki-grand-nomade.jpg'),
    destino: 'flota/suzuki-grand-nomade.jpg',
    nota: 'Se recorta gravilla de abajo, no cielo de arriba: el techo llega al borde. Patente pixelada.',
    encuadre: { x: 0, y: 0, ancho: 640, alto: 427 },
    // Fue la unica patente que hubo que tapar hasta que llego la foto nueva
    // del Duster, que tambien trae la suya legible. En el Subaru no hay
    // patente delantera y en la panoramica viene tapada desde el original. El
    // original de ../img y el de src/fotos-originales/ no se tocan: lo que se
    // pixela es la copia publicada.
    tapar: [{ x: 93, y: 203, ancho: 70, alto: 52 }],
  },
  // Aqui estaba el Duster, que se armaba con una foto de 300x168 (la peor de
  // todas, 252 px de ancho ya encuadrada). El dueno mando fotos propias y de
  // buen tamano, asi que ahora sale de ../img como las demas: su entrada esta
  // mas arriba. El original chico se borro del repo; queda en el historial.
];

/**
 * Pixela los rectangulos indicados: baja cada region a unos pocos pixeles y la
 * vuelve a subir sin interpolar. Lo que queda no se puede reconstruir, y se ve
 * que esta tapado a proposito, que es justo lo que se quiere con una patente.
 */
async function taparRegiones(img, regiones) {
  const base = await img.toBuffer();
  const piezas = [];
  for (const r of regiones) {
    // Las dos pasadas van separadas a proposito: sharp aplica un solo resize
    // por canalizacion, asi que encadenarlos deja sin efecto al primero y la
    // patente saldria intacta.
    const chico = await sharp(base)
      .extract({ left: r.x, top: r.y, width: r.ancho, height: r.alto })
      .resize({ width: Math.max(2, Math.round(r.ancho / 12)), kernel: 'nearest' })
      .png()
      .toBuffer();
    const parche = await sharp(chico)
      .resize({ width: r.ancho, height: r.alto, fit: 'fill', kernel: 'nearest' })
      .png()
      .toBuffer();
    piezas.push({ input: parche, left: r.x, top: r.y });
  }
  return sharp(await sharp(base).composite(piezas).toBuffer());
}

async function procesar({ origen, destino, extraer, encuadre, tapar, nota }) {
  const salida = path.join(DESTINO, destino);
  await mkdir(path.dirname(salida), { recursive: true });

  let img = sharp(origen);
  if (extraer) {
    img = sharp(
      await img
        .extract({ left: extraer.x, top: extraer.y, width: extraer.ancho, height: extraer.alto })
        .toBuffer(),
    );
  }
  if (encuadre) {
    img = img.extract({
      left: encuadre.x,
      top: encuadre.y,
      width: encuadre.ancho,
      height: encuadre.alto,
    });
  }
  if (tapar) {
    img = await taparRegiones(img, tapar);
  }

  const info = await img
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(salida);

  console.log(`  ${destino.padEnd(34)} ${info.width}x${info.height}  ${nota ?? ''}`);
}

console.log(`Origen (solo lectura): ${ORIGEN}`);
for (const t of trabajos) await procesar({ ...t, origen: path.join(ORIGEN, t.origen) });
console.log('Fotos que ya estaban en el repo:');
for (const t of yaEnRepo) await procesar(t);
