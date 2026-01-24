import React from 'react';
// FIX: Use lowercase card.tsx to resolve casing conflicts.
import { Card } from '../ui/card.tsx';
import SectionHeader from '../ui/SectionHeader.tsx';

const BiasMitigationTable: React.FC<{ data: { bias: string; description: string; mitigation: string }[] }> = ({ data }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
                <tr>
                    <th scope="col" className="px-6 py-3">Cognitive Bias</th>
                    <th scope="col" className="px-6 py-3">System Mitigation</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index} className="border-b border-gray-700 align-top">
                        <td className="px-6 py-4">
                            <p className="font-semibold text-white">{row.bias}</p>
                            <p className="text-gray-400 mt-1 text-xs">{row.description}</p>
                        </td>
                        <td className="px-6 py-4 text-cyan-300/90">{row.mitigation}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const HumanFactors: React.FC = () => {

    const biases = [
        {
            bias: 'Overconfidence Bias',
            description: 'Operators rely too heavily on their own experience, potentially dismissing a valid system finding.',
            mitigation: 'The system always presents the specific policy citation alongside a finding (e.g., "IRC §4958"). This grounds the user in objective, external authority rather than their own subjective judgment.'
        },
        {
            bias: 'Normalization of Deviance',
            description: 'Small, repeated deviations from policy become accepted as normal, leading to systemic risk.',
            mitigation: 'Every deviation, no matter how minor, is flagged and logged (e.g., "Advisory" findings). This creates a "broken windows" effect, preventing the gradual erosion of standards by making all exceptions explicit.'
        },
        {
            bias: 'Optimism Bias',
            description: 'Operators believe negative events (like an audit) are less likely to happen to them, leading them to undervalue risks.',
            mitigation: 'The system uses non-predictive, "board-safe" language. It does not engage in debates about likelihood ("This might get audited"). It states facts ("This is inconsistent with policy X"), removing optimism from the equation.'
        },
        {
            bias: 'Authority Bias',
            description: 'A junior operator may hesitate to question a transaction initiated by a senior partner or an important client.',
            mitigation: 'The system is the impartial authority. A "Critical" finding from the Oracle agent provides objective air cover for an operator to enforce policy, regardless of who initiated the transaction.'
        },
    ];

    return (
        <div>
            <SectionHeader title="Human Factors & Behavioral Design" subtitle="Engineering the System to Support Human Psychology Under Pressure" />
            <div className="space-y-8">
                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-yellow-400 mb-4">"Panic Mode" UX: Designing for Duress</h2>
                    <p className="text-gray-300 mb-6">When an operator is under active audit or regulatory inquiry, the risk of human error increases dramatically. "Panic Mode" is a system state designed to mitigate this risk by increasing friction, simplifying choices, and preventing rash decisions. It is a safety-oriented UI, not an enforcement tool.</p>
                    
                    <div className="border border-gray-700 rounded-lg p-6 bg-gray-900/50">
                        <div className="animate-pulse flex items-center justify-center p-3 mb-6 bg-red-900/50 border border-red-500/30 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <h3 className="text-lg font-semibold text-red-300">ACTIVE INQUIRY MODE: Actions are subject to heightened scrutiny.</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold text-white mb-2">Decision Throttling</h4>
                                <p className="text-sm text-gray-400 mb-3">Critical actions are slowed down to force deliberation.</p>
                                <button disabled className="w-full bg-blue-800 text-blue-300 font-bold py-3 px-4 rounded-lg cursor-not-allowed opacity-70">
                                    Export Audit Packet (Hold for 5s)
                                </button>
                                <p className="text-xs text-gray-500 text-center mt-1">Example: A mandatory "hold-to-confirm" timer prevents accidental or rushed data exports.</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white mb-2">Forced Human Review</h4>
                                <p className="text-sm text-gray-400 mb-3">System automatically enforces the strongest review controls.</p>
                                <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                                    <div>
                                        <p className="font-medium text-white">Mandate Second Review</p>
                                    </div>
                                    <div className="w-12 h-6 flex items-center rounded-full p-1 bg-green-500">
                                        <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-6"></div>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 text-center mt-1">Example: The "Mandate Second Review" toggle is locked to 'On' for all actions during this state.</p>
                            </div>
                            <div className="md:col-span-2">
                                <h4 className="font-semibold text-white mb-2">UI Simplification & Self-Incrimination Prevention</h4>
                                <p className="text-sm text-gray-400 mb-3">The interface is simplified to guide the user toward the safest actions and prevent over-sharing.</p>
                                <div className="bg-gray-800 border border-gray-700/80 rounded-lg p-4">
                                    <p className="text-gray-200 font-medium">Original Finding:</p>
                                    <p className="text-sm font-mono p-2 bg-gray-900 rounded my-2 text-yellow-300">"Governance Finding: EITC Diligence Documentation - Form 8867 is incomplete."</p>
                                    <p className="text-gray-200 font-medium mt-4">Available Actions:</p>
                                    <div className="flex space-x-2 mt-2">
                                        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">1. Attach Completed Form 8867</button>
                                        <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">2. Request Senior Review</button>
                                        <button disabled className="flex-1 bg-gray-700 text-gray-500 font-bold py-2 px-4 rounded cursor-not-allowed line-through">Add Explanatory Note</button>
                                    </div>
                                     <p className="text-xs text-gray-500 text-center mt-2">Free-text fields are disabled to prevent the entry of speculative or legally discoverable admissions. The user is guided to provide structured data, not unstructured narrative.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-yellow-400 mb-4">Cognitive Bias Mitigation</h2>
                    <p className="text-gray-300 mb-6">The system is designed with an awareness of common cognitive biases that lead to compliance failures. The UI and workflow contain specific "nudges" and "friction points" to counteract these predictable patterns of human error.</p>
                    <BiasMitigationTable data={biases} />
                </Card>
            </div>
        </div>
    );
};

export default HumanFactors;