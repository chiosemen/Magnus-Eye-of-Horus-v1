import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.tsx';
import { Button } from '../ui/button.tsx';
import { BlockedBanner } from '../BlockedBanner.tsx';
import { isBlocked, canGenerateRemediationPack } from '../../lib/policy.ts';
import { Case, RedFlag, ControlsState } from '../../lib/types.ts';
import { band } from '../../lib/scoring.ts';
import { AlertCircle, Clock, FileWarning, Fingerprint, ShieldAlert } from 'lucide-react';
import { cn } from '../../lib/utils.ts';

const mockControls: ControlsState = {
    failClosedOnCritical: true,
    evidenceRequiredToResolve: true,
    allowRiskWaiver: false,
    killSwitches: {},
    acceptManualUploads: true,
    requireSourceAttribution: true,
    autoRequireIndependentApproval: true,
    expenditureResponsibilityRequired: true,
    enforceMinimumDwellTime: true,
    flagLowSubstanceDocs: true,
    visibility: {
        showScoringFormulaToClients: false,
        showRedFlagDetailToClients: true,
        showOnlyRemediationSteps: false
    }
}

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
    <Card className="p-4 border-border/50 bg-background/50 hover:border-accent/30 transition-all">
        <div className="flex justify-between items-start mb-3">
             <h4 className={cn(
                 "font-bold text-sm tracking-tight uppercase",
                 flag.severity === 'critical' ? 'text-severity-critical' : 'text-severity-high'
             )}>
                [{flag.severity}] {flag.title}
            </h4>
            <div className="flex gap-2">
                {flag.module.startsWith('BEH-') && (
                     <span className="text-[9px] font-black bg-accent/20 text-accent px-1.5 py-0.5 rounded border border-accent/20 uppercase tracking-widest flex items-center gap-1">
                        <Fingerprint className="h-2.5 w-2.5" /> Behavioral Alert
                     </span>
                )}
            </div>
        </div>
        
        <div className="space-y-3">
            <div>
                <p className="text-[11px] font-bold text-white uppercase opacity-40 mb-1">Finding Description</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{flag.why}</p>
            </div>

            {flag.dwellTimeSeconds && (
                <div className="p-2 rounded bg-accent/5 border border-accent/10 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-accent" />
                        <span className="text-[10px] font-bold text-accent uppercase">Heuristic: Dwell Time Outlier</span>
                     </div>
                     <span className="text-[10px] font-mono text-white bg-accent/20 px-1.5 py-0.5 rounded">
                        {flag.dwellTimeSeconds}s vs {flag.normativeDwellTime}s (Norm)
                     </span>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                     <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Required Evidence</p>
                     <ul className="text-[10px] space-y-1">
                        {flag.evidenceRequired.map(e => <li key={e} className="flex items-center gap-1.5"><FileWarning className="h-2.5 w-2.5 text-accent" /> {e}</li>)}
                     </ul>
                </div>
                 <div>
                     <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Remediation Path</p>
                     <ul className="text-[10px] space-y-1">
                        {flag.fixSteps.map(s => <li key={s} className="flex items-center gap-1.5 text-green-500/80">▸ {s}</li>)}
                     </ul>
                </div>
            </div>
        </div>
        
        <div className="mt-6 flex items-center gap-3">
            <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase border-border/50 bg-background hover:bg-accent/5">Upload Evidence</Button>
            <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase border-border/50 bg-background hover:bg-accent/5">Mark Resolved</Button>
        </div>
    </Card>
);

const HoldToConfirm: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const [active, setActive] = useState(false);
    
    React.useEffect(() => {
        let interval: any;
        if (active && progress < 100) {
            interval = setInterval(() => setProgress(p => Math.min(100, p + 2)), 20);
        } else if (!active && progress > 0) {
            interval = setInterval(() => setProgress(p => Math.max(0, p - 5)), 20);
        }
        return () => clearInterval(interval);
    }, [active, progress]);

    return (
        <div className="relative overflow-hidden rounded-xl border border-accent/30 bg-accent/5 p-4 text-center">
            <p className="text-xs font-bold text-accent uppercase mb-3 tracking-tighter">Anti-Box-Checking Friction Active</p>
            <button 
                onMouseDown={() => setActive(true)}
                onMouseUp={() => setActive(false)}
                onMouseLeave={() => setActive(false)}
                className="relative h-12 w-full max-w-xs mx-auto rounded-lg bg-accent text-accent-foreground font-black uppercase text-xs tracking-widest transition-all active:scale-95 overflow-hidden"
            >
                <div 
                    className="absolute inset-0 bg-white/20 transition-all pointer-events-none" 
                    style={{ width: `${progress}%` }} 
                />
                <span className="relative z-10">Hold to Attest Evidence Accuracy</span>
            </button>
            <p className="mt-2 text-[9px] text-muted-foreground italic">Required for critical findings. Prevents reflexive resolution.</p>
        </div>
    );
};

const CasesPage: React.FC = () => {
    const caseIsBlocked = isBlocked(mockControls, mockCase.redFlags);
    const canGenerate = canGenerateRemediationPack(mockControls, mockCase.redFlags);

    const scoreColor = () => {
        if (mockCase.band === "RED") return 'text-severity-critical';
        if (mockCase.band === "ORANGE") return 'text-severity-high';
        if (mockCase.band === "YELLOW") return 'text-severity-medium';
        return 'text-green-500';
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-xl font-black tracking-tight text-white uppercase">Case #{mockCase.id}</h1>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase px-2 py-0.5 border rounded">Owner: {mockCase.owner}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 font-medium italic">
                        {mockCase.sponsorName} ▸ {mockCase.fundName}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="text-xs h-9 font-bold bg-background border-border/50">Request Evidence</Button>
                    <Button disabled={!canGenerate} className="text-xs h-9 font-bold bg-white text-black hover:bg-white/90">Generate Remediation Pack</Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
                <Card className="p-3 bg-card/30 border-border/50">
                    <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Exposure Score</p>
                    <p className={cn("text-2xl font-black", scoreColor())}>{mockCase.score}</p>
                </Card>
                <Card className="p-3 bg-card/30 border-border/50">
                    <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Status</p>
                    <p className="text-2xl font-black text-white">{mockCase.status}</p>
                </Card>
                <Card className="p-3 bg-card/30 border-border/50">
                    <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Entropy Risk</p>
                    <p className="text-2xl font-black text-accent">Elevated</p>
                </Card>
                <Card className="p-3 bg-card/30 border-border/50">
                    <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Portfolio Lock</p>
                    <p className="text-2xl font-black text-green-500 flex items-center gap-2"><ShieldAlert className="h-5 w-5" /> Active</p>
                </Card>
            </div>

            {caseIsBlocked && <BlockedBanner onRequestEvidence={() => {}} onLeadershipReview={() => {}} />}

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-4">
                     <h2 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-accent" />
                        RED FLAGS ({mockCase.redFlags.length})
                     </h2>
                    {mockCase.redFlags.map(flag => <RedFlagCard key={flag.id} flag={flag} />)}
                </div>
                
                <div className="space-y-4">
                    <h2 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                        <Fingerprint className="h-4 w-4 text-accent" />
                        Behavioral Integrity
                    </h2>
                    <HoldToConfirm />
                    
                    <Card className="bg-card/40 border-border/50 p-4">
                        <CardTitle className="text-[10px] font-black uppercase text-muted-foreground mb-4">Substance Audit (NLP)</CardTitle>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-[10px] mb-1">
                                    <span className="text-white font-bold uppercase">Evidence Density</span>
                                    <span className="text-accent font-mono">32/100</span>
                                </div>
                                <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-severity-high w-[32%]" />
                                </div>
                                <p className="text-[9px] text-muted-foreground mt-2 italic">Alert: Uploaded "Diligence_Memo.pdf" is 45 words. Threshold is 150.</p>
                            </div>
                            
                            <div className="pt-4 border-t border-border/50">
                                <p className="text-[10px] font-bold text-white uppercase mb-2">Independent Verification</p>
                                <div className="flex flex-wrap gap-2">
                                     <span className="px-1.5 py-0.5 rounded bg-green-500/10 text-green-500 text-[8px] font-bold border border-green-500/20 uppercase tracking-tighter">IRS Pub 78 ✅</span>
                                     <span className="px-1.5 py-0.5 rounded bg-severity-critical/10 text-severity-critical text-[8px] font-bold border border-severity-critical/20 uppercase tracking-tighter">Donor Conflict ⚠️</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CasesPage;