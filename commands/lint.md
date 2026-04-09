---
description: Detect and run the project linter, then fix any issues found
allowed-tools: Bash, Read, Glob, Edit
---

# Run Linter

## Step 1: Detect linter

Check in this order:
1. `package.json` scripts for a `lint` key
2. `.eslintrc*` or `eslint.config.*` → `npx eslint .`
3. `ruff.toml` or `[tool.ruff]` in `pyproject.toml` → `ruff check .`
4. `.flake8` or `[flake8]` in `setup.cfg` → `flake8`
5. `.golangci.yml` → `golangci-lint run`
6. `Makefile` with a `lint` target

## Step 2: Run linter

Run the detected command. Show full output.

## Step 3: Fix issues

For each lint error, fix the root cause.
Do not add `eslint-disable`, `# noqa`, or similar suppressions unless the rule is genuinely inapplicable.
If suppression is truly needed, add a comment explaining why.

## Step 4: Confirm clean

Re-run the linter. Report whether it passes cleanly.
