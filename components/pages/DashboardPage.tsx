import React, { useState, useEffect } from 'react';
import { eyeFetch } from '../../lib/api.ts';
import { SystemNotConfigured } from '../SystemNotConfigured.tsx';
// FIX: Standardize casing to Card.tsx to resolve compiler conflict.
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card.tsx';
import { ArrowRight, ShieldCheck, Activity, Target, Zap, BarChart3 } from 'lucide-react';
import { cn } from '../../lib/utils.ts';
import { motion } from 'framer-motion';
import { pageFade, sectionReveal } from '../../lib/motion.ts';

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
                <span className="text-[11px] font-black uppercase tracking-[0.2em] animate-pulse text-accent">Syncing Control Plane...</span>
            </div>
        );
    }

    if (error) {
        return <SystemNotConfigured error={error} />;
    }

    return (
        <motion.div 
            variants={pageFade}
            initial="initial"
            animate="animate"
            className="space-y-8 pb-12"
        >
             <div className="flex items-end justify-between border-b border-white/5 pb-8">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-white uppercase italic leading-none">System State: Defense</h1>
                    <p className="text-xs text-muted-foreground mt-3 font-bold uppercase tracking-widest opacity-60">Real-time MSA Peer Alignment Monitoring</p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none">Intelligence Engine</p>
                        <p className="text-xs font-mono text-accent mt-1">Horus v2.4.10</p>
                    </div>
                    <div className="h-10 w-px bg-white/5" />
                    <SystemStatusDetail />
                </div>
            </div>

            <motion.div variants={sectionReveal} initial="initial" animate="visible" className="grid gap-6 md:grid-cols-4">
                <DashboardMetric 
                    title="Aggregate Risk" 
                    value={summary?.orgScore} 
                    icon={Target} 
                    accent="text-severity-critical"
                    border="border-severity-critical/20"
                />
                <DashboardMetric 
                    title="Control Integrity" 
                    value={`${summary?.controlIntegrity}%`} 
                    icon={ShieldCheck} 
                    accent="text-green-500"
                    border="border-green-500/20"
                />
                <DashboardMetric 
                    title="Substance Quality" 
                    value={`${summary?.substanceIntegrity}%`} 
                    icon={Activity} 
                    accent="text-accent"
                    border="border-accent/20"
                />
                <DashboardMetric 
                    title="Critical Triggers" 
                    value={summary?.openCritical} 
                    icon={Zap} 
                    accent={summary?.openCritical && summary.openCritical > 0 ? "text-severity-critical" : "text-green-500"}
                    border="border-white/10"
                />
            </motion.div>

             <motion.div variants={sectionReveal} initial="initial" animate="visible" className="grid gap-8 md:grid-cols-3">
                <Card className="bg-[#0F1522] border-white/5 col-span-1">
                    <CardHeader>
                        <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                            <BarChart3 className="h-4 w-4 text-accent" />
                            Peer Norm Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="h-32 w-full flex items-end gap-1.5 px-2">
                             {[30, 45, 60, 85, 100, 75, 55, 35, 20].map((h, i) => (
                                 <motion.div 
                                    key={i} 
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    className={cn(
                                        "flex-1 rounded-t-sm",
                                        i === 4 ? "bg-accent shadow-[0_0_12px_rgba(212,175,55,0.4)]" : "bg-white/10"
                                    )} 
                                 />
                             ))}
                        </div>
                        <div className="flex justify-between text-[10px] font-black uppercase text-muted-foreground tracking-tighter opacity-40">
                            <span>-3σ Deviation</span>
                            <span className="text-accent opacity-100">MSA Mean</span>
                            <span>+3σ Deviation</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#0F1522] border-white/5 col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                            <ArrowRight className="h-4 w-4 text-accent" />
                            High-Priority Remediation Queue
                        </CardTitle>
                        <button className="text-[10px] font-black uppercase tracking-widest text-accent hover:text-[#E2C96B] transition-colors">Audit Worklist ▸</button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <QueueItem 
                            label="Blocked" 
                            title="RPM Cluster Anomaly: PTIN 442x"
                            description="Firm-wide COGS ratio deviation detected."
                            time="32m ago"
                            severity="critical"
                        />
                         <QueueItem 
                            label="Velocity" 
                            title="Checklist completed in 12s"
                            description="Dwell time 92% below normative mean."
                            time="1h ago"
                            severity="high"
                        />
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
};

const DashboardMetric = ({ title, value, icon: Icon, accent, border }: any) => (
    <Card className={cn("border-white/5 bg-[#0F1522] relative overflow-hidden group", border)}>
        <div className={cn("absolute top-0 left-0 w-1 h-full opacity-20 group-hover:opacity-100 transition-opacity bg-current", accent.split(' ')[0])} />
        <CardHeader className="pb-2">
            <CardTitle className="text-[10px] uppercase font-black tracking-widest text-muted-foreground flex items-center gap-2 opacity-60">
                <Icon className="h-3 w-3" />
                {title}
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className={cn("text-4xl font-black tracking-tighter", accent)}>
                {value}
            </div>
        </CardContent>
    </Card>
);

const QueueItem = ({ label, title, description, time, severity }: any) => (
    <div className="p-4 border border-white/5 bg-[#131B2E]/50 rounded-xl hover:bg-[#131B2E] transition-all cursor-pointer group flex justify-between items-start">
        <div className="space-y-2">
            <div className="flex items-center gap-3">
                 <span className={cn(
                     "text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest",
                     severity === 'critical' ? 'bg-severity-critical text-white' : 'bg-accent text-black'
                 )}>{label}</span>
                 <span className="font-bold text-sm text-white/90">{title}</span>
            </div>
            <p className="text-[11px] text-muted-foreground font-medium italic opacity-70">{description}</p>
        </div>
        <div className="text-right">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40">{time}</span>
        </div>
    </div>
);

const SystemStatusDetail = () => (
    <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/5">
        <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Remediation Active</span>
    </div>
);

export default DashboardPage;
