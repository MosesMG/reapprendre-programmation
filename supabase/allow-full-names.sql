-- À exécuter uniquement si schema.sql a déjà été lancé avec l'ancienne règle
-- sur le nom d'utilisateur. Sur un nouveau projet, schema.sql suffit.

alter table public.profiles
  drop constraint if exists profiles_username_check;

alter table public.profiles
  add constraint profiles_username_check check (
    username = btrim(username)
    and char_length(username) between 2 and 50
    and username !~ '[[:cntrl:]]'
  );

-- Deux personnes peuvent porter le même nom.
drop index if exists public.profiles_username_unique;
drop function if exists public.is_username_available(text);
