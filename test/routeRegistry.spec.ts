import { describe, it, expect } from "vitest";
import { routes } from "../src/routeRegistry";
import type { Env } from "../src/types";

describe("route registry", () => {
  it("contains a /rate route with handler and description", () => {
    const rateConfig = routes["/rate"];

    expect(rateConfig).toBeDefined();
    expect(typeof rateConfig.handler).toBe("function");
    expect(rateConfig.description).toMatch(/\/rate\?user=NAME&touser=NAME/);
  });

  it("handlers return a Response when invoked", async () => {
    const rateConfig = routes["/rate"];
    if (!rateConfig) {
      throw new Error("Expected /rate route to be registered");
    }

    const url = new URL(
      "http://example.com/rate?user=ADJStreams&touser=Chat"
    );

    // Minimal dummy env/ctx – we don’t use them yet
    const env = {} as Env;
    const ctx = {
      waitUntil: (_p: Promise<unknown>) => {},
      passThroughOnException: () => {},
    } as unknown as ExecutionContext;

    const response = await rateConfig.handler(url, env, ctx);

    expect(response).toBeInstanceOf(Response);
    const text = await response.text();
    expect(text).toMatch(/ADJStreams/);
    expect(text).toMatch(/Chat/);
  });
});
