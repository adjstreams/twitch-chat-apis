import { describe, it, expect } from "vitest";
import {
  EXACT_OUTCOMES,
  RANGE_OUTCOMES,
} from "../../../src/routes/attack/outcomes";

describe("attack outcome config", () => {
  it("has no duplicate exact rolls", () => {
    const rolls = EXACT_OUTCOMES.map((o) => o.roll);
    const unique = new Set(rolls);
    expect(unique.size).toBe(rolls.length);
  });

  it("has all exact rolls within 1–100", () => {
    for (const o of EXACT_OUTCOMES) {
      expect(o.roll).toBeGreaterThanOrEqual(1);
      expect(o.roll).toBeLessThanOrEqual(100);
    }
  });

  it("range outcomes have valid bounds and non-empty descriptions", () => {
    for (const band of RANGE_OUTCOMES) {
      expect(band.min).toBeGreaterThanOrEqual(1);
      expect(band.max).toBeLessThanOrEqual(100);
      expect(band.min).toBeLessThanOrEqual(band.max);
      expect(band.descriptions.length).toBeGreaterThan(0);

      for (const desc of band.descriptions) {
        expect(desc.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("range bands do not overlap each other", () => {
    for (let i = 0; i < RANGE_OUTCOMES.length; i++) {
      const a = RANGE_OUTCOMES[i];
      for (let j = i + 1; j < RANGE_OUTCOMES.length; j++) {
        const b = RANGE_OUTCOMES[j];

        const overlaps = a.min <= b.max && b.min <= a.max;
        expect(overlaps).toBe(false);
      }
    }
  });

  it("critical fail band targets self, others target the opponent", () => {
    // Given your current config: 1–9 is self, everything else is 'other'
    const critBand = RANGE_OUTCOMES.find(
      (b) => b.min === 1 && b.max === 9
    );
    expect(critBand).toBeDefined();
    expect(critBand?.target).toBe("self");

    const nonCritBands = RANGE_OUTCOMES.filter(
      (b) => !(b.min === 1 && b.max === 9)
    );
    for (const band of nonCritBands) {
      expect(band.target).toBe("other");
    }
  });

  it("every roll from 1–100 maps to at least one outcome", () => {
    // This checks that: exacts OR ranges will handle any roll.
    for (let roll = 1; roll <= 100; roll++) {
      const hasExact = EXACT_OUTCOMES.some((o) => o.roll === roll);
      const inRange = RANGE_OUTCOMES.some(
        (band) => roll >= band.min && roll <= band.max
      );

      expect(hasExact || inRange).toBe(true);
    }
  });
});
