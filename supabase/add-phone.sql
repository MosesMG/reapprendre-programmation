-- À exécuter uniquement si schema.sql a déjà été lancé sans la colonne « phone ».
-- Sur un nouveau projet, schema.sql suffit.

alter table public.profiles
  add column if not exists phone text
  check (phone ~ '^\+[1-9][0-9]{7,14}$');

-- Seul le numéro est modifiable : le nom d'utilisateur reste protégé.
grant update (phone) on public.profiles to authenticated;

drop policy if exists "Chacun modifie son profil" on public.profiles;

create policy "Chacun modifie son profil"
  on public.profiles for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
