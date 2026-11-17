// Genera los iconos del sitio a partir de public/favicon.svg, que es la fuente.
//
//   node scripts/generar-iconos.mjs
//
// Salen dos archivos a public/, versionados como cualquier otro recurso:
//   favicon.ico          16, 32 y 48 px, para la pestaña y los favoritos
//   apple-touch-icon.png 180 px, para "Agregar a la pantalla de inicio" en iOS
//
// Se corre a mano cuando cambie el SVG, no en cada compilación: el resultado
// es el mismo siempre y no vale la pena meterlo en el build.
//
// Sin dependencias nuevas: sharp ya viene con Astro.

import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const cargar = createRequire(import.meta.url);
const sharp = cargar('sharp');

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLICO = path.join(raiz, 'public');
const ORIGEN = path.join(PUBLICO, 'favicon.svg');

/** Los tres tamaños que de verdad pide un .ico hoy. */
const TAMANOS_ICO = [16, 32, 48];
const TAMANO_APPLE = 180;

// El fondo del propio dibujo (noche). El SVG ya lo trae, pero se aplana
// igual: iOS no respeta la transparencia y pondría un fondo blanco o negro
// según el tema, y el icono se vería recortado contra él.
const FONDO = { r: 14, g: 26, b: 34, alpha: 1 };

/**
 * Empaqueta varios PNG en un .ico. El formato tiene dos partes: una cabecera
 * con cuántas imágenes vienen, una entrada por imagen con su tamaño y dónde
 * empieza, y después los PNG enteros, uno detrás del otro. Se arma a mano
 * porque sharp escribe PNG pero no ICO, y un .ico con PNG adentro lo entiende
 * cualquier navegador desde hace más de quince años.
 */
function empaquetarIco(imagenes) {
  const CABECERA = 6;
  const ENTRADA = 16;

  const cabecera = Buffer.alloc(CABECERA);
  cabecera.writeUInt16LE(0, 0); // reservado
  cabecera.writeUInt16LE(1, 2); // 1 = icono
  cabecera.writeUInt16LE(imagenes.length, 4);

  let desplazamiento = CABECERA + ENTRADA * imagenes.length;
  const entradas = [];

  for (const { lado, png } of imagenes) {
    const entrada = Buffer.alloc(ENTRADA);
    // 0 significa 256: por eso un lado de 256 se escribe como 0.
    entrada.writeUInt8(lado >= 256 ? 0 : lado, 0);
    entrada.writeUInt8(lado >= 256 ? 0 : lado, 1);
    entrada.writeUInt8(0, 2); // colores de la paleta: ninguna, es PNG
    entrada.writeUInt8(0, 3); // reservado
    entrada.writeUInt16LE(1, 4); // planos
    entrada.writeUInt16LE(32, 6); // bits por píxel
    entrada.writeUInt32LE(png.length, 8);
    entrada.writeUInt32LE(desplazamiento, 12);
    entradas.push(entrada);
    desplazamiento += png.length;
  }

  return Buffer.concat([cabecera, ...entradas, ...imagenes.map((i) => i.png)]);
}

const svg = await readFile(ORIGEN);

const imagenes = [];
for (const lado of TAMANOS_ICO) {
  // density alto: el SVG se rasteriza a su tamaño final y no se reescala
  // desde uno chico, que a 16 px deja las agujas de las Torres hechas puré.
  const png = await sharp(svg, { density: 384 })
    .resize(lado, lado, { fit: 'contain', background: FONDO })
    .flatten({ background: FONDO })
    .png()
    .toBuffer();
  imagenes.push({ lado, png });
}

await writeFile(path.join(PUBLICO, 'favicon.ico'), empaquetarIco(imagenes));
console.log(`favicon.ico          ${TAMANOS_ICO.join(', ')} px`);

await sharp(svg, { density: 384 })
  .resize(TAMANO_APPLE, TAMANO_APPLE, { fit: 'contain', background: FONDO })
  .flatten({ background: FONDO })
  .png()
  .toFile(path.join(PUBLICO, 'apple-touch-icon.png'));
console.log(`apple-touch-icon.png ${TAMANO_APPLE} px`);
