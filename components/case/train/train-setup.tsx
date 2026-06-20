"use client";

import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getLocalizedSideLabel, useI18n } from "@/lib/i18n/locale-context";
import { AVAILABLE_ROLES } from "@/lib/curriculum";
import { updateCase } from "@/lib/storage";
import type { Case, DebateSide, SpeakerRole } from "@/lib/types";

const ALL_ROLES: SpeakerRole[] = ["first", "second", "third"];

interface TrainSetupProps {
  caseData: Case;
}

export function TrainSetup({ caseData }: TrainSetupProps) {
  const { t } = useI18n();
  const format = caseData.format ?? "wsdc";

  const [side, setSide] = useState<DebateSide>(caseData.side ?? "government");
  const [role, setRole] = useState<SpeakerRole>("first");

  function handleStart() {
    updateCase(caseData.id, {
      side,
      training: {
        role,
        side,
        startedAt: new Date().toISOString(),
        exercises: {},
      },
    });
    toast.success(t.train.toasts.started);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
          <GraduationCap className="h-6 w-6 text-amber-500" />
        </div>
        <h2 className="text-lg font-semibold">{t.train.setup.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t.train.setup.subtitle}
        </p>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">{t.train.setup.chooseSide}</p>
        <div className="flex rounded-lg border border-border/50 p-0.5">
          {(["government", "opposition"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSide(s)}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
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

      <div>
        <p className="mb-2 text-sm font-medium">{t.train.setup.chooseRole}</p>
        <div className="space-y-2">
          {ALL_ROLES.map((r) => {
            const available = AVAILABLE_ROLES.includes(r);
            const roleCopy = (
              t.train.setup.roles as Record<
                string,
                { label: string; blurb: string }
              >
            )[r];
            const selected = role === r;
            return (
              <Card
                key={r}
                onClick={() => available && setRole(r)}
                className={`flex items-center justify-between border p-3 transition-colors ${
                  available ? "cursor-pointer" : "cursor-not-allowed opacity-60"
                } ${
                  selected && available
                    ? "border-amber-500/60 bg-amber-500/5"
                    : "border-border/50"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{roleCopy.label}</p>
                    {!available && (
                      <Badge variant="outline" className="text-[10px]">
                        {t.train.setup.comingSoon}
                      </Badge>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {roleCopy.blurb}
                  </p>
                </div>
                <span
                  className={`h-4 w-4 shrink-0 rounded-full border-2 ${
                    selected && available
                      ? "border-amber-500 bg-amber-500"
                      : "border-border"
                  }`}
                />
              </Card>
            );
          })}
        </div>
      </div>

      <Button
        onClick={handleStart}
        className="w-full bg-amber-500 text-black hover:bg-amber-400"
      >
        {t.train.setup.start}
      </Button>
    </div>
  );
}
