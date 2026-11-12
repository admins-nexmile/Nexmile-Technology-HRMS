-- =====================================================================
-- ONE-TIME DATA FIX — NOT A MIGRATION
-- Set employee NX013's work_email to their new Workspace address.
-- =====================================================================
-- STATUS: NOT RUN. Run once, manually, after explicit approval and after
-- migration 2.3 (which verified audit_logs accepts this action).
--
-- BEFORE RUNNING: replace REPLACE_WITH_NEW_WORKSPACE_EMAIL below with
-- NX013's new @nexmiletechnology.com address. The script refuses to run
-- while the placeholder is still present. (The address supplied in
-- review arrived redacted as "<EMAIL>", so it is not filled in here.)
--
-- Changes exactly one row, and only if ALL of these hold:
--   * exactly one employee has code NX013;
--   * its work_email currently equals vasikarvasu@gmail.com
--     (case-insensitive);
--   * the new address is @nexmiletechnology.com and no other employee
--     already uses it.
-- Otherwise it raises an exception and nothing changes.
-- Writes an audit_logs row (old and new address).
--
-- Undo (only if needed, same guards in reverse): set work_email back to
-- 'vasikarvasu@gmail.com' for that employee id.
-- =====================================================================

begin;

do $$
declare
  v_new_email constant text := lower(trim('REPLACE_WITH_NEW_WORKSPACE_EMAIL'));
  v_old_email constant text := 'vasikarvasu@gmail.com';
  v_matches   integer;
  v_id        uuid;
  v_current   text;
begin
  if v_new_email !~ '^[^@\s]+@nexmiletechnology\.com$' then
    raise exception 'Data fix aborted: set a valid @nexmiletechnology.com address first (got %)', v_new_email;
  end if;

  select count(*) into v_matches
  from public.employees e
  where e.employee_code = 'NX013';
  if v_matches <> 1 then
    raise exception 'Data fix aborted: expected exactly 1 employee NX013, found %', v_matches;
  end if;

  select e.id, lower(trim(e.work_email)) into v_id, v_current
  from public.employees e
  where e.employee_code = 'NX013'
  for update;

  if v_current is distinct from v_old_email then
    raise exception 'Data fix aborted: NX013 work_email is not % (no change made)', v_old_email;
  end if;

  if exists (select 1 from public.employees
             where lower(trim(work_email)) = v_new_email and id <> v_id) then
    raise exception 'Data fix aborted: % is already used by another employee', v_new_email;
  end if;

  update public.employees set work_email = v_new_email where id = v_id;

  insert into public.audit_logs (action, entity_type, entity_id, details, actor_employee_id)
  values ('employee_work_email_fixed', 'employee', v_id,
          jsonb_build_object('employee_code', 'NX013', 'old', v_old_email,
                             'new', v_new_email, 'at', now(),
                             'reason', 'Option A: Workspace-only sign-in'),
          null);

  raise notice 'NX013 work_email updated to %', v_new_email;
end
$$;

commit;
