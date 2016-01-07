(function() {
    "use strict";

    var CACHE = 'mgl7130-cache-v1';

    var ASSETS = [
        '.',
        'css/app.css',
        'js/app.js',
        'lib/device-uuid-1.0.4/device-uuid.js',
        'lib/font-awesome-5.15/css/all.css',
        'lib/font-awesome-5.15/webfonts/fa-brands-400.eot',
        'lib/font-awesome-5.15/webfonts/fa-brands-400.woff',
        'lib/font-awesome-5.15/webfonts/fa-regular-400.svg',
        'lib/font-awesome-5.15/webfonts/fa-regular-400.woff2',
        'lib/font-awesome-5.15/webfonts/fa-solid-900.ttf',
        'lib/font-awesome-5.15/webfonts/fa-brands-400.svg',
        'lib/font-awesome-5.15/webfonts/fa-brands-400.woff2',
        'lib/font-awesome-5.15/webfonts/fa-regular-400.ttf',
        'lib/font-awesome-5.15/webfonts/fa-solid-900.eot',
        'lib/font-awesome-5.15/webfonts/fa-solid-900.woff',
        'lib/font-awesome-5.15/webfonts/fa-brands-400.ttf',
        'lib/font-awesome-5.15/webfonts/fa-regular-400.eot',
        'lib/font-awesome-5.15/webfonts/fa-regular-400.woff',
        'lib/font-awesome-5.15/webfonts/fa-solid-900.svg',
        'lib/font-awesome-5.15/webfonts/fa-solid-900.woff2'

    ];

    //Appel lors de l'installation de notre service worker
    self.addEventListener('install', function(event) {
        //Mets en cache tous les fichiers de l'application
        event.waitUntil(
            caches.open(CACHE)
                .then(function(cache) {
                    return cache.addAll(ASSETS);
                })
        );
    });

    //Intercepte les appels résaux
    self.addEventListener('fetch', function(event) {
        event.respondWith(
            caches.match(event.request)
                .then(function(response) {
                    // Nous avons ce fichier en cache, nous pouvons le servir immédiatement
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                }
                )
        );
    });
})();
