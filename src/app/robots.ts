import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/private/",
          "/users/",
          "/_next/",
          "/static/",
          "/debug/",
          "/~offline/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/private/",
          "/users/",
          "/debug/",
          "/~offline/",
        ],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/private/",
          "/users/",
          "/debug/",
          "/~offline/",
        ],
      },
    ],
    sitemap: "https://hotel-mgt.vercel.app/sitemap.xml",
    host: "https://hotel-mgt.vercel.app",
  };
}
