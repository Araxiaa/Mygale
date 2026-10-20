/* AMBIANCE — poussières dorées portées par le vent de la lande (canvas léger).
   S'arrête si l'onglet est masqué ou si « réduire les animations » est activé. */
(function () {
    'use strict';
    var cv = document.getElementById('poussiere');
    if (!cv || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    var ctx = cv.getContext('2d'), w, h, grains = [], actif = true, raf;
    var N = window.innerWidth < 700 ? 16 : 34;

    function taille() {
        var d = Math.min(window.devicePixelRatio || 1, 2);
        w = cv.width = innerWidth * d; h = cv.height = innerHeight * d;
    }
    function grain() {
        return { x: Math.random() * w, y: Math.random() * h, r: (Math.random() * 1.6 + .5) * (w / innerWidth),
                 v: Math.random() * .35 + .15, d: Math.random() * 6.28, a: Math.random() * .45 + .15 };
    }
    function dessiner(t) {
        ctx.clearRect(0, 0, w, h);
        for (var i = 0; i < grains.length; i++) {
            var g = grains[i];
            g.x += g.v * 1.6; g.y += Math.sin(t / 1800 + g.d) * .35 - .05;
            if (g.x > w + 10) { g.x = -10; g.y = Math.random() * h; }
            if (g.y < -10) g.y = h + 10; else if (g.y > h + 10) g.y = -10;
            ctx.beginPath(); ctx.arc(g.x, g.y, g.r, 0, 6.283);
            ctx.fillStyle = 'rgba(236,184,103,' + g.a + ')'; ctx.fill();
        }
        if (actif) raf = requestAnimationFrame(dessiner);
    }
    taille();
    for (var i = 0; i < N; i++) grains.push(grain());
    addEventListener('resize', taille);
    document.addEventListener('visibilitychange', function () {
        actif = !document.hidden;
        if (actif) raf = requestAnimationFrame(dessiner); else cancelAnimationFrame(raf);
    });
    raf = requestAnimationFrame(dessiner);
})();
