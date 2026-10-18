import {chapters,slides,decisions} from './slides.js';

const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>[...root.querySelectorAll(s)];
const escapeHTML=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const paths={
 'arrow-right':'<path d="M4 12h15m-6-6 6 6-6 6"/>',
 'arrow-left':'<path d="M20 12H5m6-6-6 6 6 6"/>',
 expand:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',
 grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
 print:'<path d="M7 8V3h10v5M6 17H4V9h16v8h-2"/><path d="M7 14h10v7H7zM17 11h.01"/>',
 notes:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
 edit:'<path d="m15 4 5 5M4 20l5-1L21 7l-5-5L4 14z"/>',
 link:'<path d="m10 14 4-4m-6 6-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m2 10a4 4 0 0 0 6 0l5-5a4 4 0 0 0-6-6l-2 2" transform="translate(1 0) scale(.9)"/>',
 close:'<path d="m6 6 12 12M6 18 18 6"/>',
 download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
 records:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 12h3m3 0h2M8 16h3m3 0h2"/>',
 receipt:'<path d="M5 3h14v18l-3-2-4 2-4-2-3 2zM9 7h6M9 11h6M9 15h3"/>',
 chart:'<path d="M4 3v17h17M8 15v-4m5 4V6m5 9V9"/>',
 user:'<circle cx="12" cy="7" r="4"/><path d="M4 21v-3a8 8 0 0 1 16 0v3"/>',
 check:'<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 6-6"/>',
 shield:'<path d="m12 2 8 3v7c0 5-8 10-8 10S4 17 4 12V5z"/><path d="m8 11 3 3 5-5"/>',
 message:'<path d="M21 11a9 9 0 0 1-9 9H3l2-5a9 9 0 1 1 16-4Z"/><path d="M8 10h8M8 14h5"/>',
 play:'<path d="m9 5 10 7-10 7z"/>',
};
const icon=name=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.check}</svg>`;
const statuses={existing:'Existing prototype',documented:'Client workflow',proposed:'Proposed design',decision:'Client decision',expected:'Expected outcome',discussion:'Discussion',reference:'Reference'};
const card=(title,body,extra='')=>`<article class="content-card ${extra}"><h3>${escapeHTML(title)}</h3><p>${escapeHTML(body)}</p></article>`;
const callout=s=>s.callout?`<div class="callout"><span class="callout-mark" aria-hidden="true">↳</span><p>${escapeHTML(s.callout)}</p></div>`:'';
const title=s=>`<div class="slide-heading"><span class="eyebrow">${escapeHTML(s.eyebrow)}</span><h1 tabindex="-1">${escapeHTML(s.title)}</h1><p class="slide-summary">${escapeHTML(s.summary)}</p></div>`;
const node=(name,extra='')=>`<div class="org-node ${extra}">${name}</div>`;

function body(s){
 switch(s.type){
  case 'cover':return `<div class="cover-layout"><div class="cover-copy"><div class="cover-kicker"><span class="tiny-star">✦</span> A CLIENT DISCUSSION</div><h1 tabindex="-1">From prototype<br>to <em>aligned</em><br>operations.</h1><p>${escapeHTML(s.summary)}</p><button class="cover-start" data-action="next">Let's walk through it ${icon('arrow-right')}</button><div class="cover-bottom"><span>PROTOTYPE</span><span>WORKFLOW</span><span>IMPLEMENTATION</span><span>OUTCOME</span></div></div><div class="cover-visual" aria-label="A working prototype and client workflow lead to an aligned system"><div class="diagram-label">THE NEXT CHAPTER <span>↗</span></div><div class="cover-path"><div class="path-card"><span class="path-no">01</span><div><small>OUR STARTING POINT</small><strong>The prototype</strong><p>A working foundation</p></div><span class="path-symbol">↗</span></div><div class="path-connector"><span></span><b>+</b><span></span></div><div class="path-card"><span class="path-no">02</span><div><small>THE OPERATING MODEL</small><strong>Your workflow</strong><p>People, rules, and handoffs</p></div><span class="path-symbol">↗</span></div><div class="path-connector down">↓</div><div class="path-card result"><span class="path-no">03</span><div><small>THE SHARED DIRECTION</small><strong>An aligned system</strong><p>Clear ownership. Reliable records.</p></div><span class="path-symbol">✦</span></div></div><div class="diagram-foot">Built around the way your team works.</div><span class="orbit orbit-one"></span><span class="orbit orbit-two"></span></div></div>`;
  case 'foundation':return `<div class="foundation-grid">${s.items.map(([i,t,d])=>`<article class="foundation-card"><span class="feature-icon">${icon(i)}</span><h3>${t}</h3><p>${d}</p></article>`).join('')}</div>${callout(s)}`;
  case 'prototype':return `<div class="prototype-layout"><div class="prototype-copy">${s.items.map(([t,d],i)=>`<div class="numbered-row"><span>0${i+1}</span><div><h3>${t}</h3><p>${d}</p></div></div>`).join('')}<div class="capture-label"><span class="status-dot"></span> Earlier prototype capture<br><small>27 Sep 2026 · synthetic demo account</small></div></div><div class="prototype-view"><div class="capture-tabs" role="group" aria-label="Prototype screenshots">${s.images.map(([t,p],i)=>`<button data-capture="${i}" aria-pressed="${i===0}">${t}</button>`).join('')}</div><div class="phone-frame"><img src="${s.images[0][1]}" alt="Earlier synthetic-account customer portal overview" width="390" height="844" loading="lazy"></div></div></div>`;
  case 'demo':return `<div class="demo-steps">${s.steps.map(([n,t,d])=>`<article><span class="large-number">${n}</span><div class="demo-step-rule"></div><h3>${t}</h3><p>${d}</p></article>`).join('')}</div>${callout(s)}`;
  case 'channels':return `<div class="channel-grid">${s.items.map(([i,t,k,items],n)=>`<article class="channel-card channel-${n}"><span class="feature-icon">${icon(i)}</span><span class="channel-kicker">${k}</span><h3>${t}</h3><ul>${items.map(x=>`<li>${x}</li>`).join('')}</ul></article>`).join('')}</div>`;
  case 'organization':return `<div class="org-chart" aria-label="Organization chart"><div class="org-trunk">${node('Chief Executive Officer<br><small>CEO</small>','executive')}<span class="org-arrow">↓</span>${node('Chief Operating Officer<br><small>COO</small>','coo')}<span class="org-arrow">↓</span></div><div class="org-branches"><div class="org-branch">${node('Batch<br>Manager')}<span class="org-arrow">↓</span>${node('Batch<br>Handlers','team')}</div><div class="org-branch">${node('HR & Payroll<br>Officer')}</div><div class="org-branch">${node('Records &<br>Monitoring<br>Officer')}</div><div class="org-branch">${node('Finance<br>Officer')}</div><div class="org-branch">${node('KPI<br>Officer')}</div><div class="org-branch">${node('Operations<br>Coordinator &<br>Moderator')}<span class="org-arrow">↓</span>${node('Pioneer<br>Agents','team')}<span class="org-arrow">↓</span>${node('Agents','team')}</div><div class="org-branch">${node('Customer Service<br>Representative<br><small>CSR</small>')}</div></div></div><div class="org-caption">Supervisor → direct report <span>Role categories, not headcounts</span></div>`;
  case 'onboarding':return `<div class="linear-flow onboarding-flow">${s.steps.map(([t,d],i)=>`<article class="flow-node ${i>2?'website-node':''}"><span class="flow-number">0${i+1}</span><h3>${t}</h3><p>${d}</p></article>`).join('')}</div><div class="two-columns">${s.items.map(([t,d])=>card(t,d)).join('')}</div>`;
  case 'memberJourney':return `<div class="linear-flow member-flow">${s.steps.map(([r,t],i)=>`<article class="flow-node ${i===1?'threshold-node':''}"><span class="flow-number">${i===1?'8':'0'+(i+1)}</span><small>${r}</small><h3>${t}</h3></article>`).join('')}</div>${callout(s)}<div class="flow-footnotes"><span>Recruitment & screening</span><span>Batch ID & enrollment</span><span>Readiness & official start</span></div>`;
  case 'comparison':return `<div class="comparison-grid">${[s.left,s.right].map((x,i)=>`<article class="comparison-panel ${i?'target':''}"><span class="eyebrow">${x.label}</span><h3>${x.title}</h3><ul>${x.items.map(v=>`<li>${v}</li>`).join('')}</ul></article>`).join('')}</div>${callout(s)}`;
  case 'paymentFlow':return `<div class="current-flow"><span>PROTOTYPE TODAY</span><p>Authorized staff records <b>→</b> Pending <b>→</b> Owner / Finance decision</p></div><div class="flow-label"><span class="status-dot"></span> V4 WORKFLOW TO IMPLEMENT</div><div class="payment-stages" role="group" aria-label="Payment workflow stages">${s.stages.map((x,i)=>`<button class="payment-stage ${i===0?'active':''}" data-stage="${i}" aria-pressed="${i===0}"><span class="flow-number">0${i+1}</span><strong>${x.title}</strong><small>${x.role}</small></button>`).join('')}</div><div class="stage-detail" aria-live="polite"><div><span class="eyebrow">${s.stages[0].role}</span><p class="stage-description">${s.stages[0].detail}</p></div><div class="stage-result"><small>OUTPUT</small><p>${s.stages[0].result}</p></div></div>`;
  case 'states':return `<div class="state-flow">${s.steps.map((x,i)=>`<div class="state-chip ${i===3?'verified':''}"><span>${i===3?'✓':'0'+(i+1)}</span>${x}</div>`).join('')}</div><div class="three-columns">${s.items.map(([t,d])=>card(t,d)).join('')}</div>${callout(s)}`;
  case 'roles':return `<div class="roles-table"><div class="roles-head"><span>PROTOTYPE ROLE</span><span>V4 ROLE</span><span>ALIGNMENT NEEDED</span></div>${s.rows.map(([a,b,c])=>`<div class="roles-row"><span>${a}</span><strong>${b}</strong><p>${c}</p></div>`).join('')}</div>${callout(s)}`;
  case 'workspaces':return `<div class="workspace-cards">${s.items.map(([n,t,d])=>`<article><span class="workspace-number">${n}</span><h3>${t}</h3><p>${d}</p><span class="workspace-arrow">↗</span></article>`).join('')}</div>${callout(s)}`;
  case 'coreRecords':return `<div class="core-record-grid">${s.items.map(([t,d],i)=>`<article><span class="record-index">0${i+1}</span><div><h3>${t}</h3><p>${d}</p></div></article>`).join('')}</div>${callout(s)}`;
  case 'automation':return `<div class="automation-list">${s.items.map(([t,d],i)=>`<article><span class="automation-number">0${i+1}</span><h3>${t}</h3><p>${d}</p>${icon('arrow-right')}</article>`).join('')}</div>${callout(s)}`;
  case 'supporting':return `<div class="supporting-grid">${s.items.map(([t,d],i)=>`<article><span class="mini-label">WORKSTREAM 0${i+1}</span><h3>${t}</h3><p>${d}</p></article>`).join('')}</div>${callout(s)}`;
  case 'implementation':return `<div class="layer-map">${s.items.map(([t,d],i)=>`<article><span>0${i+1}</span><h3>${t}</h3><p>${d}</p></article>`).join('')}</div>`;
  case 'delivery':return `<div class="delivery-timeline">${s.steps.map(([n,t,d])=>`<article><div class="timeline-dot">${n}</div><h3>${t}</h3><p>${d}</p></article>`).join('')}</div><div class="delivery-note">Review each stage with the people who will use it.</div>`;
  case 'outcomes':return `<div class="outcome-grid">${s.items.map(([t,d,e],i)=>`<article><span class="outcome-icon">${icon(['user','shield','check','chart'][i])}</span><h3>${t}</h3><p>${d}</p><div class="evidence"><small>DEMONSTRATE IT</small><span>${e}</span></div></article>`).join('')}</div>`;
  case 'acceptance':return `<div class="acceptance-grid">${s.items.map(([t,d])=>`<article><span class="check-circle">${icon('check')}</span><div><h3>${t}</h3><p>${d}</p></div></article>`).join('')}</div>`;
  case 'discussion':return `<div class="discussion-grid">${s.items.map(([t,d],i)=>`<article><span>0${i+1}</span><div><h3>${t}</h3><p>${d}</p></div></article>`).join('')}</div><button class="inline-action" data-action="decisions">Open the decision log ${icon('arrow-right')}</button>`;
  case 'next':return `<div class="next-grid">${s.items.map(([n,t,d])=>`<article><span>${n}</span><h3>${t}</h3><p>${d}</p></article>`).join('')}</div><div class="closing-line">${s.callout}</div><button class="inline-action" data-action="export">Export discussion notes ${icon('download')}</button>`;
  case 'backlog':return `<div class="backlog-grid">${s.items.map(([t,d],i)=>`<article><span>${String(i+1).padStart(2,'0')}</span><div><h3>${t}</h3><p>${d}</p></div></article>`).join('')}</div>`;
  case 'sources':return `<div class="sources-list">${s.items.map(([t,n,d],i)=>`<article><span class="source-number">0${i+1}</span><div><h3>${t}</h3><code>${n}</code><p>${d}</p></div></article>`).join('')}</div>${callout(s)}`;
  default:return '';
 }
}

$('#slides').innerHTML=slides.map((s,i)=>`<section class="slide slide-${s.type}" id="slide-${s.id}" data-index="${i}" aria-label="Slide ${i+1} of ${slides.length}: ${escapeHTML(s.title)}" ${i?'hidden':''}>${s.type==='cover'?'':title(s)}<div class="slide-body">${body(s)}</div><div class="slide-source"><span>${escapeHTML(s.source)}</span><span>${String(i+1).padStart(2,'0')}</span></div></section>`).join('');
$('#total-number').textContent=String(slides.length).padStart(2,'0');

function renderNav(){
 $('#chapter-nav').innerHTML=chapters.map(c=>`<div class="chapter" data-chapter="${c.id}"><button class="chapter-button" data-go="${slides.findIndex(s=>s.chapter===c.id)}"><span class="chapter-number">${c.number}</span><span><strong>${c.title}</strong><small>${c.subtitle}</small></span><span class="chapter-chevron">↗</span></button><div class="chapter-slides">${slides.map((s,i)=>s.chapter===c.id?`<button data-go="${i}" class="slide-nav-item"><span>${String(i+1).padStart(2,'0')}</span>${escapeHTML(s.title)}</button>`:'').join('')}</div></div>`).join('');
 $('#overview-grid').innerHTML=slides.map((s,i)=>`<button class="overview-item" data-go="${i}"><div><span>${String(i+1).padStart(2,'0')}</span><span class="status-badge ${s.status}">${statuses[s.status]}</span></div><strong>${escapeHTML(s.title)}</strong><small>${chapters.find(c=>c.id===s.chapter).title}</small></button>`).join('');
}
renderNav();
$$('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));
$$('[data-action="overview"]').filter(x=>!x.textContent.trim()).forEach(el=>el.innerHTML=icon('grid'));
$$('[data-action="print"]').forEach(el=>el.innerHTML=icon('print'));
$$('[data-action="copy"]').forEach(el=>el.innerHTML=icon('link'));
$$('[data-action="prev"]').forEach(el=>el.innerHTML=icon('arrow-left'));
$$('[data-close]').forEach(el=>el.innerHTML=icon('close'));

let index=0;
let showNotes=false;
let toastTimer;
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),2800);}
function go(next,{focus=true,hash=true}={}){
 index=Math.max(0,Math.min(slides.length-1,next));
 const s=slides[index];
 $$('.slide').forEach((el,i)=>{el.hidden=i!==index;el.classList.toggle('is-active',i===index)});
 $$('.chapter').forEach(el=>el.classList.toggle('active',el.dataset.chapter===s.chapter));
 $$('.slide-nav-item').forEach(el=>{const active=Number(el.dataset.go)===index;el.classList.toggle('active',active);if(active)el.setAttribute('aria-current','step');else el.removeAttribute('aria-current')});
 $$('.overview-item').forEach(el=>el.classList.toggle('current',Number(el.dataset.go)===index));
 const chapter=chapters.find(c=>c.id===s.chapter);
 $('#slide-breadcrumb').innerHTML=`<span>${chapter.number} / ${chapter.title}</span><span class="status-badge ${s.status}">${statuses[s.status]}</span>`;
 $('#current-number').textContent=String(index+1).padStart(2,'0');
 $('#progress-fill').style.width=`${(index+1)/slides.length*100}%`;
 $('[data-action="prev"]').disabled=index===0;
 $('#next-label').textContent=index===slides.length-1?'Back to start':'Next slide';
 $('#notes-content').textContent=s.notes;
 document.title=`${index+1}. ${s.title} — Fresh Phones PH`;
 if(hash&&location.hash!==`#${s.id}`)history.replaceState(null,'',`#${s.id}`);
 $('#slide-stage').scrollTop=0;
 $('.slides').scrollTop=0;
 window.scrollTo({top:0,behavior:'instant'});
 if(focus)$('h1',$(`#slide-${s.id}`))?.focus({preventScroll:true});
}
function fromHash(){const n=slides.findIndex(s=>`#${s.id}`===location.hash);go(n<0?0:n,{focus:false,hash:false});}
window.addEventListener('hashchange',fromHash);fromHash();
function openDialog(id){const d=$(`#${id}`);if(!d.open)d.showModal();}
function notes(){showNotes=!showNotes;$('#presenter-notes').hidden=!showNotes;$('[data-action="notes"]').setAttribute('aria-pressed',String(showNotes));}
async function present(){
 const entering=!document.body.classList.contains('presenting');
 document.body.classList.toggle('presenting',entering);
 $('[data-action="present"] span:last-child').textContent=entering?'Exit':'Present';
 if(entering&&document.documentElement.requestFullscreen){try{await document.documentElement.requestFullscreen()}catch{toast('Presentation view enabled. Press Esc to exit.')}}
 else if(!entering&&document.fullscreenElement){try{await document.exitFullscreen()}catch{}}
}
document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement&&document.body.classList.contains('presenting')){document.body.classList.remove('presenting');$('[data-action="present"] span:last-child').textContent='Present'}});

document.addEventListener('click',async e=>{
 const jump=e.target.closest('[data-go]');
 if(jump){const d=jump.closest('dialog');if(d?.open)d.close();go(Number(jump.dataset.go));return;}
 const close=e.target.closest('[data-close]');if(close){$(`#${close.dataset.close}`).close();return;}
 const stage=e.target.closest('[data-stage]');
 if(stage){const s=slides[index],n=Number(stage.dataset.stage);$$('[data-stage]',stage.parentElement).forEach(el=>{el.classList.toggle('active',el===stage);el.setAttribute('aria-pressed',String(el===stage))});const d=$('.stage-detail',stage.closest('.slide'));$('.eyebrow',d).textContent=s.stages[n].role;$('.stage-description',d).textContent=s.stages[n].detail;$('.stage-result p',d).textContent=s.stages[n].result;return;}
 const capture=e.target.closest('[data-capture]');
 if(capture){const s=slides[index],n=Number(capture.dataset.capture);$$('[data-capture]',capture.parentElement).forEach(el=>el.setAttribute('aria-pressed',String(el===capture)));const img=$('.phone-frame img',capture.closest('.slide'));img.src=s.images[n][1];img.alt=`Earlier synthetic-account customer portal ${s.images[n][0].toLowerCase()} screen`;return;}
 const action=e.target.closest('[data-action]')?.dataset.action;
 switch(action){
  case 'next':go(index===slides.length-1?0:index+1);break;
  case 'prev':go(index-1);break;
  case 'overview':openDialog('overview-dialog');break;
  case 'decisions':openDialog('decisions-dialog');break;
  case 'help':openDialog('help-dialog');break;
  case 'notes':notes();break;
  case 'present':await present();break;
  case 'print':window.print();break;
  case 'copy':try{await navigator.clipboard.writeText(location.href);toast('Slide link copied.')}catch{toast('Copy the address from your browser to share this slide.')}break;
  case 'export':exportDecisions();break;
 }
});
$$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}}));
document.addEventListener('keydown',e=>{
 if(e.target.closest('input,textarea,select,[contenteditable="true"]')||e.altKey||e.ctrlKey||e.metaKey)return;
 if($('dialog[open]'))return;
 if(e.code==='Space'&&e.target.closest('button,a'))return;
 switch(e.key){
  case 'ArrowRight':case 'PageDown':case ' ':e.preventDefault();go(Math.min(index+1,slides.length-1));break;
  case 'ArrowLeft':case 'PageUp':e.preventDefault();go(index-1);break;
  case 'Home':e.preventDefault();go(0);break;
  case 'End':e.preventDefault();go(slides.length-1);break;
  case 'o':case 'O':openDialog('overview-dialog');break;
  case 'n':case 'N':notes();break;
  case 'f':case 'F':e.preventDefault();present();break;
  case '?':openDialog('help-dialog');break;
  case 'Escape':if(document.body.classList.contains('presenting')){document.body.classList.remove('presenting');$('[data-action="present"] span:last-child').textContent='Present';}break;
 }
});

const storageKey='freshphonesph-workflow-decisions-v1';
let decisionData={};
let canSave=true;
try{
 const saved=JSON.parse(localStorage.getItem(storageKey)||'{}');
 if(saved&&typeof saved==='object'&&!Array.isArray(saved)){
  for(const d of decisions){const entry=saved[d.id];if(!entry||typeof entry!=='object')continue;decisionData[d.id]={status:['discuss','confirmed','revise','later'].includes(entry.status)?entry.status:'discuss',note:typeof entry.note==='string'?entry.note.slice(0,5000):''};}
 }
}catch{canSave=false;}
$('#decision-fields').innerHTML=decisions.map((d,i)=>`<section class="decision-field"><div class="decision-heading"><span>${String(i+1).padStart(2,'0')}</span><label for="status-${d.id}">${d.title}</label><select id="status-${d.id}" data-decision="${d.id}" data-field="status" aria-label="${d.title} status"><option value="discuss">To discuss</option><option value="confirmed">Confirmed</option><option value="revise">Needs revision</option><option value="later">Later</option></select></div><p>${d.question}</p><label class="sr-only" for="note-${d.id}">${d.title}: decision, owner, and follow-up</label><textarea id="note-${d.id}" data-decision="${d.id}" data-field="note" rows="2" maxlength="5000" placeholder="Decision, owner, and follow-up…"></textarea></section>`).join('');
$$('[data-decision]').forEach(el=>{const v=decisionData[el.dataset.decision]?.[el.dataset.field];if(typeof v==='string'){if(el.tagName==='SELECT'&&!['discuss','confirmed','revise','later'].includes(v))return;el.value=v;}});
function updateDecisionCount(){const count=decisions.filter(d=>decisionData[d.id]?.note?.trim()||(decisionData[d.id]?.status&&decisionData[d.id].status!=='discuss')).length;$('#decision-count').textContent=`${count} of ${decisions.length} decisions recorded`;$('#save-status').textContent=canSave?'Saved on this browser. Export a copy before changing devices.':'Browser storage is unavailable. Keep this tab open and export your notes.';$('#save-status').classList.toggle('unsaved',!canSave);}
$('#decision-fields').addEventListener('input',e=>{const el=e.target;if(!el.dataset.decision)return;const id=el.dataset.decision;decisionData[id]={...decisionData[id],[el.dataset.field]:el.value};try{localStorage.setItem(storageKey,JSON.stringify(decisionData));canSave=true}catch{canSave=false}updateDecisionCount()});
updateDecisionCount();
function exportDecisions(){
 const lines=['# Fresh Phones PH workflow discussion','',`Exported: ${new Date().toISOString()}`,'','Discussion notes for review. These notes do not constitute signed acceptance.',''];
 const labels={discuss:'To discuss',confirmed:'Confirmed',revise:'Needs revision',later:'Later'};
 for(const d of decisions){const entry=decisionData[d.id]||{};lines.push(`## ${d.title}`,'',d.question,'',`Status: ${labels[entry.status]||'To discuss'}`,'',entry.note?.trim()||'No decision recorded.','');}
 const blob=new Blob([lines.join('\n')],{type:'text/markdown;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`FreshPhonesPH-discussion-${new Date().toISOString().slice(0,10)}.md`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Discussion notes exported.');
}

let touchStart=null;
$('#slides').addEventListener('touchstart',e=>{if(e.target.closest('button,a,input,textarea'))return;touchStart={x:e.changedTouches[0].screenX,y:e.changedTouches[0].screenY}},{passive:true});
$('#slides').addEventListener('touchend',e=>{if(!touchStart)return;const dx=e.changedTouches[0].screenX-touchStart.x,dy=e.changedTouches[0].screenY-touchStart.y;touchStart=null;if(Math.abs(dx)>90&&Math.abs(dx)>Math.abs(dy)*1.7)go(index+(dx<0?1:-1))},{passive:true});
