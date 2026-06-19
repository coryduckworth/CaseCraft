import { NextResponse } from "next/server";
import { generateStructured } from "@/lib/llm";
import { parseLocale } from "@/lib/i18n/types";
import { getCoachSystemPrompt, rebuttalPrompt } from "@/lib/prompts";
import { rebuttalSchema } from "@/lib/schemas/rebuttal";
import { parseFormat } from "@/lib/format";

export async function POST(request: Request) {
  try {
    const {
      motion,
      opponentArgument,
      side,
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

    if (!opponentArgument || typeof opponentArgument !== "string") {
      return NextResponse.json(
        { error: "Opponent argument is required" },
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
      rebuttalPrompt(motion, opponentArgument, side, format, locale),
      rebuttalSchema,
      getCoachSystemPrompt(locale)
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("generate-rebuttals error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate rebuttals";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
