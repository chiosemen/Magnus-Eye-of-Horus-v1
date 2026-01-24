
import React from 'react';
// FIX: Standardize import casing to use the 'Card.tsx' alias to prevent module resolution conflicts.
import { Card } from '../ui/Card';
import SectionHeader from '../ui/SectionHeader';

const CodeBlock: React.FC<{ title: string; children: string; lang?: string }> = ({ title, children, lang = 'typescript' }) => (
    <div className="mb-6">
        <h3 className="text-lg font-bold text-white mb-2 flex items-center">{title}</h3>
        <pre className="bg-gray-900 text-sm text-cyan-300 p-4 rounded-lg overflow-x-auto border border-gray-700">
            <code className={`language-${lang}`}>
                {children.trim()}
            </code>
        </pre>
    </div>
);

const agentContracts = {
    core: `
// agents/contract.ts

export type AgentRole =
  | "HUMAN"
  | "ORCHESTRATOR"
  | "EXPLORER"
  | "LIBRARIAN"
  | "ORACLE"
  | "FIXER"
  | "DESIGNER";

export interface AgentContext {
  objectiveId: string;
  nonprofitEntityId: string;
  jurisdiction: "IRS" | "STATE_AG";
  constraints: string[];
}

export interface AgentInput {
  context: AgentContext;
  payload: unknown;
}

export interface AgentOutput {
  findings?: unknown;
  recommendations?: unknown;
  artifacts?: unknown;
  requiresHumanApproval: boolean;
}

export interface AgentContract {
  role: AgentRole;
  allowedActions: string[];
  forbiddenActions: string[];
  execute(input: AgentInput): Promise<AgentOutput>;
}
    `,
    human: `
export const HumanAgent: AgentContract = {
  role: "HUMAN",
  allowedActions: [
    "DEFINE_OBJECTIVE",
    "APPROVE_REMEDIATION",
    "REDIRECT_TASK",
    "OVERRIDE_WITH_REASON"
  ],
  forbiddenActions: [
    "AUTOMATED_EXECUTION"
  ],
  async execute(input) {
    return {
      requiresHumanApproval: false
    };
  }
};
    `,
    orchestrator: `
export const OrchestratorAgent: AgentContract = {
  role: "ORCHESTRATOR",
  allowedActions: [
    "DECOMPOSE_TASK",
    "SEQUENCE_AGENTS",
    "RECONCILE_OUTPUTS"
  ],
  forbiddenActions: [
    "FINALIZE_DECISION",
    "BYPASS_POLICY"
  ],
  async execute(input) {
    return {
      findings: "Task graph created",
      requiresHumanApproval: false
    };
  }
};
    `,
    explorer: `
export const ExplorerAgent: AgentContract = {
  role: "EXPLORER",
  allowedActions: [
    "PATTERN_DISCOVERY",
    "ANOMALY_DETECTION"
  ],
  forbiddenActions: [
    "RISK_CLASSIFICATION",
    "CONTROL_CHANGES"
  ],
  async execute(input) {
    return {
      findings: "Detected grant clustering and donor influence signals",
      requiresHumanApproval: false
    };
  }
};
    `,
    librarian: `
export const LibrarianAgent: AgentContract = {
  role: "LIBRARIAN",
  allowedActions: [
    "FETCH_STATUTES",
    "FETCH_GUIDANCE",
    "CITE_AUTHORITY"
  ],
  forbiddenActions: [
    "INTERPRET_LAW",
    "ASSESS_RISK"
  ],
  async execute(input) {
    return {
      artifacts: ["IRC §4966", "Treas. Reg. 53.4966"],
      requiresHumanApproval: false
    };
  }
};
    `,
    oracle: `
export const OracleAgent: AgentContract = {
  role: "ORACLE",
  allowedActions: [
    "CLASSIFY_RISK",
    "MAP_PENALTIES",
    "ASSESS_EXPANSION_PROBABILITY"
  ],
  forbiddenActions: [
    "REMEDIATION_EXECUTION",
    "USER_COMMUNICATION"
  ],
  async execute(input) {
    return {
      recommendations: "High likelihood of §4966 exposure if unremediated",
      requiresHumanApproval: true
    };
  }
};
    `,
    fixer: `
export const FixerAgent: AgentContract = {
  role: "FIXER",
  allowedActions: [
    "APPLY_CONTROLS",
    "UPDATE_SCORING",
    "ENFORCE_BLOCKS"
  ],
  forbiddenActions: [
    "REMOVE_GUARDRAILS",
    "OVERRIDE_HUMAN"
  ],
  async execute(input) {
    return {
      artifacts: "Controls enforced; unsafe grants blocked",
      requiresHumanApproval: true
    };
  }
};
    `,
    designer: `
export const DesignerAgent: AgentContract = {
  role: "DESIGNER",
  allowedActions: [
    "PRESENT_WARNINGS",
    "GENERATE_EXPLAINABLE_UI"
  ],
  forbiddenActions: [
    "HIDE_RISK",
    "DARK_PATTERNS"
  ],
  async execute(input) {
    return {
      artifacts: "Board-facing remediation dashboard updated",
      requiresHumanApproval: false
    };
  }
};
    `,
    invariants: `
export const EYE_OF_HORUS_INVARIANTS = [
  "No agent may generate IRS submissions",
  "No agent may escalate externally",
  "Critical flags must block execution",
  "All irreversible actions require human approval",
  "All overrides require reason + expiry",
  "Fail-closed is default"
];
    `
};

const AgentContracts: React.FC = () => {
    return (
        <div>
            <SectionHeader title="Formal Agent Contracts — As Code" subtitle="Production-grade agent contract specifications, enforceable by policy and auditable." />
            <div className="space-y-8">
                {/* FIX: Apply explicit styling to Card component to match original design after component consolidation. */}
                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <CodeBlock title="1. Core Agent Contract (TypeScript)">{agentContracts.core}</CodeBlock>
                    <CodeBlock title="2. Human (King ♔)">{agentContracts.human}</CodeBlock>
                    <CodeBlock title="3. Orchestrator (Queen ♛)">{agentContracts.orchestrator}</CodeBlock>
                    <CodeBlock title="4. Explorer (Knight ♞)">{agentContracts.explorer}</CodeBlock>
                    <CodeBlock title="5. Librarian (Pawn ♟️)">{agentContracts.librarian}</CodeBlock>
                    <CodeBlock title="6. Oracle (Bishop ♝)">{agentContracts.oracle}</CodeBlock>
                    <CodeBlock title="7. Fixer (Rook ♜)">{agentContracts.fixer}</CodeBlock>
                    <CodeBlock title="8. Designer (Pawn → Queen ♟️→👸)">{agentContracts.designer}</CodeBlock>
                </Card>
                {/* FIX: Apply explicit styling to Card component to match original design after component consolidation. */}
                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <CodeBlock title="9. Hard Constitutional Invariants (Machine-Enforced)">{agentContracts.invariants}</CodeBlock>
                </Card>
            </div>
        </div>
    );
};

export default AgentContracts;