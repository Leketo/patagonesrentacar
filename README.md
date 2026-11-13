# Patagones Rent a Car

Sitio web de [patagonesrentacar.cl](https://patagonesrentacar.cl): arriendo de autos en Puerto Natales, Patagonia chilena.

**Fase 1:** catálogo estático con consulta por WhatsApp. Sin pagos, sin base de datos y sin backend.

## Páginas

| Ruta | Contenido |
|---|---|
| `/` | Portada: los cuatro autos con su precio, condiciones, rutas y la consulta con fechas |
| `/flota/` | Los cuatro autos |
| `/flota/<auto>/` | Ficha de cada auto con consulta preseleccionada |
| `/torres-del-paine/` | Rutas del parque y auto recomendado |
| `/condiciones/` | Condiciones, requisitos y preguntas frecuentes |
| `/contacto/` | WhatsApp, teléfono, horario |
| `/terminos/`, `/privacidad/` | Textos legales básicos |
| `/404` | Página de error propia |
| `/sitemap.xml` | Mapa del sitio para buscadores |

## Cómo se edita

Todo el contenido variable está en `src/data/`:

- `site.ts`: nombre, WhatsApp, horario, condiciones, requisitos y servicios.
- `fleet.ts`: autos y precios por día (CLP, IVA incluido).
- `routes.ts`: rutas de Torres del Paine.

Una condición con `value: null` aparece en el sitio como "Consúltanos". Hoy están así el depósito, el cruce a Argentina y la cancelación, a la espera de los datos del dueño.

## Las fotos

| Carpeta | Qué hay |
|---|---|
| `../img` (fuera del repo) | Las fotos como las manda el dueño. **No se edita, no se renombra, no se borra.** |
| `src/fotos-originales/` | Fotos que llegaron antes de que existiera `../img`. Están versionadas, pero como nadie las importa, Astro no las publica. |
| `src/assets/flota/` y `src/assets/portada/` | Las fotos ya encuadradas, que son las que usa el sitio. |

Para procesarlas:

```bash
node scripts/procesar-fotos.mjs
```

El script recorta cada foto a **3:2** con el auto centrado y las deja en `src/assets/`;
desde ahí `astro:assets` las convierte a WebP en varios anchos al compilar. El recorte de
cada foto está escrito a mano en el script, mirando la imagen: cuando llegue una foto
nueva, se agrega su entrada ahí.

Para cambiar la foto de un auto basta con dejar la nueva en `../img`, agregar su recorte al
script, correrlo y actualizar el `import` en `src/data/fleet.ts`.

## Desarrollo

Requiere Node 20 o superior.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
npm run preview  # sirve dist/ localmente
```

## Publicación

El sitio se sirve desde el VPS con Nginx. Basta copiar `dist/` a la carpeta pública; no hace falta recargar Nginx.

```bash
./scripts/deploy.sh
```

Equivale a `npm install && npm run build && rsync -av --delete dist/ ubuntu@54.39.110.0:/var/www/patagonesrentacar.cl/public/`.

Servidor: `/var/www/patagonesrentacar.cl/public/` (dueño `ubuntu`). Certificado Let's Encrypt con renovación automática. Caché de un año para `/_astro/`.

## Pendientes

- Depósito, cruce a Argentina y política de cancelación (`src/data/site.ts`).
- Correo de contacto (`site.email`).
- **Foto nueva del Renault Duster**: la que hay mide 300 × 168 px y no parece tomada en la zona.
- Foto del Suzuki Grand Nomade fuera del patio de autos.
- Criterio único sobre las patentes: en la foto del Subaru está tapada y en la del Suzuki se lee.
- Verificar el punto de salida de la navegación al Glaciar Grey (`src/data/routes.ts`).
- Revisión de los textos legales por un abogado.
- Logo. Hoy la marca es tipográfica más el motivo de las tres torres (`src/components/Torres.astro`).

## Fases siguientes

- **Fase 2:** panel para editar flota y precios, solicitudes con fechas guardadas, versión en inglés.
- **Fase 3:** calendario de disponibilidad y pago online.
