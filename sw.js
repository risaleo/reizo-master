const C='reizo-v24-assets';
const ASSETS=['./assets/home-guide.png','./assets/compare-guide.png','./assets/basic-guide.png','./assets/capacity-guide.png','./assets/install-guide.png','./assets/sales-guide.png','./assets/quiz-guide.png','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.mode==='navigate'){e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match('./index.html')));return;}
  e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();if(e.request.url.includes('/assets/')||e.request.url.includes('icon-'))caches.open(C).then(c=>c.put(e.request,copy));return r;}).catch(()=>caches.match(e.request)));
});
