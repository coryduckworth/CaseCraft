"use client";

import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { interpolate, useI18n } from "@/lib/i18n/locale-context";
import { updateCase } from "@/lib/storage";
import type {
  Case,
  CoachFeedback,
  ExerciseAttempt,
  ExerciseProgress,
} from "@/lib/types";
import type { ExerciseDescriptor } from "@/lib/curriculum/types";
import { FeedbackCard } from "./feedback-card";

// Shared shape of one exercise's i18n copy (keys vary per exercise, so we
// index it dynamically by id).
type ExerciseCopy = {
  title: string;
  blurb: string;
  fields: Record<string, { label: string; placeholder: string }>;
  criteria: Record<string, string>;
};

interface ExercisePanelProps {
  caseData: Case;
  exercise: ExerciseDescriptor;
  onContinue?: () => void;
}

export function ExercisePanel({
  caseData,
  exercise,
  onContinue,
}: ExercisePanelProps) {
  const { locale, t } = useI18n();
  const training = caseData.training;
  const progress = training?.exercises[exercise.id];
  const format = caseData.format ?? "wsdc";

  const copy = (t.train.exercises as Record<string, ExerciseCopy>)[
    exercise.i18nKey
  ];

  const [loading, setLoading] = useState(false);

  // Seed inputs from the most recent attempt so "revise" edits the prior answer.
  const initialValues = useMemo(() => {
    const last = progress?.attempts.at(-1)?.input;
    const seed: Record<string, string> = {};
    for (const field of exercise.fields) seed[field.id] = last?.[field.id] ?? "";
    return seed;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercise.id]);
  const [values, setValues] = useState<Record<string, string>>(initialValues);

  const latestFeedback = progress?.attempts.at(-1)?.feedback ?? null;
  const hasAttempts = (progress?.attempts.length ?? 0) > 0;

  async function handleSubmit() {
    if (!training) return;

    const allFilled = exercise.fields.every((f) => values[f.id]?.trim());
    if (!allFilled) {
      toast.error(t.train.panel.blankGuard);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          motion: caseData.motion,
          side: training.side,
          role: training.role,
          exerciseId: exercise.id,
          input: values,
          format,
          locale,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? t.errors.coach);
      }

      const raw = await res.json();
      // Unlock gate: score >= the exercise threshold (75). The criteria
      // checklist stays visible for learning but no longer gates progress.
      const passed = raw.score >= exercise.passThreshold;

      const feedback: CoachFeedback = { ...raw, passed };
      const now = new Date().toISOString();
      const attempt: ExerciseAttempt = {
        id: uuidv4(),
        input: { ...values },
        feedback,
        createdAt: now,
      };

      const wasComplete = progress?.completed ?? false;
      const nextProgress: ExerciseProgress = {
        exerciseId: exercise.id,
        attempts: [...(progress?.attempts ?? []), attempt],
        completed: wasComplete || passed,
        bestScore: Math.max(progress?.bestScore ?? 0, feedback.score),
        updatedAt: now,
      };

      updateCase(caseData.id, {
        training: {
          ...training,
          exercises: { ...training.exercises, [exercise.id]: nextProgress },
        },
      });

      if (passed && !wasComplete) {
        toast.success(t.train.toasts.complete);
      } else {
        toast.success(t.train.toasts.scored);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t.errors.coach);
    } finally {
      setLoading(false);
    }
  }

  function markComplete() {
    if (!training || !progress) return;
    updateCase(caseData.id, {
      training: {
        ...training,
        exercises: {
          ...training.exercises,
          [exercise.id]: {
            ...progress,
            completed: true,
            updatedAt: new Date().toISOString(),
          },
        },
      },
    });
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{copy.blurb}</p>

      <div className="space-y-3">
        {exercise.fields.map((field) => {
          const fieldCopy = copy.fields[field.id];
          return (
            <div key={field.id}>
              <label className="mb-1.5 block text-sm font-medium">
                {fieldCopy?.label ?? field.id}
              </label>
              {field.multiline ? (
                <Textarea
                  placeholder={fieldCopy?.placeholder}
                  value={values[field.id] ?? ""}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, [field.id]: e.target.value }))
                  }
                  rows={field.rows ?? 3}
                />
              ) : (
                <Input
                  placeholder={fieldCopy?.placeholder}
                  value={values[field.id] ?? ""}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, [field.id]: e.target.value }))
                  }
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-amber-500 text-black hover:bg-amber-400"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          {hasAttempts ? t.train.panel.resubmit : t.train.panel.submit}
        </Button>

        {progress?.completed && onContinue && (
          <Button variant="outline" onClick={onContinue}>
            {t.train.panel.continueNext}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}

        {hasAttempts && !progress?.completed && (
          <Button
            variant="ghost"
            className="text-muted-foreground"
            onClick={markComplete}
          >
            {t.train.panel.markComplete}
          </Button>
        )}
      </div>

      {loading && (
        <div className="space-y-3">
          <Skeleton className="h-20 rounded-xl" />
          <Skeleton className="h-28 rounded-xl" />
        </div>
      )}

      {!loading && latestFeedback && (
        <FeedbackCard feedback={latestFeedback} criteriaLabels={copy.criteria} />
      )}

      {(progress?.attempts.length ?? 0) > 1 && (
        <details className="rounded-lg border border-border/50 p-3">
          <summary className="cursor-pointer text-sm font-medium text-muted-foreground">
            {t.train.panel.history}
          </summary>
          <div className="mt-3 space-y-2">
            {progress!.attempts.slice(0, -1).map((a, i) => (
              <div
                key={a.id}
                className="flex items-center justify-between rounded-md bg-muted/30 px-3 py-2 text-sm"
              >
                <span className="text-muted-foreground">
                  {interpolate(t.train.panel.attemptN, { n: i + 1 })}
                </span>
                <span className="font-medium">{a.feedback.score} / 100</span>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
