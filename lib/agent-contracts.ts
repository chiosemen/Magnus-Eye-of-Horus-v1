/**
 * MAGNUS EYE OF HORUS
 * Agent Contract Layer
 * -------------------
 * Strictly typed interfaces governing the agentic mesh.
 */

export type AgentId =
  | "human"
  | "orchestrator"
  | "explorer"
  | "librarian"
  | "oracle"
  | "fixer"
  | "designer";

export type RiskLevel = "none" | "low" | "medium" | "high" | "critical";

export type Jurisdiction =
  | "federal"
  | "ny"
  | "ca"
  | "multi-state"
  | "daf"
  | "nonprofit";

export interface ExecutionContext {
  sessionId: string;
  jurisdiction: Jurisdiction;
  timestamp: string;
  initiatedBy: AgentId;
  humanApproved: boolean;
}

export interface BaseAgent {
  readonly agentId: AgentId;
  readonly canMutateState: boolean;
  readonly requiresHumanApproval: boolean;
  validateContext(ctx: ExecutionContext): void;
}

export interface RemediationPlan {
  steps: string[];
  blocksExecution: boolean;
  requiresDocumentation: boolean;
  authorityCitations: string[];
}

export interface UISchema {
  warnings: string[];
  togglesVisible: boolean;
  killSwitchVisible: boolean;
  boardSafeCopy: string;
}

export interface AuditPacket {
  id: string;
  index: string[];
  documents: Record<string, string>;
  policyHash: string;
  humanSignature: string;
  discoverySafe: true;
}
