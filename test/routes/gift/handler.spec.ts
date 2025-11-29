import {
  env,
  createExecutionContext,
  waitOnExecutionContext,
  SELF,
} from "cloudflare:test";
import { describe, it, expect } from "vitest";
import worker from "../../../src/index";

// Typed helper from the template
const IncomingRequest = Request as typeof Request;

describe("/gift endpoint", () => {
  it("returns a gift message for unit-style call", async () => {
    const request = new IncomingRequest(
      "http://example.com/gift?user=ADJStreams&touser=Chat"
    );
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext(ctx);

    expect(response.status).toBe(200);
    const text = await response.text();

    // Basic sanity: includes sender, recipient, effort, gift, and followup
    expect(text).toMatch(/@ADJStreams/);
    expect(text).toMatch(/Chat/);
    expect(text).toMatch(/DISCLAIMER/);
    
    // Should contain effort text pattern (e.g., "gave it a lot of thought")
    expect(text).toMatch(/and got/);
    // Should contain followup text
    expect(text).toMatch(/\. /);
  });

  it("works through SELF.fetch (integration style)", async () => {
    const response = await SELF.fetch(
      "https://example.com/gift?user=ADJStreams&touser=Chat"
    );

    expect(response.status).toBe(200);
    const text = await response.text();
    expect(text).toMatch(/@ADJStreams/);
    expect(text).toMatch(/DISCLAIMER/);
  });

  it("falls back to 'chat' when touser is missing", async () => {
    const response = await SELF.fetch(
      "https://example.com/gift?user=ADJStreams"
    );

    expect(response.status).toBe(200);
    const text = await response.text();

    // Should default to "chat" as recipient
    expect(text).toMatch(/@ADJStreams/);
    expect(text).toMatch(/chat/);
    expect(text).toMatch(/DISCLAIMER/);
  });

  it("falls back to 'chat' when touser is empty string", async () => {
    const response = await SELF.fetch(
      "https://example.com/gift?user=ADJStreams&touser="
    );

    expect(response.status).toBe(200);
    const text = await response.text();

    // Should default to "chat" as recipient
    expect(text).toMatch(/@ADJStreams/);
    expect(text).toMatch(/chat/);
    expect(text).toMatch(/DISCLAIMER/);
  });

  it("falls back to 'someone' when user is missing", async () => {
    const response = await SELF.fetch(
      "https://example.com/gift?touser=Chat"
    );

    expect(response.status).toBe(200);
    const text = await response.text();

    // Should default to "someone" as sender
    expect(text).toMatch(/@someone/);
    expect(text).toMatch(/Chat/);
    expect(text).toMatch(/DISCLAIMER/);
  });
});

