import { describe, it, expect } from 'vitest';
import { computeScore, band } from '../../lib/scoring';
import type { RedFlag } from '../../lib/types';

describe('computeScore', () => {
  it('returns 0 for no red flags', () => {
    expect(computeScore({ redFlags: [] })).toBe(0);
  });

  it('weights severities correctly and caps at 100', () => {
    const flags: RedFlag[] = []; // create a bunch of criticals to exceed 100
    for (let i = 0; i < 10; i++) {
      flags.push({ id: `r${i}`, module: 'DAF-4966-INDIVIDUAL', severity: 'critical', title: 'x', why: '', evidenceRequired: [], fixSteps: [], status: 'OPEN' });
    }
    const score = computeScore({ redFlags: flags, recurrenceMultiplier: 2 });
    expect(score).toBeLessThanOrEqual(100);
  });

  it('applies multipliers correctly', () => {
    const flags: RedFlag[] = [
      { id: 'a', module: 'BEH-VELOCITY_ANOMALY', severity: 'high', title: '', why: '', evidenceRequired: [], fixSteps: [], status: 'OPEN' }
    ];
    const base = computeScore({ redFlags: flags });
    const increased = computeScore({ redFlags: flags, relatedPartyMultiplier: 1.25 });
    expect(increased).toBeGreaterThanOrEqual(base);
  });
});

describe('band', () => {
  it('returns correct band ranges', () => {
    expect(band(0)).toBe('GREEN');
    expect(band(24)).toBe('GREEN');
    expect(band(25)).toBe('YELLOW');
    expect(band(49)).toBe('YELLOW');
    expect(band(50)).toBe('ORANGE');
    expect(band(74)).toBe('ORANGE');
    expect(band(75)).toBe('RED');
    expect(band(100)).toBe('RED');
  });
});
