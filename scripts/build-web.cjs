const fs = require('node:fs');
const path = require('node:path');
const esbuild = require('esbuild');
const root = path.resolve(__dirname, '..');
const www = path.join(root, 'www');
fs.rmSync(www, {recursive:true, force:true});
fs.cpSync(path.join(root, 'web'), www, {recursive:true});
fs.mkdirSync(path.join(www,'vendor'), {recursive:true});
for (const [entry, out] of [
  ['src/supabase-entry.js','vendor/supabase.js'],
  ['src/native-bridge.js','vendor/native-bridge.js']
]) {
  esbuild.buildSync({
    entryPoints: [path.join(root, entry)],
    outfile: path.join(www, out),
    bundle: true,
    platform: 'browser',
    format: 'iife',
    target: ['chrome96'],
    minify: true,
    logLevel: 'warning'
  });
}
console.log('Aset Android + Supabase SDK offline-ready di ./www');
