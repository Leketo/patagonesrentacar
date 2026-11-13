# Encargo para el agente de QA: comparar propuesta A y propuesta B

Emite: PO. Fecha: 13-11-2026.
Evalúas, no corriges. No hagas commits en `main`, `propuesta-a` ni `propuesta-b`.

## Preparación
1. Lee `docs/PLAN.md` y `docs/BRIEF-PROPUESTAS.md`.
2. Levanta ambas propuestas en modo producción, cada una en su carpeta:

```bash
# carpeta A
git checkout propuesta-a && npm install && npm run build && npm run preview -- --port 4331 --host
# carpeta B
git checkout propuesta-b && npm install && npm run build && npm run preview -- --port 4332 --host
```

3. Si una no compila, anótalo como falla crítica y evalúa lo que se pueda.
4. Evalúa las dos con el mismo método y en el mismo orden. Prueba a **390 px** (móvil) y a **1440 px**.

## Puerta de entrada (pasa o no pasa)
Una propuesta que falle algo de esta lista queda descalificada, sin importar su puntaje:
- Rompe alguna **Decisión cerrada** de `docs/PLAN.md` (alcance, tecnología, identidad visual, contenido).
- Carga recursos de terceros (fuentes, scripts, imágenes, iframes) o pone cookies. Revisa la pestaña de red.
- Inventa datos: reseñas, estrellas, cifras, distancias, años, premios.
- Muestra precios distintos a los de `src/data/fleet.ts`.
- `npm run build` falla.

## Criterios (puntaje de 1 a 5)

| # | Criterio | Peso | Cómo medirlo |
|---|---|---|---|
| 1 | Claridad en 5 segundos | 20 % | En móvil, sin hacer scroll: ¿se entiende qué es, dónde, desde cuánto y cómo consultar? |
| 2 | Flujo de consulta | 20 % | Recorre inicio → ficha → WhatsApp. Cuenta toques. Revisa validaciones y el texto final del mensaje (decodifica la URL de `wa.me`). |
| 3 | Calidad visual y temática | 15 % | ¿Se siente Torres del Paine o plantilla? Consistencia, tipografía, detalle, sin recursos genéricos de IA (degradados por todos lados, emojis, tarjetas con borde de color a la izquierda). |
| 4 | Móvil | 15 % | 390 px y 360 px: sin scroll horizontal, objetivos táctiles de 44 px o más, textos legibles, botón de WhatsApp siempre a mano. |
| 5 | Accesibilidad | 10 % | Contraste AA, navegación completa con teclado, foco visible, etiquetas en formularios, un `h1` por página, textos alternativos. Usa axe o Lighthouse si están disponibles. |
| 6 | Rendimiento | 10 % | Lighthouse móvil (rendimiento, LCP, CLS) en inicio y ficha. Peso total de la portada. |
| 7 | SEO técnico | 5 % | Títulos y descripciones únicos, canónicas, datos estructurados válidos, sitemap, contenido visible sin JavaScript. |
| 8 | Código y mantenimiento | 5 % | Datos solo en `src/data/`, `npm run check` limpio, sin dependencias innecesarias, CSS ordenado. |

Puntaje final = suma de (puntaje × peso). Anota la evidencia de cada nota: una frase y, si aplica, una captura.

## Pruebas obligatorias
- Todas las páginas responden 200; una ruta inexistente muestra el 404 propio.
- Con JavaScript desactivado, el contenido y los precios se ven, y existe una forma de llegar a WhatsApp.
- El formulario: fechas vacías, devolución antes que retiro, un solo día, auto preseleccionado desde una ficha.
- Todos los enlaces internos funcionan; los `wa.me` usan `56999898671`.
- Los cuatro autos con su precio correcto en flota y fichas.
- Lo pendiente (depósito, cruce a Argentina, cancelación) aparece como "Consúltanos" y no con datos inventados.

## Entrega
Un informe en `docs/qa/QA-propuestas-2026-11-13.md` (en una rama `qa` o entregado al usuario), con:
1. Resultado de la puerta de entrada para A y B.
2. Tabla de puntajes por criterio y total, con evidencia.
3. Las 5 fallas más importantes de cada propuesta, ordenadas por gravedad.
4. Lo mejor de cada una que valdría la pena llevar a la otra.
5. Una recomendación, aclarando que la decisión final es del PO y del usuario.

Capturas en `docs/qa/capturas/`.
