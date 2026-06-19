"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
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
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [motion, setMotion] = useState("");
  const [format, setFormat] = useState<DebateFormat>("wsdc");

  const formatConfig = t.format[format];

  function handleCreate() {
    const trimmed = motion.trim();
    if (!trimmed) return;

    const newCase = createCase(trimmed, format);
    setOpen(false);
    setMotion("");
    setFormat("wsdc");
    onCreated?.();
    router.push(`/case/${newCase.id}`);
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
            disabled={!motion.trim()}
            className="bg-amber-500 text-black hover:bg-amber-400"
          >
            {t.dashboard.createCase}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
