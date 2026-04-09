---
description: Safe refactoring — behavior preserved, tests green before and after
argument-hint: <what to refactor and why>
allowed-tools: Read, Glob, Grep, Bash, Edit, Write
---

# Refactor: $ARGUMENTS

Rules that cannot be broken:
- Tests must be green before starting. If they are not, stop and report — do not proceed.
- No behavior changes. Only structure, naming, duplication, or readability.
- Tests must be green after each logical step.
- One thing at a time. Do not bundle unrelated cleanups.

## Step 1: Confirm green baseline

Run the full test suite. If anything fails, stop here.
Report the failures and ask the user to fix them before refactoring.

## Step 2: Understand the code

Read the target code. Identify:
- What it does (the behavior to preserve exactly)
- The specific problem to fix (duplication, complexity, naming, length)
- The smallest safe first change

## Step 3: Refactor incrementally

Make one change at a time. After each change, run the tests.
If tests go red: revert the last change, understand why, adjust approach.

## Step 4: Final verification

- Run the full test suite — must be green
- Run the linter — must be clean
- Confirm: no behavior changed, only structure

## Step 5: Report

Summarize what was changed, why, and what was explicitly preserved.
