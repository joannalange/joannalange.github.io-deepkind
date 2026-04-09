---
description: Generate a conventional commit message from staged changes and commit
allowed-tools: Bash(git diff:*), Bash(git status:*), Bash(git log:*), Bash(git commit:*), Bash(git add:*)
---

# Commit

## Step 1: Check what's staged

Run `git status` and `git diff --staged`.
If nothing is staged, ask which files to stage before continuing.

## Step 2: Check recent commit style

Run `git log --oneline -10` to understand the project's existing conventions.

## Step 3: Generate commit message

Use conventional commits format:
- `feat:` — new feature
- `fix:` — bug fix
- `refactor:` — restructuring with no behavior change
- `test:` — adding or updating tests
- `chore:` — build, config, tooling, deps
- `docs:` — documentation only
- `perf:` — performance improvement

Subject: imperative present tense, max 72 chars, no period at end.
Body (if the why isn't obvious): explain WHY, not WHAT. Wrap at 72 chars.

## Step 4: Confirm before committing

Show the proposed commit message. Ask for confirmation or edits.
Only run `git commit` after the user confirms.
