import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// En production derriere Caddy, on passe le domaine public via VITE_PUBLIC_HOST
// (ex: dfip.totorow.com). En local cette variable n'existe pas : Vite garde son
// comportement par defaut (HMR sur localhost).
const publicHost = process.env.VITE_PUBLIC_HOST

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: publicHost ? [publicHost] : undefined,
    // Derriere le proxy HTTPS, le live-reload doit passer en wss sur le port 443
    hmr: publicHost ? { protocol: 'wss', clientPort: 443, host: publicHost } : undefined,
  },
})
