
import React from 'react';
import { AlertTriangle } from "lucide-react";
// FIX: Standardize import casing to use the 'Card.tsx' alias to prevent module resolution conflicts.
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";

export function SystemNotConfigured({ error }: { error: string }) {
  return (
    <Card className="border-severity-critical/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-severity-critical">
          <AlertTriangle className="h-5 w-5" />
          System Not Configured
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        <div className="mb-4">
          The platform is fail-closed until required production configuration is present.
        </div>
        <div className="rounded-lg border bg-card p-3 font-mono text-xs text-foreground">
          {error}
        </div>
      </CardContent>
    </Card>
  );
}