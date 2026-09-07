# Deploying to Vercel

First deploy takes about five minutes. Every deploy after that is `git push`.

---

## The thing to understand first

Vite bakes `VITE_*` variables into the JavaScript at build time. They are not read at runtime.

1. Variables must exist in Vercel **before** the build runs.
2. Changing one does nothing until you **redeploy**. Saving is not enough.
3. Anything with a `VITE_` prefix is public, sitting in a file anyone can download.

For this site that is fine — the Formspree endpoint and a GitHub username are both meant to be
public. But it is the reason there is no API key anywhere in this project, and why there should
never be one.

---

## 1. Check the build locally

```bash
npm run build
npm run preview
```

If it does not build on your machine it will not build on Vercel. Fix it here first, where the
feedback loop is seconds instead of minutes.

---

## 2. Push to GitHub

This deploys to the existing `website` repository:

```bash
git remote add origin https://github.com/spencer-coder/website.git
git push -u origin main
```

If that repo has any commits already, the first push needs `--force-with-lease` — check what is
in it before overwriting anything.

---

## 3. Import into Vercel

1. <https://vercel.com/new> → import the repository.
2. Vercel reads `vercel.json` and detects Vite. **Do not override** the build command or output
   directory — they are already correct.
3. Before clicking Deploy, add the environment variables below.

## 4. Environment variables

Add under Settings → Environment Variables, for **all three** environments (Production, Preview,
Development):

| Name                      | Value                                |
| ------------------------- | ------------------------------------ |
| `VITE_FORMSPREE_ENDPOINT` | Your form endpoint from formspree.io |
| `VITE_GITHUB_USERNAME`    | `spencer-coder`                      |

Neither is a secret. Both are optional — without them the site still works, it just falls back to
a mailto block and static repo data.

---

## 5. After the first deploy

**Update the URLs in `index.html`.** The `og:url`, `og:image`, `twitter:image` and `canonical`
tags are currently pointing at `https://spencerbokor.com/`. If you are deploying to a
`.vercel.app` address instead, change them — an OG image URL that 404s means the link previews as
a bare grey box in LinkedIn messages.

Then check the preview actually renders at <https://www.opengraph.xyz> before sharing the link
anywhere.

**Point Formspree at the deployed domain.** Formspree restricts submissions by origin. Add the
production domain in the form's settings or real submissions will be rejected even though the
form worked locally.

---

## Custom domain

Settings → Domains → add it, then create the DNS records Vercel shows you. Propagation is usually
minutes. HTTPS is automatic and needs no configuration.

Once the domain is live, update the `index.html` URLs again if you had pointed them at the
`.vercel.app` address in the meantime.

---

## When something goes wrong

| Symptom                                | Cause                                                                     |
| -------------------------------------- | ------------------------------------------------------------------------- |
| Blank page, no console error           | Almost always a build-time env var. Check the deploy log.                 |
| Contact form works locally, fails live | The production domain is not authorised in Formspree.                     |
| Activity section shows only two repos  | The GitHub API is rate limited or blocked; the fallback is doing its job. |
| Link preview is a grey box             | `og:image` URL is wrong or the file is missing from `public/`.            |
| 404 on refresh                         | `vercel.json` rewrites were overridden in the dashboard.                  |
