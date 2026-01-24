
import React, { useState, useEffect } from 'react';
import { eyeFetch } from '../../lib/api';
import { SystemNotConfigured } from '../SystemNotConfigured';
// FIX: Standardize import casing to use the 'Card.tsx' alias to prevent module resolution conflicts.
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

interface DashboardSummary {
    orgScore: number;
    controlIntegrity: number;
    openCritical: number;
}

const DashboardPage: React.FC = () => {
    const [summary, setSummary] = useState<DashboardSummary | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Real API call only. If env missing, throws. If endpoint missing, throws.
                const data = await eyeFetch<DashboardSummary>("/v1/dashboard/summary");
                setSummary(data);
            } catch (e) {
                setError((e as Error).message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div className="text-muted-foreground">Loading Dashboard...</div>;
    }

    if (error) {
        return <SystemNotConfigured error={error} />;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-muted-foreground">Risk Score (Org)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{summary?.orgScore}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-muted-foreground">Control Integrity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{summary?.controlIntegrity}%</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-muted-foreground">Open Critical</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{summary?.openCritical}</div>
                    </CardContent>
                </Card>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Work Queue</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Priority work queue will be displayed here.</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default DashboardPage;