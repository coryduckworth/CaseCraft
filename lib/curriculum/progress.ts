import type { Case } from "@/lib/types";
import type { TrainedSkill } from "./types";
import { getOrderedExercises } from "./index";

export interface Completion {
  completed: number;
  total: number;
  pct: number; // 0-100
}

// Completed exercises out of the role's total. Used by the Train progress bar
// and the dashboard case-card badge.
export function getCompletion(caseData: Case): Completion {
  const training = caseData.training;
  if (!training) return { completed: 0, total: 0, pct: 0 };

  const exercises = getOrderedExercises(training.role);
  const total = exercises.length;
  const completed = exercises.filter(
    (ex) => training.exercises[ex.id]?.completed
  ).length;
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { completed, total, pct };
}

// Average best-score per trained skill (lightweight mastery view). Only
// exercises that have been attempted contribute.
export function getSkillGrowth(
  caseData: Case
): Partial<Record<TrainedSkill, number>> {
  const training = caseData.training;
  if (!training) return {};

  const buckets: Partial<Record<TrainedSkill, number[]>> = {};
  for (const ex of getOrderedExercises(training.role)) {
    const progress = training.exercises[ex.id];
    if (!progress || progress.attempts.length === 0) continue;
    (buckets[ex.skill] ??= []).push(progress.bestScore);
  }

  const growth: Partial<Record<TrainedSkill, number>> = {};
  for (const [skill, scores] of Object.entries(buckets) as [
    TrainedSkill,
    number[]
  ][]) {
    growth[skill] = Math.round(
      scores.reduce((a, b) => a + b, 0) / scores.length
    );
  }
  return growth;
}
