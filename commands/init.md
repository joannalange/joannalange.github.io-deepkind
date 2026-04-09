---
description: Onboard a new project — discover stack, conventions, and write a project-level CLAUDE.md
allowed-tools: Read, Glob, Bash, Write
---

# Project Init

Explore this codebase and produce a project-level `.claude/CLAUDE.md` that captures everything
Claude needs to work effectively here without re-discovering it each session.

## Step 1: Discover the stack

Check for these files and read the relevant ones:
- `package.json` — JS/TS project, scripts, dependencies
- `pyproject.toml` / `setup.cfg` / `requirements.txt` — Python project
- `go.mod` — Go project
- `Cargo.toml` — Rust project
- `Makefile` — custom commands
- `docker-compose.yml` / `Dockerfile` — runtime environment
- `.nvmrc` / `.python-version` / `mise.toml` — version constraints

## Step 2: Discover test, lint, and coverage commands

Find the actual commands used in this project:
- Check `package.json` scripts for `test`, `lint`, `build`, `typecheck`, `coverage`
- Check `Makefile` targets
- Check CI config (`.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile`) — CI runs the authoritative commands
- Check existing CLAUDE.md or README for documented commands
- Check for coverage config: `pytest-cov`, `.coveragerc`, `nyc` in package.json, `c8`, `tarpaulin`
- If no coverage tool exists, note it and suggest one for the stack

## Step 3: Understand project conventions

Read a sample of existing source files to identify:
- Directory structure and where things live
- Naming conventions (files, functions, variables)
- Import style (relative vs absolute, barrel files, etc.)
- Test file location and naming pattern (colocated, `__tests__/`, `test/`, etc.)
- Error handling patterns used

## Step 4: Check for existing project CLAUDE.md

If `.claude/CLAUDE.md` already exists, read it first. Update rather than overwrite.
If it does not exist, create it.

## Step 5: Write `.claude/CLAUDE.md`

Include only what is specific to this project — global rules are already in `~/.claude/CLAUDE.md`.

Use this structure:

```markdown
# [Project Name]

## Stack
[Language, framework, key libraries]

## Commands
- Test: `<exact command>`
- Coverage: `<exact command or "not configured">`
- Lint: `<exact command>`
- Build: `<exact command>`
- Typecheck: `<exact command if applicable>`
- Dev server: `<exact command if applicable>`

## Project Structure
[Brief description of where things live — src layout, test location, key directories]

## Conventions
[Anything discovered that differs from or extends the global coding standards]

## Notes
[Anything else Claude needs to know — environment setup, gotchas, key dependencies]
```

## Step 6: Confirm

Report what was discovered and what was written. Ask the user to correct anything that looks wrong.
