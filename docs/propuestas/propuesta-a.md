# Propuesta A

Agente A. Rama `propuesta-a`. 13-11-2026.

## Qué cambié y por qué

**El punto de partida compilaba.** `npm install`, `npm run build` y `npm run check` pasan
sin errores sobre el código de `main`: no hubo nada que corregir. El primer commit solo
agrega el lockfile, para que la compilación del VPS use las mismas versiones que la local.

**La arquitectura de color salió de medir, no de gustos.** El acento `#F08A3C` sobre el
papel `#EAF0F0` da **2.17:1** y es inusable como texto. Sobre noche da 7.07:1 y sobre
granito 5.39:1. Por eso el catálogo vive sobre noche/granito, donde el naranja sí funciona,
y el papel queda para las páginas de texto largo. Agregué `--amanecer-tinta #A24E0C` (5.1:1
sobre papel) para los enlaces de esas páginas. El naranja se reserva a tres usos —el botón
de consultar, el precio por día y la luz sobre la roca de la ilustración— y a ninguno más.

**La portada responde en una pantalla de teléfono.** El orden en móvil es titular → foto →
precio → botón: qué auto, cuánto cuesta y cómo consultar caben sobre el pliegue a 390 px.
Antes, cuatro campos de fecha empujaban los autos fuera de la pantalla; el formulario bajó
a después de la flota, donde además el visitante ya sabe qué auto quiere y el mensaje de
WhatsApp sale mejor. La cabecera pasó de tres filas a dos.

**La tarjeta de auto está hecha para comparar**, que es justo donde falla la competencia:
el precio arriba y en la misma posición en las cuatro, con la misma tipografía y tamaño. El
distintivo ahora **sale de los datos** (la más económica, la más nueva, la 4x4, siete
asientos) en vez de escribirse a mano: antes dos autos decían lo mismo. Y "lo recomendamos
para" se **cruza con `routes.ts`**, así que no puede contradecir a la guía de rutas.

**Quité una sección entera de la portada.** "Qué incluye" repetía cuatro de los seis datos
de la tabla de condiciones, que además muestra los pendientes. La portada bajó de 7.800 a
7.100 px de alto en móvil sin perder información.

**La ilustración del macizo se fue a la página del parque.** Con la foto nueva del Subaru,
la portada ya tiene lo más característico del negocio fotografiado; no hay que dibujarlo.
En cambio del parque no hay ninguna foto real, y ahí una ilustración que se ve ilustración
es honesta donde una de stock no lo sería. La rehice entera: Paine Grande ancho, Cuernos
con su cúpula de roca oscura y las tres Torres como agujas, con la luz solo en las caras
que miran al este, compartiendo vértice con la silueta para que no se despegue de la roca.

**Tics de plantilla que saqué:** las etiquetas en versalitas espaciadas sobre cada título,
la flecha pegada al texto del botón, el mismo `border-radius` en absolutamente todo, y la
franja naranja sobre las tarjetas de ruta.

**Un error de maquetación del punto de partida:** la sangría de la foto del hero usaba
`50% - 50vw`, pero ese `50%` se mide contra la columna de la reja y no contra el
contenedor. La página desbordaba **319 px** en horizontal. Ahora el cálculo va sobre un
elemento de ancho completo, donde `100%` ya descuenta la barra de desplazamiento.

## Qué verifiqué, y cómo

| Qué | Resultado |
|---|---|
| `npm run build` y `npm run check` | 12 páginas, 0 errores, 0 avisos |
| Accesibilidad: contraste real calculado, alt, etiquetas, jerarquía de encabezados, enlaces ambiguos, blancos de toque y desborde, en 9 páginas × 390/768/1440 px | **0 hallazgos en 27 combinaciones** |
| Formulario de consulta de punta a punta (fechas, validaciones, mensaje armado, auto preelegido en la ficha) | **13 de 13**, sin salir de la máquina |
| Salida compilada: enlaces internos, sitemap, JSON-LD, largos de título y descripción | sin problemas |
| Peso | CSS 16 KB en un archivo · **0 KB de JS en archivo aparte** · 66 KB de fuentes en la primera visita |

Los hallazgos que **sí** aparecieron y corregí: el mismo teléfono era enlace de WhatsApp y
de llamada con idéntico nombre accesible; las cuatro tarjetas decían "Ver ficha y
consultar" sin distinguirse; las migas leían "mayor que" entre cada enlace; varios blancos
de toque bajo los 24 px; y siete títulos o descripciones que Google habría truncado.

## Dependencias agregadas

**Ninguna.** El procesado de fotos usa `sharp`, que ya viene con Astro como su servicio de
imágenes, y las capturas y auditorías las hice con el Chrome ya instalado por el protocolo
DevTools. Nada de esto se publica ni entra en `package.json`.

## Las fotos

Fuente: `../img` (solo lectura). Procesadas con `scripts/procesar-fotos.mjs`, que deja
escrito el recorte de cada una para cuando lleguen fotos nuevas.

| Foto original | Qué es | Dónde la usé |
|---|---|---|
| `14.11.22 (1).jpeg` (1284×946) | Subaru XV junto al letrero de Puerto Natales, con el fiordo y la cordillera | **Portada** (16:9) y imagen para redes de todo el sitio |
| `14.11.22.jpeg` (1284×364) | Panorámica del mismo Subaru en la costanera | Procesada y disponible en `src/assets/portada/`, **sin usar todavía** |
| `14.12.48.jpeg` (716×1600) | Kia Sorento de perfil, captura de galería con barras negras | **Tarjeta y ficha del Sorento**. Reemplaza a la que tenía marca de agua |
| `14.15.50.jpeg` (716×1600) | Kia Sorento de frente, en un servicentro | **Descartada por el PO** — ver abajo |
| `subaru-xv.jpg` (del repo) | Subaru de frente, en Puerto Natales | **Tarjeta y ficha del Subaru** |
| `suzuki-grand-nomade.jpg` (del repo) | Suzuki en un patio de autos | Tarjeta y ficha del Suzuki (es la única que hay) |
| `renault-duster.jpg` (del repo) | Duster, 300×168 | Tarjeta y ficha del Duster (es la única que hay) |

**La cuarta foto, descartada.** Tiene **dos personas identificables dentro del auto** (una
mujer y un niño en el asiento del acompañante) y la **patente legible**. En la foto del
Subaru el dueño tapó la patente él mismo, así que esa es su propia convención. No publico
caras de personas privadas sin que alguien lo autorice, así que la dejé fuera y lo planteé
al PO.

**El PO la descartó**: no se puede usar porque se ven dos personas dentro del auto, una
aparentemente menor de edad. Queda así:

- El Sorento usa la **otra foto disponible, la del estacionamiento, sin personas**, con el
  mismo tratamiento 3:2 que los otros tres autos. Ya era la que estaba en uso desde el
  primer commit de fotos, de modo que no hubo nada que reemplazar.
- **No hay ninguna copia de la del servicentro en el repositorio.** Nunca se copió: solo se
  leyó desde `../img` para identificar de qué auto era. No aparece en
  `scripts/procesar-fotos.mjs`, ni en `src/assets/`, ni en `src/fotos-originales/`, ni en
  `public/`, ni en la salida compilada. Verificado sobre los archivos versionados y también
  sobre los no versionados del árbol de trabajo.
- El original sigue intacto en `../img`, que es solo lectura y no forma parte del repo.

El costo de descartarla es que era la única foto del Sorento tomada en la zona: la que se
usa está tomada en un estacionamiento subterráneo. Queda como pendiente del dueño.

**Me desvié de una sugerencia del PO.** Las fotos quedaron todas en **3:2 y no en 4:3**. La
banda útil del Sorento, una vez quitadas las barras negras de la captura, mide 716×433; un
recorte 4:3 son 577 px de ancho y le corta la trompa o la cola al auto. En 3:2 entra
entero. Si el PO prefiere 4:3, se cambia una línea del script y se vuelve a correr.

**Identificación.** Cada auto lo identifiqué mirando la foto, no el nombre del archivo: el
Subaru por el color, las llantas y la insignia; el Sorento por la insignia KIA y por ser el
mismo estacionamiento de columnas turquesa que la foto que ya estaba en el repo.

## Capturas

En `docs/propuestas/capturas-a/`, de página completa, al ancho real de viewport y con el
navegador en es-CL (si no, los campos de fecha salen en `mm/dd/yyyy`):

| | 390 px | 1440 px |
|---|---|---|
| Inicio | `1-inicio-390.webp` | `1-inicio-1440.webp` |
| Flota | `2-flota-390.webp` | `2-flota-1440.webp` |
| Ficha (Suzuki Grand Nomade) | `3-ficha-suzuki-grand-nomade-390.webp` | `3-ficha-suzuki-grand-nomade-1440.webp` |
| Torres del Paine | `4-torres-del-paine-390.webp` | `4-torres-del-paine-1440.webp` |

## Lo que queda pendiente

**Del dueño**, sin lo cual el sitio no puede decir más de lo que dice:

- Depósito, cruce a Argentina y cancelación. Hoy son tres "Consúltanos" en la tabla de
  condiciones y tres respuestas de preguntas frecuentes que admiten que no está cerrado.
- Correo de contacto. El sitio ya lo muestra solo si existe (`site.email`).
- **Foto nueva del Renault Duster.** Es el peor punto visual que queda: 300 × 168 px, y
  además no parece tomada en la zona. En la tarjeta se amplía 1,14× y aguanta, pero en la
  ficha se nota.
- Foto del Suzuki fuera del patio de autos. La actual muestra otros autos de fondo.
- **Foto del Kia Sorento tomada en la zona.** La que se usa está en un estacionamiento
  subterráneo; la única que había en Patagonia la descartó el PO por mostrar a dos personas.
- **Criterio sobre las patentes.** En la foto del Subaru está tapada y en la del Suzuki se
  lee. Conviene que el dueño decida una sola regla y la aplique a todas.
- Verificar el punto de salida de la navegación al Glaciar Grey.
- Logo. Hoy la marca es tipográfica más el motivo de las tres torres.

**Lo que propongo para después, y no implementé:**

- Segunda foto por auto (interior y maletero). La estructura ya aguanta: sería agregar un
  campo a `fleet.ts` y una galería en la ficha.
- Usar la panorámica de la costanera que quedó procesada y sin uso, como banda ancha de
  cierre en la portada o en contacto.
- Una página por ruta del parque (`/torres-del-paine/base-torres/`), que hoy son anclas.
  Tiene sentido cuando haya contenido real que contar de cada una, no antes.
- `scripts/procesar-fotos.mjs` podría leer solo la carpeta y encuadrar por detección del
  auto, en vez de llevar los recortes escritos a mano. Mientras sean cuatro fotos, escribir
  el recorte mirando la imagen da mejor resultado y es más auditable.

## Una observación sobre las decisiones cerradas

No cambié ninguna. Pero dejo anotado, como pide el encargo, que **el eslogan del dueño
quedó en el pie y no en la portada**: competía con el titular y repetía lo que ya dice la
bajada. Si el PO lo quiere arriba, vuelve en una línea.
