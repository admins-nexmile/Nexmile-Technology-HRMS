"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "@/components/ui/button";

/** Form submit button that disables itself while its action is pending. */
export function SubmitButton({
  children,
  pendingLabel,
  ...rest
}: Omit<ButtonProps, "type"> & { children: ReactNode; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} aria-disabled={pending} {...rest}>
      {pending ? pendingLabel : children}
    </Button>
  );
}
