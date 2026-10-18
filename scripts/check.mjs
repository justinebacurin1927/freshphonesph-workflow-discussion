import {readFile,access} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
import {slides,chapters,decisions} from '../dist/slides.js';
const root=fileURLToPath(new URL('../',import.meta.url));
for(const file of ['dist/app.js','dist/slides.js','scripts/serve.mjs']){
 const result=spawnSync(process.execPath,['--check',path.join(root,file)],{encoding:'utf8'});
 assert.equal(result.status,0,result.stderr);
}
const unique=(items,label)=>assert.equal(new Set(items).size,items.length,`${label} must be unique`);
unique(slides.map(s=>s.id),'Slide IDs');
unique(decisions.map(d=>d.id),'Decision IDs');
const chapterIDs=new Set(chapters.map(c=>c.id));
for(const slide of slides){
 assert(chapterIDs.has(slide.chapter),`Unknown chapter on ${slide.id}`);
 for(const key of ['id','type','title','summary','notes','source','status'])assert(slide[key],`Missing ${key} on ${slide.id}`);
 for(const [,asset] of slide.images||[])await access(path.join(root,'dist',asset));
 for(const [,asset] of slide.desktopImages||[])await access(path.join(root,'dist',asset));
}
const html=await readFile(path.join(root,'dist/index.html'),'utf8');
for(const asset of [...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map(m=>m[1])){
 if(!/^(?:https?:|mailto:)/.test(asset))await access(path.join(root,'dist',asset.split(/[?#]/)[0]));
}
const hosting=JSON.parse(await readFile(path.join(root,'.openai/hosting.json'),'utf8'));
assert.equal(hosting.static.directory,'dist');
for(const font of ['Sora-Variable.ttf','DMSans-Variable.ttf','Sora-OFL.txt','DMSans-OFL.txt'])await access(path.join(root,'dist/assets/fonts',font));
console.log(`Checked ${slides.length} slides, ${chapters.length} chapters, ${decisions.length} discussion prompts, local assets, and JavaScript syntax.`);
