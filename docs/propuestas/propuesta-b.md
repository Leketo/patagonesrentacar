# Propuesta B — Ruta al amanecer

## Progreso

### Paso 1 · Compilación inicial (completado)

- Se instalaron las dependencias declaradas y se generó `package-lock.json` para fijar versiones.
- La instalación heredada de una ejecución interrumpida estaba incompleta: faltaba `shiki/dist/index.mjs`. El primer `build` y `check` fallaron por ese archivo.
- Se reparó el lock con `npm install --package-lock-only --force --install-strategy=nested` y se reinstaló mediante `npm ci`. La eliminación manual de archivos fue rechazada por la revisión automática y no se ejecutó.
- Validación final: `npm run build` correcto (12 páginas), `npm run check` correcto (25 archivos, 0 errores, 0 advertencias y 0 hints). Desarrollo iniciado en `http://localhost:4322/`.

### Paso 2 · Diseño, fotos y consulta (implementado; QA en curso)

- Portada editorial con titular condensado, precio desde `fleet.ts`, beneficios desde `site.ts`, ubicación explícita en Chile y acceso directo a la consulta. La foto real del Subaru sitúa el viaje en Puerto Natales; las tres torres siguen presentes como firma SVG.
- Flota con tarjetas oscuras, precio dominante e IVA visible; imágenes uniformes 4:3 y sin deformación. Se corrige la altura intrínseca de las imágenes que producía tarjetas excesivamente altas. Las condiciones permanecen en el inicio, incluidos los datos pendientes.
- Consulta con selección de auto, retiro y fechas; rechaza fechas vacías, inválidas, pasadas e iguales/invertidas. Errores anunciados, foco en el campo afectado y `aria-invalid`. Conteo de días sin errores por cambios de horario. Enlace alternativo a WhatsApp sin JavaScript. No se guardan datos ni se calcula un total no confirmado.
- Navegación móvil compacta, foco visible, contraste de etiquetas sobre secciones claras y respeto de movimiento reducido. Se mantienen páginas, sitemap, metadatos y datos estructurados con la nueva foto.

Puertos exclusivos: desarrollo 4322 y preview 4332. No se publica en el VPS.

## Dependencias

Sin dependencias nuevas respecto de `package.json`; se agrega el lock de instalación. WebP preparado con Sharp, dependencia ya incluida por Astro.

## Pendientes del negocio

Depósito, cruce a Argentina, cancelación y correo siguen pendientes. Se necesitan fotos mejores del Duster e interiores/maleteros; se conserva su fotografía actual. No se modifican las decisiones cerradas del plan.


## Inventario de fotos

Fuente original `../img`, intacta. Se inspeccionaron visualmente los autos y se copiaron los dos originales utilizados a `src/assets/fleet/` antes de procesarlos. El sitio utiliza únicamente archivos del repositorio.

| Original del dueño | Uso y tratamiento |
|---|---|
| `WhatsApp Image 2026-11-13 at 14.11.22 (1).jpeg` | Subaru XV rojo, vista lateral en la costanera. Portada, tarjeta y ficha: `public/images/flota/subaru-xv.webp`, 1280×960, lienzo 4:3 sin cortar el auto. |
| `WhatsApp Image 2026-11-13 at 14.15.50.jpeg` | Kia Sorento plateado, frontal. Sustituye la captura anterior en tarjeta/ficha: `public/images/flota/kia-sorento.webp`, 800×600. Recorte del original 716×537 desde y=600 para quitar cielo/pavimento sobrantes. |
| `WhatsApp Image 2026-11-13 at 14.11.22.jpeg` | Subaru panorámico. No utilizado: se prioriza la lateral por resolución vertical y encuadre completo. |
| `WhatsApp Image 2026-11-13 at 14.12.48.jpeg` | Captura de pantalla. No utilizada por franjas negras y calidad inferior a la foto frontal nueva. |

Duster y Suzuki: fotografías existentes del repositorio convertidas a WebP 800×600, mismo lienzo 4:3 y ajuste sin cortar el auto. No se oculta la baja resolución del Duster. Todos los WebP usan calidad 84. Última revisión de `../img` durante este paso: cuatro archivos.

## Validación y capturas

Paso 2: `npm run build` correcto (12 páginas) y `npm run check` correcto (25 archivos; 0 errores, 0 advertencias y 0 hints). Capturas de inicio, flota, ficha y Torres del Paine a 390 y 1440 px se incorporarán en `docs/propuestas/capturas-b/` tras QA. La compilación no sustituye la prueba de interacción en navegador.
