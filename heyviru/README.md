## Virendra Sankpal — Video Editor (PWA)

- Install: `npm i` then `npm run dev`
- Develop: visit `http://localhost:3000`
- Build: `npm run build && npm start`

### Features
- Next.js App Router, TypeScript, Tailwind
- Installable PWA: `manifest.webmanifest` + `public/sw.js`
- Offline fallbacks: shell and JSON lists cached; videos excluded
- Reduced-motion animations via Framer Motion
- JSON-driven content under `data/`
- Offline-friendly contact form with draft save + queued submission

### Replace media/content
- Replace placeholders in `public/media` and `data/*.json`
- Hero poster: `public/hero-poster.jpg`
- OG image: `public/og.jpg`

### Test PWA installability
1. Run `npm run build && npm start`
2. Open in Chrome → Application tab → Manifest should pass; try “Install app” in header

### Test offline
- Visit `/`, `/offline`
- DevTools → Network → Offline; reload → shell renders, lists from cache; videos show poster only

### Push enablement (optional)
- `public/sw.js` has a basic `push` listener; wire VAPID/web-push backend to enable

### Deployment
- Any HTTPS host (Vercel recommended). Ensure `public/sw.js` is served at site root.
