
import React from 'react';
import Topbar from './Topbar';
import { Page } from '../App';

interface AppShellProps {
    children: React.ReactNode;
    activePage: Page;
    setPage: (page: Page) => void;
}

const AppShell: React.FC<AppShellProps> = ({ children, activePage, setPage }) => {
    return (
        <div className="flex h-screen flex-col font-sans">
            <Topbar activePage={activePage} setPage={setPage} />
            <main className="flex-1 overflow-y-auto p-6 lg:p-8">
                <div className="mx-auto max-w-7xl">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AppShell;
