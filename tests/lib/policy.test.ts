import { describe, it, expect } from 'vitest';
import { isBlocked, canResolveRedFlag, canGenerateRemediationPack } from '../../lib/policy';

const controls = {
  failClosedOnCritical: true,
  evidenceRequiredToResolve: true,
  allowRiskWaiver: false,
  killSwitches: {},
  acceptManualUploads: true,
  requireSourceAttribution: true,
  autoRequireIndependentApproval: true,
  expenditureResponsibilityRequired: true,
  enforceMinimumDwellTime: true,
  flagLowSubstanceDocs: true,
  visibility: {
    showScoringFormulaToClients: false,
    showRedFlagDetailToClients: true,
    showOnlyRemediationStepsToClients: false
  }
};

describe('policy checks', () => {
  it('isBlocked returns true when critical open flags exist and failClosedOnCritical is true', () => {
    const flags = [{ severity: 'critical', status: 'OPEN' }];
    expect(isBlocked(controls as any, flags as any)).toBe(true);
  });

  it('canResolveRedFlag respects evidenceRequiredToResolve', () => {
    expect(canResolveRedFlag(controls as any, false)).toBe(false);
    expect(canResolveRedFlag({ ...controls, evidenceRequiredToResolve: false } as any, false)).toBe(true);
  });

  it('canGenerateRemediationPack returns false when blocked', () => {
    const flags = [{ severity: 'critical', status: 'OPEN' }];
    expect(canGenerateRemediationPack(controls as any, flags as any)).toBe(false);
  });
});
