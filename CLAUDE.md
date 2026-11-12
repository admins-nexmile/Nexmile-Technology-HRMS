
# Nexmile Technology HRMS — Project Instructions

## Project identity
- This is a standalone HRMS application for Nexmile Technology.
- The GitHub repository is Nexmile-Technology-HRMS.
- The local project folder is nexmile-hrms.
- The existing corporate website is a separate project. Never modify or connect to its repository.
- Use Next.js App Router, TypeScript, React and Tailwind CSS.

## Backend
- Use the existing hosted Supabase project: nexmile-hrms-dev.
- Supabase provides PostgreSQL, Authentication and Storage.
- Do not introduce Docker or a local database.
- Do not create another Supabase project without approval.
- Never use the Supabase CLI local stack.

## Database access by Claude
- Claude may apply migrations and run SQL itself on the hosted nexmile-hrms-dev project
  (ref bgjohvtojkrdssrledrv) through the project-scoped Supabase MCP server only
  (apply_migration for migrations, execute_sql for tests and checks). No other connection, no other project.
- Every migration: pre-flight checks, one transaction, a strict rollback file, and a
  rollback-only test script whose last query returns `ALL TESTS PASSED` (failures raise `FAIL: ...`).
  Self-review for privilege escalation and RLS bypass before applying. Run the test immediately after applying.
- All writes go through app_private SECURITY DEFINER functions (empty search_path, audited to audit_logs)
  with public SECURITY INVOKER wrappers granted to authenticated only; revoke from public and anon explicitly.
  No direct client write policies.
- Salary and payroll are visible only to super_admin and payroll_admin, plus each employee's own payslips
  from APPROVED or PAID runs that are not test data.
- Before anything destructive (dropping a column, deleting data), export every row of the affected tables
  to database/backups/<timestamp>_<table>.json (git-ignored) and confirm row counts.
- On any error or `FAIL:`, stop. Do not patch the database by hand or run a rollback automatically;
  report the exact error and the current database state, and wait for the user.
- Never push to or merge into main; never force-push.

## Installed agent skills
- `.claude/skills/supabase` and `.claude/skills/supabase-postgres-best-practices` are installed.
- Where these skills conflict with this CLAUDE.md (for example, local stacks, Docker, middleware.ts,
  quick-start code), CLAUDE.md wins.

## Security — mandatory
- Never disable Row Level Security (RLS).
- All public tables have RLS enabled. Policies are added only through reviewed, tested migrations.
- Do not expose employee, attendance, leave, payroll or document data through the browser until appropriate RLS policies and authorization checks are designed and tested.
- Never put a Supabase service-role or secret key in client-side code.
- Never commit .env.local or credentials.
- Do not create public document or payslip storage buckets.
- Never allow users to assign themselves privileged roles.
- Use invitation-based account creation and server-verified permissions.
- Do not invent security policies or bypass authorization to make a screen work.

## Existing database
The existing Supabase database contains:
company_settings, departments, employees, leave_types, holidays,
attendance, leave_requests, payroll_runs, payroll_items,
announcements, training_courses, training_enrollments,
employee_documents and audit_logs.

The current employee and payroll records are synthetic demonstration data.
They are not real employee records or valid payroll calculations.

## Development rules
- Work only inside this repository.
- Prefer small, reviewable changes.
- Use TypeScript types and validation.
- Keep components reusable and accessible.
- Never silently delete existing files or database records.
- Destructive SQL requires the backup procedure in "Database access by Claude"; explain its impact in the slice report.
- Do not automatically run npm audit fix.
- Explain any new package before installing it.
- Run lint and build checks after significant changes.

## Development phases
1. Establish the application shell and HRMS design system.
2. Design authentication, profiles, roles and invitation workflow.
3. Design and test RLS policies before enabling data access.
4. Build employee management and employee self-service.
5. Build attendance, leave and holiday modules.
6. Build payroll workflows with verified Indian statutory rules.
7. Add documents, announcements, training and reporting.
8. Review security, backups and production deployment.

Do not skip security design to accelerate development.
Do not describe synthetic payroll calculations as production-ready.
