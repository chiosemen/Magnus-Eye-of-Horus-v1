
import React from 'react';
// FIX: Standardize import casing to use the 'Card.tsx' alias to prevent module resolution conflicts.
import { Card } from '../ui/Card';
import SectionHeader from '../ui/SectionHeader';

const DoctrineItem: React.FC<{ title: string; text: string }> = ({ title, text }) => (
    <li className="space-y-1">
        <h4 className="font-semibold text-gray-200">{title}</h4>
        <p className="text-gray-400">{text}</p>
    </li>
);

const GrandmasterConstitution: React.FC = () => {
    return (
        <div>
            <SectionHeader title="The Grandmaster Constitution" subtitle="Canonical Doctrine, Invariants, and Prohibitions of the Magnus System" />
            <div className="space-y-8">
                {/* FIX: Apply explicit styling to Card component to match original design after component consolidation. */}
                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">I. Canonical Doctrine (Locked)</h2>
                    <p className="text-gray-400 mb-6">These doctrines define the unchangeable philosophy and character of the system. They are the strategic principles from which all rules and behaviors are derived.</p>
                    <ol className="list-decimal list-inside space-y-4 text-gray-300">
                        <DoctrineItem 
                            title="The Grandmaster Doctrine (Human Sovereignty)"
                            text="The system is a tool, not a principal. A designated human 'Grandmaster' is the sole source of strategic intent and final, auditable authority. All operations are initiated, directed, and concluded by human command."
                        />
                        <DoctrineItem 
                            title="The Orchestration Doctrine (Agentic Specialization)"
                            text="Intelligence is not monolithic. The system functions as a coordinated 'army' of specialized agents (the 'chess pieces'), each with a unique, irreplaceable role, governed by a deterministic sequence defined by the Orchestrator."
                        />
                         <DoctrineItem 
                            title="The Adversarial Doctrine (Compliance as a Game)"
                            text="The regulatory landscape (e.g., IRS, State AGs) is treated as a thinking adversary. The system's purpose is to anticipate the adversary's data-driven moves (e.g., PTIN aggregation, pattern detection) and build an unassailable defensive position."
                        />
                        <DoctrineItem 
                            title="The Daemon Doctrine (Amoral, Tireless Execution)"
                            text="Agents are 'daemons'—amoral, tireless background processes whose function is to create order from chaos. Their ethics are not inherent but are imposed by the Grandmaster's design, aimed at 'eudaemonia' (human flourishing through helpful systems)."
                        />
                        <DoctrineItem 
                            title="The Remediation Doctrine (Purely Defensive Posture)"
                            text="The system's sole purpose is defensive remediation—to identify and fix compliance gaps for the operator. It is explicitly forbidden from enabling offensive investigation, surveillance, or the creation of legal leverage."
                        />
                         <DoctrineItem 
                            title="The Exegesis & Diegesis Doctrine (Explainability as Narrative)"
                            text="All system outputs must be fully explainable (Exegesis: interpreting the rules' intent) and narratable (Diegesis: telling the story of the transaction). Every finding is traceable to a specific rule and the discrete facts used to trigger it."
                        />
                    </ol>
                </Card>

                {/* FIX: Apply explicit styling to Card component to match original design after component consolidation. */}
                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">II. Non-Negotiable System Invariants</h2>
                     <p className="text-gray-400 mb-6">These are the technical and logical conditions that must always hold true. A violation of any invariant constitutes a critical system failure.</p>
                     <ul className="list-disc list-inside space-y-4 text-gray-300">
                        <DoctrineItem 
                            title="Fail-Closed Invariant"
                            text="All system states default to prohibitive. Any ambiguity, error, or component failure results in a hard stop in a safe, closed state, awaiting explicit human intervention. Permission is the exception; denial is the norm."
                        />
                        <DoctrineItem 
                            title="Sequential Execution Invariant"
                            text="Agents must operate in the fixed, unskippable sequence defined by the Orchestrator (e.g., Human → Orchestrator → Explorer → ... → Human). No agent can act out of turn, bypass another, or initiate its own actions."
                        />
                        <DoctrineItem 
                            title="Immutability & Traceability Invariant"
                            text="Every action, query, decision, and policy version is immutably logged and cryptographically hashed. The entire history of any transaction must be perfectly reproducible for an audit."
                        />
                        <DoctrineItem 
                            title="Proof Density Invariant"
                            text="The system's primary defense is to generate a dense, layered, and contemporaneous web of proof (documents, interview notes, justifications). This is the direct counter-strategy to the adversary's enforcement model, which 'wins on absence of proof.'"
                        />
                        <DoctrineItem 
                            title="Board-Safe Language Invariant"
                            text="All human-facing outputs must use neutral, 'board-safe' language. The system states facts and cites authority; it is forbidden from using predictive, speculative, or accusatory language."
                        />
                         <DoctrineItem 
                            title="No Autonomous Escalation Invariant"
                            text="The system is architecturally incapable of reporting, notifying, or escalating findings to any internal or external party. An explicit, logged Human command is the only path for any information to leave the system's secure boundary."
                        />
                    </ul>
                </Card>

                {/* FIX: Apply explicit styling to Card component to match original design after component consolidation. */}
                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">III. Explicitly Rejected Capabilities</h2>
                    <p className="text-gray-400 mb-6">To maintain its integrity and defensive posture, the system is permanently and architecturally forbidden from possessing the following capabilities.</p>
                    <ul className="list-disc list-inside space-y-4 text-gray-300">
                        <DoctrineItem 
                            title="Predictive Scoring"
                            text="The system does not predict the likelihood of an external event (e.g., '70% chance of audit'). Rationale: Such predictions are speculative, legally discoverable, and violate the doctrine of factual assessment. The system only scores internal deviation from known rules."
                        />
                         <DoctrineItem 
                            title="Whistleblower Functionality"
                            text="The system provides no mechanism for anonymous or direct reporting to authorities. Rationale: This would transform the system from a defensive remediation tool into an offensive enforcement tool, violating the core Remediation Doctrine and creating irresolvable ethical conflicts."
                        />
                         <DoctrineItem 
                            title="Automated Enforcement"
                            text="The system cannot block transactions, suspend accounts, or file reports autonomously. Rationale: This violates the Grandmaster Doctrine of human sovereignty. All material actions require explicit, logged human approval via the Control Plane."
                        />
                         <DoctrineItem 
                            title="Open-Web Intelligence Gathering"
                            text="Agents are forbidden from querying the open internet or any external data source. Rationale: This maintains a 'discovery-safe' data boundary. The system operates only on a locked, version-controlled corpus of internal data and authoritative policies to ensure perfect auditability."
                        />
                         <DoctrineItem 
                            title="Confidence Scoring"
                            text="Agent outputs are never accompanied by a 'confidence score' (e.g., '85% confident this is self-dealing'). Rationale: Confidence scores are probabilistic and violate the mandate for deterministic, rule-based outputs. A flag is either 100% triggered by a rule or 0%."
                        />
                    </ul>
                </Card>
                 {/* FIX: Apply explicit styling to Card component to match original design after component consolidation. */}
                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">IV. Anti-Collusion Doctrine & System Constraints</h2>
                    <p className="text-gray-400 mb-6">To ensure agentic integrity, the following principles of separation are enforced architecturally. These rules prevent agents from improperly influencing one another, ensuring that the Human receives an unbiased synthesis of independent analyses.</p>
                    <ul className="list-disc list-inside space-y-4 text-gray-300">
                        <DoctrineItem 
                            title="No Reinforcement Without Independent Evidence"
                            text="Enforceable System Constraint: An agent's output is tied to the specific hash of its inputs. Agent B cannot simply accept Agent A's conclusion as a valid input; it must receive the raw facts from Agent A and re-run its own independent analysis. This prevents 'information cascades' where an early, potentially erroneous conclusion is amplified without re-verification."
                        />
                         <DoctrineItem 
                            title="No Overriding Policy"
                            text="Enforceable System Constraint: The Policy-as-Code engine is a terminal, read-only service for all other agents. No agent possesses credentials or API endpoints that would allow it to write, modify, or temporarily ignore a policy file. Any attempt to do so results in a logged, critical system halt."
                        />
                         <DoctrineItem 
                            title="No Escalation of Scope"
                            text="Enforceable System Constraint: The Orchestrator issues a transaction-specific, ephemeral data access scope to the Explorer. The data access layer will reject any query from the Explorer that falls outside this exact scope. This prevents an agent from 'getting curious' and accessing data not explicitly authorized by the Human's initial objective."
                        />
                    </ul>
                </Card>
            </div>
        </div>
    );
};

export default GrandmasterConstitution;