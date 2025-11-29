export type GiftQuality = "bad" | "ok" | "good";
export type Sentiment = "negative" | "neutral" | "positive";

export interface Gift {
  template: string;
  quality: GiftQuality;
}

export const GIFTS: Gift[] = [
  { template: "a piece of coal", quality: "bad" },
  {
    template: "a fashionable handbag",
    quality: "good",
  },
  {
    template: "a game that {sender} really loves and wants everyone else to play",
    quality: "ok",
  },
  {
    template: "a Steam game that {recipient} actually wanted",
    quality: "good",
  },
  {
    template: "some very fancy perfume",
    quality: "good",
  },
  {
    template: "a gifted sub",
    quality: "ok",
  },
  {
    template: "instant-regret chocolate",
    quality: "bad",
  },
  {
    template:
      "a box of Beanboozled that {sender} taste-tested first to ensure it only contained the nasty ones",
    quality: "bad",
  },
  {
    template: "a custom made calendar featuring pics of {sender}",
    quality: "bad",
  },
  {
    template: "a calendar from last year",
    quality: "bad",
  },  
  {
    template: "a pet snake",
    quality: "ok",
  },
  {
    template: 'a DVD of the "best film ever" – Cats',
    quality: "bad",
  },
  {
    template: "a bath towel monogrammed with {sender}'s initials",
    quality: "ok",
  },
  {
    template: "anti-aging wrinkle cream",
    quality: "bad",
  },
  {
    template: "socks with {sender}'s face on them",
    quality: "ok",
  },
  {
    template: "a tiny plush doll that looks suspiciously like {recipient}",
    quality: "ok",
  },
  {
    template: "a Funko Pop! of {sender}",
    quality: "ok",
  },  
];

export const EFFORTS = [
  "gave it a lot of thought",
  "bought the first thing they saw on Black Friday",
  "panicked and bought something at the last minute",
  "regifted an unwanted present",
  "found something at the back of the cupboard and wrapped it anyway",
  "definitely didn't re-use last year's gift bag",
] as const;

export const FOLLOWUPS: Record<Sentiment, string[]> = {
  negative: [
    "It broke almost immediately.",
    "{recipient} is already wondering if there's a receipt.",
    "{recipient} smiled politely and put it in the 're-gift' pile.",
    "Chat is quietly judging this choice.",
  ],
  neutral: [
    '{recipient} says, "Oh... wow. Thanks?"',
    "It's going straight on a shelf where it will never be touched again.",
    "{recipient} has no idea what to do with it, but appreciates the thought.",
  ],
  positive: [
    "{recipient} absolutely loves it.",
    "It's weirdly perfect and everyone is impressed.",
    "{recipient} is already showing it off to chat.",
    "This might be the best gift they've had all year.",
  ],
};

export const QUALITY_WEIGHTS: Record<
  GiftQuality,
  { sentiment: Sentiment; weight: number }[]
> = {
  bad: [
    { sentiment: "negative", weight: 6 },
    { sentiment: "neutral", weight: 3 },
    { sentiment: "positive", weight: 1 },
  ],
  ok: [
    { sentiment: "negative", weight: 3 },
    { sentiment: "neutral", weight: 4 },
    { sentiment: "positive", weight: 3 },
  ],
  good: [
    { sentiment: "negative", weight: 1 },
    { sentiment: "neutral", weight: 3 },
    { sentiment: "positive", weight: 6 },
  ],
};

