# GoIT Advanced JavaScript — Homework 04

Image search with the [Pixabay API](https://pixabay.com/api/docs/#api_search_images): Axios, SimpleLightbox, iziToast, css-loader spinner.

## Setup

1. Copy `.env.example` to `.env`.
2. Add your Pixabay API key as `VITE_PIXABAY_API_KEY` ([get a key](https://pixabay.com/api/docs/)).

## Run

```bash
bun install
bun run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
bun run build
```

Production build uses `--base=/goit-advancedjs-hw-04/` for GitHub Pages.

For CI deploy, add repository secret `VITE_PIXABAY_API_KEY` (Settings → Secrets → Actions).
