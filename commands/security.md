---
description: Security review of all changes in the current working tree
allowed-tools: Bash(git diff:*), Bash(git status:*), Read, Glob, Grep
---

# Security Review

## Current changes

Run `git diff HEAD` and review every changed file.

## Checklist

### Injection
- [ ] No unsanitized user input passed to SQL (use parameterized queries)
- [ ] No unsanitized input passed to shell commands (`exec`, `eval`, `system`, `subprocess`)
- [ ] User input is escaped before rendering in HTML/templates (XSS)

### Authentication & Authorization
- [ ] New endpoints or functions check authentication
- [ ] New endpoints or functions check authorization (not just authn)
- [ ] No auth logic that can be bypassed with null, empty, or unexpected values

### Secrets & Sensitive Data
- [ ] No hardcoded secrets, API keys, passwords, or tokens
- [ ] No sensitive data written to logs
- [ ] No unnecessary storage or transmission of PII

### Dependencies
- [ ] No new dependencies introduced without review
- [ ] No dependencies with known critical CVEs

### Error Handling
- [ ] Error messages shown to users do not leak stack traces or internals
- [ ] Exceptions are not swallowed silently

### Input Validation
- [ ] Input validated at system boundaries (user input, external APIs, file reads)
- [ ] No file paths from user input used directly (path traversal)
- [ ] Integer and size bounds checked where relevant

## Output format

Report each finding as:
- [CRITICAL/HIGH/MEDIUM/LOW] Description — file:line

**CRITICAL and HIGH must be fixed before the task is complete.**
MEDIUM and LOW: flag and fix if straightforward.

If nothing found: state "Security review complete. No issues found."
