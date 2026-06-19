import { z } from "zod";

const skillBreakdownSchema = z.object({
  logic: z.number().min(0).max(100),
  rebuttal: z.number().min(0).max(100),
  weighing: z.number().min(0).max(100),
  analysis: z.number().min(0).max(100),
  evidence: z.number().min(0).max(100),
});

export const judgeResultSchema = z.object({
  strengths: z.array(z.string()).min(1).max(5),
  weaknesses: z.array(z.string()).min(1).max(5),
  score: z.number().min(0).max(100),
  skillBreakdown: skillBreakdownSchema,
  feedback: z
    .string()
    .describe("Constructive coaching feedback for the student"),
});

export type JudgeResultOutput = z.infer<typeof judgeResultSchema>;
