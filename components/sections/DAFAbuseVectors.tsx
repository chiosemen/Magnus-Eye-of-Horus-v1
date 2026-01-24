
import React from 'react';
// FIX: Standardize import casing to use the 'Card.tsx' alias to prevent module resolution conflicts.
import { Card } from '../ui/Card';
import SectionHeader from '../ui/SectionHeader';

interface AbuseVector {
    vector: string;
    description: string;
    redFlagTrigger: string;
    scoringImpact: string;
    remediationControl: string;
}

const abuseVectors: AbuseVector[] = [
    {
        vector: 'Impermissible Donor Control / Pre-existing Pledge',
        description: 'A donor uses a DAF grant recommendation to satisfy a legally binding personal pledge, effectively receiving a double tax benefit. This is a primary focus of IRS scrutiny.',
        redFlagTrigger: 'High Risk: "Donor Control / Pre-existing Pledge" - Triggered by keyword analysis of grant text (e.g., "pledge," "fulfill my commitment") or pattern matching.',
        scoringImpact: 'Base Score: 50. Multiplier: 2.0x if donor certification is missing. Total Score: 100.',
        remediationControl: 'Fixer proposes "Require Documentation." This gates the grant until the donor signs a legally binding certification stating the grant does not fulfill a pre-existing pledge.'
    },
    {
        vector: 'Excess Benefit Transaction (More-than-Incidental Benefit)',
        description: 'A DAF grant results in a tangible economic benefit flowing back to the donor (e.g., paying for their child\'s school tuition, tickets to a gala).',
        redFlagTrigger: 'Critical: "Self-Dealing (4941/4958)" - Triggered if grantee is a school attended by a DP\'s family, or if grant notes mention tangible benefits like event tickets.',
        scoringImpact: 'Base Score: 100. Multiplier: 1.5x (High Interlinkage with Donor Control). Total Score: 150.',
        remediationControl: 'Fixer proposes "Block Execution." The transaction is halted and requires manual review and potential restructuring by a compliance officer.'
    },
    {
        vector: 'Improper Distributions (Non-Charitable Purposes)',
        description: 'A grant is recommended to an entity that is not a qualified public charity (e.g., a political campaign, a for-profit company) without following Expenditure Responsibility (ER) rules.',
        redFlagTrigger: 'Critical: "Taxable Expenditure (4945/4966)" - Triggered if the Explorer agent cannot validate the grantee\'s 501(c)(3) status in the IRS database.',
        scoringImpact: 'Base Score: 100. Multiplier: N/A. Total Score: 100.',
        remediationControl: 'Fixer proposes two options: 1) "Block Execution" or 2) "Initiate Expenditure Responsibility," which gates the grant pending completion of the required ER diligence checklist.'
    },
    {
        vector: 'Vendor / Board Member Self-Dealing',
        description: 'A grant is made to an organization that will then pay a board member or their company for services, or a grant is paid directly to a disqualified person.',
        redFlagTrigger: 'Critical: "Self-Dealing (4941/4958)" - Triggered when Explorer finds that a grantee\'s CEO or a listed vendor is also on the foundation\'s list of disqualified persons.',
        scoringImpact: 'Base Score: 100. Multiplier: 2.0x (Doc Missing - No recusal proof). Total Score: 200.',
        remediationControl: 'Fixer proposes "Block Execution" and "Mandate Second Review." This requires a compliance officer to verify that the foundation\'s Conflict of Interest policy was followed and that the board member properly recused themselves.'
    },
    {
        vector: 'Fiscal Sponsorship Misclassification',
        description: 'A grant is made to a fiscal sponsor for a project, but the proper legal relationship (e.g., "Model A" vs "Model C") is not documented, creating risk for the grantor foundation if the funds are misused.',
        redFlagTrigger: 'Advisory: "Board Governance" - Triggered when a grantee is identified as a fiscal sponsor but no signed fiscal sponsorship agreement is attached.',
        scoringImpact: 'Base Score: 10. Multiplier: 2.0x (Doc Missing). Total Score: 20.',
        remediationControl: 'Fixer proposes "Require Documentation." This gates the grant until a valid fiscal sponsorship agreement is uploaded and its key terms are validated by the system.'
    },
];

const DAFAbuseVectors: React.FC = () => {
    return (
        <div>
            <SectionHeader title="DAF Abuse Vector Analysis" subtitle="Mapping Known Threats to System Controls" />
            <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
                            <tr>
                                <th scope="col" className="px-6 py-3 w-1/4">Abuse Vector</th>
                                <th scope="col" className="px-6 py-3 w-3/4">System Response (Flag → Score → Control)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {abuseVectors.map((vector, index) => (
                                <tr key={index} className="border-b border-gray-700 align-top">
                                    <td className="px-6 py-4">
                                        <p className="font-semibold text-white">{vector.vector}</p>
                                        <p className="text-gray-400 mt-1 text-xs">{vector.description}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-3">
                                            <div>
                                                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">1. Red Flag Triggered</h4>
                                                <p className="text-gray-300 mt-1 font-mono text-xs bg-gray-900 p-2 rounded">{vector.redFlagTrigger}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">2. Scoring Impact</h4>
                                                <p className="text-gray-300 mt-1 font-mono text-xs bg-gray-900 p-2 rounded">{vector.scoringImpact}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">3. Required Remediation</h4>
                                                <p className="text-cyan-300/90 mt-1 font-mono text-xs bg-cyan-900/20 p-2 rounded border border-cyan-500/30">{vector.remediationControl}</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default DAFAbuseVectors;