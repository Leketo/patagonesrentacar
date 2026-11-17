// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://patagonesrentacar.cl',
  trailingSlash: 'ignore',
  build: {
    // /flota/ -> dist/flota/index.html (Nginx: try_files $uri $uri/ =404)
    format: 'directory',
  },
  // La ficha del Duster cambió de dirección cuando el dueño corrigió el año
  // (era 2019, es 2018) y la vieja ya estaba publicada. En un sitio estático
  // Astro no puede responder un 301: deja una página con un meta refresh,
  // noindex y la canónica apuntando a la nueva. Lo prolijo sigue siendo el 301
  // en Nginx; si alguna vez se configura, esta entrada se puede sacar.
  redirects: {
    '/flota/renault-duster-2019': '/flota/renault-duster-2018',
  },
});
