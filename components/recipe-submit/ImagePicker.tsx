"use client";

import { useState } from "react";
import Image from "next/image";
import { MAX_RECIPE_IMAGE_BYTES, ALLOWED_RECIPE_IMAGE_TYPES } from "@/lib/constants";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";

interface ImagePickerProps {
  onUploaded: (url: string) => void;
}

export function ImagePicker({ onUploaded }: ImagePickerProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_RECIPE_IMAGE_TYPES.includes(file.type as (typeof ALLOWED_RECIPE_IMAGE_TYPES)[number])) {
      setStatus("error");
      return;
    }
    if (file.size > MAX_RECIPE_IMAGE_BYTES) {
      setStatus("error");
      return;
    }

    setPreview(URL.createObjectURL(file));
    setStatus("uploading");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/recipes/submit/image", { method: "POST", body: formData });
      const json = await response.json();
      if (!json.success) throw new Error(json.message);
      onUploaded(json.data.url);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="space-y-2">
      <label htmlFor="recipeImage" className="block text-sm font-medium text-text">
        Recipe Photo
      </label>
      <input
        id="recipeImage"
        name="recipeImage"
        type="file"
        accept={ALLOWED_RECIPE_IMAGE_TYPES.join(",")}
        onChange={handleFileChange}
        className="block w-full text-sm text-text file:mr-3 file:rounded-card file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-dark"
      />
      {preview && (
        <div className="relative aspect-[4/3] w-full max-w-xs overflow-hidden rounded-card bg-border">
          <Image src={preview} alt="Recipe preview" fill className="object-cover" />
        </div>
      )}
      {status === "uploading" && <LoadingIndicator label="Uploading photo…" />}
      {status === "error" && (
        <p className="text-sm text-red-600">
          Couldn&apos;t upload that photo. Use a JPEG, PNG, or WebP under 5MB.
        </p>
      )}
    </div>
  );
}
