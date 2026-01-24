import React from 'react';
// FIX: Standardize casing to Card.tsx to resolve compiler conflict.
import { Card } from '../ui/Card.tsx';
import SectionHeader from '../ui/SectionHeader.tsx';

const CodeBlock: React.FC<{ title: string; children: React.ReactNode; lang?: string }> = ({ title, children, lang = 'rego' }) => (
    <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <pre className="bg-gray-900 text-sm text-cyan-300 p-4 rounded-lg overflow-x-auto">
            <code className={`language-${lang}`}>
                {children}
            </code>
        </pre>
    </div>
);

const PolicyAsCodeEngine: React.FC = () => {
    const opaIndividualBenefit = `
package eye_of_horus.daf

# Hard Block: DAF distributions to individuals are not permitted.
deny[msg] {
  input.grant.recipient_type == "individual"
  msg := "DAF distributions to individuals are not permitted."
}`;

    const opaRequireER = `
package eye_of_horus.daf

# Conditional Requirement: Require ER for non-qualified grantees.
deny[msg] {
  input.grant.recipient_status == "non_qualified"
  not input.documentation.expenditure_responsibility_complete
  msg := "Expenditure Responsibility required before distribution."
}`;

    const opaHumanApproval = `
package eye_of_horus.daf

# Gating Rule: Human approval is mandatory for critical risks.
deny[msg] {
  input.risk_level == "CRITICAL"
  not input.human_approval
  msg := "Human approval required for critical risk remediation."
}`;

    const cedarExample = `
// Readable for Boards: Permit grant approval only if risk is not critical.
permit (
  principal == BoardMember,
  action == "APPROVE_GRANT",
  resource == Grant
)
when {
  Grant.riskLevel != "CRITICAL"
};

// Forbid grant execution if the recipient is an individual.
forbid (
  principal,
  action == "EXECUTE_GRANT",
  resource == Grant
)
when {
  Grant.recipientType == "INDIVIDUAL"
};`;
    
    const constitutionalEnforcement = `
{
  "invariants": [
    "No autonomous execution",
    "No regulator-facing output",
    "Critical risk blocks execution",
    "Human approval required for override",
    "All overrides logged with expiry"
  ]
}`;

    return (
        <div>
            <SectionHeader title="Policy-as-Code Engine" subtitle="Formal Logic for Compliance Rules (OPA/Cedar Style)" />
            <div className="space-y-8">
                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                     <h2 className="text-xl font-semibold text-white mb-4">Core Architecture</h2>
                    <ul className="list-disc list-inside space-y-3 text-gray-300">
                        <li>
                            <strong>Enforcement Boundaries:</strong> The engine's output is purely a decision object (e.g., `{ "allow": false, "reasons": [...] }`). It has no capability to execute actions. The Fixer agent consumes this object to propose controls to the Human.
                        </li>
                        <li>
                            <strong>Fail-Closed Behavior:</strong> If the policy engine fails to execute for any reason (e.g., malformed input, runtime error), the system's global configuration dictates a `default deny`. This prevents system failure from creating compliance gaps.
                        </li>
                        <li>
                            <strong>Versioning & Hashing:</strong> Every policy file is version-controlled in a Git repository. At runtime, the system loads a specific, hashed commit. Every decision in the audit log is stamped with the exact policy hash used to make that decision, ensuring perfect replicability.
                        </li>
                    </ul>
                </Card>

                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">OPA (Rego) Policy Examples</h2>
                    <p className="text-gray-400 mb-4">Policies are written in a declarative language (Rego) that is unambiguous and machine-enforceable. They state the conditions for denial, ensuring a fail-closed design.</p>
                    <CodeBlock title="A. OPA — Hard Block: Individual Benefit">{opaIndividualBenefit.trim()}</CodeBlock>
                    <CodeBlock title="B. OPA — Require ER for Non-Qualified Grantee">{opaRequireER.trim()}</CodeBlock>
                    <CodeBlock title="C. OPA — Human Approval Gate">{opaHumanApproval.trim()}</CodeBlock>
                </Card>
                
                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Cedar-Style Policy Examples</h2>
                     <p className="text-gray-400 mb-4">For board-level communication and high-level rules, policies can also be expressed in a more human-readable, intent-focused format like Cedar.</p>
                    <CodeBlock title="D. Cedar — Readable for Boards" lang="cedar">{cedarExample.trim()}</CodeBlock>
                </Card>

                 <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Constitutional Enforcement (Machine-Locked)</h2>
                    <p className="text-gray-400 mb-4">The highest-level system doctrines are locked as non-negotiable invariants. These are checked by the Orchestrator before and after any policy execution to ensure the system cannot violate its own constitution.</p>
                    <CodeBlock title="E. System Invariants" lang="json">{constitutionalEnforcement.trim()}</CodeBlock>
                </Card>
            </div>
        </div>
    );
};

export default PolicyAsCodeEngine;
