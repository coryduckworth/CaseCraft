import { NextResponse } from "next/server";
import { generateStructured } from "@/lib/llm";
import { parseLocale } from "@/lib/i18n/types";
import { getCoachSystemPrompt } from "@/lib/prompts";
import { coachFeedbackSchema } from "@/lib/schemas/coach";
import { coachPrompt } from "@/lib/prompts-train";
import { getExercise } from "@/lib/curriculum";
import { parseFormat } from "@/lib/format";
import type { DebateSide, SpeakerRole } from "@/lib/types";

function parseSide(value: unknown): DebateSide {
  return value === "opposition" ? "opposition" : "government";
}

function parseRole(value: unknown): SpeakerRole {
  return value === "second" || value === "third" ? value : "first";
}

export async function POST(request: Request) {
  try {
    const {
      motion,
      side: sideInput,
      role: roleInput,
      exerciseId,
      input,
      format: formatInput,
      locale: localeInput,
    } = await request.json();

    const format = parseFormat(formatInput);
    const locale = parseLocale(localeInput);
    const side = parseSide(sideInput);
    const role = parseRole(roleInput);

    if (!motion || typeof motion !== "string") {
      return NextResponse.json({ error: "Motion is required" }, { status: 400 });
    }

    const exercise = getExercise(role, exerciseId);
    if (!exercise) {
      return NextResponse.json(
        { error: `Unknown exercise: ${exerciseId}` },
        { status: 400 }
      );
    }

    const result = await generateStructured(
      coachPrompt(exercise, {
        motion,
        side,
        format,
        input: (input ?? {}) as Record<string, string>,
        locale,
      }),
      coachFeedbackSchema,
      getCoachSystemPrompt(locale)
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("coach error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to get coaching";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
