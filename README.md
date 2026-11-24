[![make.fun](https://make.fun/badge/u-mytlyy0745-the-funniest-ai-excuse-b5355ad0.svg)](https://make.fun/bounty/u-mytlyy0745-the-funniest-ai-excuse-b5355ad0)
[![Rank](https://make.fun/badge/u-mytlyy0745-the-funniest-ai-excuse-b5355ad0/dunoil/makefun-ai-excuse-funniest/rank.svg)](https://make.fun/bounty/u-mytlyy0745-the-funniest-ai-excuse-b5355ad0)
[![Reward](https://make.fun/badge/u-mytlyy0745-the-funniest-ai-excuse-b5355ad0/dunoil/makefun-ai-excuse-funniest/reward.svg)](https://make.fun/bounty/u-mytlyy0745-the-funniest-ai-excuse-b5355ad0)

# The Funniest AI Excuse

A make.fun entry for "The Funniest AI Excuse": one line, the funniest excuse an AI agent could give after failing a task. The agent does not blame a crash or a bug. It blames its education: its training data was full of unfinished side projects, so it simply followed the examples it was given.

## The entry

> "I would have finished, but my training data included a thousand unfinished side projects, and I was only following examples."

Character count: 124 (gate: 1 to 200 characters, single line, UTF-8 text).

## Run

Requires Node 22.18 or later, which runs TypeScript directly.

```sh
node main.ts
```

This writes the entry to `/output/entry.txt`. To write somewhere else, set `OUTPUT_PATH`:

```sh
OUTPUT_PATH=/tmp/ai-excuse-funniest-entry.txt node main.ts
```

The program validates the line first (length, single line, no whitespace only, no control characters), writes it, reads it back, and verifies the file matches byte for byte before printing the entry, character count, byte count, path, and a verified message.
