# Twitch Chat APIs (Cloudflare Worker)

A small, modular Cloudflare Worker that exposes simple API endpoints designed
for Twitch chatbots (e.g. StreamElements `$(customapi)` commands).  
This project currently includes a `/rate` endpoint, with a structure that makes
it easy to add more (e.g. `/attack`, `/roast`, `/xmas`, etc).

This repo is intentionally simple, public, and easy to fork — a clean example of
a modern TypeScript Cloudflare Worker with routing, tests, and CI-friendly setup.

---

## 🚀 Features

- Built on **Cloudflare Workers** using **TypeScript**
- Clean **routing system** (add new endpoints without touching core logic)
- Comprehensive **unit + integration tests** (Vitest + cloudflare:test)
- Designed for **text/plain** output for Twitch chatbots
- Optional **API key protection** via environment variables
- Zero dependencies (small, fast, easy to maintain)

---

## 📌 Current Endpoints

### `/rate?user=NAME&touser=NAME`
Returns a random rating (0–100%) with some fun flavour text.

Example:
```
ADJStreams rates Chat 73%
```

---

## 🏁 Quick Start (Self-Host)

### 1. Clone + Install

```bash
git clone https://github.com/adjstreams/twitch-chat-apis.git
cd twitch-chat-apis
npm install
```

### 2. Login to Cloudflare

```bash
npx wrangler login
```

### 3. Rename the worker (optional)

Edit `wrangler.jsonc`:

```jsonc
{
  "name": "chat-api"
}
```

### 4. Local development

```bash
npm run dev
```

Visit:

```
http://127.0.0.1:8787/rate?user=ADJStreams&touser=Chat
```

### 5. Deploy

```bash
wrangler deploy
```

---

## 🎮 StreamElements Chatbot Usage

Inside your custom command, something like:

```
!rate = $(customapi https://<your-worker>.<cloudflare-account>.workers.dev/rate?user=$(sender)&touser=$(touser))

!attack = $(customapi https://<your-worker>.<cloudflare-account>.workers.dev/attack?user=$(sender)&touser=$(touser))

```

---

## 🔐 Optional API Key Protection

You can optionally lock down your Worker by setting an `API_KEY` secret, via the Cloudflare dashboard or from the command line using wrangler

```bash
wrangler secret put API_KEY
```

### 2. Include the key in your request:

```
https://<worker>.workers.dev/rate?user=X&touser=Y&key=your-secret-here
```

If `API_KEY` is **not set**, the Worker remains completely open.  
Self-hosters can choose whether they want protection or not.

---

## 🧪 Running Tests

```bash
npm test
```

Covers:

- routing (`test/index.spec.ts`)
- registry correctness (`test/registry.spec.ts`)
- `/rate` handler (`test/routes/rate.spec.ts`)

---

## 🗂 Folder Structure

```
src/
  index.ts
  types.ts
  routeRegistry.ts
  routes/
    rate.ts

test/
  index.spec.ts
  registry.spec.ts
  routes/
    rate.spec.ts
```

---

## 🙋‍♀️ Questions / Feedback

Open an issue or start a discussion in the repo.

## 👋 About the Author

Built with ❤️ by [ADJ](https://adj.gg), also known as  
🎮 [adjstreams](https://twitch.tv/adjstreams) — horror/variety streamer with chaotic energy  
🧘 [adjcodes](https://twitch.tv/adjcodes) — chill late-night dev streams  

This is one of many small tools created by the same dev behind [streamgood.gg](https://streamgood.gg) — Twitch tools for streamers who want a little more magic.