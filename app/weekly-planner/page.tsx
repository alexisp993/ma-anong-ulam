"use client";

import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { MealCard } from "@/components/planner/MealCard";
import { setGuestWeeklyPlan, setLastMealPlanId } from "@/lib/guest-storage";
import { CalendarIcon, SaveIcon, CheckCircleIcon, XCircleIcon } from "@/components/icons";
import type { DayPlan, MealType, PlannedMeal } from "@/lib/weekly-planner";

type Status = "idle" | "loading" | "success" | "error";
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
  const { data: session } = useSession();
  const [weeklyBudget, setWeeklyBudget] = useState("2000");
  const [familySize, setFamilySize] = useState("4");
  const [days, setDays] = useState<DayPlan[] | null>(null);
  const [mealPlanId, setMealPlanId] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [replacingKey, setReplacingKey] = useState<string | null>(null);

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
        setLastMealPlanId(json.data.mealPlanId);
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
      <h1 className="text-2xl font-bold text-text">Weekly Planner</h1>

      <form onSubmit={handleGenerateSubmit} className="grid gap-4 sm:grid-cols-3">
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
        <div className="flex items-end">
          <Button type="submit" loading={status === "loading"}>
            Generate Meal Plan
          </Button>
        </div>
      </form>

      {status === "idle" && (
        <EmptyState icon={<CalendarIcon size={32} />} message="Generate a weekly meal plan to begin." />
      )}

      {status === "loading" && <LoadingIndicator label="Building your weekly plan…" />}

      {status === "error" && (
        <ErrorMessage message="We couldn't generate your weekly meal plan." onRetry={generate} />
      )}

      {status === "success" && days && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {days.map((day, dayIndex) => (
              <div
                key={day.day}
                className="space-y-2 rounded-card border border-border bg-surface p-3 shadow-sm"
              >
                <p className="font-semibold text-text">{day.day}</p>
                <MealCard
                  label="Lunch"
                  recipeId={day.lunch.recipeId}
                  name={day.lunch.name}
                  estimatedCost={day.lunch.estimatedCost}
                  onReplace={() => handleReplace(dayIndex, "Lunch")}
                  replacing={replacingKey === `${dayIndex}-Lunch`}
                />
                <MealCard
                  label="Dinner"
                  recipeId={day.dinner.recipeId}
                  name={day.dinner.name}
                  estimatedCost={day.dinner.estimatedCost}
                  onReplace={() => handleReplace(dayIndex, "Dinner")}
                  replacing={replacingKey === `${dayIndex}-Dinner`}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button type="button" onClick={handleSave} loading={saveStatus === "saving"}>
              <SaveIcon size={16} />
              Save Meal Plan
            </Button>
            {saveStatus === "saved" && (
              <p className="flex items-center gap-1.5 text-sm text-accent-dark">
                <CheckCircleIcon size={16} />
                Meal plan saved.
              </p>
            )}
            {saveStatus === "error" && (
              <p className="flex items-center gap-1.5 text-sm text-red-600">
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
