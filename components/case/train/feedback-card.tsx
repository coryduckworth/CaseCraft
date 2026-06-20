"use client";

import { Check, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useI18n } from "@/lib/i18n/locale-context";
import type { CoachFeedback } from "@/lib/types";

interface FeedbackCardProps {
  feedback: CoachFeedback;
  // criterion id -> human label (from the exercise's i18n copy)
  criteriaLabels: Record<string, string>;
}

export function FeedbackCard({ feedback, criteriaLabels }: FeedbackCardProps) {
  const { t } = useI18n();

  return (
    <div className="space-y-3">
      <Card
        className={
          feedback.passed
            ? "border-green-500/30 bg-green-500/5"
            : "border-amber-500/30 bg-amber-500/5"
        }
      >
        <CardContent className="flex items-center justify-between py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {t.train.feedback.score}
            </p>
            <p
              className={`text-3xl font-bold ${
                feedback.passed ? "text-green-500" : "text-amber-500"
              }`}
            >
              {feedback.score}
              <span className="text-base font-normal text-muted-foreground">
                {" "}
                / 100
              </span>
            </p>
          </div>
          <p className="text-sm font-medium">
            {feedback.passed
              ? t.train.feedback.passed
              : t.train.feedback.keepRefining}
          </p>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">{t.train.feedback.checklist}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {feedback.criteria.map((c) => (
            <div key={c.id} className="flex items-start gap-2">
              <span
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                  c.met
                    ? "bg-green-500/15 text-green-500"
                    : "bg-red-500/15 text-red-500"
                }`}
              >
                {c.met ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <X className="h-3 w-3" />
                )}
              </span>
              <div className="text-sm">
                <span className="font-medium">
                  {criteriaLabels[c.id] ?? c.id}
                </span>
                {c.note && (
                  <span className="text-muted-foreground"> — {c.note}</span>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {feedback.strengths.length > 0 && (
        <Card className="border-green-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-400">
              {t.train.feedback.strengths}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {feedback.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-400" />
                  {s}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {feedback.fixes.length > 0 && (
        <Card className="border-red-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-red-400">
              {t.train.feedback.fixes}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {feedback.fixes.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                  {f}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {feedback.message && (
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">{t.train.feedback.coaching}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-foreground/80">
              {feedback.message}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Mastery progress bars (reused on the overview), kept here for cohesion.
export function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="font-medium">{value}</span>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  );
}
