import React from 'react';
// FIX: Standardize casing to Card.tsx to resolve compiler conflict.
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.tsx';

const RedFlagsPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Red-Flags Taxonomy Browser</h1>
            <Card>
                <CardHeader>
                    <CardTitle>DAF / Nonprofit Trigger Sets (v1)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="text-lg font-bold text-severity-critical">CRITICAL</h3>
                        <p className="text-sm text-muted-foreground mb-2">Likely excise exposure or “structural illegality”</p>
                        <ul className="list-disc list-inside space-y-1 text-foreground">
                            <li>Grant to individual</li>
                            <li>Grant to non-qualified org without expenditure responsibility</li>
                            <li>Payments to disqualified person or family without FMV substantiation</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-severity-high">HIGH</h3>
                        <p className="text-sm text-muted-foreground mb-2">Strong indicators; can become excise exposure</p>
                        <ul className="list-disc list-inside space-y-1 text-foreground">
                            <li>Payments that look like personal benefit through pass-throughs</li>
                            <li>DAF used as “fiscal sponsorship” proxy with advisory privileges</li>
                            <li>Dual-compensation / conflicted advisory fees</li>
                            <li>Missing independent approval / minutes for related-party transactions</li>
                            <li>Related-party vendor concentration</li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-lg font-bold text-severity-medium">MEDIUM</h3>
                        <p className="text-sm text-muted-foreground mb-2">Risk drift signals; needs tightening</p>
                        <ul className="list-disc list-inside space-y-1 text-foreground">
                            <li>No conflict policy / no annual disclosures</li>
                            <li>Repeated sole-source vendor selections</li>
                            <li>Missing grant agreements / restriction language</li>
                            <li>No due diligence checklist per distribution type</li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-lg font-bold text-severity-low">LOW</h3>
                        <p className="text-sm text-muted-foreground mb-2">Hygiene improvements</p>
                        <ul className="list-disc list-inside space-y-1 text-foreground">
                            <li>(Example) Inconsistent naming conventions across funds</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default RedFlagsPage;
