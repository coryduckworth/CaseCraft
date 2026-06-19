import type { DebateFormat, DebateSide } from "./types";

export interface FormatConfig {
  id: DebateFormat;
  label: string;
  description: string;
  affirmativeLabel: string;
  negativeLabel: string;
  motionPrefix: string;
  motionPlaceholder: string;
  prepTime: string;
  speechTime: string;
  crystallizationTime: string | null;
  evidenceApproach: string;
  promptContext: string;
}

export const FORMATS: Record<DebateFormat, FormatConfig> = {
  wsdc: {
    id: "wsdc",
    label: "WSDC",
    description: "World Schools Debating Championship",
    affirmativeLabel: "Government",
    negativeLabel: "Opposition",
    motionPrefix: "THBT / THW / THR",
    motionPlaceholder: 'e.g. "THBT universities should abolish grades"',
    prepTime: "1 hour",
    speechTime: "8 minutes",
    crystallizationTime: "4 minutes",
    evidenceApproach: "Elaborative research — cite real-world data, studies, and examples",
    promptContext: `Format: WSDC (World Schools Debating Championships)
- Sides: Government (affirmative) vs Opposition (negative)
- Speeches: 8-minute constructive speeches, 4-minute reply/crystallization speeches
- Motions use prefixes: THBT (This House Believes That), THW (This House Would), THR (This House Regrets)
- Evidence: Draw from elaborative research — real studies, statistics, historical examples
- Focus on structured argumentation with clear weighing in crystallization`,
  },
  wsc: {
    id: "wsc",
    label: "WSC",
    description: "World Scholar's Cup",
    affirmativeLabel: "Affirmative",
    negativeLabel: "Negative",
    motionPrefix: "That",
    motionPlaceholder: 'e.g. "That social media does more harm than good"',
    prepTime: "15 minutes",
    speechTime: "4 minutes",
    crystallizationTime: null,
    evidenceApproach: "WSC curriculum — draw from Scholar's Bowl themes and interdisciplinary knowledge",
    promptContext: `Format: WSC (World Scholar's Cup) Debate
- Sides: Affirmative vs Negative
- Prep: 15 minutes team preparation, then 4-minute individual speeches
- No crystallization/reply speech — each speaker delivers one 4-minute speech
- Motions begin with "That" (e.g. "That artificial intelligence will save humanity")
- Motion interpretation is critical — teach students to define key terms and scope the debate
- Evidence: Connect to WSC curriculum themes (Science, Literature, History, Social Studies, Art, Special Area)
- Speeches must be concise and punchy due to 4-minute limit`,
  },
};

export function getFormatConfig(format: DebateFormat = "wsdc"): FormatConfig {
  return FORMATS[format];
}

export function getSideLabel(side: DebateSide, format: DebateFormat = "wsdc"): string {
  const config = getFormatConfig(format);
  return side === "government" ? config.affirmativeLabel : config.negativeLabel;
}

export function getFormatSummary(format: DebateFormat = "wsdc"): string {
  const config = getFormatConfig(format);
  const crystal = config.crystallizationTime
    ? `, ${config.crystallizationTime} crystallization`
    : ", no crystallization";
  return `${config.prepTime} prep · ${config.speechTime} speech${crystal}`;
}

export function parseFormat(value: unknown): DebateFormat {
  return value === "wsc" ? "wsc" : "wsdc";
}
