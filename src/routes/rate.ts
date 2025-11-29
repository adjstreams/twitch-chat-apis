import { sanitizeUsername, sanitizeRecipient } from "../utils/validation";
import { TEXT_PLAIN_HEADERS } from "../utils/response";

export function handleRate(url: URL): Response {
  const userParam = url.searchParams.get("user");
  const user = sanitizeUsername(userParam);
  const toUserParam = url.searchParams.get("touser");
  const toUser = toUserParam ? sanitizeRecipient(toUserParam) : user;

  const roll = Math.floor(Math.random() * 101); // 0–100

  let message: string;

  if (roll < 10) {
    message = `${user} gives ${toUser} a brutal ${roll}% 🤢`;
  } else if (roll > 90) {
    message = `${user} blesses ${toUser} with a legendary ${roll}% 😇`;
  } else {
    message = `${user} rates ${toUser} a solid ${roll}%`;
  }

  return new Response(message, {
    headers: TEXT_PLAIN_HEADERS,
  });
}
