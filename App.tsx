
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import type { SectionId } from './types';

// FIX: Add Page type export to resolve import errors in AppShell and Topbar.
export type Page = 'dashboard' | 'cases' | 'scanner' | 'controls';

const App: React.FC = () => {
    const [activeSection, setActiveSection] = useState<SectionId>('constitution');

    return (
        <div className="flex h-screen bg-gray-900 text-gray-100 font-sans">
            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
            <MainContent activeSection={activeSection} />
        </div>
    );
};

export default App;