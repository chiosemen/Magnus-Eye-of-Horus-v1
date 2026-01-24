import React from 'react';
// FIX: Standardize casing to Card.tsx to resolve compiler conflict.
import { Card } from '../ui/card.tsx';
import SectionHeader from '../ui/SectionHeader.tsx';
import { ShieldAlert, Binary, Zap, Activity, Filter, BarChart3, AlertTriangle } from 'lucide-react';

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
        description: 'The IRS RPO uses the RPM system to visualize hidden data-links between PTINs, EFINs, and physical addresses. They calculate a "Weighted Error Density" across your entire firm portfolio, looking for "Ghost Preparers" or un-enrolled signers.',
        irsLogic: 'The RPM algorithm flags EFIN-PTIN mismatches. A 12% deviation in refundable credit density compared to the firm historical baseline triggers an immediate "Conduct Review" (Project 4843) expansion.',
        countermeasure: 'Magnus simulates RPM aggregation in the Vault. We calculate firm-wide "Diligence Scorecards" daily. If any specific PTIN exceeds an 8% deviation from internal normative data, the Fixer gates new e-filing until a cross-portfolio sample review is cleared.',
        ui_warning: {
            title: 'Critical Aggregate Trigger: PTIN Cluster Density',
            text: 'Systemic pattern detected: PTIN [REDACTED] exhibits a 14% deviation in Schedule C "COGS-to-Revenue" ratios vs firm norm. RPM profile flagged as an RPO Conduct Project target.',
            code: 'IRS-RPM-LOGIC-5502'
        },
    },
    {
        id: 'DIF-WEIGHTING',
        tactic: 'DIF (Discriminant Function) Score Weighting',
        icon: <BarChart3 className="h-6 w-6 text-accent" />,
        description: 'The IRS assigns a secret DIF score to every return. High-DIF returns are prioritized for Examination selection. Weights are derived from the NRP (National Research Program) intensive audits.',
        irsLogic: 'Weighted fields include "Round Number" entries on Schedule C, ACTC claims with zero self-employment income, and EITC claims with "Schedule C Income" that exactly hits the credit plateau. Multi-field inconsistencies are multiplicative.',
        countermeasure: 'Magnus runs a "Simulated DIF" agent. It calculates weights for every return based on current NRP benchmarks. Returns exceeding the 95th percentile trigger "Mandatory Substance Substantiation" (Hold-to-Confirm) to ensure proof density exists for the inevitable inquiry.',
        ui_warning: {
            title: 'Critical: High-DIF Weighted Anomaly',
            text: 'Return exceeds 98th percentile of Simulated DIF weights for itemized deductions. 82% probability of Selection. Action Gated: Contemporaneous documentation of authority required.',
            code: 'DIF-SIM-ALPHA-98'
        },
    },
    {
        id: 'MSA-PEER-NORM',
        tactic: 'Geographic MSA Peer Norming (Z-Score Model)',
        icon: <Zap className="h-6 w-6 text-accent" />,
        description: 'IRS analytics compare your firm-wide claims for refundable credits (EITC/ACTC/HCTC) against all other preparers in your Metropolitan Statistical Area (MSA).',
        irsLogic: 'Outliers are determined via Z-Score. If your firm’s average EITC claim is 2.0 standard deviations above the local MSA mean, you are automatically flagged for Program 4843 "Preparer Outreach" (Letter 4843C).',
        countermeasure: 'The Explorer agent maintains a "Jurisdictional Peer Norm Index." It calculates a Z-score for every return. Returns with Z > 1.8 trigger a "Behavioral Integrity Checklist" to ensure the preparer can defend the claim against local economic norms.',
        ui_warning: {
            title: 'Advisory: MSA Peer Norm Deviation (Z > 2.0)',
            text: 'This return exceeds the jurisdictional norm for EITC claims by 2.4 standard deviations. MSA peer group selection for Letter 4843C is highly probable.',
            code: 'IRS-MSA-NORM-Z2'
        },
    },
    {
        id: 'PENALTY-STACKING',
        tactic: 'Statutory Penalty Stacking Framework',
        icon: <Activity className="h-6 w-6 text-accent" />,
        description: 'IRS Counsel targets "Penalty Density" where multiple preparer penalties can be assessed on a single filing to force a settlement.',
        irsLogic: 'Stacking logic: §6695(g) (Diligence Failure: $600+) + §6694(a) (Unreasonable Position: $1,000+) + §6694(b) (Willful/Reckless: $5,000+). One file can generate $6,600+ in firm liability.',
        countermeasure: 'The Scoring Engine calculates "Maximum Statutory Exposure" for every red flag. The Fixer enforces remediation that clears *all* stacked levels, prioritizing §6695(g) documentation as the primary defensive firewall.',
        ui_warning: {
            title: 'Penalty Density Alert: Stacked Liability Risk',
            text: 'Unresolved §6695(g) diligence gaps identified. Combined statutory exposure for this filing exceeds $6,000. Remediation pack generation disabled.',
            code: 'IRC-STACK-6694-6695'
        },
    },
    {
        id: 'VELOCITY-ANOMALY',
        tactic: 'Filing Velocity & Dwell-Time Analytics',
        icon: <Activity className="h-6 w-6 text-accent" />,
        description: 'The IRS RPO tracks the delta between return creation and e-file submission. Extremely low dwell-times suggest "Robo-filing" or performative compliance.',
        irsLogic: 'A complex 1040 with Schedule C and EITC completed in under 45 minutes is flagged as a behavioral outlier. The IRS use this as evidence of "Willful Recklessness" to escalate §6694(a) penalties to §6694(b).',
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
                                        <AlertTriangle className="h-3 w-3" />
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