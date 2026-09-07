# Yuchen Xing's Portfolio

English personal portfolio for [Yuchen Xing (Daniel)](mailto:yuchenxing373@gmail.com). Built with **Next.js App Router**, **pnpm**, and deployed on **Vercel**. Copy and media live in `src/content/site.ts` and `public/media/`.

## What’s on the site

- **Hero** — name, portrait, contact, education (Cornell Tech, Vanderbilt, Rochester), and a short inventory of projects, interests, and internships
- **Projects** — Pigeon White; DeathSpire Codex
- **Interests** — 3D printing; research on AI in education (AIED); Reuse, Reduce, Recycle
- **Internships** — NetEase Games; ChicPoint; Deloitte
- [`/resume`](http://localhost:3000/resume) — résumé PDF preview
- [`/ai-ethics`](http://localhost:3000/ai-ethics) — CAL Evaluation and Guided Adoption of AIED PDF preview

## Local

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
pnpm build
pnpm start
```

## Deploy on Vercel

1. Import this repository in Vercel.
2. Framework: Next.js. Install: `pnpm install`. Build: `pnpm build`.
3. Deploy. Custom domain can wait.

## Edit later

- **Text and order** — [`src/content/site.ts`](src/content/site.ts)
- **Photos and videos** — files under [`public/media/`](public/media); keep `src` paths in `site.ts` in sync
- **Résumé** — `public/resume.pdf` (preview at `/resume`)
