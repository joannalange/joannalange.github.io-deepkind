---
description: Detect and run the project test suite
allowed-tools: Bash, Read, Glob
---

# Run Tests

## Step 1: Detect test runner

Check in this order:
1. Project CLAUDE.md for a documented test command
2. `package.json` for a `test` script
3. `pytest.ini`, `pyproject.toml [tool.pytest]`, or `setup.cfg [tool:pytest]`
4. `Makefile` with a `test` target
5. `Cargo.toml` → `cargo test`
6. `go.mod` → `go test ./...`

## Step 2: Run tests

Run the detected command and show full output.

## Step 3: Report

- Total tests: passing / failing
- For each failure: file, test name, error message
- If no test runner found: ask the user how to run tests
