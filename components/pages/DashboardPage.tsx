import React, { useState, useEffect } from 'react';
import { eyeFetch } from '../../lib/api.ts';
import { SystemNotConfigured } from '../SystemNotConfigured.tsx';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card.tsx';
import { ArrowRight, ShieldCheck, Activity, Target, Zap, Fingerprint, BarChart3 } from 'lucide-react';
import { cn } from '../../lib/utils.ts';

interface DashboardSummary {
    orgScore: number;
    controlIntegrity: number;
    openCritical: number;
    substanceIntegrity: number;
}

const DashboardPage: React.FC = () => {
    const [summary, setSummary] = useState<DashboardSummary | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await eyeFetch<DashboardSummary>("/v1/dashboard/summary");
                setSummary({ ...data, substanceIntegrity: 88 });
            } catch (e) {
                setError((e as Error).message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground gap-4">
                <Activity className="animate-spin h-6 w-6 text-accent" />
                <span className="text-sm font-bold uppercase tracking-widest animate-pulse">Syncing Control Plane with MSA Norms...</span>
            </div>
        );
    }

    if (error) {
        return <SystemNotConfigured error={error} />;
    }

    return (
        <div className="space-y-6 pb-12">
             <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black tracking-tight text-white uppercase italic">System State: Defense</h1>
                    <p className="text-sm text-muted-foreground mt-1 font-medium">Real-time MSA Peer Alignment & RPM Cluster Monitoring.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-muted-foreground uppercase leading-none">Last Audit Pack</p>
                        <p className="text-xs font-mono text-white">4m ago</p>
                    </div>
                    <div className="h-10 w-px bg-border" />
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-accent/10 border border-accent/20">
                        <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-accent italic">Engine: Horus v2.4</span>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
                <Card className="border-border/50 bg-card/50 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-severity-critical opacity-40 group-hover:opacity-100 transition-opacity" />
                    <CardHeader className="pb-2">
                        <CardTitle className="text-[10px] uppercase font-black tracking-widest text-muted-foreground flex items-center gap-2">
                            <Target className="h-3 w-3" />
                            Aggregate Risk
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black text-severity-critical">
                            {summary?.orgScore}
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground mt-2 italic opacity-60">Portfolio Exposure</p>
                    </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-green-500 opacity-40 group-hover:opacity-100 transition-opacity" />
                    <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-[10px] uppercase font-black tracking-widest text-muted-foreground flex items-center gap-2">
                            <ShieldCheck className="h-3 w-3" />
                            Control Integrity
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black text-green-500">
                            {summary?.controlIntegrity}%
                        </div>
                        <div className="mt-4 h-1 w-full rounded-full bg-muted overflow-hidden">
                                <div className="h-full bg-green-500" style={{ width: `${summary?.controlIntegrity ?? 0}%` }} />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-accent opacity-40 group-hover:opacity-100 transition-opacity" />
                    <CardHeader className="pb-2">
                        <CardTitle className="text-[10px] uppercase font-black tracking-widest text-muted-foreground flex items-center gap-2">
                            <Activity className="h-3 w-3" />
                            Substance Quality
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black text-accent">
                            {summary?.substanceIntegrity ?? 0}%
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground mt-2 italic">MSA Substance Norm</p>
                    </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50 relative overflow-hidden group">
                     <div className="absolute top-0 left-0 w-1 h-full bg-white opacity-20 group-hover:opacity-100 transition-opacity" />
                    <CardHeader className="pb-2">
                        <CardTitle className="text-[10px] uppercase font-black tracking-widest text-muted-foreground flex items-center gap-2">
                            <Zap className="h-3 w-3" />
                            Critical Triggers
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={cn("text-4xl font-black", (summary?.openCritical ?? 0) > 0 ? 'text-severity-critical' : 'text-green-500')}>
                            {summary?.openCritical}
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground mt-2 italic">Requiring Remediation</p>
                    </CardContent>
                </Card>
            </div>

             <div className="grid gap-6 md:grid-cols-3">
                <Card className="bg-card/40 border-border/40 col-span-1">
                    <CardHeader>
                        <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-tight">
                            <BarChart3 className="h-4 w-4 text-accent" />
                            Peer Norm Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="h-32 w-full flex items-end gap-1 px-2">
                             {[30, 45, 60, 85, 100, 75, 55, 35, 20].map((h, i) => (
                                 <div 
                                    key={i} 
                                    className={cn(
                                        "flex-1 rounded-t-sm transition-all duration-500",
                                        i === 4 ? "bg-accent h-full animate-pulse" : "bg-muted h-[var(--h)]"
                                    )} 
                                    style={{ '--h': `${h}%` } as any}
                                 />
                             ))}
                        </div>
                        <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground px-1 italic">
                            <span>-3σ</span>
                            <span className="text-accent">MSA Mean</span>
                            <span>+3σ</span>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
                            <p className="text-[10px] font-bold text-white uppercase mb-1 flex items-center gap-2">
                                <ShieldCheck className="h-3 w-3 text-green-500" />
                                Z-Score Adjustment
                            </p>
                            <p className="text-[10px] text-muted-foreground leading-relaxed">
                                Portfolio is currently <strong className="text-white">0.4σ</strong> within local MSA benchmarks. Expansion probability: <strong className="text-green-500">LOW</strong>.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-card/40 border-border/40 col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-tight">
                            <ArrowRight className="h-4 w-4 text-accent" />
                            High-Priority Remediation Queue
                        </CardTitle>
                        <button className="text-[10px] font-black uppercase text-muted-foreground hover:text-white transition-colors">Open Worklist ▸</button>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="p-3 border border-severity-critical/20 bg-severity-critical/5 rounded-lg hover:bg-severity-critical/10 transition-all cursor-pointer group flex justify-between items-start">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                     <span className="text-[8px] font-black bg-severity-critical text-white px-1.5 py-0.5 rounded uppercase tracking-widest">Blocked</span>
                                     <span className="font-bold text-xs text-white">RPM Cluster Anomaly: PTIN 442x</span>
                                </div>
                                <p className="text-[10px] text-muted-foreground italic">Firm-wide COGS ratio deviation detected. Potential Program 4843 trigger.</p>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] font-mono text-muted-foreground">32m ago</span>
                            </div>
                        </div>
                        
                         <div className="p-3 border border-accent/20 bg-accent/5 rounded-lg hover:bg-accent/10 transition-all cursor-pointer group flex justify-between items-start">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                     <span className="text-[8px] font-black bg-accent text-accent-foreground px-1.5 py-0.5 rounded uppercase tracking-widest">Velocity</span>
                                     <span className="font-bold text-xs text-white">Checklist completed in 12s</span>
                                </div>
                                <p className="text-[10px] text-muted-foreground italic">Dwell time 92% below normative mean. Flagged as 'Performative'.</p>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] font-mono text-muted-foreground">1h ago</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;