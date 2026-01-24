
import React from 'react';
import { SECTIONS } from '../constants';
import type { SectionId } from '../types';

interface SidebarProps {
    activeSection: SectionId;
    setActiveSection: (section: SectionId) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
    return (
        <nav className="w-80 h-full bg-gray-900 border-r border-gray-700/50 p-5 flex flex-col flex-shrink-0">
            <div className="flex items-center mb-10">
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                </div>
                <div>
                    <h1 className="text-white font-bold text-lg">Magnus</h1>
                    <p className="text-gray-400 text-sm">Eye of Horus</p>
                </div>
            </div>
            <ul className="flex-grow">
                {SECTIONS.map((section) => (
                    <li key={section.id} className="mb-2">
                        <button
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full text-left flex items-center p-3 rounded-lg transition-colors duration-200 ${
                                activeSection === section.id
                                    ? 'bg-yellow-500/10 text-yellow-400'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            }`}
                        >
                            {section.icon}
                            <span className="text-sm font-medium">{section.title}</span>
                        </button>
                    </li>
                ))}
            </ul>
             <div className="text-center text-xs text-gray-600 mt-4">
                <p>Version 1.0.0</p>
                <p>Human-Governed Compliance Intelligence</p>
            </div>
        </nav>
    );
};

export default Sidebar;
