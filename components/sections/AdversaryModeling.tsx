
import React from 'react';
// FIX: Use lowercase filename for card component to resolve casing conflicts.
import { Card } from '../ui/card.tsx';
import SectionHeader from '../ui/SectionHeader.tsx';
import { ShieldAlert, Binary, Network, Coins, Zap } from 'lucide-react';

interface ThreatModel {
    id: string;
    tactic: string;
    description: string;
    irsLogic: string;
    countermeasure: string;
    icon: React.ReactNode;
    ui_warning: {
        title: string;
        text: string;
        code: string;
    };
}

const threatModels: ThreatModel[] = [
    {
        id: 'PTIN-AGG',
        tactic: 'PTIN/EFIN Cluster Aggregation (RPO Analytics)',
        icon: <Binary className="h-6 w-6 text-accent" />,
        description: 'The IRS Return Preparer Office (RPO) clusters all returns by PTIN and EFIN. They calculate a "weighted error rate" across your entire portfolio. A single high-risk return is a data point; a pattern across 15% of your volume is a trigger.',
        irsLogic: 'The IRS uses the Return Preparer Mapping (RPM) system to visualize relationships between preparers, firms, and non-compliant clusters. They look for "ghost preparers" and EFIN-PTIN mismatches as primary fraud markers.',
        countermeasure: 'Magnus simulates this aggregation in the Vault. We calculate your firm-wide "Diligence Scorecard" daily. If any specific credit type (e.g., EITC, CTC) exceeds a 10% deviation from your historical baseline, the Fixer blocks new filings until a cross-portfolio sample is audited internally.',
        ui_warning: {
            title: 'Critical Aggregate Trigger: PTIN Error Density',
            text: 'Systemic pattern detected: 14% of current season filings for PTIN [REDACTED] exhibit similar Schedule C "COGS-to-Revenue" ratios. This profile is flagged as an RPO cluster target.',
            code: 'IRS-RPO-LOGIC-4402'
        },
    },
    {
        id: 'Z-SCORE',
        tactic: 'Geographic Peer Norming (The Z-Score Model)',
        icon: <Zap className="h-6 w-6 text-accent" />,
        description: 'IRS analytics compare your firm against all other preparers in your ZIP code and MSA. They look for "Outlier Density" in refundable credits and itemized deductions.',
        irsLogic: 'Discriminant Function (DIF) scoring is supplemented by the "National Research Program" (NRP) data. If your average EITC claim is 2.4 standard deviations (Z-score > 2) above the local peer mean, you are automatically prioritized for Letter 4843C.',
        countermeasure: 'The Explorer agent maintains a jurisdictional "Peer Norm Index." The Oracle calculates a Z-score for every return. Returns with Z > 1.5 trigger "Mandatory Substance Substantiation" (Hold-to-Confirm) to ensure proof density is sufficient for an inevitable audit.',
        ui_warning: {
            title: 'Advisory: Peer Norm Deviation (Z-Score > 2.0)',
            text: 'This return exceeds the jurisdictional norm for EITC claims by 2.2 standard deviations. Peer group selection for Program 4843 is highly probable.',
            code: 'IRS-ANALYTIC-NORM-ALPHA'
        },
    },
    {
        id: 'EXPANSION',
        tactic: 'Network Inquiry Expansion (Project 4843)',
        icon: <Network className="h-6 w-6 text-accent" />,
        description: 'The IRS rarely audits preparers directly first. They audit 3-5 clients. If those audits find a "lack of documented diligence" (Circular 230 §10.22), they expand the inquiry to your entire client list for the last 3 years.',
        irsLogic: 'The IRS uses "Automatic Underreporter" (AUR) triggers at the client level to build a case for an IRC §6695(g) penalty project. Once "preparer error" is confirmed in a sample, the project converts to a Full Preparer Office Examination.',
        countermeasure: 'Magnus enforces a "Diligence Firewall." Every return must have a completed Form 8867 + Magnus-specific "Diligence Interview Log." By maximizing contemporaneous proof, we prevent a client audit from providing the "cause" for a preparer-level expansion.',
        ui_warning: {
            title: 'Expansion Risk: Diligence Loop Incomplete',
            text: 'Client AUR flag detected. Without a Magnus-signed "Diligence Certification" on file, this inquiry has a 68% probability of expanding to a full PTIN review per Project 4843 logic.',
            code: 'IRS-PROJECT-4843-PROXIMITY'
        },
    },
    {
        id: 'STACKING',
        tactic: 'Penalty Stacking & Civil Penalty Hierarchy',
        icon: <Coins className="h-6 w-6 text-accent" />,
        description: 'IRS agents are trained to stack penalties. A single mistake triggers §6694(a) (unreasonable position), which is then escalated to §6694(b) (willful/reckless) if documentation is missing, potentially leading to §6701 (aiding/abetting).',
        irsLogic: 'The "Civil Penalty Approval Process" requires managers to look for evidence of "reckless disregard." Silence in the file (missing notes) is treated as evidence of disregard, not just a mistake.',
        countermeasure: 'The Fixer forces "Reasonable Basis" documentation for any position with <50% chance of success. This architectural friction ensures that even if a position is disallowed, the "reckless" charge (§6694(b)) cannot stick because the contemporaneous file proves intent to comply.',
        ui_warning: {
            title: 'Critical: Penalty Stacking Potential',
            text: 'Position lacks "Substantial Authority." Without a signed §6662 disclosure, this return is eligible for §6694(b) stacking ($5,000+ per return). Execution blocked.',
            code: 'IRC-PENALTY-STACK-V1'
        },
    },
];

const AdversaryModeling: React.FC = () => {
    return (
        <div className="pb-12">
            <SectionHeader 
                title="IRS Analytics & Adversary Modeling" 
                subtitle="High-fidelity translation of RPO and Earned Income Tax Credit (EITC) Compliance Program mechanics." 
            />

            <div className="grid grid-cols-1 gap-8">
                {threatModels.map((model) => (
                    <Card key={model.id} className="bg-gray-800/40 border-gray-700/50 overflow-hidden">
                        <div className="p-6 border-b border-gray-700/50 flex items-center justify-between bg-gray-900/40">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-accent/10 rounded-xl border border-accent/20">
                                    {model.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white tracking-tight">{model.tactic}</h3>
                                    <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest mt-1">Ref: {model.id}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-gray-700/30">
                            <div className="bg-gray-900/20 p-6 space-y-6">
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3">Tactic Description</h4>
                                    <p className="text-sm text-gray-300 leading-relaxed">{model.description}</p>
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-severity-high mb-3 flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-severity-high animate-pulse" />
                                        IRS Engine Logic (The Adversary's Move)
                                    </h4>
                                    <div className="bg-black/40 p-4 rounded-xl border border-severity-high/10">
                                        <p className="text-sm text-gray-400 italic">"{model.irsLogic}"</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-900/40 p-6 space-y-6">
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500 mb-3 flex items-center gap-2">
                                        <ShieldAlert className="h-3 w-3" />
                                        Eye of Horus Countermeasure
                                    </h4>
                                    <p className="text-sm text-gray-300 leading-relaxed">{model.countermeasure}</p>
                                </div>

                                <div className="pt-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-3">Deterministic UI Warning</h4>
                                    <div className="p-4 rounded-xl border-l-4 border-l-accent bg-accent/5 border border-accent/20">
                                        <div className="flex justify-between items-start mb-2">
                                            <h5 className="font-bold text-sm text-white">{model.ui_warning.title}</h5>
                                            <span className="text-[9px] font-mono text-accent/60">{model.ui_warning.code}</span>
                                        </div>
                                        <p className="text-xs text-gray-400 leading-normal">{model.ui_warning.text}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <Card className="mt-12 bg-severity-critical/5 border-severity-critical/20 p-8 text-center">
                <h3 className="text-lg font-bold text-white mb-3">Adversarial Integrity Statement</h3>
                <p className="text-sm text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    This model is built upon public IRS enforcement data, Program 4843 guidance, and Return Preparer Office (RPO) 
                    strategic reports. It is a <span className="text-white font-bold">non-predictive diagnostic tool</span>. 
                    The system identifies structural similarities between your filings and known IRS analytical triggers. 
                    It does not guarantee audit immunity; it forces the creation of contemporaneous evidence required to 
                    defeat the IRS logic if an inquiry occurs.
                </p>
            </Card>
        </div>
    );
};

export default AdversaryModeling;
