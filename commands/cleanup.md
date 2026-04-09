---
description: Find and remove dead code — unused imports, variables, exports, and commented-out code
allowed-tools: Bash, Read, Glob, Grep, Edit
---

# Cleanup

Remove dead code. This is purely subtractive — no refactoring, no behavior changes.
Run tests after each removal to confirm nothing breaks.

## Step 1: Confirm green baseline

Run the full test suite. If anything fails, stop — do not clean up a broken codebase.

## Step 2: Find dead code

Check each category using language-appropriate tools:

**Unused imports**
- JS/TS: `npx eslint --rule 'no-unused-vars: error' --rule 'unused-imports/no-unused-imports: error'` or `npx knip`
- Python: `ruff check --select F401` (unused imports)
- Go: compiler catches these — `go build ./...`
- Rust: `cargo check` / compiler warnings

**Unused variables and declarations**
- JS/TS: `npx eslint --rule 'no-unused-vars: error'`
- Python: `ruff check --select F841` (unused variables)

**Unused exports (dead public API)**
- JS/TS: `npx knip` or `npx ts-prune`
- Python: `vulture .`
- Go: `deadcode ./...` (if installed)

**Commented-out code blocks**
Grep for blocks of commented-out code (3+ consecutive comment lines that look like code).
These are not documentation — remove them. If they need to exist, they belong in git history.

**Unreachable code**
- Code after `return`, `throw`, `break`, `continue`
- Conditions that are always true or false
- Dead branches from removed feature flags

## Step 3: Remove each finding

For each piece of dead code:
1. Confirm it has no callers or references (grep before deleting)
2. Remove it
3. Run the test suite — must stay green
4. If tests go red: revert that removal and note it in the report

## Step 4: Report

List everything removed, or if nothing was found: "Cleanup complete. No dead code found."
