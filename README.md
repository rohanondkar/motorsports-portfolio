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

Push to `main` runs `.github/workflows/deploy.yml`, which builds and publishes `dist/` to `rohanondkar/rohanondkar.github.io`.

Set repo secret `PAGES_DEPLOY_TOKEN` to a PAT with `repo` scope for the Pages repo (or deploy manually):

```bash
npm run build
# copy dist contents into rohanondkar.github.io and push
```

## Controls

- Click a car to focus (money shot)
- Click again (or Enter) to open its project room
- Track / weather / time-of-day / series / quality in the edge controls
- Layout adapts for portrait, landscape, wide (duo/fold span), and tall-narrow foldables
