import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AuthActions } from "@/components/layout/AuthActions";
import { PersonIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Profile — Ma, Anong Ulam?",
};

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="space-y-6">
        <SectionHeading as="h1" title="Profile" />
        <EmptyState
          icon={<PersonIcon size={32} />}
          message="Sign in to see your profile."
          actionLabel="Sign In"
          actionHref="/login"
        />
      </div>
    );
  }

  const userId = session.user.id;
  const [favorites, pantryItems, submissions] = await Promise.all([
    prisma.favorite.count({ where: { userId } }),
    prisma.pantryItem.count({ where: { userId } }),
    prisma.recipe.count({ where: { submittedByUserId: userId } }),
  ]);

  const email = session.user.email ?? "";
  const stats = [
    { label: "Favorites", value: favorites },
    { label: "Pantry items", value: pantryItems },
    { label: "Recipes submitted", value: submissions },
  ];

  return (
    <div className="space-y-6">
      <SectionHeading as="h1" title="Profile" />

      <Card className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-pill bg-primary text-xl font-extrabold text-white"
        >
          {email.charAt(0).toUpperCase() || "?"}
        </span>
        <div className="min-w-0">
          <p className="truncate font-bold text-text">{email}</p>
          <p className="text-sm text-text-muted">Signed in</p>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="text-center">
            <p className="text-2xl font-extrabold text-primary">{stat.value}</p>
            <p className="mt-1 text-xs text-text-muted">{stat.label}</p>
          </Card>
        ))}
      </div>

      <Card className="space-y-3">
        <h2 className="font-bold text-text">Account</h2>
        <AuthActions />
      </Card>
    </div>
  );
}
