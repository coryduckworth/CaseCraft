import { z } from "zod";

const rebuttalResponseSchema = z.object({
  response: z.string().describe("A concise rebuttal the student could use"),
  explanation: z
    .string()
    .describe("Why this rebuttal works — the coaching insight"),
  type: z
    .enum(["turn", "takeout", "weighing", "extension"])
    .describe("The type of rebuttal strategy"),
});

export const rebuttalSchema = z.object({
  responses: z
    .array(rebuttalResponseSchema)
    .length(3)
    .describe("Three possible rebuttal approaches"),
});

export type RebuttalOutput = z.infer<typeof rebuttalSchema>;
