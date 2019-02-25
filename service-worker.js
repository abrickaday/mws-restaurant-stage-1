/*jshint esversion: 6 */

const cacheName = 'v1';
const urlsToCache = [
  '/',
  'index.html',
  'restaurant.html',
  '/css/styles.css',
  '/css/leaflet.css',
  '/css/images/layers-2x.png',
  '/css/images/layers.png',
  '/css/images/marker-icon-2x.png',
  '/css/images/marker-icon.png',
  '/css/images/marker-shadow.png',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/js/leaflet.js',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('Service worker is caching.');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        console.log('Found in cache: ', event.request);
        return response;
      }
      else {
        console.log('Not found in cache. Going to fetch: ', event.request);
        return fetch(event.request);
      }
    })
    .catch( function(error) {
      console.log('Error fetching: ', error);
    })
  );
});
