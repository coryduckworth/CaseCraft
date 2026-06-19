export type DebateFormat = "wsdc" | "wsc";

export type DebateSide = "government" | "opposition";

export type Rating = "High" | "Medium" | "Low";

export type RebuttalType = "turn" | "takeout" | "weighing" | "extension";

export interface MotionAnalysis {
  actor: string;
  action: string;
  stakeholders: string[];
  coreClash: string;
  contextNotes: string;
}

export interface Argument {
  claim: string;
  mechanism: string;
  impact: string;
  likelihood: Rating;
  importance: Rating;
}

export interface ArgumentSet {
  side: DebateSide;
  arguments: Argument[];
}

export interface ClashSide {
  label: string;
  points: string[];
}

export interface ClashMap {
  government: ClashSide;
  opposition: ClashSide;
  mainClash: string;
}

export interface RebuttalResponse {
  response: string;
  explanation: string;
  type: RebuttalType;
}

export interface RebuttalSession {
  id: string;
  opponentArgument: string;
  side: DebateSide;
  responses: RebuttalResponse[];
  createdAt: string;
}

export interface SkillBreakdown {
  logic: number;
  rebuttal: number;
  weighing: number;
  analysis: number;
  evidence: number;
}

export interface JudgeResult {
  id: string;
  caseText: string;
  rebuttalText: string;
  summaryText: string;
  strengths: string[];
  weaknesses: string[];
  score: number;
  skillBreakdown: SkillBreakdown;
  feedback: string;
  createdAt: string;
}

export interface Case {
  id: string;
  motion: string;
  format: DebateFormat;
  createdAt: string;
  updatedAt: string;
  side?: DebateSide;
  analysis?: MotionAnalysis;
  arguments?: Partial<Record<DebateSide, ArgumentSet>>;
  clashMap?: ClashMap;
  rebuttals?: RebuttalSession[];
  judgeResults?: JudgeResult[];
}
