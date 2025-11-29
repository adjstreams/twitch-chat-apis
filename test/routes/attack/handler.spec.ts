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

describe("/attack endpoint", () => {
  it("returns an attack message for unit-style call", async () => {
    const request = new IncomingRequest(
      "http://example.com/attack?user=ADJStreams&touser=Chat"
    );
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext(ctx);

    expect(response.status).toBe(200);
    const text = await response.text();

    // Basic sanity: includes attacker, victim and a % score
    expect(text).toMatch(/ADJStreams/);
    expect(text).toMatch(/Chat/);
    expect(text).toMatch(/\d+%/);

    // Should look roughly like "ADJStreams scores 73%. Chat was ..."
    expect(text).toMatch(/scores \d+%\. /);
  });

  it("works through SELF.fetch (integration style)", async () => {
    const response = await SELF.fetch(
      "https://example.com/attack?user=ADJStreams&touser=Chat"
    );

    expect(response.status).toBe(200);
    const text = await response.text();
    expect(text).toMatch(/\d+%/);
  });

  it("falls back to self-target when touser is missing", async () => {
    const response = await SELF.fetch(
      "https://example.com/attack?user=ADJStreams"
    );

    expect(response.status).toBe(200);
    const text = await response.text();

    // No explicit 'Chat' – attacker and victim should both be ADJStreams
    expect(text).toMatch(/ADJStreams/);
    // Very loose: "ADJStreams scores X%. ADJStreams ..."
    expect(text).toMatch(/ADJStreams scores \d+%\. ADJStreams /);
  });
});
