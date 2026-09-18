# eshaik.github.io

Personal portfolio for Eduin Shaik — Full-Stack Engineer. Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com), deployed to GitHub Pages.

Bilingual (English / Español) via a client-side language switch — no page reload, no routing, preference saved in `localStorage`.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages.

To enable it on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
