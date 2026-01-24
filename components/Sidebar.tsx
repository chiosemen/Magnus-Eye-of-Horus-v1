import React from 'react';
import { SECTIONS } from '../constants.tsx';
import type { SectionId } from '../types.ts';
import { Shield } from 'lucide-react';

interface SidebarProps {
    activeSection: SectionId;
    setActiveSection: (section: SectionId) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
    return (
        <nav className="w-80 h-full bg-background border-r flex flex-col flex-shrink-0 shadow-lg z-10">
            <div className="p-6 border-b flex items-center gap-4 bg-muted/20">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center border border-accent/20">
                    <Shield className="h-7 w-7 text-accent" />
                </div>
                <div>
                    <h1 className="font-black text-xl tracking-tighter text-foreground">Magnus</h1>
                    <p className="text-accent text-[10px] font-bold uppercase tracking-widest">Grandmaster Playbook</p>
                </div>
            </div>
            
            <div className="flex-grow overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
                {SECTIONS.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full text-left flex items-center p-3 rounded-xl transition-all duration-200 group ${
                            activeSection === section.id
                                ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20 font-bold'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                    >
                        <span className={`mr-3 transition-transform duration-200 group-hover:scale-110 ${
                            activeSection === section.id ? 'text-accent-foreground' : 'text-accent'
                        }`}>
                            {section.icon}
                        </span>
                        <span className="text-sm tracking-tight">{section.title}</span>
                    </button>
                ))}
            </div>

            <div className="p-6 border-t bg-muted/10">
                <div className="flex flex-col gap-1 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">System Engine v1.0.4</p>
                    <p className="text-[9px] text-muted-foreground/60 italic">Human-Governed Remediation Intelligence</p>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;