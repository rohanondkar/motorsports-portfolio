# Rohan Ondkar — Motorsports 3D Portfolio

Arkham-style cinematic race hero: slow-motion multi-series field, money-shot car framing, project rooms (engineer radio, vision HUD, wind tunnel, briefing, paddock).

## Stack

- Vite + React + TypeScript
- Three.js / React Three Fiber / Drei
- GSAP camera transitions
- Free host: GitHub Pages → [rohanondkar.github.io](https://rohanondkar.github.io)

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

Live site: [https://rohanondkar.github.io](https://rohanondkar.github.io)

Source: [rohanondkar/motorsports-portfolio](https://github.com/rohanondkar/motorsports-portfolio)

```bash
npm run deploy
```

That builds and pushes `dist/` to `rohanondkar/rohanondkar.github.io`.

Optional CI: add repo secret `PAGES_DEPLOY_TOKEN` (PAT with `repo` + `workflow`), then commit `.github/workflows/deploy.yml` so pushes auto-deploy.

## Controls

- Click a car to focus (money shot)
- Click again (or Enter) to open its project room
- Track / weather / time-of-day / series / quality in the edge controls
- Layout adapts for portrait, landscape, wide (duo/fold span), and tall-narrow foldables
