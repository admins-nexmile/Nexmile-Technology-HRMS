import "server-only";
import type { PostgrestError } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

/**
 * Server-side access to the invitation RPCs (migration 2.3). Every call
 * runs as the signed-in user; the database checks permissions itself.
 */

export type InvitationStatus = "pending" | "accepted" | "revoked" | "expired";

export type InvitationRow = {
  id: string;
  email: string;
  role_key: string;
  role_name: string;
  employee_id: string | null;
  employee_code: string | null;
  employee_name: string | null;
  status: InvitationStatus;
  invited_by_email: string | null;
  created_at: string;
  expires_at: string;
  accepted_at: string | null;
  revoked_at: string | null;
};

export type InvitableEmployee = {
  id: string;
  employee_code: string | null;
  full_name: string | null;
  work_email: string;
  status: string;
};

export type AcceptResult = "accepted" | "none" | "expired";

const GENERIC_ERROR = "Something went wrong. Please try again or contact an administrator.";

/**
 * Turns a database error into a message safe to show. Messages raised by
 * our own functions (P0001 / 42501 with a sentence) are shown; anything
 * else (constraint names, internal errors) becomes a generic message.
 */
export function toUserMessage(error: Pick<PostgrestError, "code" | "message"> | null): string {
  if (!error) return GENERIC_ERROR;
  const ownMessage =
    (error.code === "P0001" || error.code === "42501") &&
    !/^permission denied/i.test(error.message);
  return ownMessage ? error.message : GENERIC_ERROR;
}

/**
 * Set-returning RPCs come back as arrays. Generated database types are not
 * in use yet, so the row shape is asserted here (it mirrors the SQL
 * RETURNS TABLE definitions in migration 2.3).
 */
function asRows<T>(data: unknown): T[] {
  return Array.isArray(data) ? (data as T[]) : [];
}

export async function listInvitations(): Promise<InvitationRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("list_invitations");
  if (error) throw new Error(toUserMessage(error));
  return asRows<InvitationRow>(data);
}

export async function listInvitableEmployees(): Promise<InvitableEmployee[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("list_invitable_employees");
  if (error) throw new Error(toUserMessage(error));
  return asRows<InvitableEmployee>(data);
}

export async function acceptMyInvitation(): Promise<
  { ok: true; result: AcceptResult } | { ok: false; message: string }
> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("accept_my_invitation");
  if (error) return { ok: false, message: toUserMessage(error) };
  if (data === "accepted" || data === "none" || data === "expired") {
    return { ok: true, result: data };
  }
  return { ok: false, message: GENERIC_ERROR };
}
