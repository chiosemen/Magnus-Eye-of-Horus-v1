
export const EYE_OF_HORUS_CONSTITUTION = {
  posture: {
    pureRemediationOnly: true,
    noEscalationOutputsExist: true,
    failClosedByDefault: true,
  },
  invariants: [
    "If critical red flags exist, remediation pack generation must be disabled unless leadership waiver is enabled AND a waiver record exists with expiry.",
    "A red flag cannot be marked RESOLVED if evidenceRequiredToResolve is true and no evidence is linked.",
    "All control changes must be logged with owner, reason, timestamp, expiry.",
  ],
};
