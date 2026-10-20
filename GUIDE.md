# Guide du site — Petite Mygale

## Mise en ligne (une seule fois)

1. **Supabase** → SQL Editor → New query → colle le contenu de `supabase/schema.sql` → Run.
   (Même projet que le site d'Étoile de Framboisier : la connexion Discord et la liste des admins sont déjà là.
   Les tables de ce site s'appellent `mygale_contenus` et le dossier d'images `mygale`.)
2. **Supabase** → Authentication → URL Configuration → *Redirect URLs* : ajoute
   `https://araxiaa.github.io/Mygale/admin.html` (et `http://localhost:5501/admin.html` pour tester en local).
3. **GitHub** → dépôt `Araxiaa/Mygale` → Settings → Pages → *Deploy from a branch* → `main` / `(root)`.

## Au quotidien

| Commande           | Effet                                                              |
|--------------------|--------------------------------------------------------------------|
| `npm start`        | Site en local : http://localhost:5501                              |
| `npm run deploy`   | Envoie le site sur GitHub (commit + push). `npm run deploy -- "mon message"` pour nommer la version |
| `npm run images`   | Convertit les images déposées dans `originaux/` en WebP légers (`assets/photos/`) |
| `npm run schema`   | Régénère `supabase/schema.sql` depuis `js/data/contenu.js`         |

Le site se met à jour 1 à 2 minutes après `npm run deploy`.
Les **textes** se modifient dans le dashboard : pas besoin de déployer.

## Le dashboard

Sur l'accueil, la **petite araignée** tout en bas à droite (presque invisible, elle s'éclaire au survol)
mène à `admin.html`. Connexion Discord, puis une rubrique par page : Fiche, Nomenclature, Personnalité,
Apparence, Histoire, Généalogie, Relations, Galerie. On ajoute, modifie, déplace, supprime ;
les images envoyées sont allégées automatiquement.

Le site lit la base en ligne. Si elle est injoignable, il retombe sur `js/data/contenu.js`
(sauvegarde et valeurs de départ). Une fois le dashboard utilisé, la base fait foi.

**Ajouter un administrateur** : Supabase → SQL Editor →
`insert into public.admins (discord_id, note) values ('IDENTIFIANT_DISCORD', 'Nom');`

## Où modifier quoi

| Je veux changer…                       | Fichier                                      |
|----------------------------------------|----------------------------------------------|
| Couleurs, polices                      | `css/site.css` (variables en haut)           |
| Formulaires du dashboard               | `js/admin.js` (liste `RUBRIQUES`)            |
| Affichage d'une page                   | `js/site.js` (une fonction par rubrique)     |
| Poussières dorées / araignée           | `js/ambiance.js`, `.fil` dans `css/site.css` |
| Texte de départ                        | `js/data/contenu.js` puis `npm run schema`   |

## Performances

Images en WebP (≈ 450 Ko au total contre 6,8 Mo en PNG), miniatures pour la galerie, chargement différé,
affichage immédiat depuis la dernière version mémorisée puis mise à jour en arrière-plan, aucune
bibliothèque sur le site public (Supabase n'est chargé que sur le dashboard). Le dossier `originaux/`
(PNG d'origine) reste sur ton ordinateur, il n'est pas envoyé sur GitHub.
