// Génère supabase/schema.sql à partir de js/data/contenu.js  (npm run schema)
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const racine = path.join(__dirname, '..');
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(racine, 'js', 'data', 'contenu.js'), 'utf8'), ctx);
const DEFAUT = ctx.window.DEFAUT;

const entete = `-- ============================================================================
--  PETITE MYGALE — base de données
--  À coller UNE FOIS dans Supabase → SQL Editor → New query → Run.
--  Peut être relancé sans danger : ne remplace pas les contenus déjà modifiés.
--  Utilise le même projet que le site d'Étoile de Framboisier : tables préfixées
--  « mygale_ », et la même liste d'administrateurs (table admins + connexion Discord).
-- ============================================================================

-- ---------- Qui est administrateur ? (identifiants Discord) ----------
create table if not exists public.admins (
    discord_id text primary key,
    note       text
);
alter table public.admins enable row level security;
insert into public.admins (discord_id, note)
values ('626101487185166347', 'Propriétaire du site')
on conflict do nothing;

create or replace function public.est_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
    select exists (
        select 1
        from auth.identities i
        join public.admins a on a.discord_id = i.provider_id
        where i.user_id = auth.uid() and i.provider = 'discord'
    );
$$;
revoke all on function public.est_admin() from public, anon;
grant execute on function public.est_admin() to authenticated;

-- ---------- Les contenus du site ----------
create table if not exists public.mygale_contenus (
    cle     text primary key,
    valeur  jsonb not null,
    maj     timestamptz not null default now()
);
alter table public.mygale_contenus enable row level security;

drop policy if exists "mygale lecture publique"  on public.mygale_contenus;
drop policy if exists "mygale ecriture admin"    on public.mygale_contenus;
drop policy if exists "mygale modif admin"       on public.mygale_contenus;
drop policy if exists "mygale suppression admin" on public.mygale_contenus;

create policy "mygale lecture publique"  on public.mygale_contenus for select using (true);
create policy "mygale ecriture admin"    on public.mygale_contenus for insert to authenticated with check (public.est_admin());
create policy "mygale modif admin"       on public.mygale_contenus for update to authenticated using (public.est_admin()) with check (public.est_admin());
create policy "mygale suppression admin" on public.mygale_contenus for delete to authenticated using (public.est_admin());

create or replace function public.mygale_touch_maj() returns trigger
language plpgsql set search_path = '' as $$
begin new.maj = now(); return new; end $$;
drop trigger if exists mygale_contenus_maj on public.mygale_contenus;
create trigger mygale_contenus_maj before update on public.mygale_contenus
    for each row execute function public.mygale_touch_maj();

-- ---------- Les images envoyées depuis le dashboard ----------
insert into storage.buckets (id, name, public)
values ('mygale', 'mygale', true)
on conflict (id) do nothing;

drop policy if exists "mygale envoi admin" on storage.objects;
drop policy if exists "mygale modif admin" on storage.objects;
drop policy if exists "mygale suppr admin" on storage.objects;
create policy "mygale envoi admin" on storage.objects for insert to authenticated
    with check (bucket_id = 'mygale' and public.est_admin());
create policy "mygale modif admin" on storage.objects for update to authenticated
    using (bucket_id = 'mygale' and public.est_admin());
create policy "mygale suppr admin" on storage.objects for delete to authenticated
    using (bucket_id = 'mygale' and public.est_admin());

-- ---------- Contenu de départ (repris de js/data/contenu.js) ----------
`;

const graines = Object.keys(DEFAUT).map((cle) =>
    `insert into public.mygale_contenus (cle, valeur) values ('${cle}', $json$${JSON.stringify(DEFAUT[cle], null, 1)}$json$::jsonb)\non conflict (cle) do nothing;\n`
).join('\n');

fs.mkdirSync(path.join(racine, 'supabase'), { recursive: true });
fs.writeFileSync(path.join(racine, 'supabase', 'schema.sql'), entete + graines);
console.log('supabase/schema.sql généré (' + Object.keys(DEFAUT).length + ' rubriques).');
