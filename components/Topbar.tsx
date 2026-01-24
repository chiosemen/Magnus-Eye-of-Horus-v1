
import React from 'react';
import { Shield, LayoutDashboard, FolderKanban, ScanLine, Settings, ListChecks, FileText, History, Lock, Home } from 'lucide-react';
import { Page } from '../App.tsx';
import { cn } from '../lib/utils.ts';

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
            <div className="mx-auto flex h-14 max-w-7xl items-center px-6 lg:px-8">
                <div className="mr-4 flex items-center cursor-pointer" onClick={() => setPage('landing')}>
                    <Shield className="h-6 w-6 text-accent" />
                    <span className="ml-2 font-bold tracking-tight">Magnus</span>
                </div>
                
                <div className="h-4 w-px bg-border mx-2" />
                
                <nav className="flex items-center gap-1 text-sm lg:gap-2">
                    <NavItem page="landing" activePage={activePage} setPage={setPage} label="Home">
                        <Home className="h-4 w-4" />
                    </NavItem>
                    
                    {activePage !== 'landing' && (
                        <>
                            <NavItem page="dashboard" activePage={activePage} setPage={setPage} label="Dashboard">
                                <LayoutDashboard className="h-4 w-4" />
                            </NavItem>
                             <NavItem page="cases" activePage={activePage} setPage={setPage} label="Cases">
                                <FolderKanban className="h-4 w-4" />
                            </NavItem>
                             <NavItem page="scanner" activePage={activePage} setPage={setPage} label="Scanner">
                                <ScanLine className="h-4 w-4" />
                            </NavItem>
                            <NavItem page="red-flags" activePage={activePage} setPage={setPage} label="Red-Flags">
                                <ListChecks className="h-4 w-4" />
                            </NavItem>
                            <NavItem page="controls" activePage={activePage} setPage={setPage} label="Controls">
                                <Settings className="h-4 w-4" />
                            </NavItem>
                        </>
                    )}
                </nav>

                <div className="ml-auto flex items-center gap-4">
                  <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-accent/10 border border-accent/20">
                    <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent">Horus Live</span>
                  </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
