// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://patagonesrentacar.cl',
  trailingSlash: 'ignore',
  build: {
    // /flota/ -> dist/flota/index.html (Nginx: try_files $uri $uri/ =404)
    format: 'directory',
  },
});
