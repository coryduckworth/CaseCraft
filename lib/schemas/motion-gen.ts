import { z } from "zod";

function unwrap(v: unknown): string {
  let s = "";
  if (typeof v === "string") s = v;
  else if (v && typeof v === "object") {
    const o = v as Record<string, unknown>;
    const cand = o.motion ?? o.text ?? o.value;
    if (typeof cand === "string") s = cand;
  }
  // Strip wrapping quotes the model sometimes adds.
  return s.trim().replace(/^["'""]+|["'""]+$/g, "").trim();
}

function normalizeMotion(raw: unknown): unknown {
  if (raw && typeof raw === "object") {
    const o = raw as Record<string, unknown>;
    return { motion: unwrap(o.motion ?? o.text ?? o.value ?? raw) };
  }
  return { motion: unwrap(raw) };
}

export const motionGenSchema = z.preprocess(
  normalizeMotion,
  z.object({ motion: z.string().min(1) })
);

export type MotionGenOutput = z.infer<typeof motionGenSchema>;
