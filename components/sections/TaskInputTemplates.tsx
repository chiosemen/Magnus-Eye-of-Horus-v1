import React, { useState } from 'react';
// FIX: Standardize casing to Card.tsx to resolve compiler conflict.
import { Card } from '../ui/Card.tsx';
import SectionHeader from '../ui/SectionHeader.tsx';

type Role = 'all' | 'operator' | 'compliance' | 'board';

interface Template {
    id: string;
    title: string;
    description: string;
    roles: Role[];
    template: string;
}

const templates: Template[] = [
    {
        id: 't0', title: 'TEMPLATE 0 — SESSION INITIALIZATION',
        description: 'Use at the start of a work session to establish context.',
        roles: ['all', 'operator', 'compliance', 'board'],
        template: `
SESSION CONTEXT:
• Environment: Local / Sandbox / Production-Sim
• Jurisdiction(s): [Federal / NY / CA / Multi-State / DAF / Nonprofit]
• Entity Type: [PTIN / EIN / DAF Sponsor / Nonprofit Org]
• Audience: [Preparer / Compliance Officer / Board / Counsel]
• Risk Posture: [Conservative / Standard / Heightened]

SESSION OBJECTIVE:
[One sentence. No solutioning.]
`
    },
    {
        id: 't1', title: 'TEMPLATE 1 — DOCUMENT / DATA INGEST (READ-ONLY)',
        description: 'Use when feeding returns, filings, or extracted text.',
        roles: ['operator', 'compliance'],
        template: `
TASK TYPE: Document Analysis (Read-Only)

DOCUMENT TYPE:
[Form 990 / Form 1040 / Form 8867 / DAF Grant Ledger / Internal Policy]

DOCUMENT CONTEXT:
• Filing Year(s):
• Volume (if batch):
• Source (public / internal / redacted):

CONSTRAINTS:
• No enforcement conclusions
• No external reporting artifacts
• Findings only

OBJECTIVE:
Identify risk signals and structural anomalies under Eye of Horus doctrine.
`
    },
    {
        id: 't2', title: 'TEMPLATE 2 — RED-FLAG SCAN',
        description: 'Scan an entity for specific risk signals against the canonical taxonomy.',
        roles: ['operator', 'compliance'],
        template: `
TASK TYPE: Red-Flag Taxonomy Scan

ENTITY IDENTIFIER:
[PTIN ###### / EIN ##-####### / DAF Sponsor Name]

SCOPE:
[Single Year / Multi-Year / Portfolio-Wide]

FOCUS AREAS (select any):
☐ Duplicate identifiers
☐ Missing mandatory forms
☐ Statistical deviation from peer norms
☐ Self-dealing indicators (DAF)

OBJECTIVE:
Classify findings using Eye of Horus red-flag taxonomy and severity levels.
`
    },
    {
        id: 't3', title: 'TEMPLATE 3 — SCORING & EXPOSURE EXPLANATION',
        description: 'Generate and explain a non-predictive risk score in board-safe language.',
        roles: ['compliance', 'board'],
        template: `
TASK TYPE: Explainable Risk Scoring

ENTITY:
[PTIN / EIN / DAF]

REQUEST:
☐ Generate severity-weighted score
☐ Explain drivers of score
☐ Identify expansion risk

OUTPUT CONSTRAINTS:
• Board-safe language
• No probabilistic claims
• Explainability > prediction

OBJECTIVE:
Explain *why* risk exists and *where* it concentrates.
`
    },
    {
        id: 't4', title: 'TEMPLATE 4 — REMEDIATION ROADMAP',
        description: 'Generate a defensible, purely defensive set of actions to fix an issue.',
        roles: ['compliance'],
        template: `
TASK TYPE: Remediation Design

ENTITY:
[PTIN / EIN / DAF]

RISK LEVEL:
[Critical / High / Advisory]

CONSTRAINTS:
• No escalation logic
• No reporting guidance
• Fix-only actions

REQUEST:
☐ Immediate blocking actions
☐ Mandatory remediation steps
☐ Structural controls to prevent recurrence

OBJECTIVE:
Produce a defensible, implementable remediation roadmap.
`
    },
     {
        id: 't7', title: 'TEMPLATE 7 — “WHY THIS IS ALLOWED” JUSTIFICATION',
        description: 'Generate a discovery-safe explanation for boards, auditors, or regulators.',
        roles: ['board', 'compliance'],
        template: `
TASK TYPE: Justification Generator

ACTION / DECISION:
[What is being allowed]

CONTEXT:
[Risk mitigations in place]

CONSTRAINTS:
• No legal advice
• No enforcement framing
• Discovery-safe language

OBJECTIVE:
Explain why this action is defensible under Eye of Horus doctrine.
`
    },
    {
        id: 't8', title: 'TEMPLATE 8 — AUDIT RESPONSE PACKET ASSEMBLY',
        description: 'Assemble a structured, defensive response packet for an inquiry.',
        roles: ['compliance'],
        template: `
TASK TYPE: Audit Response Assembly

NOTICE TYPE:
[IRS / State AG / Internal Review]

ENTITY:
[PTIN / EIN / DAF]

AVAILABLE MATERIALS:
☐ Documentation
☐ Interview records
☐ Internal controls

CONSTRAINTS:
• No submission drafting
• Index + explanation only

OBJECTIVE:
Assemble a structured, defensive response packet outline.
`
    },
    {
        id: 't9', title: 'TEMPLATE 9 — AGENT ROLE SIMULATION',
        description: 'Demonstrate the step-by-step governance flow for training or for board review.',
        roles: ['board', 'compliance'],
        template: `
TASK TYPE: Agentic Flow Simulation

SCENARIO:
[Example risk event]

REQUEST:
Simulate Eye of Horus operational flow step-by-step:
1. Human objective
2. Orchestrator decomposition
3. Explorer findings
4. Oracle risk classification
5. Fixer controls
6. Designer UI output
7. Human decision

OBJECTIVE:
Demonstrate governance, not automation.
`
    },
     {
        id: 't11', title: 'TEMPLATE 11 — SYSTEM SELF-CHECK (SAFETY AUDIT)',
        description: 'Run a constitutional integrity check to ensure the system remains remediation-only.',
        roles: ['compliance'],
        template: `
TASK TYPE: Constitutional Integrity Check

REQUEST:
☐ Identify any dual-use risk
☐ Identify enforcement bleed-through
☐ Identify autonomy violations
☐ Confirm fail-closed posture

OBJECTIVE:
Ensure Eye of Horus remains remediation-only.
`
    },
];

const FilterButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
            active ? 'bg-yellow-500 text-gray-900' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
    >
        {children}
    </button>
);

const TaskInputTemplates: React.FC = () => {
    const [activeRole, setActiveRole] = useState<Role>('all');

    const filteredTemplates = templates.filter(t => t.roles.includes(activeRole));

    return (
        <div>
            <SectionHeader title="Canonical Task-Input Templates" subtitle="The Grandmaster's Move Library for Directing the System" />

            <Card className="mb-8 bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                <p className="text-gray-300">These templates are the structured, safe, and exclusive commands the human operator (the "Grandmaster") uses to direct the Eye of Horus system. They ensure that every interaction is constrained by doctrine, preventing unsafe or out-of-scope requests.</p>
                <div className="mt-4 flex space-x-2">
                    <FilterButton active={activeRole === 'all'} onClick={() => setActiveRole('all')}>All Presets</FilterButton>
                    <FilterButton active={activeRole === 'operator'} onClick={() => setActiveRole('operator')}>Operator</FilterButton>
                    <FilterButton active={activeRole === 'compliance'} onClick={() => setActiveRole('compliance')}>Compliance Officer</FilterButton>
                    <FilterButton active={activeRole === 'board'} onClick={() => setActiveRole('board')}>Board / Counsel</FilterButton>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTemplates.map(template => (
                    <Card key={template.id} className="flex flex-col bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                        <h3 className="font-bold text-white tracking-tight">{template.title}</h3>
                        <p className="text-sm text-gray-400 mb-4">{template.description}</p>
                        <pre className="bg-gray-950/80 text-sm text-cyan-300 p-4 rounded-lg overflow-x-auto h-full flex-grow font-mono selection:bg-cyan-500/30">
                            <code>{template.template.trim()}</code>
                        </pre>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default TaskInputTemplates;