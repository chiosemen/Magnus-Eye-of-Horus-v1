export type Severity = "critical" | "high" | "medium" | "low";

export type CaseStatus = "OPEN" | "BLOCKED" | "REMEDIATING" | "RESOLVED";

export type RedFlagModule =
  | "DAF-4966-INDIVIDUAL"
  | "DAF-4966-NONQUALIFIED_NO_ER"
  | "DAF-4958-EXCESS_BENEFIT"
  | "GOV-CONFLICT_MISSING"
  | "DOC-MISSING_APPROVALS"
  | "BEH-VELOCITY_ANOMALY"
  | "BEH-LOW_SUBSTANCE"
  | "BEH-SIGNAL_TO_NOISE_OUTLIER";

export interface RedFlag {
  id: string;
  module: RedFlagModule;
  severity: Severity;
  title: string;
  why: string;
  evidenceRequired: string[];
  fixSteps: string[];
  status: "OPEN" | "RESOLVED";
  resolvedAt?: string;
  resolvedBy?: string;
  proofDensity?: number; // 0-100 score of document substance
  dwellTimeSeconds?: number; // How long the user spent on the task
  normativeDwellTime?: number; // Expected time for a diligent human
}

export interface Case {
  id: string;
  sponsorName: string;
  fundName?: string;
  score: number;
  band: "GREEN" | "YELLOW" | "ORANGE" | "RED";
  status: CaseStatus;
  owner: string;
  createdAt: string;
  redFlags: RedFlag[];
}

export interface ControlsState {
  failClosedOnCritical: boolean;
  evidenceRequiredToResolve: boolean;
  allowRiskWaiver: boolean;
  killSwitches: Record<string, { enabled: boolean; reason?: string; expiresAt?: string }>;
  
  // Data Ingestion Rules
  acceptManualUploads: boolean;
  requireSourceAttribution: boolean;

  // Policy Enforcement
  autoRequireIndependentApproval: boolean;
  expenditureResponsibilityRequired: boolean;
  
  // Performative Compliance Gates
  enforceMinimumDwellTime: boolean;
  flagLowSubstanceDocs: boolean;

  visibility: {
    showScoringFormulaToClients: boolean;
    showRedFlagDetailToClients: boolean;
    showOnlyRemediationSteps: boolean;
  };
}