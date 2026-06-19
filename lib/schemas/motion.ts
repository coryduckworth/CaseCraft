import { z } from "zod";

export const motionAnalysisSchema = z.object({
  actor: z.string().describe("The primary actor or institution in the motion"),
  action: z.string().describe("The specific action being proposed or debated"),
  stakeholders: z
    .array(z.string())
    .describe("Key groups affected by the motion"),
  coreClash: z
    .string()
    .describe("The fundamental tension or trade-off in the debate"),
  contextNotes: z
    .string()
    .describe("Brief context to help students understand the motion"),
});

export type MotionAnalysisOutput = z.infer<typeof motionAnalysisSchema>;
