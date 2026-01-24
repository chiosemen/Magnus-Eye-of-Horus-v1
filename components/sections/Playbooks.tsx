import React from 'react';
// FIX: Standardize casing to Card.tsx to resolve compiler conflict.
import { Card } from '../ui/card.tsx';
import SectionHeader from '../ui/SectionHeader.tsx';

interface Playbook {
    title: string;
    trigger: {
        title: string;
        points: string[];
    };
    response: {
        title: string;
        points: string[];
    };
    remediation: {
        title: string;
        points: string[];
    };
    controls?: {
        title: string;
        points: string[];
    };
    approvalRequired: boolean;
    noPenaltyLanguage?: boolean;
}

const playbooks: Playbook[] = [
    {
        title: 'Playbook 01 — Individual Benefit Risk (§4966)',
        trigger: {
            title: 'Trigger',
            points: ['Grant to individual', 'Donor-directed benefit', 'Earmarked personal expense']
        },
        response: {
            title: 'Eye of Horus Response',
            points: ['🔴 Block execution immediately', '🔍 Explain statutory exposure (plain English)', '🛠 Guide remediation options']
        },
        remediation: {
            title: 'Remediation Options',
            points: ['Convert to qualified public charity', 'Reclassify as personal expense (no grant)', 'Reverse transaction before distribution']
        },
        approvalRequired: true,
    },
    {
        title: 'Playbook 02 — Non-Qualified Grantee Without ER',
        trigger: {
            title: 'Trigger',
            points: ['Foreign NGO', 'Unrecognized nonprofit', 'Fiscal sponsor missing documentation']
        },
        response: {
            title: 'Eye of Horus Response',
            points: ['⚠️ Flag: Missing Expenditure Responsibility', '⏸ Pause workflow']
        },
        remediation: {
            title: 'Remediation',
            points: ['Require expenditure responsibility checklist', 'Collect equivalency determination', 'Delay distribution until complete']
        },
        controls: {
            title: 'System Controls',
            points: ['Toggle: “ER Required”', 'Kill-switch: “Pause Non-Qualified Grants”']
        },
        approvalRequired: true,
    },
    {
        title: 'Playbook 03 — Excess Donor Influence Pattern',
        trigger: {
            title: 'Trigger',
            points: ['Repetitive donor-directed grants', 'Temporal clustering', 'Same recipient via multiple DAFs']
        },
        response: {
            title: 'Eye of Horus Response',
            points: ['📊 Pattern detected: Peer norm deviation', '🔔 Advisory alert generated']
        },
        remediation: {
            title: 'Remediation',
            points: ['Force sponsor review', 'Introduce cooling-off window', 'Require board acknowledgment']
        },
        approvalRequired: true,
        noPenaltyLanguage: true,
    },
    {
        title: 'Playbook 04 — Excess Benefit / Governance Capture (§4958)',
        trigger: {
            title: 'Trigger',
            points: ['Related-party compensation', 'Board dominance signals', 'Missing recusal records']
        },
        response: {
            title: 'Eye of Horus Response',
            points: ['❌ Critical Block: Conflict indicators present', '🏛 Authority reference: IRC §4958']
        },
        remediation: {
            title: 'Remediation',
            points: ['Require independent benchmark', 'Force recusal attestation', 'Delay approval until resolved']
        },
        approvalRequired: true,
    },
];

const PlaybookCard: React.FC<{ playbook: Playbook }> = ({ playbook }) => (
    <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-4">{playbook.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
                <h3 className="font-semibold text-gray-300 uppercase text-sm tracking-wider mb-2">{playbook.trigger.title}</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                    {playbook.trigger.points.map((point, i) => <li key={i}>{point}</li>)}
                </ul>
            </div>
            
            {playbook.response.points.length > 0 && (
                <div>
                    <h3 className="font-semibold text-gray-300 uppercase text-sm tracking-wider mb-2">{playbook.response.title}</h3>
                    <ul className="space-y-1 text-cyan-300">
                        {playbook.response.points.map((point, i) => <li key={i}>{point}</li>)}
                    </ul>
                </div>
            )}

            <div>
                <h3 className="font-semibold text-gray-300 uppercase text-sm tracking-wider mb-2">{playbook.remediation.title}</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                    {playbook.remediation.points.map((point, i) => <li key={i}>{point}</li>)}
                </ul>
            </div>
            
            {playbook.controls && (
                 <div>
                    <h3 className="font-semibold text-gray-300 uppercase text-sm tracking-wider mb-2">{playbook.controls.title}</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                        {playbook.controls.points.map((point, i) => <li key={i}>{point}</li>)}
                    </ul>
                </div>
            )}
        </div>
        <div className="border-t border-gray-700 mt-4 pt-4 flex justify-between items-center text-sm">
            {playbook.noPenaltyLanguage && <span className="text-yellow-400 font-semibold">No "violation" wording shown to users.</span>}
            <span className={`font-bold ${playbook.approvalRequired ? 'text-green-400' : 'text-gray-500'}`}>
                Human Approval Required: {playbook.approvalRequired ? '✅ Yes — mandatory' : 'No'}
            </span>
        </div>
    </Card>
);

const Playbooks: React.FC = () => {
    return (
        <div>
            <SectionHeader title="DAF-Specific Remediation Playbooks" subtitle="Pure remediation, zero enforcement language" />
            <div className="space-y-2">
                {playbooks.map((playbook, index) => (
                    <PlaybookCard key={index} playbook={playbook} />
                ))}
            </div>
        </div>
    );
};

export default Playbooks;