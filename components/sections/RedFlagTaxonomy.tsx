import React from 'react';
// FIX: Standardize casing to Card.tsx to resolve compiler conflict.
import { Card } from '../ui/card.tsx';
import SectionHeader from '../ui/SectionHeader.tsx';
import { Scale, Target } from 'lucide-react';
import type { RedFlag } from '../../types.ts';

const technicalTriggers: RedFlag[] = [
    { 
        level: 'Critical', 
        category: 'RPM Cluster Integrity', 
        trigger: 'PTIN/EFIN mismatch or Un-enrolled signer detected.', 
        details: 'Action Required: Verify PTIN status in RPO Directory. Ghost preparer signals trigger immediate Program 4843 expansion.',
        rationale: 'The IRS RPO uses the RPM (Return Preparer Mapping) system to flag unauthorized practice. Inconsistencies suggest evasion of preparer penalties.',
        enforcement: 'IRC §6695(c) Failure to Furnish PTIN; Injunction under §7407.',
        escalation: '1. RPM Cluster Alert. 2. Full PTIN review. 3. Office of Professional Responsibility (OPR) Referral.'
    },
    { 
        level: 'Critical', 
        category: 'DIF Score Weighting', 
        trigger: 'Schedule C "Round Number" entries or unrealistic COGS ratios.', 
        details: 'Action Required: Attach receipts/bank statements. Returns with high DIF scores are automatically selected for NRP Research Audits.',
        rationale: 'Discriminant Function (DIF) scoring detects multi-field inconsistencies that defy economic norms (e.g., 90% COGS on service revenue).',
        enforcement: 'IRC §6662 Accuracy-Related Penalties; §6694 Preparer Penalties.',
        escalation: '1. Automated Selection. 2. Field Audit. 3. Civil Penalty assessment for "Reckless Disregard".'
    },
    { 
        level: 'High Risk', 
        category: 'MSA Peer Norming', 
        trigger: 'Refundable Credit claims exceed MSA Norm by Z-Score > 1.8.', 
        details: 'Remediation Required: Complete 8867 Part IV with "Independent Interview Notes". High-Z scores trigger Letter 4843C.',
        rationale: 'The IRS compares your firm against all preparers in your ZIP code. Outlier density suggests a "Refund Mill" profile.',
        enforcement: 'Circular 230 §10.22 Diligence Requirements.',
        escalation: '1. Letter 4843C (Outreach). 2. Focused Diligence Audit. 3. PTIN Suspension.'
    },
    { 
        level: 'Advisory', 
        category: 'Velocity Anomaly', 
        trigger: 'Complex 1040 dwell-time < 45 minutes.', 
        details: 'Advisory: Low substance work logged. Increase review time to align with MSA norms for complex filings.',
        rationale: 'Extremely fast filing is used by the IRS as evidence of "Willful Recklessness" under §6694(b) rather than a simple mistake.',
        enforcement: 'Circular 230 §10.22; Evidence of Reckless Disregard.',
        escalation: '1. Behavioral Alert. 2. Mandatory Partner Review. 3. Dwell-Time audit during field inquiry.'
    },
];

const FlagTable: React.FC<{ flags: RedFlag[], title: string }> = ({ flags, title }) => {
    const levelColor = (level: RedFlag['level']) => {
        switch (level) {
            case 'Critical': return 'bg-red-500/10 text-red-400 border-red-500/30';
            case 'High Risk': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
            case 'Advisory': return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
        }
    };
    return (
        <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Target className="h-5 w-5 text-accent" />
                {title}
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
                        <tr>
                            <th scope="col" className="px-6 py-3 w-[120px]">Vector</th>
                            <th scope="col" className="px-6 py-3 w-1/4">IRS Category</th>
                            <th scope="col" className="px-6 py-3">Technical Trigger & Analysis</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flags.map((flag, index) => (
                            <tr key={index} className="border-b border-gray-700 align-top hover:bg-gray-700/20 transition-colors">
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${levelColor(flag.level)}`}>
                                        {flag.level}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-bold text-gray-200">{flag.category}</td>
                                <td className="px-6 py-4">
                                    <p className="font-semibold text-accent mb-1">{flag.trigger}</p>
                                    <p className="text-gray-400 text-xs leading-relaxed mb-4">{flag.details}</p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-700/50 pt-4 text-[11px]">
                                        <div>
                                            <h5 className="font-black text-gray-400 uppercase tracking-tighter mb-1">Adversarial Rationale</h5>
                                            <p className="text-gray-500">{flag.rationale}</p>
                                        </div>
                                         <div>
                                            <h5 className="font-black text-gray-400 uppercase tracking-tighter mb-1">Enforcement Source</h5>
                                            <p className="text-cyan-500/80 font-mono">{flag.enforcement}</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

const RedFlagTaxonomy: React.FC = () => {
    return (
        <div className="space-y-8 pb-12">
            <SectionHeader 
                title="Governance Taxonomy: Regulatory Edition" 
                subtitle="Machine-enforced triggers mapping factual anomalies to specific IRS enforcement project codes." 
            />
            <FlagTable flags={technicalTriggers} title="A. High-Fidelity Analytics Taxonomy" />
            
            <Card className="bg-accent/5 border border-accent/20 p-6 rounded-xl">
                <div className="flex gap-4">
                    <Scale className="h-6 w-6 text-accent shrink-0" />
                    <div>
                        <h3 className="font-bold text-white mb-2">The "Statutory Mirror" Protocol</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Magnus taxonomy does not evaluate "fraud." It evaluates "Mirror Alignment." 
                            If the data suggests an economic pattern that mirrors known IRS audit triggers (e.g., 
                            excessive loss claims in high-income MSAs), the system enforces a <span className="text-white italic">Hard Stop</span> 
                            until contemporaneous evidence is attached. This protocol ensures that every file is "Audit-Ready" 
                            before it is "Submission-Ready."
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default RedFlagTaxonomy;
