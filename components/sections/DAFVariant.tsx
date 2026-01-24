import React from 'react';
// FIX: Standardize casing to Card.tsx to resolve compiler conflict.
import { Card } from '../ui/Card.tsx';
import SectionHeader from '../ui/SectionHeader.tsx';
import { ShieldAlert, Users, HeartHandshake, AlertCircle, FileText, Activity } from 'lucide-react';

const DoctrineItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <div className="text-gray-400 space-y-2">{children}</div>
    </div>
);

const DAFVariant: React.FC = () => {
    return (
        <div className="space-y-12 pb-12">
            <SectionHeader title="Magnus Eye of Horus — DAF / Nonprofit Variant" subtitle="Executive Translation & UI Specific Adjustments" />
            
            <div className="grid grid-cols-1 gap-8">
                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <DoctrineItem title="Purpose (DAF / Nonprofit Context)">
                        <p>Magnus Eye of Horus (Nonprofit Edition) is a pure remediation intelligence system designed to protect:</p>
                        <ul className="list-disc list-inside">
                            <li>Donor-Advised Funds (DAFs)</li>
                            <li>Public charities (501(c)(3))</li>
                            <li>Private foundations</li>
                            <li>Fiscal sponsors</li>
                            <li>Nonprofit service organizations</li>
                        </ul>
                        <p className="mt-4">It swaps the tax-preparer's PTIN-focused analytics for board-governance and donor-influence monitoring, identifying risk under IRC §4966 and §4958 before they trigger excise tax events.</p>
                        <p className="font-semibold text-gray-300 mt-2 italic">It is not a reporting engine; it is a defensive, fail-closed governance architecture.</p>
                    </DoctrineItem>
                </Card>

                {/* NEW: UI Specific Adjustments Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Activity className="h-6 w-6 text-accent" />
                        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">UI Specific Adjustments: DAF vs. Preparer Model</h2>
                    </div>
                    <p className="text-gray-400 text-sm max-w-3xl">The Nonprofit Variant replaces "Preparer Analytics" (DIF/RPM) with "Fiduciary Safeguards." Below are the core UI panels unique to this model.</p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Excess Benefit Risk Panel (§4958) */}
                        <Card className="bg-gray-900/60 border border-severity-high/30 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-severity-high" />
                            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Users className="h-5 w-5 text-severity-high" />
                                    <h3 className="font-black text-sm uppercase tracking-widest text-white">Excess Benefit Risk Panel (§4958)</h3>
                                </div>
                                <span className="text-[10px] font-mono text-severity-high">Vector: DP-CONFLICT-4958</span>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-4">
                                    <div className="p-4 bg-severity-high/5 border border-severity-high/10 rounded-xl">
                                        <p className="text-[10px] font-black text-severity-high uppercase mb-1">Signal: Related-Party Dominance</p>
                                        <p className="text-xs text-gray-300">Grantee CEO [REDACTED] matches Disqualified Person (DP) list for Foundation Alpha. Family link identified.</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 bg-black/40 rounded border border-gray-800">
                                            <span className="text-[9px] font-bold text-muted-foreground uppercase">FMV Substantiation</span>
                                            <div className="text-sm font-black text-red-400">MISSING</div>
                                        </div>
                                        <div className="p-3 bg-black/40 rounded border border-gray-800">
                                            <span className="text-[9px] font-bold text-muted-foreground uppercase">Recusal Ledger</span>
                                            <div className="text-sm font-black text-white">NOT LOGGED</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-gray-800">
                                    <p className="text-[10px] font-black text-muted-foreground uppercase mb-2">Hard-Stop Logic</p>
                                    <p className="text-xs text-gray-400 italic">"Board approval is gated until independent benchmark data for compensation is attached. No disbursement can proceed without a signed recusal attestation from the DP."</p>
                                </div>
                            </div>
                        </Card>

                        {/* Donor Influence Indicators */}
                        <Card className="bg-gray-900/60 border border-accent/30 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-accent" />
                            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <HeartHandshake className="h-5 w-5 text-accent" />
                                    <h3 className="font-black text-sm uppercase tracking-widest text-white">Donor Influence Dashboard</h3>
                                </div>
                                <span className="text-[10px] font-mono text-accent">Vector: DAF-CONTROL-4966</span>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase">Grant Concentration Score</span>
                                        <span className="text-xs font-black text-accent">82/100</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-accent w-[82%]" />
                                    </div>
                                    <p className="text-[10px] text-gray-500 leading-relaxed">Alert: 90% of account distributions flow to single recipient over 24 months. Patterns suggest "Indirect Control" or "Earmarking."</p>
                                </div>
                                <div className="bg-accent/5 border border-accent/10 p-4 rounded-xl">
                                    <p className="text-[10px] font-black text-accent uppercase mb-2">Lexicon Hits (SafeLexicon):</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-2 py-0.5 rounded bg-black/40 border border-accent/20 text-[9px] font-mono text-gray-300">"pledge"</span>
                                        <span className="px-2 py-0.5 rounded bg-black/40 border border-accent/20 text-[9px] font-mono text-gray-300">"commitment"</span>
                                        <span className="px-2 py-0.5 rounded bg-black/40 border border-accent/20 text-[9px] font-mono text-gray-300">"my behalf"</span>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-gray-800">
                                    <p className="text-[10px] font-black text-muted-foreground uppercase mb-2">Advisory Enforcement</p>
                                    <p className="text-xs text-gray-400">"Mandatory cooling-off period of 14 days applied to this grant request to ensure independent sponsor review."</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Non-Negotiable Doctrine (Nonprofit Edition)</h2>
                    <DoctrineItem title="1. Pure Remediation Only (Charity-Safe)">
                        <p>Eye of Horus exists solely to detect governance risk and explain statutory exposure. It never produces IRS filings, generates enforcement narratives, or incentives bounties.</p>
                        <p className="text-severity-critical font-bold mt-2">Fail-closed is the default state for any §4966 taxable distribution risk.</p>
                    </DoctrineItem>
                </Card>

                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <DoctrineItem title="Canonical Operational Flow (Nonprofit Adjustment)">
                        <ol className="list-decimal list-inside space-y-1">
                            <li>Human (Board) defines Objective</li>
                            <li>Orchestrator Decomposes Tasks</li>
                            <li>Explorer Scouts Grantee & Donor Links</li>
                            <li>Librarian Anchors Citations (§4958/§4966)</li>
                            <li>Oracle Classifies Governance Entropy</li>
                            <li>Fixer Enforces Gating Controls</li>
                            <li>Designer Presents Board-Safe UI</li>
                            <li>Human (CCO) Approves/Redirects</li>
                        </ol>
                    </DoctrineItem>
                </Card>
            </div>
        </div>
    );
};

export default DAFVariant;
