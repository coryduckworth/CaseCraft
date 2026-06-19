import { z } from "zod";

const ratingSchema = z.enum(["High", "Medium", "Low"]);

const argumentSchema = z.object({
  claim: z.string().describe("The main assertion of the argument"),
  mechanism: z
    .string()
    .describe("How the claim leads to the impact — the causal link"),
  impact: z.string().describe("The real-world consequence if the claim is true"),
  likelihood: ratingSchema.describe("How likely this impact is to occur"),
  importance: ratingSchema.describe("How significant the impact would be"),
});

export const argumentSetSchema = z.object({
  arguments: z
    .array(argumentSchema)
    .length(3)
    .describe("Exactly 3 structured arguments for the given side"),
});

export type ArgumentSetOutput = z.infer<typeof argumentSetSchema>;
