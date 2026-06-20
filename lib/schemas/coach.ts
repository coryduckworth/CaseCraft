import { z } from "zod";

// --- Tolerance layer for a 3B model ------------------------------------------
// llama3.2:3b frequently bends the shape (e.g. puts a criterion's text under
// "value" instead of "note", returns `fixes` as objects, or drops `message`).
// We normalize the raw output into the strict inner shape BEFORE validation so
// a single response usually passes — avoiding the slow 3x repair loop and the
// hard failures that loop ends in.

function toStr(v: unknown): string {
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  return "";
}

function toBool(v: unknown): boolean {
  if (typeof v === "boolean") return v;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    return s === "true" || s === "yes" || s === "1";
  }
  if (typeof v === "number") return v === 1;
  return false;
}

// Coerce a field that should be string[] but may arrive as a string or as an
// array of {text|fix|note|...} objects.
function toStringArray(v: unknown): string[] {
  if (typeof v === "string") return v.trim() ? [v] : [];
  if (!Array.isArray(v)) return [];
  const out: string[] = [];
  for (const item of v) {
    if (typeof item === "string") {
      if (item.trim()) out.push(item);
    } else if (item && typeof item === "object") {
      const o = item as Record<string, unknown>;
      const cand = o.text ?? o.fix ?? o.note ?? o.value ?? o.message ?? o.point;
      if (typeof cand === "string" && cand.trim()) out.push(cand);
    }
  }
  return out.slice(0, 3);
}

function clampScore(v: unknown): number {
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
}

interface NormalizedCriterion {
  id: string;
  met: boolean;
  note: string;
}

function normalizeCriterion(c: unknown): NormalizedCriterion | null {
  if (!c || typeof c !== "object") return null;
  const o = c as Record<string, unknown>;
  if (typeof o.id !== "string") return null;
  const noteRaw = o.note ?? o.value ?? o.reason ?? o.explanation;
  return { id: o.id, met: toBool(o.met), note: toStr(noteRaw) };
}

function normalizeCoachOutput(raw: unknown): unknown {
  if (!raw || typeof raw !== "object") return raw;
  const o = raw as Record<string, unknown>;
  const criteria = Array.isArray(o.criteria)
    ? o.criteria
        .map(normalizeCriterion)
        .filter((c): c is NormalizedCriterion => c !== null)
        .slice(0, 4)
    : [];
  return {
    score: clampScore(o.score),
    criteria,
    strengths: toStringArray(o.strengths),
    fixes: toStringArray(o.fixes),
    message: toStr(o.message),
  };
}

// --- Strict inner shape (what the model is shown + what callers receive) ------
// NOTE: `passed` is intentionally NOT here — it is computed client-side as
// `score >= passThreshold && criteria.length && criteria.every(c => c.met)` so
// the gate stays deterministic rather than trusting the model.
const criterionResultSchema = z.object({
  id: z.string(),
  met: z.boolean(),
  note: z.string().describe("One short sentence: why met or not. No solutions."),
});

const coachFeedbackInner = z.object({
  score: z.number().min(0).max(100),
  criteria: z.array(criterionResultSchema).max(4),
  strengths: z
    .array(z.string())
    .max(3)
    .describe("Concrete things the student did well"),
  fixes: z
    .array(z.string())
    .max(3)
    .describe("Actionable directions to improve. Do NOT write the answer."),
  message: z
    .string()
    .describe("1-2 sentence coaching nudge. Never the final answer."),
});

// Public schema: normalize first, then validate. zodToJsonSchema unwraps the
// preprocess and shows the model the clean inner shape.
export const coachFeedbackSchema = z.preprocess(
  normalizeCoachOutput,
  coachFeedbackInner
);

export type CoachFeedbackOutput = z.infer<typeof coachFeedbackInner>;
