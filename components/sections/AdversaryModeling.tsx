import React from 'react';
// FIX: Use lowercase card.tsx to resolve casing conflicts.
import { Card } from '../ui/card.tsx';
import SectionHeader from '../ui/SectionHeader.tsx';
import { ShieldAlert, Binary, Network, Coins, Zap, Activity, Filter, BarChart3 } from 'lucide-react';

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
        id: 'RPM-CLUSTER',
        tactic: 'Return Preparer Mapping (RPM) Cluster Aggregation',
        icon: <Binary className="h-6 w-6 text-accent" />,
        description: 'The IRS Return Preparer Office (RPO) uses the RPM system to visualize data-links between PTINs, EFINs, and physical MSAs. They calculate a "Weighted Error Density" across your entire firm portfolio.',
        irsLogic: 'The RPM algorithm looks for "Ghost Preparers" (un-enrolled signers) and EFIN-PTIN mismatches. A 12% deviation in refundable credit claims compared to firm historicals triggers a firm-wide "Conduct Review" (Project 4843).',
        countermeasure: 'Magnus simulates RPM aggregation in the Vault. We calculate firm-wide "Diligence Scorecards" daily. If any specific PTIN exceeds an 8% deviation fromfirm-wide normative data, the Fixer gates new e-filing for that PTIN until a cross-portfolio internal sample is cleared.',
        ui_warning: {
            title: 'Critical Aggregate Trigger: PTIN Cluster Density',
            text: 'Systemic pattern detected: PTIN [REDACTED] exhibits a 14% deviation in Schedule C "COGS-to-Revenue" ratios vs firm norm. RPM profile flagged as an RPO Conduct Project target.',
            code: 'IRS-RPM-LOGIC-5502'
        },
    },
    {
        id: 'DIF-WEIGHTING',
        tactic: 'DIF (Discriminant Function) Score Simulation',
        icon: <BarChart3 className="h-6 w-6 text-accent" />,
        description: 'The IRS assigns a secret DIF score to every return based on field weighting and statistical outliers. High-DIF returns are automatically prioritized for Examination selection.',
        irsLogic: 'Weighted fields include high-ratio itemized deductions, "Round Number" entries on Schedule C, and ACTC claims with zero self-employment income. The engine is non-linear and searches for multi-field inconsistencies.',
        countermeasure: 'Magnus runs a "Simulated DIF" agent. It calculates weights for every return based on the NRP (National Research Program) benchmarks. Returns exceeding the 95th percentile trigger "Mandatory Substance Substantiation" (Hold-to-Confirm) to ensure proof density exists for an inevitable inquiry.',
        ui_warning: {
            title: 'Critical: High-DIF Weighted Anomaly',
            text: 'Return exceeds 98th percentile of Simulated DIF weights for itemized deductions. 82% probability of Selection. Action Gated: Documentation of substantive authority required.',
            code: 'DIF-SIM-ALPHA-98'
        },
    },
    {
        id: 'MSA-PEER-NORM',
        tactic: 'Geographic MSA Peer Norming (Z-Score Model)',
        icon: <Zap className="h-6 w-6 text-accent" />,
        description: 'IRS analytics compare firm-wide claims for refundable credits (EITC/ACTC) against all other preparers in your Metropolitan Statistical Area (MSA).',
        irsLogic: 'Outliers are determined via Z-Score. If your firm’s average EITC claim is 2.2 standard deviations above the local MSA mean, you are automatically select for Program 4843 "Preparer Outreach" (Letter 4843C).',
        countermeasure: 'The Explorer agent maintains a "Jurisdictional Peer Norm Index." It calculates a Z-score for every return. Returns with Z > 1.8 trigger a "Behavioral Integrity Checklist" to ensure the preparer can defend the claim against peer norms during an audit.',
        ui_warning: {
            title: 'Advisory: MSA Peer Norm Deviation (Z-Score > 2.0)',
            text: 'This return exceeds the jurisdictional norm for EITC claims by 2.4 standard deviations. MSA peer group selection for Letter 4843C is highly probable.',
            code: 'IRS-MSA-NORM-Z2'
        },
    },
    {
        id: 'CONDUCT-EXPANSION',
        tactic: 'Network Inquiry Expansion (Project 4843)',
        icon: <Network className="h-6 w-6 text-accent" />,
        description: 'The IRS audits 3-5 high-DIF clients. If "Lack of Diligence" (Circular 230 §10.22) is confirmed in >50% of the sample, the project expands to your entire client list for the prior 3 years.',
        irsLogic: 'Under IRC §6695(g), silence in the file is treated as evidence of disregard. The expansion logic is a "Network Infection" model where one failure "taints" the PTIN cluster.',
        countermeasure: 'Magnus enforces a "Diligence Firewall." Every return must have a completed Magnus "Diligence Interview Log." By maximizing contemporaneous proof, we prevent a client audit from providing the "cause" for a firm-level expansion project.',
        ui_warning: {
            title: 'Expansion Risk: Diligence Loop Incomplete',
            text: 'AUR flag detected on linked client. Without a Magnus-signed "Diligence Certification" on file, this client inquiry has a high probability of firm-wide expansion per §6695(g) protocols.',
            code: 'IRC-6695G-PROXIMITY'
        },
    },
    {
        id: 'VELOCITY-ANOMALY',
        tactic: 'Filing Velocity & Dwell-Time Analytics',
        icon: <Activity className="h-6 w-6 text-accent" />,
        description: 'The IRS RPO tracks the delta between return creation and e-file submission. Extremely low dwell-times suggest "Robo-filing" or performative compliance.',
        irsLogic: 'A complex 1040 with Schedule C and EITC completed in under 45 minutes is flagged as a behavioral outlier. The IRS uses this as evidence of "Willful Recklessness" to escalate §6694(a) penalties to §6694(b).',
        countermeasure: 'Behavioral Integrity Engine monitors dwell-time per task. Sub-normative velocity triggers "Mandatory Friction Gates." The user must hold-to-confirm substance before the "Filing Remediation Pack" can be generated.',
        ui_warning: {
            title: 'Behavioral Alert: Filing Velocity Anomaly',
            text: 'Dwell time (12m) is 85% below MSA norm for complex filing. Flagged as "Performative Diligence." Mandatory senior partner attestation required.',
            code: 'BEH-VELOCITY-ANOMALY-12'
        },
    },
];

const AdversaryModeling: React.FC = () => {
    return (
        <div className="pb-12">
            <SectionHeader 
                title="IRS Analytics & Adversary Modeling" 
                subtitle="High-fidelity simulator of RPO Cluster Mapping, NRP Benchmarking, and DIF Scoring mechanics." 
            />

            <div className="grid grid-cols-1 gap-8">
                {threatModels.map((model) => (
                    <Card key={model.id} className="bg-gray-800/40 border-gray-700/50 overflow-hidden group">
                        <div className="p-6 border-b border-gray-700/50 flex items-center justify-between bg-gray-900/40">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-accent/10 rounded-xl border border-accent/20 group-hover:border-accent/40 transition-all">
                                    {model.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white tracking-tight">{model.tactic}</h3>
                                    <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest mt-1">System Vector: {model.id}</p>
                                </div>
                            </div>
                            <div className="h-8 w-8 rounded-full border border-border/50 flex items-center justify-center text-[10px] font-black text-muted-foreground">
                                v2.4
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-gray-700/30">
                            <div className="bg-gray-900/20 p-6 space-y-6 border-r border-gray-700/50">
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3">Vector Analysis</h4>
                                    <p className="text-sm text-gray-300 leading-relaxed">{model.description}</p>
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-severity-high mb-3 flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-severity-high animate-pulse" />
                                        IRS Engine Logic (Hostile Intent)
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
                                        Magnus Countermeasure (Defensive)
                                    </h4>
                                    <p className="text-sm text-gray-300 leading-relaxed">{model.countermeasure}</p>
                                </div>

                                <div className="pt-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-3 flex items-center gap-2">
                                        <Filter className="h-3 w-3" />
                                        Deterministic UI Trigger
                                    </h4>
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

            <Card className="mt-12 bg-severity-critical/5 border-severity-critical/20 p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-severity-critical/20 to-transparent" />
                <h3 className="text-lg font-bold text-white mb-3 flex items-center justify-center gap-2">
                    <ShieldAlert className="h-5 w-5 text-severity-critical" />
                    Adversarial Integrity Statement
                </h3>
                <p className="text-sm text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                    This simulator uses historical <span className="text-white font-bold">NRP Benchmarks</span> and <span className="text-white font-bold">Program 4843 Selection Criteria</span> to model regulator moves. 
                    It is a non-predictive diagnostic tool. By identifying structural similarities between your portfolio and known 
                    IRS analytical triggers, Magnus forces the creation of <span className="text-white font-bold italic">contemporaneous proof density</span> 
                    required to defeat regulatory logic if an inquiry occurs.
                </p>
            </Card>
        </div>
    );
};

export default AdversaryModeling;
