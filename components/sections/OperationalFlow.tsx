import React, { useState, useEffect, useRef } from 'react';
import SectionHeader from '../ui/SectionHeader.tsx';
// FIX: Standardize casing to Card.tsx to resolve compiler conflict.
import { Card } from '../ui/Card.tsx';

const OperationalFlow: React.FC = () => {
    const steps = [
        { step: 1, title: 'Define Objective', agent: 'Human (King)', description: 'The process begins when a human operator defines a clear, unambiguous objective, such as "Review this tax return for diligence compliance" or "Assess this grant recommendation for self-dealing."' },
        { step: 2, title: 'Decompose', agent: 'Orchestrator (Queen)', description: 'The Orchestrator receives the objective and breaks it down into a formal, sequential execution plan, determining which agents need to be activated and in what order.' },
        { step: 3, title: 'Scout', agent: 'Explorer (Knight)', description: 'The Explorer executes queries against internal, structured data sources to gather the specific facts required by the execution plan. It fetches data without interpretation.' },
        { step: 4, title: 'Anchor Authority', agent: 'Librarian (Pawn)', description: 'The Librarian takes the factual predicates from the Explorer and matches them against its corpus of version-controlled policies, regulations, and statutes, returning the relevant authoritative text.' },
        { step: 5, title: 'Classify Risk', agent: 'Oracle (Bishop)', description: 'The Oracle evaluates the facts and the authoritative text against the Red-Flag Taxonomy, assigning a non-predictive risk classification (e.g., Critical, High Risk, Advisory).' },
        { step: 6, title: 'Enforce Controls', agent: 'Fixer (Rook)', description: 'Based on the risk classification, the Fixer identifies and proposes the appropriate, pre-approved remediation controls from its playbook (e.g., "Require Documentation," "Block Execution").' },
        { step: 7, title: 'Render UI', agent: 'Designer (Pawn → Queen)', description: 'The Designer synthesizes all outputs into a single, coherent, board-safe user interface, clearly presenting the findings, citations, and proposed controls for human review.' },
        { step: 8, title: 'Reconcile', agent: 'Orchestrator (Queen)', description: 'The Orchestrator confirms that all agents have completed their tasks successfully and that the final state presented by the Designer is consistent with the initial objective. It packages the results.' },
        { step: 9, title: 'Approve or Redirect', agent: 'Human (King)', description: 'The human operator reviews the complete picture and makes the final decision: approve the proposed remediation and proceed, or reject/redirect the task with new instructions, restarting the flow.' }
    ];

    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const mermaidRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mermaidRef.current && (window as any).mermaid) {
            const mermaid = (window as any).mermaid;
            
            const nodeDefinitions = steps.map(s => `S${s.step}["${s.step}. ${s.title}<br/><span style='font-size:0.8rem; color: #facc15;'>${s.agent}</span>"]`).join(' --> ');
            
            const graphDefinition = `
graph TD
    classDef default fill:#1f2937,stroke:#4b5563,stroke-width:2px,color:#d1d5db,font-weight:bold;
    classDef active fill:#ca8a04,stroke:#f59e0b,stroke-width:2px,color:#ffffff,font-weight:bold;
    ${nodeDefinitions}
    class S${steps[currentStepIndex].step} active;
`;
            
            mermaidRef.current.innerHTML = graphDefinition;
            mermaidRef.current.removeAttribute('data-processed');
            
            mermaid.run({
                nodes: [mermaidRef.current],
            });
        }
    }, [currentStepIndex, steps]);

    const handleNext = () => setCurrentStepIndex((prev) => (prev + 1) % steps.length);
    const handlePrev = () => setCurrentStepIndex((prev) => (prev - 1 + steps.length) % steps.length);
    
    const activeStep = steps[currentStepIndex];

    return (
        <div className="space-y-6">
            <SectionHeader title="Final Operational Flow" subtitle="The Canonical, Unskippable Sequence of Operations" />
            <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                <div className="w-full overflow-x-auto p-4 flex justify-center items-center min-h-[300px]">
                    <div ref={mermaidRef} className="mermaid" key={currentStepIndex}></div>
                </div>

                <div className="mt-6 border-t border-gray-700 pt-6">
                    <div className="text-center">
                        <span className="text-sm font-bold text-gray-500 uppercase">STEP {activeStep.step} OF {steps.length}</span>
                        <h3 className="text-2xl font-bold text-white mt-2">{activeStep.title}</h3>
                        <p className="text-lg text-yellow-400 mb-2">{activeStep.agent}</p>
                    </div>
                    <p className="text-gray-400 text-center max-w-3xl mx-auto mt-4 h-24">{activeStep.description}</p>
                </div>
                
                <div className="flex justify-between items-center mt-8">
                    <button onClick={handlePrev} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">Previous</button>
                    <div className="flex items-center space-x-2">
                        {steps.map((_, index) => (
                            <button 
                                key={index} 
                                onClick={() => setCurrentStepIndex(index)} 
                                className={`w-3 h-3 rounded-full transition-colors ${currentStepIndex === index ? 'bg-yellow-400' : 'bg-gray-600 hover:bg-gray-500'}`}
                                aria-label={`Go to step ${index + 1}`}
                            />
                        ))}
                    </div>
                    <button onClick={handleNext} className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors">Next</button>
                </div>
            </Card>
        </div>
    );
};

export default OperationalFlow;
