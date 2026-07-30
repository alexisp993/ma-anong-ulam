"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getGuestWeeklyPlan } from "@/lib/guest-storage";

type Status = "loading" | "success" | "error";

// Reports whether the current user (guest or signed-in) has a weekly plan
// saved right now. Doesn't track per-meal completion — Meal Tracking is out
// of MVP scope, so "planned" is a simple yes/no, not a day-by-day progress.
export function useWeeklyPlanStatus() {
  const { data: session, status: sessionStatus } = useSession();
  const [hasPlan, setHasPlan] = useState(false);
  const [status, setStatus] = useState<Status>("loading");

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      if (session?.user) {
        const response = await fetch("/api/weekly-planner/current");
        const json = await response.json();
        setHasPlan(Boolean(json.success && json.data));
      } else {
        setHasPlan(Boolean(getGuestWeeklyPlan()));
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }, [session]);

  useEffect(() => {
    if (sessionStatus === "loading") return;
    load();
  }, [sessionStatus, load]);

  return { hasPlan, status };
}
