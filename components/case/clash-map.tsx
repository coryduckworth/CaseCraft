"use client";

import { useState } from "react";
import { GitBranch, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/lib/i18n/locale-context";
import type { Case, ClashMap } from "@/lib/types";
import { updateCase } from "@/lib/storage";

interface ClashMapPanelProps {
  caseData: Case;
  onUpdate: (updated: Case) => void;
}

export function ClashMapPanel({ caseData, onUpdate }: ClashMapPanelProps) {
  const { locale, t } = useI18n();
  const [loading, setLoading] = useState(false);
  const format = caseData.format ?? "wsdc";
  const formatConfig = t.format[format];
  const clashMap = caseData.clashMap;

  async function handleGenerate() {
    setLoading(true);
    try {
      const res = await fetch("/api/generate-clash-map", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ motion: caseData.motion, format, locale }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? t.errors.generateClashMap);
      }

      const result: ClashMap = await res.json();
      const updated = updateCase(caseData.id, { clashMap: result });
      if (updated) onUpdate(updated);
      toast.success(t.toasts.clashMapGenerated);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t.errors.generateClashMap
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{t.clash.title}</h2>
          <p className="text-sm text-muted-foreground">{t.clash.description}</p>
        </div>
        <Button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-amber-500 text-black hover:bg-amber-400"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          {clashMap ? t.common.regenerate : t.clash.generateMap}
        </Button>
      </div>

      {loading && !clashMap && <ClashSkeleton />}

      {clashMap && (
        <ClashVisualization
          clashMap={clashMap}
          affirmativeLabel={formatConfig.affirmativeLabel}
          negativeLabel={formatConfig.negativeLabel}
        />
      )}

      {!clashMap && !loading && (
        <Card className="border-dashed border-border/50">
          <CardContent className="flex flex-col items-center py-12 text-center">
            <GitBranch className="mb-3 h-8 w-8 text-muted-foreground" />
            <p className="text-muted-foreground">
              {format === "wsc" ? t.clash.emptyWsc : t.clash.empty}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ClashVisualization({
  clashMap,
  affirmativeLabel,
  negativeLabel,
}: {
  clashMap: ClashMap;
  affirmativeLabel: string;
  negativeLabel: string;
}) {
  const { t } = useI18n();

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-blue-500/30 bg-blue-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-400">
              {affirmativeLabel}
            </CardTitle>
            <p className="text-lg font-semibold">{clashMap.government.label}</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {clashMap.government.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                  {point}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-red-500/30 bg-red-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-400">
              {negativeLabel}
            </CardTitle>
            <p className="text-lg font-semibold">{clashMap.opposition.label}</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {clashMap.opposition.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                  {point}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="relative">
        <div className="absolute inset-x-0 top-0 hidden h-px bg-gradient-to-r from-blue-500/50 via-amber-500/50 to-red-500/50 md:block" />
        <Card className="border-amber-500/40 bg-amber-500/10">
          <CardContent className="py-4 text-center">
            <p className="text-xs font-medium uppercase tracking-wider text-amber-500">
              {t.clash.mainClash}
            </p>
            <p className="mt-1 text-lg font-bold">{clashMap.mainClash}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ClashSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-48 rounded-xl" />
        <Skeleton className="h-48 rounded-xl" />
      </div>
      <Skeleton className="h-20 rounded-xl" />
    </div>
  );
}
