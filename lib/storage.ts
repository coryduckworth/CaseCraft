import { v4 as uuidv4 } from "uuid";
import type { Case, DebateFormat } from "./types";

const STORAGE_KEY = "casecraft_cases";
const STORAGE_EVENT = "casecraft-storage-change";

const EMPTY_CASES: Case[] = [];

let cachedCasesJson: string | null = null;
let cachedCases: Case[] = EMPTY_CASES;

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function subscribeToStorage(callback: () => void): () => void {
  window.addEventListener(STORAGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(STORAGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function notifyStorageChange(): void {
  if (isBrowser()) {
    window.dispatchEvent(new Event(STORAGE_EVENT));
  }
}

export function getCases(): Case[] {
  if (!isBrowser()) return EMPTY_CASES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const normalized = raw ?? "[]";
    if (normalized === cachedCasesJson) {
      return cachedCases;
    }
    cachedCasesJson = normalized;
    cachedCases = JSON.parse(normalized) as Case[];
    return cachedCases;
  } catch {
    return EMPTY_CASES;
  }
}

export function getCase(id: string): Case | undefined {
  return getCases().find((c) => c.id === id);
}

export function saveCases(cases: Case[]): void {
  if (!isBrowser()) return;
  const json = JSON.stringify(cases);
  localStorage.setItem(STORAGE_KEY, json);
  cachedCasesJson = json;
  cachedCases = cases;
  notifyStorageChange();
}

export function createCase(
  motion: string,
  format: DebateFormat = "wsdc"
): Case {
  const now = new Date().toISOString();
  const newCase: Case = {
    id: uuidv4(),
    motion: motion.trim(),
    format,
    createdAt: now,
    updatedAt: now,
  };

  const cases = getCases();
  cases.unshift(newCase);
  saveCases(cases);
  return newCase;
}

export function updateCase(id: string, updates: Partial<Case>): Case | undefined {
  const cases = getCases();
  const index = cases.findIndex((c) => c.id === id);
  if (index === -1) return undefined;

  const updated: Case = {
    ...cases[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  cases[index] = updated;
  saveCases(cases);
  return updated;
}

export function deleteCase(id: string): void {
  const cases = getCases().filter((c) => c.id !== id);
  saveCases(cases);
}

export function formatRelativeTime(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export { getSideLabel, getFormatConfig, getFormatSummary } from "./format";
