/*jshint esversion: 6 */

const CACHE_VERSION = 'v1';
const CACHE_FILES = [
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
    caches.open(CACHE_VERSION).then(function(cache) {
      console.log('Service worker is caching.');
      return cache.addAll(CACHE_FILES);
    })
  );
});

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request).then(function(response) {
//       if (response) {
//         console.log('Found in cache: ', event.request);
//         return response;
//       }
//       else {
//         console.log('Not found in cache. Going to fetch: ', event.request);
//         return fetch(event.request);
//       }
//     })
//     .catch( function(error) {
//       console.log('Error fetching: ', error);
//     })
//   );
// });

// Reference: https://www.sitepoint.com/getting-started-with-service-workers/

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function(res){
            if(res){
                console.log('Found in cache: ', event.request);
                return res;
            }
            requestBackend(event);
        })
    );
});

function requestBackend(event){
    var url = event.request.clone();
    return fetch(url).then(function(res){
        //if not a valid response send the error
        if(!res || res.status !== 200 || res.type !== 'basic'){
            return res;
        }

        var response = res.clone();

        caches.open(CACHE_VERSION).then(function(cache){
            cache.put(event.request, response);
        });

        return res;
    });
}

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function(keys){
            return Promise.all(keys.map(function(key, i){
                if(key !== CACHE_VERSION){
                    return caches.delete(keys[i]);
                }
            }));
        })
    );
});
