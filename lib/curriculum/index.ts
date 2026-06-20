import type { SpeakerRole } from "@/lib/types";
import type { ExerciseDescriptor, RoleCurriculum } from "./types";
import { FIRST_SPEAKER } from "./first-speaker";

// Registry of role -> curriculum. 2nd/3rd speaker are not built yet; their
// entries are intentionally absent so train-setup can mark them "coming soon".
export const CURRICULUM: Partial<Record<SpeakerRole, RoleCurriculum>> = {
  first: FIRST_SPEAKER,
};

// Roles that have a buildable path right now (drives the setup selector).
export const AVAILABLE_ROLES: SpeakerRole[] = ["first"];

export function getCurriculum(role: SpeakerRole): RoleCurriculum | undefined {
  return CURRICULUM[role];
}

export function getOrderedExercises(role: SpeakerRole): ExerciseDescriptor[] {
  const curriculum = CURRICULUM[role];
  if (!curriculum) return [];
  return [...curriculum.exercises].sort((a, b) => a.order - b.order);
}

export function getExercise(
  role: SpeakerRole,
  exerciseId: string
): ExerciseDescriptor | undefined {
  return CURRICULUM[role]?.exercises.find((e) => e.id === exerciseId);
}

export type { ExerciseDescriptor, RoleCurriculum, TrainedSkill, TrainPromptId } from "./types";
