"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  getLocalizedSideLabel,
  interpolate,
  useI18n,
} from "@/lib/i18n/locale-context";
import { getCompletion, getSkillGrowth } from "@/lib/curriculum/progress";
import type { TrainedSkill } from "@/lib/curriculum/types";
import type { Case } from "@/lib/types";
import { TrainSetup } from "./train-setup";
import { ExerciseStepper } from "./exercise-stepper";
import { ScoreBar } from "./feedback-card";

interface TrainPanelProps {
  caseData: Case;
}

export function TrainPanel({ caseData }: TrainPanelProps) {
  const { t } = useI18n();
  const training = caseData.training;
  const format = caseData.format ?? "wsdc";

  if (!training) {
    return <TrainSetup caseData={caseData} />;
  }

  const completion = getCompletion(caseData);
  const growth = getSkillGrowth(caseData);
  const growthEntries = Object.entries(growth) as [TrainedSkill, number][];

  const roleLabel = (
    t.train.setup.roles as Record<string, { label: string }>
  )[training.role].label;

  return (
    <div className="space-y-6">
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="text-base">{t.train.overview.title}</CardTitle>
            <div className="flex items-center gap-1.5">
              <Badge variant="secondary" className="text-xs">
                {t.train.overview.role}: {roleLabel}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {t.train.overview.side}:{" "}
                {getLocalizedSideLabel(training.side, format, t)}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {interpolate(t.train.overview.progressLabel, {
                completed: completion.completed,
                total: completion.total,
              })}
            </span>
            <span className="font-medium">{completion.pct}%</span>
          </div>
          <Progress value={completion.pct} className="h-2" />
        </CardContent>
      </Card>

      <ExerciseStepper caseData={caseData} />

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">
            {t.train.overview.skillGrowth}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {growthEntries.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {t.train.overview.skillGrowthEmpty}
            </p>
          ) : (
            growthEntries.map(([skill, value]) => (
              <ScoreBar
                key={skill}
                label={(t.train.skills as Record<string, string>)[skill]}
                value={value}
              />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
