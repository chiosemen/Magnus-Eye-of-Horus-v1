
import { ControlsState, RedFlag } from "./types";

export function isBlocked(controls: ControlsState, redFlags: RedFlag[]): boolean {
  if (!controls.failClosedOnCritical) return false;
  return redFlags.some((rf) => rf.severity === "critical" && rf.status !== "RESOLVED");
}

export function canResolveRedFlag(controls: ControlsState, hasEvidence: boolean): boolean {
  if (!controls.evidenceRequiredToResolve) return true;
  return hasEvidence;
}

export function canGenerateRemediationPack(controls: ControlsState, redFlags: RedFlag[]): boolean {
  if (isBlocked(controls, redFlags)) return false;
  return true;
}
