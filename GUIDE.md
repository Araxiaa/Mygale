# Guide du site — Petite Mygale

## Mise en ligne (une seule fois)

1. **Supabase** → SQL Editor → New query → colle le contenu de `supabase/schema.sql` → Run.
   Si tu l'avais déjà lancé avant la v2 du site (nom actuel, fils RP, santé, relations à avis datés),
   relance-le (sans risque), puis lance aussi `supabase/mise-a-jour-v2.sql` : il remplace *Fiche & accueil*,
   *Nomenclature* et *Relations* par la nouvelle version (à ne faire que si tu ne les as pas encore modifiées).
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
mène à `admin.html`. Connexion Discord, puis une rubrique par page : Fiche & accueil, Nomenclature,
Personnalité, Apparence, Histoire, Généalogie, Relations, Fils RP, Santé, Galerie.
On ajoute, modifie, déplace, supprime ; les images envoyées sont allégées automatiquement.

- **Nom actuel** : Nomenclature → ouvre un nom → bouton « Définir comme nom actuel ». Il devient le nom affiché
  partout (titre, accueil, onglet du navigateur) ; les noms d'avant sont grisés, ceux d'après en pointillés.
- **Fils RP** : titre, nombre de lunes, « en cours » (à décocher à la fin), lien Discord, participants, description.
- **Santé** : blessures et maladies (type, gravité, lune du début et de guérison, soins, séquelles).
- **Relations** : une fiche par chat (clan / groupe, rang) et une liste d'**avis datés**. Pour faire évoluer une
  relation : ouvre le chat → « Ajouter un avis » avec la lune et les cœurs du moment. Le site en tire la courbe
  d'évolution, les flèches ▲▼ et « Derniers changements ».

## Rendre les textes plus vivants

Dans le dashboard, chaque zone de texte a une barre **Gras · Italique · Surligné · Murmure** (ou tape directement
`**gras**`, `*italique*`, `==surligné==`, `{{murmure}}`) avec un aperçu en direct.
Dans les listes « Description globale », « Texte » des chapitres, etc., chaque bloc a un **type** :
Paragraphe · Intertitre · Citation mise en valeur · Encart « À retenir » · Image (avec légende) · Séparateur ✦.
Alterner les types aère un long texte. Pages enrichies :
- **Personnalité** : citation d'ouverture, mots-clés, jauges (profil sur 5, qui se remplissent à l'apparition).
- **Physique** : « en un coup d'œil » et **palette du pelage** (goutte de couleur + code).
- **Parcours** (Histoire) : frise de sa vie **assemblée toute seule** à partir des chapitres, noms portés, fils RP,
  santé et relations (rien à saisir de plus ; il suffit de renseigner les lunes).
- **Relations** : bouton **Toile** (le réseau en toile d'araignée : plus un chat est proche d'elle, plus le lien est fort).
- **Galerie** : flèches ← → du clavier et boutons dans l'agrandissement.

Le bouton ☾/☀ de l'en-tête bascule entre le thème **Nuit** et le thème **Aube** (clair) ; le choix est mémorisé.
Les apparitions au défilement, la barre de progression de lecture et le bouton « remonter » se coupent tout seuls
si l'appareil demande moins d'animations.
Les champs ajoutés plus tard (mots-clés, jauges, palette…) apparaissent sur le site avec leurs valeurs de départ
sans rien relancer dans Supabase ; une fois enregistrés dans le dashboard, ils sont modifiables à volonté.

## Navigation du site

Barre du haut (en bas sur téléphone) : Accueil · Elle (noms, caractère, physique, santé) · Histoire (chroniques,
fils RP) · Entourage (lignée, relations) · Galerie. Chaque page finit par « Précédent / Suivant ».
Adresses directes : `#elle/sante`, `#histoire/fils`, `#entourage/relations`…

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
