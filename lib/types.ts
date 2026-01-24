
export type Severity = "critical" | "high" | "medium" | "low";

export type CaseStatus = "OPEN" | "BLOCKED" | "REMEDIATING" | "RESOLVED";

export type RedFlagModule =
  | "DAF-4966-INDIVIDUAL"
  | "DAF-4966-NONQUALIFIED_NO_ER"
  | "DAF-4958-EXCESS_BENEFIT"
  | "GOV-CONFLICT_MISSING"
  | "DOC-MISSING_APPROVALS";

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
  allowRiskWaiver: boolean; // default false
  killSwitches: Record<string, { enabled: boolean; reason?: string; expiresAt?: string }>;
  visibility: {
    showScoringFormulaToClients: boolean;
    showRedFlagDetailToClients: boolean;
  };
}
