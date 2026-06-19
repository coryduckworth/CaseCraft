"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Gavel, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { FORMATS } from "@/lib/format";
import { interpolate, useI18n } from "@/lib/i18n/locale-context";
import type { Case, JudgeResult, SkillBreakdown } from "@/lib/types";
import { updateCase } from "@/lib/storage";

interface JudgeSimulatorProps {
  caseData: Case;
  onUpdate: (updated: Case) => void;
}

export function JudgeSimulatorPanel({ caseData, onUpdate }: JudgeSimulatorProps) {
  const { locale, t } = useI18n();
  const format = caseData.format ?? "wsdc";
  const formatStructural = FORMATS[format];
  const isWsc = format === "wsc";

  const [caseText, setCaseText] = useState("");
  const [rebuttalText, setRebuttalText] = useState("");
  const [summaryText, setSummaryText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<JudgeResult | null>(
    caseData.judgeResults?.[0] ?? null
  );

  async function handleJudge() {
    const hasContent = isWsc
      ? caseText.trim()
      : caseText.trim() || rebuttalText.trim() || summaryText.trim();

    if (!hasContent) {
      toast.error(t.toasts.enterSpeechSection);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/judge-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          motion: caseData.motion,
          format,
          locale,
          caseText,
          rebuttalText: isWsc ? "" : rebuttalText,
          summaryText: isWsc ? "" : summaryText,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? t.errors.judgeSpeech);
      }

      const judgeData = await res.json();
      const judgeResult: JudgeResult = {
        id: uuidv4(),
        caseText,
        rebuttalText: isWsc ? "" : rebuttalText,
        summaryText: isWsc ? "" : summaryText,
        ...judgeData,
        createdAt: new Date().toISOString(),
      };

      setResult(judgeResult);
      const updated = updateCase(caseData.id, {
        judgeResults: [judgeResult, ...(caseData.judgeResults ?? [])],
      });
      if (updated) onUpdate(updated);
      toast.success(t.toasts.speechJudged);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t.errors.judgeSpeech
      );
    } finally {
      setLoading(false);
    }
  }

  const description = isWsc
    ? interpolate(t.judge.descriptionWsc, {
        speech: formatStructural.speechTime,
        prep: formatStructural.prepTime,
      })
    : interpolate(t.judge.descriptionWsdc, {
        speech: formatStructural.speechTime,
        crystal: formatStructural.crystallizationTime ?? "",
      });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">{t.judge.title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          {isWsc ? (
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                {interpolate(t.judge.speech, {
                  time: formatStructural.speechTime,
                })}
              </label>
              <Textarea
                placeholder={t.judge.placeholderWsc}
                value={caseText}
                onChange={(e) => setCaseText(e.target.value)}
                rows={8}
              />
              <p className="mt-1.5 text-xs text-muted-foreground">
                {t.format[format].evidenceApproach}
              </p>
            </div>
          ) : (
            <>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  {interpolate(t.judge.constructive, {
                    time: formatStructural.speechTime,
                  })}
                </label>
                <Textarea
                  placeholder={t.judge.placeholderConstructive}
                  value={caseText}
                  onChange={(e) => setCaseText(e.target.value)}
                  rows={4}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  {t.judge.rebuttal}
                </label>
                <Textarea
                  placeholder={t.judge.placeholderRebuttal}
                  value={rebuttalText}
                  onChange={(e) => setRebuttalText(e.target.value)}
                  rows={4}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  {interpolate(t.judge.crystallization, {
                    time: formatStructural.crystallizationTime ?? "",
                  })}
                </label>
                <Textarea
                  placeholder={t.judge.placeholderCrystallization}
                  value={summaryText}
                  onChange={(e) => setSummaryText(e.target.value)}
                  rows={4}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {t.format[format].evidenceApproach}
              </p>
            </>
          )}

          <Button
            onClick={handleJudge}
            disabled={loading}
            className="w-full bg-amber-500 text-black hover:bg-amber-400"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Gavel className="mr-2 h-4 w-4" />
            )}
            {t.judge.judgeMySpeech}
          </Button>
        </div>

        <div>
          {loading && <JudgeSkeleton />}

          {result && !loading && <JudgeResults result={result} />}

          {!result && !loading && (
            <Card className="border-dashed border-border/50">
              <CardContent className="flex flex-col items-center py-16 text-center">
                <Gavel className="mb-3 h-8 w-8 text-muted-foreground" />
                <p className="text-muted-foreground">{t.judge.empty}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function JudgeResults({ result }: { result: JudgeResult }) {
  const { t } = useI18n();
  const skillKeys = Object.keys(t.judge.skills) as Array<keyof SkillBreakdown>;

  return (
    <div className="space-y-4">
      <Card className="border-amber-500/30 bg-amber-500/5">
        <CardContent className="flex flex-col items-center py-6">
          <p className="text-sm font-medium text-muted-foreground">
            {t.common.score}
          </p>
          <p className="text-5xl font-bold text-amber-500">{result.score}</p>
          <p className="text-sm text-muted-foreground">/ 100</p>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">{t.judge.skillBreakdown}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {skillKeys.map((skill) => (
            <div key={skill} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{t.judge.skills[skill]}</span>
                <span className="font-medium">{result.skillBreakdown[skill]}</span>
              </div>
              <Progress value={result.skillBreakdown[skill]} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-green-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-green-400">
            {t.judge.strengths}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1">
            {result.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-400" />
                {s}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-red-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-red-400">
            {t.judge.weaknesses}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1">
            {result.weaknesses.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                {w}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">{t.judge.coachFeedback}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-foreground/80">
            {result.feedback}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function JudgeSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-32 rounded-xl" />
      <Skeleton className="h-48 rounded-xl" />
      <Skeleton className="h-28 rounded-xl" />
      <Skeleton className="h-28 rounded-xl" />
    </div>
  );
}
