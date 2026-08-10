import { LeafIcon } from "@/components/icons";

// Static encouragement copy — no data behind it, so the tip is chosen by
// day-of-week on the server and passed down (see app/layout.tsx) rather than
// computed in this client-rendered subtree, which would hydrate-mismatch.
const TIPS = [
  "Plan your meals ahead for a stress-free week!",
  "Check your pantry before shopping to avoid doubles.",
  "Cook once, eat twice — leftovers make great baon.",
  "Buy gulay in season; it's cheaper and fresher.",
  "Marinate tonight's ulam in the morning for deeper flavor.",
  "Reuse one ingredient across two meals to cut costs.",
  "A simple ulam beats a complicated one you won't cook.",
];

export function tipForDay(dayIndex: number): string {
  return TIPS[dayIndex % TIPS.length];
}

export function TipOfTheDayCard({ tip }: { tip: string }) {
  return (
    <div className="rounded-card bg-primary-tint p-3.5">
      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-primary">
        <LeafIcon size={14} />
        Tip of the day
      </p>
      <p className="mt-1.5 text-sm leading-snug text-text">{tip}</p>
    </div>
  );
}
