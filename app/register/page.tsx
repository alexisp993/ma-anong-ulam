"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { PersonIcon, XCircleIcon } from "@/components/icons";

export default function RegisterPage() {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (sessionStatus === "authenticated" && session?.user) {
      router.replace("/");
    }
  }, [sessionStatus, session, router]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();
      if (!json.success) {
        setError(json.message ?? "Unable to sign in. Please check your credentials and try again.");
        return;
      }

      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) {
        setError("Account created — please sign in.");
        router.push("/login");
        return;
      }
      router.push("/");
    } catch {
      setError("Unable to sign in. Please check your credentials and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm space-y-6 rounded-card border border-border bg-surface p-8 shadow-sm">
      <div className="space-y-2 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-pill bg-primary-tint text-primary">
          <PersonIcon size={24} />
        </div>
        <h1 className="text-2xl font-bold text-text">Register</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={8}
        />
        {error && (
          <p role="alert" className="flex items-center gap-1.5 text-sm text-danger">
            <XCircleIcon size={16} />
            {error}
          </p>
        )}
        <Button type="submit" loading={submitting} className="w-full">
          Register
        </Button>
      </form>

      <p className="text-center text-sm text-text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary">
          Sign In
        </Link>
      </p>
    </div>
  );
}
