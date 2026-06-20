import { z } from "zod";

// --- Tolerance layer for the 3B model (same approach as schemas/coach.ts) ----
function toStr(v: unknown): string {
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  return "";
}

function toStringArray(v: unknown): string[] {
  if (typeof v === "string") return v.trim() ? [v] : [];
  if (!Array.isArray(v)) return [];
  const out: string[] = [];
  for (const item of v) {
    if (typeof item === "string") {
      if (item.trim()) out.push(item);
    } else if (item && typeof item === "object") {
      const o = item as Record<string, unknown>;
      const cand = o.text ?? o.point ?? o.fix ?? o.note ?? o.value;
      if (typeof cand === "string" && cand.trim()) out.push(cand);
    }
  }
  return out.slice(0, 5);
}

function clampScore(v: unknown): number {
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
}

function normalizeJudge(raw: unknown): unknown {
  if (!raw || typeof raw !== "object") return raw;
  const o = raw as Record<string, unknown>;
  return {
    score: clampScore(o.score ?? o.rating ?? o.overall),
    review: toStr(o.review ?? o.feedback ?? o.summary),
    strengths: toStringArray(o.strengths),
    fixes: toStringArray(o.fixes ?? o.weaknesses),
    principles: toStringArray(o.principles),
    detailedFeedback: toStr(o.detailedFeedback ?? o.detailed ?? o.analysis),
  };
}

const judgeResultInner = z.object({
  score: z.number().min(0).max(100),
  review: z.string().describe("Concise 2-3 sentence overall review"),
  strengths: z.array(z.string()).max(5).describe("Things the student did great"),
  fixes: z.array(z.string()).max(5).describe("Specific things to fix"),
  principles: z
    .array(z.string())
    .max(5)
    .describe("Debate principles to study, only if relevant (else empty)"),
  detailedFeedback: z
    .string()
    .describe("Longer detailed analysis, shown only on request"),
});

export const judgeResultSchema = z.preprocess(normalizeJudge, judgeResultInner);

export type JudgeResultOutput = z.infer<typeof judgeResultInner>;
