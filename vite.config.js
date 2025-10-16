import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true }, // PWA en desarrollo
      includeAssets: [
        // copia TODO lo que hay en estas carpetas al build
        "android/*.png",
        "ios/*.png",
        "windows11/*.png",
        "icono.png", // por si usas favicon/app icon
        "icons.json", // si lo necesitas
      ],
      manifest: {
        id: "/agenda/",
        name: "Agenda de Contactos",
        short_name: "Agenda",
        description:
          "Agenda de contactos con Redux/Reducer y almacenamiento local.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "portrait",
        theme_color: "#198754",
        background_color: "#ffffff",
        // ICONOS principales del manifest (Chrome/Android)
        icons: [
          // Android launchers que ya tienes:
          {
            src: "/android/android-launchericon-72-72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "/android/android-launchericon-96-96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "/android/android-launchericon-144-144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "/android/android-launchericon-192-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android/android-launchericon-512-512.png",
            sizes: "512x512",
            type: "image/png",
          },

          // Maskable (si tus íconos tienen margen seguro; si no, déjalos igual)
          {
            src: "/android/android-launchericon-192-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/android/android-launchericon-512-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable any",
          },

          // Opcional: algunos iOS para navegadores que sí miran manifest (no Safari)
          { src: "/ios/192.png", sizes: "192x192", type: "image/png" },
          { src: "/ios/256.png", sizes: "256x256", type: "image/png" },
          { src: "/ios/512.png", sizes: "512x512", type: "image/png" },

          // Windows 11 (Edge usa manifest): añade algunos tamaños típicos
          {
            src: "/windows11/Square150x150Logo.scale-200.png",
            sizes: "300x300",
            type: "image/png",
          },
          {
            src: "/windows11/Wide310x150Logo.scale-200.png",
            sizes: "620x300",
            type: "image/png",
          },
          {
            src: "/windows11/Square44x44Logo.targetsize-256.png",
            sizes: "256x256",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Nuevo contacto",
            short_name: "Nuevo",
            url: "/?nuevo=1",
            icons: [
              {
                src: "/android/android-launchericon-192-192.png",
                sizes: "192x192",
                type: "image/png",
              },
            ],
          },
        ],
      },
      // Workbox: caché offline básico
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}"],
        runtimeCaching: [
          {
            urlPattern: ({ request }) =>
              request.destination === "document" ||
              request.destination === "script" ||
              request.destination === "style",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "static-resources",
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
    }),
  ],
});
