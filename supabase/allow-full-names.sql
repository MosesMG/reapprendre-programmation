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

-- L'unicité des noms est rétablie par unique-usernames.sql (à lancer ensuite).
