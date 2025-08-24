if (!self.define) {
  let e,
    s = {};
  const a = (a, n) => (
    (a = new URL(a + ".js", n).href),
    s[a] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          ((e.src = a), (e.onload = s), document.head.appendChild(e));
        } else ((e = a), importScripts(a), s());
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, i) => {
    const c =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[c]) return;
    let r = {};
    const t = (e) => a(e, c),
      o = { module: { uri: c }, exports: r, require: t };
    s[c] = Promise.all(n.map((e) => o[e] || t(e))).then((e) => (i(...e), r));
  };
}
define(["./workbox-f1770938"], function (e) {
  "use strict";
  (importScripts("/fallback-ce627215c0e4a9af.js"),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/static/JIHelfra5BEdQb1meQszl/_buildManifest.js",
          revision: "e5cca49ad3665f51a6e717be6b9e4126",
        },
        {
          url: "/_next/static/JIHelfra5BEdQb1meQszl/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/app/(cms)/layout-9012b85445616664.js",
          revision: "9012b85445616664",
        },
        {
          url: "/_next/static/chunks/app/(cms)/studio/%5B%5B...index%5D%5D/page-1817ca7872467441.js",
          revision: "1817ca7872467441",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-707661ddcb7e44c0.js",
          revision: "707661ddcb7e44c0",
        },
        {
          url: "/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-606c1a8d1b0b46cd.js",
          revision: "606c1a8d1b0b46cd",
        },
        {
          url: "/_next/static/chunks/app/api/contact/route-b4bdd04b1cc30e5e.js",
          revision: "b4bdd04b1cc30e5e",
        },
        {
          url: "/_next/static/chunks/app/api/performance-metrics/route-404572a4b8660d6a.js",
          revision: "404572a4b8660d6a",
        },
        {
          url: "/_next/static/chunks/app/api/room-reviews/%5Bid%5D/route-326125009353cb7b.js",
          revision: "326125009353cb7b",
        },
        {
          url: "/_next/static/chunks/app/api/room/%5Bslug%5D/route-724fc282dcf6247c.js",
          revision: "724fc282dcf6247c",
        },
        {
          url: "/_next/static/chunks/app/api/rooms/%5Bslug%5D/route-a27b2ece0291b98e.js",
          revision: "a27b2ece0291b98e",
        },
        {
          url: "/_next/static/chunks/app/api/rooms/route-7496374497fbe283.js",
          revision: "7496374497fbe283",
        },
        {
          url: "/_next/static/chunks/app/api/sanity/signUp/route-f312e45ed15941a1.js",
          revision: "f312e45ed15941a1",
        },
        {
          url: "/_next/static/chunks/app/api/stripe/route-53a99d0c46dc0dec.js",
          revision: "53a99d0c46dc0dec",
        },
        {
          url: "/_next/static/chunks/app/api/userbooking/route-367f34966ea9f0cf.js",
          revision: "367f34966ea9f0cf",
        },
        {
          url: "/_next/static/chunks/app/api/users/route-8a31c3b30afa7eca.js",
          revision: "8a31c3b30afa7eca",
        },
        {
          url: "/_next/static/chunks/app/api/webhook/route-d588aa5b9192a3e6.js",
          revision: "d588aa5b9192a3e6",
        },
        {
          url: "/_next/static/chunks/app/auth/page-ea1a14a849cb6d7b.js",
          revision: "ea1a14a849cb6d7b",
        },
        {
          url: "/_next/static/chunks/app/contact/page-8be5e437670851ed.js",
          revision: "8be5e437670851ed",
        },
        {
          url: "/_next/static/chunks/app/error-8a4519094942401b.js",
          revision: "8a4519094942401b",
        },
        {
          url: "/_next/static/chunks/app/gallery/loading-1d448fe4ccb66b10.js",
          revision: "1d448fe4ccb66b10",
        },
        {
          url: "/_next/static/chunks/app/gallery/page-6c721e7619f048f3.js",
          revision: "6c721e7619f048f3",
        },
        {
          url: "/_next/static/chunks/app/layout-addd285543f6f016.js",
          revision: "addd285543f6f016",
        },
        {
          url: "/_next/static/chunks/app/loading-9ad645c9696a1f16.js",
          revision: "9ad645c9696a1f16",
        },
        {
          url: "/_next/static/chunks/app/page-e6d24ddcc5a0fc8b.js",
          revision: "e6d24ddcc5a0fc8b",
        },
        {
          url: "/_next/static/chunks/app/robots.txt/route-306b452023755515.js",
          revision: "306b452023755515",
        },
        {
          url: "/_next/static/chunks/app/rooms/%5Bslug%5D/loading-aeff396fda53e4e8.js",
          revision: "aeff396fda53e4e8",
        },
        {
          url: "/_next/static/chunks/app/rooms/%5Bslug%5D/page-5c6b3619fb27b14b.js",
          revision: "5c6b3619fb27b14b",
        },
        {
          url: "/_next/static/chunks/app/rooms/page-16751f701a12c5c6.js",
          revision: "16751f701a12c5c6",
        },
        {
          url: "/_next/static/chunks/app/sitemap.xml/route-0fb4e0f84b59c29b.js",
          revision: "0fb4e0f84b59c29b",
        },
        {
          url: "/_next/static/chunks/app/users/%5Bid%5D/page-21334cf51a5ac8be.js",
          revision: "21334cf51a5ac8be",
        },
        {
          url: "/_next/static/chunks/app/~offline/page-9a46ad6ccb722e34.js",
          revision: "9a46ad6ccb722e34",
        },
        {
          url: "/_next/static/chunks/main-419a81c6ecf27f99.js",
          revision: "419a81c6ecf27f99",
        },
        {
          url: "/_next/static/chunks/main-app-0099afd9e9e8547b.js",
          revision: "0099afd9e9e8547b",
        },
        {
          url: "/_next/static/chunks/pages/_app-bbf15dfad8efbe2f.js",
          revision: "bbf15dfad8efbe2f",
        },
        {
          url: "/_next/static/chunks/pages/_error-1f418f10fcc91c15.js",
          revision: "1f418f10fcc91c15",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-c5752a41f1677603.js",
          revision: "c5752a41f1677603",
        },
        {
          url: "/_next/static/css/589054f2b5071809.css",
          revision: "589054f2b5071809",
        },
        {
          url: "/_next/static/css/e881f19b36755788.css",
          revision: "e881f19b36755788",
        },
        {
          url: "/_next/static/media/26a46d62cd723877-s.woff2",
          revision: "befd9c0fdfa3d8a645d5f95717ed6420",
        },
        {
          url: "/_next/static/media/55c55f0601d81cf3-s.woff2",
          revision: "43828e14271c77b87e3ed582dbff9f74",
        },
        {
          url: "/_next/static/media/581909926a08bbc8-s.woff2",
          revision: "f0b86e7c24f455280b8df606b89af891",
        },
        {
          url: "/_next/static/media/8e9860b6e62d6359-s.woff2",
          revision: "01ba6c2a184b8cba08b0d57167664d75",
        },
        {
          url: "/_next/static/media/97e0cb1ae144a2a9-s.woff2",
          revision: "e360c61c5bd8d90639fd4503c829c2dc",
        },
        {
          url: "/_next/static/media/df0a9ae256c0569c-s.woff2",
          revision: "d54db44de5ccb18886ece2fda72bdfe0",
        },
        {
          url: "/_next/static/media/e4af272ccee01ff0-s.p.woff2",
          revision: "65850a373e258f1c897a2b3d75eb74de",
        },
        {
          url: "/assets/icons/icon-128x128.png",
          revision: "b937f24aad62c0247d1521130d2ac956",
        },
        {
          url: "/assets/icons/icon-144x144.png",
          revision: "0a9a739087fbe40e059a14d8d437ec60",
        },
        {
          url: "/assets/icons/icon-152x152.png",
          revision: "bfc58d7892e09a054bfe03952d0ba367",
        },
        {
          url: "/assets/icons/icon-16x16.png",
          revision: "ae0a110cc9ed45378ebf48b79dfce76d",
        },
        {
          url: "/assets/icons/icon-192x192.png",
          revision: "1ea4404f2a21fb04fba1a2b1a9ff6c08",
        },
        {
          url: "/assets/icons/icon-32x32.png",
          revision: "ae0a110cc9ed45378ebf48b79dfce76d",
        },
        {
          url: "/assets/icons/icon-384x384 copy.png",
          revision: "62039bc2fd8bb4c05d0cb75e75978657",
        },
        {
          url: "/assets/icons/icon-384x384.png",
          revision: "62039bc2fd8bb4c05d0cb75e75978657",
        },
        {
          url: "/assets/icons/icon-48x48.png",
          revision: "ae0a110cc9ed45378ebf48b79dfce76d",
        },
        {
          url: "/assets/icons/icon-512x512.png",
          revision: "1afa6f745b2eb84e3a4274b786c51bb4",
        },
        {
          url: "/assets/icons/icon-72x72.png",
          revision: "88171ffcc481708a9a798298fea9f16d",
        },
        {
          url: "/assets/icons/icon-96x96.png",
          revision: "42f18afe3e6c0ca20b78175bd643c92a",
        },
        {
          url: "/assets/icons/maskable-icon.png",
          revision: "1afa6f745b2eb84e3a4274b786c51bb4",
        },
        { url: "/avatars/1.png", revision: "58e626d6f907fb7aa765d9a9a322b95a" },
        {
          url: "/avatars/10.png",
          revision: "a1836c18bb93feb6971421b721681382",
        },
        {
          url: "/avatars/11.png",
          revision: "c28139c49727dae419e2b8f90c7907c8",
        },
        {
          url: "/avatars/12.png",
          revision: "1191eb7e312d71cc4d2d34111f22b23a",
        },
        {
          url: "/avatars/13.png",
          revision: "7db046b9a28f4612aec299cf912ffd8c",
        },
        {
          url: "/avatars/14.png",
          revision: "183037ea5d4b569261508b2af735b825",
        },
        {
          url: "/avatars/15.png",
          revision: "6026cbec0cc272e6e86e34e81edee37e",
        },
        {
          url: "/avatars/16.png",
          revision: "791d037baca7617ef89ae5f94db64587",
        },
        {
          url: "/avatars/17.png",
          revision: "75848746124bb4f4aabb733d9ed6b4f5",
        },
        {
          url: "/avatars/18.png",
          revision: "7dced62f876833c100fbe8d7905b096b",
        },
        {
          url: "/avatars/19.png",
          revision: "9cefc4833c4a6baeb714743c1a6fa519",
        },
        { url: "/avatars/2.png", revision: "96241f3ea670ddad5d32dac47df5177f" },
        { url: "/avatars/3.png", revision: "9fa545007e0b83abbb94ab233c36c511" },
        { url: "/avatars/4.png", revision: "736d79de072f65e53baea61d6ca9670c" },
        { url: "/avatars/5.png", revision: "8b355619a54abaca5471ae6ccb48cc00" },
        { url: "/avatars/6.png", revision: "0b24614f7c2e373e7d84f72cc72e4c58" },
        { url: "/avatars/7.png", revision: "afe0b7748a408945a574be2b12659dfe" },
        { url: "/avatars/8.png", revision: "ad16a715b384085873955501b1c1978b" },
        { url: "/avatars/9.png", revision: "4e893da9914674f87e0ae9d2d40b88ac" },
        {
          url: "/avatars/avatar-ing.webp",
          revision: "7229e88fcfcc90c5e8ac8ae3731ef8cb",
        },
        {
          url: "/avatars/avom-image.jpeg",
          revision: "d500069a1edaca7feae9b246b6581944",
        },
        {
          url: "/fallback-ce627215c0e4a9af.js",
          revision: "200969ddb0a5182b4733a40d7dd88261",
        },
        {
          url: "/hotelmgt/hmgt_1.png",
          revision: "77b9130c72946ee29e6af0f113d18e91",
        },
        {
          url: "/hotelmgt/hmgt_2.png",
          revision: "206b5819ea7f5bb088f3408f509b9590",
        },
        {
          url: "/hotelmgt/hmgt_3.png",
          revision: "333ec64f3226e78a19cc49aa99c789b4",
        },
        {
          url: "/hotelmgt/hmgt_4.png",
          revision: "fb8717cec38a3ca982306bb9697b8738",
        },
        {
          url: "/hotelmgt/hmgt_5.png",
          revision: "cfe72d1d5d1b3137fb77523d2e080818",
        },
        {
          url: "/hotelmgt/hmgt_6.png",
          revision: "44a964a84cff65e05c6247e4b3d0fe05",
        },
        {
          url: "/hotelmgt/hmgt_7 .png",
          revision: "8e60db6f3006f4891971954d99a173c9",
        },
        {
          url: "/images/jean.jpg",
          revision: "d34c7aebdf19d20848764f269305c69f",
        },
        {
          url: "/images/michaeloxendine.jpg",
          revision: "7acf9489283efe73d9491a9eda13b01b",
        },
        {
          url: "/images/roberto.jpg",
          revision: "f444c3421f8620a97d59d2fc9b9bdf8e",
        },
        {
          url: "/images/seo/og-image-1200x630.jpg",
          revision: "1afa6f745b2eb84e3a4274b786c51bb4",
        },
        {
          url: "/images/seo/og-image-800x420.jpg",
          revision: "1afa6f745b2eb84e3a4274b786c51bb4",
        },
        {
          url: "/images/seo/twitter-image-1200x600.jpg",
          revision: "1afa6f745b2eb84e3a4274b786c51bb4",
        },
        {
          url: "/images/visualsofdana.jpg",
          revision: "2f664669d4cca8877371f187d0bfb5df",
        },
        { url: "/manifest.json", revision: "2672bf502a4aece89f34b0d956e5e789" },
        { url: "/og-image.jpg", revision: "1afa6f745b2eb84e3a4274b786c51bb4" },
        { url: "/~offline", revision: "JIHelfra5BEdQb1meQszl" },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({ response: e }) =>
              e && "opaqueredirect" === e.type
                ? new Response(e.body, {
                    status: 200,
                    statusText: "OK",
                    headers: e.headers,
                  })
                : e,
          },
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/static.+\.js$/i,
      new e.CacheFirst({
        cacheName: "next-static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp4|webm)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 48, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ sameOrigin: e, url: { pathname: s } }) =>
        !(!e || s.startsWith("/api/auth/callback") || !s.startsWith("/api/")),
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: s }, sameOrigin: a }) =>
        "1" === e.headers.get("RSC") &&
        "1" === e.headers.get("Next-Router-Prefetch") &&
        a &&
        !s.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages-rsc-prefetch",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: s }, sameOrigin: a }) =>
        "1" === e.headers.get("RSC") && a && !s.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages-rsc",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: { pathname: e }, sameOrigin: s }) => s && !e.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ sameOrigin: e }) => !e,
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET",
    ));
});
