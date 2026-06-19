"use client";

import { useSyncExternalStore } from "react";
import type { Case } from "@/lib/types";
import { getCase, getCases, subscribeToStorage } from "@/lib/storage";

const SERVER_CASES: Case[] = [];

export function useCases(): Case[] {
  return useSyncExternalStore(
    subscribeToStorage,
    getCases,
    () => SERVER_CASES
  );
}

export function useCase(id: string): Case | undefined {
  return useSyncExternalStore(
    subscribeToStorage,
    () => getCase(id),
    () => undefined
  );
}

export function useHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}
