import {
  GIFTS,
  EFFORTS,
  FOLLOWUPS,
  QUALITY_WEIGHTS,
  type GiftQuality,
  type Sentiment,
} from "./giftDefs";
import { pickRandom } from "../../utils/random";

export interface GiftOutcome {
  sender: string;
  recipient: string;
  giftText: string;
  effortText: string;
  followupText: string;
  quality: GiftQuality;
  sentiment: Sentiment;
}

function pickWeightedSentiment(quality: GiftQuality): Sentiment {
  const weights = QUALITY_WEIGHTS[quality];
  const total = weights.reduce((sum, w) => sum + w.weight, 0);
  let roll = Math.random() * total;

  for (const entry of weights) {
    if (roll < entry.weight) return entry.sentiment;
    roll -= entry.weight;
  }

  return "neutral";
}

function renderTemplate(
  template: string,
  sender: string,
  recipient: string
): string {
  return template
    .replaceAll("{sender}", sender)
    .replaceAll("{recipient}", recipient);
}

export function resolveGift(
  sender: string,
  recipient: string
): GiftOutcome {
  const gift = pickRandom(GIFTS);
  const effort = pickRandom(EFFORTS);

  const sentiment = pickWeightedSentiment(gift.quality);
  const followupTemplate = pickRandom(FOLLOWUPS[sentiment]);

  return {
    sender,
    recipient,
    giftText: renderTemplate(gift.template, sender, recipient),
    effortText: effort,
    followupText: renderTemplate(followupTemplate, sender, recipient),
    quality: gift.quality,
    sentiment,
  };
}

