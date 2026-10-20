/* ==========================================================================
   SITE — navigation (#page/sous-page), affichage du contenu (Donnees.charger).
   Une fonction par vue ; VUES décrit le menu.
   ========================================================================== */
(function () {
    'use strict';

    var O = window.Outils, esc = O.esc, riche = O.riche;
    var $ = function (id) { return document.getElementById(id); };
    var DONNEES = null;

    /* ---------- Menu ---------- */
    var PAGES = [
        { id: 'accueil', nom: 'Accueil', icone: 'M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z', subs: [['accueil', 'Accueil']] },
        { id: 'elle', nom: 'Elle', icone: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-3.3 0-8 1.7-8 5v2h16v-2c0-3.3-4.7-5-8-5z',
          subs: [['noms', 'Ses noms'], ['caractere', 'Caractère'], ['physique', 'Physique'], ['sante', 'Santé']] },
        { id: 'histoire', nom: 'Histoire', icone: 'M5 3h11a3 3 0 0 1 3 3v15H8a3 3 0 0 1-3-3zm3 4v2h8V7zm0 4v2h8v-2z',
          subs: [['chroniques', 'Chroniques'], ['fils', 'Fils RP']] },
        { id: 'entourage', nom: 'Entourage', icone: 'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8 13c-2.7 0-6 1.3-6 3.5V19h12v-2.5c0-2.2-3.3-3.5-6-3.5zm8 0c-.5 0-1 0-1.500.1 1.600.9 2.500 2.100 2.500 3.400V19h6v-2.500c0-2.200-3.300-3.500-7-3.500z',
          subs: [['lignee', 'Lignée'], ['relations', 'Relations']] },
        { id: 'galerie', nom: 'Galerie', icone: 'M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm2 12h12l-3.500-5-3 4-2-2.500z', subs: [['galerie', 'Galerie']] }
    ];
    var ORDRE = [];
    PAGES.forEach(function (p) { p.subs.forEach(function (s) { ORDRE.push(p.id + '/' + s[0]); }); });

    /* ---------- Petits gabarits ---------- */
    function titre(h, sous) {
        return '<header class="entete"><h1>' + esc(h) + '</h1>' + (sous ? '<p>' + esc(sous) + '</p>' : '') + '</header>';
    }
    function paras(liste) { return (liste || []).map(function (p) { return '<p>' + riche(p.texte) + '</p>'; }).join(''); }
    function pliant(h, corps, ouvert) {
        return '<details class="pliant"' + (ouvert ? ' open' : '') + '><summary><span>' + esc(h) + '</span><i aria-hidden="true"></i></summary><div class="pliant-corps">' + corps + '</div></details>';
    }
    function traits(liste, classe) {
        return '<ul class="traits ' + (classe || '') + '">' + (liste || []).map(function (t) {
            return '<li><h3>' + esc(t.nom) + '</h3><p>' + riche(t.texte) + '</p>' + (t.note ? '<small>' + esc(t.note) + '</small>' : '') + '</li>';
        }).join('') + '</ul>';
    }
    function bloc(classe, h, liste) {
        return '<div class="gout ' + classe + '"><h3>' + h + '</h3>' + (liste || []).map(function (t) {
            return '<div><h4>' + esc(t.nom) + '</h4><p>' + riche(t.texte) + '</p></div>';
        }).join('') + '</div>';
    }
    function puces(options, actuel, attr) {
        return '<div class="puces" role="group">' + options.map(function (o) {
            return '<button type="button" class="puce" data-' + attr + '="' + esc(o[0]) + '" aria-pressed="' + (o[0] === actuel) + '">' + esc(o[1]) + '</button>';
        }).join('') + '</div>';
    }
    function lienOk(l) { return /^https?:\/\//.test(l || ''); }
    function vide(texte) { return '<p class="vide-page">' + esc(texte) + '</p>'; }
    function nomActuel(c) {
        var n = c.noms || [];
        for (var i = 0; i < n.length; i++) if (n[i].actuel) return n[i];
        return n[0] || { nom: 'Petite Mygale' };
    }

    /* ---------- Accueil ---------- */
    function accueil(c) {
        var f = c.fiche || {}, na = nomActuel(c);
        var fils = (c.fils || []).filter(function (x) { return x.enCours; });
        var enCours = (c.sante || []).filter(function (x) { return x.statut === 'en_cours'; });
        var evol = evolutions(c).slice(0, 3);

        var hero = '<section class="hero">' +
            '<div class="hero-texte"><p class="surtitre">' + esc(f.clan || '') + '</p>' +
            '<h1>' + esc(na.nom) + '</h1>' +
            (na.etape && na.nom !== 'Petite Mygale' ? '<p class="alias">Née <b>Petite Mygale</b></p>' : '') +
            '<p class="devise">' + esc(f.devise || '') + '</p>' +
            (f.accroche ? '<p class="accroche">' + esc(f.accroche) + '</p>' : '') +
            '<ul class="chips">' + (f.lignes || []).map(function (l) { return '<li><span>' + esc(l.label) + '</span>' + esc(l.valeur) + '</li>'; }).join('') + '</ul>' +
            '<div class="jauges"><div><span>Santé</span><b>' + esc(f.pv || '') + '</b></div><div><span>Énergie</span><b>' + esc(f.pa || '') + '</b></div></div>' +
            '<div class="actions"><a class="btn" href="#histoire/chroniques">Découvrir son histoire</a><a class="btn clair" href="#histoire/fils">Fils en cours</a></div></div>' +
            '<div class="hero-image"><div class="cadre">' + (f.portrait ? '<img src="' + O.miniature(f.portrait) + '" alt="Illustration de ' + esc(na.nom) + '" fetchpriority="high" decoding="async">' : '') + '</div>' +
            '<div class="fil" aria-hidden="true"><i></i><svg><use href="#araignee"/></svg></div></div></section>';

        var cartes = '<section class="maintenant"><h2 class="titre-section">En ce moment</h2><div class="trio">' +
            '<article class="mini"><h3>Fils en cours</h3>' +
            (fils.length ? '<ul>' + fils.slice(0, 3).map(function (x) { return '<li><b>' + esc(x.titre) + '</b><small>' + esc(O.lune(x.lune)) + '</small></li>'; }).join('') + '</ul>' : '<p>Aucun fil en cours.</p>') +
            '<a href="#histoire/fils">Tous les fils →</a></article>' +
            '<article class="mini"><h3>Santé</h3>' +
            (enCours.length ? '<ul>' + enCours.slice(0, 3).map(function (x) { return '<li><b>' + esc(x.titre) + '</b><small>' + (x.type === 'maladie' ? 'Maladie' : 'Blessure') + '</small></li>'; }).join('') + '</ul>'
                : '<p class="bon">En bonne santé, rien à signaler.</p>') +
            '<a href="#elle/sante">Historique →</a></article>' +
            '<article class="mini"><h3>Relations</h3>' +
            (evol.length ? '<ul>' + evol.map(function (e) { return '<li><b>' + esc(e.rel.nom) + '</b>' + O.coeursAvis(e.avis, e.rel) + '</li>'; }).join('') + '</ul>' : '<p>Aucune relation notée.</p>') +
            '<a href="#entourage/relations">Toutes les relations →</a></article></div></section>';

        var explorer = '<section><h2 class="titre-section">Explorer</h2><div class="explorer">' +
            lien('elle/noms', 'Elle', 'Ses noms, son caractère, son physique et son historique de santé.') +
            lien('histoire/chroniques', 'Histoire', 'Les chapitres de sa vie et le suivi des fils de jeu de rôle.') +
            lien('entourage/lignee', 'Entourage', 'Sa famille et l\'évolution de chacune de ses relations.') +
            lien('galerie/galerie', 'Galerie', 'Illustrations, croquis et designs.') + '</div></section>';

        return hero + cartes + explorer;
    }
    function lien(route, nom, texte) { return '<a class="carte-lien" href="#' + route + '"><h3>' + nom + '</h3><p>' + texte + '</p><span aria-hidden="true">→</span></a>'; }

    /* ---------- Elle ---------- */
    function noms(c) {
        var liste = c.noms || [], pos = 0;
        liste.forEach(function (n, i) { if (n.actuel) pos = i; });
        return titre('Ses noms', 'Les noms qu\'elle porte au fil de sa vie') +
            '<ol class="frise">' + liste.map(function (n, i) {
                var etat = i < pos ? 'passe' : i === pos ? 'actuel' : 'avenir';
                return '<li class="' + etat + '"><span class="etape">' + esc(n.etape) +
                    (etat === 'actuel' ? ' <em class="porte">Porté actuellement</em>' : etat === 'passe' ? ' <em>ancien nom</em>' : '') + '</span>' +
                    '<strong>' + esc(n.nom) + '</strong>' +
                    (n.periode ? '<span class="periode">' + esc(n.periode) + '</span>' : '') +
                    (n.citation ? '<blockquote>' + riche(n.citation) + '</blockquote>' : '') +
                    (n.note ? '<small>' + esc(n.note) + '</small>' : '') + '</li>';
            }).join('') + '</ol>';
    }

    function caractere(c) {
        var p = c.personnalite || {};
        return titre('Caractère & personnalité') +
            '<div class="texte lettrine">' + paras(p.paragraphes) + '</div>' +
            '<div class="pliants">' +
            pliant('Qualités', traits(p.qualites, 'positif'), true) +
            pliant('Défauts', traits(p.defauts, 'negatif')) +
            pliant('Goûts & dégoûts', '<div class="duo">' + bloc('aime', 'J\'aime beaucoup', p.aime) + bloc('aimepas', 'Je n\'aime pas', p.aimepas) + '</div>' +
                (p.gouts_note ? '<p class="note">' + esc(p.gouts_note) + '</p>' : '')) +
            pliant('Peurs & phobies', (p.peurs || []).map(function (x) { return '<blockquote class="mot">' + riche(x.texte) + '</blockquote>'; }).join('')) +
            pliant('Habitudes & échos', traits(p.habitudes)) + '</div>';
    }

    function physique(c) {
        var a = c.apparence || {};
        var marques = '<ul class="traits">' + (a.marques || []).map(function (m) {
            return '<li><h3>' + esc(m.nom) + '</h3><p class="vide">' + esc(m.texte) + '</p>' + (m.note ? '<small>' + esc(m.note) + '</small>' : '') + '</li>';
        }).join('') + '</ul>';
        return titre('Apparence physique') +
            '<div class="texte lettrine">' + paras(a.paragraphes) + '</div>' +
            '<div class="pliants">' + pliant('Points forts', traits(a.forts, 'positif'), true) + pliant('Points faibles', traits(a.faibles, 'negatif')) +
            pliant('Marques & attributs', marques) + '</div>' +
            '<a class="carte-lien large" href="#elle/sante"><h3>Historique de santé</h3><p>Blessures, maladies, soins et séquelles.</p><span aria-hidden="true">→</span></a>';
    }

    var SANTE = { f: 'tout' };
    var GRAVITE = { legere: 'Légère', moderee: 'Modérée', grave: 'Grave' };
    var STATUT_SANTE = { en_cours: 'En cours', guerie: 'Guérie', sequelle: 'Séquelles' };
    function sante(c) {
        var tout = (c.sante || []).slice().sort(function (a, b) { return (O.nombre(b.lune) || 0) - (O.nombre(a.lune) || 0); });
        var enCours = tout.filter(function (x) { return x.statut === 'en_cours'; });
        var liste = tout.filter(function (x) {
            return SANTE.f === 'tout' || (SANTE.f === 'en_cours' ? x.statut === 'en_cours' : x.type === SANTE.f);
        });
        var etat = enCours.length
            ? '<div class="etat alerte"><b>' + enCours.length + ' problème' + (enCours.length > 1 ? 's' : '') + ' en cours</b><span>' + enCours.map(function (x) { return esc(x.titre); }).join(' · ') + '</span></div>'
            : '<div class="etat bon"><b>En bonne santé</b><span>Aucune blessure ni maladie en cours.</span></div>';
        var filtres = puces([['tout', 'Tout'], ['blessure', 'Blessures'], ['maladie', 'Maladies'], ['en_cours', 'En cours']], SANTE.f, 'sante');
        var corps = liste.length ? '<ol class="chrono">' + liste.map(function (x) {
            var duree = x.statut === 'en_cours' ? 'depuis ' + O.lune(x.lune) : (x.fin != null && x.fin !== '' ? O.lune(x.lune) + ' → ' + O.lune(x.fin) : O.lune(x.lune));
            return '<li class="' + esc(x.statut || '') + '"><div class="entete-ev"><h3>' + esc(x.titre) + '</h3><span class="duree">' + esc(duree) + '</span></div>' +
                '<div class="badges"><span class="badge-t ' + esc(x.type || '') + '">' + (x.type === 'maladie' ? 'Maladie' : 'Blessure') + '</span>' +
                (x.gravite ? '<span class="badge-t g-' + esc(x.gravite) + '">' + esc(GRAVITE[x.gravite] || x.gravite) + '</span>' : '') +
                (x.statut ? '<span class="badge-t s-' + esc(x.statut) + '">' + esc(STATUT_SANTE[x.statut] || x.statut) + '</span>' : '') + '</div>' +
                (x.description ? '<p>' + riche(x.description) + '</p>' : '') +
                (x.soins ? '<p class="detail"><b>Soins</b> ' + riche(x.soins) + '</p>' : '') +
                (x.sequelles ? '<p class="detail"><b>Séquelles</b> ' + riche(x.sequelles) + '</p>' : '') +
                (lienOk(x.lien) ? '<a class="lien-ext" href="' + esc(x.lien) + '" target="_blank" rel="noopener noreferrer">Voir le fil Discord ↗</a>' : '') + '</li>';
        }).join('') + '</ol>' : vide(tout.length ? 'Rien ne correspond à ce filtre.' : 'Aucune blessure ni maladie pour le moment. Son historique s\'écrira au fil de ses aventures.');
        return titre('Santé', 'Historique des blessures et des maladies') + etat + (tout.length ? filtres : '') + corps;
    }

    /* ---------- Histoire ---------- */
    var CHAP = { i: 0 };
    function chroniques(c) {
        var ch = (c.histoire && c.histoire.chapitres) || [];
        if (CHAP.i >= ch.length) CHAP.i = 0;
        var nav = ch.map(function (x, i) {
            return '<button type="button" class="puce" data-chap="' + i + '" aria-pressed="' + (i === CHAP.i) + '">Chapitre ' + (i + 1) + '</button>';
        }).join('');
        var x = ch[CHAP.i] || {};
        return titre('Histoire & chroniques') + '<div class="puces">' + nav + '</div>' +
            '<article class="chapitre' + (x.avenir ? ' avenir' : '') + '"><header><h2>Chapitre ' + (CHAP.i + 1) + ' · ' + esc(x.titre) + '</h2><span class="age">Âge : ' + esc(x.age) + '</span></header>' +
            '<div class="texte">' + paras(x.paragraphes) + '</div>' + (x.citation ? '<blockquote>' + riche(x.citation) + '</blockquote>' : '') + '</article>';
    }

    var FIL = { f: 'tous' };
    function fils(c) {
        var tous = c.fils || [];
        var nb = tous.filter(function (x) { return x.enCours; }).length;
        var liste = tous.filter(function (x) { return FIL.f === 'tous' || (FIL.f === 'cours' ? x.enCours : !x.enCours); })
            .sort(function (a, b) { return (O.nombre(b.lune) || 0) - (O.nombre(a.lune) || 0); });
        var groupes = [], vu = {};
        liste.forEach(function (x) {
            var k = O.lune(x.lune) || 'Sans date';
            if (!vu[k]) { vu[k] = { k: k, items: [] }; groupes.push(vu[k]); }
            vu[k].items.push(x);
        });
        var corps = groupes.length ? groupes.map(function (g) {
            return '<section class="groupe-lune"><h2><span>' + esc(g.k) + '</span></h2><ul class="fils">' + g.items.map(function (x) {
                var parts = String(x.participants || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
                return '<li class="fil-rp' + (x.enCours ? ' en-cours' : '') + '"><div class="entete-ev"><h3>' + esc(x.titre) + '</h3>' +
                    '<span class="statut ' + (x.enCours ? 'cours' : 'fini') + '">' + (x.enCours ? 'En cours' : 'Terminé') + '</span></div>' +
                    (x.description ? '<p>' + riche(x.description) + '</p>' : '') +
                    (parts.length ? '<ul class="participants" aria-label="Participants">' + parts.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>' : '') +
                    (lienOk(x.lien) ? '<a class="lien-ext" href="' + esc(x.lien) + '" target="_blank" rel="noopener noreferrer">Ouvrir le fil sur Discord ↗</a>' : '') + '</li>';
            }).join('') + '</ul></section>';
        }).join('') : vide(tous.length ? 'Aucun fil ne correspond à ce filtre.' : 'Aucun fil pour le moment.');
        return titre('Fils de jeu de rôle', tous.length + ' fil' + (tous.length > 1 ? 's' : '') + ' · ' + nb + ' en cours') +
            (tous.length ? puces([['tous', 'Tous'], ['cours', 'En cours'], ['finis', 'Terminés']], FIL.f, 'fil') : '') + corps;
    }

    /* ---------- Entourage ---------- */
    var ETIQUETTE = { vivant: 'Vivant(e)', decede: 'Décédé(e)', disparu: 'Disparu(e)', vide: '' };
    function carte(m) {
        var statut = m.statut || 'vivant';
        if (statut === 'vide') return '<li class="membre vide"><div><h3>' + esc(m.nom) + '</h3><p>' + riche(m.texte) + '</p></div></li>';
        return '<li class="membre ' + esc(statut) + (m.mise ? ' mise' : '') + '">' + O.avatar(m.nom, m.photo) +
            '<div><h3>' + esc(m.nom) + (m.tag ? ' <span class="tag">' + esc(m.tag) + '</span>' : '') + '</h3>' +
            '<span class="role">' + esc(m.role || '') + (m.joueur ? ' · <b>' + esc(m.joueur) + '</b>' : '') + '</span>' +
            (m.texte ? '<p>' + riche(m.texte) + '</p>' : '') + '</div>' +
            (statut !== 'vivant' ? '<em class="etat-m">' + ETIQUETTE[statut] + '</em>' : '') + '</li>';
    }
    var ROMAIN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
    function lignee(c) {
        var g = c.genealogie || {};
        return titre('Généalogie & lignée', g.origine) + (g.groupes || []).map(function (gr, i) {
            return '<section class="groupe"><h2><span>' + ROMAIN[i] + '</span>' + esc(gr.titre) + '</h2><ul class="membres">' + (gr.membres || []).map(carte).join('') + '</ul></section>';
        }).join('');
    }

    var REL = { clan: '', aff: 'tous', q: '' };
    function rels(c) { return (c.relations || []).map(O.relation); }
    function evolutions(c) {
        var out = [];
        rels(c).forEach(function (r) {
            r.avis.forEach(function (a, i) { out.push({ rel: r, avis: a, prev: r.avis[i - 1] }); });
        });
        return out.sort(function (a, b) { return (O.nombre(b.avis.lune) || 0) - (O.nombre(a.avis.lune) || 0); });
    }
    function tendance(r) {
        var a = r.avis, n = a.length;
        if (n < 2 || typeof a[n - 1].affinite !== 'number' || typeof a[n - 2].affinite !== 'number') return '';
        var d = a[n - 1].affinite - a[n - 2].affinite;
        return d > 0 ? '<span class="tend monte" title="S\'améliore">▲</span>' : d < 0 ? '<span class="tend descend" title="Se dégrade">▼</span>' : '<span class="tend egal" title="Stable">＝</span>';
    }
    function categorie(r) {
        var a = r.dernier.affinite;
        return r.mort ? 'decede' : typeof a !== 'number' ? 'neutre' : a > 0 ? 'positif' : a < 0 ? 'negatif' : 'neutre';
    }
    function relationsFiltres(c) {
        var clans = [];
        rels(c).forEach(function (r) { var k = r.clan || 'Sans clan'; if (clans.indexOf(k) < 0) clans.push(k); });
        return (clans.length > 1 ? puces([['', 'Tous les clans']].concat(clans.map(function (k) { return [k, k]; })), REL.clan, 'clan') : '') +
            puces([['tous', 'Toutes'], ['positif', 'Appréciées'], ['neutre', 'Neutres'], ['negatif', 'Aversion'], ['decede', 'Décédées']], REL.aff, 'aff');
    }
    function relationsListe(c) {
        var q = REL.q.trim().toLowerCase();
        var liste = rels(c).filter(function (r) {
            return (!REL.clan || (r.clan || 'Sans clan') === REL.clan) && (REL.aff === 'tous' || categorie(r) === REL.aff) &&
                (!q || (r.nom + ' ' + (r.role || '') + ' ' + (r.clan || '') + ' ' + (r.joueur || '')).toLowerCase().indexOf(q) >= 0);
        });
        if (!liste.length) return vide('Aucune relation ne correspond.');
        return '<ul class="fils-rel">' + liste.map(function (r) {
            var i = (c.relations || []).map(O.relation).indexOf(r);
            return '<li><button type="button" class="relation" data-rel="' + esc(r.nom) + '" aria-label="Voir l\'évolution de la relation avec ' + esc(r.nom) + '">' +
                O.avatar(r.nom, r.photo, 'grand') + '<span class="rel-corps"><span class="rel-tete"><strong>' + esc(r.nom) + '</strong>' + tendance(r) + '</span>' +
                '<span class="role">' + esc([r.role, r.clan].filter(Boolean).join(' · ')) + '</span>' +
                '<span class="rel-coeurs">' + O.coeursAvis(r.dernier, r) + O.courbe(r.avis) + '</span>' +
                (r.dernier.texte ? '<span class="rel-extrait">' + esc(r.dernier.texte) + '</span>' : '') +
                '<span class="rel-nb">' + r.avis.length + ' avis · voir l\'évolution</span></span></button></li>';
        }).join('') + '</ul>';
    }
    function relations(c) {
        var tout = rels(c);
        var legende = '<div class="legende"><span>' + O.icone('coeur') + O.icone('coeur') + O.icone('coeur') + ' Appréciation</span><span>' + O.icone('sombre') + O.icone('sombre') + O.icone('sombre') +
            ' Aversion</span><span>' + O.icone('coeur') + O.icone('sombre') + ' Neutre / mitigé</span><span>' + O.icone('etoile') + ' Respect</span><span>' + O.icone('crane') + ' Décédé(e)</span></div>';
        var evol = evolutions(c).filter(function (e) { return e.prev; }).slice(0, 4);
        var recent = evol.length ? '<aside class="recent"><h2>Derniers changements</h2><ul>' + evol.map(function (e) {
            return '<li><b>' + esc(e.rel.nom) + '</b> <small>' + esc(O.lune(e.avis.lune)) + '</small><span>' + O.coeursAvis(e.prev, e.rel) + ' → ' + O.coeursAvis(e.avis, e.rel) + '</span></li>';
        }).join('') + '</ul></aside>' : '';
        return titre('Réseau de relations', tout.length + ' relation' + (tout.length > 1 ? 's' : '') + ' suivie' + (tout.length > 1 ? 's' : '') + ' — de tous les clans, groupes et rangs') +
            recent + '<div id="rel-filtres">' + relationsFiltres(c) + '</div>' +
            '<label class="recherche"><span class="sr">Rechercher</span><input type="search" id="rel-q" placeholder="Rechercher un chat, un rôle, un clan…" value="' + esc(REL.q) + '"></label>' +
            '<div id="rel-liste">' + relationsListe(c) + '</div>' + legende;
    }
    function fenetreRelation(nom) {
        var r = rels(DONNEES).filter(function (x) { return x.nom === nom; })[0];
        if (!r) return;
        var chrono = r.avis.map(function (a, i) {
            var prev = r.avis[i - 1], d = prev && typeof a.affinite === 'number' && typeof prev.affinite === 'number' ? a.affinite - prev.affinite : 0;
            return '<li><div class="entete-ev"><strong>' + esc(O.lune(a.lune) || 'Date inconnue') + '</strong><span>' + O.coeursAvis(a, r) +
                (d ? '<span class="tend ' + (d > 0 ? 'monte' : 'descend') + '">' + (d > 0 ? '▲' : '▼') + '</span>' : '') + '</span></div>' +
                (a.texte ? '<p>' + riche(a.texte) + '</p>' : '') + '</li>';
        }).reverse().join('');
        var courbeGrande = O.courbe(r.avis, true);
        $('fenetre-corps').innerHTML = '<header class="fen-tete">' + O.avatar(r.nom, r.photo, 'grand') + '<div><h2>' + esc(r.nom) + '</h2><span class="role">' +
            esc([r.role, r.clan, r.joueur].filter(Boolean).join(' · ')) + '</span></div></header>' +
            (courbeGrande ? '<h3>Évolution de l\'affinité</h3>' + courbeGrande : '') +
            '<h3>Historique des avis</h3><ol class="chrono compact">' + (chrono || '<li>Aucun avis noté.</li>') + '</ol>';
        O.avatars($('fenetre-corps'));
        var f = $('fenetre');
        if (f.showModal) f.showModal(); else f.setAttribute('open', '');
    }

    /* ---------- Galerie ---------- */
    function galerie(c) {
        return titre('Galerie d\'art', 'Illustrations, croquis et designs') +
            '<ul class="galerie">' + (c.galerie || []).map(function (g, i) {
                return '<li><button type="button" data-img="' + i + '" aria-label="Agrandir : ' + esc(g.titre) + '">' +
                    '<img src="' + O.miniature(g.fichier) + '" alt="' + esc(g.alt || g.titre) + '" loading="lazy" decoding="async">' +
                    (g.etiquette ? '<span class="badge">' + esc(g.etiquette) + '</span>' : '') + '</button>' +
                    '<div><h3>' + esc(g.titre) + '</h3><p>' + esc(g.texte || '') + '</p>' + (g.auteur ? '<small>' + esc(g.auteur) + '</small>' : '') + '</div></li>';
            }).join('') + '</ul>';
    }

    var VUES = { 'accueil/accueil': accueil, 'elle/noms': noms, 'elle/caractere': caractere, 'elle/physique': physique, 'elle/sante': sante,
        'histoire/chroniques': chroniques, 'histoire/fils': fils, 'entourage/lignee': lignee, 'entourage/relations': relations, 'galerie/galerie': galerie };

    /* ---------- Routage ---------- */
    function route() {
        var h = location.hash.replace(/^#\/?/, '').split('/');
        var page = PAGES.filter(function (p) { return p.id === h[0]; })[0] || PAGES[0];
        var sub = page.subs.filter(function (s) { return s[0] === h[1]; })[0] || page.subs[0];
        return { page: page, sub: sub[0], cle: page.id + '/' + sub[0] };
    }

    function menu(r) {
        var liens = PAGES.map(function (p) {
            return '<a href="#' + p.id + (p.subs.length > 1 || p.id !== p.subs[0][0] ? '/' + p.subs[0][0] : '') + '"' + (p.id === r.page.id ? ' aria-current="page"' : '') + '>' +
                '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + p.icone + '"/></svg><span>' + p.nom + '</span></a>';
        }).join('');
        $('menu').innerHTML = liens;
        $('bas').innerHTML = liens;
        var sous = $('sous');
        if (r.page.subs.length > 1) {
            sous.hidden = false;
            sous.innerHTML = r.page.subs.map(function (s) {
                return '<a href="#' + r.page.id + '/' + s[0] + '"' + (s[0] === r.sub ? ' aria-current="page"' : '') + '>' + s[1] + '</a>';
            }).join('');
        } else sous.hidden = true;
    }

    function pagination(cle) {
        var i = ORDRE.indexOf(cle);
        function nom(k) { var p = k.split('/'); var pg = PAGES.filter(function (x) { return x.id === p[0]; })[0]; return pg.subs.filter(function (s) { return s[0] === p[1]; })[0][1]; }
        return '<nav class="pagination" aria-label="Pages voisines">' +
            (i > 0 ? '<a href="#' + ORDRE[i - 1] + '" rel="prev"><small>Précédent</small>← ' + nom(ORDRE[i - 1]) + '</a>' : '<span></span>') +
            (i < ORDRE.length - 1 ? '<a href="#' + ORDRE[i + 1] + '" rel="next"><small>Suivant</small>' + nom(ORDRE[i + 1]) + ' →</a>' : '<span></span>') + '</nav>';
    }

    function afficher(saut) {
        if (!DONNEES) return;
        var r = route(), c = DONNEES, na = nomActuel(c);
        document.title = (r.cle === 'accueil/accueil' ? '' : r.page.subs.filter(function (s) { return s[0] === r.sub; })[0][1] + ' · ') + na.nom + ' — ' + ((c.fiche || {}).clan || '');
        $('marque-nom').textContent = na.nom;
        $('pied').textContent = (c.fiche || {}).pied || '';
        menu(r);
        var vue = $('vue');
        vue.className = 'vue v-' + r.page.id;
        vue.innerHTML = VUES[r.cle](c) + (r.cle === 'accueil/accueil' ? '' : pagination(r.cle));
        O.avatars(vue);
        if (saut) {
            $('principal').focus({ preventScroll: true });
            window.scrollTo({ top: 0 });
            var actif = $('sous').querySelector('[aria-current]');
            if (actif && actif.scrollIntoView) actif.scrollIntoView({ block: 'nearest', inline: 'center' });
        }
    }
    window.addEventListener('hashchange', function () { afficher(true); });

    /* ---------- Interactions (délégation : survit aux mises à jour) ---------- */
    $('principal').addEventListener('click', function (e) {
        var b;
        if ((b = e.target.closest('[data-fil]'))) { FIL.f = b.dataset.fil; afficher(); return; }
        if ((b = e.target.closest('[data-sante]'))) { SANTE.f = b.dataset.sante; afficher(); return; }
        if ((b = e.target.closest('[data-chap]'))) { CHAP.i = Number(b.dataset.chap); afficher(); return; }
        if ((b = e.target.closest('[data-clan]'))) { REL.clan = b.dataset.clan; majRelations(); return; }
        if ((b = e.target.closest('[data-aff]'))) { REL.aff = b.dataset.aff; majRelations(); return; }
        if ((b = e.target.closest('[data-rel]'))) { fenetreRelation(b.dataset.rel); return; }
        if ((b = e.target.closest('[data-img]')) && DONNEES) {
            var it = DONNEES.galerie[Number(b.dataset.img)], v = $('visionneuse');
            v.querySelector('img').src = O.url(it.fichier);
            v.querySelector('img').alt = it.alt || it.titre || '';
            v.querySelector('p').textContent = (it.titre || '') + (it.auteur ? ' — ' + it.auteur : '');
            if (v.showModal) v.showModal(); else v.setAttribute('open', '');
        }
    });
    $('principal').addEventListener('input', function (e) {
        if (e.target.id === 'rel-q') { REL.q = e.target.value; $('rel-liste').innerHTML = relationsListe(DONNEES); O.avatars($('rel-liste')); }
    });
    function majRelations() {
        $('rel-filtres').innerHTML = relationsFiltres(DONNEES);
        $('rel-liste').innerHTML = relationsListe(DONNEES);
        O.avatars($('rel-liste'));
    }
    ['visionneuse', 'fenetre'].forEach(function (id) {
        var d = $(id);
        d.addEventListener('click', function (e) { if (e.target === d || e.target.className === 'fermer') d.close(); });
    });

    window.Donnees.charger(function (c) { DONNEES = c; afficher(); });
})();
