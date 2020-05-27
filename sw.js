;
//asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache_programador_fitness',
  urlsToCache = [
    './',
    'https://fonts.googleapis.com/css?family=Raleway:400,700',
    'https://fonts.gstatic.com/s/raleway/v12/1Ptrg8zYS_SKggPNwJYtWqZPAA.woff2',
    'https://use.fontawesome.com/releases/v5.0.7/css/all.css',
    'https://use.fontawesome.com/releases/v5.0.6/webfonts/fa-brands-400.woff2',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://code.jquery.com/jquery-3.4.1.slim.min.js',
    'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js',
    'https://youtu.be/s6zR2T9vn2c',
    './style.css',
    './styleTarjeta.css',
    './script.js',
    './img/ProgramadorFitness.png',
    './img/favicon.png',
    './IMG/Anuncios.jpg',
    './IMG/articulo_ambiente.jpg',
    './IMG/articulo_ciencias.jpg',
    './IMG/articulo_filosofia.jpg',
    './IMG/banner.jpg',
    './IMG/banner.mp4',
    './IMG/banner.webm',
    './IMG/bootstrap-icon.png',
    './IMG/bootstrap-icon.svg',
    './IMG/naturaleza.jpg',
    './IMG/pic01.jpg',
    './IMG/pic02.jpg',
    './IMG/pic03.jpg',
    './IMG/pic04.jpg',
    './IMG/pic05.jpg',
    './IMG/pic06.jpg',
    './assets/js/jquery.min.js',
    './assets/js/jquery.scrolly.min.js',
    './assets/js/jquery.poptrox.min.js',
    './assets/js/skel.min.js',
    './assets/js/util.js',
    './assets/js/main.js'
  ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      })
  )
})
