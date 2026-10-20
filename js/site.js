/* ==========================================================================
   SITE — affiche le contenu (Donnees.charger) et gère les onglets.
   ========================================================================== */
(function () {
    'use strict';

    var O = window.Outils, esc = O.esc, riche = O.riche;
    var $ = function (id) { return document.getElementById(id); };

    /* ---------- Petits gabarits ---------- */
    function titre(h, sous) {
        return '<header class="entete"><h2>' + esc(h) + '</h2>' + (sous ? '<p>' + esc(sous) + '</p>' : '') + '</header>';
    }
    function paras(liste) {
        return (liste || []).map(function (p) { return '<p>' + riche(p.texte) + '</p>'; }).join('');
    }
    function pliant(h, corps, ouvert) {
        return '<details class="pliant"' + (ouvert ? ' open' : '') + '><summary><span>' + esc(h) + '</span><i aria-hidden="true"></i></summary><div class="pliant-corps">' + corps + '</div></details>';
    }
    function traits(liste, classe) {
        return '<ul class="traits ' + (classe || '') + '">' + (liste || []).map(function (t) {
            return '<li><h4>' + esc(t.nom) + '</h4><p>' + riche(t.texte) + '</p>' + (t.note ? '<small>' + esc(t.note) + '</small>' : '') + '</li>';
        }).join('') + '</ul>';
    }
    function bloc(classe, h, liste) {
        return '<div class="gout ' + classe + '"><h4>' + h + '</h4>' + (liste || []).map(function (t) {
            return '<div><h5>' + esc(t.nom) + '</h5><p>' + riche(t.texte) + '</p></div>';
        }).join('') + '</div>';
    }

    /* ---------- Rubriques ---------- */
    function profil(c) {
        var noms = c.noms || [];
        return titre('Nomenclature', 'Les noms qu\'elle portera, de la chatonne à l\'ancêtre') +
            '<ol class="frise">' + noms.map(function (n, i) {
                return '<li' + (i === 0 ? ' class="actuel"' : '') + '><span class="etape">' + esc(n.etape) + '</span>' +
                    '<strong>' + esc(n.nom) + '</strong>' +
                    (n.periode ? '<span class="periode">' + esc(n.periode) + '</span>' : '') +
                    (n.citation ? '<blockquote>' + riche(n.citation) + '</blockquote>' : '') +
                    (n.note ? '<small>' + esc(n.note) + '</small>' : '') + '</li>';
            }).join('') + '</ol>';
    }

    function caractere(c) {
        var p = c.personnalite || {};
        return titre('Caractère & Personnalité') +
            '<div class="texte lettrine">' + paras(p.paragraphes) + '</div>' +
            '<div class="pliants">' +
            pliant('Qualités', traits(p.qualites, 'positif'), true) +
            pliant('Défauts', traits(p.defauts, 'negatif')) +
            pliant('Goûts & dégoûts',
                '<div class="duo">' + bloc('aime', 'J\'aime beaucoup', p.aime) + bloc('aimepas', 'Je n\'aime pas', p.aimepas) + '</div>' +
                (p.gouts_note ? '<p class="note">' + esc(p.gouts_note) + '</p>' : '')) +
            pliant('Peurs & phobies', (p.peurs || []).map(function (x) { return '<blockquote class="mot">' + riche(x.texte) + '</blockquote>'; }).join('')) +
            pliant('Habitudes & échos', traits(p.habitudes)) +
            '</div>';
    }

    function apparence(c) {
        var a = c.apparence || {};
        var marques = '<ul class="traits">' + (a.marques || []).map(function (m) {
            return '<li><h4>' + esc(m.nom) + '</h4><p class="vide">' + esc(m.texte) + '</p>' + (m.note ? '<small>' + esc(m.note) + '</small>' : '') + '</li>';
        }).join('') + '</ul>';
        return titre('Apparence physique') +
            '<div class="texte lettrine">' + paras(a.paragraphes) + '</div>' +
            '<div class="pliants">' +
            pliant('Points forts', traits(a.forts, 'positif'), true) +
            pliant('Points faibles', traits(a.faibles, 'negatif')) +
            pliant('Marques & attributs', marques) + '</div>';
    }

    function histoire(c) {
        var ch = (c.histoire && c.histoire.chapitres) || [];
        var nav = ch.map(function (x, i) {
            return '<button type="button" role="tab" aria-selected="' + (i === 0) + '" data-i="' + i + '">Chapitre ' + (i + 1) + '</button>';
        }).join('');
        var corps = ch.map(function (x, i) {
            return '<article class="chapitre' + (x.avenir ? ' avenir' : '') + '" role="tabpanel"' + (i ? ' hidden' : '') + '>' +
                '<header><h3>Chapitre ' + (i + 1) + ' · ' + esc(x.titre) + '</h3><span class="age">Âge : ' + esc(x.age) + '</span></header>' +
                '<div class="texte">' + paras(x.paragraphes) + '</div>' +
                (x.citation ? '<blockquote>' + riche(x.citation) + '</blockquote>' : '') + '</article>';
        }).join('');
        return titre('Histoire & Chroniques') + '<div class="chap-nav" role="tablist">' + nav + '</div>' + corps;
    }

    var ETIQUETTE = { vivant: 'Vivant(e)', decede: 'Décédé(e)', disparu: 'Disparu(e)', vide: '' };
    function carte(m) {
        var statut = m.statut || 'vivant';
        if (statut === 'vide') {
            return '<li class="membre vide"><div><h4>' + esc(m.nom) + '</h4><p>' + riche(m.texte) + '</p></div></li>';
        }
        return '<li class="membre ' + esc(statut) + (m.mise ? ' mise' : '') + '">' + O.avatar(m.nom, m.photo) +
            '<div><h4>' + esc(m.nom) + (m.tag ? ' <span class="tag">' + esc(m.tag) + '</span>' : '') + '</h4>' +
            '<span class="role">' + esc(m.role || '') + (m.joueur ? ' · <b>' + esc(m.joueur) + '</b>' : '') + '</span>' +
            (m.texte ? '<p>' + riche(m.texte) + '</p>' : '') + '</div>' +
            (statut !== 'vivant' ? '<em class="etat">' + ETIQUETTE[statut] + '</em>' : '') + '</li>';
    }
    function genealogie(c) {
        var g = c.genealogie || {};
        return titre('Généalogie & Lignée', g.origine) + (g.groupes || []).map(function (gr, i) {
            return '<section class="groupe"><h3><span>' + ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][i] + '</span>' + esc(gr.titre) + '</h3><ul class="membres">' + (gr.membres || []).map(carte).join('') + '</ul></section>';
        }).join('');
    }

    function relations(c) {
        var index = '<div class="legende"><span>' + O.icone('coeur') + O.icone('coeur') + O.icone('coeur') + ' Appréciation</span>' +
            '<span>' + O.icone('sombre') + O.icone('sombre') + O.icone('sombre') + ' Aversion</span>' +
            '<span>' + O.icone('coeur') + O.icone('sombre') + ' Neutre / mitigé</span>' +
            '<span>' + O.icone('etoile') + ' Respect</span><span>' + O.icone('crane') + ' Décédé(e)</span></div>';
        return titre('Réseau de relations', 'Les fils qu\'elle tisse avec les chats de la lande') + index +
            '<ul class="fils">' + (c.relations || []).map(function (r) {
                return '<li class="relation">' + O.avatar(r.nom, r.photo, 'grand') + '<div><header><h3>' + esc(r.nom) + '</h3>' + O.coeurs(r) + '</header>' +
                    '<span class="role">' + esc(r.role || '') + (r.joueur ? ' · <b>' + esc(r.joueur) + '</b>' : '') + '</span><p>' + riche(r.texte) + '</p></div></li>';
            }).join('') + '</ul>';
    }

    function galerie(c) {
        return titre('Galerie d\'art', 'Illustrations, croquis et designs de Petite Mygale') +
            '<ul class="galerie">' + (c.galerie || []).map(function (g, i) {
                return '<li><button type="button" data-i="' + i + '" aria-label="Agrandir : ' + esc(g.titre) + '">' +
                    '<img src="' + O.miniature(g.fichier) + '" alt="' + esc(g.alt || g.titre) + '" loading="lazy" decoding="async">' +
                    (g.etiquette ? '<span class="badge">' + esc(g.etiquette) + '</span>' : '') + '</button>' +
                    '<div><h4>' + esc(g.titre) + '</h4><p>' + esc(g.texte || '') + '</p>' + (g.auteur ? '<small>' + esc(g.auteur) + '</small>' : '') + '</div></li>';
            }).join('') + '</ul>';
    }

    /* ---------- Fiche latérale ---------- */
    function lateral(c) {
        var f = c.fiche || {};
        $('clan').textContent = f.clan || '';
        $('devise').textContent = f.devise || '';
        $('fiche').innerHTML = (f.lignes || []).map(function (l) {
            return '<div><dt>' + esc(l.label) + '</dt><dd>' + esc(l.valeur) + '</dd></div>';
        }).join('') +
            '<div class="stat"><dt>Santé (PV)</dt><dd>' + esc(f.pv || '') + '</dd></div>' +
            '<div class="stat"><dt>Énergie (PA)</dt><dd>' + esc(f.pa || '') + '</dd></div>';
        $('pied').textContent = f.pied || '';
    }

    var DONNEES = null;

    function rendre(c) {
        DONNEES = c;
        lateral(c);
        $('p-profil').innerHTML = profil(c);
        $('p-caractere').innerHTML = caractere(c);
        $('p-apparence').innerHTML = apparence(c);
        $('p-histoire').innerHTML = histoire(c);
        $('p-genealogie').innerHTML = genealogie(c);
        $('p-relations').innerHTML = relations(c);
        $('p-galerie').innerHTML = galerie(c);
        O.avatars(document);
    }

    /* ---------- Onglets (par adresse #…) ---------- */
    var IDS = ['profil', 'caractere', 'apparence', 'histoire', 'genealogie', 'relations', 'galerie'];
    function aller(saut) {
        var id = location.hash.slice(1);
        if (IDS.indexOf(id) < 0) id = IDS[0];
        IDS.forEach(function (x) { $('p-' + x).classList.toggle('actif', x === id); });
        Array.prototype.forEach.call($('onglets').children, function (a) {
            if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
        });
        if (saut === true) {
            // mobile : on revient en haut du contenu (juste sous les onglets), pas du bandeau
            var haut = window.innerWidth <= 900 ? $('principal').getBoundingClientRect().top + window.scrollY - 64 : 0;
            window.scrollTo({ top: Math.max(0, haut) });
        }
        var actif = $('onglets').querySelector('[aria-current]');
        if (actif && actif.scrollIntoView) actif.scrollIntoView({ block: 'nearest', inline: 'center' });
    }
    window.addEventListener('hashchange', function () { aller(true); });

    /* ---------- Chapitres et visionneuse (délégation : survit aux mises à jour) ---------- */
    $('principal').addEventListener('click', function (e) {
        var b = e.target.closest('.chap-nav button');
        if (b) {
            var rac = b.closest('.panneau');
            Array.prototype.forEach.call(rac.querySelectorAll('.chap-nav button'), function (x) { x.setAttribute('aria-selected', x === b); });
            Array.prototype.forEach.call(rac.querySelectorAll('.chapitre'), function (x, i) { x.hidden = i !== Number(b.dataset.i); });
            return;
        }
        var g = e.target.closest('.galerie button');
        if (g && DONNEES) {
            var it = DONNEES.galerie[Number(g.dataset.i)], v = $('visionneuse');
            v.querySelector('img').src = O.url(it.fichier);
            v.querySelector('img').alt = it.alt || it.titre || '';
            v.querySelector('p').textContent = (it.titre || '') + (it.auteur ? ' — ' + it.auteur : '');
            if (v.showModal) v.showModal(); else v.setAttribute('open', '');
        }
    });
    var vis = $('visionneuse');
    vis.addEventListener('click', function (e) { if (e.target === vis || e.target.className === 'fermer') vis.close(); });

    window.Donnees.charger(function (c) { rendre(c); aller(); });
})();
