let lang='zh';
let current='home';
let giftTimer=null;
let giftImageDataUrl=null;
let giftImagePromise=null;

function detectLang(){
 let saved=null;
 try{ saved=localStorage.getItem('yidear_lang'); }catch(e){}
 if(saved && T[saved]) return saved;
 const b=(navigator.language||'zh').toLowerCase();
 if(b.startsWith('ja')) return 'ja';
 if(b.startsWith('ko')) return 'ko';
 if(b.startsWith('en')) return 'en';
 return 'zh';
}
function tr(key){return T[lang][key] ?? T.zh[key] ?? key}
function campaignText(key){
 const c=window.GIFT_CAMPAIGN||{};
 const v=c[key];
 if(v && typeof v==='object') return v[lang] || v.zh || v.en || '';
 return v || '';
}
function applyLang(){
 document.documentElement.lang = lang==='zh'?'zh-Hant':lang;
 document.querySelectorAll('[data-i18n]').forEach(el=>{
   const key=el.dataset.i18n; const val=tr(key);
   if(typeof val==='string') el.textContent=val;
 });
 document.getElementById('langSelect').value=lang;
 document.getElementById('itemSearch').placeholder=tr('searchItem');
 document.getElementById('channelSearch').placeholder=tr('searchChannel');

 document.getElementById('rulesList').innerHTML=tr('rules').map(x=>`<li>${esc(x)}</li>`).join('');
 document.getElementById('fireList').innerHTML=tr('fireRules').map(x=>`<li>${esc(x)}</li>`).join('');
 document.getElementById('equipTags').innerHTML=tr('equipTags').map(x=>`<span class="tag">${esc(x)}</span>`).join('');
 document.getElementById('tvSteps').innerHTML=tr('tvSteps').map((x,i)=>`<div class="step"><b>${String(i+1).padStart(2,'0')}</b><span>${esc(x)}</span></div>`).join('');
 renderItems();
 renderChannels();
 syncGiftModal();
}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function renderItems(){
 const q=(document.getElementById('itemSearch').value||'').toLowerCase().trim();
 const rows=ITEMS.filter(it=>Object.values(it).join(' ').toLowerCase().includes(q)).map(it=>{
   const main = it[lang] || it.en;
   let sub='';
   if(lang==='zh') sub=it.en;
   else if(lang==='en') sub=it.zh;
   else sub=it.en;
   return `<tr><td><strong>${esc(main)}</strong><div class="sub">${esc(sub)}</div></td><td class="price">NT$ ${esc(it.price)}</td></tr>`;
 }).join('');
 document.getElementById('itemRows').innerHTML=rows;
}
function renderChannels(){
 const q=(document.getElementById('channelSearch').value||'').toLowerCase().trim();
 const rows=CHANNELS.filter(c=>(c.num+' '+c.name).toLowerCase().includes(q)).map(c=>`<tr><td><strong>${esc(c.num)}</strong></td><td>${esc(c.name)}</td></tr>`).join('');
 document.getElementById('channelRows').innerHTML=rows;
}

function giftSeenKey(){
 const c=window.GIFT_CAMPAIGN||{};
 return `yidear_gift_seen_${c.id||'current'}`;
}
function giftSeen(){
 try{return sessionStorage.getItem(giftSeenKey())==='1'}catch(e){return false}
}
function markGiftSeen(){
 try{sessionStorage.setItem(giftSeenKey(),'1')}catch(e){}
}
function ensureGiftModal(){
 if(document.getElementById('giftModal')) return;
 const modal=document.createElement('div');
 modal.id='giftModal';
 modal.className='gift-modal';
 modal.hidden=true;
 modal.setAttribute('role','dialog');
 modal.setAttribute('aria-modal','true');
 modal.setAttribute('aria-labelledby','giftModalTitle');
 modal.innerHTML=`<div class="gift-dialog"><button class="gift-close" type="button" aria-label="Close" onclick="closeGiftModal()">×</button><a class="gift-image-link loading" id="giftModalImageLink" target="_blank" rel="noopener"><img class="gift-image" id="giftModalImage" alt=""></a><div class="gift-copy"><h2 id="giftModalTitle"></h2><p id="giftModalNote"></p><a class="gift-cta" id="giftModalCta" target="_blank" rel="noopener"></a></div></div>`;
 document.body.appendChild(modal);
 modal.addEventListener('click',e=>{if(e.target===modal) closeGiftModal();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape') closeGiftModal();});
 syncGiftModal();
}
function loadGiftImage(){
 const c=window.GIFT_CAMPAIGN||{};
 if(c.imageBase64File){
  if(giftImageDataUrl) return Promise.resolve(giftImageDataUrl);
  if(!giftImagePromise){
   giftImagePromise=fetch(c.imageBase64File,{cache:'no-store'})
    .then(r=>{if(!r.ok) throw new Error('gift image payload'); return r.text();})
    .then(txt=>{
      const clean=txt.replace(/\s+/g,'');
      if(!clean || clean.length<1000) throw new Error('invalid gift image payload');
      giftImageDataUrl=`data:${c.imageMime||'image/jpeg'};base64,${clean}`;
      return giftImageDataUrl;
    })
    .catch(err=>{giftImagePromise=null; throw err;});
  }
  return giftImagePromise;
 }
 return Promise.resolve(c.image||'');
}
function syncGiftModal(){
 const modal=document.getElementById('giftModal');
 const c=window.GIFT_CAMPAIGN||{};
 if(!modal || !c) return;
 const image=document.getElementById('giftModalImage');
 const imageLink=document.getElementById('giftModalImageLink');
 const cta=document.getElementById('giftModalCta');
 document.getElementById('giftModalTitle').textContent=campaignText('title');
 document.getElementById('giftModalNote').textContent=campaignText('note');
 cta.textContent=campaignText('cta');
 imageLink.href=c.link||'#';
 cta.href=c.link||'#';
 image.removeAttribute('src');
 image.classList.remove('loaded');
 imageLink.classList.remove('loaded','failed');
 imageLink.classList.add('loading');
 loadGiftImage().then(src=>{
   if(!src || !image.isConnected) throw new Error('missing gift image');
   image.onload=()=>{
     image.classList.add('loaded');
     imageLink.classList.remove('loading','failed');
     imageLink.classList.add('loaded');
   };
   image.onerror=()=>{
     image.removeAttribute('src');
     imageLink.classList.remove('loading','loaded');
     imageLink.classList.add('failed');
   };
   image.src=src;
 }).catch(()=>{
   image.removeAttribute('src');
   imageLink.classList.remove('loading','loaded');
   imageLink.classList.add('failed');
 });
}
function openGiftModal(markSeenNow=true){
 const c=window.GIFT_CAMPAIGN||{};
 if(!c.enabled) return;
 if(giftTimer){clearTimeout(giftTimer);giftTimer=null;}
 ensureGiftModal();
 syncGiftModal();
 if(markSeenNow) markGiftSeen();
 const modal=document.getElementById('giftModal');
 modal.hidden=false;
 document.body.classList.add('gift-modal-open');
 requestAnimationFrame(()=>modal.classList.add('open'));
}
function closeGiftModal(){
 const modal=document.getElementById('giftModal');
 if(!modal || modal.hidden) return;
 modal.classList.remove('open');
 document.body.classList.remove('gift-modal-open');
 setTimeout(()=>{modal.hidden=true;},300);
}
function scheduleGiftModal(){
 const c=window.GIFT_CAMPAIGN||{};
 if(giftTimer){clearTimeout(giftTimer);giftTimer=null;}
 if(current!=='home' || !c.enabled || c.autoOpen===false || giftSeen()) return;
 giftTimer=setTimeout(()=>{
   giftTimer=null;
   if(current==='home' && !giftSeen()) openGiftModal(true);
 },Number(c.autoOpenDelay)||1400);
}

function go(view,push=true){
 if(!document.getElementById('view-'+view)) view='home';
 const nextEl=document.getElementById('view-'+view);
 if(view!=='home') closeGiftModal();
 document.querySelectorAll('.view').forEach(v=>v.classList.remove('active','view-enter','view-leave'));
 current=view;
 document.body.classList.remove('page-transition');
 void document.body.offsetWidth;
 document.body.classList.add('page-transition');
 nextEl.classList.add('active');
 void nextEl.offsetWidth;
 nextEl.classList.add('view-enter');
 setTimeout(()=>{nextEl.classList.remove('view-enter');},980);
 setTimeout(()=>{document.body.classList.remove('page-transition');},1800);
 document.getElementById('bottomNav').style.display=view==='home'?'none':'flex';
 window.scrollTo({top:0,behavior:'auto'});
 if(push) history.pushState({view},'',view==='home'?'#home':'#'+view);
 if(view==='home') scheduleGiftModal();
}
window.addEventListener('popstate',e=>go((e.state&&e.state.view)||location.hash.slice(1)||'home',false));

function injectOfficialPhotos(){
 const roomTitle=document.querySelector('#view-room .title-block');
 if(roomTitle && !document.querySelector('#view-room .room-overview')) roomTitle.insertAdjacentHTML('afterend',`<figure class="site-photo room-overview"><img loading="lazy" decoding="async" alt="YIDEAR HOTEL guest room" src="https://www.yidear-hotel.com/wp-content/uploads/2018/08/DSC_5834-1.jpg"></figure>`);
 const equipmentTitle=document.querySelector('#view-equipment .title-block');
 if(equipmentTitle && !document.querySelector('#view-equipment .equipment-photo')) equipmentTitle.insertAdjacentHTML('afterend',`<figure class="site-photo equipment-photo"><img loading="lazy" decoding="async" alt="YIDEAR HOTEL guest room equipment" src="https://www.yidear-hotel.com/wp-content/uploads/2018/08/DSC_5850-1.jpg"></figure>`);
 const diningCard=document.querySelector('#view-dining .stack .card');
 if(diningCard && !diningCard.querySelector('.dining-photo')) diningCard.insertAdjacentHTML('afterbegin',`<div class="dining-photo"><img loading="lazy" decoding="async" alt="YIDEAR HOTEL breakfast presentation" src="https://www.yidear-hotel.com/wp-content/uploads/2022/11/%E6%97%A9%E9%A4%901.jpg"></div>`);
}

function boot(){
 document.getElementById('langSelect').addEventListener('change',e=>{
  lang=e.target.value;
  try{ localStorage.setItem('yidear_lang',lang); }catch(err){}
  applyLang();
 });
 document.getElementById('itemSearch').addEventListener('input',renderItems);
 document.getElementById('channelSearch').addEventListener('input',renderChannels);
 lang=detectLang(); applyLang();
 const initial=location.hash.slice(1)||'home';
 history.replaceState({view:initial},'',location.hash||'#home');
 go(initial,false);
 if (window.matchMedia('(hover:hover) and (pointer:fine)').matches){
  document.addEventListener('pointermove', e=>{
   const card=e.target.closest('.home-card,.menu-card');
   if(!card) return;
   const r=card.getBoundingClientRect();
   card.style.setProperty('--mx', ((e.clientX-r.left)/r.width*100).toFixed(1)+'%');
   card.style.setProperty('--my', ((e.clientY-r.top)/r.height*100).toFixed(1)+'%');
  });
 }
}

async function loadPartials(){
 const files=['partials/home-stay.html','partials/room-tv.html','partials/policies-dining.html','partials/services-details.html'];
 const html=await Promise.all(files.map(f=>fetch(f).then(r=>{if(!r.ok) throw new Error(f); return r.text()})));
 document.getElementById('app').innerHTML=html.join('');
 injectOfficialPhotos();
 boot();
}
loadPartials().catch(()=>{document.getElementById('app').innerHTML='<div style="padding:24px">Unable to load guest guide.</div>';});
