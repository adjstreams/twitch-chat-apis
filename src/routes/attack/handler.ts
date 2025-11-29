import {
  EXACT_OUTCOMES,
  RANGE_OUTCOMES,
  type OutcomeTarget,
  type ResolvedOutcome,
} from "./outcomes";

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function resolveOutcome(roll: number): ResolvedOutcome {
  const exactMatches = EXACT_OUTCOMES.filter((o) => o.roll === roll);
  if (exactMatches.length > 0) {
    const chosen = pickRandom(exactMatches);
    return {
      roll,
      target: chosen.target,
      description: chosen.description,
    };
  }

  const band = RANGE_OUTCOMES.find((o) => roll >= o.min && roll <= o.max);
  if (band && band.descriptions.length > 0) {
    return {
      roll,
      target: band.target,
      description: pickRandom(band.descriptions),
    };
  }

  return {
    roll,
    target: "self" as OutcomeTarget,
    description: "tripped over their own shoelaces",
  };
}

export function handleAttack(url: URL): Response {
  const user = url.searchParams.get("user")?.trim() || "someone";
  const toUser = url.searchParams.get("touser")?.trim() || user;

  const roll = Math.floor(Math.random() * 100) + 1; // 1–100
  const outcome = resolveOutcome(roll);
  const victim = outcome.target === "self" ? user : toUser;

  const message = `${user} scores ${roll}%. ${victim} ${outcome.description}`;

  return new Response(message, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
