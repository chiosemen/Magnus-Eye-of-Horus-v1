import React, { useState } from 'react';
// FIX: Standardize casing to Card.tsx to resolve compiler conflict.
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.tsx';
import ToggleSwitch from '../ui/ToggleSwitch.tsx';

const ControlsPage: React.FC = () => {
    const [controls, setControls] = useState({
        failClosed: true,
        evidenceRequired: true,
        allowWaiver: false,
        grantToIndividual: false, // Kill-switch: DISABLED means false
        relatedPartyPayments: true, // Kill-switch: ENABLED means true
    });

    const setControl = (key: keyof typeof controls, value: boolean) => {
        // In a real app, this would require Reason + Owner + Expiry modal
        setControls(prev => ({...prev, [key]: value}));
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Controls ▸ Constitution Settings</h1>
            
            <Card>
                <CardHeader>
                    <CardTitle>Execution Gates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <ToggleSwitch 
                        label="Fail-Closed on Critical" 
                        enabled={controls.failClosed} 
                        onToggle={(v) => setControl('failClosed', v)}
                    />
                    <ToggleSwitch 
                        label="Evidence required to resolve" 
                        enabled={controls.evidenceRequired} 
                        onToggle={(v) => setControl('evidenceRequired', v)}
                    />
                    <ToggleSwitch 
                        label="Allow Risk Waiver" 
                        enabled={controls.allowWaiver} 
                        onToggle={(v) => setControl('allowWaiver', v)}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Kill Switches</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                     <ToggleSwitch 
                        label="Grant-to-individual workflow" 
                        enabled={controls.grantToIndividual} 
                        onToggle={(v) => setControl('grantToIndividual', v)}
                    />
                     <ToggleSwitch 
                        label="Related-party vendor payments (requires approvals)" 
                        enabled={controls.relatedPartyPayments} 
                        onToggle={(v) => setControl('relatedPartyPayments', v)}
                    />
                </CardContent>
            </Card>

            <div className="text-center text-sm text-muted-foreground">
                Any change requires: Reason + Owner + Expiry
            </div>
        </div>
    );
};

export default ControlsPage;
