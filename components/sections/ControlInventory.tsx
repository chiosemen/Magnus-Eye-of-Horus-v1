import React from 'react';
// FIX: Use lowercase card.tsx to resolve casing conflicts.
import { Card } from '../ui/card.tsx';
import SectionHeader from '../ui/SectionHeader.tsx';

interface Control {
    name: string;
    type: 'Gate' | 'Toggle' | 'Kill-Switch' | 'Constraint';
    visibility: string;
    activator: string;
    effect: string;
    downstreamBlock: string;
}

const controls: Control[] = [
    {
        name: 'Initial Objective Approval',
        type: 'Gate',
        visibility: 'Admin, Operator',
        activator: 'Human (King)',
        effect: 'The Human defines a strategic objective (e.g., "Review this return").',
        downstreamBlock: 'No agent can activate until a valid objective is logged by the Human.'
    },
    {
        name: 'Final Remediation Approval',
        type: 'Gate',
        visibility: 'Admin, Operator',
        activator: 'Human (King)',
        effect: 'The Human approves, denies, or redirects the full remediation plan presented by the Designer.',
        downstreamBlock: 'No audit packet is generated, no transaction is finalized, and no data leaves the system boundary without this explicit, final approval.'
    },
    {
        name: 'Require Documentation',
        type: 'Toggle',
        visibility: 'Admin, Operator',
        activator: 'Human (King), via Fixer proposal',
        effect: 'The system interface blocks the "Approve" action until a specified document is uploaded and passes basic validation.',
        downstreamBlock: 'The final approval gate remains locked until the documentation requirement is satisfied.'
    },
    {
        name: 'Mandate Second Review',
        type: 'Toggle',
        visibility: 'Admin, Operator',
        activator: 'Human (King), via Fixer proposal',
        effect: 'The transaction is flagged and routed to a pre-defined secondary approver\'s queue.',
        downstreamBlock: 'The transaction cannot proceed to the final approval stage for the initial operator until the second review is complete.'
    },
    {
        name: 'Block Execution',
        type: 'Toggle',
        visibility: 'Admin, Operator',
        activator: 'Human (King), via Fixer proposal',
        effect: 'The transaction is placed into a "Hard Stop" state.',
        downstreamBlock: 'All further actions are blocked. Requires an explicit, logged override from an Admin-level user to resume.'
    },
    {
        name: 'System-Wide Policy Halt',
        type: 'Kill-Switch',
        visibility: 'Admin',
        activator: 'Admin',
        effect: 'An Admin activates a system-wide halt on a specific category of transaction (e.g., "All EITC Claims").',
        downstreamBlock: 'The Policy-as-Code Engine will deny all transactions in the specified category, regardless of their individual merits, until the halt is lifted by an Admin.'
    },
    {
        name: 'Role-Based Visibility',
        type: 'Constraint',
        visibility: 'N/A (Architectural)',
        activator: 'System (Architectural)',
        effect: 'The UI layer renders different views of data and controls based on the logged-in user\'s role (e.g., Operator, Admin, Board).',
        downstreamBlock: 'Users are architecturally prevented from seeing or interacting with data and controls for which they are not authorized.'
    },
    {
        name: 'Dual-Key Authorization',
        type: 'Constraint',
        visibility: 'Admin, Operator',
        activator: 'System (Policy-as-Code)',
        effect: 'For actions designated as high-stakes in the policy engine, the system requires two separate, logged approvals from authorized individuals.',
        downstreamBlock: 'The action remains in a pending state and cannot be executed until both approvals are registered.'
    },
];

const ControlInventory: React.FC = () => {
    return (
        <div>
            <SectionHeader title="Control Inventory" subtitle="A Formal Enumeration of All System Governance Mechanisms" />
            <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Control Name & Type</th>
                                <th scope="col" className="px-6 py-3">Visibility & Activator</th>
                                <th scope="col" className="px-6 py-3">Effect & Downstream Block</th>
                            </tr>
                        </thead>
                        <tbody>
                            {controls.map((control, index) => (
                                <tr key={index} className="border-b border-gray-700 align-top">
                                    <td className="px-6 py-4">
                                        <p className="font-semibold text-white">{control.name}</p>
                                        <p className="text-xs font-mono uppercase mt-1 text-yellow-400">{control.type}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-gray-300"><strong className="text-gray-400 font-normal">Visible to:</strong> {control.visibility}</span>
                                            <span className="text-gray-300 mt-1"><strong className="text-gray-400 font-normal">Activated by:</strong> {control.activator}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-gray-300">{control.effect}</p>
                                        <p className="mt-2 text-cyan-300/80"><strong className="text-cyan-400/80 font-normal">Blocks:</strong> {control.downstreamBlock}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default ControlInventory;