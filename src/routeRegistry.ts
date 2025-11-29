import type { RouteHandler } from "./types";
import { handleRate } from "./routes/rate";
import { handleAttack } from "./routes/attack/handler";

interface RouteConfig {
  handler: RouteHandler;
  description: string;
}

export const routes: Record<string, RouteConfig> = {
  "/rate": {
    handler: (url, _env, _ctx) => handleRate(url),
    description: "/rate?user=NAME&touser=NAME – returns a random rating",
  },
  "/attack": {
    handler: (url, _env, _ctx) => handleAttack(url),
    description: "/attack?user=NAME&touser=NAME – returns a random attack outcome",
  },
};
