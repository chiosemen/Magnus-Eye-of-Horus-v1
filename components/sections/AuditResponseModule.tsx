
import React from 'react';
// FIX: Standardize import casing to use the 'Card.tsx' alias to prevent module resolution conflicts.
import { Card } from '../ui/Card';
import SectionHeader from '../ui/SectionHeader';

const ModuleSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
        <h2 className="text-xl font-bold text-yellow-400 mb-4">{title}</h2>
        <div className="space-y-4">{children}</div>
    </Card>
);

const JustificationTemplate: React.FC = () => (
    <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg text-sm text-gray-300 space-y-4 font-mono">
        <div>
            <h4 className="font-bold text-white">1. Scope Statement</h4>
            <p className="mt-1">"This justification explains the policy basis under which the referenced action was permitted at the time of execution."</p>
        </div>
        <div>
            <h4 className="font-bold text-white">2. Applicable Policy Citation</h4>
            <p className="mt-1">Policy ID: DAF-NY-004 (Effective Jan 1, 2024), Section 3.2 — Non-Earmarked Grants</p>
        </div>
        <div>
            <h4 className="font-bold text-white">3. Factual Preconditions Met</h4>
            <ul className="list-disc list-inside ml-4">
                <li>Recipient status verified</li>
                <li>No donor control indicators present</li>
                <li>Independent governance approval obtained</li>
                <li>Documentation retained</li>
            </ul>
        </div>
        <div>
            <h4 className="font-bold text-white">4. Risk Controls Applied</h4>
            <ul className="list-disc list-inside ml-4">
                <li>Pattern scan executed</li>
                <li>Related-party analysis performed</li>
                <li>Documentation verified</li>
            </ul>
        </div>
        <div>
            <h4 className="font-bold text-white">5. Boundary Statement (Critical)</h4>
            <p className="mt-1 text-cyan-300">"This system does not determine legality, does not assess penalties, and does not replace regulatory judgment. It enforces internal governance thresholds designed to reduce exposure."</p>
        </div>
    </div>
);

const AuditResponseModule: React.FC = () => {
    return (
        <div>
            <SectionHeader title="Audit Response Module" subtitle="Generating Discovery-Safe Justification Packets" />
            <div className="space-y-8">
                <ModuleSection title="I. Audit Response Packet Auto-Assembler">
                    <p className="text-gray-400">This module transforms an inbound inquiry into a pre-indexed, policy-anchored, human-approved response packet without improvisation. It is a defensive evidence assembler, not a form generator. It activates ONLY upon explicit human command in response to a logged inquiry or for internal review.</p>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Canonical Packet Structure (Intentional Order)</h3>
                        <ol className="list-decimal list-inside space-y-3 text-gray-300">
                            <li><strong>Cover Index (Human-Signed):</strong> Lists contents with the standard language: <em className="text-gray-400">"This response is provided to demonstrate documented compliance procedures and governance controls in place at the time of the referenced actions."</em></li>
                            <li><strong>Governance Attestation (Board-Safe):</strong> Proves process existed before the action (board resolution excerpts, policy adoption dates).</li>
                            <li><strong>Policy Snapshot (Time-Bound):</strong> Includes the version-hashed policy file applicable as of the transaction date, preventing retroactive accusations.</li>
                            <li><strong>Action Ledger (Discovery-Safe):</strong> Provides a structured log of the action, containing only objective facts (IDs, timestamps, policy versions, approver roles). No opinions or predictions.</li>
                            <li><strong>Documentation Bundle:</strong> Contains all supporting documents relied upon at the time of the transaction.</li>
                            <li><strong>Explainability Appendix (Optional):</strong> Contains the "Why This Was Allowed" justification, if beneficial to include.</li>
                        </ol>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Architectural Guardrails</h3>
                        <ul className="list-disc list-inside space-y-2 text-red-400/90">
                            <li><strong className="text-red-300">No AI-Generated Correspondence:</strong> The system assembles facts; it does not write letters or arguments.</li>
                            <li><strong className="text-red-300">No Speculation:</strong> The packet contains only what was known and logged at the time of the action.</li>
                            <li><strong className="text-red-300">No Future-Looking Statements:</strong> It does not comment on future compliance or actions.</li>
                            <li><strong className="text-red-300">No "Best Practices" Language:</strong> The packet describes reality, not aspirational intent.</li>
                        </ul>
                    </div>
                </ModuleSection>

                <ModuleSection title="II. 'Why This Is Allowed' Justification Generator">
                    <p className="text-gray-400">This component generates an explanation for why a permitted action was defensible under the policies in place at the time. It is designed to answer the core regulatory question—"Why did you think this was okay?"—without making legal conclusions or admissions of subjective intent.</p>
                    <h3 className="text-lg font-semibold text-white mb-2">Immutable Justification Template</h3>
                    <JustificationTemplate />
                     <div>
                        <h3 className="text-lg font-semibold text-white mb-2">What It NEVER Says</h3>
                        <ul className="list-disc list-inside space-y-2 text-red-400/90">
                           <li><strong className="text-red-300">"Complies with IRS rules"</strong> (states process alignment, not legal conclusion)</li>
                           <li><strong className="text-red-300">"No violation occurred"</strong> (avoids legal determination)</li>
                           <li><strong className="text-red-300">"We believed" or "In our opinion"</strong> (avoids subjective intent)</li>
                        </ul>
                    </div>
                </ModuleSection>

                <ModuleSection title="III. Discovery-Safe Logging Principles">
                     <p className="text-gray-400">The integrity of the generated packets is dependent on the integrity of the underlying logs. The system's logging doctrine is designed with the assumption that all logs will be subpoenaed and hostilely reinterpreted.</p>
                    <ul className="list-disc list-inside space-y-3 text-gray-300">
                        <li><strong>No Free Text:</strong> Prevents the logging of speculative, emotional, or ambiguous user notes that can be misinterpreted.</li>
                        <li><strong>No Model Outputs:</strong> Logs contain the inputs to and decisions from agents, but not the intermediate, non-deterministic "thoughts" of a model.</li>
                        <li><strong>No Predictions:</strong> Logs record historical facts, never forward-looking statements about risk or likelihood.</li>
                        <li><strong>No Intent Language:</strong> Logs answer "what" happened, never "why" someone thought it should happen. All fields are objective.</li>
                        <li><strong>Redaction by Design:</strong> Logs are structured to be easily and reliably redacted (e.g., names to roles, scores to bands), preventing inadvertent over-disclosure.</li>
                    </ul>
                </ModuleSection>
            </div>
        </div>
    );
};

export default AuditResponseModule;