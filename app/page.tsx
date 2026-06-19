"use client";

import { ArrowRight, Brain, Swords, Scale } from "lucide-react";
import { CaseCard } from "@/components/dashboard/case-card";
import { LanguageSwitcher } from "@/components/dashboard/language-switcher";
import { NewMotionDialog } from "@/components/dashboard/new-motion-dialog";
import { Logo } from "@/components/brand/logo";
import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/lib/i18n/locale-context";
import { useCases, useHydrated } from "@/lib/hooks/use-storage";

export default function DashboardPage() {
  const hydrated = useHydrated();
  const cases = useCases();
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <Logo size="md" />
            <div>
              <h1 className="text-xl font-bold tracking-tight">CaseCraft</h1>
              <p className="text-sm text-muted-foreground">{t.dashboard.tagline}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <NewMotionDialog />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {!hydrated ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-36 rounded-xl" />
            ))}
          </div>
        ) : cases.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <h2 className="mb-4 text-lg font-semibold">
              {t.dashboard.recentCases}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cases.map((c) => (
                <CaseCard key={c.id} caseData={c} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function EmptyState() {
  const { t } = useI18n();

  const steps = [
    {
      icon: Brain,
      title: t.dashboard.steps.analyze.title,
      description: t.dashboard.steps.analyze.description,
    },
    {
      icon: Swords,
      title: t.dashboard.steps.forge.title,
      description: t.dashboard.steps.forge.description,
    },
    {
      icon: Scale,
      title: t.dashboard.steps.practice.title,
      description: t.dashboard.steps.practice.description,
    },
  ];

  return (
    <div className="flex flex-col items-center py-16 text-center">
      <div className="mb-6">
        <Logo size="lg" />
      </div>
      <h2 className="mb-2 text-2xl font-bold">{t.dashboard.welcomeTitle}</h2>
      <p className="mb-10 max-w-md text-muted-foreground">
        {t.dashboard.welcomeDescription}
      </p>

      <div className="mb-10 grid max-w-2xl gap-6 sm:grid-cols-3">
        {steps.map((step, i) => (
          <div key={step.title} className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <step.icon className="h-5 w-5 text-amber-500" />
              {i < steps.length - 1 && (
                <ArrowRight className="hidden h-4 w-4 text-muted-foreground sm:block" />
              )}
            </div>
            <h3 className="text-sm font-semibold">{step.title}</h3>
            <p className="text-xs text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>

      <NewMotionDialog />
    </div>
  );
}
