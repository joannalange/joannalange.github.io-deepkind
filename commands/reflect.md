---
description: Reflect on the session and update coding config with anything general learned
allowed-tools: Read, Edit, Write, Glob
---

# Reflect

Review the current session and determine whether anything general was learned that should be
persisted into the coding config at `/Users/lilollu/projects/claude-code-config/`.

## Step 1: Review the session

Look back at what happened this session. Ask:

1. **User corrections** — did the user push back, correct an approach, or say "don't do that"?
2. **Expressed preferences** — did the user indicate they prefer a particular style, tool, pattern, or workflow?
3. **Implicit patterns** — did you notice a recurring convention in the codebase or the user's choices?
4. **Rules that were wrong** — did any existing rule in CLAUDE.md cause friction or produce a wrong result?
5. **Repeatable workflows** — was there a multi-step process you had to work out that should be a command?

## Step 2: Categorize each finding

For each finding, decide where it belongs:

| Finding type | Where to save |
|---|---|
| General coding rule or principle | `CLAUDE.md` — add or update the relevant section |
| Repeatable workflow (3+ steps, used more than once) | `commands/<name>.md` — new or updated command |
| Project-specific or user preference | Memory system (`~/.claude/projects/.../memory/`) |
| Correction to an existing rule | Edit the relevant section in `CLAUDE.md` |
| Nothing actionable | State "Nothing to add" and stop |

## Step 3: Make the changes

Edit the relevant files directly. Be surgical:
- Add a new rule to CLAUDE.md in the right section, not as a loose bullet at the end
- If correcting an existing rule, edit it in place — don't add a contradicting rule below it
- New commands should follow the same format as existing ones in `commands/`

## Step 4: State what was done

End with: "Reflection complete." followed by a brief list of what was changed, or "Nothing to add."
