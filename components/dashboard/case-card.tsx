"use client";

import Link from "next/link";
import { FileText, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FormatBadge } from "@/components/case/format-selector";
import { formatRelativeTime, useI18n } from "@/lib/i18n/locale-context";
import type { Case } from "@/lib/types";

interface CaseCardProps {
  caseData: Case;
}

export function CaseCard({ caseData }: CaseCardProps) {
  const { t } = useI18n();
  const hasAnalysis = !!caseData.analysis;
  const hasArguments = !!caseData.arguments;
  const hasClash = !!caseData.clashMap;

  return (
    <Link href={`/case/${caseData.id}`}>
      <Card className="group h-full cursor-pointer border-border/50 transition-all hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-amber-500/10 p-2">
              <FileText className="h-5 w-5 text-amber-500" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="line-clamp-2 text-base leading-snug group-hover:text-amber-500">
                {caseData.motion}
              </CardTitle>
              <CardDescription className="mt-1 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatRelativeTime(caseData.updatedAt, t)}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1.5">
            <FormatBadge format={caseData.format ?? "wsdc"} />
            {hasAnalysis && (
              <Badge variant="secondary" className="text-xs">
                {t.dashboard.badges.analyzed}
              </Badge>
            )}
            {hasArguments && (
              <Badge variant="secondary" className="text-xs">
                {t.dashboard.badges.arguments}
              </Badge>
            )}
            {hasClash && (
              <Badge variant="secondary" className="text-xs">
                {t.dashboard.badges.clashMap}
              </Badge>
            )}
            {!hasAnalysis && !hasArguments && !hasClash && (
              <Badge variant="outline" className="text-xs">
                {t.dashboard.badges.newCase}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
