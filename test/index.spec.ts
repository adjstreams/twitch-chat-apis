import {
  env,
  createExecutionContext,
  waitOnExecutionContext,
} from "cloudflare:test";
import { describe, it, expect, beforeEach } from "vitest";
import worker from "../src/index";

const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe("router + auth behaviour", () => {
  beforeEach(() => {
    // Clear API_KEY before each test so tests don't bleed into each other
    delete (env as any).API_KEY;
  });

  it("returns 404 + help text for unknown routes", async () => {
    const request = new IncomingRequest("http://example.com/");
    const ctx = createExecutionContext();

    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext(ctx);

    expect(response.status).toBe(404);

    const text = await response.text();
    expect(text).toContain("Available endpoints:");
    expect(text).toContain("/rate?user=NAME&touser=NAME");
  });

  it("allows access when no API_KEY is configured", async () => {
    const request = new IncomingRequest(
      "http://example.com/rate?user=ADJStreams&touser=Chat"
    );
    const ctx = createExecutionContext();

    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext(ctx);

    expect(response.status).toBe(200);
  });

  it("denies access when API_KEY is set but missing from request", async () => {
    (env as any).API_KEY = "test-secret";

    const request = new IncomingRequest(
      "http://example.com/rate?user=ADJStreams&touser=Chat"
    );
    const ctx = createExecutionContext();

    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext(ctx);

    expect(response.status).toBe(403);
    expect(await response.text()).toBe("Forbidden");
  });

  it("denies access when API_KEY is set and key is wrong", async () => {
    (env as any).API_KEY = "test-secret";

    const request = new IncomingRequest(
      "http://example.com/rate?user=ADJStreams&touser=Chat&key=wrong-secret"
    );
    const ctx = createExecutionContext();

    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext(ctx);

    expect(response.status).toBe(403);
  });

  it("allows access when API_KEY matches", async () => {
    (env as any).API_KEY = "test-secret";

    const request = new IncomingRequest(
      "http://example.com/rate?user=ADJStreams&touser=Chat&key=test-secret"
    );
    const ctx = createExecutionContext();

    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext(ctx);

    expect(response.status).toBe(200);
    const text = await response.text();
    expect(text).toMatch(/ADJStreams/);
    expect(text).toMatch(/Chat/);
  });
});
