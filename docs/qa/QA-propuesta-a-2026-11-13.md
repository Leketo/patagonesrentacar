# QA de la propuesta A

Agente de QA. Rama `qa`. 13-11-2026.
Rama evaluada: `propuesta-a`, commit `d70e02a`.
Encargo: `docs/BRIEF-QA.md`. Marco: `docs/PLAN.md`.

**Alcance.** El PO decidió seguir con la propuesta A, así que este informe la evalúa a ella sola
y no la compara como candidata contra B. De B se mira **solo** el formulario de consulta
(`src/components/ConsultForm.astro`, commit `1aafd3e`), como referencia, para ver qué vale la
pena traer. B quedó incompleta y no se puntúa.

**Cómo se levantó.** Clon limpio del repositorio, `propuesta-a`, `npm install`, `npm run build`,
`npm run check` y `npm run preview -- --port 4341 --host` (el 4331 lo usa el agente A). Todas las
mediciones son sobre la **salida compilada servida por el preview**, no sobre el servidor de
desarrollo. Las pruebas de navegador se hicieron con Chrome 157 sin interfaz, manejado por el
protocolo DevTools, con el viewport fijado por emulación a 390, 360 y 1440 px y el idioma en es-CL.

---

## 1. Puerta de entrada

**Resultado: PASA.** Los cinco puntos de la lista se revisaron uno por uno.

| # | Condición que descalifica | Resultado | Evidencia |
|---|---|---|---|
| 1 | Rompe una **Decisión cerrada** de `PLAN.md` | **No la rompe** | Ver desglose abajo |
| 2 | Carga recursos de terceros o pone cookies | **No carga ninguno** | 10 peticiones en el inicio, todas a `localhost:4341`. `Network.getAllCookies`: **0 cookies** en las 5 páginas medidas |
| 3 | Inventa datos | **No inventa** | Barrido de las 12 páginas compiladas buscando reseñas, estrellas, cifras, distancias, años y premios: sin coincidencias fuera de lo que autoriza `PLAN.md` |
| 4 | Precios distintos a `src/data/fleet.ts` | **Coinciden** | `$62.000 ×29 · $68.000 ×21 · $70.000 ×21 · $78.000 ×21` en el HTML compilado. **Ningún otro valor de precio aparece** |
| 5 | `npm run build` falla | **Compila** | 12 páginas en 4,80 s, sin errores |

### Decisiones cerradas, punto por punto

**Alcance.** Sitio catálogo. No hay pagos, reservas en línea, login, base de datos ni backend. El
formulario no tiene `action` ni `method` y no envía nada a ningún servidor: arma una URL `wa.me` y
navega. Están las 10 páginas pedidas más `sitemap.xml`. Todo en es-CL (`<html lang="es-CL">`), sin
rastro de inglés.

**Tecnología.** Astro 5.18.2 estático, `format: 'directory'` → `/flota/` (`astro.config.mjs:9`).
El contenido variable vive solo en `src/data/` (`site.ts`, `fleet.ts`, `routes.ts`): la búsqueda de
precios escritos a mano fuera de `fleet.ts` no devuelve nada. Fuentes **autoalojadas** con
`@fontsource` (tres `@font-face` sirviendo `/_astro/*.woff2`), sin Google Fonts ni CDN. Sin
frameworks de UI ni Tailwind en `package.json`.

**Identidad visual.** Dirección "Ruta" respetada: fondo noche `#0E1A22`, granito `#1B3140`,
amanecer `#F08A3C` reservado al botón principal, al precio por día y a la luz de la ilustración,
glaciar `#6FD0C8` como detalle. Titulares en Barlow Condensed 700 en mayúsculas, texto en Barlow.
El motivo de las tres torres está en la marca y, desarrollado, en la ilustración del macizo de
`/torres-del-paine/` (captura `13-torres-1440.webp`). No se pasó a fondo blanco ni se cambiaron
tipografías ni el color de acento.

**Contenido.** Los cuatro autos con sus precios, tipos y pasajeros exactos. Los tres pendientes
—depósito, cruce a Argentina y cancelación— aparecen como **"Consúltanos"** en la tabla de
condiciones, y las preguntas frecuentes lo dicen con todas sus letras: *"Es uno de los datos que
todavía no tenemos cerrados"* (captura `14-condiciones-390-consultanos.webp`). El correo no se
muestra porque `site.email` es `null`. El sitio deja claro que es el de Puerto Natales, Chile
—"Rent a car · Puerto Natales, Chile" en la cabecera de las 12 páginas—, que es lo que `PLAN.md`
pide para no confundirse con el de Bariloche.

### Dos salvedades que no hacen caer la puerta, pero quedan anotadas

**a) Los detalles de las rutas no son datos confirmados por el PO.** `PLAN.md` solo cierra los
*nombres* de las rutas y que el parque está "a poco más de dos horas". El sitio publica además
duraciones ("Circuito W — 5 días y 4 noches", "Base Torres — Día completo"), accesos ("por Laguna
Amarga", "o Pudeto") y la navegación al Glaciar Grey, que `PLAN.md` §4 marca justamente como
**pendiente de verificar**.

No lo cuento como "inventar datos" porque **no lo escribió A**: `git diff main propuesta-a --
src/data/routes.ts` sale **vacío**, es contenido heredado de `main`, y el propio archivo lleva el
aviso `// Pendiente: verificar distancias y el punto de salida de la navegación`. Pero se publica,
y conviene que el dueño lo confirme antes de que esté en línea. Ver 3.2.

**b) Dos frases de las preguntas frecuentes van un paso más allá de lo confirmado:** *"el arriendo
se formaliza con un contrato al retirar el vehículo"* y *"cada conductor adicional debe cumplir los
mismos requisitos"*. Son razonables y no son cifras, pero no constan en `PLAN.md`. Ver 3.3.

---

## 2. Puntajes por criterio

| # | Criterio | Peso | Nota | Evidencia medida |
|---|---|---:|:---:|---|
| 1 | Claridad en 5 segundos | 20 % | **5** | A 390 px y **sin hacer scroll** se ven las cuatro respuestas: qué (*"Tu auto listo para Torres del Paine"*, SUV automáticas), dónde (*"Rent a car · Puerto Natales, Chile"* + foto real junto al letrero de Puerto Natales), cuánto (**$62.000 por día, IVA incluido**) y cómo (botón *Consultar por WhatsApp* + botón flotante). Capturas `01-pliegue-inicio-390.webp` y `02-pliegue-inicio-360.webp` |
| 2 | Flujo de consulta | 20 % | **4** | Inicio → ficha → WhatsApp en **3 toques** (tarjeta → fecha de retiro → enviar: la devolución se autocompleta al día siguiente). El auto llega preelegido desde la ficha y el mensaje decodificado sale correcto, con precio incluido. **Pero** acepta fechas pasadas y fechas fuera del tope de un año, y sin JavaScript el botón principal no hace nada útil. Ver 3.1 y 3.4 |
| 3 | Calidad visual y temática | 15 % | **4** | Se siente Torres del Paine, no plantilla: paleta medida, ilustración propia del macizo con la luz solo en las caras que miran al este, y **sin** los tics de IA (ni degradados por todos lados, ni emojis, ni tarjetas con borde de color a la izquierda). Lo que baja la nota son **las fotos**, no el diseño: el Duster se amplía 2,36× en su ficha y se ve blando. Capturas `05`, `09`, `10`, `13` |
| 4 | Móvil | 15 % | **4** | **Cero scroll horizontal**: `scrollWidth − clientWidth = 0 px` en las 12 páginas a 390 y a 360. Textos legibles. Botones principales, campos del formulario y botón flotante **todos ≥ 44 px**. **Pero** 10 destinos de navegación miden entre 24 y 40 px de alto, bajo el listón de 44 px del encargo. Capturas `25` y `26` |
| 5 | Accesibilidad | 10 % | **5** | Auditoría propia sobre **36 combinaciones** (12 páginas × 390/360/1440): **0 fallos de contraste AA** calculando el color de fondo efectivo subiendo por los ancestros; **1 solo `h1` por página y ningún salto de nivel**; **todas las imágenes con `alt` con texto**; **todos los campos etiquetados**; foco visible (contorno glaciar de 3 px) en todos los interactivos; 37 paradas de tabulación en orden lógico; enlace "Saltar al contenido" que apunta a un `<main id="contenido">` que existe; ningún enlace sin nombre accesible ni con nombre repetido a destinos distintos. Captura `24`. *Caveat:* los mensajes de error del formulario no están asociados al campo (ver 3.5) |
| 6 | Rendimiento | 10 % | **5** | Inicio móvil **160,5 KB en 10 peticiones**; ficha 131,8 KB en 7; flota 143,8 KB en 8; inicio a 1440 px 250,8 KB en 11. **CLS = 0** en 18 combinaciones y en 5 repeticiones del inicio. **Cero archivos de JavaScript** (2,3 KB en línea). CSS en un solo archivo: 16,8 KB en disco, 4,2 KB por la red. Todas las `<img>` con `width`/`height`, la del hero `eager` + `fetchpriority="high"`, el resto `lazy`. `font-display: swap` en las tres familias |
| 7 | SEO técnico | 5 % | **4** | 12 títulos y 12 descripciones **todos únicos**, canónica en cada página, JSON-LD válido (`AutoRental` + `BreadcrumbList` + `Car` + `FAQPage`, los 20 bloques parsean y los precios calzan con `fleet.ts`), sitemap con las 11 URL públicas y sin el 404, `robots.txt` apuntando al sitemap, 404 con `noindex`, contenido completo sin JavaScript. **Pero** tres títulos de 65–69 caracteres que Google truncará, y la canónica del 404 apunta a una URL que no existirá en el servidor. Ver 3.7 y 3.8 |
| 8 | Código y mantenimiento | 5 % | **5** | `npm run check`: **0 errores, 0 avisos, 0 sugerencias** en 27 archivos. **Cero dependencias nuevas**: `git diff main propuesta-a -- package.json` sale vacío. Datos solo en `src/data/`. CSS ordenado con 29 variables. Los distintivos de tarjeta (`badge()`) y la ruta recomendada (`routesForCar()`) **se derivan de los datos**, así que no pueden contradecir a la guía; y `widthsUpTo()` impide que Astro amplíe las fotos chicas |

### Total ponderado

```
1. Claridad          5 × 20 % = 1,00
2. Flujo de consulta 4 × 20 % = 0,80
3. Calidad visual    4 × 15 % = 0,60
4. Móvil             4 × 15 % = 0,60
5. Accesibilidad     5 × 10 % = 0,50
6. Rendimiento       5 × 10 % = 0,50
7. SEO técnico       4 ×  5 % = 0,20
8. Código            5 ×  5 % = 0,25
                               ──────
                       TOTAL   4,45 / 5   (89 %)
```

### Pruebas obligatorias

| Prueba | Resultado |
|---|---|
| Todas las páginas responden 200 | **Sí.** 14 rutas comprobadas, todas 200 |
| Ruta inexistente → 404 propio | **Sí.** `/no-existe/` y `/flota/no-existe/` devuelven **404** con la página propia (*"Este camino no lleva a ningún lado"*). `dist/404.html` existe en la raíz, que es lo que Nginx necesita |
| Sin JavaScript: contenido y precios visibles | **Sí.** Con la ejecución de scripts desactivada por CDP, el inicio renderiza 140 líneas de texto y **los cuatro precios**; flota y fichas igual |
| Sin JavaScript: forma de llegar a WhatsApp | **Sí.** Entre 4 y 6 enlaces `<a href="https://wa.me/56999898671?text=...">` por página, más el bloque `<noscript>` del formulario. *Pero el botón principal del formulario sí queda inútil:* ver 3.4 |
| Formulario: fechas vacías | **Correcto.** *"Falta la fecha en que retiras el auto."*, `aria-invalid="true"` y foco en el campo. No abre WhatsApp |
| Formulario: devolución antes que retiro | **Correcto.** *"La fecha de devolución tiene que ser posterior a la de retiro."* + `aria-invalid` + foco. No abre WhatsApp. Captura `18` |
| Formulario: mismo día (0 días) | **Correcto.** Mismo mensaje, bloqueado |
| Formulario: un solo día | **Correcto.** *"1 día de arriendo"* (singular bien resuelto) y el mensaje dice *"Son 1 día."* Captura `19` |
| Formulario: auto preseleccionado desde una ficha | **Correcto.** En `/flota/kia-sorento-2011/` el `<select>` llega en *"Kia Sorento 2011 — $78.000"* y el mensaje sale `Auto: Kia Sorento 2011 ($78.000 por día)`. Captura `21` |
| Formulario: **fecha pasada** | **FALLA.** Ver 3.1 |
| Enlaces internos | **Todos funcionan.** Rastreo de las 12 páginas compiladas: 18 destinos internos distintos, **0 enlaces rotos y 0 anclas rotas** |
| `wa.me` con `56999898671` | **Sí.** Las 48 apariciones en el HTML usan `56999898671`; las 6 restantes son la plantilla del script, que lee `data-wasap="56999898671"`. Las URL capturadas al enviar el formulario confirman el número |
| Cuatro autos con su precio en flota y fichas | **Sí.** Correctos en tarjetas, fichas, `<select>` del formulario y JSON-LD |
| Pendientes como "Consúltanos" | **Sí.** Depósito, Cruce a Argentina y Cancelación, en la tabla y en tres respuestas de preguntas frecuentes |

### Lo que dice el informe de A, verificado por mi cuenta

El encargo pedía no dar por hecho lo que A declara haber comprobado. Lo revisé desde cero:

| Lo que afirma A | Verificación independiente |
|---|---|
| "`npm run build` y `npm run check`: 12 páginas, 0 errores, 0 avisos" | **Confirmado.** 12 páginas; `astro check` → 0/0/0 en 27 archivos |
| "Accesibilidad: 0 hallazgos en 27 combinaciones (9 páginas × 390/768/1440)" | **Confirmado y ampliado a 36 combinaciones** (12 páginas × 390/360/1440): 0 fallos de contraste, 0 imágenes sin alt, 0 campos sin etiqueta, 1 `h1` por página, 0 saltos de encabezado, 0 enlaces ambiguos, foco visible en todos. **Con una salvedad:** A midió los blancos de toque contra **24 px** (su informe dice "varios blancos de toque bajo los 24 px"), que es el mínimo de WCAG 2.2 AA. El encargo de QA pide **44 px**. Contra 24 px no hay ningún hallazgo; contra 44 px hay 10. Ver 3.6 |
| "Formulario de punta a punta: 13 de 13" | **No se sostiene entero.** Las validaciones que A enumera funcionan, pero **la fecha pasada no está cubierta** y pasa al mensaje de WhatsApp. Ver 3.1 |
| "CSS 16 KB en un archivo" | **Confirmado.** Un único `condiciones.D_A9vKKB.css` de 16.794 bytes (4,2 KB comprimido) |
| "0 KB de JS en archivo aparte" | **Confirmado y matizado.** No se emite ningún `.js`: cierto. Pero **sí hay JavaScript**, 2.313 bytes en línea en el HTML. La frase es exacta pero se presta a leerse como "no hay JS" |
| "66 KB de fuentes en la primera visita" | **Confirmado.** 66,8 KB en tres `woff2` (Barlow 400 y 600, Barlow Condensed 700) |
| "Salida compilada: enlaces internos, sitemap, JSON-LD, largos de título y descripción, sin problemas" | **Casi.** Enlaces, sitemap y JSON-LD: confirmados. **Los largos no:** tres títulos miden 65–69 caracteres. Ver 3.7 |
| "Ninguna dependencia agregada" | **Confirmado.** `package.json` idéntico al de `main`; lo único que A agrega es `package-lock.json` |
| "No hay ninguna copia de la foto descartada en el repositorio" | **Confirmado.** Inventario de **todos** los archivos de imagen del árbol de trabajo (incluidos los no versionados, excluyendo `node_modules` y `dist`): hay 10 fotos de origen, 6 publicadas y 4 originales. **No existe una quinta foto del Sorento** en ninguna parte, ni en `src/`, ni en `public/`, ni en la salida compilada |

### Revisión de las fotos: personas identificables

Revisé **las seis fotos publicadas y las cuatro originales**, ampliadas a 1.500–1.800 px y, donde
hacía falta, con el contraste forzado para sacar marcas de agua y detalles de fondo.

| Foto | Personas | Patente | Observación |
|---|---|---|---|
| `portada/puerto-natales-subaru.jpg` (hero) | **Ninguna** | Fuera de cuadro | Subaru junto al letrero de Puerto Natales, con el fiordo y la cordillera. Interior vacío |
| `portada/costanera-subaru.jpg` (procesada, sin usar) | **Ninguna** | Tapada en blanco | Costanera; al fondo, edificios y autos lejanos, sin personas |
| `flota/subaru-xv.jpg` | **Ninguna** | Sin patente delantera | Puerto Natales. Al fondo, casas y una camioneta estacionada; ninguna persona |
| `flota/renault-duster.jpg` | **Ninguna** | Tapada en blanco | Vegetación de Chile central, no de la zona |
| `flota/suzuki-grand-nomade.jpg` | **Ninguna** | **Legible** | Patio de autos, con otros autos al fondo |
| `flota/kia-sorento.jpg` | **Ninguna** | Fuera de cuadro | Estacionamiento subterráneo. **Sin marca de agua** (verificado con el contraste forzado) |
| `fotos-originales/*` (4, no se publican) | **Ninguna** | — | Nadie los importa; solo los lee `scripts/procesar-fotos.mjs` |

**Conclusión: ninguna foto del sitio muestra personas identificables.** La decisión del PO sobre la
foto del servicentro está cumplida y no quedó ninguna copia. Lo único que sigue abierto es el
**criterio sobre patentes**, que es desparejo: tapada en el Subaru y en el Duster, legible en el
Suzuki. Es la patente de un auto del propio negocio, así que no es dato de un tercero, pero
conviene una sola regla. A ya lo dejó anotado como pendiente del dueño.

---

## 3. Fallas ordenadas por gravedad

### Bloqueantes para publicar

**Ninguna.** No encontré nada que impida poner el sitio en línea: compila, no rompe decisiones
cerradas, no carga terceros, no pone cookies, no inventa cifras, los precios calzan, el 404 propio
funciona, no hay scroll horizontal, no hay fallos de contraste y el contenido se ve sin JavaScript.

### Importantes (conviene arreglarlas antes de publicar; son baratas)

#### 3.1 El formulario acepta fechas pasadas y las manda a WhatsApp

**Lo más serio que encontré.** Reproducible **tecleando a mano**, sin trucos de consola.

Hoy es 13-11-2026. Escribí `14/10/2026` como retiro y `19/10/2026` como devolución —un mes atrás—
y el formulario respondió *"5 días de arriendo. Desde dos días la tarifa se ajusta: te enviamos el
precio final por WhatsApp."*, sin ninguna marca de error, y al enviar abrió:

```
https://wa.me/56999898671?text=…
  Fechas: del 14-10-2026 al 19-10-2026
  Son 5 días.
```

Captura `20-FALLO-fecha-pasada-aceptada-390.webp`.

**Por qué pasa.** `src/components/Consulta.astro:110` pone `desde.min = hoy`, pero el `<form>` lleva
`novalidate` (línea 18), así que el navegador no bloquea nada al enviar, y el manejador de `submit`
(líneas 162–194) solo comprueba que los campos no estén vacíos y que `n > 0`. Nunca mira si la
fecha quedó antes de hoy. Lo confirma el propio navegador: en el momento del envío el campo reporta
`validity.rangeUnderflow: true` y `validity.valid: false`, y aun así el mensaje sale.

**El mismo agujero deja pasar el tope superior:** `desde.max = hoy + 365` tampoco se respeta. Puse
`01/01/2030` y el mensaje se envió igual.

**Es alcanzable de verdad**, no es un caso de laboratorio: los campos `type="date"` aceptan escritura
directa, y además `min` se calcula **una sola vez al cargar la página**. Quien deje la pestaña
abierta de un día para otro y pida "hoy" terminará enviando una fecha pasada.

**Costo de arreglarlo: una condición.** B ya la tiene escrita (ver sección 4).

#### 3.2 Se publican detalles de rutas que `PLAN.md` marca como pendientes de verificar

`/torres-del-paine/` y el inicio publican duraciones ("Circuito W — 5 días y 4 noches"), accesos
("por Laguna Amarga", "o Pudeto") y *"Navegación hacia el glaciar"* para el Glaciar Grey. `PLAN.md`
§4 pide explícitamente **"verificar el punto de salida de la navegación al Glaciar Grey"**, y §3 solo
cierra los nombres de las rutas.

No es culpa de A —`routes.ts` viene de `main` sin un solo cambio—, pero hoy está en una página
pública y es el tipo de dato que un turista usa para planificar. Conviene que el dueño lo confirme
o que se recorte a lo que consta.

#### 3.3 Dos frases de preguntas frecuentes afirman más de lo confirmado

- *"el arriendo se formaliza con un contrato al retirar el vehículo"*
- *"Cada conductor adicional debe cumplir los mismos requisitos: licencia vigente, documento de
  identidad y la edad mínima."*

Son razonables y no son cifras, pero no constan en `PLAN.md`. Una confirmación del dueño y quedan
cerradas; si no, el patrón honesto de "Consúltanos" que el resto del sitio aplica tan bien también
sirve acá.

#### 3.4 Sin JavaScript, el botón principal del formulario no hace nada útil

El `<form>` no tiene `action` ni `method`. Sin JavaScript, pulsar **"Consultar por WhatsApp"** hace
un GET a la misma página: se recarga, se pierde lo escrito y no pasa nada visible. El bloque
`<noscript>` que está justo debajo lo explica y ofrece un enlace que sí funciona, así que la vía a
WhatsApp **no se pierde** (por eso la prueba obligatoria pasa), pero el elemento más prominente del
bloque es el que engaña. Captura `23-sin-js-form-noscript-390.webp`.

#### 3.5 Los mensajes de error del formulario no están asociados al campo

Al fallar la validación, A marca `aria-invalid="true"` en el campo y le da el foco —las dos cosas
bien hechas—, pero el texto del error vive en un `<p role="status">` **sin `aria-describedby`** desde
los campos. Quien use lector de pantalla recibe el aviso una vez por la región viva, y si después
vuelve al campo, el campo le dice "no válido" sin decirle por qué.

Dos detalles menores del mismo bloque: la región es `role="status"` (cortés) y no `role="alert"`,
que es lo que corresponde a un error de envío; y el párrafo está **debajo del botón**, así que en
móvil el mensaje puede quedar fuera de pantalla justo cuando aparece.

#### 3.6 Diez destinos de navegación quedan bajo los 44 px que pide el encargo

Medido a 390 y a 360 px. Ninguno baja de 24 px —el mínimo de WCAG 2.2 AA está cumplido, y por eso
el informe de A dice "0 hallazgos"—, pero el listón del encargo es 44:

| Alto | Ancho | Qué es | Páginas |
|---:|---:|---|---:|
| 24 px | 33–36 px | Migas "Inicio" y "Flota" | 4 |
| 36 px | 218 px | Enlace de la marca en la cabecera | 12 |
| 40 px | **29 px** | "Flota" en la navegación | 12 |
| 40 px | 53–91 px | "Torres del Paine", "Condiciones", "Contacto" | 12 |
| 40 px | 158 px | "Condiciones y requisitos", "Términos de uso", "Privacidad" en el pie | 12 |

Las migas, con 33 × 24 px, son el caso más apretado. Capturas `25-toques-encabezado-390.webp` y
`26-toques-pie-390.webp`, con los blancos bajo 44 px recuadrados en rojo.

Lo importante es que **esto no toca la conversión**: los botones principales (48–56 px), los campos
del formulario (48 px) y el botón flotante de WhatsApp (56 × 56 px) están todos sobre el listón.

#### 3.7 Tres títulos se van a cortar en Google

`torres-del-paine` (68), `condiciones` (69) y `flota/suzuki-grand-nomade-2017` (65) caracteres.
Google corta alrededor de 60. El informe de A da los largos por revisados y sin problemas; estos
tres no lo están. La descripción de `torres-del-paine` también se pasa, con 161 caracteres.

### Menores

#### 3.8 La canónica del 404 apunta a una URL que no existirá

`dist/404.html` declara `<link rel="canonical" href="https://patagonesrentacar.cl/404/">`, pero en
el VPS el archivo se sirve como `/404.html` y `/404/` devolverá 404. La página lleva
`noindex, follow`, así que el daño práctico es nulo, pero la canónica está mal.

#### 3.9 El botón flotante de WhatsApp se monta sobre el contenido

- A **390 px** tapa 53 × 20 px del pie de foto del hero: *"El Subaru XV de la flota, en la costanera
  de Puerto Natale…"* queda cortado (captura `01`).
- A **360 px** se monta 14 × 37 px sobre el borde derecho del botón principal *"VER LOS AUTOS Y
  PRECIOS"* (captura `02`). El botón mide 301 px y sigue siendo perfectamente pulsable, pero se ven
  encimados.

#### 3.10 La foto del Duster se amplía 2,36× en su ficha

La foto procesada mide **252 × 168 px** y en la ficha a 1440 px se muestra a 595 × 397 px CSS: un
**2,36×** que se nota (captura `10-ficha-duster-1440-foto-ampliada.webp`). En móvil la ampliación es
1,39×. El informe de A menciona "1,14×", que es correcto **solo para la tarjeta en escritorio**
(286 px sobre 252); en los otros tres casos es bastante peor.

Es el punto visual más débil del sitio y **no se puede arreglar desde el código**: depende de que el
dueño mande una foto nueva. `PLAN.md` §4 ya lo tiene en la lista. A lo manejó bien dentro de lo que
podía: `widthsUpTo()` evita que Astro genere versiones ampliadas y malgaste bytes.

#### 3.11 El lockfile fija una versión de Astro con un aviso crítico abierto

`npm audit`: 1 crítica (Astro), 3 altas (sharp/libvips, zod) y 1 baja (esbuild). El lockfile que A
agregó fija **Astro 5.18.2**; la versión actual es 7.4.12.

**No es explotable en este sitio:** la vulnerabilidad crítica va por `define:vars` —que no se usa en
ninguna parte— y por *server islands*, que no existen en una salida estática. `sharp` corre solo en
la compilación sobre imágenes propias, y `esbuild` solo en el servidor de desarrollo. Lo anoto como
higiene de la cadena de compilación, no como riesgo del sitio publicado.

#### 3.12 Detalles sueltos

- El `alt` del Sorento dice *"de perfil, con sus siete asientos"*, pero los siete asientos no se ven
  en la foto; describe un dato, no la imagen.
- El único CSS se llama `condiciones.D_A9vKKB.css` aunque sirve a las 12 páginas. Cosmético.
- `trailingSlash: 'ignore'` deja que `/flota` y `/flota/` sirvan lo mismo; la canónica lo resuelve.
- El sitio alterna *"Asistencia en ruta 24/7"* y *"las 24 horas"*. Las dos son correctas; elegir una.

---

## 4. Qué traer del formulario de B

Comparé `src/components/Consulta.astro` (A, `d70e02a`) con `src/components/ConsultForm.astro`
(B, `1aafd3e`), línea por línea.

**Primero, dos correcciones al encargo**, para que el PO no gaste tiempo en algo que ya está:

- **`aria-invalid` no le falta a A: ya lo tiene.** La función `marcar()`
  (`Consulta.astro:120-126`) hace `campo.setAttribute('aria-invalid','true')` y mueve el foco,
  exactamente igual que B. Verificado en vivo en las cuatro pruebas de validación.
- **El enlace a WhatsApp que funciona sin JavaScript tampoco le falta.** A tiene el mismo
  `<noscript>` con enlace que B (`Consulta.astro:64-70`), **y además** entre 4 y 6 enlaces
  `<a href="https://wa.me/…">` normales por página —cabecera, hero, cierre, pie y botón flotante—
  que funcionan sin JavaScript. En esto A está mejor que B, no peor.

### Lo que sí vale la pena traer

**1. La validación de fecha pasada. Es lo único realmente importante.** B tiene, en una línea, justo
lo que a A le falta:

```js
else if (desde.value < localToday()) {
  field = desde;
  message = 'La fecha de retiro no puede estar en el pasado.';
}
```

Cierra el fallo 3.1 entero. Encaja en `repasar()` y en el manejador de `submit` de A sin tocar nada
más. **Conviene además cubrir el tope superior** —que a B también se le pasa— apoyándose en lo que
el navegador ya sabe: `if (!desde.validity.valid) { … }` cubre `min` y `max` de una vez.

**2. `aria-describedby` desde los campos al mensaje.** B pone `aria-describedby="c-note"` en los dos
campos de fecha, y el `<p>` lleva ese `id`. Eso cierra el hallazgo 3.5: el error deja de ser un
aviso suelto y pasa a leerse cada vez que el usuario vuelve al campo. Son dos atributos.

**3. La validación de fecha malformada.** B comprueba el formato con una expresión regular y, más
fino, verifica que la fecha **exista** haciendo el viaje de ida y vuelta por `Date.UTC`, con lo que
caza cosas como el 30 de febrero:

```js
const date = new Date(Date.UTC(y, m - 1, d));
return date.toISOString().slice(0, 10) === value ? date.getTime() / 86400000 : NaN;
```

A usa `Date.parse`, que ante una fecha imposible devuelve `NaN`; y como la comprobación de A es
`n <= 0`, un `NaN` **no** la activa y el mensaje saldría con *"Son NaN días"*. En la práctica es casi
inalcanzable, porque un `<input type="date">` solo entrega fechas válidas o cadena vacía. Es
robustez, no un fallo: traerlo si sale gratis.

**4. El cálculo de días en UTC.** B calcula con `Date.UTC` y lo comenta: *"UTC avoids daylight-saving
changes when counting calendar days."* A usa `T12:00:00` en hora local, que es un truco correcto y
sobrevive a los cambios de horario de Chile. No hay que cambiarlo; vale saber por qué está el `12`.

### Lo que **no** conviene traer de B

- El mensaje de WhatsApp de A es mejor: **incluye el precio por día** del auto elegido
  (`Kia Sorento 2011 ($78.000 por día)`), y B no. Deja el chat empezado con el dato que importa.
- A **autocompleta la devolución** al día siguiente del retiro, que es un toque menos. B no.
- A avisa de la tarifa desde dos días (*"Desde dos días la tarifa se ajusta"*), que es una decisión
  cerrada de `PLAN.md` y B omite.
- La flecha `↗` pegada al texto del botón de B es uno de los tics de plantilla que A sacó a
  propósito; el encargo de QA lo menciona como señal de plantilla.

**Resumen: de B solo hay que traer la condición de fecha pasada y el `aria-describedby`.** Todo lo
demás del formulario de A es igual o mejor.

---

## 5. Veredicto

**Se puede publicar, pero conviene no hacerlo hoy.** No hay ningún bloqueante técnico —no encontré
nada que rompa el sitio, las decisiones cerradas o la honestidad del contenido—, pero sí hay dos
cosas que cuestan muy poco y que es mejor cerrar antes de que la URL esté en línea: una es un arreglo
de una línea, la otra es una confirmación del dueño.

La propuesta A es un trabajo sólido: **4,45 / 5 (89 %)**. Lo que más destaca es que las decisiones
están **medidas y no supuestas** —la arquitectura de color sale de calcular contrastes, el orden de la
portada sale de lo que cabe en un teléfono, los distintivos y la ruta recomendada se derivan de los
datos para que no puedan contradecirse—, y que los pendientes del dueño se muestran como pendientes
en vez de rellenarse. Cero recursos de terceros, cero cookies, cero dependencias nuevas, cero archivos
de JavaScript, CLS 0 y 160 KB en el inicio móvil.

### Antes de publicar

1. **Validar la fecha pasada en el formulario** (3.1). Es una condición; está escrita en B. Hoy el
   sitio manda a WhatsApp consultas por fechas que ya pasaron. De paso, cubrir el tope de un año
   usando `validity.valid`, que resuelve las dos cosas juntas.
2. **Que el dueño confirme o se recorten los detalles de rutas** (3.2) y las dos frases de preguntas
   frecuentes (3.3). No es código: es una conversación corta. `PLAN.md` ya marca la navegación al
   Glaciar Grey como pendiente de verificar, y hoy está publicada.

### Justo después, en el mismo pase o en el siguiente

3. `aria-describedby` de los campos de fecha al mensaje de error (3.5). Dos atributos.
4. Subir a 44 px los blancos de toque de la navegación, el pie y las migas (3.6).
5. Acortar los tres títulos largos y la descripción de `torres-del-paine` (3.7), y corregir la
   canónica del 404 (3.8).
6. Convertir el botón del formulario en algo útil sin JavaScript (3.4), o al menos subir el
   `<noscript>` por encima del botón.

### Queda esperando al dueño, no al código

7. **La foto nueva del Duster** (3.10) es el punto visual más débil y no se arregla programando.
   Junto con ella: la foto del Suzuki fuera del patio de autos, una del Sorento tomada en la zona, y
   **una sola regla para las patentes** —hoy están tapadas en dos autos y legible en uno—.
8. Depósito, cruce a Argentina, cancelación y correo. El sitio ya está preparado para recibirlos:
   se cambia el `null` por el texto en `src/data/site.ts` y desaparece el "Consúltanos".

### Una observación que A dejó anotada y vale la pena resolver

A movió el eslogan del dueño —*"Explora Patagonia a tu ritmo y sin complicaciones."*— al pie, y lo
declaró en su informe como corresponde. Me parece la decisión correcta: en la portada competiría con
el titular. **Pero es el eslogan del dueño y la llamada es suya**, no mía ni de A. Conviene
preguntárselo antes de publicar, porque después cuesta más.

---

*La decisión final sobre qué se corrige antes de publicar y qué queda para después es del PO y del
usuario. Este informe mide y recomienda; no corrige. No se tocó `main`, `propuesta-a` ni
`propuesta-b`.*

---

## Anexo: capturas

En `docs/qa/capturas/`, PNG a escala 1:1 con el viewport fijado por emulación.

| Archivo | Qué muestra |
|---|---|
| `01-pliegue-inicio-390.webp` | Primer pliegue a 390 px: las cuatro respuestas sin scroll (criterio 1) |
| `02-pliegue-inicio-360.webp` | Primer pliegue a 360 px; se ve el botón flotante sobre el CTA (3.9) |
| `03` · `04` · `05` | Inicio completo a 390, 360 y 1440 px |
| `06` · `07` | Flota a 390 y 1440 px |
| `08` · `09` | Ficha del Suzuki a 390 y 1440 px |
| `10-ficha-duster-1440-foto-ampliada.webp` | La foto del Duster ampliada 2,36× (3.10) |
| `11-ficha-duster-390.webp` | La misma ficha en móvil |
| `12` · `13` | Torres del Paine a 390 y 1440 px, con la ilustración del macizo |
| `14-condiciones-390-consultanos.webp` | Los tres pendientes como "Consúltanos" |
| `15-contacto-390.webp` · `16-404-390.webp` | Contacto y el 404 propio |
| `17-form-fechas-vacias-390.webp` | Validación de fechas vacías |
| `18-form-devolucion-antes-390.webp` | Devolución antes que retiro: campo marcado y con foco |
| `19-form-un-dia-390.webp` | Un día de arriendo, singular bien resuelto |
| `20-FALLO-fecha-pasada-aceptada-390.webp` | **El fallo 3.1**: 14/10 → 19/10 aceptadas sin error |
| `21-form-auto-preelegido-ficha-390.webp` | Auto preseleccionado desde la ficha del Sorento |
| `22-sin-js-inicio-390.webp` | Inicio con JavaScript desactivado: contenido y precios completos |
| `23-sin-js-form-noscript-390.webp` | El bloque `<noscript>` del formulario (3.4) |
| `24-foco-visible-1440.webp` | Foco visible: contorno glaciar de 3 px |
| `25-toques-encabezado-390.webp` · `26-toques-pie-390.webp` | Blancos de toque bajo 44 px, recuadrados en rojo (3.6) |
