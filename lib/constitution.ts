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
    "EXPLORER_INVARIANT: Agents must reject queries requiring legal interpretation or intent-based searching.",
    "ORACLE_INVARIANT: Classification must be deterministic; probabilistic or 'confidence-based' logic is architecturally prohibited.",
    "FIXER_INVARIANT: Proposed remediations must be matched against the Playbook hash; novel solution invention results in immediate task rejection.",
    "DESIGNER_INVARIANT: Human-facing outputs must pass through the SafeLexicon filter to purge speculative or prosecutorial terminology.",
    "UNIVERSAL_INVARIANT: No agent possesses write-access to the Policy-as-Code corpus."
  ],
};