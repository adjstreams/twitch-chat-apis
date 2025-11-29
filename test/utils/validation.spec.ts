import { describe, it, expect } from "vitest";
import { sanitizeUsername, sanitizeRecipient } from "../../src/utils/validation";

describe("input validation utilities", () => {
  describe("sanitizeUsername", () => {
    it("returns default for null input", () => {
      expect(sanitizeUsername(null)).toBe("someone");
    });

    it("returns default for undefined input", () => {
      expect(sanitizeUsername(undefined)).toBe("someone");
    });

    it("returns default for empty string", () => {
      expect(sanitizeUsername("")).toBe("someone");
    });

    it("returns default for whitespace-only string", () => {
      expect(sanitizeUsername("   ")).toBe("someone");
    });

    it("trims whitespace", () => {
      expect(sanitizeUsername("  ADJStreams  ")).toBe("ADJStreams");
    });

    it("removes control characters", () => {
      expect(sanitizeUsername("ADJ\x00Streams")).toBe("ADJStreams");
      expect(sanitizeUsername("ADJ\x1FStreams")).toBe("ADJStreams");
    });

    it("removes newlines and tabs", () => {
      expect(sanitizeUsername("ADJ\nStreams")).toBe("ADJStreams");
      expect(sanitizeUsername("ADJ\rStreams")).toBe("ADJStreams");
      expect(sanitizeUsername("ADJ\tStreams")).toBe("ADJStreams");
    });

    it("truncates overly long inputs", () => {
      const longInput = "A".repeat(100);
      const result = sanitizeUsername(longInput);
      expect(result.length).toBe(50);
      expect(result).toBe("A".repeat(50));
    });

    it("returns default if input becomes empty after sanitization", () => {
      expect(sanitizeUsername("\x00\x01\x02")).toBe("someone");
      expect(sanitizeUsername("\n\r\t")).toBe("someone");
    });

    it("preserves valid usernames", () => {
      expect(sanitizeUsername("ADJStreams")).toBe("ADJStreams");
      expect(sanitizeUsername("Chat123")).toBe("Chat123");
      expect(sanitizeUsername("user_name-123")).toBe("user_name-123");
    });

    it("allows custom default value", () => {
      expect(sanitizeUsername(null, "defaultUser")).toBe("defaultUser");
      expect(sanitizeUsername("", "defaultUser")).toBe("defaultUser");
    });
  });

  describe("sanitizeRecipient", () => {
    it("returns 'chat' as default", () => {
      expect(sanitizeRecipient(null)).toBe("chat");
      expect(sanitizeRecipient(undefined)).toBe("chat");
      expect(sanitizeRecipient("")).toBe("chat");
    });

    it("sanitizes valid recipient names", () => {
      expect(sanitizeRecipient("Chat")).toBe("Chat");
      expect(sanitizeRecipient("  Viewer  ")).toBe("Viewer");
    });

    it("removes control characters from recipients", () => {
      expect(sanitizeRecipient("Chat\n123")).toBe("Chat123");
    });

    it("truncates long recipient names", () => {
      const longInput = "B".repeat(100);
      const result = sanitizeRecipient(longInput);
      expect(result.length).toBe(50);
    });
  });
});

