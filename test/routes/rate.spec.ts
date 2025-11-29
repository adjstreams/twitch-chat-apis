import {
  env,
  createExecutionContext,
  waitOnExecutionContext,
  SELF,
} from "cloudflare:test";
import { describe, it, expect } from "vitest";
import worker from "../../src/index";

// Typed helper from the template
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe("/rate endpoint", () => {
  it("returns a rating message for unit-style call", async () => {
    const request = new IncomingRequest(
      "http://example.com/rate?user=ADJStreams&touser=Chat"
    );
    const ctx = createExecutionContext();

    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext(ctx);

    expect(response.status).toBe(200);
    const text = await response.text();
    expect(text).toMatch(/ADJStreams/);
    expect(text).toMatch(/Chat/);
    expect(text).toMatch(/\d+%/);
  });

  it("works through SELF.fetch (integration style)", async () => {
    const response = await SELF.fetch(
      "https://example.com/rate?user=ADJStreams&touser=Chat"
    );

    expect(response.status).toBe(200);
    const text = await response.text();
    expect(text).toMatch(/\d+%/);
  });
});
