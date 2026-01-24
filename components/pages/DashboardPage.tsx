
import React, { useState, useEffect } from 'react';
import { eyeFetch } from '../../lib/api.ts';
import { SystemNotConfigured } from '../SystemNotConfigured.tsx';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card.tsx';
import { ArrowRight, ShieldCheck, Activity, Lock, FileCheck, BrainCircuit, Fingerprint } from 'lucide-react';

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
        return <div className="text-muted-foreground flex items-center gap-2 p-8"><Activity className="animate-spin h-4 w-4" /> Syncing Control Plane...</div>;
    }

    if (error) {
        return <SystemNotConfigured error={error} />;
    }

    const scoreColor = (score: number) => {
        if (score >= 75) return 'text-severity-critical';
        if (score >= 50) return 'text-severity-high';
        if (score >= 25) return 'text-severity-medium';
        return 'text-green-500';
    }

    return (
        <div className="space-y-6">
             <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">System Overview</h1>
                    <p className="text-sm text-muted-foreground mt-1 font-medium">Real-time governance & behavioral monitoring.</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-accent/10 border border-accent/20">
                    <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-accent italic">Defense Mode: Active</span>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
                <Card className="border-border/50 bg-card/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Portfolio Risk</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={`text-4xl font-black ${scoreColor(summary?.orgScore ?? 0)}`}>
                            {summary?.orgScore}
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground mt-2 italic opacity-60">Aggregate Exposure</p>
                    </CardContent>
                </Card>

                <Card className="border-border/50 relative overflow-hidden group bg-card/50">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Control Integrity</CardTitle>
                        <ShieldCheck className="h-4 w-4 text-green-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black text-green-500">
                            {summary?.controlIntegrity}%
                        </div>
                         <div className="mt-4 h-1 w-full rounded-full bg-muted overflow-hidden">
                                <div 
                                    className="h-full bg-green-500" 
                                    style={{ width: `${summary?.controlIntegrity ?? 0}%` }} 
                                />
                         </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Substance Quality</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black text-accent">
                            {summary?.substanceIntegrity ?? 0}%
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground mt-2">Anti-Performative Filter</p>
                    </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Critical Findings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={`text-4xl font-black ${(summary?.openCritical ?? 0) > 0 ? 'text-severity-critical' : 'text-green-500'}`}>
                            {summary?.openCritical}
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground mt-2">Requiring Block</p>
                    </CardContent>
                </Card>
            </div>

             <div className="grid gap-6 md:grid-cols-3">
                <Card className="bg-card/40 border-border/40 col-span-1">
                    <CardHeader>
                        <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-tight">
                            <Activity className="h-4 w-4 text-accent" />
                            Behavioral Health
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center justify-between p-2 rounded border bg-background/30">
                             <span className="text-xs font-medium">Mean Dwell Time</span>
                             <span className="text-xs font-mono font-bold text-green-500">4.2m</span>
                        </div>
                         <div className="flex items-center justify-between p-2 rounded border bg-background/30">
                             <span className="text-xs font-medium">Velocity Anomalies</span>
                             <span className="text-xs font-mono font-bold text-yellow-500">2</span>
                        </div>
                         <div className="flex items-center justify-between p-2 rounded border bg-background/30">
                             <span className="text-xs font-medium">Doc-Substance Mean</span>
                             <span className="text-xs font-mono font-bold text-accent">72%</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-card/40 border-border/40 col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-tight">
                            <ArrowRight className="h-4 w-4 text-accent" />
                            High-Priority Remediation Queue
                        </CardTitle>
                        <button className="text-[10px] font-black uppercase text-muted-foreground hover:text-white">View All Queue ▸</button>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="p-3 border border-severity-critical/20 bg-severity-critical/5 rounded-lg hover:bg-severity-critical/10 transition-all cursor-pointer group flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2">
                                     <span className="text-[9px] font-black bg-severity-critical text-white px-1.5 py-0.5 rounded uppercase tracking-tighter">Blocking</span>
                                     <span className="font-bold text-xs text-white">Grant to Individual suspected</span>
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-1 italic">Case #1842 ▸ Evidence missing: recipient status.</p>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] font-mono text-muted-foreground">3h ago</span>
                            </div>
                        </div>
                        
                         <div className="p-3 border border-accent/20 bg-accent/5 rounded-lg hover:bg-accent/10 transition-all cursor-pointer group flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2">
                                     <span className="text-[9px] font-black bg-accent text-accent-foreground px-1.5 py-0.5 rounded uppercase tracking-tighter">Velocity Alert</span>
                                     <span className="font-bold text-xs text-white">Checklist completed in 12s</span>
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-1 italic">Case #1901 ▸ Review required: potential gaming detected.</p>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] font-mono text-muted-foreground">12m ago</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;
