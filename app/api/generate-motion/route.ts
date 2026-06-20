import { NextResponse } from "next/server";
import { generateStructured } from "@/lib/llm";
import { parseLocale } from "@/lib/i18n/types";
import { MOTION_GEN_SYSTEM, motionGenPrompt } from "@/lib/prompts";
import { motionGenSchema } from "@/lib/schemas/motion-gen";
import { parseFormat } from "@/lib/format";

// Topic pool used to steer variety when the user doesn't give a theme — at
// temperature 0.8 the same prompt would otherwise repeat similar motions.
const TOPICS = [
  "education",
  "technology",
  "the environment",
  "ethics",
  "economics",
  "politics and democracy",
  "science",
  "media and social media",
  "health and medicine",
  "culture and the arts",
  "law and justice",
  "sport",
  "international relations",
  "artificial intelligence",
  "work and the economy",
];

export async function POST(request: Request) {
  try {
    const { format: formatInput, locale: localeInput, theme } =
      await request.json();
    const format = parseFormat(formatInput);
    const locale = parseLocale(localeInput);

    const topic =
      typeof theme === "string" && theme.trim()
        ? theme.trim()
        : TOPICS[Math.floor(Math.random() * TOPICS.length)];

    const result = await generateStructured(
      motionGenPrompt(format, topic, locale),
      motionGenSchema,
      MOTION_GEN_SYSTEM,
      0.8 // higher temperature so regenerating gives fresh motions
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("generate-motion error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate motion";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
