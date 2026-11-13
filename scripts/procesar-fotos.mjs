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

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORIGEN = path.resolve(raiz, '..', 'img');
const DESTINO = path.join(raiz, 'src', 'assets');

/**
 * extraer: recorte previo para sacar las barras negras de una captura de
 *          pantalla, antes de encuadrar.
 * encuadre: recorte final. 'alto' recorta arriba/abajo desde 'y';
 *           'ancho' recorta a los lados desde 'x'.
 */
const trabajos = [
  {
    origen: 'WhatsApp Image 2026-11-13 at 14.11.22 (1).jpeg',
    destino: 'portada/puerto-natales-subaru.jpg',
    nota: 'Subaru XV en la costanera, con el letrero de Puerto Natales. 16:9 para la portada.',
    encuadre: { x: 0, y: 180, ancho: 1284, alto: 722 },
  },
  {
    origen: 'WhatsApp Image 2026-11-13 at 14.11.22 (1).jpeg',
    destino: 'flota/subaru-xv.jpg',
    nota: 'La misma foto, encuadrada 3:2 para la tarjeta y la ficha.',
    encuadre: { x: 0, y: 90, ancho: 1284, alto: 856 },
  },
  {
    origen: 'WhatsApp Image 2026-11-13 at 14.11.22.jpeg',
    destino: 'portada/costanera-subaru.jpg',
    nota: 'Panoramica de la costanera. Ya viene en 3.5:1, se usa tal cual como banda ancha.',
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
    origen: path.join(raiz, 'src', 'fotos-originales', 'suzuki-grand-nomade.jpg'),
    destino: 'flota/suzuki-grand-nomade.jpg',
    nota: 'Se recorta gravilla de abajo, no cielo de arriba: el techo del auto llega al borde superior.',
    encuadre: { x: 0, y: 0, ancho: 640, alto: 427 },
  },
  {
    origen: path.join(raiz, 'src', 'fotos-originales', 'renault-duster.jpg'),
    destino: 'flota/renault-duster.jpg',
    nota: 'Solo 300x168: no se recorta ni se amplia. Se muestra contenida en el marco.',
  },
];

async function procesar({ origen, destino, extraer, encuadre, nota }) {
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
