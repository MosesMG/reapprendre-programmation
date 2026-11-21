-- À exécuter une fois dans Supabase : SQL Editor > New query.

-- Profils ------------------------------------------------------------------

create table public.profiles (
  user_id uuid primary key references auth.users on delete cascade,
  username text not null check (
    username = btrim(username)
    and char_length(username) between 2 and 50
    and username !~ '[[:cntrl:]]'
  ),
  phone text check (phone ~ '^\+[1-9][0-9]{7,14}$'),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;
-- Seul le numéro est modifiable : le nom d'utilisateur reste protégé.
grant update (phone) on public.profiles to authenticated;

create policy "Chacun lit son profil"
  on public.profiles for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Chacun modifie son profil"
  on public.profiles for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- Le profil est créé en même temps que le compte. Une erreur ici (nom
-- invalide) annule aussi la création du compte.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (user_id, username)
  values (new.id, new.raw_user_meta_data ->> 'username');
  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Progression --------------------------------------------------------------

create table public.task_progress (
  user_id uuid not null references auth.users on delete cascade,
  task_id text not null check (task_id ~ '^[a-z0-9-]{1,64}$'),
  completed_at timestamptz not null default now(),
  primary key (user_id, task_id)
);

alter table public.task_progress enable row level security;
revoke all on public.task_progress from anon, authenticated;
grant select, insert, delete on public.task_progress to authenticated;

create policy "Chacun gère sa progression"
  on public.task_progress for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- Suppression de compte ----------------------------------------------------

-- Supprime uniquement le compte de l'appelant ; le profil et la progression
-- suivent grâce aux « on delete cascade ».
create function public.delete_own_account()
returns void
language sql
security definer
set search_path = ''
as $$
  delete from auth.users where id = auth.uid();
$$;

revoke execute on function public.delete_own_account() from public, anon;
grant execute on function public.delete_own_account() to authenticated;

-- Mot de passe oublié (à exécuter à la main, après avoir vérifié l'identité
-- de la personne). Remplacer l'adresse et le mot de passe :
--
--   update auth.users
--   set encrypted_password = extensions.crypt('nouveau-mot-de-passe', extensions.gen_salt('bf'))
--   where email = 'personne@exemple.com';
