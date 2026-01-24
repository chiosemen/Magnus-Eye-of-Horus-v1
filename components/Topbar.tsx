
import React from 'react';
import { Shield, LayoutDashboard, FolderKanban, ScanLine, Settings } from 'lucide-react';
import { Page } from '../App';
import { cn } from '../lib/utils';

interface TopbarProps {
    activePage: Page;
    setPage: (page: Page) => void;
}

const NavItem: React.FC<{
    page: Page;
    activePage: Page;
    setPage: (page: Page) => void;
    children: React.ReactNode;
    label: string;
}> = ({ page, activePage, setPage, children, label }) => (
    <button
        onClick={() => setPage(page)}
        className={cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            activePage === page ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
        )}
    >
        {children}
        {label}
    </button>
);

const Topbar: React.FC<TopbarProps> = ({ activePage, setPage }) => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <div className="mr-4 flex items-center">
                    <Shield className="h-6 w-6 text-accent" />
                    <span className="ml-2 font-bold">Eye of Horus</span>
                </div>
                <nav className="flex items-center gap-4 text-sm lg:gap-6">
                    <NavItem page="dashboard" activePage={activePage} setPage={setPage} label="Dashboard">
                        <LayoutDashboard className="h-4 w-4" />
                    </NavItem>
                     <NavItem page="cases" activePage={activePage} setPage={setPage} label="Cases">
                        <FolderKanban className="h-4 w-4" />
                    </NavItem>
                     <NavItem page="scanner" activePage={activePage} setPage={setPage} label="Scanner">
                        <ScanLine className="h-4 w-4" />
                    </NavItem>
                     <NavItem page="controls" activePage={activePage} setPage={setPage} label="Controls">
                        <Settings className="h-4 w-4" />
                    </NavItem>
                </nav>
            </div>
        </header>
    );
};

export default Topbar;
