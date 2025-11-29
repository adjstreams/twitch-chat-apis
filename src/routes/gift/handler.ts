// routes/gift/handler.ts
import { resolveGift } from "./giftEngine";
import { sanitizeUsername, sanitizeRecipient } from "../../utils/validation";
import { TEXT_PLAIN_HEADERS } from "../../utils/response";

export function handleGift(url: URL): Response {
  const senderParam = url.searchParams.get("user");
  const sender = sanitizeUsername(senderParam);
  const toUserParam = url.searchParams.get("touser");
  const recipient = sanitizeRecipient(toUserParam);

  const outcome = resolveGift(sender, recipient);

  const message =
    `${outcome.sender} ${outcome.effortText} and got ${outcome.recipient} ${outcome.giftText}. ` +
    `${outcome.followupText} ` +
    `(DISCLAIMER: This is a joke, gifts are entirely fictional!)`;

  return new Response(message, {
    headers: TEXT_PLAIN_HEADERS,
  });
}
