import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      // Automatically detect and install the new service worker
      registerType: "autoUpdate",

      // Assets from public/ that should be included
      includeAssets: [
        "favicon.ico",
        "robots.txt",
        "**/*.html",
        "**/*.png",
        "**/*.jpg",
        "**/*.jpeg",
        "**/*.svg",
        "**/*.webp",
        "**/*.woff",
        "**/*.woff2"
      ],

      manifest: {
        name: "Notes Web",
        short_name: "Notes Web",
        description: "Offline programming notes",

        start_url: "/",
        scope: "/",

        display: "standalone",
        orientation: "portrait",

        theme_color: "#ffffff",
        background_color: "#ffffff",

        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      },

      workbox: {
        /*
         * IMPORTANT:
         * This makes future HTML notes part of the
         * service-worker precache whenever you build.
         */
        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff,woff2}"
        ],

        /*
         * If a user opens a React route that does not
         * exist as a physical file, load the React app.
         */
        navigateFallback: "/index.html",

        /*
         * Remove old Workbox caches when a new
         * service worker version is installed.
         */
        cleanupOutdatedCaches: true,

        /*
         * New service worker can take control of
         * existing pages immediately.
         */
        clientsClaim: true,

        /*
         * Activate the new service worker immediately.
         */
        skipWaiting: true,

        /*
         * HTML documents:
         * NetworkFirst means users can receive the
         * newest deployed version while still having
         * an offline fallback.
         */
        runtimeCaching: [
          {
            urlPattern: ({ request }) =>
              request.destination === "document",

            handler: "NetworkFirst",

            options: {
              cacheName: "notes-pages-cache",

              networkTimeoutSeconds: 3,

              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30
              }
            }
          },

          /*
           * JavaScript, CSS, images and fonts.
           */
          {
            urlPattern: ({ request }) =>
              ["script", "style", "image", "font"].includes(
                request.destination
              ),

            handler: "CacheFirst",

            options: {
              cacheName: "notes-assets-cache",

              expiration: {
                maxEntries: 300,
                maxAgeSeconds: 60 * 60 * 24 * 30
              }
            }
          }
        ]
      }
    })
  ]
});