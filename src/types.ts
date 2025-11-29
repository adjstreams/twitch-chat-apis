export interface Env {
  /** Optional API key for simple shared-secret protection
    * If not set, the worker is effectively open if someone knows its URL.
    */
  API_KEY?: string;
}

export type RouteHandler = (
  url: URL,
  env: Env,
  ctx: ExecutionContext
) => Response | Promise<Response>;
