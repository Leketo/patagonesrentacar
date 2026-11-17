# Patagones Rent a Car: instrucciones para agentes

Sitio de patagonesrentacar.cl. Astro estático. Contenido en `src/data/`.

## Roles (desde el 17-11-2026)
- **PO**: decide alcance, revisa los cambios y es el único que escribe en `main`. Habla con los agentes a través del usuario.
- **Agente dev** (tú, si trabajas en este repo): haces los cambios que el PO te encarga, en la rama `dev`.
- **Agente del servidor**: publica `main` en el VPS, solo con encargo escrito.
- **Agente QA**: prueba el sitio publicado y el preview local, y reporta hallazgos numerados `QA-NNN` al PO.

Los documentos `docs/BRIEF-PROPUESTAS.md` y `docs/BRIEF-QA.md` son del esquema anterior (dos propuestas); quedan como historial.

## Lee primero
1. `docs/PLAN.md`: negocio, decisiones cerradas y plan a futuro.
2. El encargo del PO que te pegue el usuario.

## Reglas para el agente dev
- Trabaja solo en la rama `dev`. No hagas push a `main` ni toques las ramas históricas (`propuesta-a`, `propuesta-b`, `qa`).
- Un commit por punto del encargo, con push después de cada uno. Si el punto corrige un hallazgo de QA, el mensaje empieza con su número: `fix(QA-004): …`.
- No cambies las **Decisiones cerradas** de `docs/PLAN.md`. Si crees que una debería cambiar, dilo en tu informe y sigue sin cambiarla. `docs/PLAN.md` lo actualiza el PO.
- No publiques en el servidor ni toques el VPS.
- No inventes datos del negocio. Lo pendiente se muestra como "Consúltanos". Un dato nuevo entra solo si el PO lo confirma en el encargo.
- Nada de servicios, scripts, fuentes ni imágenes de terceros. Nada de cookies ni analítica.
- Fotos: solo las que el dueño entrega en `../img` (fuente intacta) o las que ya están en el repo. Sin personas; patentes tapadas.
- Antes de entregar: `npm run build` y `npm run check` sin errores, y prueba en el navegador a 390 y 1440 px lo que tocaste.
- Al terminar, informa al usuario: qué cambiaste, cómo lo verificaste, último commit, y lo que quedó pendiente o dudoso para el PO.
- Todo en español de Chile.

## Comandos
```bash
npm ci
npm run dev -- --port 4321 --host
npm run build
npm run check
npm run preview -- --port 4331 --host
```

Puertos: dev 4321 (desarrollo) y 4331 (preview, el que usa QA).
