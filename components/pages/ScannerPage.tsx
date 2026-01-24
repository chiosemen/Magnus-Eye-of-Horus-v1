
import React from 'react';
// FIX: Standardize import casing to use the 'Card.tsx' alias to prevent module resolution conflicts.
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

const ScannerPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Scanner</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Data Scanner</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Data source selection and scan configuration will be managed here.</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default ScannerPage;