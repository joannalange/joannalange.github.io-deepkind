---
description: Structured debugging workflow for a bug or unexpected behavior
argument-hint: <description of the bug>
allowed-tools: Read, Glob, Grep, Bash, Edit, Write
---

# Debug: $ARGUMENTS

Follow these steps in order. Write down findings at each step before proceeding to the next.

## Step 1: Reproduce

- Confirm the bug is reproducible
- Write a minimal failing test that captures the unexpected behavior
- Run it to confirm it fails
- If it cannot be reproduced, report that and stop

## Step 2: Isolate

- Read the relevant code paths
- Identify the smallest unit of code that exhibits the problem
- List explicitly: what you know vs. what you are assuming

## Step 3: Hypothesize

- State one root cause hypothesis
- Identify what evidence would confirm or disprove it
- Do not fix anything yet

## Step 4: Verify

- Test the hypothesis (add temporary logging, inspect values, trace execution)
- If disproved, revise and repeat
- Confirm root cause before moving to fix

## Step 5: Fix

- Apply the minimal fix for the root cause
- Run the reproducing test to confirm it passes
- Run the full test suite to confirm no regressions
- Remove any debug logging added in step 4

## Step 6: Report

- Root cause: what was wrong and why
- Fix: what changed and why it works
- Any follow-up issues to track separately
