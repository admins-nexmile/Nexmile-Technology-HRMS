import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { signOut } from "@/app/auth/actions";
import { AuthCard, AuthCardSkeleton } from "@/components/auth/auth-card";
import { SubmitButton } from "@/components/auth/submit-button";
import { loginErrorPath } from "@/lib/auth/errors";
import { getAccessState } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Access pending",
};

export default function AccessPendingPage() {
  return (
    <AuthCard title="Access pending" titleId="access-pending-title">
      <Suspense fallback={<AuthCardSkeleton />}>
        <PendingDetails />
      </Suspense>
    </AuthCard>
  );
}

async function PendingDetails() {
  const access = await getAccessState();
  if (access.status === "anonymous") redirect("/login");
  if (access.status === "rejected") redirect(loginErrorPath(access.reason));
  if (access.status === "active") redirect("/");

  return (
    <>
      <p className="mt-2 text-sm text-ink-muted">
        You are signed in as{" "}
        <span className="font-medium text-ink">{access.email}</span>.
      </p>
      <p className="mt-3 text-sm text-ink-subtle">
        Your account has not been granted access to the HRMS yet. An
        administrator will activate your account and assign your role.
        Please check back later.
      </p>
      <form action={signOut} className="mt-6">
        <SubmitButton className="w-full" pendingLabel="Signing out…">
          Sign out
        </SubmitButton>
      </form>
    </>
  );
}
