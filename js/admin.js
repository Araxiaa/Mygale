/* ==========================================================================
   DASHBOARD — connexion Discord + éditeur de contenus.
   Pour ajouter une rubrique modifiable : une entrée dans RUBRIQUES, et la même clé
   dans js/data/contenu.js (valeur de départ) puis `npm run schema`.
   ========================================================================== */
(function () {
    'use strict';

    var C = window.SITE_CONFIG;
    var O = window.Outils;

    /* ---------- Description des formulaires ----------
       t : text | area | select | bool | image | liste | groupe
       k : nom du champ      l : libellé      aide : petite explication */

    var STATUTS = [['vivant', 'Vivant(e)'], ['decede', 'Décédé(e)'], ['disparu', 'Disparu(e)'], ['vide', 'Emplacement vide']];
    var AFFINITES = [
        ['', 'Aucun cœur'], [3, 'Très apprécié (3 cœurs)'], [2, 'Apprécié (2 cœurs)'], [1, 'Un peu apprécié (1 cœur)'],
        [0, 'Neutre'], [-1, 'Un peu d’aversion (1 cœur sombre)'], [-2, 'Aversion (2 cœurs sombres)'], [-3, 'Forte aversion (3 cœurs sombres)']];

    var NOM_TEXTE = [{ k: 'nom', t: 'text', l: 'Titre' }, { k: 'texte', t: 'area', l: 'Texte' }];
    function coupe(s) { s = s || ''; return s.replace(/<[^>]+>/g, '').slice(0, 70) + (s.length > 70 ? '…' : ''); }
    function PARAGRAPHES(cle, libelle) {
        return {
            k: cle, t: 'liste', l: libelle, ajout: 'Ajouter un paragraphe',
            lib: function (o) { return coupe(o.texte); },
            item: [{ k: 'texte', t: 'area', l: 'Paragraphe', aide: 'Mise en gras : <b>texte</b>' }]
        };
    }
    function TRAITS(cle, libelle, ajout) {
        return { k: cle, t: 'liste', l: libelle, ajout: ajout, lib: function (o) { return o.nom; }, item: NOM_TEXTE };
    }

    var RUBRIQUES = [
        {
            cle: 'fiche', nom: 'Fiche & accueil', defaut: 'fiche',
            aide: 'Le bandeau de gauche : clan, devise, informations rapides, PV / PA, pied de page.',
            champs: [
                { k: 'clan', t: 'text', l: 'Clan' },
                { k: 'devise', t: 'text', l: 'Devise (sous le nom)' },
                { k: 'pv', t: 'text', l: 'Santé (PV)', aide: 'Ex. 10 / 10' },
                { k: 'pa', t: 'text', l: 'Énergie (PA)', aide: 'Ex. 2 / 2' },
                { k: 'pied', t: 'text', l: 'Pied de page' },
                { k: 'lignes', t: 'liste', l: 'Informations rapides', ajout: 'Ajouter une ligne', lib: function (o) { return o.label + ' : ' + (o.valeur || ''); },
                  item: [{ k: 'label', t: 'text', l: 'Intitulé' }, { k: 'valeur', t: 'text', l: 'Valeur' }] }
            ]
        },
        {
            cle: 'noms', nom: 'Nomenclature', defaut: 'noms', racineListe: true,
            aide: 'Les noms successifs. Le premier est mis en avant (nom actuel).',
            champs: [{
                k: 'liste', t: 'liste', ajout: 'Ajouter un nom', lib: function (o) { return (o.etape || '') + ' · ' + (o.nom || ''); },
                item: [
                    { k: 'etape', t: 'text', l: 'Étape', aide: 'Ex. Nom de Chaton' },
                    { k: 'nom', t: 'text', l: 'Nom' },
                    { k: 'periode', t: 'text', l: 'Période', aide: 'Ex. 0 à 6 lunes' },
                    { k: 'citation', t: 'area', l: 'Texte (facultatif)' },
                    { k: 'note', t: 'text', l: 'Remarque (facultatif)' }
                ]
            }]
        },
        {
            cle: 'personnalite', nom: 'Personnalité', defaut: 'personnalite',
            aide: 'Description, qualités, défauts, goûts, peurs, habitudes.',
            champs: [
                PARAGRAPHES('paragraphes', 'Description globale'),
                TRAITS('qualites', 'Qualités', 'Ajouter une qualité'),
                TRAITS('defauts', 'Défauts', 'Ajouter un défaut'),
                TRAITS('aime', 'Elle aime', 'Ajouter un goût'),
                TRAITS('aimepas', 'Elle n\'aime pas', 'Ajouter un dégoût'),
                { k: 'gouts_note', t: 'text', l: 'Remarque sous les goûts' },
                PARAGRAPHES('peurs', 'Peurs & phobies'),
                TRAITS('habitudes', 'Habitudes & échos', 'Ajouter une habitude')
            ]
        },
        {
            cle: 'apparence', nom: 'Apparence', defaut: 'apparence',
            aide: 'Description physique, points forts et faibles, marques.',
            champs: [
                PARAGRAPHES('paragraphes', 'Description globale'),
                TRAITS('forts', 'Points forts', 'Ajouter un point fort'),
                TRAITS('faibles', 'Points faibles', 'Ajouter un point faible'),
                { k: 'marques', t: 'liste', l: 'Marques & attributs', ajout: 'Ajouter une marque', lib: function (o) { return o.nom; },
                  item: [{ k: 'nom', t: 'text', l: 'Titre' }, { k: 'texte', t: 'text', l: 'Valeur', aide: 'Ex. Aucune' }, { k: 'note', t: 'text', l: 'Remarque' }] }
            ]
        },
        {
            cle: 'histoire', nom: 'Histoire', defaut: 'histoire',
            aide: 'Un chapitre par grande période de sa vie.',
            champs: [{
                k: 'chapitres', t: 'liste', ajout: 'Ajouter un chapitre', lib: function (o) { return (o.age ? o.age + ' · ' : '') + (o.titre || ''); },
                item: [
                    { k: 'titre', t: 'text', l: 'Titre du chapitre' },
                    { k: 'age', t: 'text', l: 'Âge', aide: 'Ex. 0 à 3 lunes' },
                    { k: 'avenir', t: 'bool', l: 'Chapitre à venir (affiché en pointillés)' },
                    PARAGRAPHES('paragraphes', 'Texte'),
                    { k: 'citation', t: 'area', l: 'Encart final (facultatif)' }
                ]
            }]
        },
        {
            cle: 'genealogie', nom: 'Généalogie', defaut: 'genealogie',
            aide: 'Groupes de famille, puis les chats de chaque groupe.',
            champs: [
                { k: 'origine', t: 'text', l: 'Origine', aide: 'Phrase sous le titre de la page' },
                {
                    k: 'groupes', t: 'liste', ajout: 'Ajouter un groupe', lib: function (o) { return o.titre || '(groupe)'; },
                    item: [
                        { k: 'titre', t: 'text', l: 'Titre du groupe' },
                        {
                            k: 'membres', t: 'liste', ajout: 'Ajouter un chat', lib: function (o) { return o.nom + (o.role ? ' — ' + o.role : ''); },
                            item: [
                                { k: 'nom', t: 'text', l: 'Nom' },
                                { k: 'role', t: 'text', l: 'Rôle', aide: 'Ex. Grand-mère (PNJ)' },
                                { k: 'statut', t: 'select', l: 'Statut', opts: STATUTS },
                                { k: 'joueur', t: 'text', l: 'Joueur', aide: 'Ex. @pseudo' },
                                { k: 'tag', t: 'text', l: 'Pastille', aide: 'Ex. PJ' },
                                { k: 'mise', t: 'bool', l: 'Mettre en avant (liseré doré)' },
                                { k: 'photo', t: 'image', l: 'Portrait' },
                                { k: 'texte', t: 'area', l: 'Description' }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            cle: 'relations', nom: 'Relations', defaut: 'relations', racineListe: true,
            aide: 'Les chats qui comptent pour elle, avec cœurs et appréciation.',
            champs: [{
                k: 'liste', t: 'liste', ajout: 'Ajouter une relation', lib: function (o) { return o.nom + (o.role ? ' — ' + o.role : ''); },
                item: [
                    { k: 'nom', t: 'text', l: 'Nom' },
                    { k: 'role', t: 'text', l: 'Rôle' },
                    { k: 'joueur', t: 'text', l: 'Joueur', aide: 'Ex. @pseudo' },
                    { k: 'photo', t: 'image', l: 'Portrait' },
                    { k: 'affinite', t: 'select', num: true, l: 'Affinité', opts: AFFINITES },
                    { k: 'mitige', t: 'bool', l: 'Mitigé (ajoute un cœur sombre)' },
                    { k: 'respect', t: 'bool', l: 'Respect (étoile)' },
                    { k: 'mort', t: 'bool', l: 'Décédé(e) (crâne)' },
                    { k: 'texte', t: 'area', l: 'Appréciation' }
                ]
            }]
        },
        {
            cle: 'galerie', nom: 'Galerie', defaut: 'galerie', racineListe: true,
            aide: 'Les illustrations. Une image envoyée est automatiquement allégée (WebP, 1600 px).',
            champs: [{
                k: 'liste', t: 'liste', ajout: 'Ajouter une illustration', lib: function (o) { return (o.titre || 'Illustration') + (o.auteur ? ' — ' + o.auteur : ''); },
                item: [
                    { k: 'fichier', t: 'image', l: 'Image' },
                    { k: 'titre', t: 'text', l: 'Titre' },
                    { k: 'etiquette', t: 'text', l: 'Étiquette', aide: 'Ex. Référence, Artwork' },
                    { k: 'auteur', t: 'text', l: 'Artiste', aide: 'Ex. @pseudo' },
                    { k: 'texte', t: 'area', l: 'Légende' },
                    { k: 'alt', t: 'text', l: 'Description (lecteurs d\'écran)' }
                ]
            }]
        }
    ];

    /* ---------- Petits outils ---------- */
    var $ = function (id) { return document.getElementById(id); };

    function h(tag, props, enfants) {
        var e = document.createElement(tag);
        Object.keys(props || {}).forEach(function (k) {
            if (k === 'class') e.className = props[k];
            else if (k === 'text') e.textContent = props[k];
            else e.setAttribute(k, props[k]);
        });
        (enfants || []).forEach(function (c) { if (c) e.appendChild(c); });
        return e;
    }

    var toastTimer;
    function toast(message, erreur) {
        var t = $('toast');
        t.textContent = message;
        t.className = 'admin-toast visible' + (erreur ? ' erreur' : '');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { t.className = 'admin-toast'; }, erreur ? 6000 : 2600);
    }
    function copie(x) { return JSON.parse(JSON.stringify(x)); }

    /* ---------- État ---------- */
    var client = window.supabase.createClient(C.url, C.cle);
    var donnees = {};
    var modifie = {};
    var courante = null;

    function fixer(obj, k, v) {
        if (v === '' || v === false || v == null) delete obj[k];
        else obj[k] = v;
    }
    var compteur = 0;

    /* ---------- Éditeur de formulaires ---------- */
    function formulaire(defs, obj, change) {
        var corps = h('div', { class: 'grille-champs' });
        var conteneur = h('div');

        defs.forEach(function (d) {
            var id = 'c' + (++compteur);
            var champ;

            if (d.t === 'liste') {
                if (corps.childNodes.length) conteneur.appendChild(corps);
                conteneur.appendChild(liste(d, obj, change));
                corps = h('div', { class: 'grille-champs' });
                return;
            }

            if (d.t === 'bool') {
                var cb = h('input', { type: 'checkbox', id: id });
                cb.checked = !!obj[d.k];
                cb.addEventListener('change', function () { fixer(obj, d.k, cb.checked); change(); });
                champ = h('div', { class: 'champ case' }, [cb, h('label', { for: id, text: d.l })]);
            } else {
                var saisie;
                if (d.t === 'area') {
                    saisie = h('textarea', { id: id });
                    saisie.value = obj[d.k] == null ? '' : obj[d.k];
                    saisie.addEventListener('input', function () { fixer(obj, d.k, saisie.value); change(); });
                } else if (d.t === 'select') {
                    saisie = h('select', { id: id }, d.opts.map(function (o) { return h('option', { value: String(o[0]), text: o[1] }); }));
                    saisie.value = obj[d.k] == null ? '' : String(obj[d.k]);
                    saisie.addEventListener('change', function () {
                        var v = saisie.value;
                        fixer(obj, d.k, v === '' ? '' : (d.num ? Number(v) : v));
                        change();
                    });
                } else if (d.t === 'image') {
                    saisie = champImage(id, d, obj, change);
                } else {
                    saisie = h('input', { type: 'text', id: id });
                    saisie.value = obj[d.k] == null ? '' : obj[d.k];
                    saisie.addEventListener('input', function () { fixer(obj, d.k, saisie.value); change(); });
                }
                var enfants = [h('label', { for: id, text: d.l }), saisie];
                if (d.aide) enfants.push(h('span', { class: 'aide', text: d.aide }));
                champ = h('div', { class: 'champ' }, enfants);
                if (d.t === 'area') champ.style.gridColumn = '1 / -1';
            }
            corps.appendChild(champ);
        });

        if (corps.childNodes.length) conteneur.appendChild(corps);
        return conteneur;
    }

    function champImage(id, d, obj, change) {
        var texte = h('input', { type: 'text', id: id, placeholder: 'Nom de fichier ou adresse' });
        var vignette = h('img', { class: 'vignette', alt: '' });
        var fichier = h('input', { type: 'file', accept: 'image/*', hidden: '' });
        var bouton = h('button', { type: 'button', class: 'bouton-clair bouton-petit', text: 'Envoyer une image' });

        function apercu() {
            if (texte.value.trim()) vignette.src = O.url(texte.value.trim());
            else vignette.removeAttribute('src');
        }
        texte.value = obj[d.k] == null ? '' : obj[d.k];
        apercu();
        texte.addEventListener('input', function () { fixer(obj, d.k, texte.value.trim()); change(); });
        texte.addEventListener('change', apercu);
        vignette.addEventListener('error', function () { vignette.removeAttribute('src'); });

        bouton.addEventListener('click', function () { fichier.click(); });
        fichier.addEventListener('change', function () {
            var f = fichier.files[0];
            if (!f) return;
            bouton.disabled = true;
            bouton.textContent = 'Envoi…';
            envoyerImage(f).then(function (url) {
                texte.value = url;
                fixer(obj, d.k, url);
                apercu();
                change();
                toast('Image envoyée. N\'oublie pas d\'enregistrer.');
            }).catch(function (e) {
                toast('Envoi impossible : ' + (e && e.message ? e.message : e), true);
            }).then(function () {
                bouton.disabled = false;
                bouton.textContent = 'Envoyer une image';
                fichier.value = '';
            });
        });
        return h('div', { class: 'champ-image' }, [vignette, texte, bouton, fichier]);
    }

    // Réduit l'image (1600 px max) et la convertit en WebP avant l'envoi
    function versWebp(f) {
        return createImageBitmap(f).then(function (bmp) {
            var k = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
            var c = document.createElement('canvas');
            c.width = Math.round(bmp.width * k);
            c.height = Math.round(bmp.height * k);
            c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
            return new Promise(function (ok) {
                c.toBlob(function (b) { ok(b && b.type === 'image/webp' ? b : null); }, 'image/webp', 0.82);
            });
        }).catch(function () { return null; });
    }

    function envoyerImage(f) {
        return versWebp(f).then(function (webp) {
            var base = f.name.replace(/\.[^.]+$/, '').normalize('NFD').replace(/[̀-ͯ]/g, '')
                .replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase() || 'image';
            var ext = webp ? 'webp' : (f.name.split('.').pop() || 'png').toLowerCase();
            var nom = Date.now().toString(36) + '-' + base + '.' + ext;
            return client.storage.from(C.bucket).upload(nom, webp || f, {
                contentType: webp ? 'image/webp' : f.type, cacheControl: '31536000'
            }).then(function (r) {
                if (r.error) throw r.error;
                return client.storage.from(C.bucket).getPublicUrl(nom).data.publicUrl;
            });
        });
    }

    function liste(d, obj, change) {
        if (!Array.isArray(obj[d.k])) obj[d.k] = [];
        var tab = obj[d.k];
        var boite = h('div', { class: 'liste' });
        var titre = d.l ? h('h3', { class: 'liste-titre', text: d.l }) : null;

        function rendre(ouvert) {
            boite.textContent = '';
            tab.forEach(function (item, i) {
                var det = h('details', { class: 'item' });
                if (i === ouvert) det.open = true;
                var nom = h('span', { class: 'item-titre' });
                function libelle() { nom.textContent = (d.lib ? d.lib(item) : '') || '(sans titre)'; }
                libelle();

                function bouton(sym, label, fait, inactif) {
                    var b = h('button', { type: 'button', 'aria-label': label, title: label, text: sym });
                    b.disabled = !!inactif;
                    b.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); fait(); });
                    return b;
                }
                function deplacer(de, vers) {
                    var x = tab.splice(de, 1)[0];
                    tab.splice(vers, 0, x);
                    change(); rendre(vers);
                }
                det.appendChild(h('summary', {}, [nom, h('span', { class: 'mini-boutons' }, [
                    bouton('↑', 'Monter', function () { deplacer(i, i - 1); }, i === 0),
                    bouton('↓', 'Descendre', function () { deplacer(i, i + 1); }, i === tab.length - 1),
                    bouton('✕', 'Supprimer', function () {
                        if (!window.confirm('Supprimer « ' + ((d.lib && d.lib(item)) || 'cet élément') + ' » ?')) return;
                        tab.splice(i, 1); change(); rendre();
                    })
                ])]));
                var corps = h('div', { class: 'item-corps' });
                corps.appendChild(formulaire(d.item, item, function () { libelle(); change(); }));
                det.appendChild(corps);
                boite.appendChild(det);
            });
            var ajout = h('button', { type: 'button', class: 'bouton-ajout', text: '+ ' + (d.ajout || 'Ajouter') });
            ajout.addEventListener('click', function () { tab.push({}); change(); rendre(tab.length - 1); });
            boite.appendChild(ajout);
        }
        rendre();

        var tout = h('div');
        if (titre) tout.appendChild(titre);
        tout.appendChild(boite);
        return tout;
    }

    /* ---------- Affichage d'une rubrique ---------- */
    function afficher(r) {
        courante = r;
        $('rubrique-titre').textContent = r.nom;
        $('rubrique-aide').textContent = r.aide;
        var cible = $('formulaire');
        cible.textContent = '';
        cible.appendChild(formulaire(r.champs, donnees[r.cle], function () {
            modifie[r.cle] = true;
            majOnglets();
        }));
        majOnglets();
    }

    function majOnglets() {
        Array.prototype.forEach.call($('onglets').children, function (b, i) {
            var r = RUBRIQUES[i];
            b.setAttribute('aria-current', r === courante ? 'true' : 'false');
            b.className = modifie[r.cle] ? 'modifie' : '';
        });
    }

    function enregistrer() {
        var r = courante, b = $('enregistrer');
        b.disabled = true;
        b.textContent = 'Enregistrement…';
        var v = r.racineListe ? donnees[r.cle].liste : donnees[r.cle];
        client.from(C.table).upsert({ cle: r.cle, valeur: v }).then(function (res) {
            if (res.error) throw res.error;
            modifie[r.cle] = false;
            majOnglets();
            try { localStorage.removeItem('mygale-contenu-v1'); } catch (e) {}
            toast('Enregistré. Le site est à jour !');
        }).catch(function (e) {
            toast('Échec de l\'enregistrement : ' + (e && e.message ? e.message : e), true);
        }).then(function () {
            b.disabled = false;
            b.textContent = 'Enregistrer';
        });
    }

    /* ---------- Écrans ---------- */
    function ecran(titre, texte, bouton, action) {
        $('app').hidden = true;
        var e = $('ecran');
        e.hidden = false;
        e.textContent = '';
        e.appendChild(h('h1', { text: titre }));
        if (texte) e.appendChild(h('p', { text: texte }));
        if (bouton) {
            var b = h('button', { type: 'button', class: 'bouton', text: bouton });
            b.addEventListener('click', action);
            e.appendChild(b);
        }
    }

    function connexionDiscord() {
        client.auth.signInWithOAuth({
            provider: 'discord',
            options: { redirectTo: window.location.origin + window.location.pathname }
        });
    }
    function deconnexion() {
        client.auth.signOut().then(function () { window.location.reload(); });
    }

    function charger() {
        return client.from(C.table).select('cle,valeur').then(function (res) {
            if (res.error) throw res.error;
            var lignes = {};
            res.data.forEach(function (l) { lignes[l.cle] = l.valeur; });
            RUBRIQUES.forEach(function (r) {
                // pas encore en base : on part des valeurs d'origine du site
                var v = copie(lignes[r.cle] != null ? lignes[r.cle] : (window.DEFAUT[r.defaut] || (r.racineListe ? [] : {})));
                donnees[r.cle] = r.racineListe ? { liste: v } : v;
                modifie[r.cle] = false;
            });
        });
    }

    function ouvrirDashboard() {
        return charger().then(function () {
            $('ecran').hidden = true;
            $('app').hidden = false;
            var nav = $('onglets');
            nav.textContent = '';
            RUBRIQUES.forEach(function (r) {
                var b = h('button', { type: 'button', text: r.nom });
                b.addEventListener('click', function () { afficher(r); });
                nav.appendChild(b);
            });
            afficher(RUBRIQUES[0]);
        });
    }

    function demarrer(session) {
        if (!session) {
            $('deconnexion').hidden = true;
            $('qui').textContent = '';
            ecran('Dashboard', 'Connecte-toi avec Discord pour modifier le site.', 'Se connecter avec Discord', connexionDiscord);
            return;
        }
        var meta = session.user.user_metadata || {};
        $('qui').textContent = meta.full_name || meta.name || '';
        $('deconnexion').hidden = false;

        client.rpc('est_admin').then(function (r) {
            if (r.error) throw r.error;
            if (!r.data) {
                ecran('Accès refusé', 'Ce compte Discord n\'est pas administrateur du site.', 'Se déconnecter', deconnexion);
                return;
            }
            return ouvrirDashboard();
        }).catch(function (e) {
            var msg = e && e.message ? e.message : String(e);
            var base = /est_admin|mygale_contenus|schema cache|relation/i.test(msg)
                ? 'La base n\'est pas encore prête : lance supabase/schema.sql dans Supabase (SQL Editor). '
                : '';
            ecran('Erreur', base + msg, 'Se déconnecter', deconnexion);
        });
    }

    /* ---------- Lancement ---------- */
    $('deconnexion').addEventListener('click', deconnexion);
    $('enregistrer').addEventListener('click', enregistrer);

    window.addEventListener('beforeunload', function (e) {
        if (Object.keys(modifie).some(function (k) { return modifie[k]; })) {
            e.preventDefault();
            e.returnValue = '';
        }
    });

    var demarre = false;
    client.auth.onAuthStateChange(function (evenement, session) {
        if (evenement === 'TOKEN_REFRESHED' || evenement === 'USER_UPDATED') return;
        if (evenement === 'SIGNED_IN' && demarre) return;
        demarre = !!session;
        // on sort du callback avant d'appeler Supabase (évite un blocage connu de supabase-js)
        setTimeout(function () { demarrer(session); }, 0);
    });
})();
