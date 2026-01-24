
import React, { useEffect, useRef } from 'react';
// FIX: Standardize import casing to use the 'Card.tsx' alias to prevent module resolution conflicts.
import { Card } from '../ui/Card';
import SectionHeader from '../ui/SectionHeader';

const SystemsArchitecture: React.FC = () => {
    const agenticFlowRef = useRef<HTMLDivElement>(null);
    const c4Ref = useRef<HTMLDivElement>(null);

    const agenticFlowDiagram = `
flowchart TD
    H[Human / Board / Compliance Officer ♔] -->|Define Objective| Q[Orchestrator ♛]

    Q --> N[Explorer ♞]
    Q --> L[Librarian ♟️]
    Q --> O[Oracle ♝]

    N --> Q
    L --> Q
    O --> Q

    Q --> F[Fixer ♜]
    F --> D[Designer ♙→♛]

    D --> Q
    Q -->|Remediation Plan| H

    H -->|Approve / Redirect| Q

    %% Guardrails
    O -.->|Risk Threshold Breach| X[FAIL-CLOSED BLOCK]
    F -.->|Critical Flag| X
    
    style H fill:#a78bfa,stroke:#8b5cf6,stroke-width:2px,color:#fff
    style Q fill:#facc15,stroke:#eab308,stroke-width:2px,color:#422006
    style D fill:#facc15,stroke:#eab308,stroke-width:2px,color:#422006
    style X fill:#ef4444,stroke:#dc2626,stroke-width:2px,color:#fff

    classDef agent fill:#0d9488,stroke:#0f766e,stroke-width:2px,color:#fff
    class N,L,O,F agent
    `;

    const c4ContainerDiagram = `
C4Container
    title Magnus Eye of Horus — Nonprofit / DAF Edition

    Person(board, "Board / Compliance Officer", "Defines risk posture, approves remediation")

    System_Boundary(eoh, "Magnus Eye of Horus") {

        Container(ui, "Control Plane UI", "Web", "Board-safe dashboards, toggles, warnings")

        Container(orchestrator, "Orchestrator", "Service", "Task decomposition & reconciliation")

        Container(agents, "Agent Mesh", "AI Services", "Explorer, Oracle, Librarian, Fixer, Designer")

        Container(policy, "Policy Engine", "OPA / Cedar", "Hard constitutional guardrails")

        Container(scoring, "Risk Engine", "Service", "Severity-weighted nonprofit risk scoring")

        Container(data, "Compliance Data Store", "Encrypted DB", "Grant metadata, governance signals")
    }

    board --> ui
    ui --> orchestrator
    orchestrator --> agents
    agents --> scoring
    scoring --> policy
    policy --> orchestrator
    orchestrator --> ui
    ui --> board
    `;

    useEffect(() => {
        if ((window as any).mermaid) {
            const mermaid = (window as any).mermaid;
            
            if (agenticFlowRef.current) {
                agenticFlowRef.current.innerHTML = agenticFlowDiagram.trim();
                agenticFlowRef.current.removeAttribute('data-processed');
            }
            if (c4Ref.current) {
                c4Ref.current.innerHTML = c4ContainerDiagram.trim();
                c4Ref.current.removeAttribute('data-processed');
            }

            mermaid.run({
                nodes: [agenticFlowRef.current, c4Ref.current].filter(Boolean) as HTMLElement[],
            });
        }
    }, [agenticFlowDiagram, c4ContainerDiagram]);

    return (
        <div>
            <SectionHeader title="Systems Architecture" subtitle="Component Interaction, Data Flows, and Boundaries" />
            <div className="space-y-8">
                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Agentic Flow (Eye of Horus Core)</h2>
                    <p className="text-gray-400 mb-4">This diagram illustrates the sequential, fail-closed flow of control between agents. No agent can act out of turn, and human approval is the final gate for any action. No arrow bypasses the Human, and no agent escalates externally.</p>
                    <div className="text-center p-4 bg-gray-900/50 rounded-lg flex justify-center items-center min-h-[400px]">
                        <div ref={agenticFlowRef} className="mermaid"></div>
                    </div>
                </Card>
                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">C4 Container View (DAF / Nonprofit Variant)</h2>
                    <p className="text-gray-400 mb-4">This C4 diagram shows the high-level container structure. The key invariant is that the Policy Engine sits above the execution agents, functioning as a hard guardrail, not merely an advisory service.</p>
                     <div className="text-center p-4 bg-gray-900/50 rounded-lg flex justify-center items-center min-h-[400px]">
                        <div ref={c4Ref} className="mermaid"></div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default SystemsArchitecture;