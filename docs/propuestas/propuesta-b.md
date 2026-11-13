# Propuesta B — Ruta al amanecer

## Progreso

### Paso 1 · Compilación inicial (completado)

- Se instalaron las dependencias declaradas y se generó `package-lock.json` para fijar versiones.
- La instalación heredada de una ejecución interrumpida estaba incompleta: faltaba `shiki/dist/index.mjs`. El primer `build` y `check` fallaron por ese archivo.
- Se reparó el lock con `npm install --package-lock-only --force --install-strategy=nested` y se reinstaló mediante `npm ci`. La eliminación manual de archivos fue rechazada por la revisión automática y no se ejecutó.
- Validación final: `npm run build` correcto (12 páginas), `npm run check` correcto (25 archivos, 0 errores, 0 advertencias y 0 hints). Desarrollo iniciado en `http://localhost:4322/`.

### Siguientes pasos

Propuesta visual, revisión de fotos reales de `../img`, flujo de consulta y comprobación responsive. Puertos exclusivos: desarrollo 4322 y preview 4332. No se publica en el VPS.

## Dependencias

Sin dependencias nuevas respecto de `package.json`; se agrega el lock de instalación.

## Pendientes del negocio

Depósito, cruce a Argentina, cancelación y correo mantienen “Consúltanos”. No se modifican las decisiones cerradas del plan.

