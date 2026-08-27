#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."

rm -rf mcp-server/dist-npm
mkdir -p mcp-server/dist-npm/lib/tools mcp-server/dist-npm/lib/data/wilayah

cp lib/toolSchemas.js lib/toolDispatcher.js mcp-server/dist-npm/lib/
cp lib/tools/*.js mcp-server/dist-npm/lib/tools/
cp lib/data/wilayah/*.csv mcp-server/dist-npm/lib/data/wilayah/
sed 's#\.\./lib/#./lib/#g' mcp-server/index.js > mcp-server/dist-npm/index.js
cp mcp-server/package.json mcp-server/dist-npm/package.json

echo "Built mcp-server/dist-npm - publish with: cd mcp-server/dist-npm && npm publish --access public"
