/**
 * Validates and sanitizes user input for route handlers.
 * Prevents overly long inputs and removes control characters.
 */

const MAX_USERNAME_LENGTH = 50;
const DEFAULT_USER = "someone";
const DEFAULT_RECIPIENT = "chat";

/**
 * Sanitizes a username parameter:
 * - Trims whitespace
 * - Limits length to MAX_USERNAME_LENGTH
 * - Removes control characters and newlines
 * - Returns default if empty or invalid
 */
export function sanitizeUsername(
  input: string | null | undefined,
  defaultValue: string = DEFAULT_USER
): string {
  if (!input) {
    return defaultValue;
  }

  // Trim and check if empty after trimming
  let sanitized = input.trim();
  if (sanitized.length === 0) {
    return defaultValue;
  }

  // Remove control characters, newlines, and tabs
  // eslint-disable-next-line no-control-regex
  sanitized = sanitized.replace(/[\x00-\x1F\x7F-\x9F\n\r\t]/g, "");

  // Limit length
  if (sanitized.length > MAX_USERNAME_LENGTH) {
    sanitized = sanitized.substring(0, MAX_USERNAME_LENGTH);
  }

  // If empty after sanitization, return default
  if (sanitized.length === 0) {
    return defaultValue;
  }

  return sanitized;
}

/**
 * Sanitizes a recipient parameter (for touser):
 * - Uses sanitizeUsername but with "chat" as default
 */
export function sanitizeRecipient(
  input: string | null | undefined
): string {
  return sanitizeUsername(input, DEFAULT_RECIPIENT);
}

