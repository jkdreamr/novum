// Regenerates public/fonts/serif_novum.typeface.json — the tiny typeface subset
// used by the intro's 3D glass text. It reads three.js's bundled Droid Serif
// typeface, keeps only the glyphs needed for "novum", and validates the result
// parses with three's FontLoader. Run from the repo root:  node scripts/subset-font.mjs
import fs from 'node:fs';

const SRC = 'node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json';
const OUT = 'public/fonts/serif_novum.typeface.json';
const CHARS = ['n', 'o', 'v', 'u', 'm', ' '];

const src = JSON.parse(fs.readFileSync(SRC, 'utf8'));
const glyphs = {};
for (const c of CHARS) if (src.glyphs[c]) glyphs[c] = src.glyphs[c];
fs.mkdirSync('public/fonts', { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ ...src, glyphs }));
console.log('subset glyphs:', Object.keys(glyphs).map((c) => (c === ' ' ? '␠' : c)).join(','));
console.log('size bytes:', fs.statSync(OUT).size);

// NB: dynamic import is resolved relative to THIS file (scripts/), unlike the fs paths above.
const { FontLoader } = await import('../node_modules/three/examples/jsm/loaders/FontLoader.js');
const font = new FontLoader().parse(JSON.parse(fs.readFileSync(OUT, 'utf8')));
console.log('FontLoader OK — generateShapes("novum") ->', font.generateShapes('novum', 1).length, 'shapes');
