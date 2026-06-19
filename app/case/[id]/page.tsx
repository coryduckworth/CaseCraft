"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Brain,
  GitBranch,
  Gavel,
  Hammer,
  Swords,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { LanguageSwitcher } from "@/components/dashboard/language-switcher";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { MotionAnalysisPanel } from "@/components/case/motion-analysis";
import { ArgumentForgePanel } from "@/components/case/argument-forge";
import { ClashMapPanel } from "@/components/case/clash-map";
import { RebuttalArenaPanel } from "@/components/case/rebuttal-arena";
import { JudgeSimulatorPanel } from "@/components/case/judge-simulator";
import { FormatBadge, FormatSelector } from "@/components/case/format-selector";
import {
  getLocalizedFormatSummary,
  useI18n,
} from "@/lib/i18n/locale-context";
import { useCase, useHydrated } from "@/lib/hooks/use-storage";
import type { DebateFormat } from "@/lib/types";
import { getCase, updateCase } from "@/lib/storage";

const tabIcons = {
  analysis: Brain,
  arguments: Hammer,
  clash: GitBranch,
  rebuttal: Swords,
  judge: Gavel,
} as const;

type TabId = keyof typeof tabIcons;

export default function CasePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const hydrated = useHydrated();
  const caseData = useCase(id);
  const { t } = useI18n();

  const tabs: { id: TabId; label: string }[] = [
    { id: "analysis", label: t.case.tabs.analysis },
    { id: "arguments", label: t.case.tabs.arguments },
    { id: "clash", label: t.case.tabs.clash },
    { id: "rebuttal", label: t.case.tabs.rebuttal },
    { id: "judge", label: t.case.tabs.judge },
  ];

  useEffect(() => {
    if (hydrated && !getCase(id)) {
      router.push("/");
    }
  }, [hydrated, id, router]);

  function handleFormatChange(format: DebateFormat) {
    updateCase(id, { format });
  }

  if (!hydrated || !caseData) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b border-border/50 px-6 py-5">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="mt-2 h-4 w-96" />
        </div>
        <div className="mx-auto max-w-5xl px-6 py-8">
          <Skeleton className="mb-6 h-10 w-full rounded-lg" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  const format = caseData.format ?? "wsdc";
  const formatConfig = t.format[format];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50">
        <div className="mx-auto max-w-5xl px-6 py-5">
          <div className="mb-3 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.case.backToDashboard}
            </Link>
            <LanguageSwitcher />
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <Logo size="md" className="mt-0.5" />
              <div>
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <FormatBadge format={format} />
                </div>
                <h1 className="text-lg font-bold leading-snug">
                  {caseData.motion}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {formatConfig.description} ·{" "}
                  {getLocalizedFormatSummary(format, t)}
                </p>
              </div>
            </div>
            <div className="shrink-0">
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                {t.common.format}
              </p>
              <FormatSelector
                value={format}
                onChange={handleFormatChange}
                size="sm"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <Tabs defaultValue="analysis">
          <TabsList className="mb-6 w-full justify-start overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tabIcons[tab.id];
              return (
                <TabsTrigger key={tab.id} value={tab.id} className="gap-1.5">
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value="analysis">
            <MotionAnalysisPanel caseData={caseData} onUpdate={() => {}} />
          </TabsContent>
          <TabsContent value="arguments">
            <ArgumentForgePanel caseData={caseData} onUpdate={() => {}} />
          </TabsContent>
          <TabsContent value="clash">
            <ClashMapPanel caseData={caseData} onUpdate={() => {}} />
          </TabsContent>
          <TabsContent value="rebuttal">
            <RebuttalArenaPanel caseData={caseData} onUpdate={() => {}} />
          </TabsContent>
          <TabsContent value="judge">
            <JudgeSimulatorPanel caseData={caseData} onUpdate={() => {}} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
