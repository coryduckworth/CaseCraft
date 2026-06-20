import type { SpeakerRole } from "@/lib/types";

// Which trained skill an exercise maps to (reuses the existing 5-skill vocabulary
// so progress aggregates onto the same skills the Judge already scores).
export type TrainedSkill =
  | "analysis"
  | "logic"
  | "weighing"
  | "rebuttal"
  | "evidence";

// Selects the per-exercise prompt builder content in lib/prompts-train.ts.
export type TrainPromptId =
  | "interpretation"
  | "tradeoff"
  | "stakeholders"
  | "mechanism";

// One input field the student fills. Label/placeholder live in i18n
// (t.train.exercises[i18nKey].fields[id]); the prompt's notion of the field
// lives in lib/prompts-train.ts. The descriptor only carries layout hints.
export interface ExerciseField {
  id: string;
  multiline?: boolean;
  rows?: number;
}

// A declarative exercise. Adding 2nd/3rd speaker later = add descriptors;
// the engine (API, ExercisePanel, stepper, progress) is untouched.
export interface ExerciseDescriptor {
  id: string; // stable storage/API id, e.g. "first-interpretation"
  order: number; // sequence within the role
  i18nKey: string; // key under t.train.exercises.*  (title/blurb/fields/criteria)
  promptId: TrainPromptId; // selects prompt content in lib/prompts-train.ts
  skill: TrainedSkill; // for the mastery aggregation
  fields: ExerciseField[]; // student input shape
  criteria: string[]; // criterion ids the AI grades against (3-4, kept narrow)
  passThreshold: number; // passed = score>=this && all returned criteria met
}

export interface RoleCurriculum {
  role: SpeakerRole;
  exercises: ExerciseDescriptor[]; // ordered by `order`
}
