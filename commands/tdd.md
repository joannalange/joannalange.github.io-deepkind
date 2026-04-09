---
description: Start a TDD workflow for a new feature or bug fix
argument-hint: <feature or bug description>
allowed-tools: Read, Glob, Grep, Bash, Edit, Write
---

# TDD Workflow: $ARGUMENTS

Follow these steps strictly in order. Do not proceed to the next step until the current one is complete.

## Step 1: Understand the codebase
- Find existing tests to understand the test patterns and runner used
- Find the relevant source files
- Identify how to run the tests

## Step 2: Write a failing test
- Create or extend the appropriate test file
- The test must describe the desired behavior and fail when run
- Run tests now to confirm the new test fails (red)
- Do not write any implementation code yet

## Step 3: Write minimum implementation
- Write only what is needed to make the failing test pass
- Run tests to confirm they are now green

## Step 4: Refactor
- Clean up both the test and the implementation
- Remove duplication, improve naming, simplify logic
- Run tests again to confirm still green

## Step 5: Report
- Summarize what was built, what test covers it, and any edge cases not yet covered
