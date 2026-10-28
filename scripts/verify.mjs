import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {Script} from 'node:vm';
const root=new URL('../',import.meta.url);
const manifest=JSON.parse(readFileSync(new URL('SOURCE.json',root),'utf8'));
for(const [path,expected] of Object.entries(manifest.files)){
 const bytes=readFileSync(new URL(path,root));
 if(createHash('sha256').update(bytes).digest('hex')!==expected)throw new Error('Published checksum mismatch: '+path);
}
const html=readFileSync(new URL('public/index.html',root),'utf8');
for(const [i,s] of [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].entries())new Script(s[1],{filename:`inline-${i}.js`});
new Script(readFileSync(new URL('public/workspace.js',root),'utf8'),{filename:'workspace.js'});
for(const m of html.matchAll(/\b(?:src|href)=["']([^"']+)["']/gi)){
 const p=m[1];if(p.startsWith('#')||/^[a-z]+:/i.test(p))continue;
 if(!existsSync(new URL('public/'+p,root)))throw new Error('Missing local asset '+p);
}
console.log('PASS: both published source checksums match; JavaScript parses; local assets exist.');
