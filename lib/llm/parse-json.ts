import { z } from "zod";

/**
 * Strip thinking blocks and markdown code fences from model output.
 */
export function cleanModelOutput(text: string): string {
  let cleaned = text.trim();

  // Remove thinking blocks (e.g. Qwen3 ...)
  cleaned = cleaned.replace(/[\s\S]*?<\/think>/gi, "").trim();

  // Remove markdown JSON fences if present
  const fenceMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) {
    cleaned = fenceMatch[1].trim();
  }

  // If there's extra text before/after JSON, extract the JSON object/array
  const jsonStart = cleaned.search(/[{[]/);
  const jsonEnd = Math.max(
    cleaned.lastIndexOf("}"),
    cleaned.lastIndexOf("]")
  );
  if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
    cleaned = cleaned.slice(jsonStart, jsonEnd + 1);
  }

  return cleaned;
}

export function parseAndValidate<T>(
  raw: string,
  schema: z.ZodType<T>
): { success: true; data: T } | { success: false; error: string; raw: string } {
  const cleaned = cleanModelOutput(raw);

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    return {
      success: false,
      error: `Invalid JSON: ${e instanceof Error ? e.message : "parse failed"}`,
      raw: cleaned,
    };
  }

  const result = schema.safeParse(parsed);
  if (!result.success) {
    return {
      success: false,
      error: result.error.message,
      raw: cleaned,
    };
  }

  return { success: true, data: result.data };
}

export function buildRepairPrompt(validationError: string, previousRaw: string): string {
  return `Your previous response failed validation:
${validationError}

Fix the JSON and return ONLY the corrected JSON object. No markdown, no explanation.
Previous response:
${previousRaw}`;
}
