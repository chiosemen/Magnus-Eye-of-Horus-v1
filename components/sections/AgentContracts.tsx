
import React from 'react';
// FIX: Use lowercase card.tsx with explicit extension to resolve casing conflicts.
import { Card } from '../ui/card.tsx';
import SectionHeader from '../ui/SectionHeader.tsx';
import { 
    ShieldCheck, 
    ShieldAlert, 
    Code2, 
    UserCircle2, 
    Eye, 
    LogIn, 
    LogOut 
} from 'lucide-react';

interface AgentSpec {
    role: string;
    icon: string;
    description: string;
    inputs: string[];
    outputs: string[];
    forbidden: string[];
    audit: string[];
    code: string;
}

const AGENTS: AgentSpec[] = [
    {
        role: "HUMAN (King ♔)",
        icon: "♔",
        description: "The sole source of strategic intent and final auditable authority.",
        inputs: ["Risk Findings", "Remediation Proposals", "Audit Packets"],
        outputs: ["Strategic Objective", "Final Authorization", "Task Redirection", "Override Logic"],
        forbidden: ["Automated Execution", "Anonymous Decisions", "Policy Modification"],
        audit: [
            "All actions, including directives and final authorizations, are immutably logged with user identity and timestamp.",
            "Override rationales are archived and indexed for external audit review.",
            "Session initialization context is cryptographically signed."
        ],
        code: `export const HumanAgent: AgentContract = {\n  role: "HUMAN",\n  allowedActions: ["DEFINE_OBJECTIVE", "APPROVE_REMEDIATION", "REDIRECT_TASK"],\n  forbiddenActions: ["AUTOMATED_EXECUTION"]\n};`
    },
    {
        role: "ORCHESTRATOR (Queen ♛)",
        icon: "♛",
        description: "System brain responsible for task decomposition, sequencing, and result reconciliation.",
        inputs: ["Human Objectives", "Agent Completion Status", "System Invariants"],
        outputs: ["Task Sequences", "Agent Scheduling", "Consolidated Findings"],
        forbidden: ["Finalize Decision", "Bypass Policy", "Modify Constitution"],
        audit: [
            "Task decomposition logic and sequencing decisions.",
            "Invariant check success/failure status.",
            "Inter-agent communication payload hashes."
        ],
        code: `export const OrchestratorAgent: AgentContract = {\n  role: "ORCHESTRATOR",\n  allowedActions: ["DECOMPOSE_TASK", "SEQUENCE_AGENTS", "ENFORCE_INVARIANTS"],\n  forbiddenActions: ["FINALIZE_DECISION"]\n};`
    },
    {
        role: "EXPLORER (Knight ♞)",
        icon: "♞",
        description: "Data scout that performs pattern discovery and anomaly detection without interpretation.",
        inputs: ["Query Parameters", "Entity Identifiers", "Data Source Map"],
        outputs: ["Raw Fact Sets", "Data Fingerprints", "Pattern Matches"],
        forbidden: ["Risk Classification", "Legal Interpretation", "Intent Assessment"],
        audit: [
            "Raw query parameters and data source identifiers.",
            "Factual extraction counts and data fingerprints.",
            "Access control verification events."
        ],
        code: `// Enforced via Invariant Check\nif (task.requiresInterpretation) throw new BoundaryViolation("Explorer cannot interpret.");`
    },
    {
        role: "LIBRARIAN (Pawn ♟️)",
        icon: "♟️",
        description: "Knowledge steward that fetches statutes and anchors findings to authoritative text.",
        inputs: ["Factual Predicates", "Policy Hashed Repository", "Statutory Versioning"],
        outputs: ["Statutory Citations", "Policy Anchors", "Integrity Attestations"],
        forbidden: ["Interpret Law", "Assess Risk", "Create New Rules"],
        audit: [
            "Policy version hashes and commit identifiers.",
            "Citation mapping accuracy logs.",
            "Authority corpus integrity checks."
        ],
        code: `export const LibrarianAgent: AgentContract = {\n  role: "LIBRARIAN",\n  allowedActions: ["FETCH_STATUTES", "CITE_AUTHORITY"]\n};`
    },
    {
        role: "ORACLE (Bishop ♝)",
        icon: "♝",
        description: "Deterministic logic engine that classifies risk and maps penalties based on static taxonomy.",
        inputs: ["Facts", "Authoritative Citations", "Taxonomy Triggers"],
        outputs: ["Risk Classifications", "Penalty Mappings", "Structural Context Tags"],
        forbidden: ["Remediation Execution", "User Communication", "Confidence Scoring"],
        audit: [
            "Taxonomy mapping outcomes (Boolean/Enum).",
            "Scoring formula variable inputs.",
            "Deterministic path trace for all classifications."
        ],
        code: `// Oracle must return Boolean or Enum. No percentages.\nconst classification = Taxonomy.match(facts);`
    },
    {
        role: "FIXER (Rook ♜)",
        icon: "♜",
        description: "Enforcement agent that identifies and applies pre-approved remediation controls.",
        inputs: ["Risk Classifications", "Remediation Playbooks", "Safety Gates"],
        outputs: ["Control Proposals", "Execution Blocks", "Mandatory Evidence Triggers"],
        forbidden: ["Remove Guardrails", "Override Human", "Invent New Remedies"],
        audit: [
            "Remediation playbook match identifiers.",
            "Control state transition history.",
            "Safety gate status logs."
        ],
        code: `// Must match Playbook hash\nif (!Playbook.v1.includes(action)) throw new SecurityException("Novel remedy forbidden.");`
    },
    {
        role: "DESIGNER (Pawn → Queen ♟️→👸)",
        icon: "👸",
        description: "Presentation governor that renders information for human review using discovery-safe language.",
        inputs: ["Proposed Controls", "SafeLexicon Filter", "Factual Evidence"],
        outputs: ["Board-Safe UI", "Discovery-Proof Summaries", "Remediation Roadmaps"],
        forbidden: ["Enforcement Terminology", "Direct Reporting", "Autonomous Notification"],
        audit: [
            "SafeLexicon filter pass/fail counts.",
            "UI state snapshots for auditable reconstruction.",
            "Discovery-safety attestation records."
        ],
        code: `// SafeLexicon ensures discovery-safety\nconst cleanOutput = SafeLexicon.filter(rawFindings);`
    }
];

const AgentDetail: React.FC<{ agent: AgentSpec }> = ({ agent }) => {
    return (
        <Card className="bg-gray-800/40 border-gray-700/50 mb-8 overflow-hidden">
            <div className="p-6 border-b border-gray-700/50 flex items-center justify-between bg-gray-900/20">
                <div className="flex items-center gap-4">
                    <span className="text-4xl filter drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]">{agent.icon}</span>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">{agent.role}</h3>
                        <p className="text-sm text-muted-foreground font-medium">{agent.description}</p>
                    </div>
                </div>
            </div>
            
            <div className="p-6">
                <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Inputs */}
                    <div className="space-y-4">
                        <dt className="text-[10px] font-black uppercase tracking-[0.15em] text-cyan-400 flex items-center gap-2">
                            <LogIn className="h-3 w-3" />
                            Consumption (Context)
                        </dt>
                        <dd className="space-y-1.5">
                            {agent.inputs.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-[13px] text-gray-300 bg-cyan-500/5 border border-cyan-500/10 px-3 py-1.5 rounded-lg">
                                    <div className="h-1 w-1 rounded-full bg-cyan-500" />
                                    {item}
                                </div>
                            ))}
                        </dd>
                    </div>

                    {/* Outputs */}
                    <div className="space-y-4">
                        <dt className="text-[10px] font-black uppercase tracking-[0.15em] text-green-500 flex items-center gap-2">
                            <LogOut className="h-3 w-3" />
                            Production (Effect)
                        </dt>
                        <dd className="space-y-1.5">
                            {agent.outputs.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-[13px] text-gray-200 bg-green-500/5 border border-green-500/10 px-3 py-1.5 rounded-lg">
                                    <div className="h-1 w-1 rounded-full bg-green-500" />
                                    {item}
                                </div>
                            ))}
                        </dd>
                    </div>

                    {/* Forbidden */}
                    <div className="space-y-4">
                        <dt className="text-[10px] font-black uppercase tracking-[0.15em] text-severity-critical flex items-center gap-2">
                            <ShieldAlert className="h-3 w-3" />
                            Prohibitions
                        </dt>
                        <dd className="space-y-1.5">
                            {agent.forbidden.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-[13px] text-gray-400 bg-red-500/5 border border-red-500/10 px-3 py-1.5 rounded-lg italic">
                                    <div className="h-1 w-1 rounded-full bg-red-500 opacity-50" />
                                    {item}
                                </div>
                            ))}
                        </dd>
                    </div>

                    {/* Audit */}
                    <div className="space-y-4">
                        <dt className="text-[10px] font-black uppercase tracking-[0.15em] text-blue-400 flex items-center gap-2">
                            <Eye className="h-3 w-3" />
                            Audit Ledger
                        </dt>
                        <dd className="space-y-1.5">
                            {agent.audit.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-[10px] text-gray-500 leading-relaxed font-mono">
                                    <span className="text-blue-500 mt-0.5">▸</span>
                                    {item}
                                </div>
                            ))}
                        </dd>
                    </div>
                </dl>

                {/* Code Invariants */}
                <div className="mt-8 pt-6 border-t border-gray-700/50 bg-gray-950/-20 -mx-6 px-6">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                            <Code2 className="h-3 w-3" />
                            Enforced Protocol Invariant
                        </span>
                    </div>
                    <pre className="bg-gray-950/80 p-4 rounded-xl border border-gray-800 text-[12px] font-mono text-cyan-300 overflow-x-auto selection:bg-cyan-500/30">
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
            
            <Card className="bg-accent/5 border-accent/20 p-6 mb-12">
                <div className="flex items-start gap-4">
                    <UserCircle2 className="h-6 w-6 text-accent shrink-0 mt-1" />
                    <div>
                        <h2 className="text-lg font-bold text-white mb-2">The Multi-Agent Orchestration Protocol</h2>
                        <p className="text-sm text-gray-400 leading-relaxed max-w-4xl">
                            Each agent is a bounded context with zero autonomous authority. Every production action is cryptographically 
                            logged and checked against constitutional invariants. If an agent attempts to interpret law 
                            or invent remedies, the Orchestrator triggers an immediate <span className="text-white italic font-bold underline decoration-severity-critical underline-offset-4">fail-closed</span> state.
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
