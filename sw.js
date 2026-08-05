/* Proclama service worker. Sube el numero de version (v1 -> v2 ...) cada vez
   que actualices los archivos, para forzar refresco en los equipos instalados. */
const CACHE = 'proclama-v24';

/* NUCLEO: sin esto no hay app offline. Va con addAll (atomico a proposito):
   si falla, mejor que la instalacion falle y se reintente en la proxima visita. */
const CORE = [
  './','index.html','manifest.json',
  'iconos/icon-180.png','iconos/icon-192.png','iconos/icon-512.png','iconos/favicon.ico'
];
/* PESADOS: 5.4 MB. Antes iban todos en un solo caches.addAll(), que es ATOMICO:
   con la wifi del templo, que UN archivo fallara dejaba el cache con CERO
   entradas, sin service worker y sin un solo mensaje en consola — por eso la app
   seguia dependiendo del internet cada culto. Ahora van uno por uno y lo que se
   descargue se queda. */
const EXTRA = [
  'peerjs.min.js','qrcode.min.js',
  'pdf.min.js','pdf.worker.min.js',
  'biblias/rvr1909.json'
];
const ASSETS = CORE.concat(EXTRA);

async function avisar(msg){
  try{
    const cs = await self.clients.matchAll({includeUncontrolled:true, type:'window'});
    cs.forEach(c=>c.postMessage(msg));
  }catch(e){}
}

self.addEventListener('install', e=>{
  e.waitUntil((async()=>{
    const c = await caches.open(CACHE);
    await c.addAll(CORE);
    const res = await Promise.allSettled(EXTRA.map(u=>c.add(u)));
    const faltan = EXTRA.filter((u,i)=>res[i].status==='rejected');
    if(faltan.length){
      console.warn('Proclama SW: quedaron sin guardar '+faltan.length+' archivo(s):', faltan);
      avisar({type:'cache-incompleto', faltan:faltan});
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});

/* Reintento a peticion de la app: completa lo que falto sin esperar a que cambie
   la version del cache (el mensaje lo manda index.html al detectar huecos). */
self.addEventListener('message', e=>{
  if(!e.data || e.data.type!=='recachear') return;
  e.waitUntil((async()=>{
    const c = await caches.open(CACHE);
    const pend = [];
    for(const u of ASSETS){ if(!(await c.match(u))) pend.push(u); }
    if(!pend.length) return;   // ya estaba completo: sin avisos que no aportan nada
    const res = await Promise.allSettled(pend.map(u=>c.add(u)));
    const faltan = pend.filter((u,i)=>res[i].status==='rejected');
    avisar(faltan.length ? {type:'cache-incompleto', faltan:faltan} : {type:'cache-completo'});
  })());
});

self.addEventListener('fetch', e=>{
  const req=e.request; if(req.method!=='GET') return;
  /* Navegaciones: en cache guardamos './' e 'index.html' SIN query, asi que una
     entrada como ?view=pizarra&c=1234 no coincidia y se iba a la red. Buscamos
     ignorando la query para que la tablet abra la pizarra aunque no haya internet. */
  if(req.mode==='navigate'){
    e.respondWith(
      caches.match(req,{ignoreSearch:true})
        .then(hit=> hit || fetch(req).catch(()=> caches.match('index.html')))
    );
    return;
  }
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
      /* Antes esto devolvia index.html ante CUALQUIER peticion fallida. Para
         biblias/rvr1909.json eso hacia que r.ok fuera cierto, el JSON.parse
         tronaba y la app caia en silencio a la muestra de 3 libros. Un 504 de
         verdad deja que quien pidio el archivo se entere. */
      }).catch(()=> new Response('sin conexion',{status:504,statusText:'sin conexion'}));
    })
  );
});
