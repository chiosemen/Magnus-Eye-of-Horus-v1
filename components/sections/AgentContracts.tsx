import React from 'react';
// FIX: Standardize casing to Card.tsx to resolve compiler conflict.
import { Card } from '../ui/Card.tsx';
import SectionHeader from '../ui/SectionHeader.tsx';
import { 
    ShieldCheck, 
    ShieldAlert, 
    Code2, 
    UserCircle2, 
    Eye, 
    LogIn, 
    LogOut,
    Ban
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
        role: "ORCHESTRATOR (Queen Queen)",
        icon: "Queen",
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
        <Card className="bg-card border-white/5 mb-8 overflow-hidden">
            {/* Header Section */}
            <header className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-5">
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                        <span className="text-4xl filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">{agent.icon}</span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-white tracking-tight leading-none uppercase italic">{agent.role}</h3>
                        <p className="text-sm text-muted-foreground font-medium mt-2 max-w-xl">{agent.description}</p>
                    </div>
                </div>
            </header>
            
            <div className="p-8">
                {/* Contract Definition List */}
                <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    
                    {/* Column 1: Inputs (Consumption) */}
                    <section className="space-y-5">
                        <dt className="flex items-center gap-2 group">
                            <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
                                <LogIn className="h-3.5 w-3.5 text-cyan-400" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400/80">Consumption Context</span>
                        </dt>
                        <dd className="space-y-2">
                            {agent.inputs.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-cyan-500/[0.03] border border-cyan-500/10 hover:border-cyan-500/30 transition-all group">
                                    <div className="mt-1.5 h-1 w-1 rounded-full bg-cyan-500 group-hover:scale-125 transition-transform" />
                                    <span className="text-xs font-bold text-gray-300 leading-snug">{item}</span>
                                </div>
                            ))}
                        </dd>
                    </section>

                    {/* Column 2: Outputs (Production) */}
                    <section className="space-y-5">
                        <dt className="flex items-center gap-2 group">
                            <div className="p-1.5 rounded-lg bg-green-500/10 border border-green-500/20 group-hover:bg-green-500/20 transition-colors">
                                <LogOut className="h-3.5 w-3.5 text-green-400" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-400/80">Production Artifacts</span>
                        </dt>
                        <dd className="space-y-2">
                            {agent.outputs.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-green-500/[0.03] border border-green-500/10 hover:border-green-500/30 transition-all group">
                                    <div className="mt-1.5 h-1 w-1 rounded-full bg-green-500 group-hover:scale-125 transition-transform" />
                                    <span className="text-xs font-bold text-gray-200 leading-snug">{item}</span>
                                </div>
                            ))}
                        </dd>
                    </section>

                    {/* Column 3: Prohibitions (Forbidden) */}
                    <section className="space-y-5">
                        <dt className="flex items-center gap-2 group">
                            <div className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 group-hover:bg-red-500/20 transition-colors">
                                <Ban className="h-3.5 w-3.5 text-red-400" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-400/80">Strict Prohibitions</span>
                        </dt>
                        <dd className="space-y-2">
                            {agent.forbidden.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-red-500/[0.03] border border-red-500/10 hover:border-red-500/30 transition-all group">
                                    <ShieldAlert className="mt-0.5 h-3 w-3 text-red-500/60 group-hover:text-red-500 transition-colors" />
                                    <span className="text-xs font-bold text-gray-400 italic leading-snug tracking-tight">{item}</span>
                                </div>
                            ))}
                        </dd>
                    </section>

                    {/* Column 4: Audit Ledger */}
                    <section className="space-y-5">
                        <dt className="flex items-center gap-2 group">
                            <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                                <Eye className="h-3.5 w-3.5 text-blue-400" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400/80">Audit Evidence</span>
                        </dt>
                        <dd className="space-y-4">
                            {agent.audit.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-2 group">
                                    <span className="text-blue-500 font-black text-xs mt-0.5 select-none opacity-50 group-hover:opacity-100">0{idx+1}</span>
                                    <p className="text-[10px] text-muted-foreground leading-relaxed font-mono group-hover:text-gray-300 transition-colors">{item}</p>
                                </div>
                            ))}
                        </dd>
                    </section>
                </dl>

                {/* Code Invariant Footer */}
                <footer className="mt-12 pt-8 border-t border-white/5">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                            <Code2 className="h-4 w-4 text-accent/60" />
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60">Architectural Invariant (Immutable Code)</h4>
                        </div>
                        <div className="px-2 py-0.5 rounded-md bg-accent/5 border border-accent/20">
                            <span className="text-[9px] font-mono text-accent uppercase tracking-widest">Protocol v1.0.4</span>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity blur-lg" />
                        <pre className="relative bg-black/60 p-5 rounded-2xl border border-white/5 text-[12px] font-mono text-cyan-300/90 overflow-x-auto selection:bg-cyan-500/30 backdrop-blur-sm shadow-inner">
                            <code>{agent.code}</code>
                        </pre>
                    </div>
                </footer>
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
            
            <div className="bg-accent/5 border border-accent/20 p-6 rounded-2xl mb-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-accent/10 transition-all" />
                <div className="flex items-start gap-5 relative z-10">
                    <div className="p-3 rounded-xl bg-accent/10 border border-accent/20">
                        <ShieldCheck className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-white mb-2 uppercase italic tracking-tight">The Multi-Agent Orchestration Protocol</h2>
                        <p className="text-sm text-gray-400 leading-relaxed max-w-4xl font-medium">
                            Each agent operates as a <span className="text-white font-bold">Bounded System</span> with zero autonomous authority. Every production action is cryptographically 
                            logged and verified against constitutional invariants by the Orchestrator. Any violation of these role boundaries triggers an immediate 
                            <span className="text-white italic font-bold underline decoration-severity-critical underline-offset-4 ml-1">fail-closed rejection</span>.
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {AGENTS.map((agent, i) => (
                    <AgentDetail key={i} agent={agent} />
                ))}
            </div>
        </div>
    );
};

export default AgentContracts;
