/* global DeviceUUID */
(function() {
    "use strict";

    // Enregistrement du service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/app/service-worker.js', {
            scope: '/app/'
        }).catch(e => {
            document.getElementById('app').innerHTML = "Erreure, il n'est pas possible de déployer le service worker." + e.message;
        });
    }

    //DeviceUUID est une librarie qui permet d'avoir des informations sur l'appareil
    var du = new DeviceUUID().parse();
    document.getElementById('plateforme').innerHTML = du.platform;
    document.getElementById('os').innerHTML = du.os;
    document.getElementById('language').innerHTML = du.language;
    document.getElementById('resolution').innerHTML = du.resolution[0] + ' x ' + du.resolution[1];

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(position => {
            document.getElementById('gps').innerHTML = "(" + position.coords.latitude.toFixed(4) + ", " + position.coords.longitude.toFixed(4) + ")";
        }, err => {
            document.getElementById('gps').innerHTML = err.message;
        });
    } else {
        document.getElementById('gps').innerHTML = "La géolocalisation n'est pas supportée.";
    }

})();
