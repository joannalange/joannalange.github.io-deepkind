#!/usr/bin/env bash
# install.sh — set up DeepKind dev environment
# Run once after cloning: ./install.sh
set -e

RED='\033[0;31m'; YELLOW='\033[1;33m'; GREEN='\033[0;32m'; NC='\033[0m'

ok()   { echo -e "${GREEN}  ✓ $1${NC}"; }
warn() { echo -e "${YELLOW}  ⚠ $1${NC}"; }
fail() { echo -e "${RED}  ✗ $1${NC}"; exit 1; }

echo ""
echo "DeepKind — install"
echo "──────────────────────────────────────"

# ── 1. Node.js ───────────────────────────────────────────────────────────────
if ! command -v node &>/dev/null; then
  fail "Node.js not found. Install from https://nodejs.org (v18+ required)"
fi
NODE_MAJOR=$(node --version | sed 's/v//' | cut -d. -f1)
if [ "$NODE_MAJOR" -lt 18 ]; then
  fail "Node.js v18+ required (found $(node --version))"
fi
ok "Node.js $(node --version)"

# ── 2. npm ───────────────────────────────────────────────────────────────────
if ! command -v npm &>/dev/null; then
  fail "npm not found. It ships with Node.js — check your installation."
fi
ok "npm $(npm --version)"

# ── 3. Native build tools (required by better-sqlite3 via @tinacms/cli) ─────
MISSING_TOOLS=()
command -v python3 &>/dev/null || MISSING_TOOLS+=("python3")
command -v make    &>/dev/null || MISSING_TOOLS+=("make")
command -v g++     &>/dev/null || MISSING_TOOLS+=("g++")

if [ ${#MISSING_TOOLS[@]} -gt 0 ]; then
  warn "Missing native build tools: ${MISSING_TOOLS[*]}"
  warn "TinaCMS requires these to compile better-sqlite3."
  echo ""

  # Offer to install automatically on Debian/Ubuntu
  if command -v apt-get &>/dev/null; then
    echo -n "  Install build-essential + python3 via apt? [Y/n] "
    read -r answer
    if [[ "${answer,,}" != "n" ]]; then
      sudo apt-get update -qq
      sudo apt-get install -y build-essential python3
      ok "Build tools installed"
    else
      fail "Cannot continue without build tools. Install them and re-run ./install.sh"
    fi
  else
    echo "  On macOS:          xcode-select --install"
    echo "  On Arch/Manjaro:   sudo pacman -S base-devel python"
    echo "  On Fedora/RHEL:    sudo dnf groupinstall 'Development Tools' && sudo dnf install python3"
    echo ""
    fail "Install the tools above and re-run ./install.sh"
  fi
else
  ok "Build tools (python3, make, g++)"
fi

# ── 4. Clean install ─────────────────────────────────────────────────────────
echo ""
echo "Installing npm dependencies..."

# Remove stale node_modules and lock file artefacts to avoid integrity errors
if [ -d node_modules ]; then
  echo "  Removing existing node_modules..."
  rm -rf node_modules
fi

npm install

echo ""
ok "All done. Run ./dev.sh to start the site."
echo ""
