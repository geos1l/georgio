# Personal Portfolio Website — Product Requirements Document (PRD)

## Overview

A personal portfolio website inspired by zacharyyu.com's ultra-minimal editorial aesthetic, with austin jian-style project cards, lance yan-style structured hierarchy, and a ReactBits Ribbons background effect. Built with Next.js 14+ (App Router), TypeScript, and Tailwind CSS. Deployed to Vercel.

---

## Design Direction

### Aesthetic: "Editorial Minimalism + Kinetic Depth"

The site should feel like a beautifully typeset editorial page — lots of whitespace, sharp hierarchy, deliberate type choices — but with the Ribbons canvas effect adding a subtle, living layer behind the content. Think: a printed broadsheet floating over a gently moving river.

### Key Design Principles

1. **Whitespace is the main design element.** Content islands float in generous negative space.
2. **Typography carries the hierarchy.** No heavy borders, no cards with shadows. Just type weight, size, and spacing.
3. **One "statement piece" only** — the Ribbons background. Everything else is restrained.
4. **Monochrome palette** with one accent color. The Ribbons provide the color — content stays neutral.

### Typography

- **Display / Name:** `Instrument Serif` (Google Fonts) — elegant, editorial, distinctive
- **Body / Nav / Labels:** `Geist` (Vercel's typeface) or `Satoshi` — clean geometric sans
- **Monospace accents (optional):** `Geist Mono` for small labels like dates, tech tags

### Color Tokens (CSS Variables)

```css
:root {
  --bg: #fafafa;
  --fg: #111111;
  --fg-muted: #666666;
  --fg-subtle: #999999;
  --border: #e5e5e5;
  --accent: #111111;       /* links, hover states */
  --ribbon-color-1: #333;  /* customize to taste */
  --ribbon-color-2: #666;
  --ribbon-color-3: #999;
}
```

Dark mode is NOT in scope for v1. Keep it light, clean, editorial.

---

## Site Architecture

### Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero bio, shipped projects, socials, contact CTA |
| `/hackathons` | Hackathon experiences — card grid similar to home projects |

### Home Page Sections (top → bottom)

1. **Hero / Bio Block** — Name, one-liner, school, socials (like Zachary Yu's layout)
2. **Horizontal Rule**
3. **Shipped Projects** — 2 project cards (Scorched, Skauti) in Austin Jian's format: thumbnail + title + year + one-line description
4. **Horizontal Rule**
5. **Contact CTA** — Simple email link + footer

### Hackathons Page

- Same layout shell (nav, ribbons, footer)
- Grid of hackathon cards (same component as project cards, different data)
- Each card: thumbnail, hackathon name, year, result/prize, one-line description

---

## Component Tree

```
app/
├── layout.tsx              ← Global layout: fonts, Ribbons bg, nav
├── page.tsx                ← Home page
├── hackathons/
│   └── page.tsx            ← Hackathons page
├── components/
│   ├── Ribbons.tsx         ← ReactBits Ribbons (copy-paste from reactbits.dev)
│   ├── Nav.tsx             ← Minimal top nav (Home, Hackathons, socials)
│   ├── Hero.tsx            ← Name + bio + school + social links
│   ├── ProjectCard.tsx     ← Reusable card (thumbnail, title, year, desc, link)
│   ├── ProjectsSection.tsx ← "shipped" section with 2 ProjectCards
│   ├── HackathonCard.tsx   ← Variant of ProjectCard for hackathons (or same component)
│   ├── ContactCTA.tsx      ← Email CTA block
│   ├── Footer.tsx          ← Minimal footer with copyright + webring (optional)
│   └── Divider.tsx         ← Styled <hr>
├── data/
│   ├── projects.ts         ← Array of project objects
│   └── hackathons.ts       ← Array of hackathon objects
├── public/
│   ├── projects/           ← Project thumbnail images
│   │   ├── scorched.png
│   │   └── skauti.png
│   ├── hackathons/         ← Hackathon thumbnail images
│   │   ├── hackcanada.png
│   │   ├── utrahacks.png
│   │   └── ...
│   ├── og-image.png        ← Open Graph image
│   └── favicon.ico
└── styles/
    └── globals.css         ← Tailwind directives + CSS vars + font imports
```

---

## Component Specifications

### 1. Ribbons Background (`Ribbons.tsx`)

- **Source:** Copy the component code directly from https://reactbits.dev/animations/ribbons (TS-TW variant preferred, fallback to JS-CSS)
- **Install method:** `npx shadcn@latest add @react-bits/Ribbons-TS-TW` OR manually copy the source
- **Placement:** Rendered in `layout.tsx` as a fixed, full-viewport background behind all content
- **Styling:** `position: fixed; inset: 0; z-index: 0; pointer-events: none;`
- **Props to configure:**
  - Colors: muted grays or subtle warm tones that complement the monochrome content
  - Speed: slow/medium — this should feel ambient, not distracting
  - Opacity: ~0.15–0.25 so it doesn't compete with text
- **Performance:** The canvas should not block interaction. Ensure `pointer-events: none` on the container.
- **Content container:** All page content wraps in a `<main>` with `position: relative; z-index: 1;` to sit above ribbons.

### 2. Nav (`Nav.tsx`)

Modeled after Zachary Yu's left-sidebar nav but adapted as a **top horizontal nav** for simplicity:

```
[Home]  [Hackathons]                                    [Twitter] [LinkedIn] [GitHub] [Email]
```

- Sticky top, transparent bg with subtle blur backdrop
- Links are plain text, no underline by default, underline on hover
- Social links are icons (use `lucide-react` for GitHub, Twitter/X, LinkedIn, Mail)
- Mobile: hamburger is overkill for 2 pages. Just stack horizontally, smaller text.

### 3. Hero (`Hero.tsx`)

Layout reference: Zachary Yu's bio block

```
# [Your Name]

---

— CS @ University of Waterloo 🟠
— [Current role / focus description]
```

- Name rendered in `Instrument Serif`, large (text-4xl or text-5xl)
- Below: em-dash prefixed lines for school and focus
- School name is a link, with the UWaterloo logo inline (16x16 or 20x20 image)
- Keep it to 2-3 lines max. No paragraphs.

### 4. ProjectCard (`ProjectCard.tsx`)

Layout reference: Austin Jian's project cards

```tsx
interface Project {
  title: string;
  year: number;
  description: string;
  thumbnail: string;  // path to image in /public/projects/
  href: string;       // external link (GitHub, live site)
  tags?: string[];    // optional tech tags
}
```

Visual layout:
```
┌─────────────────────────────┐
│                             │
│       [Thumbnail Image]     │  ← rounded corners, aspect-video or 16:9
│                             │
├─────────────────────────────┤
│ project title          2026 │  ← title bold, year right-aligned, muted
│ one-line description        │  ← muted text color
└─────────────────────────────┘
```

- Entire card is a link (`<a>` wrapping everything)
- Hover: subtle scale (1.02) + slight shadow or border change
- Thumbnail: use `next/image` with proper sizing
- Grid: 2 columns on desktop, 1 on mobile

### 5. ProjectsSection (`ProjectsSection.tsx`)

- Section header: "SHIPPED" or "PROJECTS" in spaced uppercase, small font, muted — like Zachary Yu's "CURRENT BUILDS"
- Renders project data from `data/projects.ts`
- 2-column grid

### 6. ContactCTA (`ContactCTA.tsx`)

Simple and direct:
```
---
Say hi :) → [email]
```

- The email is a `mailto:` link
- Keep it minimal. One line.

### 7. Footer (`Footer.tsx`)

```
© [name] 2026                              ← → (CS Webring links, optional)
```

---

## Data Files

### `data/projects.ts`

```typescript
export interface Project {
  title: string;
  year: number;
  description: string;
  thumbnail: string;
  href: string;
  tags?: string[];
}

export const projects: Project[] = [
  {
    title: "scorched",
    year: 2026,
    description: "geospatial ML pipeline predicting urban heat islands across toronto. 1.46°C MAE, 0.80 R².",
    thumbnail: "/projects/scorched.png",
    href: "https://github.com/...",  // FILL IN
    tags: ["PyTorch", "XGBoost", "FastAPI", "Mapbox"],
  },
  {
    title: "skauti",
    year: 2025,
    description: "offline-first FRC scouting PWA with QR/AirDrop P2P sync. adopted by real teams within a week.",
    thumbnail: "/projects/skauti.png",
    href: "https://skauti.ca",
    tags: ["TypeScript", "PWA", "QR"],
  },
];
```

### `data/hackathons.ts`

```typescript
export interface Hackathon {
  name: string;
  year: number;
  result: string;       // e.g., "Best ML Hack", "Winner", "Participant"
  description: string;
  thumbnail: string;
  href?: string;
  project?: string;     // name of the project built
}

export const hackathons: Hackathon[] = [
  {
    name: "HackCanada 2026",
    year: 2026,
    result: "Built Scorched",
    description: "geospatial ML pipeline for urban heat prediction across Toronto",
    thumbnail: "/hackathons/hackcanada.png",
    href: "https://github.com/...",
    project: "Scorched",
  },
  {
    name: "UTRA Hacks",
    year: 2025,
    result: "Built Match Overlay",
    description: "real-time livestream + LLM commentary system for sports",
    thumbnail: "/hackathons/utrahacks.png",
    href: "https://github.com/...",
    project: "Match Overlay",
  },
  // ADD MORE as needed — HackHive, NBA Career Simulator context, etc.
];
```

---

## Technical Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Next.js 14+ (App Router) | SSR, file-based routing, Vercel-native |
| Language | TypeScript | Type safety, better DX |
| Styling | Tailwind CSS v4 | Utility-first, fast iteration |
| Fonts | Google Fonts (Instrument Serif) + Geist | Editorial + clean sans |
| Icons | lucide-react | Lightweight, tree-shakeable |
| Images | next/image | Optimized, lazy-loaded |
| Animation | ReactBits Ribbons (copy-paste component) | Background effect |
| Deployment | Vercel | Zero-config for Next.js |
| Domain | TBD | Connect via Vercel Domains |

---

## Setup Commands (for Claude Code)

```bash
# 1. Scaffold the project
npx create-next-app@latest personal-site --typescript --tailwind --app --eslint --src-dir=false --import-alias="@/*"
cd personal-site

# 2. Install dependencies
npm install lucide-react

# 3. Add Ribbons component from ReactBits
# Option A: shadcn CLI (if available)
npx shadcn@latest add @react-bits/Ribbons-TS-TW

# Option B: Manual copy
# Go to https://reactbits.dev/animations/ribbons
# Select TS-TW variant
# Copy the component code into components/Ribbons.tsx
# Install any peer deps (check if it needs gsap, three, etc.)

# 4. Add fonts to layout.tsx or globals.css
# Import Instrument Serif from Google Fonts
# Import Geist from next/font/local or Google Fonts

# 5. Create the file structure as outlined above
```

---

## Implementation Order (for Claude Code sessions)

### Phase 1: Scaffold + Global Layout
1. Create Next.js project with the setup commands above
2. Set up `globals.css` with CSS variables, font imports, Tailwind config
3. Build `layout.tsx` — fonts, metadata, Ribbons background, basic structure
4. Build `Nav.tsx` — horizontal nav with page links + social icons
5. Build `Divider.tsx` and `Footer.tsx`
6. Verify: site loads with Ribbons background, nav renders, empty content area

### Phase 2: Home Page
7. Build `Hero.tsx` — name, bio lines, school link with logo
8. Build `ProjectCard.tsx` — reusable card component
9. Build `ProjectsSection.tsx` — renders projects from data file
10. Build `ContactCTA.tsx`
11. Compose `page.tsx` (home) from these components
12. Add placeholder images to `/public/projects/`
13. Verify: full home page renders correctly

### Phase 3: Hackathons Page
14. Build `hackathons/page.tsx` — uses same card component with hackathon data
15. Add placeholder images to `/public/hackathons/`
16. Verify: navigation between pages works, consistent layout

### Phase 4: Polish
17. Add hover animations to cards (subtle scale, transition)
18. Add page enter animations (fade in, stagger)
19. Tune Ribbons props (color, speed, opacity)
20. Responsive testing — mobile, tablet, desktop
21. SEO: Open Graph tags, meta description, favicon
22. Accessibility: semantic HTML, alt texts, keyboard nav
23. Performance: Lighthouse audit, optimize images

---

## Content to Provide (YOU need to supply these)

Before building, gather:

- [ ] **Your full name** (for the hero section)
- [ ] **One-liner bio** (e.g., "building ML systems and shipping products")
- [ ] **Email address** (for contact CTA)
- [ ] **Social links:** Twitter/X, LinkedIn, GitHub URLs
- [ ] **Project thumbnails:** Screenshots or graphics for Scorched and Skauti (ideally 16:9 aspect ratio, ~800x450px)
- [ ] **Hackathon thumbnails:** Photos or graphics for each hackathon
- [ ] **GitHub repo links** for Scorched, Skauti, Match Overlay, HackHive
- [ ] **Domain name** (if you have one picked)
- [ ] **Headshot/avatar** (optional — the sites you referenced don't use one except Muhib)

---

## Claude Code Prompt (copy this to kick off the build)

```
Read the PRD at WEBSITE_PRD.md in the project root. This is the complete spec for my personal portfolio website.

Build the site following the implementation phases exactly as described. Start with Phase 1.

Key constraints:
- Next.js 14+ App Router, TypeScript, Tailwind CSS
- ReactBits Ribbons component for the background (copy from reactbits.dev/animations/ribbons)
- Instrument Serif (Google Fonts) for display type, Geist for body
- Ultra-minimal editorial aesthetic — lots of whitespace, sharp typography, no card shadows
- Two pages: / (home) and /hackathons
- Reusable ProjectCard component for both pages

Start by scaffolding the project and building the global layout with the Ribbons background.
```

---

## Reference Sites (for visual calibration)

| Site | What to steal |
|------|---------------|
| zacharyyu.com | Overall layout structure, typography hierarchy, em-dash prefixed lines, section headers |
| austinjian.ca | Project card format (thumbnail + title + year + description), grid layout |
| lance.build | Structured bio with inline logos, clean information hierarchy |
| muhibwaqar.com | Bold personality-driven copy, "cool facts" energy (for hackathon descriptions) |

---

## Anti-Patterns (things to avoid)

- **No gradient backgrounds** — the Ribbons ARE the visual interest
- **No card shadows or borders** — let whitespace and type do the work
- **No excessive animations** — one hero effect (Ribbons) is enough
- **No sidebar nav** — keep it horizontal top nav, max simplicity
- **No dark mode toggle for v1** — ship light mode, iterate later
- **No blog** — this is a portfolio, not a content site (add later if needed)
- **No "about me" paragraph** — keep the bio to 2-3 em-dash lines like Zachary Yu
- **No hamburger menu** — 2 page links + social icons fit on any screen
