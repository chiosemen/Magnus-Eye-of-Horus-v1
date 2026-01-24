import React from 'react';
// FIX: Standardize casing to Card.tsx to resolve compiler conflict.
import { Card } from '../ui/card.tsx';
import SectionHeader from '../ui/SectionHeader.tsx';

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
                            text="Every action, query, decision, and policy version is immutability logged and cryptographically hashed. The entire history of any transaction must be perfectly reproducible for an audit."
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
                            title="Confidence Scoring"
                            text="Agent outputs are never accompanied by a 'confidence score' (e.g., '85% confident this is self-dealing'). Rationale: Confidence scores are probabilistic and violate the mandate for deterministic, rule-based outputs."
                        />
                    </ul>
                </Card>
            </div>
        </div>
    );
};

export default GrandmasterConstitution;
