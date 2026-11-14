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
- ~~**Criterio sobre las patentes.**~~ Resuelto en las correcciones tras QA: la regla es
  que si la patente se lee, se tapa. Ver más abajo.
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
  auto, en vez de llevar los recortes escritos a mano. Mientras sean un puñado de fotos,
  escribir el recorte mirando la imagen da mejor resultado y es más auditable.

## Una observación sobre las decisiones cerradas

No cambié ninguna. Pero dejo anotado, como pide el encargo, que **el eslogan del dueño
quedó en el pie y no en la portada**: competía con el titular y repetía lo que ya dice la
bajada. Si el PO lo quiere arriba, vuelve en una línea.

---

# Correcciones tras QA

Segunda vuelta, 13-11-2026. Encargo del PO sobre el informe
`docs/qa/QA-propuesta-a-2026-11-13.md` (rama `qa`, commit `d70e02a`).

**Cómo se verificó todo lo de abajo.** `npm run build` y `npm run check` sin errores, y las
mediciones sobre la **salida compilada servida por `npm run preview`** (puerto 4331), no
sobre el servidor de desarrollo. El navegador es Chrome sin interfaz manejado por el
protocolo DevTools, con el viewport fijado por emulación a 390, 360 y 1440 px. Las fechas se
teclean con eventos `input` y `change` reales, no asignando `value` a mano, que es la vía que
tiene un visitante escribiendo.

Un commit por punto. Al final están los dos cambios que **no** venían en la lista del QA: el
Chevrolet Colorado y lo que arrastró.

## a. Fechas (QA 3.1)

`src/components/Consulta.astro`. El formulario aceptaba un retiro anterior a hoy y fechas más
allá del tope de un año, y las mandaba a WhatsApp: `min` y `max` estaban puestos, pero el
`<form>` lleva `novalidate` y el manejador de envío solo miraba que los campos no estuvieran
vacíos y que la diferencia fuera positiva.

- **Una sola función decide** si las fechas sirven (`revisar()`), y la usan por igual el
  repaso en vivo y el envío, así que no pueden opinar distinto.
- **"Hoy" se recalcula** en cada repaso y en cada envío, no una sola vez al cargar.
- **`validity` de los dos campos** se consulta además de la comprobación propia, con `min` y
  `max` ya puestos al día: si el navegador discrepa, no se envía.
- **Contra NaN**: `dia()` valida el formato y comprueba que la fecha exista de verdad (viaje
  de ida y vuelta por `Date.UTC`, que caza el 30 de febrero) **antes** de contar días. Ya no
  puede salir "Son NaN días". El conteo pasa a UTC, que no depende del cambio de hora de
  Chile.

**Verificado:** 12 casos de punta a punta a 390 px, los 12 correctos.

| Caso | Resultado |
|---|---|
| Fechas vacías | No envía. *"Falta la fecha en que retiras el auto."* |
| Falta la devolución | No envía. *"Falta la fecha en que devuelves el auto."* |
| **Fecha pasada tecleada** (14/10 → 19/10, un mes atrás) | **No envía.** *"La fecha de retiro no puede estar en el pasado."* Captura `5` |
| Retiro ayer | No envía. Mismo mensaje |
| Mismo día (0 días) | No envía. *"La fecha de devolución tiene que ser posterior a la de retiro."* |
| Devolución antes que retiro | No envía. Mismo mensaje |
| **366 días adelante** | **No envía.** *"Tomamos consultas hasta un año adelante…"* |
| **01/01/2030** | **No envía.** Mismo mensaje. Captura `6` |
| Fecha imposible (30/02/2027) | No envía. El `input type="date"` ni siquiera la acepta y queda vacío; la guardia contra NaN está detrás por si acaso |
| Hoy, un día | **Envía.** *"Son 1 día."*, singular bien resuelto |
| Justo en el tope (365 días) | **Envía.** El tope es inclusivo |
| Cinco días | **Envía.** *"Son 5 días."* con el aviso de tarifa desde dos días |

**La pestaña abierta de un día para otro**, que es el caso que el QA señaló como alcanzable
de verdad: se carga la página, se elige "hoy" como retiro, se adelanta el reloj del navegador
24 horas y se envía. `min` pasa de `2026-11-13` a `2026-11-14` en el propio envío y la
consulta queda rechazada con *"La fecha de retiro no puede estar en el pasado."*. Antes se
enviaba.

## b. Errores accesibles (QA 3.5)

`src/components/Consulta.astro`.

- Los dos campos de fecha declaran el mensaje con **`aria-describedby`**: quien vuelve al
  campo con lector de pantalla ya no oye solo "no válido", oye por qué.
- El mensaje pasa a **`role="alert"`** cuando es un error de envío y vuelve a `role="status"`
  para el conteo de días. El rol se cambia con la región vacía, para que el lector lo tome
  antes de encontrar el texto nuevo.
- El párrafo **subió por encima del botón**. Debajo quedaba fuera de pantalla en el teléfono
  justo cuando aparecía.

**Verificado:** en los 12 casos de arriba se leyó `role`, `aria-invalid`, el foco y la
posición del aviso. En los 9 casos de error: `role="alert"`, el campo culpable con
`aria-invalid="true"`, el foco en ese campo y el mensaje en naranja. En los 3 correctos:
`role="status"` y sin marca de error. `aria-describedby` apunta al `id` del aviso en los dos
campos, y el aviso está antes del botón en el orden del documento (captura `5`).

## c. Sin JavaScript (QA 3.4)

`src/components/Consulta.astro` y `src/styles/global.css`. Antes, sin JavaScript, pulsar
"Consultar por WhatsApp" hacía un GET a la misma página: se recargaba, se perdía lo escrito y
no pasaba nada. El elemento más prominente del bloque era el que engañaba.

Ahora el bloque se da vuelta entero: desaparecen los campos, el aviso y el botón, y queda el
**mismo botón grande apuntando directo a `wa.me`**, con la explicación de por qué. Lo hace un
`<style>` dentro de `<noscript>`, que el navegador solo aplica si los scripts están apagados,
así que en el caso normal no hay parpadeo ni salto de diseño. Va con `set:html` para que el
compilador de Astro no lo recoja como hoja del componente y lo deje siempre activo.

**Verificado:** con la ejecución de scripts desactivada por CDP, en `/`, `/contacto/` y la
ficha del Colorado, a 390 y a 1440 px: los campos quedan en `display: none`, el reemplazo
visible, y el botón a `wa.me` mide 56 px de alto. El contenido y los precios se siguen viendo
(6 precios en el inicio, 122 líneas de texto) y hay entre 4 y 6 enlaces `wa.me` por página.
Captura `8`.

## d. Blancos de toque (QA 3.6)

`src/styles/global.css`. Diez destinos medían entre 24 y 40 px de alto.

| Qué | Antes | Ahora |
|---|---:|---:|
| Navegación de la cabecera, en el teléfono | 40 px | 44 px |
| Enlace de la marca | 36 px | 44 px |
| Migas | 24 px | 44 px |
| Enlaces legales del pie | 40 px | 44 px |
| Teléfono y WhatsApp del pie | 27 px | 44 px |

Sin romper el diseño: en las migas y en los datos de contacto del pie el aire que agrega el
blanco de toque **se descuenta con un margen negativo**, así que la línea se sigue viendo a
la misma altura y el titular no se mueve. La cabecera crece 4 px y la marca 8 px, que es todo
lo que cambia visualmente.

**Verificado:** las 13 páginas a 390 y a 360 px, midiendo el rectángulo real de cada enlace
de cabecera, navegación, migas, marca, pie y del enlace "Saltar al contenido": **ningún
destino bajo 44 px**, y `scrollWidth − clientWidth = 0` en las 26 combinaciones.

## e. Títulos y descripciones (QA 3.7)

Tres títulos medían 65–69 caracteres y una descripción 161.

| Página | Antes | Ahora |
|---|---:|---:|
| `/condiciones/` | 69 | 57 |
| `/torres-del-paine/` | 68 | 56 |
| `/flota/suzuki-grand-nomade-2017/` | 65 | 59 |
| descripción de `/torres-del-paine/` | 161 | 140 |

- *Condiciones, requisitos y preguntas frecuentes* → *Condiciones y preguntas frecuentes*.
- *Torres del Paine desde Puerto Natales en auto* → *Rutas de Torres del Paine en auto*, que
  además dice mejor qué es la página.
- Fichas de auto: `{auto} en Puerto Natales` → `Arriendo de {auto}`. Puerto Natales se sigue
  diciendo en la descripción, en las migas y en los datos estructurados. Queda anotado en el
  código que al nombre del auto le sobran 37 caracteres antes de pasarse de 60.

**Verificado** sobre la salida compilada: **13 de 13 títulos ≤ 60** y **13 de 13
descripciones ≤ 155**, y los 13 de cada uno siguen siendo únicos.

## f. Canónica del 404 (QA 3.8)

`src/layouts/Base.astro` y `src/pages/404.astro`. `dist/404.html` declaraba
`<link rel="canonical" href="https://patagonesrentacar.cl/404/">`, pero en el VPS el archivo
se sirve como `/404.html` para cualquier ruta que no existe: `/404/` devolvería 404. `Base`
recibe una prop `canonica`, que el 404 pasa en `false`.

**Verificado:** `dist/404.html` ya no trae `<link rel="canonical">`; las otras 12 páginas sí
traen la suya.

**Queda dicho, porque no estaba en la lista y no lo toqué:** el 404 todavía declara `og:url`
apuntando a `/404/`. Lleva `noindex` y nadie comparte un 404, así que el daño sigue siendo
nulo, pero es el mismo defecto. Se arregla en una línea si el PO quiere.

## g. Botón flotante (QA 3.9)

`src/styles/global.css` y `src/components/Pie.astro`. A 390 px tapaba 53 × 20 px del pie de
foto del hero y a 360 px se montaba 14 × 37 px sobre "VER LOS AUTOS Y PRECIOS".

- El botón baja de **56 a 48 px** y se pega a la esquina (10 px en vez de 16): la huella pasa
  de 72 × 72 a **58 × 58** contados desde el borde, y el blanco de toque sigue sobre el
  listón de 44.
- El **pie de foto del hero reserva esa esquina** en el teléfono, así que el texto corta antes
  en vez de meterse debajo.
- Los **botones grandes ajustan su relleno lateral** en el teléfono (32 → 16 px): terminan
  antes de la columna del botón flotante. El alto no cambia.

**Verificado** cruzando el rectángulo del botón con el de **cada renglón de texto**
(`Range.getClientRects`, no la caja del párrafo, que llega al borde aunque la última línea sea
corta), cada imagen y cada control, en las 13 páginas a 390 y a 360 px, en los dos estados que
el visitante ve quieto —primer pliegue y final de página—:

- **El inicio queda limpio** a 390 y a 360, en el pliegue y al final. Los dos casos que levantó
  el QA están cerrados. Captura `7`.
- **Las 13 páginas quedan limpias al final de página**, en los dos anchos.
- Quedan **11 roces en el primer pliegue**, todos cola de un renglón: `/torres-del-paine/`
  (29 × 19 px), `/terminos/`, `/privacidad/`, `/contacto/` (6 × 18 px) y, solo a 360 px, el
  borde de un botón "Ver ficha y consultar" en `/flota/` (15 × 12 px).

**Y esto hay que decirlo claro:** un botón **fijo** pasa por encima del contenido mientras se
hace scroll, y eso no se arregla moviéndolo ni achicándolo. Lo medí: antes de tocar nada había
139 cruces recorriendo las páginas de pantalla en pantalla. Para llegar a cero no alcanza con
ajustes: habría que **sacar el botón flotante en el teléfono** y devolver el botón de WhatsApp
a la cabecera, o reservarle una franja de 60 px a la derecha en todas las páginas, que sí
rompe el diseño. Las dos son decisiones del PO, no mías. Lo que sí está hecho es que en los
estados quietos —el primer pliegue y el final— no tape nada en el inicio, y casi nada en el
resto.

## h. `alt` del Sorento y "24/7" (QA 3.12)

`src/data/fleet.ts` y cinco páginas. El `alt` decía *"de perfil, con sus siete asientos"*,
pero los siete asientos no se ven en la foto. Ahora dice lo que se ve: *"Kia Sorento 2011
plata, de perfil, en un estacionamiento techado"*. Los siete asientos siguen en las
especificaciones, en el distintivo y en los datos estructurados, que es donde corresponde.

*"Asistencia en ruta 24/7"* queda igual en los **seis** lugares donde aparece: el pie,
`site.ts`, las preguntas frecuentes, contacto, el inicio y la guía de rutas. Antes solo
`site.ts` lo decía así; los otros cinco decían "las 24 horas".

**Verificado:** barrido de `src/` buscando "24 horas" y "24/7": cero apariciones de la
primera.

## i. Preguntas frecuentes (QA 3.3)

`src/pages/condiciones.astro`.

- **Conductores adicionales:** *"Sí, se pueden agregar. Consúltanos los requisitos."* Los
  requisitos no los confirmó el dueño, así que se aplica el mismo patrón honesto que el sitio
  ya usa con el depósito, el cruce a Argentina y la cancelación.
- **El contrato:** *"No. Este sitio es un catálogo: la consulta y la reserva se hacen por
  WhatsApp. Todas las condiciones del arriendo se confirman por WhatsApp antes de que retires
  el auto."*

**Y además**, porque si no el sitio se contradice a sí mismo: la misma afirmación no
confirmada estaba en `/terminos/`, en el texto de entrada y en un apartado titulado "El
contrato manda". Las dos se corrigieron: ahora el apartado se llama "Lo que se acuerda por
WhatsApp manda" y dice que las condiciones completas se confirman por WhatsApp antes de cada
arriendo.

**Verificado:** barrido de `src/` buscando "contrato": solo queda en `/terminos/` y ya no
afirma que se firme al retirar.

## j. Patente del Suzuki

`scripts/procesar-fotos.mjs`. El criterio estaba desparejo: en el Subaru no hay patente
delantera, en el Duster y en la panorámica de la costanera vienen tapadas desde el original,
en el Sorento queda fuera de cuadro, y la del Suzuki era la única legible.

El script recibe un paso **`tapar`**: pixela los rectángulos indicados bajando la región a
unos pocos píxeles y subiéndola sin interpolar, así que no se puede reconstruir y se ve tapada
a propósito. Las dos pasadas de `resize` van separadas porque **sharp aplica una sola por
canalización** y encadenarlas deja sin efecto a la primera.

**El original no se toca.** `../img` es solo lectura y `src/fotos-originales/` tampoco cambia:
lo único que se modificó es la copia publicada,
`src/assets/flota/suzuki-grand-nomade.jpg`.

**Verificado:** la patente no se lee ni ampliando la región 8×. Captura `11`. `git status`
después de correr el script: solo el script y esa copia.

---

# Fuera de la lista del QA: el Chevrolet Colorado

A mitad del trabajo el PO mandó, por el usuario, un auto nuevo y dos fotos en `../img`.

**Lo que se preguntó y se respondió**, porque no se puede deducir de una foto y no se inventa:
las dos fotos son del mismo vehículo (no eran dos autos); "Tony Cabral" es el **dueño del
auto**, un tercero, así que no se publica; **$128.000 por día con IVA incluido**; transmisión
**mecánica**; tracción **4x4**.

## El auto

`src/data/fleet.ts`: Chevrolet Colorado 2022, camioneta 4x4 doble cabina, mecánica, $128.000
por día con IVA. Es el primer auto de la flota que no es SUV y el primero que no es automático.

**Queda pendiente de confirmar con el dueño:** los **cinco asientos** salen de que es doble
cabina, no de un dato que él haya dado. Si son otros, se cambia una línea.

## La foto

Se publica la de tres cuartos (`20.48.31`), encuadrada a 3:2 como el resto de la flota. En
ella la patente delantera no entra en cuadro, no se ve ninguna persona, y la patente de la
camioneta roja del fondo no se lee ni ampliándola; el recorte la deja fuera igual.

**La segunda foto (`20.48.30`, trasera) no se copió al repositorio**: no hay dónde mostrarla
sin armar una galería, y su patente se lee entera. Si el PO quiere la galería, el script ya
sabe tapar patentes y la foto sigue en `../img`.

## Lo que arrastró, y que había que corregir igual

Con cinco autos, el sitio **afirmaba cosas falsas**: *"Flota: cuatro SUV automáticas"*,
*"Cuatro SUV listas para la ruta"*, *"Todas automáticas"*, *"Los cuatro autos"*, *"Las mismas
condiciones para los cuatro"* y *"Los otros tres"*.

Los conteos pasan a salir de `fleet.length` con `enLetras()`, igual que los distintivos y las
rutas recomendadas: **si entra otro auto, los textos se corrigen solos** en vez de quedar
mintiendo. La lista de nombres de la descripción de `/flota/` también sale de los datos. Donde
el conteo no aportaba nada se sacó ("Las mismas condiciones para todos"), y donde el sitio
usaba "SUV automáticas" como categoría del negocio ahora dice "autos y camionetas".

**Los distintivos.** `badge()` pone "La camioneta" antes que "La 4x4", porque ahora hay dos 4x4
y si no dos tarjetas dirían lo mismo. El **Duster deja de ser "la más nueva"** —el Colorado es
de 2022— y **queda sin distintivo**, que es preferible a inventarle uno; su línea pasa a *"La
SUV más nueva de la flota"*, que sí es cierta.

**Una cosa que el PO puede querer mirar:** a 1440 px la reja de la flota entra en cuatro
columnas, así que el quinto auto queda solo en la segunda fila. Con seis quedaría parejo. No
lo forcé porque bajar el ancho mínimo de tarjeta para que entren cinco columnas las deja en
228 px y las fotos se ven peor. Captura `10`.

---

# Revisión completa, después de todo lo anterior

| Qué | Resultado |
|---|---|
| `npm run build` | **13 páginas**, sin errores |
| `npm run check` | **0 errores, 0 avisos, 0 sugerencias** |
| Accesibilidad (13 páginas × 390/360/1440 = **39 combinaciones**) | **0 hallazgos**: 0 fallos de contraste AA calculando el fondo efectivo subiendo por los ancestros, todas las imágenes con `alt`, todos los campos etiquetados, 1 `h1` por página, 0 saltos de nivel, 0 enlaces sin nombre accesible, 0 anclas rotas |
| Scroll horizontal | `scrollWidth − clientWidth = 0` en las 39 combinaciones |
| Blancos de toque ≥ 44 px | 13 páginas × 390/360: **sin excepciones** |
| Enlaces internos | 13 destinos distintos, **todos 200**. `/no-existe/` → **404** con la página propia |
| Datos estructurados | **24 bloques JSON-LD**, los 24 parsean |
| Precios | Los **cinco** de `fleet.ts` y ningún otro, en tarjetas, fichas, `<select>` y JSON-LD |
| JavaScript en archivo aparte | **0 archivos** |
| CSS | un solo archivo, 17,2 KB en disco |
| Dependencias | **ninguna nueva**; `package.json` sigue idéntico al de `main` |
| Versión de Astro | sin tocar |
| `src/data/routes.ts` | sin tocar |

## Capturas de esta vuelta

En `docs/propuestas/capturas-a/`:

| Archivo | Qué muestra |
|---|---|
| `5-form-fecha-pasada-rechazada-390.webp` | El caso 3.1 del QA, ahora rechazado: campo marcado y mensaje sobre el botón |
| `6-form-tope-un-anio-390.webp` | 01/01/2030 rechazada por el tope de un año |
| `7-pliegue-inicio-360-boton-flotante.webp` | Primer pliegue a 360 px: el botón flotante ya no se monta sobre el CTA |
| `8-sin-js-enlace-wasap-390.webp` | Sin JavaScript: no hay formulario, hay enlace a WhatsApp |
| `9-ficha-chevrolet-colorado-390.webp` | La ficha del Colorado |
| `10-flota-cinco-autos-1440.webp` | La flota con cinco autos |
| `11-patente-suzuki-pixelada.webp` | La patente del Suzuki, ampliada 3× |

## Lo que sigue pendiente, y de quién depende

**Del dueño** (sin cambios respecto de la vuelta anterior, salvo el criterio de patentes, que
quedó resuelto): depósito, cruce a Argentina, cancelación, correo, foto nueva del Duster, foto
del Suzuki fuera del patio de autos, foto del Sorento tomada en la zona, los asientos del
Colorado y el punto de salida de la navegación al Glaciar Grey.

**Del PO**, que el QA levantó y no son código:

- **Los detalles de rutas** (QA 3.2): duraciones, accesos y la navegación al Glaciar Grey se
  publican hoy, y `PLAN.md` §4 los marca como pendientes de verificar. **No los toqué**: el
  encargo dice explícitamente que los datos de rutas vienen del sitio del dueño y no se
  cambian. Queda anotado que siguen en línea.
- **El eslogan en el pie y no en la portada**, que el QA también prefirió dejar a criterio del
  dueño.
- **El botón flotante**, si se quiere llegar a cero roces: ver el punto g.
- **El lockfile** (QA 3.11) fija Astro 5.18.2 con un aviso crítico abierto, no explotable en
  un sitio estático. No lo subí: el encargo dice que la versión de Astro no se cambia.
