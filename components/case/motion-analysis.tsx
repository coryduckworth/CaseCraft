"use client";

import { useState } from "react";
import { Brain, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/lib/i18n/locale-context";
import type { Case, MotionAnalysis } from "@/lib/types";
import { updateCase } from "@/lib/storage";

interface MotionAnalysisProps {
  caseData: Case;
  onUpdate: (updated: Case) => void;
}

export function MotionAnalysisPanel({ caseData, onUpdate }: MotionAnalysisProps) {
  const { locale, t } = useI18n();
  const [loading, setLoading] = useState(false);
  const format = caseData.format ?? "wsdc";
  const formatConfig = t.format[format];
  const analysis = caseData.analysis;

  async function handleAnalyze() {
    setLoading(true);
    try {
      const res = await fetch("/api/analyze-motion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          motion: caseData.motion,
          format: caseData.format ?? "wsdc",
          locale,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? t.errors.analyzeMotion);
      }

      const result: MotionAnalysis = await res.json();
      const updated = updateCase(caseData.id, { analysis: result });
      if (updated) onUpdate(updated);
      toast.success(t.toasts.motionAnalyzed);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t.errors.analyzeMotion
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{t.analysis.title}</h2>
          <p className="text-sm text-muted-foreground">
            {t.analysis.description}
            {format === "wsc" && t.analysis.descriptionWsc}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {formatConfig.motionPrefix} · {formatConfig.evidenceApproach}
          </p>
        </div>
        <Button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-amber-500 text-black hover:bg-amber-400"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          {analysis ? t.common.reanalyze : t.analysis.analyzeMotion}
        </Button>
      </div>

      {loading && !analysis && <AnalysisSkeleton />}

      {analysis && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t.analysis.actor}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">{analysis.actor}</p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t.analysis.action}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">{analysis.action}</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t.analysis.stakeholders}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {analysis.stakeholders.map((s) => (
                  <Badge key={s} variant="secondary">
                    {s}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-500/30 bg-amber-500/5 md:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-amber-500" />
                <CardTitle className="text-sm font-medium text-amber-500">
                  {t.analysis.coreClash}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">{analysis.coreClash}</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t.analysis.context}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed text-foreground/80">
                {analysis.contextNotes}
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      )}

      {!analysis && !loading && (
        <Card className="border-dashed border-border/50">
          <CardContent className="flex flex-col items-center py-12 text-center">
            <Brain className="mb-3 h-8 w-8 text-muted-foreground" />
            <p className="text-muted-foreground">{t.analysis.empty}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function AnalysisSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Skeleton className="h-24 rounded-xl" />
      <Skeleton className="h-24 rounded-xl" />
      <Skeleton className="h-20 rounded-xl md:col-span-2" />
      <Skeleton className="h-28 rounded-xl md:col-span-2" />
      <Skeleton className="h-24 rounded-xl md:col-span-2" />
    </div>
  );
}
