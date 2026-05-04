# Oseong's Portal

> 아이디어가 있으면 만들어내야만 하는 성격. — Personal portfolio site for Oseong Shin.

An interactive personal portfolio with an animated character that reacts to your clicks, a draggable works grid, and a 3D Spline scene.

🔗 **[Live Demo](https://portal-lyart-tau.vercel.app)**

---

## Features

- **Interactive character** — A pixel-art character with 9 emotion states (stay, dance, sorry, run, sit, pushup, walk, wtf, punch), each playing a unique `.webm` animation on click
- **Draggable works grid** — Project cards arranged in a free-form draggable bento grid via `react-grid-layout`
- **Spline 3D scene** — Embedded 3D character rendered with `@splinetool/react-spline`
- **Eye character** — Custom SVG eye that follows the cursor
- **Intro animation** — Full-screen character intro that fades out on load
- **Color picker** — Theme color switcher

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| 3D | Spline (`@splinetool/react-spline`) |
| Drag & Drop | react-grid-layout |
| Database | Supabase |

---

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/oseong27436/portal.git
cd portal
npm install
```

### 2. Run

```bash
npm run dev
```

Open [http://localhost:3100](http://localhost:3100).

---

## Project Structure

```
src/
  app/
    page.tsx        # Main portfolio page
    works/          # Works detail pages
    globals.css     # Custom fonts, animations, layout styles
  components/
    DraggableWorks.tsx    # Bento grid of project cards (react-grid-layout)
    SplineCharacter.tsx   # 3D Spline embed
    EyeCharacter.tsx      # Cursor-following eye SVG
    ColorPicker.tsx       # Theme color switcher
public/
  stay.webm / dance.webm / run.webm / ...   # Character emotion animations
```
