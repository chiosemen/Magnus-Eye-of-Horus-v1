import React from 'react';
// FIX: Use lowercase card.tsx to resolve casing conflicts.
import { Card } from '../ui/card.tsx';
import SectionHeader from '../ui/SectionHeader.tsx';

const ScoringEngine: React.FC = () => {
    return (
        <div>
            <SectionHeader title="Governance Scoring Framework" subtitle="Framework for Non-Predictive Policy Adherence Assessment" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="lg:col-span-2 bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Scoring Principles (Nonprofit)</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                        <li><strong>Portfolio-level aggregation:</strong> Scoring focuses on the overall risk posture of a DAF or sponsor, not just individual grant-by-grant transactions.</li>
                        <li><strong>Severity-weighted statutory exposure:</strong> Weights are directly tied to the severity of potential excise taxes (e.g., §4966 vs. §4958).</li>
                        <li><strong>Expansion probability modeling:</strong> The model accounts for the likelihood that one flagged grant will lead to a broader portfolio review by regulators.</li>
                        <li><strong>Penalty density awareness:</strong> The system understands which fact patterns can trigger multiple, compounding penalties.</li>
                        <li><strong>Explainability > prediction:</strong> The goal is to explain *why* risk exists, not to predict an audit.</li>
                    </ul>
                </Card>

                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">I. Taxonomy Classification Weight</h2>
                    <p className="text-gray-400 mb-4">A static, categorical value assigned based on the Governance Taxonomy. This forms the base score.</p>
                    <ul className="text-sm space-y-2">
                        <li className="flex justify-between items-center"><span className="text-red-400 font-semibold">Critical</span> <span className="font-mono text-gray-300">Base Score: 100</span></li>
                        <li className="flex justify-between items-center"><span className="text-yellow-400 font-semibold">High Risk</span> <span className="font-mono text-gray-300">Base Score: 50</span></li>
                        <li className="flex justify-between items-center"><span className="text-blue-400 font-semibold">Advisory</span> <span className="font-mono text-gray-300">Base Score: 10</span></li>
                    </ul>
                </Card>

                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">II. Structural Interlinkage Multiplier</h2>
                    <p className="text-gray-400 mb-4">A structural multiplier, not a statistical probability. It measures if a finding in one area structurally implicates another policy area (e.g., a self-dealing finding also implicates board governance).</p>
                     <ul className="text-sm space-y-2">
                        <li className="flex justify-between items-center"><span>High Interlinkage</span> <span className="font-mono text-gray-300">Multiplier: 1.5x</span></li>
                        <li className="flex justify-between items-center"><span>Moderate Interlinkage</span> <span className="font-mono text-gray-300">Multiplier: 1.2x</span></li>
                        <li className="flex justify-between items-center"><span>No Interlinkage</span> <span className="font-mono text-gray-300">Multiplier: 1.0x</span></li>
                    </ul>
                </Card>
                
                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">III. Documentation Status Multiplier</h2>
                    <p className="text-gray-400 mb-4">A multiplier applied if the system notes that documentation required by policy for a specific check is missing or invalid.</p>
                     <ul className="text-sm space-y-2">
                        <li className="flex justify-between items-center"><span>Required Doc Missing</span> <span className="font-mono text-gray-300">Multiplier: 2.0x</span></li>
                         <li className="flex justify-between items-center"><span>Required Doc Present</span> <span className="font-mono text-gray-300">Multiplier: 1.0x</span></li>
                    </ul>
                </Card>

                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">IV. Statutory Context Tag</h2>
                    <p className="text-gray-400 mb-4">An informational tag, not a score component. It provides the human operator with context about the statutory basis for a rule, but does not alter the internal score.</p>
                    <p className="text-sm text-cyan-300 font-mono bg-gray-900 p-2 rounded">Example Tag: "Statutory Basis: IRC §4958"</p>
                </Card>

                <Card className="lg:col-span-2 bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Scoring Formula & Explainability Requirement</h2>
                    <p className="text-gray-400 mb-4">The final score is a simple, auditable calculation used for internal prioritization only. The narrative explanation is the primary output for decision-making.</p>
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 mb-6">
                        <p className="font-mono text-lg text-center text-green-400">
                           (Classification Weight × Interlinkage Multiplier) × Documentation Multiplier = Governance Score
                        </p>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-2">Board-Safe Explanation Format</h3>
                    <p className="mb-4 text-gray-400">The final numerical score is never shown to a board. All reports use the following mandatory narrative structure, providing concrete, auditable justifications. This format is explicitly designed to survive hostile reinterpretation during legal discovery years after the fact by focusing on policy alignment, not speculation.</p>
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-md font-semibold text-gray-200 mb-2">Example 1: Tax Preparer - EITC Diligence</h4>
                            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                                <p className="font-mono text-sm text-gray-300">
                                    <span className="text-yellow-400">"A governance finding was noted in the EITC Diligence category."</span><br />
                                    <span className="text-gray-400">"The system identified that Form 8867 was incomplete for this client."</span><br />
                                    <span className="text-gray-400">"Internal Policy 4.5, which aligns with IRS Publication 4687, requires this form for EITC claims."</span><br />
                                    <span className="text-cyan-400">"Guidance: Complete Form 8867 and attach to the file to align with policy."</span>
                                </p>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-md font-semibold text-gray-200 mb-2">Example 2: DAF/Nonprofit - Donor Control</h4>
                            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                                <p className="font-mono text-sm text-gray-300">
                                    <span className="text-yellow-400">"A governance finding was noted in the Donor Control category."</span><br />
                                    <span className="text-gray-400">"The grant recommendation text included the phrase 'to satisfy my binding pledge'."</span><br />
                                    <span className="text-gray-400">"Internal Policy 7.2 (Prohibition of Private Inurement), which aligns with IRS Reg. § 53.4966-2, does not permit DAF assets to fulfill a donor's personal, legally binding obligation."</span><br />
                                    <span className="text-cyan-400">"Guidance: Require the donor to certify in writing that this grant does not satisfy a personal pledge to align with policy."</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ScoringEngine;
