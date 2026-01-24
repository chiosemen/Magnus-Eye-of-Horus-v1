import React from 'react';
// FIX: Use lowercase card.tsx to resolve casing conflicts.
import { Card } from '../ui/card.tsx';
import SectionHeader from '../ui/SectionHeader.tsx';

const BoundaryList: React.FC<{ title: string, items: string[] }> = ({ title, items }) => (
    <div>
        <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-400">
            {items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
    </div>
);

const ScalingPoint: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <div className="text-gray-400 space-y-3">{children}</div>
    </div>
);

const SystemBoundaries: React.FC = () => {
    return (
        <div>
            <SectionHeader title="System Boundaries & Scalable Trust" subtitle="Architectural Commitments and Principles for Growth" />
            <div className="space-y-8">
                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-yellow-400 mb-4">The Unbreachable Moat & Self-Limitation Doctrine</h2>
                    <p className="text-gray-300 mb-6">To maintain its identity as a purely defensive, human-governed remediation tool, Eye of Horus is architecturally and contractually bound by a doctrine of self-restraint. These are not features to be added later; their absence is a core, immutable feature of the system's design that increases its long-term enterprise value.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <BoundaryList 
                            title="What Users Can NEVER Do"
                            items={[
                                "Automate final approval: A human must always provide the final, logged authorization for any material action.",
                                "Delegate core authority programmatically: The 'Grandmaster' role cannot be automated or delegated via API.",
                                "Bypass the Orchestrator: No user can force agents to execute out of the canonical sequence.",
                                "Purge or alter audit logs: Logs are immutable and append-only by design."
                            ]}
                        />
                        <BoundaryList 
                            title="What Plans Can NEVER Unlock"
                            items={[
                                "Predictive scoring: No enterprise tier will ever unlock predictive audit risk scores.",
                                "Automated enforcement: No plan will ever allow the system to block funds or file reports without human approval.",
                                "Anonymous reporting: No feature will ever be added to facilitate anonymous whistleblowing.",
                                "AI-driven policy creation: Policies are human-authored and version-controlled."
                            ]}
                        />
                        <BoundaryList 
                            title="What Data is NEVER Exported"
                            items={[
                                "Speculative data: Confidence scores, drafts, or intermediate calculations are never logged and cannot be exported.",
                                "Unstructured user notes: To prevent discovery of privileged communication, free-text note fields are intentionally absent from core models.",
                                "Raw PII for analytics: PII is sandboxed at the Explorer level and is never part of the core analytical log export.",
                                "System performance telemetry linked to user data."
                            ]}
                        />
                        <BoundaryList 
                            title="What Features are INTENTIONALLY Missing"
                            items={[
                                "Open Web Search / OSINT: To maintain a discovery-safe data boundary.",
                                "Social media integration: Violates data provenance rules.",
                                "Inter-user messaging: To prevent unlogged, undiscoverable communication that could be construed as collusion.",
                                "Automated external notifications (email, SMS, etc.)."
                            ]}
                        />
                    </div>
                </Card>

                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-yellow-400 mb-4">Scaling Trust: The Flywheel of Verifiability</h2>
                    <p className="text-gray-300 mb-6">The central challenge of scaling a compliance system is maintaining trust and avoiding the creation of perverse incentives. Eye of Horus achieves this not through policy, but through its immutable architecture, which creates a reinforcing "Trust Flywheel."</p>
                    <div className="space-y-6">
                        <ScalingPoint title="1. Users Trust the System (Increased Proof Density)">
                            <p>
                                Users adopt the system because it provides a reliable way to create a defensible, auditable record of their diligence (the "Proof Density Invariant"). This reduces their personal and professional risk. The system's value is in producing a clean record, which aligns its incentives with the user's goal of achieving compliance.
                            </p>
                        </ScalingPoint>
                        <ScalingPoint title="2. Boards Trust the Users (Verifiable Governance)">
                            <p>
                                Boards and leadership trust the reports generated by users because they know the outputs are a result of a consistent, non-overridable, and auditable process. The "Board-Safe Language Invariant" ensures they receive clear, non-speculative information, allowing them to fulfill their duty of care. This reduces organizational risk.
                            </p>
                        </ScalingPoint>
                        <ScalingPoint title="3. Regulators Trust the Records (Legible Diligence)">
                            <p>
                                Over time, regulators and auditors come to trust the audit packets generated by the system. Because every fact is traceable to a source and every decision is tied to a policy version and a human approver (the "Immutability & Traceability Invariant"), the records are highly credible. This legibility can lead to shorter, less adversarial inquiries, reducing regulatory risk.
                            </p>
                        </ScalingPoint>
                         <ScalingPoint title="4. Courts Trust the Evidence (Reduced Ambiguity)">
                            <p>
                                In the rare event of litigation, the system's logs and audit packets are presented as evidence. Because the system is designed to survive hostile discovery—avoiding speculation and logging facts—its records are clear and unambiguous. This clarity reinforces the trustworthiness of the entire process, which in turn reinforces user, board, and regulator trust, completing the flywheel.
                            </p>
                        </ScalingPoint>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default SystemBoundaries;
