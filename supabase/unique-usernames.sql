-- À exécuter une fois sur une base déjà créée (SQL Editor > New query).
-- Sur un nouveau projet, inutile : schema.sql contient déjà les contrôles.
--
-- ATTENTION : SUPPRIME TOUS LES COMPTES (profils et progression compris),
-- puis rend le nom d'utilisateur unique, sans tenir compte des majuscules :
-- « Moses » et « moses » sont considérés comme le même nom.
--
-- Tout s'exécute dans une transaction : en cas d'erreur, rien n'est modifié.

begin;

-- 1. Suppression de tous les comptes. Les profils, la progression, les
--    identités et les sessions suivent grâce aux « on delete cascade ».
delete from auth.users;

-- 2. Unicité garantie par la base, même si deux inscriptions arrivent en même
--    temps. Recréé pour repartir d'un état propre.
drop index if exists public.profiles_username_unique;
create unique index profiles_username_unique
  on public.profiles (lower(username));

-- 3. Permet au formulaire d'inscription de vérifier un nom avant de créer le
--    compte. Ne renvoie qu'un booléen : aucune donnée de profil n'est exposée.
drop function if exists public.is_username_available(text);
create function public.is_username_available(name text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select not exists (
    select 1 from public.profiles
    where lower(username) = lower(btrim(name))
  );
$$;

revoke execute on function public.is_username_available(text) from public;
grant execute on function public.is_username_available(text) to anon, authenticated;

commit;

-- 4. Vérifications (à lancer après) : tout doit renvoyer 0 / true.
--
--   select count(*) from auth.users;
--   select count(*) from public.profiles;
--   select public.is_username_available('test');
