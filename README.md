# AUREL · Where the Ocean Slows Time

A cinematic website for **AUREL**, a fictional boutique ocean resort near Tangalle on the southern coast of Sri Lanka. It is built as a design portfolio piece: an editorial, scroll-led experience with smooth scrolling, image reveals, a pinned horizontal architecture walk, hover-driven galleries and a booking enquiry that works without a server.

> AUREL is fictional. Rooms, prices, guest notes and availability are illustrative. The nearby places (Rekawa, Mulkirigala, Hiriketiya, Mirissa, Galle Fort, Udawalawe, Yala) are real.

## Stack

- Vue 3 + Vite, hash routing (works on any static host without rewrites)
- GSAP 3 with ScrollTrigger, SplitText, Flip and DrawSVG (all free since GSAP 3.13)
- Lenis smooth scrolling, driven by the GSAP ticker
- Fontsource self-hosted fonts: Bodoni Moda (serif) and Hanken Grotesk (sans)
- lucide-vue-next icons

No backend, no tracking, no external requests at runtime.

## Getting started

Requires Node 20.19 or newer (Node 22 recommended).

```bash
npm install
npm run dev        # http://localhost:5173  ·  admin at http://localhost:5173/#/admin
npm run build      # production build in dist/
npm run preview    # serve the build locally
npm run prompts    # regenerate docs/MEDIA_PROMPTS.md from src/data/media.json
```

## Pages

| Route | What it shows |
| --- | --- |
| `/#/` | Cinematic hero, destination story, signature rooms, room explorer, experiences, architecture walk, dining, location map, guest notes, final call to action |
| `/#/rooms/:id` | Room explorer with gallery lightbox, plus a comparison table |
| `/#/experiences` | Experience grid with expanding detail views |
| `/#/dining` · `/#/dining/menu` | Lunu restaurant and a printable menu |
| `/#/resort` | The story and architecture of the resort |
| `/#/book` | Booking enquiry: indicative estimate you can copy, print or email |
| `/#/credits` | Fonts, libraries, media status and what is real vs. simulated |

## Motion and accessibility

- Scroll effects: masked line reveals, clip-path image wipes, parallax, scrubbed manifesto, pinned horizontal section (desktop only), drawn SVG map and horizon, count-up figures.
- Hover effects: custom cursor with labels (mouse and trackpad only), image zoom, gallery swaps, expanding captions, map pins linked to the place list.
- Background life: animated grain, drifting dust motes, ocean line fields, animated SVG placeholder scenes, muted looping videos (desktop only; paused when off-screen).
- `prefers-reduced-motion` turns off smooth scrolling, pinning, parallax and video, and shows everything statically.
- Keyboard: skip link, visible focus, arrow keys in room tabs and the lightbox, Escape closes dialogs, focus is trapped and restored.

## Images and videos

Every image and video on the site is a **slot** in `src/data/media.json`, with a label, alt text, aspect ratio and a full AI prompt. Until a file is added, each slot shows an animated illustration, so the site always looks finished.

To add real media:

1. `npm run dev` and open `/#/admin` → **Images & videos**.
2. Copy a slot's prompt and generate the image or video (or use your own photo).
3. Upload it on that slot. Images become `public/media/<slot>.webp` (2000px) and `<slot>-sm.webp` (900px); videos are saved to `public/media/videos/<slot>.mp4`.
4. Fill in the **Credit** field (tool, photographer, licence). It appears on the Credits page.

All prompts are also listed in [`docs/MEDIA_PROMPTS.md`](docs/MEDIA_PROMPTS.md).

Video tips: H.264 MP4, 1920×1080 or smaller, 8–12 second seamless loop, no audio, ideally under 15 MB. Each video has a matching still "poster" slot that phones and reduced-motion visitors see instead.

## Local admin

The admin edits the content files directly, so you update the site on your own computer and push the result.

- It only exists under `npm run dev`. The route is stripped from production builds and the API is a Vite dev-server plugin (`admin/vite-admin-plugin.js`) that only answers requests from `localhost`.
- Sections: Images & videos, Rooms, Experiences, Architecture, Dining & menu, Guest notes, Resort & home page, Location.
- List sections let you add (new entries start as a copy, so every field exists), duplicate, reorder and delete. Media fields are pickers that list the slots in `media.json`.
- Every save first copies the previous file to `.admin-backups/` (git-ignored), so mistakes can be undone.

Publishing:

```bash
git add -A
git commit -m "Update content"
git push
```

## Deploying

### GitHub Pages (included)

`.github/workflows/deploy.yml` builds and deploys on every push to `main`.

1. Push the repository to GitHub.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).

The site uses relative asset paths (`base: './'`) and hash routes, so it works at `https://<user>.github.io/<repo>/` without changes.

### Cloudflare Pages or Vercel

Framework preset **Vite**, build command `npm run build`, output directory `dist`. No environment variables are needed.

## Project structure

```
admin/vite-admin-plugin.js   local-only admin API (dev server)
docs/MEDIA_PROMPTS.md        generated list of media prompts
public/media/                uploaded images (WebP) and videos/
scripts/media-prompts.mjs    regenerates the prompts doc
src/
  admin/                     admin screens (dev only)
  components/                sections, MediaFrame, SceneArt, cursor, header…
  composables/               motion setup, directives (v-split, v-reveal, v-parallax, v-fade), data helpers
  data/*.json                all site content
  pages/                     routed pages
  styles/main.css            design tokens and base styles
```

## Real vs. simulated

| Real | Simulated |
| --- | --- |
| Places, distances and travel times around Tangalle (approximate) | The resort, its rooms, prices and availability |
| Seasonal notes (whale season, turtle nesting at Rekawa) | Guest notes (labelled as illustrative) |
| Sri Lankan dishes on the menu | Booking: the form makes an estimate only; nothing is sent or stored |
| | Contact address `stay@aurel-resort.example` (reserved example domain) |

## Licences

- Code: yours to use for the portfolio.
- GSAP: free under the GSAP standard licence (including all bonus plugins since 3.13).
- Lenis, Vue, Vite, lucide: MIT. Bodoni Moda and Hanken Grotesk: SIL Open Font License.
- Media you add: check the licence of each generator or stock source and record it in the slot's credit.
