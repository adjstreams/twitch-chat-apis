export type OutcomeTarget = "self" | "other";

export type ExactOutcome = {
  type: "exact";
  roll: number;
  target: OutcomeTarget;
  description: string;
};

export type RangeOutcome = {
  type: "range";
  min: number; // inclusive
  max: number; // inclusive
  target: OutcomeTarget;
  descriptions: string[];
};

export type ResolvedOutcome = {
  roll: number;
  target: OutcomeTarget;
  description: string;
};

// Exact one-off hits
export const EXACT_OUTCOMES: ExactOutcome[] = [
  {
    type: "exact",
    roll: 21,
    target: "other",
    description: "had a crystal axe thrown at them",
  },
  {
    type: "exact",
    roll: 67,
    target: "other",
    description: "was blown up by a creeper",
  },
  {
    type: "exact",
    roll: 69,
    target: "other",
    description: "was solo ulted by an Iron Man and a Sombra",
  },
];

// Ranged bands
export const RANGE_OUTCOMES: RangeOutcome[] = [
  // 85–100: big flashy hits on the target
  {
    type: "range",
    min: 85,
    max: 100,
    target: "other",
    descriptions: [
      "was brutally slashed by Rivers of Blood",
      "was annihilated by Moonlight Great Sword",
      "was struck by the MOOOOOON",
      "was sliced in half by an energy sword",
    ],
  },

  // 70–84: serious horror / big threats on the target
  {
    type: "range",
    min: 70,
    max: 84,
    target: "other",
    descriptions: [
      "was hunted down by a psychopathic duck",
      "was hunted down by floating lightsabers",
      "was brutally hugged by Huggy Wuggy",
      "was chased down by Bendy",
      "was chased by Slenderman",
      "was chased by Wendigo",
      "was chased by Herobrine",
      "was chased by a giant spider",
      "was chased by Lazael",
      "was chased by a raptor",
    ],
  },

  // 50–69: solid hits / strong monsters, but not top tier
  {
    type: "range",
    min: 50,
    max: 69,
    target: "other",
    descriptions: [
      "was struck by a red shell to the dome",
      "was hit by an ocarina",
      "was hit by a pal ball",
      "was bitten by a mimic",
      "was hit in the face by a flying peeper",
      "was chased by a slime",
      "was chased by a bat slime",
      "was chased by the scout master",
      "was chased by a blue chicken",
    ],
  },

  // 30–49: mid-tier chaos / physical mishaps on the target
  {
    type: "range",
    min: 30,
    max: 49,
    target: "other",
    descriptions: [
      "ate a mushroom and fell down a curb",
      "was hit by a stop sign",
      "had ODM gear thrown at them",
      "had a sleep dart shot at them",
      "was slapped so hard that they woke up from a daze",
    ],
  },

  // 10–29: mild or goofy bad luck on the target
  {
    type: "range",
    min: 10,
    max: 29,
    target: "other",
    descriptions: [
      "was followed by Balloon Boy",
      "had a sack of glitter fall on them",
      "burnt their lip on coffee",
      "was tripped up by the air",
      "was given the middle finger by Dobby",
    ],
  },

  // 1–9: critical failures – attacker whiffs and hurts themselves
  {
    type: "range",
    min: 1,
    max: 9,
    target: "self",
    descriptions: [
      "swung so hard they spun in a circle and fell over",
      "slipped on an imaginary banana peel",
      "managed to hit themselves in the face instead",
      "tripped over their own shoelaces mid-swing",
      "dropped their weapon and stubbed their toe",
    ],
  },
];
