import { routes } from "./routeRegistry";
import type { Env } from "./types";

// Simple shared-secret authorisation.
// If API_KEY is not set, auth is effectively disabled.
async function authorize(url: URL, env: Env): Promise<boolean> {
  if (!env.API_KEY) {
    // No key configured → open endpoint
    return true;
  }

  const key = url.searchParams.get("key");
  return key === env.API_KEY;
}


export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(request.url);

    // Normalise path
    let path = url.pathname;
    if (path.length > 1 && path.endsWith("/")) {
      path = path.replace(/\/+$/, "");
    }

    const route = routes[path];

    if (route) {
      const allowed = await authorize(url, env);
      if (!allowed) {
        return new Response("Forbidden", { status: 403 });
      }

      return route.handler(url, env, ctx);
    }

    // Build dynamic help text
    const help = Object.values(routes)
      .map(r => `- ${r.description}`)
      .join("\n");

    return new Response(
      `Available endpoints:\n${help}`,
      { status: 404 }
    );
  },
};
