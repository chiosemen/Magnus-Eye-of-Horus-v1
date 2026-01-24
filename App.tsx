import React, { useState } from 'react';
import AppShell from './components/AppShell.tsx';
import DashboardPage from './components/pages/DashboardPage.tsx';
import CasesPage from './components/pages/CasesPage.tsx';
import ScannerPage from './components/pages/ScannerPage.tsx';
import ControlsPage from './components/pages/ControlsPage.tsx';
import RedFlagsPage from './components/pages/RedFlagsPage.tsx';
import LandingPage from './components/pages/LandingPage.tsx';
import Sidebar from './components/Sidebar.tsx';
import MainContent from './components/MainContent.tsx';
import type { SectionId } from './types.ts';

// Define the pages for the application based on the UI spec.
export type Page = 
    | 'landing'
    | 'dashboard' 
    | 'cases' 
    | 'scanner' 
    | 'red-flags' 
    | 'remediation-packs' 
    | 'controls' 
    | 'audit-log' 
    | 'vault'
    | 'playbook';

// Container for the Grandmaster Documentation / Playbook view
const PlaybookView: React.FC<{ 
    activeSection: SectionId; 
    setActiveSection: (section: SectionId) => void 
}> = ({ activeSection, setActiveSection }) => {
    return (
        <div className="flex h-[calc(100vh-3.5rem)] -m-6 lg:-m-8">
            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
            <MainContent activeSection={activeSection} />
        </div>
    );
};

// Placeholder for pages that are not yet implemented.
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
    <div className="p-8">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="mt-4 text-muted-foreground">This page is under construction.</p>
    </div>
);

const App: React.FC = () => {
    const [page, setPage] = useState<Page>('landing');
    const [playbookSection, setPlaybookSection] = useState<SectionId>('constitution');

    const handleViewPlaybooks = () => {
        setPlaybookSection('playbooks');
        setPage('playbook');
    };

    const renderPage = () => {
        switch (page) {
            case 'landing':
                return (
                    <LandingPage 
                        onEnter={() => setPage('dashboard')} 
                        onViewPlaybooks={handleViewPlaybooks} 
                    />
                );
            case 'dashboard':
                return <DashboardPage />;
            case 'cases':
                return <CasesPage />;
            case 'scanner':
                return <ScannerPage />;
            case 'controls':
                return <ControlsPage />;
            case 'red-flags':
                return <RedFlagsPage />;
            case 'playbook':
                return (
                    <PlaybookView 
                        activeSection={playbookSection} 
                        setActiveSection={setPlaybookSection} 
                    />
                );
            case 'remediation-packs':
                return <PlaceholderPage title="Remediation Packs" />;
            case 'audit-log':
                return <PlaceholderPage title="Audit Log" />;
            case 'vault':
                return <PlaceholderPage title="Vault" />;
            default:
                return (
                    <LandingPage 
                        onEnter={() => setPage('dashboard')} 
                        onViewPlaybooks={handleViewPlaybooks} 
                    />
                );
        }
    };

    return (
        <AppShell activePage={page} setPage={setPage}>
            {renderPage()}
        </AppShell>
    );
};

export default App;