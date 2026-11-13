# Encargo para los agentes de desarrollo: propuesta A y propuesta B

Emite: PO. Fecha: 13-11-2026.
Trabajan **dos agentes en paralelo**, cada uno en su copia del repositorio. Al final, un agente de QA compara ambas propuestas y el PO elige.

## Antes de empezar
1. Lee `docs/PLAN.md` completo. Las **Decisiones cerradas** son límites, no sugerencias.
2. Lee `README.md` y recorre el código actual de `main`: es la base.
3. Si tienes la skill de diseño frontend (`frontend-design` u otra de diseño visual), úsala para todo lo visual.

## Tu rama y tu puerto

| | Rama | Puerto de desarrollo | Puerto de preview |
|---|---|---|---|
| Agente A | `propuesta-a` | 4321 | 4331 |
| Agente B | `propuesta-b` | 4322 | 4332 |

```bash
git checkout propuesta-a        # o propuesta-b
npm install
npm run dev -- --port 4321 --host     # B: 4322
npm run build && npm run preview -- --port 4331 --host   # B: 4332
```

- Trabaja **solo** en tu rama. Nunca hagas push a `main` ni a la rama del otro agente.
- No mires ni copies la rama del otro agente: queremos dos propuestas independientes.
- No publiques en el servidor. No toques el VPS.

## Paso 1: que compile
La versión de `main` nunca se compiló (se escribió sin poder instalar paquetes). Lo primero: `npm install`, `npm run build` y `npm run check`. Corrige lo que falle y haz un commit aparte: `fix: compilación inicial`.

## Paso 2: el objetivo
Llevar el sitio al **mejor nivel posible** dentro de las decisiones cerradas. Que un turista, desde el celular, entienda en 5 segundos **qué auto, cuánto cuesta, qué incluye y cómo consultar**, y que el sitio se sienta como Torres del Paine y no como una plantilla.

Dónde puedes mejorar (libertad total dentro de los límites):
- **Composición y jerarquía**: hero, orden de secciones, ritmo, espacios, tamaños.
- **Calidad visual**: ilustración SVG del paisaje y las torres, texturas, profundidad, detalle tipográfico, estados hover/foco, transiciones con `prefers-reduced-motion`.
- **Tarjetas de autos y fichas**: cómo se comparan, cómo se ve el precio, para qué ruta sirve cada uno.
- **Flujo de consulta**: el formulario que arma el mensaje de WhatsApp (menos fricción, mejores validaciones, buen mensaje final).
- **Móvil primero**: diseña y prueba a 390 px de ancho antes que en escritorio.
- **Accesibilidad**: contraste AA, teclado, foco visible, etiquetas, landmarks, textos alternativos.
- **Rendimiento**: imágenes optimizadas (puedes usar `astro:assets`), CSS y JS mínimos, buen LCP.
- **SEO técnico**: títulos, descripciones, datos estructurados, enlaces internos, sitemap.
- **Textos**: puedes reescribirlos para que sean más claros y persuasivos, **sin inventar hechos**.

## Límites (si los rompes, la propuesta queda descalificada)
- Todo lo de **Decisiones cerradas** en `docs/PLAN.md`: alcance, tecnología, identidad visual, contenido.
- Nada de pagos, reservas en línea, login, backend, formularios que guarden datos, idioma inglés ni otras funciones de Fase 2 o 3.
- Nada de scripts, fuentes, imágenes ni servicios de terceros. Nada de cookies ni analítica.
- No inventar datos (reseñas, estrellas, distancias, cifras, años, premios). Lo pendiente se muestra como "Consúltanos".
- Precios, autos y condiciones salen de `src/data/`. No escribir precios a mano en las páginas.
- Nuevas dependencias: solo si son imprescindibles y justificadas en tu informe. Sin frameworks de UI ni Tailwind.
- No usar fotos de stock como autos de la flota. Puedes mejorar el tratamiento de las fotos actuales (recorte, marco, fondo), no reemplazarlas por otras.

## Entrega
1. Commits pequeños y descriptivos en tu rama, con push a `origin/propuesta-a` (o `-b`).
2. `npm run build` y `npm run check` sin errores al final.
3. Un informe en `docs/propuestas/propuesta-a.md` (o `-b.md`) con:
   - Qué cambiaste y por qué (máximo una página).
   - Capturas a 390 px y a 1440 px del inicio, la flota, una ficha y Torres del Paine, en `docs/propuestas/capturas-a/` (o `-b/`).
   - Dependencias agregadas, si hay, y por qué.
   - Lo que quedó pendiente o lo que propones para después (sin implementarlo).
4. Avisa al usuario que terminaste, con el último commit de tu rama.
