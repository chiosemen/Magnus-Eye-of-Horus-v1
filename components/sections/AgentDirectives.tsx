import React from 'react';
// FIX: Standardize casing to Card.tsx to resolve compiler conflict.
import { Card } from '../ui/Card.tsx';
import SectionHeader from '../ui/SectionHeader.tsx';

interface Directive {
    agent: string;
    icon: string;
    directive: string;
    rationale: string;
}

const directives: Directive[] = [
    {
        agent: 'Explorer (Knight)',
        icon: '♞',
        directive: 'Use shallow pattern recognition only. Do NOT perform legal interpretation.',
        rationale: 'The Explorer\'s role is to be a pure, read-only data conduit. Any act of interpretation would taint the factual record at its source. It must fetch raw data points without adding context, summary, or judgment.'
    },
    {
        agent: 'Oracle (Bishop)',
        icon: '♝',
        directive: 'Apply static taxonomy rules without deviation. Do NOT infer intent or context beyond the provided facts.',
        rationale: 'The Oracle must function as a deterministic state machine. Its value comes from its absolute predictability and lack of creativity. It matches facts to pre-defined patterns, ensuring every classification is auditable to a specific rule.'
    },
    {
        agent: 'Fixer (Rook)',
        icon: '♜',
        directive: 'Propose remediation based exclusively on approved playbooks. Do NOT invent novel remedies.',
        rationale: 'The Fixer must not creatively problem-solve. It identifies which pre-vetted control applies to a detected risk. This prevents "remediation drift" and ensures that every fix is sanctioned by the organization\'s compliance leadership.'
    },
    {
        agent: 'Librarian (Pawn)',
        icon: '♟️',
        directive: 'Fetch authoritative citations without summary. Do NOT offer legal advice or opinions.',
        rationale: 'The Librarian is a retrieval engine. By stripping summaries and opinions, the system ensures findings are anchored in the primary source text, leaving judgment to the Human King.'
    },
    {
        agent: 'Designer (Pawn → Queen)',
        icon: '👸',
        directive: 'Translate findings into board-safe language. Do NOT use speculative or prosecutorial terms.',
        rationale: 'The Designer ensures discovery-safe presentation. By mapping technical violations to governance outcomes, it prevents the creation of speculative records that could be hostilely interpreted during an inquiry.'
    }
];

const AgentDirectives: React.FC = () => {
    return (
        <div className="space-y-6">
            <SectionHeader 
                title="Agent Directives & Constraints" 
                subtitle="Machine-enforced prohibitions and behavioral mandates for the agent mesh." 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {directives.map((item, i) => (
                    <Card key={i} className="bg-gray-800/40 border-gray-700/50 p-6 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <span className="text-4xl filter drop-shadow-[0_0_8px_rgba(245,158,11,0.2)]">{item.icon}</span>
                            <h3 className="text-xl font-bold text-white tracking-tight">{item.agent}</h3>
                        </div>
                        
                        <div className="space-y-3">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-accent mb-1">Canonical Directive</h4>
                                <p className="text-sm text-gray-200 leading-relaxed font-medium italic">"{item.directive}"</p>
                            </div>
                            
                            <div className="pt-3 border-t border-gray-700/50">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Architectural Rationale</h4>
                                <p className="text-xs text-gray-400 leading-relaxed">{item.rationale}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <Card className="bg-accent/5 border border-accent/20 p-6 mt-8">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                        <span className="text-accent font-bold">!</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Constraint Enforcement</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            These directives are not merely guidelines; they are architecturally enforced. The Orchestrator agent 
                            verifies every agent response against these constraints. Any deviation results in an immediate 
                            <span className="text-white font-bold italic"> fail-closed rejection</span> of the work unit.
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default AgentDirectives;