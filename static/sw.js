'use strict';

var CACHE = 'everyutil-v2';
var STATIC = [
  '/assets/css/common.css',
  '/assets/js/guh-search.js',
  '/assets/img/logo_100.png',
  '/manifest.json'
];

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(STATIC); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE; })
            .map(function (k) { return caches.delete(k); })
      );
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;

  var url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // 정적 자산(CSS/JS/이미지): 캐시 우선
  if (/\.(css|js|png|jpg|jpeg|webp|svg|ico|woff2?)(\?.*)?$/.test(url.pathname)) {
    e.respondWith(
      caches.match(req).then(function (hit) {
        return hit || fetch(req).then(function (res) {
          var clone = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, clone); });
          return res;
        });
      })
    );
    return;
  }

  // HTML 페이지: 네트워크 우선, 오프라인 시 캐시
  e.respondWith(
    fetch(req).then(function (res) {
      var clone = res.clone();
      caches.open(CACHE).then(function (c) { c.put(req, clone); });
      return res;
    }).catch(function () {
      return caches.match(req);
    })
  );
});
