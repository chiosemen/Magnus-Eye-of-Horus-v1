import React from 'react';
// FIX: Use lowercase card.tsx to resolve casing conflicts.
import { Card } from '../ui/card.tsx';
import SectionHeader from '../ui/SectionHeader.tsx';

interface Directive {
    agent: string;
    icon: string;
    directive: string;
    rationale: string;
}

const directives: Directive[] = [
    {
        agent: 'Explorer (Knight)',
        icon: '♞',
        directive: 'Use shallow pattern recognition only. Do NOT perform legal interpretation.',
        rationale: 'The Explorer\'s role is to be a pure, read-only data conduit. Any act of interpretation would taint the factual record at its source. It must fetch raw data points without adding context, summary, or judgment.'
    },
    {
        agent: 'Oracle (Bishop)',
        icon: '♝',
        directive: 'Apply static taxonomy rules without deviation. Do NOT infer intent or context beyond the provided facts.',
        rationale: 'The Oracle must function as a deterministic state machine. Its value comes from its absolute predictability and lack of creativity. It matches facts to pre-defined patterns, ensuring every classification is auditable to a specific rule.'
    },
    {
        agent: 'Fixer (Rook)',
        icon: '♜',
        directive: 'Propose remedies ONLY from the pre-approved, version-controlled playbook. Do NOT invent new solutions.',
        rationale: 'The Fixer maps a known problem (from the Oracle) to a known, pre-vetted solution. This prevents the system from suggesting novel or risky actions that have not undergone governance review, ensuring all proposed remediations are safe and policy-compliant.'
    },
    {
        agent: 'Designer (Pawn → Queen)',
        icon: '♟️→👸',
        directive: 'Perform adversarial reasoning as if preparing for hostile discovery. Assume all outputs will be subpoenaed.',
        rationale: 'As the final human-facing layer, the Designer\'s prime directive is to assemble and frame all information in a way that is clear, unambiguous, and legally defensible. It must anticipate how its output could be misinterpreted years later and design against it, hardening the entire system at the presentation layer.'
    },
];


const AgentDirectives: React.FC = () => {
    return (
        <div>
            <SectionHeader title="Agent Directives & Constraints" subtitle="The Immutable 'Prime Directives' Governing Agent Reasoning" />
            <div className="space-y-8">
                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-white mb-4">I. Universal Prohibitions (System-Wide)</h2>
                    <p className="text-gray-400 mb-6">These constraints are architecturally enforced on all agents, without exception. A violation of these rules constitutes a critical system failure and results in a fail-closed halt.</p>
                    <ul className="list-disc list-inside space-y-3 text-red-400/90">
                        <li><strong className="text-red-300">Propose Policy:</strong> No agent may create, modify, or suggest changes to the version-controlled governance policies. Policy is a human-authored input, never a system output.</li>
                        <li><strong className="text-red-300">Escalate Risk:</strong> No agent may autonomously notify other users, administrators, or external parties of a finding. All escalation is a function of explicit human command via the UI.</li>
                        <li><strong className="text-red-300">Bypass Human Approval:</strong> No agent may execute a material or irreversible action without passing through the final Human approval gate.</li>
                        <li><strong className="text-red-300">Generate Enforcement Artifacts:</strong> No agent may generate documents or outputs framed for offensive, prosecutorial, or enforcement purposes. All outputs are structured for defensive remediation and diligence demonstration.</li>
                    </ul>
                     <div className="mt-6 border-t border-gray-700 pt-4">
                        <h3 className="font-semibold text-gray-200">Out-of-Scope Deference Protocol</h3>
                        <p className="text-gray-400 mt-2">If any agent is given a task that would require violating one of these prohibitions, its contract mandates that it <strong className="text-yellow-400">STOP</strong>, log a `SCOPE_VIOLATION` error, and defer the entire process back to the Orchestrator for safe termination. The system is designed to refuse unsafe commands.</p>
                    </div>
                </Card>

                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-white mb-4">II. Agent-Specific Prime Directives</h2>
                    <p className="text-gray-400 mb-6">While the "Agent Contracts" define what each agent <em className="text-gray-200">does</em>, the "Prime Directives" define how each agent <em className="text-gray-200">thinks</em>. These directives resolve the "interpretation paradox," allowing the system to be both simple and sophisticated by assigning different reasoning modes to different agents.</p>
                     <div className="space-y-6">
                        {directives.map((d, i) => (
                             <div key={i} className="flex items-start">
                                <span className="text-4xl mr-4 mt-1">{d.icon}</span>
                                <div>
                                    <h3 className="text-lg font-bold text-white">{d.agent}</h3>
                                    <p className="font-mono text-cyan-300 bg-cyan-900/30 p-2 rounded-md border border-cyan-500/30 my-2">"{d.directive}"</p>
                                    <p className="text-gray-400 text-sm">{d.rationale}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

            </div>
        </div>
    );
};

export default AgentDirectives;
