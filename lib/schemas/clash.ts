import { z } from "zod";

const clashSideSchema = z.object({
  label: z.string().describe("Short label for this side's overall position"),
  points: z
    .array(z.string())
    .min(2)
    .max(4)
    .describe("Key argument themes for this side"),
});

export const clashMapSchema = z.object({
  government: clashSideSchema,
  opposition: clashSideSchema,
  mainClash: z
    .string()
    .describe("The central clash where the debate is actually decided"),
});

export type ClashMapOutput = z.infer<typeof clashMapSchema>;
