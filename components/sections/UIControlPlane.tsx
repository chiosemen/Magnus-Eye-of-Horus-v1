import React from 'react';
// FIX: Standardize casing to Card.tsx to resolve compiler conflict.
import { Card } from '../ui/card.tsx';
import SectionHeader from '../ui/SectionHeader.tsx';

const Toggle: React.FC<{ label: string; description: string; active?: boolean }> = ({ label, description, active=false }) => (
    <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
        <div>
            <p className="font-medium text-white">{label}</p>
            <p className="text-sm text-gray-400">{description}</p>
        </div>
        <div className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${active ? 'bg-green-500' : 'bg-gray-600'}`}>
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${active ? 'translate-x-6' : ''}`}></div>
        </div>
    </div>
);

const ScorecardRow: React.FC<{ dimension: string; score: string; meaning: string; color: string }> = ({ dimension, score, meaning, color }) => (
    <tr className="border-b border-gray-700">
        <td className="px-4 py-3 font-semibold text-gray-200">{dimension}</td>
        <td className="px-4 py-3 font-mono">
            <span className={`font-bold ${color}`}>{score}</span>
        </td>
        <td className="px-4 py-3 text-gray-400">{meaning}</td>
    </tr>
);

const UIControlPlane: React.FC = () => {
    return (
        <div>
            <SectionHeader title="Human Governance Interface" subtitle="Interface Logic for Human Oversight and Control" />
            <div className="space-y-8">
                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Governance Finding Notification (Example)</h2>
                    <div className="border-l-4 border-yellow-400 bg-yellow-500/10 p-4 rounded-r-lg">
                        <h3 className="font-bold text-yellow-300">Governance Finding: EITC Diligence Documentation</h3>
                        <p className="text-yellow-200 mt-1">The system has identified that Form 8867 is incomplete. Per internal policy 4.5, which aligns with IRS regulations, this documentation is required to finalize the Earned Income Tax Credit claim. Please complete and attach the form to proceed.</p>
                        <p className="text-xs text-yellow-300/70 mt-2">Source: Governance Taxonomy 3.A.1</p>
                    </div>
                    <p className="mt-4 text-sm text-gray-400">Language is always board-safe, referencing the finding and the relevant policy, not making accusations or predictions.</p>
                </Card>

                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">DAF-Specific Control Plane</h2>
                    <p className="text-gray-400 mb-4">Explicit, auditable controls for DAF/Nonprofit operations. Fail-closed is default.</p>
                    <div className="space-y-3 mb-6">
                       <Toggle label="Block individual benefit grants" description="Hard stop on any grant that may confer a benefit to an individual." active={true} />
                       <Toggle label="Require ER for non-qualified recipients" description="Mandate Expenditure Responsibility documentation for any non-501(c)(3) grantee." active={true} />
                       <Toggle label="Force board recusal logging" description="Require documentation of board member recusal for any related-party transaction." />
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-red-900/50 border border-red-500/30 rounded-lg">
                            <div>
                                <p className="font-bold text-red-300">Kill-Switch: Disable donor-directed grants</p>
                            </div>
                            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm">Activate</button>
                        </div>
                         <div className="flex items-center justify-between p-3 bg-red-900/50 border border-red-500/30 rounded-lg">
                            <div>
                                <p className="font-bold text-red-300">Kill-Switch: Pause grant category</p>
                            </div>
                            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm">Activate</button>
                        </div>
                    </div>
                     <div className="mt-6">
                        <h3 className="text-lg font-semibold text-white mb-2">Visibility Controls</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                            <li><strong>Board:</strong> Sees aggregated risk dashboards and final remediation reports.</li>
                            <li><strong>Staff:</strong> Sees specific remediation tasks and documentation requirements for grants they manage.</li>
                            <li><strong>Donor:</strong> (If portal exists) Sees only the status of their own recommendations, with no visibility into internal risk flags or governance processes.</li>
                        </ul>
                    </div>
                </Card>

                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Board-Level Explainability Scorecard</h2>
                    <p className="text-gray-400 mb-4">Boards require clarity on risk exposure and control status, not raw data or probabilistic scores. This scorecard provides a high-level, board-safe summary designed to facilitate effective governance and oversight.</p>
                    
                    <div className="border border-gray-700 rounded-lg p-6 bg-gray-900/50">
                        <h3 className="text-lg font-bold text-white">Board Risk Scorecard: DAF Account — Q2 Review</h3>
                        <p className="text-lg font-bold text-yellow-400 mb-4">Overall Risk Posture: Yellow Moderate, Controlled</p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <tbody>
                                    <ScorecardRow dimension="Regulatory Exposure" score="72 / 100" meaning="Elevated but contained" color="text-yellow-400" />
                                    <ScorecardRow dimension="Governance Integrity" score="88 / 100" meaning="Strong" color="text-green-400" />
                                    <ScorecardRow dimension="Documentation Density" score="94 / 100" meaning="Excellent" color="text-green-400" />
                                    <ScorecardRow dimension="Pattern Deviation" score="65 / 100" meaning="Watch zone" color="text-yellow-400" />
                                    <ScorecardRow dimension="Override Usage" score="1" meaning="Within norms" color="text-green-400" />
                                </tbody>
                            </table>
                        </div>

                        <h4 className="font-semibold text-gray-200 mt-6">Plain-Language Summary</h4>
                        <p className="text-gray-400">This account shows moderate pattern risk due to grant concentration. All high-risk actions were blocked or remediated prior to execution.</p>

                        <div className="border-t border-gray-600 mt-6 pt-6">
                            <h4 className="font-semibold text-gray-200">Trigger Explainability Panel</h4>
                            <div className="mt-2 p-4 bg-gray-800 rounded-lg">
                                <p className="font-mono text-xs text-gray-400"><strong>Triggered Rule:</strong> "Repeated donor-directed grants to a single organization exceeded peer norms."</p>
                                <p className="mt-3 text-gray-300"><strong>Why This Matters:</strong> Such patterns can be interpreted as indirect control or earmarking.</p>
                                <p className="mt-3 text-gray-300"><strong>What the System Did:</strong></p>
                                <ul className="list-disc list-inside ml-4 text-cyan-300">
                                    <li>Blocked execution</li>
                                    <li>Required board acknowledgment</li>
                                    <li>Logged remediation steps</li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-gray-600 mt-6 pt-6">
                            <h4 className="font-semibold text-gray-200">Override Transparency</h4>
                             <div className="mt-2 p-4 bg-gray-800 rounded-lg font-mono text-xs">
                                <p><span className="text-gray-400">Override Used:</span> <span className="text-white">Yes</span></p>
                                <p><span className="text-gray-400">Risk Level:</span> <span className="text-yellow-400">High (not critical)</span></p>
                                <p><span className="text-gray-400">Approved By:</span> <span className="text-white">Board Member</span></p>
                                <p><span className="text-gray-400">Rationale:</span> <span className="text-white">Independent benchmark obtained</span></p>
                                <p><span className="text-gray-400">Timestamp:</span> <span className="text-white">Logged</span></p>
                             </div>
                        </div>
                    </div>

                    <div className="mt-6 bg-red-900/30 border border-red-500/30 text-red-300 text-sm text-center p-3 rounded-lg">
                        <strong>What This System Does NOT Do (Always Visible):</strong> Does not report to regulators, file forms, assess penalties, or recommend enforcement.
                    </div>
                </Card>
                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Board-Safe UI Copy (Discovery-Safe Language)</h2>
                    <p className="text-gray-400 mb-4">Every word displayed to the user is chosen to be neutral, defensible, and non-speculative. This ensures that screenshots or testimony about the UI cannot be misconstrued during discovery.</p>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-gray-200">Global Banner (Neutral, Defensive)</h4>
                            <div className="mt-2 p-3 text-center bg-gray-700/50 rounded-lg text-sm text-gray-300">
                                <strong>Compliance Safeguard Active:</strong> This system identifies and prevents actions that may expose the organization to regulatory risk. No external reporting occurs.
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-200">Critical Block Message (Red)</h4>
                            <div className="mt-2 p-4 border-l-4 border-red-500 bg-red-900/40 rounded-r-lg">
                                <h5 className="font-bold text-red-300">Action Temporarily Unavailable</h5>
                                <p className="text-red-200 mt-1">This distribution cannot proceed because required nonprofit compliance conditions have not been met.</p>
                                <p className="mt-2 text-xs text-red-200"><strong className="font-semibold">What this means:</strong> Proceeding may expose the organization to excise tax or governance risk.</p>
                                <p className="mt-1 text-xs text-red-200"><strong className="font-semibold">Next step:</strong> Review the remediation guidance below or consult internal counsel.</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-200">High-Risk Warning (Amber)</h4>
                            <div className="mt-2 p-4 border-l-4 border-yellow-500 bg-yellow-900/40 rounded-r-lg">
                                <h5 className="font-bold text-yellow-300">Board Review Recommended</h5>
                                <p className="text-yellow-200 mt-1">This pattern exceeds typical nonprofit risk thresholds.</p>
                                <p className="mt-2 text-xs text-yellow-200">No action has been taken. Approval is required to proceed.</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-200">Approval Modal (Human-in-Loop)</h4>
                            <div className="mt-2 p-4 bg-gray-800 border border-gray-700 rounded-lg">
                                <h5 className="text-lg font-bold text-white mb-3">Confirm Remediation Decision</h5>
                                <p className="text-sm text-gray-400 mb-4">You are approving an action after reviewing identified compliance risks.</p>
                                <div className="space-y-3">
                                    <label className="flex items-center text-gray-300"><input type="checkbox" className="h-4 w-4 bg-gray-900 border-gray-600 text-yellow-500 focus:ring-yellow-600 mr-2" /> I understand the risks described</label>
                                    <label className="flex items-center text-gray-300"><input type="checkbox" className="h-4 w-4 bg-gray-900 border-gray-600 text-yellow-500 focus:ring-yellow-600 mr-2" /> I confirm remediation steps have been taken</label>
                                    <label className="flex items-center text-gray-300"><input type="checkbox" className="h-4 w-4 bg-gray-900 border-gray-600 text-yellow-500 focus:ring-yellow-600 mr-2" /> I acknowledge this decision is logged internally</label>
                                </div>
                                <button className="mt-4 w-full bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded hover:bg-yellow-600">Log Approval</button>
                            </div>
                        </div>
                         <div>
                            <h4 className="font-semibold text-gray-200">Audit-Safe Footer</h4>
                            <div className="mt-2 p-2 text-center bg-gray-900/50 rounded-lg text-xs text-gray-500">
                                Magnus Eye of Horus is a remediation intelligence system. It does not generate filings, reports, or disclosures to regulators.
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default UIControlPlane;
