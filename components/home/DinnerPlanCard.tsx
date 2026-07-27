"use client";

import Link from "next/link";
import { useWeeklyPlanStatus } from "@/lib/hooks/useWeeklyPlanStatus";
import { CalendarIcon } from "@/components/icons";

const RADIUS = 32;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// The mockup's donut implies day-by-day completion, but marking individual
// meals as "cooked" is Meal Tracking — explicitly out of MVP scope, and a
// saved plan always fills all 7 days at once (no partial state exists in the
// data). So this ring is a simple planned/not-planned indicator, not a
// progress tracker.
export function DinnerPlanCard() {
  const { hasPlan, status } = useWeeklyPlanStatus();

  return (
    <div className="space-y-3 rounded-card border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-center gap-2 text-text">
        <CalendarIcon size={18} />
        <h2 className="font-bold">What&apos;s for Dinner?</h2>
      </div>

      {status === "loading" ? (
        <p className="text-sm text-text-muted">Checking your plan…</p>
      ) : (
        <>
          <div className="flex items-center justify-center py-2">
            <svg viewBox="0 0 80 80" width={80} height={80} className="-rotate-90">
              <circle cx={40} cy={40} r={RADIUS} fill="none" strokeWidth={8} className="stroke-border" />
              <circle
                cx={40}
                cy={40}
                r={RADIUS}
                fill="none"
                strokeWidth={8}
                strokeLinecap="round"
                className="stroke-accent transition-all"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={hasPlan ? 0 : CIRCUMFERENCE}
              />
            </svg>
          </div>
          <p className="text-center text-sm text-text-muted">
            {hasPlan ? "Your week is planned." : "No plan yet for this week."}
          </p>
          <Link
            href="/weekly-planner"
            className="block rounded-card bg-primary px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            {hasPlan ? "Go to Planner" : "Plan your week"}
          </Link>
        </>
      )}
    </div>
  );
}
