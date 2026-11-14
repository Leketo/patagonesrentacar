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
 *          Se usa para las patentes. Una sola regla para las cuatro fotos:
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
    // Era la unica patente legible de la flota: en el Subaru no hay patente
    // delantera, y en el Duster y la panoramica vienen tapadas desde el
    // original. El original de ../img y el de src/fotos-originales/ no se
    // tocan: lo que se pixela es la copia publicada.
    tapar: [{ x: 93, y: 203, ancho: 70, alto: 52 }],
  },
  {
    origen: path.join(raiz, 'src', 'fotos-originales', 'renault-duster.jpg'),
    destino: 'flota/renault-duster.jpg',
    // La foto mide 300x168 y es la peor de las cuatro. Igual se encuadra a 3:2
    // como las demas, porque el PO pidio que se vean parejas: dejarla con
    // franjas la delataba al lado de las otras tres. Queda en 252 px de ancho,
    // que en la tarjeta (288 px) se amplia 1.14x y aguanta.
    nota: 'La mas chica de todas. Se encuadra 3:2 igual, para que la tarjeta no desentone.',
    encuadre: { x: 20, y: 0, ancho: 252, alto: 168 },
  },
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
