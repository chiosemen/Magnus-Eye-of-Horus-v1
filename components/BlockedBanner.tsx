import React from 'react';
// FIX: Standardize casing to Card.tsx to resolve compiler conflict.
import { Card, CardContent } from "./ui/Card.tsx";
import { Button } from "./ui/button.tsx";

export function BlockedBanner({
  onRequestEvidence,
  onLeadershipReview,
}: {
  onRequestEvidence: () => void;
  onLeadershipReview: () => void;
}) {
  return (
    <Card className="bg-blocked text-blocked-foreground">
      <CardContent className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-semibold">Blocked — Critical red flags unresolved.</div>
          <div className="text-sm opacity-90">
            Remediation pack generation is disabled until required evidence is attached or controls
            are updated with an expiring rationale.
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={onRequestEvidence}>
            Request Evidence
          </Button>
          <Button variant="secondary" onClick={onLeadershipReview}>
            Open Leadership Review
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
