import React from 'react';
// FIX: Standardize casing to Card.tsx to resolve compiler conflict.
import { Card } from '../ui/Card.tsx';
import SectionHeader from '../ui/SectionHeader.tsx';
import { 
    ShieldCheck, 
    ShieldAlert, 
    Code2, 
    Eye, 
    LogIn, 
    LogOut,
    Ban,
    FileSearch
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
            "Directives and final authorizations logged with immutable user identity.",
            "Override rationales archived for external audit review.",
            "Session initialization context cryptographically signed."
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
        role: "DESIGNER (UI Translator 👸)",
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
        <Card className="bg-[#0F1522] border-white/5 mb-10 overflow-hidden shadow-2xl">
            {/* Component Header */}
            <div className="p-8 border-b border-white/5 bg-white/[0.01] flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-5xl filter drop-shadow-[0_0_12px_rgba(212,175,55,0.3)]">
                    {agent.icon}
                </div>
                <div className="text-center md:text-left flex-1">
                    <h3 className="text-3xl font-black text-white tracking-tighter uppercase italic">{agent.role}</h3>
                    <p className="text-muted-foreground font-medium mt-2 max-w-2xl text-lg leading-snug">
                        {agent.description}
                    </p>
                </div>
            </div>
            
            <div className="p-8">
                {/* Formal Definition List */}
                <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10">
                    
                    {/* Column 1: Ingestion */}
                    <div className="space-y-4">
                        <dt className="flex items-center gap-2 group">
                            <div className="p-2 rounded-lg bg-signal-blue/10 border border-signal-blue/20">
                                <LogIn className="h-4 w-4 text-signal-blue" />
                            </div>
                            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-signal-blue/80">Ingestion Path</span>
                        </dt>
                        <dd className="space-y-2">
                            {agent.inputs.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-signal-blue/[0.03] border border-signal-blue/10">
                                    <div className="mt-1.5 h-1 w-1 rounded-full bg-signal-blue shadow-[0_0_4px_#4C6FFF]" />
                                    <span className="text-xs font-bold text-gray-300">{item}</span>
                                </div>
                            ))}
                        </dd>
                    </div>

                    {/* Column 2: Production */}
                    <div className="space-y-4">
                        <dt className="flex items-center gap-2 group">
                            <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                                <LogOut className="h-4 w-4 text-green-400" />
                            </div>
                            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-green-400/80">Production Artifacts</span>
                        </dt>
                        <dd className="space-y-2">
                            {agent.outputs.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-green-500/[0.03] border border-green-500/10">
                                    <div className="mt-1.5 h-1 w-1 rounded-full bg-green-400 shadow-[0_0_4px_#22C55E]" />
                                    <span className="text-xs font-bold text-gray-200">{item}</span>
                                </div>
                            ))}
                        </dd>
                    </div>

                    {/* Column 3: Prohibitions */}
                    <div className="space-y-4">
                        <dt className="flex items-center gap-2 group">
                            <div className="p-2 rounded-lg bg-severity-critical/10 border border-severity-critical/20">
                                <Ban className="h-4 w-4 text-severity-critical" />
                            </div>
                            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-severity-critical/80">Strict Prohibitions</span>
                        </dt>
                        <dd className="space-y-2">
                            {agent.forbidden.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-severity-critical/[0.03] border border-severity-critical/10 group">
                                    <ShieldAlert className="mt-0.5 h-3.5 w-3.5 text-severity-critical/60 group-hover:text-severity-critical transition-colors" />
                                    <span className="text-xs font-bold text-gray-400 italic tracking-tight">{item}</span>
                                </div>
                            ))}
                        </dd>
                    </div>

                    {/* Column 4: Audit Triggers */}
                    <div className="space-y-4">
                        <dt className="flex items-center gap-2 group">
                            <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                                <Eye className="h-4 w-4 text-accent" />
                            </div>
                            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-accent/80">Audit Traces</span>
                        </dt>
                        <dd className="space-y-3">
                            {agent.audit.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <span className="text-accent font-black text-[10px] mt-0.5 select-none opacity-40">0{idx+1}</span>
                                    <p className="text-[11px] text-muted-foreground leading-relaxed font-medium group-hover:text-gray-300 transition-colors">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </dd>
                    </div>
                </dl>

                {/* Technical Implementation Footer */}
                <div className="mt-12 pt-8 border-t border-white/5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Code2 className="h-4 w-4 text-accent/50" />
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/60">Constitutional Invariant Code</h4>
                        </div>
                        <div className="px-2 py-0.5 rounded-md bg-accent/5 border border-accent/10">
                            <span className="text-[9px] font-mono text-accent uppercase tracking-widest">v1.0.4 - HASH: {Math.random().toString(16).slice(2, 8)}</span>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute top-3 right-3">
                            <FileSearch className="h-4 w-4 text-white/10" />
                        </div>
                        <pre className="bg-black/60 p-6 rounded-2xl border border-white/5 text-[12px] font-mono text-cyan-300/80 overflow-x-auto shadow-inner backdrop-blur-xl">
                            <code>{agent.code}</code>
                        </pre>
                    </div>
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
                subtitle="Deterministic role definitions and machine-enforced operational boundaries." 
            />
            
            <div className="bg-accent/5 border border-accent/20 p-8 rounded-2xl mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] rounded-full -mr-32 -mt-32" />
                <div className="flex items-start gap-6 relative z-10">
                    <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                        <ShieldCheck className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-white mb-3 uppercase italic tracking-tight">The Boundary Invariant Protocol</h2>
                        <p className="text-gray-400 leading-relaxed max-w-4xl text-lg font-medium">
                            Each agent operates as a <span className="text-white font-black underline decoration-accent/50 underline-offset-4">Bounded System</span> with zero autonomous authority. 
                            Inter-agent communication is strictly sequenced and cryptographically logged. Any breach of these contracts triggers an immediate 
                            <span className="text-severity-critical italic font-black ml-1 uppercase tracking-tighter">fail-closed execution halt.</span>
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
