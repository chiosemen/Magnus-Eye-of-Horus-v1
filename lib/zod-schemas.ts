
import { z } from "zod";

export const ControlsUpdateSchema = z.object({
  reason: z.string().min(10, { message: "Reason must be at least 10 characters." }),
  expiresAt: z.string().datetime({ message: "A valid expiry date is required." }),
  patch: z.object({
    failClosedOnCritical: z.boolean().optional(),
    evidenceRequiredToResolve: z.boolean().optional(),
    allowRiskWaiver: z.boolean().optional(),
    killSwitches: z
      .record(z.object({ enabled: z.boolean() }))
      .optional(),
    visibility: z
      .object({
        showScoringFormulaToClients: z.boolean().optional(),
        showRedFlagDetailToClients: z.boolean().optional(),
      })
      .optional(),
  }),
});
