
import React from 'react';
// FIX: Use lowercase filename for card component to resolve casing conflicts.
import { Card } from '../ui/card.tsx';
import SectionHeader from '../ui/SectionHeader.tsx';
import { ShieldCheck, ShieldAlert, Code2, UserCircle2 } from 'lucide-react';

interface AgentSpec {
    role: string;
    icon: string;
    description: string;
    allowed: string[];
    forbidden: string[];
    code: string;
}

const AGENTS: AgentSpec[] = [
    {
        role: "HUMAN (King ♔)",
        icon: "♔",
        description: "The sole source of strategic intent and final auditable authority.",
        allowed: ["Define Objective", "Approve Remediation", "Redirect Task", "Override with Reason"],
        forbidden: ["Automated Execution", "Anonymous Decisions", "Policy Modification"],
        code: `export const HumanAgent: AgentContract = {\n  role: "HUMAN",\n  allowedActions: ["DEFINE_OBJECTIVE", "APPROVE_REMEDIATION", "REDIRECT_TASK"],\n  forbiddenActions: ["AUTOMATED_EXECUTION"]\n};`
    },
    {
        role: "ORCHESTRATOR (Queen ♛)",
        icon: "♛",
        description: "System brain responsible for task decomposition, sequencing, and result reconciliation.",
        allowed: ["Decompose Task", "Sequence Agents", "Reconcile Outputs", "Enforce Invariants"],
        forbidden: ["Finalize Decision", "Bypass Policy", "Modify Constitution"],
        code: `export const OrchestratorAgent: AgentContract = {\n  role: "ORCHESTRATOR",\n  allowedActions: ["DECOMPOSE_TASK", "SEQUENCE_AGENTS", "ENFORCE_INVARIANTS"],\n  forbiddenActions: ["FINALIZE_DECISION"]\n};`
    },
    {
        role: "EXPLORER (Knight ♞)",
        icon: "♞",
        description: "Data scout that performs pattern discovery and anomaly detection without interpretation.",
        allowed: ["Pattern Discovery", "Anomaly Detection", "Raw Data Retrieval"],
        forbidden: ["Risk Classification", "Legal Interpretation", "Intent Assessment"],
        code: `// Enforced via Invariant Check\nif (task.requiresInterpretation) throw new BoundaryViolation("Explorer cannot interpret.");`
    },
    {
        role: "LIBRARIAN (Pawn ♟️)",
        icon: "♟️",
        description: "Knowledge steward that fetches statutes and anchors findings to authoritative text.",
        allowed: ["Fetch Statutes", "Fetch Guidance", "Cite Authority"],
        forbidden: ["Interpret Law", "Assess Risk", "Create New Rules"],
        code: `export const LibrarianAgent: AgentContract = {\n  role: "LIBRARIAN",\n  allowedActions: ["FETCH_STATUTES", "CITE_AUTHORITY"]\n};`
    },
    {
        role: "ORACLE (Bishop ♝)",
        icon: "♝",
        description: "Deterministic logic engine that classifies risk and maps penalties based on static taxonomy.",
        allowed: ["Classify Risk", "Map Penalties", "Structural Analysis"],
        forbidden: ["Remediation Execution", "User Communication", "Confidence Scoring"],
        code: `// Oracle must return Boolean or Enum. No percentages.\nconst classification = Taxonomy.match(facts);`
    },
    {
        role: "FIXER (Rook ♜)",
        icon: "♜",
        description: "Enforcement agent that identifies and applies pre-approved remediation controls.",
        allowed: ["Apply Controls", "Update Scoring", "Enforce Blocks"],
        forbidden: ["Remove Guardrails", "Override Human", "Invent New Remedies"],
        code: `// Must match Playbook hash\nif (!Playbook.v1.includes(action)) throw new SecurityException("Novel remedy forbidden.");`
    },
    {
        role: "DESIGNER (Pawn → Queen ♟️→👸)",
        icon: "👸",
        description: "Presentation governor that renders information for human review using discovery-safe language.",
        allowed: ["Synthesize Findings", "Apply Board-Safe Filter", "Render UI Controls"],
        forbidden: ["Enforcement Terminology", "Direct Reporting", "Autonomous Notification"],
        code: `// SafeLexicon ensures discovery-safety\nconst cleanOutput = SafeLexicon.filter(rawFindings);`
    }
];

const AgentDetail: React.FC<{ agent: AgentSpec }> = ({ agent }) => {
    return (
        <Card className="bg-gray-800/40 border-gray-700/50 mb-8 overflow-hidden">
            <div className="p-6 border-b border-gray-700/50 flex items-center justify-between bg-gray-900/20">
                <div className="flex items-center gap-4">
                    <span className="text-4xl">{agent.icon}</span>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">{agent.role}</h3>
                        <p className="text-sm text-muted-foreground">{agent.description}</p>
                    </div>
                </div>
            </div>
            <div className="p-6">
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <dt className="text-xs font-black uppercase tracking-widest text-green-500 mb-4 flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4" />
                            Allowed Strategic Actions
                        </dt>
                        <dd className="space-y-2">
                            {agent.allowed.map((action, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-gray-300 bg-green-500/5 border border-green-500/10 px-3 py-1.5 rounded-lg">
                                    <div className="h-1 w-1 rounded-full bg-green-500" />
                                    {action}
                                </div>
                            ))}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-xs font-black uppercase tracking-widest text-severity-critical mb-4 flex items-center gap-2">
                            <ShieldAlert className="h-4 w-4" />
                            Explicitly Forbidden
                        </dt>
                        <dd className="space-y-2">
                            {agent.forbidden.map((action, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-gray-400 bg-red-500/5 border border-red-500/10 px-3 py-1.5 rounded-lg italic">
                                    <div className="h-1 w-1 rounded-full bg-red-500" />
                                    {action}
                                </div>
                            ))}
                        </dd>
                    </div>
                </dl>

                <div className="mt-8 pt-8 border-t border-gray-700/50">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-muted-foreground flex items-center gap-2">
                            <Code2 className="h-3 w-3" />
                            Invariants & Checks
                        </span>
                    </div>
                    <pre className="bg-gray-950/80 p-4 rounded-xl border border-gray-800 text-[13px] font-mono text-cyan-300 overflow-x-auto">
                        <code>{agent.code}</code>
                    </pre>
                </div>
            </div>
        </Card>
    );
};

const AgentContracts: React.FC = () => {
    return (
        <div className="space-y-8 pb-12">
            <SectionHeader 
                title="Formal Agent Contracts" 
                subtitle="High-fidelity definitions of role boundaries and machine-enforced prohibitions." 
            />
            
            <Card className="bg-blue-500/5 border-blue-500/20 p-6 mb-12">
                <div className="flex items-start gap-4">
                    <UserCircle2 className="h-6 w-6 text-blue-400 shrink-0 mt-1" />
                    <div>
                        <h2 className="text-lg font-bold text-white mb-2">The Multi-Agent Orchestration Protocol</h2>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Each agent is a bounded context with zero autonomous authority. Every action is cryptographically 
                            logged and checked against constitutional invariants. If an agent attempts to interpreted law 
                            or invent remedies, the Orchestrator triggers an immediate fail-closed state.
                        </p>
                    </div>
                </div>
            </Card>

            <div className="space-y-2">
                {AGENTS.map((agent, i) => (
                    <AgentDetail key={i} agent={agent} />
                ))}
            </div>
        </div>
    );
};

export default AgentContracts;
