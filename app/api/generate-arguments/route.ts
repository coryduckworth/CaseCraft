import { NextResponse } from "next/server";
import { generateStructured } from "@/lib/llm";
import { parseLocale } from "@/lib/i18n/types";
import { argumentForgePrompt, getCoachSystemPrompt } from "@/lib/prompts";
import { argumentSetSchema } from "@/lib/schemas/arguments";
import { parseFormat } from "@/lib/format";

export async function POST(request: Request) {
  try {
    const { motion, side, format: formatInput, locale: localeInput } =
      await request.json();
    const format = parseFormat(formatInput);
    const locale = parseLocale(localeInput);

    if (!motion || typeof motion !== "string") {
      return NextResponse.json(
        { error: "Motion is required" },
        { status: 400 }
      );
    }

    if (side !== "government" && side !== "opposition") {
      return NextResponse.json(
        { error: "Side must be 'government' or 'opposition'" },
        { status: 400 }
      );
    }

    const result = await generateStructured(
      argumentForgePrompt(motion, side, format, locale),
      argumentSetSchema,
      getCoachSystemPrompt(locale)
    );

    return NextResponse.json({ side, ...result });
  } catch (error) {
    console.error("generate-arguments error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate arguments";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
