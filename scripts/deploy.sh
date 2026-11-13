#!/usr/bin/env bash
# Compila el sitio y lo sube al VPS.
# Uso: ./scripts/deploy.sh            (usa ubuntu@54.39.110.0)
#      DEPLOY_HOST=otro@host ./scripts/deploy.sh
set -euo pipefail

HOST="${DEPLOY_HOST:-ubuntu@54.39.110.0}"
DEST="/var/www/patagonesrentacar.cl/public/"

cd "$(dirname "$0")/.."

npm install
npm run build

test -f dist/index.html || { echo "dist/index.html no existe: la compilación falló." >&2; exit 1; }
test -f dist/404.html || { echo "dist/404.html no existe." >&2; exit 1; }

rsync -av --delete dist/ "$HOST:$DEST"

echo "Publicado en https://patagonesrentacar.cl/"
