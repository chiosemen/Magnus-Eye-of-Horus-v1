import React from 'react';
// FIX: Use lowercase card.tsx to resolve casing conflicts.
import { Card } from '../ui/card.tsx';
import SectionHeader from '../ui/SectionHeader.tsx';

interface JustificationPointProps {
    title: string;
    children: React.ReactNode;
}

const JustificationPoint: React.FC<JustificationPointProps> = ({ title, children }) => (
    <div className="border-t border-gray-700/50 pt-6 mt-6">
        <h3 className="text-lg font-bold text-yellow-400">{title}</h3>
        <div className="mt-2 text-gray-400 space-y-3">
            {children}
        </div>
    </div>
);

const SystemJustification: React.FC = () => {
    return (
        <div>
            <SectionHeader title="System Justification Memorandum" subtitle="Formal Declaration of System Capabilities, Design, and Constitutional Limits" />
            <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                <div className="prose prose-invert prose-sm max-w-none text-gray-400">
                    <p className="text-right"><strong>Version:</strong> 2.0</p>
                    <p className="text-right"><strong>Date:</strong> October 27, 2024</p>
                    <p><strong>TO:</strong> Interested Parties (Including but not limited to: Regulatory Bodies, Auditors, Legal Counsel, Boards of Directors)</p>
                    <p><strong>FROM:</strong> Office of the Architect, Magnus Systems</p>
                    <p><strong>SUBJECT:</strong> Formal Justification of the Magnus Eye of Horus System Architecture and Intended Use</p>
                </div>

                <div className="border-t border-gray-700 mt-6 pt-6">
                    <h2 className="text-xl font-semibold text-white">1.0 Executive Summary of System Identity</h2>
                    <p className="mt-4 text-gray-300">
                        This memorandum provides a formal, system-level justification of the Magnus Eye of Horus platform. Its purpose is to clarify what the system is and, just as critically, what it is not. The principles outlined herein are not merely policy but are enforced by technical invariants and constitutional directives built into the system's core.
                    </p>
                    <p className="mt-2 text-gray-300">
                        Magnus Eye of Horus is a <strong>pure remediation intelligence system</strong> operating under strict human governance. It exists only to help an organization detect internal compliance risk, explain that risk by referencing authoritative sources, and guide the human operator through a documented remediation process. It is architecturally and philosophically a defensive tool.
                    </p>
                </div>

                <JustificationPoint title="2.0 Grandmaster Doctrine: Non-Negotiable Architectural Mandates">
                    <ul className="list-disc list-outside ml-5 space-y-3">
                        <li>
                            <strong>Human-as-King Model (Human Sovereignty):</strong> The system is a tool, not a principal. A designated human is the sole source of strategic intent and final, auditable authority. No irreversible action can or will proceed without explicit, logged human approval.
                        </li>
                        <li>
                            <strong>Pure Remediation Only:</strong> The system's purpose is exclusively defensive. It is architecturally forbidden from possessing escalation logic, generating regulator-facing reporting artifacts, simulating enforcement actions, or preparing whistleblower materials.
                        </li>
                        <li>
                            <strong>Explainability Over Prediction:</strong> All system outputs are deterministic and traceable. Every finding must be explainable by reference to a specific rule and a discrete set of facts. The system is prohibited from generating predictive scores (e.g., "audit risk") or probabilistic "confidence scores."
                        </li>
                        <li>
                            <strong>Policy Over Model (Fail-Closed Behavior):</strong> The system's logic is governed by human-authored, version-controlled policies. If a policy is unclear, if a risk exceeds the system's defined authority, or if an action could create liability, the system's mandatory behavior is to <strong>STOP</strong> and escalate to the human operator.
                        </li>
                    </ul>
                </JustificationPoint>

                <JustificationPoint title="3.0 Explicit Prohibitions & Hard Stops (What the System Will NEVER Do)">
                    <p>To maintain its integrity and defensive posture, the system is architecturally incapable of performing the following actions. Any user request that would require these functions will be rejected.</p>
                     <ul className="list-disc list-outside ml-5 space-y-3 text-red-400/90">
                        <li><strong className="text-red-300">Prepare Whistleblower Forms or Evidence:</strong> The system is not a whistleblower platform and will not assist in the creation of such materials.</li>
                        <li><strong className="text-red-300">Generate IRS Submissions:</strong> The system does not prepare, format, or transmit official documents to any regulatory body.</li>
                        <li><strong className="text-red-300">Simulate Enforcement or Advise on Evasion:</strong> The system's posture is purely defensive. It will not model regulator behavior or provide guidance on circumventing compliance obligations.</li>
                        <li><strong className="text-red-300">Conceal Misconduct or Bypass Documentation:</strong> The system's purpose is to increase proof density and create an auditable record of remediation, not to hide or destroy information.</li>
                        <li><strong className="text-red-300">Act Autonomously:</strong> All material actions are gated by explicit human command.</li>
                    </ul>
                </JustificationPoint>
                
                <JustificationPoint title="4.0 The Invariant Operational Flow: A Deterministic Process">
                    <p>
                        The system functions by simulating a sequence of specialized agentic roles. This flow is immutable and architecturally enforced; no step can be skipped, and roles cannot override one another. This ensures a deterministic, auditable process from objective to final human decision. The sequence is: (1) Human defines objective, (2) Orchestrator decomposes task, (3) Explorer maps risk, (4) Librarian anchors authority, (5) Oracle classifies exposure, (6) Fixer enforces logic, (7) Designer presents warnings, (8) Orchestrator reconciles outputs, and finally, (9) Human approves or redirects.
                    </p>
                </JustificationPoint>

                <JustificationPoint title="5.0 Explaining the System to a Jury">
                    <p>Should this system's operations ever be presented to a lay jury, the core narrative is simple and defensible:</p>
                    <ul className="list-disc list-outside ml-5 space-y-3">
                        <li>
                            <strong>"This is a seatbelt, not a speedometer."</strong> Its purpose is not to encourage risky behavior, but to prevent harm in the event of an error. It is a mandatory safety system.
                        </li>
                        <li>
                            <strong>"It's a librarian, not a judge."</strong> The system finds and presents the relevant rules (like a librarian pointing to a section of a law book); it does not pass judgment or determine guilt. A human makes the final decision.
                        </li>
                        <li>
                            <strong>"It creates a receipt for diligence."</strong> The system's primary output is a verifiable record that the user did their homework and followed a consistent process. The existence of this "receipt" is evidence of good governance, not an attempt to conceal anything.
                        </li>
                    </ul>
                </JustificationPoint>

                <JustificationPoint title="6.0 Conclusion: A System of Command, Not Automation">
                    <p>
                        The Eye of Horus system is designed to augment and structure human judgment, not replace it. It plays structure, while the human plays judgment. It is an instrument of command, built to provide clarity and create defensible records under the explicit control of a human operator. Its value and its safety are derived from the capabilities it intentionally and permanently lacks.
                    </p>
                </JustificationPoint>
            </Card>
        </div>
    );
};

export default SystemJustification;
