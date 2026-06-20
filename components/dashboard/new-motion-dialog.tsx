"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FormatSelector } from "@/components/case/format-selector";
import { useI18n } from "@/lib/i18n/locale-context";
import type { DebateFormat } from "@/lib/types";
import { createCase } from "@/lib/storage";

interface NewMotionDialogProps {
  onCreated?: () => void;
}

export function NewMotionDialog({ onCreated }: NewMotionDialogProps) {
  const router = useRouter();
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(false);
  const [motion, setMotion] = useState("");
  const [theme, setTheme] = useState("");
  const [format, setFormat] = useState<DebateFormat>("wsdc");
  const [generating, setGenerating] = useState(false);

  const formatConfig = t.format[format];

  function handleCreate() {
    const trimmed = motion.trim();
    if (!trimmed) return;

    const newCase = createCase(trimmed, format);
    setOpen(false);
    setMotion("");
    setTheme("");
    setFormat("wsdc");
    onCreated?.();
    router.push(`/case/${newCase.id}`);
  }

  async function handleGenerate() {
    setGenerating(true);
    try {
      const res = await fetch("/api/generate-motion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ format, locale, theme }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? t.errors.generateMotion);
      }

      const data = await res.json();
      setMotion(data.motion);
      toast.success(t.toasts.motionGenerated);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t.errors.generateMotion
      );
    } finally {
      setGenerating(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="bg-amber-500 text-black hover:bg-amber-400">
            <Plus className="mr-2 h-4 w-4" />
            {t.dashboard.newMotion}
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t.dashboard.newCaseTitle}</DialogTitle>
          <DialogDescription>{t.dashboard.newCaseDescription}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium">{t.dashboard.debateFormat}</p>
            <FormatSelector value={format} onChange={setFormat} />
            <p className="mt-1.5 text-xs text-muted-foreground">
              {formatConfig.description} · {formatConfig.affirmativeLabel}{" "}
              {t.common.vs} {formatConfig.negativeLabel}
            </p>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">{t.dashboard.motion}</p>

            <div className="mb-2 flex gap-2">
              <Input
                placeholder={t.dashboard.motionTopicPlaceholder}
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                disabled={generating}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleGenerate}
                disabled={generating}
              >
                {generating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                {generating ? t.dashboard.generating : t.dashboard.generateMotion}
              </Button>
            </div>

            <Input
              placeholder={formatConfig.motionPlaceholder}
              value={motion}
              onChange={(e) => setMotion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              {t.common.prefix}: {formatConfig.motionPrefix}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {t.common.cancel}
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!motion.trim() || generating}
            className="bg-amber-500 text-black hover:bg-amber-400"
          >
            {t.dashboard.createCase}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
