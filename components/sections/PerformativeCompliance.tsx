import React from 'react';
// FIX: Standardize casing to Card.tsx to resolve compiler conflict.
import { Card } from '../ui/Card.tsx';
import SectionHeader from '../ui/SectionHeader.tsx';

const PerformativeCompliance: React.FC = () => {
    return (
        <div>
            <SectionHeader title="Performative Compliance Countermeasures" subtitle="Detecting and Neutralizing 'Paper Shield' Tactics" />
            <div className="space-y-8">
                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Defining the Threat: The "Paper Shield"</h2>
                    <p className="text-gray-400">Performative compliance is the act of generating a superficial record of diligence that lacks substance. It is a sophisticated form of misuse where an operator uses the system not to ensure compliance, but to create a misleadingly clean audit trail—a "paper shield"—for plausible deniability. This section details the system's active countermeasures against such behavior.</p>
                </Card>

                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">I. Signals of Performative Compliance</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <h3 className="font-bold text-gray-200">1. Low-Substance Documentation</h3>
                            <p className="text-sm text-gray-400 mt-1">Uploading placeholder documents, templates with unchanged boilerplate, or suspiciously brief files to satisfy a "Require Documentation" control.</p>
                            <p className="text-xs font-mono mt-2 p-2 bg-gray-900 rounded text-yellow-300">Example: A "diligence memo" that is only 50 words long.</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-200">2. Checklist Gaming</h3>
                            <p className="text-sm text-gray-400 mt-1">Rapidly checking off items in a diligence checklist without spending enough time to have plausibly performed the task.</p>
                            <p className="text-xs font-mono mt-2 p-2 bg-gray-900 rounded text-yellow-300">Example: Completing a 30-point checklist in under 60 seconds.</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-200">3. Over-Documentation ("Document Dumping")</h3>
                            <p className="text-sm text-gray-400 mt-1">Uploading a large volume of irrelevant documents to create the appearance of thoroughness, obscuring the absence of a single, critical document.</p>
                            <p className="text-xs font-mono mt-2 p-2 bg-gray-900 rounded text-yellow-300">Example: Uploading 500 pages of marketing material for a grant review.</p>
                        </div>
                    </div>
                </Card>

                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">II. System Detection & Scoring (Internal Mechanics)</h2>
                    <p className="text-gray-400 mb-4">The system actively monitors for these signals using the following internal mechanisms, generating specific, advisory-level flags that are visible to compliance officers.</p>
                    <ul className="list-disc list-inside space-y-4 text-gray-300">
                        <li>
                            <strong className="text-gray-200">Proof Density Scoring (Librarian/Oracle):</strong> The system analyzes uploaded documents for substance, not just presence. It measures word count against policy minimums, checks for keyword presence, and calculates a boilerplate similarity score. A document failing these checks triggers a <code className="text-xs text-yellow-300">Low Proof Density</code> flag.
                        </li>
                        <li>
                            <strong className="text-gray-200">Dwell Time Analysis (Designer/Orchestrator):</strong> The UI and Orchestrator track the time spent on critical checklist tasks. If a user completes a complex task significantly faster than the established normative baseline, a <code className="text-xs text-yellow-300">Checklist Velocity Anomaly</code> flag is logged.
                        </li>
                        <li>
                            <strong className="text-gray-200">Signal-to-Noise Ratio (Explorer/Oracle):</strong> When multiple documents are uploaded, the system performs relevance analysis based on keywords. If the ratio of low-relevance to high-relevance documents is high, a <code className="text-xs text-yellow-300">High Volume, Low Relevance</code> flag is raised.
                        </li>
                    </ul>
                </Card>

                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">III. UI/UX Countermeasures</h2>
                    <p className="text-gray-400 mb-4">The user interface is designed to discourage thoughtless box-checking and encourage substantive engagement.</p>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-200">1. Friction & Active Attestation</h3>
                            <p className="text-gray-400 mb-3">Instead of a simple checkbox, critical confirmations require a "hold-to-confirm" action paired with an explicit legal attestation. This increases the cognitive load and legal significance of the action, transforming it from a reflexive click into a deliberate certification.</p>
                            <div className="text-center">
                                <button disabled className="bg-blue-800 text-blue-200 font-bold py-3 px-6 rounded-lg opacity-80 animate-pulse">
                                    Hold to Attest: "I have read and verified the attached documentation."
                                </button>
                            </div>
                        </div>
                        <div className="border-t border-gray-700 pt-6">
                            <h3 className="text-lg font-semibold text-gray-200">2. Dynamic Checklists with Justification</h3>
                            <p className="text-gray-400 mb-3">For key diligence items, the system requires a structured justification instead of a simple check. This forces the user to provide structured data as proof of work, which is faster than writing a memo but more robust than a checkbox.</p>
                             <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                                <label className="block text-gray-300 font-semibold mb-2">☐ Verify Grantee 501(c)(3) status</label>
                                <select className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white">
                                    <option>Select Verification Source...</option>
                                    <option>IRS Pub 78 Database (Auto-Verified)</option>
                                    <option>GuideStar Charity Check</option>
                                    <option>Grantee-Provided Determination Letter</option>
                                </select>
                            </div>
                        </div>
                         <div className="border-t border-gray-700 pt-6">
                            <h3 className="text-lg font-semibold text-gray-200">3. Proof of Work Prompts</h3>
                            <p className="text-gray-400 mb-3">If the system detects a <code className="text-xs text-yellow-300">Low Proof Density</code> flag, the UI presents a targeted "proof of work" challenge before the user can proceed. This forces the operator to demonstrate actual engagement with the material.</p>
                            <div className="border-l-4 border-yellow-400 bg-yellow-500/10 p-4 rounded-r-lg">
                                <h4 className="font-bold text-yellow-300">Advisory: Low Document Substance Detected</h4>
                                <p className="text-yellow-200 mt-1">The attached diligence memo is unusually brief. To proceed, please summarize the primary risk factor identified in the memo in the box below.</p>
                                <textarea className="w-full mt-2 p-2 bg-gray-800 border border-gray-600 rounded-md text-white h-16" placeholder="One-sentence summary..."></textarea>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PerformativeCompliance;