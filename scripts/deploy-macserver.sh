#!/usr/bin/env bash
# Deploys the site to the Mac server (`ssh macserver`), where it runs in the samat-dev-space
# namespace of the OrbStack Kubernetes cluster and is public as https://samat-dev.space.
#
# Copies the sources to ~/apps/samat-dev-space, builds the image there and restarts the
# deployment. The image that was live before is kept as samat-dev-space:previous; to roll back:
#   ssh macserver 'PATH=/usr/local/bin:$PATH; docker tag samat-dev-space:previous samat-dev-space:latest \
#     && kubectl -n samat-dev-space rollout restart deployment/samat-dev-space'
set -euo pipefail
cd "$(dirname "$0")/.."

HOST="${DEPLOY_HOST:-macserver}"
APP_DIR="apps/samat-dev-space"

echo "==> Checking the sources"
npm run lint

echo "==> Copying the sources to $HOST:~/$APP_DIR"
# --delete only applies inside src and public; other files on the server are left alone.
rsync -a --delete src public "$HOST:$APP_DIR/"
rsync -a index.html package.json package-lock.json vite.config.js Dockerfile .dockerignore "$HOST:$APP_DIR/"

echo "==> Building the image and restarting the deployment"
ssh -o BatchMode=yes "$HOST" 'bash -s' <<'EOF'
set -euo pipefail
# Non-interactive ssh sessions on the Mac do not have Homebrew or OrbStack on the PATH.
export PATH=/opt/homebrew/bin:/usr/local/bin:$PATH
cd ~/apps/samat-dev-space
if docker image inspect samat-dev-space:latest >/dev/null 2>&1; then
  docker tag samat-dev-space:latest samat-dev-space:previous
fi
docker build --quiet -t samat-dev-space:latest .
kubectl -n samat-dev-space rollout restart deployment/samat-dev-space
kubectl -n samat-dev-space rollout status deployment/samat-dev-space --timeout=180s
EOF

echo
echo "Deployed: https://samat-dev.space"
