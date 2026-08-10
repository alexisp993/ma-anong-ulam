import { ButtonLink } from "@/components/ui/ButtonLink";
import { ChevronRightIcon } from "@/components/icons";

// The reference design puts an illustrated kitchen scene here. No such asset
// exists in the project, so the panel carries the composition with a warm
// gradient instead of a placeholder image.
export function HeroBanner() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary-tint via-surface-muted to-secondary/40 p-5 sm:p-8"
    >
      <div className="max-w-md rounded-card bg-surface/95 p-5 shadow-sm">
        <p className="text-sm font-semibold text-primary">Kitchen ideas for you</p>
        <h2 id="hero-title" className="mt-1 text-xl font-extrabold leading-snug text-text">
          Simple ingredients, delicious ulam!
        </h2>
        <p className="mt-2 text-sm text-text-muted">
          Tell us what you have, and we&apos;ll suggest recipes you can cook.
        </p>
        <ButtonLink href="/kahit-ano" className="mt-4 !px-4 !py-2 !text-sm">
          Try &ldquo;Kahit Ano&rdquo;
          <ChevronRightIcon size={16} />
        </ButtonLink>
      </div>
    </section>
  );
}
