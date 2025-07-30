if (!self.define) {
  let e,
    a = {};
  const s = (s, n) => (
    (s = new URL(s + '.js', n).href),
    a[s] ||
      new Promise(a => {
        if ('document' in self) {
          const e = document.createElement('script');
          ((e.src = s), (e.onload = a), document.head.appendChild(e));
        } else ((e = s), importScripts(s), a());
      }).then(() => {
        let e = a[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, i) => {
    const c =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (a[c]) return;
    let r = {};
    const t = e => s(e, c),
      d = { module: { uri: c }, exports: r, require: t };
    a[c] = Promise.all(n.map(e => d[e] || t(e))).then(e => (i(...e), r));
  };
}
define(['./workbox-f1770938'], function (e) {
  'use strict';
  (importScripts('/fallback-ce627215c0e4a9af.js'),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/chunks/272.162dce3162f543b2.js',
          revision: '162dce3162f543b2',
        },
        {
          url: '/_next/static/chunks/771.fe8daf96251cf1a6.js',
          revision: 'fe8daf96251cf1a6',
        },
        {
          url: '/_next/static/chunks/app/(cms)/layout-70484b0686f45324.js',
          revision: '70484b0686f45324',
        },
        {
          url: '/_next/static/chunks/app/(cms)/studio/%5B%5B...index%5D%5D/page-dabf1d43c1753cc5.js',
          revision: 'dabf1d43c1753cc5',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-1eec3026bda4666b.js',
          revision: '1eec3026bda4666b',
        },
        {
          url: '/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-3b78965e3c6193df.js',
          revision: '3b78965e3c6193df',
        },
        {
          url: '/_next/static/chunks/app/api/contact/route-b69353126c7d1909.js',
          revision: 'b69353126c7d1909',
        },
        {
          url: '/_next/static/chunks/app/api/room-reviews/%5Bid%5D/route-17841dd7fed9c258.js',
          revision: '17841dd7fed9c258',
        },
        {
          url: '/_next/static/chunks/app/api/sanity/signUp/route-dd1d8dd5e2e7bc46.js',
          revision: 'dd1d8dd5e2e7bc46',
        },
        {
          url: '/_next/static/chunks/app/api/stripe/route-8518b51ecd214faa.js',
          revision: '8518b51ecd214faa',
        },
        {
          url: '/_next/static/chunks/app/api/test-env/route-eaecd43d386d4ca3.js',
          revision: 'eaecd43d386d4ca3',
        },
        {
          url: '/_next/static/chunks/app/api/userbooking/route-fff4fb27e6904cee.js',
          revision: 'fff4fb27e6904cee',
        },
        {
          url: '/_next/static/chunks/app/api/users/route-4c2bd0fe858a588e.js',
          revision: '4c2bd0fe858a588e',
        },
        {
          url: '/_next/static/chunks/app/api/webhook/route-f470a9d7dc5e78f0.js',
          revision: 'f470a9d7dc5e78f0',
        },
        {
          url: '/_next/static/chunks/app/auth/page-943fa5c2b9546b40.js',
          revision: '943fa5c2b9546b40',
        },
        {
          url: '/_next/static/chunks/app/contact/page-aa580ccba396b093.js',
          revision: 'aa580ccba396b093',
        },
        {
          url: '/_next/static/chunks/app/debug/page-5da580cf68385b59.js',
          revision: '5da580cf68385b59',
        },
        {
          url: '/_next/static/chunks/app/error-6e8b2a078165ecf6.js',
          revision: '6e8b2a078165ecf6',
        },
        {
          url: '/_next/static/chunks/app/gallery/page-d42a237d1f032342.js',
          revision: 'd42a237d1f032342',
        },
        {
          url: '/_next/static/chunks/app/layout-2ac67e67e2032e18.js',
          revision: '2ac67e67e2032e18',
        },
        {
          url: '/_next/static/chunks/app/loading-5b521355cac8e6eb.js',
          revision: '5b521355cac8e6eb',
        },
        {
          url: '/_next/static/chunks/app/page-6f4badb06539a86c.js',
          revision: '6f4badb06539a86c',
        },
        {
          url: '/_next/static/chunks/app/robots.txt/route-98d7dbbbcb02ad61.js',
          revision: '98d7dbbbcb02ad61',
        },
        {
          url: '/_next/static/chunks/app/rooms/%5Bslug%5D/loading-18c7cc224f59fa04.js',
          revision: '18c7cc224f59fa04',
        },
        {
          url: '/_next/static/chunks/app/rooms/%5Bslug%5D/page-0c0bf9bc851bf64a.js',
          revision: '0c0bf9bc851bf64a',
        },
        {
          url: '/_next/static/chunks/app/rooms/page-863f3454e95c3e63.js',
          revision: '863f3454e95c3e63',
        },
        {
          url: '/_next/static/chunks/app/sitemap.xml/route-e0638a20d9f7f78c.js',
          revision: 'e0638a20d9f7f78c',
        },
        {
          url: '/_next/static/chunks/app/users/%5Bid%5D/page-ed5ba8e889e2cea8.js',
          revision: 'ed5ba8e889e2cea8',
        },
        {
          url: '/_next/static/chunks/app/~offline/page-96b990fdb75fa455.js',
          revision: '96b990fdb75fa455',
        },
        {
          url: '/_next/static/chunks/common-388ac5c0f6ceb4ea.js',
          revision: '388ac5c0f6ceb4ea',
        },
        {
          url: '/_next/static/chunks/main-app-36e408b6f7383198.js',
          revision: '36e408b6f7383198',
        },
        {
          url: '/_next/static/chunks/main-b772f90bad5951af.js',
          revision: 'b772f90bad5951af',
        },
        {
          url: '/_next/static/chunks/pages/_app-5370d9644808f03a.js',
          revision: '5370d9644808f03a',
        },
        {
          url: '/_next/static/chunks/pages/_error-d0d316015131e8f9.js',
          revision: 'd0d316015131e8f9',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-6bf577bd8c0ed90c.js',
          revision: '6bf577bd8c0ed90c',
        },
        {
          url: '/_next/static/css/8d4478ced960d341.css',
          revision: '8d4478ced960d341',
        },
        {
          url: '/_next/static/css/a7640336f9836a41.css',
          revision: 'a7640336f9836a41',
        },
        {
          url: '/_next/static/media/26a46d62cd723877-s.woff2',
          revision: 'befd9c0fdfa3d8a645d5f95717ed6420',
        },
        {
          url: '/_next/static/media/55c55f0601d81cf3-s.woff2',
          revision: '43828e14271c77b87e3ed582dbff9f74',
        },
        {
          url: '/_next/static/media/581909926a08bbc8-s.woff2',
          revision: 'f0b86e7c24f455280b8df606b89af891',
        },
        {
          url: '/_next/static/media/8e9860b6e62d6359-s.woff2',
          revision: '01ba6c2a184b8cba08b0d57167664d75',
        },
        {
          url: '/_next/static/media/97e0cb1ae144a2a9-s.woff2',
          revision: 'e360c61c5bd8d90639fd4503c829c2dc',
        },
        {
          url: '/_next/static/media/df0a9ae256c0569c-s.woff2',
          revision: 'd54db44de5ccb18886ece2fda72bdfe0',
        },
        {
          url: '/_next/static/media/e4af272ccee01ff0-s.p.woff2',
          revision: '65850a373e258f1c897a2b3d75eb74de',
        },
        {
          url: '/_next/static/vs5GacK6GVxXhbUQ59tpN/_buildManifest.js',
          revision: '4689730de110fd05bd1ff8abef34c164',
        },
        {
          url: '/_next/static/vs5GacK6GVxXhbUQ59tpN/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/assets/icons/icon-128x128.png',
          revision: 'b937f24aad62c0247d1521130d2ac956',
        },
        {
          url: '/assets/icons/icon-144x144.png',
          revision: '0a9a739087fbe40e059a14d8d437ec60',
        },
        {
          url: '/assets/icons/icon-152x152.png',
          revision: 'bfc58d7892e09a054bfe03952d0ba367',
        },
        {
          url: '/assets/icons/icon-192x192.png',
          revision: '1ea4404f2a21fb04fba1a2b1a9ff6c08',
        },
        {
          url: '/assets/icons/icon-384x384.png',
          revision: '62039bc2fd8bb4c05d0cb75e75978657',
        },
        {
          url: '/assets/icons/icon-48x48.png',
          revision: 'ae0a110cc9ed45378ebf48b79dfce76d',
        },
        {
          url: '/assets/icons/icon-512x512.png',
          revision: '1afa6f745b2eb84e3a4274b786c51bb4',
        },
        {
          url: '/assets/icons/icon-72x72.png',
          revision: '88171ffcc481708a9a798298fea9f16d',
        },
        {
          url: '/assets/icons/icon-96x96.png',
          revision: '42f18afe3e6c0ca20b78175bd643c92a',
        },
        {
          url: '/assets/icons/maskable-icon.png',
          revision: '1afa6f745b2eb84e3a4274b786c51bb4',
        },
        { url: '/avatars/1.png', revision: '58e626d6f907fb7aa765d9a9a322b95a' },
        {
          url: '/avatars/10.png',
          revision: 'a1836c18bb93feb6971421b721681382',
        },
        {
          url: '/avatars/11.png',
          revision: 'c28139c49727dae419e2b8f90c7907c8',
        },
        {
          url: '/avatars/12.png',
          revision: '1191eb7e312d71cc4d2d34111f22b23a',
        },
        {
          url: '/avatars/13.png',
          revision: '7db046b9a28f4612aec299cf912ffd8c',
        },
        {
          url: '/avatars/14.png',
          revision: '183037ea5d4b569261508b2af735b825',
        },
        {
          url: '/avatars/15.png',
          revision: '6026cbec0cc272e6e86e34e81edee37e',
        },
        {
          url: '/avatars/16.png',
          revision: '791d037baca7617ef89ae5f94db64587',
        },
        {
          url: '/avatars/17.png',
          revision: '75848746124bb4f4aabb733d9ed6b4f5',
        },
        {
          url: '/avatars/18.png',
          revision: '7dced62f876833c100fbe8d7905b096b',
        },
        {
          url: '/avatars/19.png',
          revision: '9cefc4833c4a6baeb714743c1a6fa519',
        },
        { url: '/avatars/2.png', revision: '96241f3ea670ddad5d32dac47df5177f' },
        { url: '/avatars/3.png', revision: '9fa545007e0b83abbb94ab233c36c511' },
        { url: '/avatars/4.png', revision: '736d79de072f65e53baea61d6ca9670c' },
        { url: '/avatars/5.png', revision: '8b355619a54abaca5471ae6ccb48cc00' },
        { url: '/avatars/6.png', revision: '0b24614f7c2e373e7d84f72cc72e4c58' },
        { url: '/avatars/7.png', revision: 'afe0b7748a408945a574be2b12659dfe' },
        { url: '/avatars/8.png', revision: 'ad16a715b384085873955501b1c1978b' },
        { url: '/avatars/9.png', revision: '4e893da9914674f87e0ae9d2d40b88ac' },
        {
          url: '/avatars/avatar-ing.webp',
          revision: '7229e88fcfcc90c5e8ac8ae3731ef8cb',
        },
        {
          url: '/avatars/avom-image.jpeg',
          revision: 'd500069a1edaca7feae9b246b6581944',
        },
        {
          url: '/fallback-ce627215c0e4a9af.js',
          revision: '200969ddb0a5182b4733a40d7dd88261',
        },
        {
          url: '/hotelmgt/bookedrooms.png',
          revision: 'e79af05acc32ac39e9c0f90bdb60472a',
        },
        {
          url: '/hotelmgt/darkroomdetail.png',
          revision: '2d3ce53127b956401d15fa2e18b48b25',
        },
        {
          url: '/hotelmgt/frontpagedark.png',
          revision: '83f037103e999d860f0c6a95e87f96f6',
        },
        {
          url: '/hotelmgt/hotelmgtFrontpage.png',
          revision: '9e737da2e2b22774377829b689e2268d',
        },
        {
          url: '/hotelmgt/hotelmgtfooter.png',
          revision: '837f1114afe3aaeeaa72f6f5839b87a9',
        },
        {
          url: '/hotelmgt/newaletterdark.png',
          revision: '8c738d14084619bbd868b2b8c7cc6c0b',
        },
        {
          url: '/hotelmgt/roomdetails.png',
          revision: '60acc0baf84015c2a780434bb23898d4',
        },
        {
          url: '/images/alen.jpg',
          revision: '89bf5484b8d11d91bb5d707ae362f570',
        },
        {
          url: '/images/alexander.jpg',
          revision: 'b623b39cc1f276da30fea74e5046ed03',
        },
        {
          url: '/images/jacquesbopp.jpg',
          revision: '4502db816583aa423fbeb8b3a3f535eb',
        },
        {
          url: '/images/jean.jpg',
          revision: 'd34c7aebdf19d20848764f269305c69f',
        },
        {
          url: '/images/michaeloxendine.jpg',
          revision: '7acf9489283efe73d9491a9eda13b01b',
        },
        {
          url: '/images/roberto.jpg',
          revision: 'f444c3421f8620a97d59d2fc9b9bdf8e',
        },
        {
          url: '/images/roberto1.jpg',
          revision: '6195d3942a815ea0a751d0e0114cc971',
        },
        {
          url: '/images/visualsofdana.jpg',
          revision: '2f664669d4cca8877371f187d0bfb5df',
        },
        { url: '/manifest.json', revision: '2672bf502a4aece89f34b0d956e5e789' },
        { url: '/og-image.jpg', revision: '1afa6f745b2eb84e3a4274b786c51bb4' },
        { url: '/~offline', revision: 'vs5GacK6GVxXhbUQ59tpN' },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ response: e }) =>
              e && 'opaqueredirect' === e.type
                ? new Response(e.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: e.headers,
                  })
                : e,
          },
          {
            handlerDidError: async ({ request: e }) =>
              'undefined' != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
          {
            handlerDidError: async ({ request: e }) =>
              'undefined' != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
          {
            handlerDidError: async ({ request: e }) =>
              'undefined' != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
          {
            handlerDidError: async ({ request: e }) =>
              'undefined' != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 }),
          {
            handlerDidError: async ({ request: e }) =>
              'undefined' != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/static.+\.js$/i,
      new e.CacheFirst({
        cacheName: 'next-static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              'undefined' != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              'undefined' != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              'undefined' != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4|webm)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              'undefined' != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 48, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              'undefined' != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              'undefined' != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              'undefined' != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              'undefined' != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ sameOrigin: e, url: { pathname: a } }) =>
        !(!e || a.startsWith('/api/auth/callback') || !a.startsWith('/api/')),
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              'undefined' != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: a }, sameOrigin: s }) =>
        '1' === e.headers.get('RSC') &&
        '1' === e.headers.get('Next-Router-Prefetch') &&
        s &&
        !a.startsWith('/api/'),
      new e.NetworkFirst({
        cacheName: 'pages-rsc-prefetch',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              'undefined' != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: a }, sameOrigin: s }) =>
        '1' === e.headers.get('RSC') && s && !a.startsWith('/api/'),
      new e.NetworkFirst({
        cacheName: 'pages-rsc',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              'undefined' != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: { pathname: e }, sameOrigin: a }) => a && !e.startsWith('/api/'),
      new e.NetworkFirst({
        cacheName: 'pages',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              'undefined' != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ sameOrigin: e }) => !e,
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
          {
            handlerDidError: async ({ request: e }) =>
              'undefined' != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      'GET'
    ));
});
