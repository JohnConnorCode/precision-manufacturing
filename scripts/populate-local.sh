#!/usr/bin/env bash
set -euo pipefail

BASE_URL=${1:-http://localhost:3000}
TOKEN=${ADMIN_POPULATE_TOKEN:-}

if [ -z "$TOKEN" ]; then
  echo "ERROR: ADMIN_POPULATE_TOKEN is not set in your environment (.env.local)." >&2
  exit 1
fi

echo "Using base URL: $BASE_URL"

echo "Populating services..."
curl -sS -X POST "$BASE_URL/api/admin/populate-services" \
  -H "authorization: Bearer $TOKEN" \
  -H "content-type: application/json"

echo "\nPopulating industries..."
curl -sS -X POST "$BASE_URL/api/admin/populate-industries" \
  -H "authorization: Bearer $TOKEN" \
  -H "content-type: application/json"

echo "\nDone."
