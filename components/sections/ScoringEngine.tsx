import React from 'react';
// FIX: Standardize casing to Card.tsx to resolve compiler conflict.
import { Card } from '../ui/card.tsx';
import SectionHeader from '../ui/SectionHeader.tsx';
import { AlertCircle, Activity, Scale, ShieldAlert } from 'lucide-react';

const ScoringEngine: React.FC = () => {
    return (
        <div className="space-y-8 pb-12">
            <SectionHeader 
                title="Regulatory Exposure Engine" 
                subtitle="Framework for Non-Predictive Policy Adherence & Penalty Density Assessment." 
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="lg:col-span-2 bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <Scale className="h-5 w-5 text-accent" />
                        Scoring Principle: Penalty Density
                    </h2>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                        Unlike traditional scoring, the Magnus engine calculates <strong className="text-white">Statutory Exposure</strong>—the cumulative dollar value of preparer penalties if a filing is select for audit. 
                        We focus on "Penalty Density," which measures how many discrete IRC violations are triggered by a single fact pattern.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Cluster Aggregate', weight: '30%', icon: <Activity className="h-4 w-4" /> },
                            { label: 'Penalty Stacking', weight: '40%', icon: <ShieldAlert className="h-4 w-4" /> },
                            { label: 'DIF Weighting', weight: '20%', icon: <AlertCircle className="h-4 w-4" /> },
                            { label: 'MSA Z-Score', weight: '10%', icon: <Activity className="h-4 w-4" /> },
                        ].map((item, i) => (
                            <div key={i} className="p-4 bg-gray-900 rounded-xl border border-gray-700 text-center">
                                <div className="text-accent flex justify-center mb-2">{item.icon}</div>
                                <div className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">{item.label}</div>
                                <div className="text-xl font-black text-white">{item.weight}</div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">I. Vector Classification Weight</h2>
                    <p className="text-gray-400 mb-4 text-sm">Static categorical values assigned based on the Regulatory Taxonomy. This forms the base score.</p>
                    <ul className="text-sm space-y-2">
                        <li className="flex justify-between items-center bg-gray-900 p-2 rounded border border-gray-800"><span className="text-red-400 font-black uppercase tracking-tighter">Critical (RPM/DIF)</span> <span className="font-mono text-gray-300">Base: 100</span></li>
                        <li className="flex justify-between items-center bg-gray-900 p-2 rounded border border-gray-800"><span className="text-yellow-400 font-black uppercase tracking-tighter">High Risk (MSA)</span> <span className="font-mono text-gray-300">Base: 50</span></li>
                        <li className="flex justify-between items-center bg-gray-900 p-2 rounded border border-gray-800"><span className="text-blue-400 font-black uppercase tracking-tighter">Behavioral (Velocity)</span> <span className="font-mono text-gray-300">Base: 10</span></li>
                    </ul>
                </Card>

                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">II. Statutory Penalty Multiplier</h2>
                    <p className="text-gray-400 mb-4 text-sm">Measures if a pattern triggers "Penalty Stacking" (multiple IRC sections applied to one filing).</p>
                     <ul className="text-sm space-y-2">
                        <li className="flex justify-between items-center"><span>Stacked Exposure (2+ Sections)</span> <span className="font-mono text-red-400 font-bold">Multiplier: 2.0x</span></li>
                        <li className="flex justify-between items-center"><span>Diligence Gap (§6695g)</span> <span className="font-mono text-yellow-400 font-bold">Multiplier: 1.5x</span></li>
                        <li className="flex justify-between items-center"><span>Unitary Anomaly</span> <span className="font-mono text-gray-300">Multiplier: 1.0x</span></li>
                    </ul>
                </Card>
                
                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">III. Expansion Risk Multiplier</h2>
                    <p className="text-gray-400 mb-4 text-sm">Simulates the probability that a single audit selection triggers a firm-wide Project 4843 expansion.</p>
                     <ul className="text-sm space-y-2">
                        <li className="flex justify-between items-center"><span>PTIN Cluster Contamination</span> <span className="font-mono text-red-400 font-bold">Multiplier: 1.8x</span></li>
                         <li className="flex justify-between items-center"><span>Isolated Anomaly</span> <span className="font-mono text-gray-300 font-bold">Multiplier: 1.0x</span></li>
                    </ul>
                </Card>

                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">IV. Forensic Context Tags</h2>
                    <p className="text-gray-400 mb-4 text-sm">Informational tags mapping findings to specific IRS Project Codes and NRP Benchmarks.</p>
                    <div className="space-y-2">
                        <p className="text-xs text-cyan-300 font-mono bg-gray-900 p-2 rounded border border-cyan-500/20">Tag: "IRS Project Code: Conduct 4843 (Preparer)"</p>
                        <p className="text-xs text-cyan-300 font-mono bg-gray-900 p-2 rounded border border-cyan-500/20">Tag: "Benchmark: NRP-SIM-WEIGHT-2024"</p>
                    </div>
                </Card>

                <Card className="lg:col-span-2 bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Exposure Calculation & Remediation Gating</h2>
                    <p className="text-gray-400 mb-6 text-sm">The Exposure Score is used internally to determine "Gate Severity." Returns with stacked exposure cannot be e-filed without senior partner override.</p>
                    <div className="bg-gray-950 p-6 rounded-xl border border-gray-700 mb-8 flex flex-col items-center">
                        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">Magnus Exposure Algorithm</p>
                        <p className="font-mono text-2xl text-center text-accent">
                           (Base Weight × Penalty Multiplier) × Expansion Multiplier = Exposure Score
                        </p>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-4">Example Analysis: Refund Mill Signature</h3>
                    <div className="space-y-6">
                        <div className="bg-gray-900 p-4 rounded-xl border border-severity-critical/20 border-l-4 border-l-severity-critical">
                            <h4 className="font-black text-white uppercase text-xs tracking-widest mb-2">Finding: RPM Cluster Deviation Detected</h4>
                            <p className="text-sm text-gray-400 mb-4">"PTIN 442x exhibits a 2.4 Z-Score deviation in ACTC claims. Stacked liability identified (§6694 + §6695)."</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-black/40 rounded border border-gray-800">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Estimated Exposure</span>
                                    <div className="text-lg font-black text-red-400">$6,600 / Return</div>
                                </div>
                                <div className="p-3 bg-black/40 rounded border border-gray-800">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Project 4843 Linkage</span>
                                    <div className="text-lg font-black text-white">92% Probability</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ScoringEngine;
