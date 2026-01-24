import React from 'react';
import { Shield, LayoutDashboard, FolderKanban, ScanLine, Settings, ListChecks, Home } from 'lucide-react';
import { Page } from '../App.tsx';
import { cn } from '../lib/utils.ts';
import { motion } from 'framer-motion';
import { statusPulse } from '../lib/motion.ts';

interface TopbarProps {
    activePage: Page;
    setPage: (page: Page) => void;
}

const SystemStatusPill = () => (
  <motion.div
    variants={statusPulse}
    animate="animate"
    className="flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-accent"
  >
    <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
    HORUS LIVE
  </motion.div>
);

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
            "flex items-center gap-2 rounded-lg px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all duration-200",
            activePage === page ? "bg-accent/10 text-accent font-black" : "text-muted-foreground hover:text-white"
        )}
    >
        {children}
        {label}
    </button>
);

const Topbar: React.FC<TopbarProps> = ({ activePage, setPage }) => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0B0F16]/95 backdrop-blur-md">
            <div className="mx-auto flex h-14 max-w-7xl items-center px-6 lg:px-8">
                <div className="mr-8 flex items-center cursor-pointer group" onClick={() => setPage('landing')}>
                    <Shield className="h-6 w-6 text-accent transition-transform duration-300 group-hover:scale-110" />
                    <span className="ml-2 font-black tracking-tighter text-xl text-white">MAGNUS</span>
                </div>
                
                <nav className="hidden md:flex items-center gap-1">
                    <NavItem page="landing" activePage={activePage} setPage={setPage} label="Home">
                        <Home className="h-3.5 w-3.5" />
                    </NavItem>
                    
                    {activePage !== 'landing' && (
                        <>
                            <NavItem page="dashboard" activePage={activePage} setPage={setPage} label="Dashboard">
                                <LayoutDashboard className="h-3.5 w-3.5" />
                            </NavItem>
                             <NavItem page="cases" activePage={activePage} setPage={setPage} label="Cases">
                                <FolderKanban className="h-3.5 w-3.5" />
                            </NavItem>
                             <NavItem page="scanner" activePage={activePage} setPage={setPage} label="Scanner">
                                <ScanLine className="h-3.5 w-3.5" />
                            </NavItem>
                            <NavItem page="red-flags" activePage={activePage} setPage={setPage} label="Taxonomy">
                                <ListChecks className="h-3.5 w-3.5" />
                            </NavItem>
                            <NavItem page="controls" activePage={activePage} setPage={setPage} label="Settings">
                                <Settings className="h-3.5 w-3.5" />
                            </NavItem>
                        </>
                    )}
                </nav>

                <div className="ml-auto flex items-center gap-4">
                  <SystemStatusPill />
                </div>
            </div>
        </header>
    );
};

export default Topbar;
