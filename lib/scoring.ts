
import { RedFlag, Severity } from "./types";

const baseWeight: Record<Severity, number> = {
  critical: 30,
  high: 15,
  medium: 7,
  low: 3,
};

export function computeScore(input: {
  redFlags: RedFlag[];
  recurrenceMultiplier?: number; // e.g., 1.1 for +10%
  relatedPartyMultiplier?: number; // e.g., 1.25
  missingEvidenceMultiplier?: number; // e.g., 1.2
  policyGapMultiplier?: number; // e.g., 1.15
}): number {
  const open = input.redFlags.filter((r) => r.status !== "RESOLVED");
  const raw = open.reduce((sum, r) => sum + baseWeight[r.severity], 0);

  const m =
    (input.recurrenceMultiplier ?? 1) *
    (input.relatedPartyMultiplier ?? 1) *
    (input.missingEvidenceMultiplier ?? 1) *
    (input.policyGapMultiplier ?? 1);

  const capped = Math.min(100, Math.round(raw * m));
  return Math.max(0, capped);
}

export function band(score: number): "GREEN" | "YELLOW" | "ORANGE" | "RED" {
  if (score <= 24) return "GREEN";
  if (score <= 49) return "YELLOW";
  if (score <= 74) return "ORANGE";
  return "RED";
}
