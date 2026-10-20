/* OUTILS — petites fonctions partagées (site et dashboard). */
(function () {
    'use strict';

    function esc(t) {
        return String(t == null ? '' : t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    // Texte avec mise en forme minimale : seuls <b>, <i>, <em>, <strong> sont conservés
    function riche(t) {
        return esc(t).replace(/&lt;(\/?)(b|i|em|strong)&gt;/g, '<$1$2>');
    }

    // Nom de fichier -> adresse (https://… tel quel, sinon dossier assets/photos/)
    function url(f) {
        return /^https?:\/\//.test(f) ? f : 'assets/photos/' + encodeURIComponent(f);
    }
    // Miniature : nom-m.webp pour les illustrations locales, sinon l'image elle-même
    function miniature(f) {
        return /^https?:\/\//.test(f) ? f : url(String(f).replace(/\.webp$/, '-m.webp'));
    }

    function avatar(nom, fichier, classe) {
        var ini = esc(String(nom || '?').trim().charAt(0).toUpperCase());
        var img = fichier ? '<img src="' + url(fichier) + '" alt="" width="72" height="72" loading="lazy" decoding="async">' : '';
        return '<div class="avatar ' + (classe || '') + '" data-initiale="' + ini + '">' + img + '</div>';
    }
    // Retire les images introuvables pour laisser voir l'initiale
    function avatars(racine) {
        Array.prototype.forEach.call((racine || document).querySelectorAll('.avatar img'), function (img) {
            function retirer() { if (img.parentNode) img.parentNode.removeChild(img); }
            img.addEventListener('error', retirer);
            if (img.complete && img.naturalWidth === 0) retirer();
        });
    }

    var CHEMINS = {
        coeur: 'M12 20.5C5 15.6 2.5 12 2.5 8.6 2.5 6 4.5 4 7 4c1.9 0 3.7 1.1 5 3 1.3-1.9 3.1-3 5-3 2.5 0 4.5 2 4.5 4.6 0 3.4-2.5 7-9.5 11.9z',
        etoile: 'M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7.3L12 17.8 5.7 21.5l1.7-7.3L2 9.5l7.1-.6z',
        crane: 'M12 3C7.6 3 4.5 6 4.5 10c0 2.4 1.1 4.2 2.5 5.2V19h2v-2h1.5v2h3v-2H15v2h2v-3.8c1.4-1 2.5-2.8 2.5-5.2C19.5 6 16.4 3 12 3zM8.7 9.2a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8zm6.6 0a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8z'
    };
    function icone(n) {
        return '<svg class="sym sym-' + n + '" viewBox="0 0 24 24" aria-hidden="true"><path d="' + CHEMINS[n === 'sombre' ? 'coeur' : n] + '"' + (n === 'crane' ? ' fill-rule="evenodd"' : '') + '/></svg>';
    }
    // affinite : 1 à 3 = appréciation, -1 à -3 = aversion, 0 = neutre ; mitige = + un cœur sombre
    function coeurs(r) {
        var s = '', sens = [], a = r.affinite;
        if (typeof a === 'number') {
            if (a > 0) { s += new Array(a + 1).join(icone('coeur')); sens.push('appréciation ' + a + '/3'); }
            else if (a < 0) { s += new Array(-a + 1).join(icone('sombre')); sens.push('aversion ' + (-a) + '/3'); }
            else { s += icone('coeur') + icone('sombre'); sens.push('neutre'); }
        }
        if (r.mitige) { s += icone('sombre'); sens.push('mitigé'); }
        if (r.respect) { s += icone('etoile'); sens.push('respect'); }
        if (r.mort) { s += icone('crane'); sens.push('décédé(e)'); }
        return s ? '<span class="coeurs" role="img" aria-label="' + esc(sens.join(', ')) + '">' + s + '</span>' : '';
    }

    window.Outils = { esc: esc, riche: riche, url: url, miniature: miniature, avatar: avatar, avatars: avatars, icone: icone, coeurs: coeurs };
})();
