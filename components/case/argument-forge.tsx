"use client";

import { useState } from "react";
import { Hammer, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getLocalizedSideLabel,
  interpolate,
  useI18n,
} from "@/lib/i18n/locale-context";
import type { Argument, ArgumentSet, Case, DebateFormat, DebateSide } from "@/lib/types";
import { updateCase } from "@/lib/storage";

interface ArgumentForgeProps {
  caseData: Case;
  onUpdate: (updated: Case) => void;
}

function ratingColor(rating: string): string {
  if (rating === "High") return "bg-green-500/10 text-green-500";
  if (rating === "Medium") return "bg-amber-500/10 text-amber-500";
  return "bg-red-500/10 text-red-500";
}

export function ArgumentForgePanel({ caseData, onUpdate }: ArgumentForgeProps) {
  const { locale, t } = useI18n();
  const [side, setSide] = useState<DebateSide>("government");
  const [loading, setLoading] = useState(false);

  const format = caseData.format ?? "wsdc";
  const argumentSet = caseData.arguments?.[side];

  async function handleGenerate() {
    setLoading(true);
    try {
      const res = await fetch("/api/generate-arguments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          motion: caseData.motion,
          side,
          format,
          locale,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? t.errors.generateArguments);
      }

      const result = await res.json();
      const newSet: ArgumentSet = {
        side,
        arguments: result.arguments,
      };

      const updated = updateCase(caseData.id, {
        arguments: {
          ...caseData.arguments,
          [side]: newSet,
        },
      });
      if (updated) onUpdate(updated);
      toast.success(
        interpolate(t.toasts.argumentsGenerated, {
          side: getLocalizedSideLabel(side, format, t),
        })
      );
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t.errors.generateArguments
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">{t.arguments.title}</h2>
          <p className="text-sm text-muted-foreground">
            {t.arguments.description}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {t.format[format].evidenceApproach}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <SideToggle side={side} format={format} onChange={setSide} />
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
            {t.common.generate}
          </Button>
        </div>
      </div>

      {loading && !argumentSet && <ArgumentsSkeleton />}

      {argumentSet && (
        <div className="space-y-4">
          {argumentSet.arguments.map((arg, i) => (
            <ArgumentCard key={i} index={i + 1} argument={arg} />
          ))}
        </div>
      )}

      {!argumentSet && !loading && (
        <Card className="border-dashed border-border/50">
          <CardContent className="flex flex-col items-center py-12 text-center">
            <Hammer className="mb-3 h-8 w-8 text-muted-foreground" />
            <p className="text-muted-foreground">{t.arguments.empty}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function SideToggle({
  side,
  format,
  onChange,
}: {
  side: DebateSide;
  format: DebateFormat;
  onChange: (side: DebateSide) => void;
}) {
  const { t } = useI18n();

  return (
    <div className="flex rounded-lg border border-border/50 p-0.5">
      {(["government", "opposition"] as const).map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            side === s
              ? "bg-amber-500 text-black"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {getLocalizedSideLabel(s, format, t)}
        </button>
      ))}
    </div>
  );
}

function ArgumentCard({
  index,
  argument,
}: {
  index: number;
  argument: Argument;
}) {
  const { t } = useI18n();

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">
            {interpolate(t.arguments.argumentN, { n: index })}
          </CardTitle>
          <div className="flex gap-1.5">
            <Badge className={ratingColor(argument.likelihood)}>
              {t.arguments.likelihood}: {t.ratings[argument.likelihood as keyof typeof t.ratings] ?? argument.likelihood}
            </Badge>
            <Badge className={ratingColor(argument.importance)}>
              {t.arguments.importance}: {t.ratings[argument.importance as keyof typeof t.ratings] ?? argument.importance}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-amber-500">
            {t.arguments.claim}
          </p>
          <p className="mt-1 font-medium">{argument.claim}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {t.arguments.mechanism}
          </p>
          <p className="mt-1 text-sm text-foreground/80">{argument.mechanism}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {t.arguments.impact}
          </p>
          <p className="mt-1 text-sm text-foreground/80">{argument.impact}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ArgumentsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-44 rounded-xl" />
      ))}
    </div>
  );
}
