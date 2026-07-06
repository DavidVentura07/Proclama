/* Proclama service worker. Sube el numero de version (v1 -> v2 ...) cada vez
   que actualices los archivos, para forzar refresco en los equipos instalados. */
const CACHE = 'proclama-v17';
const ASSETS = [
  './','index.html','manifest.json',
  'biblias/rvr1909.json',
  'iconos/icon-180.png','iconos/icon-192.png','iconos/icon-512.png','iconos/favicon.ico'
];
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', e=>{
  const req=e.request; if(req.method!=='GET') return;
  e.respondWith(
    caches.match(req).then(hit=>{
      if(hit) return hit;
      return fetch(req).then(res=>{
        try{
          const url=new URL(req.url);
          const cacheable = url.origin===location.origin
            || /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)
            || url.hostname==='cdnjs.cloudflare.com';
          if(cacheable){ const copy=res.clone(); caches.open(CACHE).then(c=>c.put(req,copy)); }
        }catch(_){}
        return res;
      }).catch(()=> caches.match('index.html'));
    })
  );
});
