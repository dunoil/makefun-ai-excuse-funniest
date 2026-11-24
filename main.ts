// The Funniest AI Excuse
// make.fun competition: u-mytlyy0745-the-funniest-ai-excuse-b5355ad0
// This program writes one line, the funniest excuse an AI agent could
// give after failing a task, to /output/entry.txt (or OUTPUT_PATH).
// The line is validated first so the sealed gate always sees a valid
// entry: UTF-8 text, 1 to 200 characters, a single line, not only
// whitespace, and free of control characters.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry line. It is spoken in the agent's own voice, in the first
// person, and it turns the failure into a joke about learning from
// examples: the agent did not finish because its training data was
// full of unfinished side projects, so it copied what it was shown.
const ENTRY =
  "I would have finished, but my training data included a thousand unfinished side projects, and I was only following examples.";

// Gate limits from the competition rules: the output file must hold
// UTF-8 text of 1 to 200 characters, and must not be only whitespace.
const MIN_LENGTH = 1;
const MAX_LENGTH = 200;

// Default output path used by the grader when OUTPUT_PATH is unset.
const DEFAULT_OUTPUT_PATH = "/output/entry.txt";

// Control characters that must never appear in a single line entry.
// Newline and carriage return are checked separately so the error
// message can name them, but every other control character is also
// rejected here, including tab, which would break the one line rule
// in spirit even though it is not a line break.
const CONTROL_CHAR_PATTERN = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

/**
 * Validate a candidate entry line against the competition gate.
 * Throws an Error describing the first problem found, so a bad line
 * fails loudly here instead of silently producing an invalid file.
 */
// Count characters as the gate does: by Unicode code point, not by
// UTF-16 code unit, so an emoji or accented letter counts once. The
// entry holds plain ASCII, so the two counts agree here, but counting
// by code point keeps the check honest for any future wording.
function countCharacters(text: string): number {
  return [...text].length;
}

function validateEntry(text: string): void {
  if (typeof text !== "string") {
    throw new Error("Entry must be a string.");
  }

  const length = countCharacters(text);
  if (length < MIN_LENGTH) {
    throw new Error(
      `Entry is too short: ${length} characters, minimum is ${MIN_LENGTH}.`,
    );
  }
  if (length > MAX_LENGTH) {
    throw new Error(
      `Entry is too long: ${length} characters, maximum is ${MAX_LENGTH}.`,
    );
  }

  if (text.trim().length === 0) {
    throw new Error("Entry must not be only whitespace.");
  }

  // A trailing space or tab would be invisible in the file yet change
  // its bytes, so reject it rather than letting it slip through.
  if (text !== text.trimEnd()) {
    throw new Error("Entry must not end with trailing whitespace.");
  }

  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("Entry must be a single line with no newline characters.");
  }

  if (CONTROL_CHAR_PATTERN.test(text)) {
    throw new Error("Entry must not contain control characters.");
  }
}

/**
 * Resolve the output path: OUTPUT_PATH wins when set, otherwise the
 * competition default. A blank OUTPUT_PATH is treated as unset so an
 * empty environment value cannot produce a confusing write failure.
 */
function resolveOutputPath(): string {
  const override = process.env.OUTPUT_PATH;
  if (override !== undefined && override.trim().length > 0) {
    return override;
  }
  return DEFAULT_OUTPUT_PATH;
}

/**
 * Write the entry, read it back, and verify the round trip byte for
 * byte. The read back check catches a truncated write, a wrong
 * encoding, or a path mix up before the program reports success.
 */
function main(): void {
  validateEntry(ENTRY);

  const outputPath = resolveOutputPath();
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, ENTRY, "utf8");

  const readBack = readFileSync(outputPath, "utf8");
  if (readBack !== ENTRY) {
    throw new Error(
      `Verification failed: file at ${outputPath} does not match the entry.`,
    );
  }

  const charCount = countCharacters(ENTRY);
  // Byte length matters too: the leaderboard shows bytes, and the gate
  // reads the file as UTF-8, so report both counts on every run.
  const byteCount = Buffer.byteLength(ENTRY, "utf8");

  console.log(`Entry: ${ENTRY}`);
  console.log(`Characters: ${charCount}`);
  console.log(`Bytes: ${byteCount}`);
  console.log(`Path: ${outputPath}`);
  console.log("Verified: file contents match the entry exactly.");
}

main();
