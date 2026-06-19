import { NextResponse } from "next/server";
import { generateStructured } from "@/lib/llm";
import { parseLocale } from "@/lib/i18n/types";
import { clashMapPrompt, getCoachSystemPrompt } from "@/lib/prompts";
import { clashMapSchema } from "@/lib/schemas/clash";
import { parseFormat } from "@/lib/format";

export async function POST(request: Request) {
  try {
    const { motion, format: formatInput, locale: localeInput } =
      await request.json();
    const format = parseFormat(formatInput);
    const locale = parseLocale(localeInput);

    if (!motion || typeof motion !== "string") {
      return NextResponse.json(
        { error: "Motion is required" },
        { status: 400 }
      );
    }

    const result = await generateStructured(
      clashMapPrompt(motion, format, locale),
      clashMapSchema,
      getCoachSystemPrompt(locale)
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("generate-clash-map error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate clash map";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
