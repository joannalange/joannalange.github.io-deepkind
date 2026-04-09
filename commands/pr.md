---
description: Generate a pull request description from branch changes
allowed-tools: Bash(git log:*), Bash(git diff:*), Bash(git status:*), Bash(git branch:*)
---

# Pull Request Description

## Step 1: Understand the changes

Run:
- `git log main..HEAD --oneline` (try `master` if `main` doesn't exist)
- `git diff main..HEAD --stat`

## Step 2: Generate PR description

Use this format:

---
## Summary
- [What changed — 1-3 bullets]
- [Why it changed — motivation, issue reference if any]

## Changes
- [Key files/components touched and what was done to each]

## Test plan
- [ ] Tests pass: `<detected test command>`
- [ ] Linter clean: `<detected lint command>`
- [ ] [Any manual verification steps]

## Breaking changes
[None — or describe what breaks and the migration path]
---

## Step 3: Output

Print the description in markdown so the user can copy it into GitHub/GitLab.
Do not open or post to GitHub unless explicitly asked.
