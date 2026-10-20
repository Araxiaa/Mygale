// npm run deploy            -> publie le site sur GitHub (GitHub Pages)
// npm run deploy -- "texte" -> avec ton propre message de commit
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const racine = path.join(__dirname, '..');
const DEPOT = 'https://github.com/Araxiaa/Mygale.git';
const BRANCHE = 'main';

function git(args, opts) {
    return spawnSync('git', args, Object.assign({ cwd: racine, encoding: 'utf8' }, opts));
}
function lance(args, titre) {
    console.log('› ' + (titre || 'git ' + args.join(' ')));
    const r = git(args, { stdio: 'inherit' });
    if (r.status !== 0) { console.error('\n✗ Échec : git ' + args.join(' ')); process.exit(r.status || 1); }
}
const sortie = (args) => (git(args).stdout || '').trim();

// 1. Dépôt propre à ce dossier (le dossier est dans un autre dépôt Git : on ne le mélange pas)
if (!fs.existsSync(path.join(racine, '.git'))) lance(['init', '-b', BRANCHE], 'Création du dépôt local');
if (sortie(['branch', '--show-current']) !== BRANCHE) git(['checkout', '-B', BRANCHE]);

// 2. Adresse GitHub
const actuel = sortie(['remote', 'get-url', 'origin']);
if (!actuel) lance(['remote', 'add', 'origin', DEPOT], 'Liaison avec ' + DEPOT);
else if (actuel !== DEPOT) lance(['remote', 'set-url', 'origin', DEPOT]);

// 3. Fichiers générés + GitHub Pages sans Jekyll
spawnSync('node', [path.join(__dirname, 'schema.js')], { cwd: racine, stdio: 'inherit' });
fs.writeFileSync(path.join(racine, '.nojekyll'), '');

// 4. Commit
lance(['add', '-A'], 'Ajout des fichiers modifiés');
const message = process.argv.slice(2).join(' ') || 'Mise à jour du site — ' + new Date().toLocaleString('fr-FR');
if (git(['diff', '--cached', '--quiet']).status !== 0) lance(['commit', '-m', message], 'Commit : ' + message);
else console.log('› Rien de nouveau à enregistrer.');

// 5. Reprend l'historique déjà présent sur GitHub (ancienne version) sans rien écraser :
//    le contenu local reste la référence.
console.log('› Lecture de GitHub');
if (git(['fetch', 'origin', BRANCHE], { stdio: 'inherit' }).status === 0) {
    if (git(['merge-base', 'HEAD', 'origin/' + BRANCHE]).status !== 0) {
        lance(['merge', 'origin/' + BRANCHE, '-s', 'ours', '--allow-unrelated-histories', '-m', 'Reprise de l\'ancienne version du site'], 'Rattachement à l\'ancien historique');
    } else if (git(['merge-base', '--is-ancestor', 'origin/' + BRANCHE, 'HEAD']).status !== 0) {
        lance(['merge', 'origin/' + BRANCHE, '-X', 'ours', '-m', 'Fusion avec GitHub']);
    }
}

// 6. Envoi
lance(['push', '-u', 'origin', BRANCHE], 'Envoi vers GitHub');
console.log('\n✓ Site publié : https://araxiaa.github.io/Mygale/  (compte 1 à 2 minutes)');
