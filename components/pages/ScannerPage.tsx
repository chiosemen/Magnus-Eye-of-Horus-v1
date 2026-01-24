import React from 'react';
// FIX: Standardize casing to Card.tsx to resolve compiler conflict.
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.tsx';
import { Button } from '../ui/button.tsx';
import { Upload, FileText, Database, Fingerprint, Zap, Gauge, Binary, BarChart3, Activity } from 'lucide-react';
import ToggleSwitch from '../ui/ToggleSwitch.tsx';

const ScannerPage: React.FC = () => {
    return (
        <div className="space-y-6 pb-12">
             <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Compliance Heuristics Engine</h1>
                    <p className="text-xs text-muted-foreground mt-1">Version 2.4.1 Active ▸ MSA Peer Norms Sync: 12m ago</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                        <div className="h-6 w-6 rounded-full border-2 border-background bg-accent" />
                        <div className="h-6 w-6 rounded-full border-2 border-background bg-severity-high" />
                        <div className="h-6 w-6 rounded-full border-2 border-background bg-severity-critical" />
                    </div>
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                </div>
            </div>

            <Card className="bg-card/40 border-border/50">
                <CardHeader className="pb-3">
                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Active Ingestion Streams</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                     <Button variant="outline" className="h-8 text-xs border-border/50 bg-background/50 hover:bg-accent/5"><Upload className="mr-2 h-3.5 w-3.5 text-accent" /> Batch 1040 XML</Button>
                     <Button variant="outline" className="h-8 text-xs border-border/50 bg-background/50 hover:bg-accent/5"><FileText className="mr-2 h-3.5 w-3.5 text-accent" /> IRS Form 8867 Logs</Button>
                     <Button variant="outline" className="h-8 text-xs border-border/50 bg-background/50 hover:bg-accent/5"><Database className="mr-2 h-3.5 w-3.5 text-accent" /> MSA Peer CSV</Button>
                     <Button variant="outline" className="h-8 text-xs border-border/50 bg-background/50 hover:bg-accent/5"><Fingerprint className="mr-2 h-3.5 w-3.5 text-accent" /> PTIN Audit Trail</Button>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-card/40 border-border/50 overflow-hidden relative">
                    <div className="absolute top-0 left-0 h-1 w-full bg-accent" />
                    <CardHeader>
                        <CardTitle className="text-sm font-bold flex items-center gap-2">
                            <Gauge className="h-4 w-4 text-accent" />
                            Behavioral & Analytical Scan Modules
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <ToggleSwitch 
                                label="Simulated DIF Weighting" 
                                enabled={true} 
                                onToggle={() => {}}
                            />
                            <ToggleSwitch 
                                label="MSA Peer Norm Z-Scoring" 
                                enabled={true} 
                                onToggle={() => {}}
                            />
                             <ToggleSwitch 
                                label="RPM Cluster Anomaly Check" 
                                enabled={true} 
                                onToggle={() => {}}
                            />
                            <ToggleSwitch 
                                label="Velocity & Dwell-Time Analysis" 
                                enabled={true} 
                                onToggle={() => {}}
                            />
                        </div>
                        <div className="text-[10px] text-muted-foreground p-3 bg-muted/40 rounded-lg border border-border/50 leading-relaxed italic">
                            <Zap className="h-3 w-3 inline mr-1 text-accent" />
                            <strong className="text-foreground font-bold">Bounded Logic Active:</strong> No autonomous "fraud" determinations. The engine identifies statistical outliers for mandatory Human Review (The King's Approval).
                        </div>
                        <Button className="w-full bg-white text-black font-black uppercase tracking-widest text-xs h-12 shadow-xl hover:bg-white/90 active:scale-[0.98] transition-all">Initialize Adversary Scan</Button>
                    </CardContent>
                </Card>

                <Card className="bg-card/40 border-border/50">
                    <CardHeader>
                        <CardTitle className="text-sm font-bold uppercase tracking-tight text-muted-foreground flex items-center justify-between">
                            Vector Distribution
                            <span className="text-[9px] font-mono text-accent">NRP Benchmarks v2.4</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-bold uppercase">
                                    <span className="flex items-center gap-1"><BarChart3 className="h-3 w-3" /> DIF Weights {'>'} 90%</span>
                                    <span className="text-severity-critical">3</span>
                                </div>
                                <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-severity-critical w-[30%]" />
                                </div>
                            </div>
                             <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-bold uppercase">
                                    <span className="flex items-center gap-1"><Binary className="h-3 w-3" /> MSA Z-Score {'>'} 2.0</span>
                                    <span className="text-severity-high">7</span>
                                </div>
                                <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-severity-high w-[55%]" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-bold uppercase">
                                    <span className="flex items-center gap-1"><Activity className="h-3 w-3" /> Velocity Outliers</span>
                                    <span className="text-accent">12</span>
                                </div>
                                <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-accent w-[82%]" />
                                </div>
                            </div>
                        </div>
                        
                        <div className="pt-4 border-t border-border/50">
                            <div className="p-3 bg-severity-critical/5 rounded-lg border border-severity-critical/20">
                                <p className="text-[10px] font-black text-severity-critical mb-1">LATEST SIGNAL:</p>
                                <p className="text-xs text-muted-foreground leading-snug">
                                    "PTIN cluster 442x identified in RPM mapping. 4 returns match high-DIF ACTC profile. Project 4843 proximity: <span className="text-white font-bold">ELEVATED</span>."
                                </p>
                            </div>
                            <Button variant="secondary" className="w-full mt-4 bg-muted hover:bg-muted/80 text-foreground font-bold h-10 text-xs">Review Expansion Vectors ▸</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ScannerPage;
