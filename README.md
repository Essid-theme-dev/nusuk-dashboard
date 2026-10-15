This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on GitHub Pages

This repository is configured to deploy automatically to GitHub Pages using GitHub Actions.

- Workflow file: `.github/workflows/deploy-pages.yml`
- Static export output: `out/`
- Next.js config supports project-page base path during Actions build.

After pushing to `main`, go to your repository settings and set:

1. **Settings → Pages**
2. **Source:** `GitHub Actions`

Then your site will be published from the workflow run.

### If you only see this README on the live URL

1. In the repo: **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”). A branch deployment with no `index.html` at the repo root often shows README-style content instead of the app.
2. Open **Actions** and confirm the latest **Deploy to GitHub Pages** workflow succeeded.
3. After a green deploy, open `https://<user>.github.io/<repo>/` — the dashboard should load from the `out/` artifact.

Live example for this project pattern: [https://essid-theme-dev.github.io/nuxem.io/](https://essid-theme-dev.github.io/nuxem.io/)
