import React from 'react';
// FIX: Use lowercase card.tsx to resolve casing conflicts.
import { Card } from '../ui/card.tsx';
import SectionHeader from '../ui/SectionHeader.tsx';

const LogFieldTable: React.FC<{ data: { field: string; example: string; rationale: string }[] }> = ({ data }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
                <tr>
                    <th scope="col" className="px-6 py-3">Field</th>
                    <th scope="col" className="px-6 py-3">Example</th>
                    <th scope="col" className="px-6 py-3">Rationale</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index} className="border-b border-gray-700 align-top">
                        <td className="px-6 py-4 font-mono font-semibold text-gray-200">{row.field}</td>
                        <td className="px-6 py-4 font-mono text-cyan-300">{row.example}</td>
                        <td className="px-6 py-4 text-gray-400">{row.rationale}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);


const LoggingDoctrine: React.FC = () => {
    const loggedFields = [
        { field: 'timestamp', example: '2024-10-27T10:00:00.123Z', rationale: 'Provides an immutable, chronological record of events.' },
        { field: 'transaction_id', example: 'tx_abc123', rationale: 'Groups all related log entries into a single, auditable sequence.' },
        { field: 'agent_id', example: 'Oracle-v1.2', rationale: 'Attributes the action to a specific, versioned system component.' },
        { field: 'action_name', example: 'CLASSIFY_RISK', rationale: 'Describes the objective, factual event that occurred.' },
        { field: 'input_hash', example: 'sha256:a1b2c3...', rationale: 'Verifies the exact data the agent received, ensuring integrity.' },
        { field: 'output_hash', example: 'sha256:d4e5f6...', rationale: 'Verifies the exact data the agent produced, ensuring integrity.' },
        { field: 'policy_version', example: 'git:b3c4d5e', rationale: 'Links the decision to the precise version of the rule that was applied.' },
        { field: 'human_approver_id', example: 'j.doe@example.com', rationale: 'Records the final human authority for the decision, fulfilling the Grandmaster Doctrine.' },
    ];

    const redactionData = [
         { role: 'Board', visibility: 'Aggregated, anonymized event counts (e.g., "5 High Risk flags remediated this quarter").', rationale: 'Provides strategic oversight without exposing tactical, case-specific details. Fulfills duty of care while minimizing unnecessary information exposure.' },
         { role: 'Admin / CCO', visibility: 'Full, unredacted access to all log fields for all transactions.', rationale: 'Required for full system audit, incident response, and governance functions. This role is the designated steward of the system logs.' },
         { role: 'Staff / Operator', visibility: 'Full access to logs related to their own transactions. Access to other logs is restricted.', rationale: 'Provides necessary context for their own work while adhering to the principle of least privilege for data they do not own.' },
    ];

    return (
        <div>
            <SectionHeader title="Logging Doctrine" subtitle="Ensuring Explainability and a Non-Prosecutorial Record" />
            <div className="space-y-8">
                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Core Principles</h2>
                    <ul className="list-disc list-inside space-y-3 text-gray-300">
                        <li><strong>Preserve Explainability:</strong> A log entry must contain everything needed to perfectly reproduce a past event: the data, the agent, and the rules.</li>
                        <li><strong>Avoid Intent Inference:</strong> Logs record what happened, not why. They are a chain of evidence, not a narrative of intent. This prevents logs from being misinterpreted as evidence of motive.</li>
                        <li><strong>Separate Analysis from Decision:</strong> The logs of analytical agents (Explorer, Oracle) are distinct from the final, authoritative log entry created by the Human's decision. This creates a clear boundary between system-generated analysis and human-authorized action.</li>
                        <li><strong>Immutable & Sequenced:</strong> Logs are written to an append-only ledger and chained together via transaction IDs, making them tamper-evident and easily auditable.</li>
                        <li><strong>Discovery-Safe Phrasing:</strong> Log entries use objective, non-prejudicial language (e.g., "Policy inconsistent with data" instead of "Violation detected"). This minimizes the risk of logs being misinterpreted as admissions of guilt during legal discovery.</li>
                    </ul>
                </Card>
                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Log Content Schema: What is Logged</h2>
                    <p className="text-gray-400 mb-4">The log schema is strictly defined to capture only objective, verifiable facts about a system event.</p>
                    <LogFieldTable data={loggedFields} />
                </Card>
                 <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Prohibited Log Content: What is NEVER Logged</h2>
                    <p className="text-gray-400 mb-4">To prevent the creation of speculative or discoverable prosecutorial exhibits, the following data types are architecturally forbidden from being written to any log.</p>
                     <ul className="list-disc list-inside space-y-2 text-red-400/90">
                        <li><strong className="text-red-300">Confidence Scores or Probabilities:</strong> (e.g., "85% confident this is a match"). Rationale: Violates the 'Confidence Scoring' prohibition.</li>
                        <li><strong className="text-red-300">User-Entered Free-Text Notes or Rationales:</strong> Rationale: Unstructured text can contain speculation or legally damaging admissions. All justifications must be structured selections from pre-approved language.</li>
                        <li><strong className="text-red-300">Predictions or Forecasts:</strong> (e.g., "High likelihood of audit"). Rationale: Violates the 'Predictive Scoring' prohibition.</li>
                        <li><strong className="text-red-300">User Sentiment or Behavioral Analytics:</strong> (e.g., "User hesitated for 15.3 seconds"). Rationale: Infers intent and creates speculative data.</li>
                        <li><strong className="text-red-300">Drafts or Intermediate Calculations:</strong> Only the final, committed inputs and outputs are hashed and logged.</li>
                    </ul>
                </Card>
                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Role-Based Redaction and Visibility</h2>
                    <p className="text-gray-400 mb-4">Log data is considered highly sensitive. Access is granted on a "need-to-know" basis, with redaction rules enforced at the presentation layer.</p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Role</th>
                                    <th scope="col" className="px-6 py-3">Visible Log Data</th>
                                    <th scope="col" className="px-6 py-3">Rationale</th>
                                </tr>
                            </thead>
                            <tbody>
                                {redactionData.map((row, index) => (
                                    <tr key={index} className="border-b border-gray-700 align-top">
                                        <td className="px-6 py-4 font-semibold text-gray-200">{row.role}</td>
                                        <td className="px-6 py-4 text-gray-300">{row.visibility}</td>
                                        <td className="px-6 py-4 text-gray-400">{row.rationale}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default LoggingDoctrine;
