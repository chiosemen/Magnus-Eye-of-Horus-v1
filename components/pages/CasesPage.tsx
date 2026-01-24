import React, { useState, useEffect } from 'react';
// FIX: Standardize casing to Card.tsx to resolve compiler conflict.
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.tsx';
import { Button } from '../ui/button.tsx';
import { BlockedBanner } from '../BlockedBanner.tsx';
import { Case, RedFlag } from '../../lib/types.ts';
import { band } from '../../lib/scoring.ts';
import { 
    ShieldAlert,
    Clock, 
    FileWarning, 
    Fingerprint, 
    Activity, 
    ChevronRight,
    Search
} from 'lucide-react';
import { cn } from '../../lib/utils.ts';
import { motion } from 'framer-motion';
import { pageFade, sectionReveal } from '../../lib/motion.ts';



const mockRedFlags: RedFlag[] = [
    {
        id: 'rf-1',
        module: 'DAF-4966-INDIVIDUAL',
        severity: 'critical',
        title: 'Grant to Individual suspected',
        why: 'Potential taxable distribution (DAF rules). Narrative matches personal expense pattern.',
        evidenceRequired: ['recipient eligibility', 'agreement', 'purpose docs'],
        fixSteps: ['stop distribution', 'convert to qualified grantee', 'document expenditure responsibility'],
        status: 'OPEN'
    },
    {
        id: 'rf-3',
        module: 'BEH-VELOCITY_ANOMALY',
        severity: 'high',
        title: 'Checklist Velocity Anomaly',
        why: 'Task completed in 12s (System Norm: 240s). Suggests performative compliance without review.',
        evidenceRequired: ['Manual review certification', 'Time-stamped audit record'],
        fixSteps: ['Mandatory senior partner review of underlying documentation'],
        status: 'OPEN',
        dwellTimeSeconds: 12,
        normativeDwellTime: 240
    }
];

const mockCase: Case = {
    id: '1842',
    sponsorName: 'ABC Foundation',
    fundName: 'Smith DAF',
    score: 81,
    band: band(81),
    status: 'BLOCKED',
    owner: 'You',
    createdAt: new Date().toISOString(),
    redFlags: mockRedFlags
};

const RedFlagCard: React.FC<{ flag: RedFlag }> = ({ flag }) => (
    <motion.div 
        variants={sectionReveal}
        initial="initial"
        animate="visible"
        className={cn(
            "p-6 rounded-2xl border bg-[#0F1522]/60 backdrop-blur-sm transition-all shadow-xl",
            flag.severity === 'critical' ? 'border-red-500/30 bg-red-500/5' : 'border-white/5'
        )}
    >
        <div className="flex justify-between items-start mb-6">
             <div>
                <h4 className={cn(
                    "text-sm font-black uppercase tracking-widest",
                    flag.severity === 'critical' ? 'text-severity-critical' : 'text-accent'
                )}>
                    {flag.title}
                </h4>
                <p className="text-[10px] font-mono text-muted-foreground mt-1 uppercase tracking-tighter opacity-60">Vector: {flag.module}</p>
             </div>
            <div className="flex gap-2">
                {flag.module.startsWith('BEH-') && (
                     <span className="text-[9px] font-black bg-accent/20 text-accent px-2 py-0.5 rounded-full border border-accent/20 uppercase tracking-widest flex items-center gap-1">
                        <Fingerprint className="h-2.5 w-2.5" /> Behavioral
                     </span>
                )}
                <span className={cn(
                    "text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border",
                    flag.severity === 'critical' ? 'border-red-500/40 text-red-500' : 'border-accent/40 text-accent'
                )}>
                    {flag.severity}
                </span>
            </div>
        </div>
        
        <div className="space-y-6">
            <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 opacity-50">Analytical Finding</p>
                <p className="text-sm text-gray-200 leading-relaxed font-medium italic">"{flag.why}"</p>
            </div>

            {flag.dwellTimeSeconds && (
                <div className="p-3 rounded-xl bg-accent/5 border border-accent/10 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-accent" />
                        <span className="text-[10px] font-black text-accent uppercase tracking-widest">Heuristic: Dwell Outlier</span>
                     </div>
                     <span className="text-[10px] font-mono text-white bg-accent/20 px-2 py-0.5 rounded-md">
                        {flag.dwellTimeSeconds}s vs {flag.normativeDwellTime}s Baseline
                     </span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                <div>
                     <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3 opacity-60">Required Evidence</p>
                     <ul className="text-[11px] space-y-2 font-bold">
                        {flag.evidenceRequired.map(e => <li key={e} className="flex items-center gap-2 text-white/80 uppercase tracking-tight"><FileWarning className="h-3 w-3 text-accent" /> {e}</li>)}
                     </ul>
                </div>
                 <div>
                     <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3 opacity-60">Remediation Path</p>
                     <ul className="text-[11px] space-y-2 font-bold">
                        {flag.fixSteps.map(s => <li key={s} className="flex items-center gap-2 text-green-500/90 uppercase tracking-tight">▸ {s}</li>)}
                     </ul>
                </div>
            </div>
        </div>
        
        <div className="mt-8 flex items-center gap-3">
            <Button variant="outline" size="sm" className="h-9 px-6 text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 hover:bg-white/10">Upload Substantiation</Button>
            <Button variant="outline" size="sm" className="h-9 px-6 text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 hover:bg-white/10">Resolve Vector</Button>
        </div>
    </motion.div>
);

const HoldToConfirm: React.FC<{ onConfirm: () => void }> = ({ onConfirm }) => {
    const [progress, setProgress] = useState(0);
    const [active, setActive] = useState(false);
    
    useEffect(() => {
        let interval: any;
        if (active && progress < 100) {
            interval = setInterval(() => {
                setProgress(prev => Math.min(prev + 5, 100));
            }, 50);
        } else if (!active && progress > 0) {
            setProgress(0);
        }

        if (progress === 100) {
            onConfirm();
            setProgress(0);
            setActive(false);
        }

        return () => clearInterval(interval);
    }, [active, progress, onConfirm]);

    return (
        <div 
            className="relative w-full h-14 bg-muted/20 rounded-xl border border-white/5 overflow-hidden cursor-pointer group"
            onMouseDown={() => setActive(true)}
            onMouseUp={() => setActive(false)}
            onMouseLeave={() => setActive(false)}
            onTouchStart={() => setActive(true)}
            onTouchEnd={() => setActive(false)}
        >
            <motion.div 
                className="absolute inset-y-0 left-0 bg-accent/20"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
            />
            <div className="absolute inset-0 flex items-center justify-center gap-2">
                <ShieldAlert className={cn("h-4 w-4 transition-colors", progress > 0 ? "text-accent" : "text-muted-foreground")} />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white">
                    {progress === 100 ? "Action Confirmed" : "Hold to Generate Remediation Pack"}
                </span>
            </div>
        </div>
    );
};

const CasesPage: React.FC = () => {
    const handleConfirm = () => {
        // TODO: wire to backend / audit-logged action. Logging removed to avoid client-side console noise.
    };

    return (
        <motion.div 
            variants={pageFade}
            initial="initial"
            animate="animate"
            className="space-y-8"
        >
            <div className="flex items-end justify-between border-b border-white/5 pb-8">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-white uppercase italic leading-none">Case {mockCase.id}</h1>
                    <p className="text-xs text-muted-foreground mt-3 font-bold uppercase tracking-widest opacity-60">
                        {mockCase.sponsorName} ▸ {mockCase.fundName}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Status:</span>
                    <span className="text-xs font-black text-severity-critical bg-severity-critical/10 px-3 py-1 rounded-full border border-severity-critical/20">
                        {mockCase.status}
                    </span>
                </div>
            </div>

            <BlockedBanner 
                onRequestEvidence={() => {}}
                onLeadershipReview={() => {}}
            />

            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">Active Red Flags ({mockCase.redFlags.length})</h2>
                        <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-accent">Expand All</Button>
                    </div>
                    <div className="space-y-6">
                        {mockCase.redFlags.map(flag => (
                            <RedFlagCard key={flag.id} flag={flag} />
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <Card className="bg-[#0F1522] border-white/5 lg:sticky lg:top-20">
                        <CardHeader>
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                <Activity className="h-4 w-4 text-accent" />
                                Governance Scorecard
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-col items-center justify-center py-8">
                                <div className="relative flex items-center justify-center">
                                    <svg className="h-32 w-32 -rotate-90 transform">
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="58"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="transparent"
                                            className="text-white/5"
                                        />
                                        <motion.circle
                                            cx="64"
                                            cy="64"
                                            r="58"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="transparent"
                                            strokeDasharray="364.4"
                                            initial={{ strokeDashoffset: 364.4 }}
                                            animate={{ strokeDashoffset: 364.4 - (364.4 * mockCase.score) / 100 }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className="text-severity-critical"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-4xl font-black text-white">{mockCase.score}</span>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-50">Exposure</span>
                                    </div>
                                </div>
                                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-severity-critical">Band: Critical Deviation</p>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-white/5">
                                <div className="flex justify-between items-center text-[11px] font-bold">
                                    <span className="text-muted-foreground uppercase tracking-wider">Control Integrity</span>
                                    <span className="text-green-500">99.8%</span>
                                </div>
                                <div className="flex justify-between items-center text-[11px] font-bold">
                                    <span className="text-muted-foreground uppercase tracking-wider">Diligence Density</span>
                                    <span className="text-yellow-400">Low (Scattered)</span>
                                </div>
                                <div className="flex justify-between items-center text-[11px] font-bold">
                                    <span className="text-muted-foreground uppercase tracking-wider">Audit Probability</span>
                                    <span className="text-severity-critical italic">Simulated DIF High</span>
                                </div>
                            </div>

                            <div className="pt-6">
                                <HoldToConfirm onConfirm={handleConfirm} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#0F1522] border-white/5">
                        <CardHeader>
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                <Search className="h-4 w-4 text-accent" />
                                Librarian Context
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-[11px] text-gray-400 leading-relaxed italic">
                                "The detected patterns correlate with §4966(c) regarding donor-advised distributions to non-qualified individuals. No Expenditure Responsibility (ER) records detected in system vault."
                            </p>
                            <Button variant="ghost" size="sm" className="w-full text-[10px] font-black uppercase tracking-widest text-accent flex items-center justify-between group">
                                View Authority Citations
                                <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </motion.div>
    );
};

export default CasesPage;
