/* ==========================================================================
   CONTENU DE DÉPART — sert de valeurs initiales et de sauvegarde si la base
   Supabase est injoignable. Une fois le dashboard en service, la base fait foi.
   Clés = rubriques du dashboard (table « mygale_contenus »).
   ========================================================================== */
window.DEFAUT = {

    fiche: {
        clan: 'Clan du Vent',
        devise: 'Un nom qui commence comme un défaut, et qui finit comme une promesse.',
        portrait: 'mygale-moonlight.webp',
        accroche: 'Apprentie du Clan du Vent, fille d\'Éclat de Scarabée. Elle porte le poids d\'un nom, et la promesse d\'une rédemption que sa mère n\'a pas eue.',
        lignes: [
            { label: 'Rang', valeur: 'Apprentie' },
            { label: 'Âge', valeur: '6 lunes' },
            { label: 'Sexe', valeur: 'Femelle' },
            { label: 'Orientation', valeur: 'Pansexuelle' }
        ],
        pv: '10 / 10',
        pa: '2 / 2',
        pied: 'Fiche de personnage de @.araxia. — Inspiré de @Oriyakii — Univers de La Guerre des Clans'
    },

    noms: [
        { etape: 'Nom de Chaton', nom: 'Petite Mygale', periode: '0 à 6 lunes', citation: 'Ce nom lui a été donné fugacement par sa mère, dans ses derniers instants, avant qu\'elle ne s\'en aille. Un nom étrange, au premier abord. Presque repoussant. La mygale n\'est pas une créature qu\'on admire, elle inquiète, elle dérange, elle fait un pas en arrière à ceux qui la croisent. Et pourtant. Elle est redoutable, précise, dangereuse bien au-delà de ce que sa taille laisse supposer. Ce nom, Éclat de Scarabée ne l\'a pas choisi par tendresse immédiate, plutôt comme une vérité qu\'elle avait vue, en deux lunes, dans les yeux de sa fille. Quelque chose qui ne se laisse pas apprivoiser facilement. Quelque chose qui morde, si on ne fait pas attention. Un nom qui commence comme un défaut, et qui finit comme une promesse.' },
        { etape: 'Nom d\'Apprenti', nom: 'Nuage de Mygale', periode: '6 à 12 lunes', actuel: true },
        { etape: 'Nom Adulte', nom: 'Le meneur va choisir', periode: '12 à ... lunes', note: 'En fonction du choix du meneur.' },
        { etape: 'Nom de Chef', nom: 'Étoile de Mygale', periode: '... à ... lunes' },
        { etape: 'Nom d\'Ancien', nom: 'Identique ou modifié', periode: '... à ... lunes', note: 'Seulement si son nom change, sinon c\'est le même qu\'en tant que guerrière.' }
    ],

    personnalite: {
        paragraphes: [
            { texte: '<b>Petite Mygale est une contradiction vivante.</b> Elle veut aller vers les autres, apprendre d\'eux, les comprendre, et pourtant, elle maintient toujours ce petit pas en arrière, cette distance imperceptible que peu arrivent à franchir. C\'est peut-être ce qui la définit le mieux : une féline qui aspire à la connexion, mais qui a appris, très tôt, que les choses qu\'on aime finissent toujours par disparaître.' },
            { texte: 'Curieuse, parfois indiscrète, elle compense à sa façon le silence que sa mère a laissé derrière elle. Chaque réponse qu\'on lui donne, chaque histoire qu\'on accepte de lui raconter, est une petite pierre qu\'elle pose pour reconstruire ce qu\'elle n\'a jamais eu. Elle apprécie qu\'on lui réponde, même aux questions les plus naïves, surtout celles-là. Et sans le chercher, elle attire les regards. Quelque chose en elle retient l\'œil, fascine, sans qu\'elle fasse le moindre effort. Un port naturel, une façon d\'exister dans un espace. Elle s\'en accommode, même si ça la met mal à l\'aise.' },
            { texte: 'Mais derrière ce charisme discret se cache une féline qui ne se livre pas facilement. Méfiante, profondément convaincue que la loyauté se mérite plutôt qu\'elle ne se donne, elle observe bien plus qu\'elle ne parle. Ce qu\'elle traverse, elle préfère le porter seule, et quand quelque chose ne va pas, elle se referme, disparaît dans son propre silence. Partager, pour elle, ressemble encore trop à une faiblesse.' },
            { texte: 'Ce qui ne l\'empêche pas d\'être traversée, malgré elle, par des émotions qui la débordent avant même qu\'elle ait eu le temps de les contenir. C\'est ce qu\'elle déteste le plus chez elle. Cette incapacité à rester de marbre, à garder la face en toutes circonstances. Elle essaie, pourtant. Elle essaie toujours.' },
            { texte: 'Et quand elle décide quelque chose, rien ni personne ne la fera dévier. Têtue jusqu\'à l\'os, capable d\'aller jusqu\'au bout de ses idées qu\'importe les obstacles, c\'est à la fois ce qui la fait avancer, et ce qui, parfois, la perd.' },
            { texte: 'Au fond, Petite Mygale est une survivante. Pas par choix, pas par fierté, juste parce que c\'est ce qu\'on lui a appris, dans un clan qui a lui-même appris à vivre avec rien. Elle ne s\'effondre pas. Ou du moins, pas devant les autres. Et peu importe ce que la vie met en travers de son chemin, elle trouve toujours un moyen de s\'en sortir. Même quand ce moyen n\'est pas beau à voir.' }
        ],
        qualites: [
            { nom: 'Curieuse', texte: 'N\'ayant pas de mère pour lui raconter des histoires, répondre à ses questions, combler les silences... C\'est sa façon à elle de reconstruire ce qu\'elle n\'a jamais eu.' },
            { nom: 'Charismatique', texte: 'Sans le chercher, elle attire les regards. On est facilement attiré par la jeune féline, quelque chose en elle retient l\'œil sans le moindre effort.' },
            { nom: 'Résiliente', texte: 'Ayant grandi dans un clan qui a appris à survivre avec rien, elle a développé une résilience à toute épreuve. Elle ne s\'effondre pas.' },
            { nom: 'Aimante', texte: 'Quand Petite Mygale aime quelqu\'un, elle aime vraiment. Profondément, intensément, avec une sincérité qui peut surprendre. C\'est une connexion unique.' }
        ],
        defauts: [
            { nom: 'Têtue', texte: 'Quand elle a une idée en tête, elle ne l\'a pas ailleurs. Rien ne la fera plier, rien ne la fera dévier. Elle ira jusqu\'au bout, qu\'importe les obstacles.' },
            { nom: 'Méfiante', texte: 'La loyauté se mérite. Elle ne se donne pas. Elle se montre très méfiante envers les autres, et encore plus envers ceux qui ne viennent pas de son clan.' },
            { nom: 'Émotive', texte: 'Ses émotions la submergent bien plus vite qu\'elle ne le voudrait, la débordent avant même qu\'elle ait eu le temps de les contenir. Elle déteste ça.' },
            { nom: 'Repliée sur elle-même', texte: 'Quand quelque chose ne va pas, elle se referme, disparaît un peu dans ses propres pensées, son propre silence. Elle préfère porter ses fardeaux seule.' }
        ],
        aime: [
            { nom: 'Grands Espaces', texte: 'Elle adore les espaces ouverts, les grandes étendues d\'herbe et de vent pour courir sans limites.' },
            { nom: 'Les Histoires', texte: 'Elle aime qu\'on lui raconte des histoires pour apprendre du vécu et des erreurs des autres.' },
            { nom: 'Proies', texte: 'Elle a un faible pour le lapin. C\'est simple, c\'est instinctif.' }
        ],
        aimepas: [
            { nom: 'Ombre d\'un Fantôme', texte: 'Elle ne supporte pas qu\'on la compare à sa mère. Elle est elle. Rien d\'autre.' },
            { nom: 'Sous-Estimée', texte: 'Elle ne supporte pas qu\'on l\'ignore, ni qu\'on la regarde de haut pour son statut de survivante unique.' },
            { nom: 'Proies', texte: 'Le poisson. Catégoriquement. Sans appel.' }
        ],
        gouts_note: 'Ses goûts et ses dégoûts évolueront avec le temps et les épreuves.',
        peurs: [
            { texte: 'Elle a peur de ne jamais exister vraiment pour elle-même. Peur de n\'être qu\'un reflet ou une continuation d\'Éclat de Scarabée aux yeux du clan.' },
            { texte: 'Elle est terrifiée par les espaces clos et les tunnels sombres. Mais elle doute : est-ce sa vraie peur, ou l\'écho de la phobie de sa mère qu\'on lui a trop racontée ?' }
        ],
        habitudes: [
            { nom: 'Le Parler Chantant', texte: 'Stressée, ses syllabes s\'allongent et se font presque chantées. Un écho immédiat à Éclat de Scarabée.' },
            { nom: 'La Démarche Flottante', texte: 'Elle a hérité de l\'élégance naturelle et flottante de sa mère, posant ses pattes comme si le sol était délicat.' },
            { nom: 'La Fleur Rituelle', texte: 'Elle glisse parfois des fleurs dans son pelage lors des événements, provoquant une vive nostalgie chez Harmonie des Prés.' }
        ]
    },

    apparence: {
        paragraphes: [
            { texte: 'Petite Mygale a un corps qu\'on qualifierait de <b>longiligne, fin, souple, léger</b>. Pourtant, si on regarde de plus près, ce n\'est pas toute l\'histoire. On distingue des muscles, discrets mais présents, notamment sur le poitrail et les pattes. Elle n\'est pas purement longiligne, après tout, elle a hérité de ses deux parents. Elle possède une longue queue, fine et souple, qu\'elle aime laisser balancer derrière elle avec une nonchalance toute naturelle.' },
            { texte: '<b>Son pelage est une beauté à part entière.</b> D\'un bleu chaud, presque fumé, avec des sous-tons sablés qui le réchauffent et le rendent absolument unique. Elle a hérité du ticking de sa mère, ce patron qui la rend si semblable à Lueur du Méloé que ceux qui l\'ont connue s\'y perdent parfois, le temps d\'un regard. Deux détails la distinguent pourtant : le bout de sa queue est blanc, et une petite tache de même couleur orne son poitrail, un héritage discret de son père, posé là comme une signature. Son poil, légèrement plus dense que celui de sa mère, lui offre une maigre protection contre le froid. Maigre, mais présente.' },
            { texte: 'Ce qui la rend vraiment singulière, c\'est la forme de son museau, long, épais, bien différent de ce qu\'on voit habituellement. Associé à ses oreilles, larges et écartées, perchées haut sur sa tête, elle a quelque chose d\'atypique dans le visage. Quelque chose qui retient l\'œil.' },
            { texte: 'Ses yeux sont en amande, joliment soulignés par de longs cils gris foncés. Leur couleur, <b>un ambre chaud</b>, contraste avec le bleu fumé de son pelage d\'une façon qui ne laisse pas indifférent.' },
            { texte: 'En termes de taille, elle sera plutôt dans la moyenne une fois adulte. Elle figurera sans doute parmi les plus légères de son clan, ce genre de légèreté qu\'on ne voit pas venir, et qui surprend toujours.' }
        ],
        forts: [
            { nom: 'Vitesse', texte: 'Son corps longiligne est fait pour aller vite. Elle court avec une aisance naturelle, une fluidité qui lui permet de se démarquer sur la lande, assez pour devenir l\'une des meilleures chasseuses de lapin.' },
            { nom: 'Agilité', texte: 'Elle est souple, légère, précise. Son corps répond vite, change de direction sans effort apparent. Elle se faufile là où d\'autres peineraient avec grâce.' },
            { nom: 'Ouïe', texte: 'Ses grandes oreilles captent tout, le froissement d\'une herbe, le souffle d\'un vent qui change, un son trop discret pour le commun des mortels.' },
            { nom: 'Morsure forte', texte: 'Son long museau lui confère une force de morsure surprenante au premier abord. Sa mâchoire est une arme à part entière.' }
        ],
        faibles: [
            { nom: 'Force Brute', texte: 'Elle a la vitesse, pas la puissance. Dans un affrontement direct, au corps à corps, elle le paiera.' },
            { nom: 'Résistance au Froid', texte: 'La mauvaise saison la met à rude épreuve, et le froid la pénètre plus vite qu\'elle ne le voudrait. Un héritage dont elle se serait passée.' },
            { nom: 'Problème d\'équilibre', texte: 'La lande, oui. Les arbres, non. Grimper n\'est pas fait pour elle, son corps la trahit dès que le terrain devient vertical.' },
            { nom: 'Corpulence fragile', texte: 'Son corps se marque vite. Les coups laissent des traces, les blessures arrivent facilement. Chaque cicatrice est durement gagnée.' }
        ],
        marques: [
            { nom: 'Handicap', texte: 'Aucun' },
            { nom: 'Accessoires', texte: 'Aucun', note: 'À voir dans le futur.' },
            { nom: 'Cicatrices', texte: 'Aucune', note: 'À voir dans le futur.' }
        ]
    },

    histoire: {
        chapitres: [
            {
                titre: 'Les Fils du Deuil', age: '0 à 3 lunes',
                paragraphes: [
                    { texte: 'À seulement trois lunes, Petite Mygale n\'a pas encore de grandes épopées à inscrire dans les mémoires du clan. Elle n\'a pas chassé de faucon, ni repoussé d\'invasion. Pourtant, son histoire est déjà lourde, marquée au fer rouge par le deuil et la survie.' },
                    { texte: 'La tragédie a frappé très tôt. Ses frères sont partis les premiers, alors qu\'ils n\'avaient qu\'une lune. Une maladie ? Une faiblesse ? Le Clan des Étoiles les a emportés en silence, sans laisser d\'explications. Petite Mygale était trop petite pour comprendre la Faucheuse, mais elle a tout de même ressenti le froid du nid devenu trop grand pour elle seule.' },
                    { texte: 'Le coup de grâce est survenu à sa deuxième lune. Sa mère, Éclat de Scarabée, a rendu son dernier soupir pour rejoindre la Toison Argentée. Ce jour-là, la chatonne n\'a pas eu besoin de mots pour comprendre : son cœur de bébé chat a enregistré ce vide immense, définitif, qui laisse un goût d\'abandon dans la gorge.' },
                    { texte: 'C\'est <b>Harmonie des Prés</b> qui est alors intervenue pour recueillir l\'orpheline. Unique pilier, unique figure maternelle, elle l\'a prise sous son aile avec toute la douceur et la bienveillance dont elle était capable. C\'est à elle que Petite Mygale doit sa survie, ses connaissances actuelles et les quelques moments de pure tendresse qu\'elle s\'autorise à recevoir. Harmonie des Prés est son ancre dans la tempête, le seul fil qui la rattache à un semblant de foyer.' }
                ],
                citation: 'Pourtant, le regard des autres membres du clan est difficile à porter. En grandissant, Petite Mygale entend les chuchotements. On scrute ses traits, on analyse sa démarche, on cherche désespérément le fantôme d\'Éclat de Scarabée en elle. On lui parle de cet « héritage » comme d\'un honneur, mais la petite sait lire entre les lignes. Elle a compris que sa mère n\'était pas une sainte aux yeux de tous ; elle a été critique, incomprise, parfois rejetée pour ses choix avant d\'être pleurée. Alors, face aux yeux ambrés du clan qui la fixent, Petite Mygale ne ressent aucune fierté. Juste une peur sourde et tenace : celle de n\'être jamais acceptée pour elle-même, de rester à jamais l\'ombre d\'une mère disparue.'
            },
            {
                titre: 'Titre à venir...', age: 'En cours', avenir: true,
                paragraphes: [{ texte: 'L\'histoire s\'écrira au fil du jeu de rôle et des rencontres de Petite Mygale sur le territoire...' }]
            }
        ]
    },

    genealogie: {
        origine: 'Origine : 100 % Clan du Vent',
        groupes: [
            { titre: 'Famille maternelle', membres: [
                { nom: 'Bruissement du Moustique', role: 'Grand-mère (PNJ)', statut: 'decede', photo: 'bruissement-du-moustique.webp' },
                { nom: 'Aile de Cigale', role: 'Grand-père (PNJ)', statut: 'disparu', photo: 'aile-de-cigale.webp', texte: 'Disparu de la lande.' },
                { nom: 'Harmonie des Prés', role: 'Grande-tante (PNJ)', statut: 'vivant', mise: true, photo: 'harmonie-des-pres.webp', texte: 'Sœur d\'Aile de Cigale. C\'est elle qui a recueilli et élevé Petite Mygale après la mort d\'Éclat de Scarabée.' },
                { nom: 'Éclat de Scarabée', role: 'Mère (PNJ)', statut: 'decede', photo: 'eclat-de-scarabee.webp' },
                { nom: 'Nuage de Luciole', role: 'Oncle (PNJ)', statut: 'decede', photo: 'nuage-de-luciole.webp' }
            ] },
            { titre: 'Famille paternelle', membres: [
                { nom: 'Étoile de Nuit', role: 'Grand-mère (PNJ)', statut: 'decede', photo: 'etoile-de-nuit.webp' },
                { nom: 'Siffle Brise', role: 'Grand-père (PNJ)', statut: 'decede', photo: 'siffle-brise.webp' },
                { nom: 'Griffe de Silex', role: 'Père (PNJ)', statut: 'vivant', photo: 'griffe-de-silex.webp', texte: 'Un père totalement inconnu pour Petite Mygale, qui n\'a laissé qu\'une tache et un bout de queue blancs en héritage.' },
                { nom: 'Éclat Sombre', role: 'Tante (PNJ)', statut: 'vivant', photo: 'eclat-sombre.webp' },
                { nom: 'Souffle de Brume', role: 'Oncle (PNJ)', statut: 'vivant', photo: 'souffle-de-brume.webp' }
            ] },
            { titre: 'Famille d\'adoption', membres: [
                { nom: 'Prestesse de la Perdrix', role: 'Mère adoptive (PNJ)', statut: 'vivant', texte: 'Elle a ouvert son nid et offert sa protection à la petite après ses premiers jours difficiles.' },
                { nom: 'Compagnon de Prestesse', statut: 'vide', texte: 'Emplacement réservé pour un futur amant ou compagnon.' },
                { nom: 'Adelphité d\'adoption', statut: 'vide', texte: 'Emplacement réservé pour les futurs enfants ou portées de Prestesse.' }
            ] },
            { titre: 'Adelphité', membres: [
                { nom: 'Petite Puce', role: 'Frère (PNJ)', statut: 'decede', texte: 'Parti à l\'âge d\'une lune.' },
                { nom: 'Petite Noctuelle', role: 'Frère (PNJ)', statut: 'decede', texte: 'Parti à l\'âge d\'une lune.' }
            ] },
            { titre: 'Cousins & cousines', membres: [
                { nom: 'Ombre de Nuit', role: 'Cousin (PNJ)', statut: 'vivant', photo: 'ombre-de-nuit.webp', texte: 'Fils d\'Éclat Sombre.' },
                { nom: 'Aube de Givre', role: 'Cousine (PNJ)', statut: 'vivant', photo: 'aube-de-givre.webp', texte: 'Fille d\'Éclat Sombre.' },
                { nom: 'Cri de l\'Épervier', role: 'Cousin éloigné (PNJ)', statut: 'vivant', photo: 'cri-de-l-epervier.webp', texte: 'Fils d\'Harmonie des Prés.' },
                { nom: 'Envol du Bombyx', role: 'Cousine éloignée (PNJ)', statut: 'vivant', photo: 'envol-du-bombyx.webp', texte: 'Fille d\'Harmonie des Prés.' },
                { nom: 'Chant de Cigale', role: 'Cousine éloignée', statut: 'vivant', joueur: '@lavnd.13', tag: 'PJ', texte: 'Fille d\'Harmonie des Prés.' }
            ] },
            { titre: 'Partenaire & descendance', membres: [
                { nom: 'Aucun partenaire', statut: 'vide', texte: 'Elle n\'a que 6 lunes ! L\'avenir nous le dira.' },
                { nom: 'Aucune descendance', statut: 'vide', texte: 'Pas de chatons ni de petits-chatons pour le moment.' }
            ] }
        ]
    },

    relations: [
        { nom: 'Étoile d\'Ocre', role: 'Meneur (PNJ)', clan: 'Clan du Vent',
          avis: [{ lune: 3, affinite: 1, respect: true, texte: 'Il garde un œil sur elle, car elle est l\'enfant de l\'ancienne guérisseuse, Éclat de Scarabée. Elle apprécie le meneur, elle aime bien lui poser des questions.' }] },
        { nom: 'Chant de Cigale', role: 'Guérisseuse / Cousine (PJ)', clan: 'Clan du Vent', joueur: '@lavnd.13',
          avis: [{ lune: 3, affinite: 3, texte: 'Apprentie de sa mère et sa cousine éloignée, elle est très à l\'aise avec la féline ! Elle aime énormément passer du temps avec elle, dans sa tanière.' }] },
        { nom: 'Prestesse de la Perdrix', role: 'Mère adoptive (PNJ)', clan: 'Clan du Vent',
          avis: [{ lune: 3, affinite: 1, mitige: true, texte: 'Sa mère adoptive, elle l\'apprécie bien qu\'elle ait encore un peu de mal avec elle, après tout sa mère adoptive lui met énormément de pression sur ses épaules. Mais au fond, elle l\'aime beaucoup.' }] }
    ],

    // Fils de jeu de rôle : titre, description, participants (noms séparés par des virgules),
    // enCours (true/false), lien (fil Discord), lune (nombre de lunes)
    fils: [],

    // Blessures et maladies : type (blessure|maladie), titre, lune (début), fin (lune de guérison),
    // statut (en_cours|guerie|sequelle), gravite (legere|moderee|grave), description, soins, sequelles, lien
    sante: [],

    galerie: [
        { fichier: 'petite-mygale.webp', titre: 'Regard Ambré', auteur: '@.araxia.', etiquette: 'Référence', texte: 'Design officiel à l\'âge de 3 lunes. Silhouette fine et ticking sablé.' },
        { fichier: 'mygale-meloe.webp', titre: 'Avant le drame', auteur: '@.araxia.', etiquette: 'Artwork', texte: 'Illustration montrant Petite Mygale et sa mère, Éclat de Scarabée.' },
        { fichier: 'petite-mygale-loops.webp', titre: 'L\'Ombre d\'Éclat de Scarabée', auteur: '@Loops', etiquette: 'Artwork', texte: 'Illustration de Petite Mygale par @Loops.' },
        { fichier: 'petite-mygale-milo.webp', titre: 'L\'Ombre d\'Éclat de Scarabée', auteur: '@Milo', etiquette: 'Artwork', texte: 'Illustration de Petite Mygale par @Milo.' },
        { fichier: 'mygale-moonlight.webp', titre: 'L\'Ombre d\'Éclat de Scarabée', auteur: '@Moonlight', etiquette: 'Artwork', texte: 'Illustration de Petite Mygale par @Moonlight.' }
    ]
};
