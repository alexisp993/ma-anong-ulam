import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Settings — Ma, Anong Ulam?",
};

// Informational only. There are no user-configurable options in the MVP, so
// this page states what's true rather than showing toggles that do nothing.
export default async function SettingsPage() {
  const session = await auth();

  return (
    <div className="space-y-6">
      <SectionHeading as="h1" title="Settings" />

      <Card className="space-y-3">
        <h2 className="font-bold text-text">Account</h2>
        {session?.user ? (
          <p className="text-sm text-text-muted">
            Signed in as <span className="font-semibold text-text">{session.user.email}</span>. Your
            favorites, pantry, and meal plans sync to this account.
          </p>
        ) : (
          <>
            <p className="text-sm text-text-muted">
              You&apos;re browsing as a guest. Your favorites, pantry, and plans are saved in this
              browser only.
            </p>
            <div className="flex gap-2">
              <ButtonLink href="/login" variant="secondary" className="!px-4 !py-2 !text-sm">
                Sign In
              </ButtonLink>
              <ButtonLink href="/register" className="!px-4 !py-2 !text-sm">
                Create Account
              </ButtonLink>
            </div>
          </>
        )}
      </Card>

      <Card className="space-y-2">
        <h2 className="font-bold text-text">Preferences</h2>
        <p className="text-sm text-text-muted">
          Budget, family size, and meal focus are set each time you generate a plan, so there&apos;s
          nothing to configure here yet.
        </p>
      </Card>

      <Card className="space-y-2">
        <h2 className="font-bold text-text">About</h2>
        <p className="text-sm text-text-muted">
          Ma, Anong Ulam? helps Filipino families decide what to cook today — using your budget,
          what&apos;s already in your pantry, and how many people you&apos;re feeding.
        </p>
        <p className="text-sm text-text-muted">Version 1.0 (MVP)</p>
      </Card>
    </div>
  );
}
