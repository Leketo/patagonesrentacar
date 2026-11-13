# Plan del proyecto: Patagones Rent a Car

Documento del PO. Actualizado: 13-11-2026.
Lo que está en **Decisiones cerradas** no se cambia sin aprobación del PO.

## 1. El negocio

- **Patagones Rent a Car**, arriendo de autos en **Puerto Natales**, Región de Magallanes, Chile.
- Clientes: turistas que van al **Parque Nacional Torres del Paine**, muchos llegando por el aeropuerto de Puerto Natales.
- Atención todos los días de 8:00 a 21:00. Asistencia en ruta 24/7.
- WhatsApp: +56 9 9989 8671 (`wa.me/56999898671`).
- Eslogan del dueño: "Explora Patagonia a tu ritmo y sin complicaciones."
- Atención: existe **otro** "Patagones Rent a Car" en Bariloche, Argentina (patagonesrentacar.com). El sitio debe dejar claro que este es el de **Puerto Natales, Chile**.

## 2. El problema que resolvemos

El turista quiere saber en segundos: **qué auto, cuánto cuesta, qué incluye y cómo reservo**. La competencia local falla justo ahí:

| Competidor | Falla que aprovechamos |
|---|---|
| Rent a Car Patagonia | Flota sin precios, selector de idiomas roto, datos inconsistentes |
| End of Road | La página no tiene contenido sin JavaScript (mal para Google) |
| Sixt, Mitta | Páginas genéricas; no hablan de Torres del Paine |
| Rent a Car Vásquez | Fotos de stock, promete reserva online que no existe |

**Cómo ganamos:**
1. Precio por día visible en cada auto.
2. Condiciones a la vista en el inicio.
3. Fotos reales de los autos.
4. Guía de rutas del parque con el auto recomendado.
5. Sitio estático, rápido e indexable.
6. Consulta con fechas que abre WhatsApp con el mensaje armado.

## 3. Decisiones cerradas (Fase 1)

### Alcance
- Sitio **catálogo**. **Sin** pagos, reservas en línea, login, base de datos, backend ni formularios que guarden datos.
- La conversión es **una sola acción**: consultar por WhatsApp (con mensaje prellenado).
- **Solo español** (es-CL). El inglés es Fase 2.
- Páginas: Inicio, Flota, Ficha por auto, Torres del Paine, Condiciones (+ preguntas frecuentes), Contacto, Términos, Privacidad, 404, sitemap.

### Tecnología
- **Astro** estático, salida en `dist/`, formato de URLs con carpeta (`/flota/`).
- Contenido variable **solo** en `src/data/` (`site.ts`, `fleet.ts`, `routes.ts`).
- Fuentes **autoalojadas** (@fontsource). Sin Google Fonts, sin CDNs.
- **Sin** cookies, analítica, píxeles ni scripts de terceros.
- Sin frameworks de UI (React, Vue, Svelte) ni Tailwind. Astro + CSS.
- Publicación: copiar `dist/` a `/var/www/patagonesrentacar.cl/public/` en el VPS (Nginx). El sitio trae su propio `404.html`.

### Identidad visual
- Dirección "Ruta": fondo oscuro, titulares grandes condensados en mayúsculas, temática **Torres del Paine**.
- Paleta: noche `#0E1A22`, granito `#1B3140`, amanecer en las torres `#F08A3C` (acento y botón principal), glaciar `#6FD0C8` (detalle), papel `#EAF0F0` para secciones claras.
- Tipografías: **Barlow Condensed** (titulares) y **Barlow** (texto).
- Motivo: silueta de las tres torres con la luz del amanecer.
- Se puede refinar, enriquecer y pulir. **No** se cambia por otra dirección (no pasar a fondo blanco genérico, no cambiar tipografías ni el color de acento).

### Contenido confirmado (no inventar más)

| Auto | Tipo | Pasajeros | Precio/día (IVA incl.) |
|---|---|---|---|
| Subaru XV 2016 | SUV | 5 | $62.000 |
| Renault Duster 2019 | SUV | 5 | $68.000 |
| Suzuki Grand Nomade 2017 | SUV 4x4 | 5 | $70.000 |
| Kia Sorento 2011 | SUV | 7 | $78.000 |

- Todas automáticas. La tarifa se ajusta desde dos días de arriendo.
- Edad mínima 21 años. Seguro incluido. Kilometraje libre. Estanque lleno. Entrega en aeropuerto u hotel. Conductores adicionales. Asistencia en ruta 24/7.
- Rutas (según el dueño): Base Torres, Circuito W, Glaciar Grey, Mirador Cuernos y Salto Grande. El parque está a poco más de dos horas.
- **Pendientes** (se muestran como "Consúltanos" hasta que lleguen): depósito, cruce a Argentina, cancelación, correo.

### Reglas de contenido
- **No inventar** datos: precios, distancias, horarios de navegación, reseñas, estrellas, cantidad de clientes, premios, años de experiencia.
- No usar fotos de stock como si fueran autos de la flota. Sin foto real → marcador honesto.
- No copiar diseño, textos ni marcas de competidores.

## 4. Pendientes del dueño

- Depósito, cruce a Argentina, cancelación.
- Fotos nuevas del Duster (hoy 300 × 168 px) y del Sorento (captura con marca de agua). Ideal: todas en la zona, más interior y maletero.
- Foto de un auto con el paisaje para la portada.
- Logo y correo.
- Verificar el punto de salida de la navegación al Glaciar Grey.

## 5. Plan a futuro

### Fase 2: gestión y alcance
- Panel simple para que el dueño edite flota, precios y disponibilidad sin tocar código.
- Solicitud de reserva con fechas que se guarda (además de WhatsApp).
- Versión en inglés (gran parte del turismo del parque es extranjero).
- Reseñas reales de Google en el sitio.
- Google Search Console y perfil de empresa en Google.

### Fase 3: reserva completa
- Calendario de disponibilidad por auto.
- Pago en línea (Webpay u otro medio chileno) con depósito o reserva.
- Confirmaciones automáticas por correo y WhatsApp.

**Para la Fase 1 esto es solo contexto.** Se puede preparar el terreno (componentes ordenados, datos separados, textos fáciles de traducir), pero **no** se construye nada de Fase 2 ni 3.
