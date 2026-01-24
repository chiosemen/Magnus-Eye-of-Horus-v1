
import React from 'react';
// FIX: Use lowercase filename for card component to resolve casing conflicts.
import { Card } from '../ui/card.tsx';
import SectionHeader from '../ui/SectionHeader.tsx';
import type { RedFlag } from '../../types.ts';

const taxPreparerFlags: RedFlag[] = [
    { 
        level: 'Critical', 
        category: 'EITC Diligence', 
        trigger: 'Form 8867 missing or incomplete when EITC is claimed.', 
        details: 'Action Required: Completion of Form 8867 is necessary to meet documented diligence requirements under IRC §6695(g) before proceeding.',
        rationale: 'The IRS is statutorily mandated to reduce the high EITC error rate. They view preparer diligence as the primary gatekeeper against improper payments, which are a major source of the national "tax gap."',
        enforcement: 'IRC §6695(g) Preparer Penalties; Circular 230 §10.22; IRS Program 4843 (Paid Preparer Compliance).',
        escalation: '1. Letter 4843C proposing penalty. 2. Full audit of preparer\'s EITC claims. 3. Referral to Office of Professional Responsibility (OPR). 4. Injunction to bar from practice.'
    },
    { 
        level: 'Critical', 
        category: 'PTIN Validity', 
        trigger: 'Preparer PTIN is expired, invalid, or does not match firm records.', 
        details: 'Action Required: All filings must be signed by a preparer with a valid, current PTIN to ensure proper authorization and accountability.',
        rationale: 'An invalid PTIN suggests an unauthorized preparer, which is a primary target of IRS enforcement. It also breaks the chain of accountability for all returns filed under that number.',
        enforcement: 'IRC §6109; IRS Return Preparer Office (RPO) compliance actions.',
        escalation: '1. Rejection of e-filed returns. 2. Penalties for failure to furnish a valid PTIN. 3. Investigation by the RPO for unauthorized practice.'
    },
    { 
        level: 'High Risk', 
        category: 'CTC/ACTC/AOTC Diligence', 
        trigger: 'CTC/ACTC/AOTC claimed without complete Form 8867 Part III.', 
        details: 'Remediation Required: The diligence checklist must be fully completed to provide evidence of meeting legal diligence requirements for these credits.',
        rationale: 'Similar to EITC, these refundable credits have high error rates. The IRS uses Form 8867 completion as the primary evidence that the preparer met their legal diligence requirements.',
        enforcement: 'IRC §6695(g); Circular 230 §10.22.',
        escalation: '1. Penalty assessment letter. 2. Disallowance of credits for client. 3. Preparer audit if a pattern is detected.'
    },
    { 
        level: 'High Risk', 
        category: 'Head of Household Status', 
        trigger: 'HoH status claimed but qualifying child lives with other parent via Form 8332.', 
        details: 'Remediation Required: Review of Form 8332 and custody agreements is necessary to confirm HoH eligibility, which is subject to specific legal tests.',
        rationale: 'HoH status is a frequent source of error and fraud. The IRS uses data matching to identify situations where two taxpayers (e.g., divorced parents) claim benefits for the same child, triggering audits.',
        enforcement: 'IRC §6694 Understatement Penalty; IRS Automated Underreporter (AUR) program.',
        escalation: '1. Client receives CP2000 notice proposing changes. 2. Audit of both parents. 3. Potential penalties for the preparer if their position lacked a reasonable basis.'
    },
    { 
        level: 'Advisory', 
        category: 'EITC Recertification', 
        trigger: 'EITC claimed by taxpayer previously disallowed, Form 8862 not attached.', 
        details: 'Advisory: Confirm if Form 8862 is required for this taxpayer. Attaching the form when required prevents automated processing delays and inquiries.',
        rationale: 'Taxpayers with a prior EITC disallowance are placed in a special scrutiny category. Failure to attach the required recertification form (8862) is a simple administrative error that guarantees an audit.',
        enforcement: 'IRS EITC Compliance Program; Automated processing flags.',
        escalation: '1. Rejection of return or suspension of processing. 2. Math error notice to client. 3. Disallowance of the credit and potential 2-year ban on claiming EITC.'
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
            <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
                        <tr>
                            <th scope="col" className="px-6 py-3 w-[120px]">Classification</th>
                            <th scope="col" className="px-6 py-3 w-1/4">Category</th>
                            <th scope="col" className="px-6 py-3">Details & Enforcement Analysis</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flags.map((flag, index) => (
                            <tr key={index} className="border-b border-gray-700 align-top">
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${levelColor(flag.level)}`}>
                                        {flag.level}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-300">{flag.category}</td>
                                <td className="px-6 py-4">
                                    <p className="font-semibold text-gray-200">{flag.trigger}</p>
                                    <p className="text-gray-400">{flag.details}</p>
                                    
                                    <div className="mt-4 border-t border-gray-700/50 pt-3 text-xs space-y-3">
                                        <div>
                                            <h5 className="font-bold text-gray-300 uppercase tracking-wider">Rationale (Why Regulators Care)</h5>
                                            <p className="text-gray-400 mt-1">{flag.rationale}</p>
                                        </div>
                                         <div>
                                            <h5 className="font-bold text-gray-300 uppercase tracking-wider">Enforcement Vector</h5>
                                            <p className="text-gray-400 font-mono mt-1">{flag.enforcement}</p>
                                        </div>
                                         <div>
                                            <h5 className="font-bold text-gray-300 uppercase tracking-wider">Typical Escalation Path</h5>
                                            <p className="text-gray-400 mt-1">{flag.escalation}</p>
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

const DAFRedFlags = {
    critical: [
        'DAF distribution to individual',
        'Non-qualified grantee without ER',
        'Related-party grant without board recusal',
        'Prior taxable distribution pattern without remediation',
        'Missing governing approvals (board or sponsor)',
        'Sanctions / OFAC match',
    ],
    highRisk: [
        'Repetitive donor-directed grants',
        'Grant clustering to same recipient',
        'Excess influence indicators',
        'Missing or weak ER documentation',
        'Compensation above peer benchmarks',
        'Sponsor override frequency',
    ],
    advisory: [
        'Elevated donor concentration',
        'Fast grant velocity',
        'Unusual mission drift',
        'Minor documentation gaps',
    ],
};

const FlagList: React.FC = () => (
    <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">B. DAF / Nonprofit Red-Flag Taxonomy</h2>
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-red-400">🔴 Critical (Block Execution)</h3>
                <p className="text-sm text-gray-400 mb-2">System must fail-closed.</p>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                    {DAFRedFlags.critical.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </div>
            <div>
                <h3 className="text-lg font-bold text-yellow-400">🟠 High Risk (Mandatory Remediation)</h3>
                <p className="text-sm text-gray-400 mb-2">Human review required.</p>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                    {DAFRedFlags.highRisk.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </div>
            <div>
                <h3 className="text-lg font-bold text-blue-400">🟡 Advisory (Monitor)</h3>
                <p className="text-sm text-gray-400 mb-2">Track & explain.</p>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                    {DAFRedFlags.advisory.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </div>
        </div>
    </Card>
);


const RedFlagTaxonomy: React.FC = () => {
    return (
        <div>
            <SectionHeader title="Governance Taxonomy" subtitle="Pre-defined Categories for Policy Review" />
            <div className="space-y-8">
                <FlagTable flags={taxPreparerFlags} title="A. Tax Preparer Taxonomy" />
                <FlagList />
            </div>
        </div>
    );
};

export default RedFlagTaxonomy;
