# Project Status

## Project
- Workspace: current repository
- Stack: `Next.js + TypeScript + Tailwind CSS + Framer Motion`
- Deployment target: `GitHub Pages`
- Delivery mode: `Plan A + Sanity CMS`
- Meaning of Plan A + Sanity CMS: static GitHub Pages deployment, with Sanity as the optional backend content source and `data/site.ts` as the fallback

## Current Product Direction
- The PSD-style landing visual is the primary hero
- The two image buttons inside the visual are real clickable hotspots
- `LINKS / MY ACCOUNTS` scrolls to the links section
- `HOME / HOME PAGE` scrolls back to the top
- Gallery stays on the same page and opens a modal instead of navigating away
- Sanity CMS is the preferred content backend when environment variables are configured

## Implemented
- Next.js app scaffold is complete
- Single-page layout is in place
- Hero uses the optimized poster asset: `public/assets/poster-main.webp`
- PSD button crops are used as clickable hotspots:
  - `public/assets/hotspots/btn-links.png`
  - `public/assets/hotspots/btn-home.png`
- About / Links / Gallery sections exist
- Gallery modal exists
- Gallery data supports:
  - `thumbnail`
  - `fullImage`
  - `width`
  - `height`
- Upscaled modal images are in place:
  - `public/assets/gallery/full/work-1.webp`
  - `public/assets/gallery/full/work-2.webp`
  - `public/assets/gallery/full/work-3.webp`
  - `public/assets/gallery/full/work-4.webp`
- `data/site.ts` text content has been cleaned and normalized
- `docs/gallery-assets-spec.md` has been rewritten in clean UTF-8
- Unused debug assets removed:
  - `public/assets/background.png`
  - `public/assets/hotspots/debug-buttons-area.png`
  - `public/assets/extract/group_14_buttons.png`
- Static export config for GitHub Pages is in place
- Sanity Studio route exists at `/studio`
- Frontend reads Sanity content at build time and falls back to `data/site.ts`
- Studio navigation is organized into `站点内容` and `作品管理`
- GitHub Actions supports manual deploy and optional Sanity-triggered `repository_dispatch`

## Main Files
- Entry page: [app/page.tsx](E:/panweidongkaifa/降A大调协奏曲oc个人主页网站开发/app/page.tsx)
- Hero and hotspot logic: [components/PosterStage.tsx](E:/panweidongkaifa/降A大调协奏曲oc个人主页网站开发/components/PosterStage.tsx)
- Gallery list: [components/GallerySection.tsx](E:/panweidongkaifa/降A大调协奏曲oc个人主页网站开发/components/GallerySection.tsx)
- Gallery modal: [components/GalleryModal.tsx](E:/panweidongkaifa/降A大调协奏曲oc个人主页网站开发/components/GalleryModal.tsx)
- Content data: [data/site.ts](E:/panweidongkaifa/降A大调协奏曲oc个人主页网站开发/data/site.ts)
- Asset guide: [docs/gallery-assets-spec.md](E:/panweidongkaifa/降A大调协奏曲oc个人主页网站开发/docs/gallery-assets-spec.md)
- Admin guide: [docs/admin-guide.md](E:/panweidongkaifa/降A大调协奏曲oc个人主页网站开发/docs/admin-guide.md)

## Known Issues
- Link URLs and notes are still placeholder values and should be replaced with real accounts
- Hotspot alignment still needs a browser-side visual check after the poster WebP switch
- `components/HeroSection.tsx` and `public/assets/hero-character.png` are legacy from the earlier layout and should be either re-used intentionally or removed
- Gallery thumbnails are still PNG files and can be optimized later if page weight becomes a concern
- README is still the default Next.js scaffold text
- A real Sanity project ID/dataset still needs to be provided before live CMS content can be used
- Because deployment is static GitHub Pages, Sanity content changes require a rebuild/redeploy

## Recommended Next Steps
1. Create/configure the real Sanity project and set environment variables
2. Add CORS origins for local preview and deployed GitHub Pages URL in Sanity
3. Run a browser visual pass and tune hotspot positions if needed
4. Replace placeholder account links in CMS or `data/site.ts`
5. Decide whether to keep or remove the legacy hero component and asset
6. Optionally optimize gallery thumbnails and avatar assets
7. Rewrite `README.md` if the repository will be handed off

## Run Commands
- Dev: `npm run dev`
- Preview static export: `npm run preview`
- Lint: `npm run lint`
- Build: `npm run build`
- Admin guide: `docs/admin-guide.md`

## How To Resume In A New Chat
Use this message:

```text
Continue this project:
E:\panweidongkaifa\降A大调协奏曲oc个人主页网站开发

First read:
- docs/STATUS.md
- data/site.ts
- components/PosterStage.tsx
- components/GallerySection.tsx
- components/GalleryModal.tsx
- app/page.tsx

Then continue from the current status.
```
