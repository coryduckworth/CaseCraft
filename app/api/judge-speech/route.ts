import { NextResponse } from "next/server";
import { generateStructured } from "@/lib/llm";
import { parseLocale } from "@/lib/i18n/types";
import { getCoachSystemPrompt, judgePrompt } from "@/lib/prompts";
import { judgeResultSchema } from "@/lib/schemas/judge";
import { parseFormat } from "@/lib/format";

export async function POST(request: Request) {
  try {
    const {
      motion,
      caseText,
      rebuttalText,
      summaryText,
      format: formatInput,
      locale: localeInput,
    } = await request.json();
    const format = parseFormat(formatInput);
    const locale = parseLocale(localeInput);

    if (!motion || typeof motion !== "string") {
      return NextResponse.json(
        { error: "Motion is required" },
        { status: 400 }
      );
    }

    const result = await generateStructured(
      judgePrompt(
        motion,
        caseText ?? "",
        rebuttalText ?? "",
        summaryText ?? "",
        format,
        locale
      ),
      judgeResultSchema,
      getCoachSystemPrompt(locale)
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("judge-speech error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to judge speech";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
