"use client";

import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { IngredientPicker } from "@/components/pantry/IngredientPicker";
import { ImagePicker } from "@/components/recipe-submit/ImagePicker";
import { IngredientLineRow, type IngredientLine } from "@/components/recipe-submit/IngredientLineRow";
import { RECIPE_CATEGORIES, MEAL_STYLES, DIFFICULTY_LEVELS } from "@/lib/constants";
import { CheckCircleIcon, XCircleIcon } from "@/components/icons";

type Status = "idle" | "submitting" | "success" | "error";

export default function SubmitRecipePage() {
  const { data: session, status: sessionStatus } = useSession();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(RECIPE_CATEGORIES[0]);
  const [mealStyle, setMealStyle] = useState(MEAL_STYLES[0]);
  const [difficulty, setDifficulty] = useState(DIFFICULTY_LEVELS[0]);
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [lines, setLines] = useState<IngredientLine[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (sessionStatus === "loading") {
    return <LoadingIndicator />;
  }

  if (!session?.user) {
    return (
      <div className="space-y-3 py-10 text-center">
        <p className="text-text-muted">Sign in to submit a recipe.</p>
        <ButtonLink href="/login">Sign In</ButtonLink>
      </div>
    );
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!imageUrl) {
      setStatus("error");
      setErrorMessage("Add a recipe photo before submitting.");
      return;
    }
    if (lines.length === 0) {
      setStatus("error");
      setErrorMessage("Add at least one ingredient.");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/recipes/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          category,
          mealStyle,
          difficulty,
          prepTime: Number(prepTime),
          cookTime: Number(cookTime),
          servings: Number(servings),
          instructions,
          imageUrl,
          ingredients: lines.map((line) => ({
            ingredientId: line.ingredientId,
            quantity: Number(line.quantity),
            unit: line.unit,
          })),
        }),
      });
      const json = await response.json();
      if (!json.success) throw new Error(json.message);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage((err as Error).message || "We couldn't submit your recipe.");
    }
  }

  if (status === "success") {
    return (
      <div className="space-y-3 py-10 text-center">
        <p className="flex items-center justify-center gap-1.5 text-lg font-semibold text-primary">
          <CheckCircleIcon size={20} />
          Thanks — your recipe is pending review.
        </p>
        <ButtonLink href="/recipes">Back to Recipes</ButtonLink>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-8">
      <h1 className="text-2xl font-bold text-text">Submit a Recipe</h1>

      <section className="space-y-4">
        <h2 className="font-semibold text-text">Basic Info</h2>
        <Input label="Recipe Name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
        <Textarea
          label="Description"
          name="description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="Category"
            name="category"
            options={RECIPE_CATEGORIES.map((item) => ({ label: item, value: item }))}
            value={category}
            onChange={(e) => setCategory(e.target.value as typeof category)}
          />
          <Select
            label="Meal Style"
            name="mealStyle"
            options={MEAL_STYLES.map((item) => ({ label: item, value: item }))}
            value={mealStyle}
            onChange={(e) => setMealStyle(e.target.value as typeof mealStyle)}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-text">Details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Prep Time (minutes)"
            name="prepTime"
            type="number"
            min={1}
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            required
          />
          <Input
            label="Cook Time (minutes)"
            name="cookTime"
            type="number"
            min={1}
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
            required
          />
          <Input
            label="Servings"
            name="servings"
            type="number"
            min={1}
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            required
          />
          <Select
            label="Difficulty"
            name="difficulty"
            options={DIFFICULTY_LEVELS.map((item) => ({ label: item, value: item }))}
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as typeof difficulty)}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-text">Photo</h2>
        <ImagePicker onUploaded={setImageUrl} />
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-text">Ingredients</h2>
        <IngredientPicker
          excludeIds={lines.map((line) => line.ingredientId)}
          onAdd={(ingredient) =>
            setLines((prev) => [
              ...prev,
              { ingredientId: ingredient.id, name: ingredient.name, quantity: "", unit: "g" },
            ])
          }
        />
        <div className="space-y-2">
          {lines.map((line) => (
            <IngredientLineRow
              key={line.ingredientId}
              line={line}
              onChange={(next) =>
                setLines((prev) =>
                  prev.map((existing) => (existing.ingredientId === next.ingredientId ? next : existing))
                )
              }
              onRemove={() =>
                setLines((prev) => prev.filter((existing) => existing.ingredientId !== line.ingredientId))
              }
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-text">Instructions</h2>
        <Textarea
          label="One step per line"
          name="instructions"
          rows={6}
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        />
      </section>

      {status === "error" && (
        <p className="flex items-center gap-1.5 text-sm text-danger">
          <XCircleIcon size={16} />
          {errorMessage}
        </p>
      )}

      <Button type="submit" loading={status === "submitting"}>
        Submit Recipe
      </Button>
    </form>
  );
}
