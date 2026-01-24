
import React from 'react';
// FIX: Standardize import casing to use the 'Card.tsx' alias to prevent module resolution conflicts.
import { Card } from '../ui/Card';
import SectionHeader from '../ui/SectionHeader';

interface ThreatModel {
    tactic: string;
    description: string;
    countermeasure: string;
    ui_warning: {
        title: string;
        text: string;
    };
}

const threatModels: ThreatModel[] = [
    {
        tactic: 'Firm-Level Statistical Review (PTIN/EFIN Aggregation)',
        description: 'Regulatory bodies aggregate all filings under a single preparer (PTIN) or firm (EFIN). This creates a statistical profile for each preparer, which is then compared against peer group norms (e.g., other preparers in the same MSA or state). Statistical anomaly detection is then used to flag preparers whose client population exhibits significant deviations—for example, an unusually high percentage of clients claiming Schedule C losses or specific refundable credits. This does not prove wrongdoing, but it serves as a primary, data-driven method for selecting preparers for audit.',
        countermeasure: 'The system ingests anonymized, jurisdiction-specific peer norm data. It maintains a real-time statistical model of the firm\'s own filing portfolio and compares it against these external peer norms. When a new filing would push the firm\'s aggregate profile outside a pre-defined variance threshold (e.g., >2 standard deviations from the peer mean for EITC claims), the system flags it. This allows the firm to identify and either justify or correct potential anomalies before they contribute to a negative regulatory profile.',
        ui_warning: {
            title: 'Governance Advisory: Peer Group Anomaly Detected',
            text: 'This filing\'s Schedule C loss, when added to your firm\'s aggregate data, would place your firm\'s average Schedule C loss significantly outside the peer group norm for your jurisdiction. This is a known statistical flag for regulatory review. Enhanced documentation justifying the loss is strongly advised per firm policy.',
        },
    },
    {
        tactic: 'Peer Group Norm Comparison (Geographic & National)',
        description: 'A preparer\'s aggregate data is compared against jurisdictional and national averages. A firm whose clients claim certain credits or deductions at a rate significantly different from the local peer group average may be selected for a programmatic compliance review.',
        countermeasure: 'The Policy-as-Code Engine ingests jurisdictional data sets that define normative ranges for key items. The system will note filings that are compliant on their own but would move the firm\'s aggregate statistics outside of these peer norms, providing an opportunity for proactive review.',
        ui_warning: {
            title: 'Governance Advisory: Peer Group Deviation',
            text: 'Your firm\'s aggregate EITC claim rate is now 2.5 standard deviations above the state average. This profile is a known factor in regulatory review selection. A firm-wide review of EITC diligence policy and documentation is advised.',
        },
    },
    {
        tactic: 'Inquiry Expansion (Client → Preparer)',
        description: 'A routine inquiry into a single taxpayer filing can be expanded to include the preparer if the reviewing agent observes what they perceive as a lack of documented diligence. This can lead to a broader review of the preparer\'s client list for similar filings.',
        countermeasure: 'The "Proof Density" invariant is the primary governance response. The Audit Response Module is designed to generate a self-contained justification packet for each filing, demonstrating a consistent and robust diligence process, thereby isolating the inquiry to the specific facts of the single filing.',
        ui_warning: {
            title: 'Action Required: Incomplete Diligence Record',
            text: 'Form 8867 is missing from this file. Per policy, filing this return without the completed form creates a direct link between a client inquiry and a preparer-level review. Completion is required to proceed.',
        },
    },
    {
        tactic: 'Compound Penalty Regimes',
        description: 'Statutory frameworks often allow for multiple, distinct penalties to be applied to a single filing error. An issue related to a refundable credit could trigger separate penalty considerations for both the taxpayer and the preparer.',
        countermeasure: 'The Governance Taxonomy and Scoring Framework explicitly model these statutory relationships. The "Structural Interlinkage" feature increases the internal governance score when a single finding implicates multiple, compound penalty regimes, ensuring the matter receives appropriate review priority.',
        ui_warning: {
            title: 'Governance Finding: Compound Policy Implications',
            text: 'This Head of Household filing status, as documented, implicates both taxpayer accuracy policies and preparer understatement policies. The policy considerations are compounded. Mandatory remediation is required per internal procedures.',
        },
    },
];

const AdversaryModeling: React.FC = () => {
    return (
        <div>
            <SectionHeader title="Regulatory Analytics Modeling" subtitle="Translating Public Enforcement Analytics into Internal Governance" />
            <div className="space-y-8">
                {threatModels.map((model, index) => (
                    <Card key={index} className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                        <h2 className="text-xl font-bold text-white mb-2">{model.tactic}</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-gray-300 uppercase text-sm tracking-wider">Regulatory Tactic</h3>
                                <p className="text-gray-400 mt-1">{model.description}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-300 uppercase text-sm tracking-wider">Internal Governance Response</h3>
                                <p className="text-gray-400 mt-1">{model.countermeasure}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-300 uppercase text-sm tracking-wider">Board-Safe UI Notification</h3>
                                 <div className="mt-2 border-l-4 border-yellow-400 bg-yellow-500/10 p-4 rounded-r-lg">
                                    <h4 className="font-bold text-yellow-300">{model.ui_warning.title}</h4>
                                    <p className="text-yellow-200 mt-1">{model.ui_warning.text}</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default AdversaryModeling;