---
description: Performance review of changed code
allowed-tools: Bash(git diff:*), Read, Glob, Grep
---

# Performance Review

## Current changes

Run `git diff HEAD` and review every changed file.

## Checklist

### Database / data access
- [ ] No N+1 queries — loops that trigger individual DB calls per iteration
- [ ] Queries select only needed columns, not `SELECT *`
- [ ] New queries have appropriate indexes (check query plan if possible)
- [ ] Bulk operations used where applicable (insert many, not insert one in a loop)

### Computation
- [ ] No unnecessary work inside loops (move invariants out)
- [ ] No repeated expensive calls with the same arguments — cache or memoize
- [ ] Recursion has a clear base case and won't blow the stack on real inputs
- [ ] No O(n²) or worse where O(n log n) or O(n) is achievable

### Memory
- [ ] No unbounded accumulation (appending to a list/array indefinitely)
- [ ] Large objects released when no longer needed
- [ ] Streams/iterators used for large data rather than loading all into memory

### I/O and async
- [ ] Async used where operations are I/O-bound
- [ ] No blocking calls on the main thread / event loop
- [ ] Parallel execution used where operations are independent
- [ ] No tight polling loops — use events, callbacks, or exponential backoff

### Frontend (if applicable)
- [ ] No unnecessary re-renders (check dependency arrays, memoization)
- [ ] No expensive computations in render paths
- [ ] Assets are not loaded synchronously if they can be lazy-loaded

## Output format

Report each finding as:
- [HIGH/MEDIUM/LOW] Description — file:line — suggested fix

HIGH issues must be addressed before finishing.
MEDIUM: fix if straightforward, otherwise track.
LOW: note for awareness.

If nothing found: "Performance review complete. No issues found."
