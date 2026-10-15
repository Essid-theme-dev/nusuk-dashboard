#!/usr/bin/env bash

set -euo pipefail

if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

echo "Starting Next.js development server..."
npm run dev
