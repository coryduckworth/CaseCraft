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
  score: number; // overall rating of how well the student did
  review: string; // concise overall review
  strengths: string[]; // things that did great
  fixes: string[]; // things to fix
  principles: string[]; // debate principles to study (if needed)
  detailedFeedback: string; // longer analysis, shown on demand
  createdAt: string;
}

// --- Guided "Train" mode -------------------------------------------------
// All training data lives on Case.training (optional), so existing
// localStorage cases stay backward-compatible with no migration.

export type SpeakerRole = "first" | "second" | "third";

// Per-rubric-criterion verdict (the id matches a criterion in the curriculum).
export interface CriterionResult {
  id: string;
  met: boolean;
  note: string;
}

// One AI grading result for a single attempt at an exercise.
export interface CoachFeedback {
  score: number; // 0-100
  passed: boolean; // computed client-side: score >= threshold && all criteria met
  criteria: CriterionResult[];
  strengths: string[];
  fixes: string[];
  message: string;
}

// One student attempt: their input keyed by field id + the feedback it earned.
export interface ExerciseAttempt {
  id: string;
  input: Record<string, string>;
  feedback: CoachFeedback;
  createdAt: string;
}

// Progress for one exercise within a role's path.
export interface ExerciseProgress {
  exerciseId: string;
  attempts: ExerciseAttempt[]; // oldest -> newest
  completed: boolean; // latched true once an attempt passes
  bestScore: number;
  updatedAt: string;
}

// The whole guided-training state for a case.
export interface TrainingProgress {
  role: SpeakerRole;
  side: DebateSide;
  startedAt: string;
  exercises: Record<string, ExerciseProgress>; // keyed by exerciseId
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
  training?: TrainingProgress;
}
