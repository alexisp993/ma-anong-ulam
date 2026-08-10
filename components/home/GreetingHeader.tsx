"use client";

import { useEffect, useState } from "react";
import { SunIcon } from "@/components/icons";

function greetingFor(hour: number): string {
  if (hour < 12) return "Good morning!";
  if (hour < 18) return "Good afternoon!";
  return "Good evening!";
}

// The time-of-day word depends on the visitor's clock, not the server's, so
// it's filled in after mount. Rendering it during SSR would either bake in
// the deploy region's hour or trip a hydration mismatch.
export function GreetingHeader() {
  const [greeting, setGreeting] = useState<string | null>(null);

  useEffect(() => {
    setGreeting(greetingFor(new Date().getHours()));
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="text-xl font-extrabold text-text">Hello! 👋</p>
        <h1 className="mt-0.5 text-lg text-text-muted">What shall we cook today?</h1>
      </div>
      <p
        className="flex items-center gap-1.5 rounded-pill bg-secondary/25 px-3 py-1.5 text-sm font-semibold text-text"
        // Reserve the row even before the clock is read, so the header
        // doesn't jump on hydration.
        style={{ minWidth: "9.5rem", justifyContent: "center" }}
      >
        <SunIcon size={16} />
        {greeting ?? "Welcome back!"}
      </p>
    </div>
  );
}
