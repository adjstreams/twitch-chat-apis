export function handleRate(url: URL): Response {
  const user = url.searchParams.get("user") ?? "someone";
  const toUser = url.searchParams.get("touser") ?? user;

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
    headers: { "Content-Type": "text/plain" },
  });
}
