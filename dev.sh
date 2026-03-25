#!/usr/bin/env bash
set -e

# Start Astro + TinaCMS in dev mode.
# TinaCMS runs its local backend and wraps the Astro dev server.
# Site:    http://localhost:4321
# Tina UI: http://localhost:4321/admin

npm run cms
