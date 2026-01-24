
import React from 'react';
// FIX: Use lowercase filename for card component to resolve casing conflicts.
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.tsx';
import { Button } from '../ui/button.tsx';
import { Upload, FileText, Database, FileJson, Gauge, Fingerprint, Zap } from 'lucide-react';
import ToggleSwitch from '../ui/ToggleSwitch.tsx';

const ScannerPage: React.FC = () => {
    return (
        <div className="space-y-6">
             <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight text-white">Compliance Scanner</h1>
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Heuristics Engine v2.1</span>
                    <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                </div>
            </div>

            <Card className="bg-card/40 border-border/50">
                <CardHeader>
                    <CardTitle className="text-sm font-bold uppercase tracking-tight text-muted-foreground">Available Data Streams</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                     <Button variant="outline" className="border-border/50 bg-background/50 hover:bg-accent/5 hover:border-accent/40"><Upload className="mr-2 h-4 w-4 text-accent" /> Manual Uploads</Button>
                     <Button variant="outline" className="border-border/50 bg-background/50 hover:bg-accent/5 hover:border-accent/40"><FileText className="mr-2 h-4 w-4 text-accent" /> IRS Form 990-PF</Button>
                     <Button variant="outline" className="border-border/50 bg-background/50 hover:bg-accent/5 hover:border-accent/40"><Database className="mr-2 h-4 w-4 text-accent" /> General Ledger CSV</Button>
                     <Button variant="outline" className="border-border/50 bg-background/50 hover:bg-accent/5 hover:border-accent/40"><Fingerprint className="mr-2 h-4 w-4 text-accent" /> Audit Trail Logs</Button>
                     <Button variant="default" className="bg-white text-black hover:bg-white/90">Initialize Source</Button>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-card/40 border-border/50 overflow-hidden">
                    <div className="h-1 bg-accent" />
                    <CardHeader>
                        <CardTitle className="text-sm font-bold flex items-center gap-2">
                            <Gauge className="h-4 w-4 text-accent" />
                            Behavioral Scan Logic
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            <ToggleSwitch 
                                label="Substance Substance Analysis (NLP)" 
                                enabled={true} 
                                onToggle={() => {}}
                            />
                            <ToggleSwitch 
                                label="Action Velocity Heuristics" 
                                enabled={true} 
                                onToggle={() => {}}
                            />
                            <ToggleSwitch 
                                label="Document Over-Documentation Shield" 
                                enabled={false} 
                                onToggle={() => {}}
                            />
                        </div>
                        <div className="text-[10px] text-muted-foreground p-3 bg-muted/40 rounded-lg border border-border/50 leading-relaxed">
                            <Zap className="h-3 w-3 inline mr-1 text-accent" />
                            <strong className="text-foreground">Bounded Reasoning:</strong> The engine flags outliers for human review. No autonomous "fraud" determinations are made; only "process entropy" alerts are surfaced.
                        </div>
                        <Button className="w-full bg-accent text-accent-foreground font-black uppercase tracking-widest text-xs h-12 shadow-xl shadow-accent/10">Execute Deep Scan</Button>
                    </CardContent>
                </Card>

                <Card className="bg-card/40 border-border/50">
                    <CardHeader>
                        <CardTitle className="text-sm font-bold uppercase tracking-tight text-muted-foreground">Results Distribution (Simulated)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground font-medium">Statutory Risks (4966/4958)</span>
                            <span className="font-mono font-bold text-severity-critical">3</span>
                        </div>
                         <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground font-medium">Behavioral Anomalies</span>
                            <span className="font-mono font-bold text-yellow-500">7</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground font-medium">Documentation Gaps</span>
                            <span className="font-mono font-bold text-accent">12</span>
                        </div>
                        
                        <div className="pt-6">
                            <div className="p-3 bg-background/50 rounded-lg border border-border/50">
                                <p className="text-[11px] font-bold text-white mb-2">LATEST SIGNAL:</p>
                                <p className="text-xs text-muted-foreground italic">"User #442 completed 15-item DAF checklist in 24 seconds. Flagged as 'Performative Box-Checking'."</p>
                            </div>
                            <Button variant="secondary" className="w-full mt-4 bg-muted hover:bg-muted/80 text-foreground font-bold">Review Behavioral Results ▸</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ScannerPage;
