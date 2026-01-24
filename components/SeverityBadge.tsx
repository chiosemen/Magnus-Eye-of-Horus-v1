
import React from 'react';
import { cn } from "../lib/utils";
import { Badge } from "./ui/badge";
import { Severity } from "../lib/types";

const label: Record<Severity, string> = {
  critical: "Blocked — must remediate",
  high: "Remediate now",
  medium: "Tighten controls",
  low: "Hygiene improvement",
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  const cls =
    severity === "critical"
      ? "bg-severity-critical hover:bg-severity-critical text-primary-foreground border-transparent"
      : severity === "high"
      ? "bg-severity-high hover:bg-severity-high text-accent-foreground border-transparent"
      : severity === "medium"
      ? "bg-severity-medium hover:bg-severity-medium text-accent-foreground border-transparent"
      : "bg-severity-low hover:bg-severity-low text-accent-foreground border-transparent";

  return <Badge className={cn("rounded-full", cls)}>{label[severity]}</Badge>;
}
