-- ============================================================================
--  PETITE MYGALE — mise à jour du contenu de départ (v2 : nom actuel, relations à avis datés)
--  À lancer APRÈS schema.sql, SEULEMENT si tu n'as encore rien modifié dans le dashboard
--  pour : Fiche & accueil, Nomenclature, Relations (ces trois rubriques sont remplacées).
-- ============================================================================
insert into public.mygale_contenus (cle, valeur) values ('fiche', $json${
 "clan": "Clan du Vent",
 "devise": "Un nom qui commence comme un défaut, et qui finit comme une promesse.",
 "portrait": "mygale-moonlight.webp",
 "accroche": "Apprentie du Clan du Vent, fille d'Éclat de Scarabée. Elle porte le poids d'un nom, et la promesse d'une rédemption que sa mère n'a pas eue.",
 "lignes": [
  {
   "label": "Rang",
   "valeur": "Apprentie"
  },
  {
   "label": "Âge",
   "valeur": "6 lunes"
  },
  {
   "label": "Sexe",
   "valeur": "Femelle"
  },
  {
   "label": "Orientation",
   "valeur": "Pansexuelle"
  }
 ],
 "pv": "10 / 10",
 "pa": "2 / 2",
 "pied": "Fiche de personnage de @.araxia. — Inspiré de @Oriyakii — Univers de La Guerre des Clans"
}$json$::jsonb)
on conflict (cle) do update set valeur = excluded.valeur;

insert into public.mygale_contenus (cle, valeur) values ('noms', $json$[
 {
  "etape": "Nom de Chaton",
  "nom": "Petite Mygale",
  "periode": "0 à 6 lunes",
  "citation": "Ce nom lui a été donné fugacement par sa mère, dans ses derniers instants, avant qu'elle ne s'en aille. Un nom étrange, au premier abord. Presque repoussant. La mygale n'est pas une créature qu'on admire, elle inquiète, elle dérange, elle fait un pas en arrière à ceux qui la croisent. Et pourtant. Elle est redoutable, précise, dangereuse bien au-delà de ce que sa taille laisse supposer. Ce nom, Éclat de Scarabée ne l'a pas choisi par tendresse immédiate, plutôt comme une vérité qu'elle avait vue, en deux lunes, dans les yeux de sa fille. Quelque chose qui ne se laisse pas apprivoiser facilement. Quelque chose qui morde, si on ne fait pas attention. Un nom qui commence comme un défaut, et qui finit comme une promesse."
 },
 {
  "etape": "Nom d'Apprenti",
  "nom": "Nuage de Mygale",
  "periode": "6 à 12 lunes",
  "actuel": true
 },
 {
  "etape": "Nom Adulte",
  "nom": "Le meneur va choisir",
  "periode": "12 à ... lunes",
  "note": "En fonction du choix du meneur."
 },
 {
  "etape": "Nom de Chef",
  "nom": "Étoile de Mygale",
  "periode": "... à ... lunes"
 },
 {
  "etape": "Nom d'Ancien",
  "nom": "Identique ou modifié",
  "periode": "... à ... lunes",
  "note": "Seulement si son nom change, sinon c'est le même qu'en tant que guerrière."
 }
]$json$::jsonb)
on conflict (cle) do update set valeur = excluded.valeur;

insert into public.mygale_contenus (cle, valeur) values ('relations', $json$[
 {
  "nom": "Étoile d'Ocre",
  "role": "Meneur (PNJ)",
  "clan": "Clan du Vent",
  "avis": [
   {
    "lune": 3,
    "affinite": 1,
    "respect": true,
    "texte": "Il garde un œil sur elle, car elle est l'enfant de l'ancienne guérisseuse, Éclat de Scarabée. Elle apprécie le meneur, elle aime bien lui poser des questions."
   }
  ]
 },
 {
  "nom": "Chant de Cigale",
  "role": "Guérisseuse / Cousine (PJ)",
  "clan": "Clan du Vent",
  "joueur": "@lavnd.13",
  "avis": [
   {
    "lune": 3,
    "affinite": 3,
    "texte": "Apprentie de sa mère et sa cousine éloignée, elle est très à l'aise avec la féline ! Elle aime énormément passer du temps avec elle, dans sa tanière."
   }
  ]
 },
 {
  "nom": "Prestesse de la Perdrix",
  "role": "Mère adoptive (PNJ)",
  "clan": "Clan du Vent",
  "avis": [
   {
    "lune": 3,
    "affinite": 1,
    "mitige": true,
    "texte": "Sa mère adoptive, elle l'apprécie bien qu'elle ait encore un peu de mal avec elle, après tout sa mère adoptive lui met énormément de pression sur ses épaules. Mais au fond, elle l'aime beaucoup."
   }
  ]
 }
]$json$::jsonb)
on conflict (cle) do update set valeur = excluded.valeur;
