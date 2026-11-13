# Patagones Rent a Car

Sitio web de [patagonesrentacar.cl](https://patagonesrentacar.cl): arriendo de autos en Puerto Natales, Patagonia chilena.

**Fase 1:** catálogo estático con consulta por WhatsApp. Sin pagos, sin base de datos y sin backend.

## Páginas

| Ruta | Contenido |
|---|---|
| `/` | Portada con consulta rápida, condiciones, flota, rutas y pasos |
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

Las fotos de la flota van en `public/images/flota/`.

Una condición con `value: null` aparece en el sitio como "Consúltanos". Hoy están así el depósito, el cruce a Argentina y la cancelación, a la espera de los datos del dueño.

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
- Fotos nuevas del Renault Duster (hoy 300 × 168 px) y del Kia Sorento (captura con marca de agua).
- Foto de un auto con el paisaje para la portada.
- Verificar el punto de salida de la navegación al Glaciar Grey (`src/data/routes.ts`).
- Revisión de los textos legales por un abogado.

## Fases siguientes

- **Fase 2:** panel para editar flota y precios, solicitudes con fechas guardadas, versión en inglés.
- **Fase 3:** calendario de disponibilidad y pago online.
