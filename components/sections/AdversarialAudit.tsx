import React from 'react';
// FIX: Use lowercase card.tsx to resolve casing conflicts.
import { Card } from '../ui/card.tsx';
import SectionHeader from '../ui/SectionHeader.tsx';

interface BlindSpot {
    risk: string;
    impact: string;
    change: string;
}

const blindSpots: BlindSpot[] = [
    {
        risk: 'The "Pure Remediation" Doctrine vs. Business Reality',
        impact: 'A hostile regulator subpoenas the pre-SaaS consultancy history (e.g., "guerilla tactics," "Exit Strategy Fee") and argues the "pure remediation" doctrine is a facade for a fundamentally coercive business model, making the system an accessory to extortion.',
        change: 'Introduce a "Data Amnesty & Migration Protocol." The Constitution must define the SaaS as a new entity superseding all prior operational models, with an architectural firewall preventing the migration of any client data from the consultancy phase.'
    },
    {
        risk: 'The Human-in-the-Loop as an Incentivized Adversary',
        impact: 'A plaintiff argues the system is designed to provide a veneer of objectivity for a human operator\'s predatory business practices (e.g., using a "High Risk" finding to justify a coercive fee). The system\'s clean log ("Human approved X") is framed as evidence of a premeditated scheme.',
        change: 'Implement a "Dual-Key Authorization" invariant. High-stakes or punitive-perceived controls must require logged approval from two authorized individuals (e.g., Operator and Compliance Officer), breaking the single point of failure.'
    },
    {
        risk: 'Ambiguity of "Internal Data Store" Provenance',
        impact: 'An opposing counsel argues the data within the "discovery-safe" system is "fruit of the poisonous tree," sourced unethically or coercively before ingestion. The clean internal logs are meaningless if the data\'s origin is tainted.',
        change: 'Add a "Provenance Agent (Scribe)" to the operational flow. This agent\'s sole function is to immutably log the source, timestamp, method of acquisition, and terms of consent for all data entering the internal store, making data provenance fully auditable.'
    },
    {
        risk: 'Underweighting State-Level Regulatory Divergence',
        impact: 'A state Attorney General (e.g., NY, CA) demonstrates that the system\'s "jurisdictional feature flags" are insufficient and that its core logic failed to account for a specific state law (e.g., CTEC rules for preparers), resulting in systemic non-compliance.',
        change: 'Institute a "Jurisdictional Policy Layer" invariant. The Policy-as-Code engine must load a non-overridable policy file specific to the data\'s jurisdiction in addition to the universal base policy, ensuring state-level rules are primary.'
    },
    {
        risk: '"Board-Safe" Language as Intentional Obfuscation',
        impact: 'A journalist frames the system\'s translation of technical flags (e.g., "§4958 Violation") into softer "board-safe" language as a deliberate feature to obfuscate risk and encourage leadership to ignore serious compliance failures. The system is portrayed as "compliance theater."',
        change: 'Implement a "Raw-to-Refined" Audit Log. The system must log both the raw technical trigger and its board-safe translation. Audit packets must be exportable at different verbosity levels, proving that no information is being destroyed or hidden, merely translated for its audience.'
    },
     {
        risk: 'System Misuse for Plausible Deniability',
        impact: 'An adversarial user intentionally runs a known non-compliant item through the system, accepts the "Block Execution" control, and then uses the clean audit log ("System correctly blocked X") as a defense to claim they were acting in good faith while executing the same transaction outside the system.',
        change: 'All "Block Execution" events must be logged to a separate, immutable "Dead File" ledger. This creates a permanent, auditable record of all known non-compliant actions the user attempted, even if they were blocked. This prevents the user from hiding behind the system\'s correct functioning.'
    },
    {
        risk: 'Performative Compliance ("Paper Shield")',
        impact: 'A user games the system by attaching placeholder or template documents to satisfy the "Require Documentation" control, creating a superficial but substantively empty record of compliance. The system is used to manufacture a misleadingly clean file.',
        change: 'Introduce "Proof Density Scoring." The system scores not just the presence of a document, but its substance (e.g., word count vs. policy minimums, presence of key terms). Documents that are suspiciously brief or appear to be unmodified templates are flagged for mandatory human review.'
    }
];

const AdversarialAudit: React.FC = () => {
    return (
        <div>
            <SectionHeader title="Adversarial Audit & Blind Spot Register" subtitle="Identifying and Mitigating Potential System Exploits" />
            <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
                            <tr>
                                <th scope="col" className="px-6 py-3 w-1/4">Identified Risk</th>
                                <th scope="col" className="px-6 py-3 w-1/3">Potential Impact (Hostile Interpretation)</th>
                                <th scope="col" className="px-6 py-3 w-1/3">Required System Change / Mitigation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blindSpots.map((spot, index) => (
                                <tr key={index} className="border-b border-gray-700 align-top">
                                    <td className="px-6 py-4 font-semibold text-gray-200">{spot.risk}</td>
                                    <td className="px-6 py-4 text-red-300/80">{spot.impact}</td>
                                    <td className="px-6 py-4 text-green-300/80">{spot.change}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default AdversarialAudit;