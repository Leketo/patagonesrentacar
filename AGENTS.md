# Patagones Rent a Car: instrucciones para agentes

> Este archivo es igual a CLAUDE.md, para agentes que leen AGENTS.md (Codex). Si cambias uno, cambia el otro.

Sitio de patagonesrentacar.cl. Astro estático. Contenido en `src/data/`.

## Roles
- **PO**: decide alcance y aprueba cambios a las decisiones cerradas. Habla con los agentes a través del usuario.
- **Agentes de desarrollo A y B**: cada uno hace una propuesta en su rama. Encargo: `docs/BRIEF-PROPUESTAS.md`.
- **Agente de QA**: compara ambas propuestas. Encargo: `docs/BRIEF-QA.md`.

## Lee primero
1. `docs/PLAN.md`: negocio, decisiones cerradas y plan a futuro.
2. Tu encargo (`docs/BRIEF-PROPUESTAS.md` o `docs/BRIEF-QA.md`).

## Reglas para todos
- No cambies las **Decisiones cerradas** de `docs/PLAN.md`. Si crees que una debería cambiar, escríbelo en tu informe y sigue sin cambiarla.
- No hagas push a `main`. Cada agente trabaja en su rama.
- No publiques en el servidor ni toques el VPS.
- No inventes datos del negocio. Lo pendiente se muestra como "Consúltanos".
- Nada de servicios, scripts, fuentes ni imágenes de terceros. Nada de cookies ni analítica.
- Todo en español de Chile.

## Comandos
```bash
npm install
npm run dev -- --port <puerto> --host
npm run build
npm run check
npm run preview -- --port <puerto> --host
```

Puertos: A 4321/4331, B 4322/4332 (desarrollo/preview).
