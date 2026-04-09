---
description: Review all changes in the current working tree before committing
allowed-tools: Bash(git diff:*), Bash(git status:*), Bash(git log:*), Read, Glob, Grep
---

# Code Review

## Current state
Run: `git status` and `git diff HEAD`

## Checklist

Work through each item. Report findings at the end.

1. **Correctness** — does the code do what was intended? Any obvious bugs?
2. **Tests** — is there coverage for the new behavior? Do the tests actually test the right thing?
3. **Edge cases** — what inputs or states could break this? Are they handled?
4. **Conventions** — does this follow the patterns already in the codebase?
5. **Complexity** — is this the simplest implementation that works? Flag anything that could be simplified.
6. **Breaking changes** — were any exported interfaces, signatures, or behaviors changed? Intentional?
7. **Performance** — any N+1s, unbounded loops, blocking calls, or unnecessary re-computation?
8. **Commit hygiene** — single logical change? No debug code or commented-out code?

## Output format

Report each issue as:
- [high/medium/low] Description — file:line if applicable

If clean: state "Review complete. No issues found." and summarize what was changed.
