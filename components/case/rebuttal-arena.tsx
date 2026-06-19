"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Loader2, Shield, Sparkles, Swords } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  getLocalizedSideLabel,
  interpolate,
  useI18n,
} from "@/lib/i18n/locale-context";
import type { Case, DebateSide, RebuttalResponse, RebuttalSession } from "@/lib/types";
import { updateCase } from "@/lib/storage";

interface RebuttalArenaProps {
  caseData: Case;
  onUpdate: (updated: Case) => void;
}

const rebuttalTypeColors: Record<string, string> = {
  turn: "bg-purple-500/10 text-purple-400",
  takeout: "bg-red-500/10 text-red-400",
  weighing: "bg-amber-500/10 text-amber-400",
  extension: "bg-blue-500/10 text-blue-400",
};

export function RebuttalArenaPanel({ caseData, onUpdate }: RebuttalArenaProps) {
  const { locale, t } = useI18n();
  const [opponentArgument, setOpponentArgument] = useState("");
  const [side, setSide] = useState<DebateSide>("government");
  const [loading, setLoading] = useState(false);
  const [currentResponses, setCurrentResponses] = useState<RebuttalResponse[] | null>(null);

  const format = caseData.format ?? "wsdc";
  const history = caseData.rebuttals ?? [];

  async function handleGenerate() {
    if (!opponentArgument.trim()) {
      toast.error(t.toasts.enterOpponentArgument);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/generate-rebuttals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          motion: caseData.motion,
          opponentArgument: opponentArgument.trim(),
          side,
          format,
          locale,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? t.errors.generateRebuttals);
      }

      const result = await res.json();
      setCurrentResponses(result.responses);

      const session: RebuttalSession = {
        id: uuidv4(),
        opponentArgument: opponentArgument.trim(),
        side,
        responses: result.responses,
        createdAt: new Date().toISOString(),
      };

      const updated = updateCase(caseData.id, {
        rebuttals: [session, ...history],
      });
      if (updated) onUpdate(updated);
      toast.success(t.toasts.rebuttalReady);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t.errors.generateRebuttals
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">{t.rebuttal.title}</h2>
        <p className="text-sm text-muted-foreground">{t.rebuttal.description}</p>
      </div>

      <Card className="border-border/50">
        <CardContent className="space-y-4 pt-6">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{t.rebuttal.yourSide}</span>
            <div className="flex rounded-lg border border-border/50 p-0.5">
              {(["government", "opposition"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSide(s)}
                  className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                    side === s
                      ? "bg-amber-500 text-black"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {getLocalizedSideLabel(s, format, t)}
                </button>
              ))}
            </div>
          </div>

          <Textarea
            placeholder={t.rebuttal.placeholder}
            value={opponentArgument}
            onChange={(e) => setOpponentArgument(e.target.value)}
            rows={3}
          />

          <Button
            onClick={handleGenerate}
            disabled={loading || !opponentArgument.trim()}
            className="bg-amber-500 text-black hover:bg-amber-400"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            {t.rebuttal.getCoaching}
          </Button>
        </CardContent>
      </Card>

      {currentResponses && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">{t.rebuttal.possibleResponses}</h3>
          {currentResponses.map((r, i) => (
            <RebuttalCard key={i} index={i + 1} response={r} />
          ))}
        </div>
      )}

      {history.length > 0 && !currentResponses && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">{t.rebuttal.pastSessions}</h3>
          {history.slice(0, 3).map((session) => (
            <Card
              key={session.id}
              className="cursor-pointer border-border/50 transition-colors hover:border-amber-500/30"
              onClick={() => {
                setOpponentArgument(session.opponentArgument);
                setSide(session.side);
                setCurrentResponses(session.responses);
              }}
            >
              <CardHeader className="pb-2">
                <CardDescription className="line-clamp-1 text-foreground/70">
                  &quot;{session.opponentArgument}&quot;
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="text-xs">
                  {getLocalizedSideLabel(session.side, format, t)} ·{" "}
                  {interpolate(t.rebuttal.responsesCount, {
                    n: session.responses.length,
                  })}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!currentResponses && history.length === 0 && (
        <Card className="border-dashed border-border/50">
          <CardContent className="flex flex-col items-center py-12 text-center">
            <Swords className="mb-3 h-8 w-8 text-muted-foreground" />
            <p className="text-muted-foreground">{t.rebuttal.empty}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function RebuttalCard({
  index,
  response,
}: {
  index: number;
  response: RebuttalResponse;
}) {
  const { t } = useI18n();
  const [expanded, setExpanded] = useState(false);
  const typeLabel =
    t.rebuttal.types[response.type as keyof typeof t.rebuttal.types] ??
    response.type;

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">
            {interpolate(t.rebuttal.responseN, { n: index })}
          </CardTitle>
          <Badge className={rebuttalTypeColors[response.type] ?? ""}>
            {typeLabel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="font-medium">{response.response}</p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-amber-500 hover:underline"
        >
          {expanded ? t.rebuttal.hideExplanation : t.rebuttal.whyThisWorks}
        </button>
        {expanded && (
          <p className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
            {response.explanation}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
