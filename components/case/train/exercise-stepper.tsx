"use client";

import { useState } from "react";
import { Check, ChevronDown, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { interpolate, useI18n } from "@/lib/i18n/locale-context";
import { getOrderedExercises } from "@/lib/curriculum";
import type { Case } from "@/lib/types";
import { ExercisePanel } from "./exercise-panel";

interface ExerciseStepperProps {
  caseData: Case;
}

export function ExerciseStepper({ caseData }: ExerciseStepperProps) {
  const { t } = useI18n();
  const training = caseData.training!;
  const exercises = getOrderedExercises(training.role);

  // Per-exercise lock/complete state derived from progress.
  const states = exercises.map((ex, i) => {
    const progress = training.exercises[ex.id];
    const completed = progress?.completed ?? false;
    const prevDone = i === 0 || training.exercises[exercises[i - 1].id]?.completed;
    return { ex, progress, completed, unlocked: i === 0 || !!prevDone };
  });

  const firstOpen =
    states.find((s) => s.unlocked && !s.completed)?.ex.id ??
    states[0]?.ex.id ??
    null;
  const [expandedId, setExpandedId] = useState<string | null>(firstOpen);

  function advanceFrom(currentId: string) {
    const idx = exercises.findIndex((e) => e.id === currentId);
    const next = exercises
      .slice(idx + 1)
      .find((e) => !training.exercises[e.id]?.completed);
    setExpandedId(next?.id ?? null);
  }

  return (
    <div className="space-y-3">
      {states.map(({ ex, progress, completed, unlocked }, i) => {
        const copy = (
          t.train.exercises as Record<string, { title: string }>
        )[ex.i18nKey];
        const skillLabel = (
          t.train.skills as Record<string, string>
        )[ex.skill];
        const isOpen = expandedId === ex.id && unlocked;

        return (
          <Card
            key={ex.id}
            className={`overflow-hidden border-border/50 ${
              !unlocked ? "opacity-60" : ""
            }`}
          >
            <button
              type="button"
              disabled={!unlocked}
              onClick={() => setExpandedId(isOpen ? null : ex.id)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left disabled:cursor-not-allowed"
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                  completed
                    ? "bg-green-500/15 text-green-500"
                    : unlocked
                      ? "bg-amber-500/15 text-amber-500"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {completed ? (
                  <Check className="h-4 w-4" />
                ) : !unlocked ? (
                  <Lock className="h-3.5 w-3.5" />
                ) : (
                  i + 1
                )}
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{copy?.title ?? ex.id}</p>
                <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
                  <Badge variant="secondary" className="text-[10px]">
                    {skillLabel}
                  </Badge>
                  {progress && progress.attempts.length > 0 && (
                    <Badge variant="outline" className="text-[10px]">
                      {interpolate(t.train.stepper.bestScore, {
                        score: progress.bestScore,
                      })}
                    </Badge>
                  )}
                </div>
              </div>

              {unlocked && (
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>

            {isOpen && (
              <div className="border-t border-border/50 px-4 py-4">
                <ExercisePanel
                  caseData={caseData}
                  exercise={ex}
                  onContinue={() => advanceFrom(ex.id)}
                />
              </div>
            )}

            {!unlocked && (
              <p className="px-4 pb-3 text-xs text-muted-foreground">
                {t.train.stepper.lockedHint}
              </p>
            )}
          </Card>
        );
      })}
    </div>
  );
}
