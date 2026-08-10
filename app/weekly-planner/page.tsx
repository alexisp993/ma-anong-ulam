"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { MealCard } from "@/components/planner/MealCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FilterPills } from "@/components/ui/FilterPills";
import { Card } from "@/components/ui/Card";
import { getGuestWeeklyPlan, setGuestWeeklyPlan } from "@/lib/guest-storage";
import { CalendarIcon, SaveIcon, CheckCircleIcon, XCircleIcon, WalletIcon } from "@/components/icons";
import { MEAL_FOCUS_OPTIONS, type MealFocus } from "@/lib/constants";
import type { DayPlan, MealType, PlannedMeal } from "@/lib/weekly-planner";

type Status = "resuming" | "idle" | "loading" | "success" | "error";
type SaveStatus = "idle" | "saving" | "saved" | "error";

function updateSlot(
  days: DayPlan[],
  dayIndex: number,
  mealType: MealType,
  meal: PlannedMeal
): DayPlan[] {
  const next = [...days];
  const day = { ...next[dayIndex] };
  if (mealType === "Lunch") day.lunch = meal;
  else day.dinner = meal;
  next[dayIndex] = day;
  return next;
}

export default function WeeklyPlannerPage() {
  const { data: session, status: sessionStatus } = useSession();
  const [weeklyBudget, setWeeklyBudget] = useState("2000");
  const [familySize, setFamilySize] = useState("4");
  const [mealFocus, setMealFocus] = useState<MealFocus>("Any");
  const [days, setDays] = useState<DayPlan[] | null>(null);
  const [mealPlanId, setMealPlanId] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("resuming");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [replacingKey, setReplacingKey] = useState<string | null>(null);
  // Mobile-only day filter. The full week stays visible from `md` up: Save
  // posts the whole week at once, so hiding unsaved days behind a tab on a
  // large screen would risk losing edits the user can't see.
  const [visibleDay, setVisibleDay] = useState<string>("Mon");

  useEffect(() => {
    if (sessionStatus === "loading") return;

    let cancelled = false;
    async function resume() {
      try {
        if (session?.user) {
          const response = await fetch("/api/weekly-planner/current");
          const json = await response.json();
          if (json.success && json.data) {
            if (cancelled) return;
            setWeeklyBudget(String(json.data.weeklyBudget));
            setFamilySize(String(json.data.familySize));
            setDays(json.data.days);
            setMealPlanId(json.data.mealPlanId);
            setSaveStatus("saved");
            setStatus("success");
            return;
          }
        } else {
          const plan = getGuestWeeklyPlan();
          if (plan) {
            if (cancelled) return;
            setWeeklyBudget(String(plan.weeklyBudget));
            setFamilySize(String(plan.familySize));
            setDays(plan.days);
            setSaveStatus("saved");
            setStatus("success");
            return;
          }
        }
      } catch {
        // Fall through to idle — a failed background resume-check isn't an
        // actionable user error, the generate form is still right there.
      }
      if (!cancelled) setStatus("idle");
    }
    resume();
    return () => {
      cancelled = true;
    };
  }, [session, sessionStatus]);

  async function generate() {
    setStatus("loading");
    setMealPlanId(null);
    setSaveStatus("idle");
    try {
      const response = await fetch("/api/weekly-planner/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weeklyBudget: Number(weeklyBudget),
          familySize: Number(familySize),
          mealFocus,
        }),
      });
      const json = await response.json();
      if (!json.success) throw new Error(json.message);
      setDays(json.data.days);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function handleGenerateSubmit(event: FormEvent) {
    event.preventDefault();
    generate();
  }

  async function handleReplace(dayIndex: number, mealType: MealType) {
    if (!days) return;
    const key = `${dayIndex}-${mealType}`;
    setReplacingKey(key);
    try {
      const excludeRecipeIds = days.flatMap((day) => [day.lunch.recipeId, day.dinner.recipeId]);
      const response = await fetch("/api/weekly-planner/replace-meal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weeklyBudget: Number(weeklyBudget),
          familySize: Number(familySize),
          excludeRecipeIds,
          mealFocus,
        }),
      });
      const json = await response.json();
      if (!json.success) throw new Error(json.message);

      const targetDay = days[dayIndex];
      const updatedDays = updateSlot(days, dayIndex, mealType, json.data);
      setDays(updatedDays);

      // Already-saved plans persist the edit immediately (BR-WP-005).
      if (mealPlanId && session?.user) {
        await fetch(`/api/weekly-planner/${mealPlanId}/meals`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ day: targetDay.day, mealType, recipeId: json.data.recipeId }),
        });
      }
    } catch {
      // Keep the previous slot on failure (§12.12: only that Meal Card fails).
    } finally {
      setReplacingKey(null);
    }
  }

  async function handleSave() {
    if (!days) return;
    setSaveStatus("saving");
    try {
      if (session?.user) {
        const response = await fetch("/api/weekly-planner/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            weeklyBudget: Number(weeklyBudget),
            familySize: Number(familySize),
            days,
          }),
        });
        const json = await response.json();
        if (!json.success) throw new Error(json.message);
        setMealPlanId(json.data.mealPlanId);
      } else {
        setGuestWeeklyPlan({
          weeklyBudget: Number(weeklyBudget),
          familySize: Number(familySize),
          days,
        });
      }
      setSaveStatus("saved");
    } catch {
      setSaveStatus("error");
    }
  }

  return (
    <div className="space-y-6">
      <SectionHeading as="h1" title="Weekly Planner" />

      <form onSubmit={handleGenerateSubmit} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Input
          label="Weekly Budget (₱)"
          name="weeklyBudget"
          type="number"
          min={1}
          value={weeklyBudget}
          onChange={(event) => setWeeklyBudget(event.target.value)}
          required
        />
        <Input
          label="Family Size"
          name="familySize"
          type="number"
          min={1}
          max={20}
          value={familySize}
          onChange={(event) => setFamilySize(event.target.value)}
          required
        />
        <Select
          label="Meal Focus"
          name="mealFocus"
          options={MEAL_FOCUS_OPTIONS.map((option) => ({ label: option, value: option }))}
          value={mealFocus}
          onChange={(event) => setMealFocus(event.target.value as MealFocus)}
        />
        <div className="flex items-end">
          <Button type="submit" loading={status === "loading"}>
            Generate Meal Plan
          </Button>
        </div>
      </form>
      <p className="text-xs text-text-muted">
        Meal Focus is a rough category preference (meat/seafood/egg dishes vs. vegetable/noodle
        dishes) — not a nutrition or calorie calculation.
      </p>

      {status === "resuming" && <LoadingIndicator label="Loading your saved plan…" />}

      {status === "idle" && (
        <EmptyState icon={<CalendarIcon size={32} />} message="Generate a weekly meal plan to begin." />
      )}

      {status === "loading" && <LoadingIndicator label="Building your weekly plan…" />}

      {status === "error" && (
        <ErrorMessage message="We couldn't generate your weekly meal plan." onRetry={generate} />
      )}

      {status === "success" && days && (
        <div className="space-y-4">
          {(() => {
            const total = days.reduce(
              (sum, day) => sum + day.lunch.estimatedCost + day.dinner.estimatedCost,
              0
            );
            const budget = Number(weeklyBudget);
            const overBudget = budget > 0 && total > budget;
            return (
              <p
                className={`flex items-center gap-1.5 rounded-card px-3 py-2 text-sm font-semibold ${
                  overBudget ? "bg-danger/10 text-danger" : "bg-primary-tint text-primary"
                }`}
              >
                <WalletIcon size={16} />₱{total.toFixed(0)} of your ₱{budget.toFixed(0)} budget
                {overBudget && " — over budget"}
              </p>
            );
          })()}

          {/* Day pills are a mobile affordance only — see visibleDay above. */}
          <div className="md:hidden">
            <FilterPills
              items={days.map((day) => ({ value: day.day.slice(0, 3), label: day.day.slice(0, 3) }))}
              value={visibleDay}
              onChange={setVisibleDay}
              ariaLabel="Show a single day"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {days.map((day, dayIndex) => (
              <Card
                key={day.day}
                padded={false}
                className={`space-y-2 p-3 ${
                  day.day.slice(0, 3) === visibleDay ? "" : "hidden md:block"
                }`}
              >
                <p className="font-bold text-text">{day.day}</p>
                <MealCard
                  label="Lunch"
                  recipeId={day.lunch.recipeId}
                  name={day.lunch.name}
                  estimatedCost={day.lunch.estimatedCost}
                  imageUrl={day.lunch.imageUrl}
                  onReplace={() => handleReplace(dayIndex, "Lunch")}
                  replacing={replacingKey === `${dayIndex}-Lunch`}
                />
                <MealCard
                  label="Dinner"
                  recipeId={day.dinner.recipeId}
                  name={day.dinner.name}
                  estimatedCost={day.dinner.estimatedCost}
                  imageUrl={day.dinner.imageUrl}
                  onReplace={() => handleReplace(dayIndex, "Dinner")}
                  replacing={replacingKey === `${dayIndex}-Dinner`}
                />
              </Card>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button type="button" onClick={handleSave} loading={saveStatus === "saving"}>
              <SaveIcon size={16} />
              Save Meal Plan
            </Button>
            {saveStatus === "saved" && (
              <p className="flex items-center gap-1.5 text-sm font-semibold text-primary">
                <CheckCircleIcon size={16} />
                Meal plan saved.
              </p>
            )}
            {saveStatus === "error" && (
              <p className="flex items-center gap-1.5 text-sm text-danger">
                <XCircleIcon size={16} />
                Unable to save your meal plan.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
