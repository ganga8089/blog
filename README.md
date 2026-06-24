# ⚙️ Oronium Blog Engine

Oronium Blog is a pixel-perfect, highly animated, and premium blog application designed with modern SaaS aesthetics (a fusion of Linear, Notion, and Medium). Built using **Next.js 15 / 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **TanStack React Query**, the engine delivers zero-latency transitions and high-performance pre-rendering.

---

## 🎯 Key Features

### 1. Zero-Latency Transitions (PPR & Instant Navs)
* **Partial Prerendering (PPR):** The application compiles dynamic routes like `/blog/[id]` as partial prerenders. It instantly serves a static layout shell (progress bar, navbar, footer, skeleton) from the edge, while streaming dynamic content in the background.
* **Instant Navigation Validation:** Configured with `unstable_instant` to enforce dev-time and build-time checks on shared layout boundaries, eliminating traditional client-side transition delay.

### 2. Search & Category Filters
* **Debounced Search:** Scans post titles, excerpts, tags, categories, and authors in real-time.
* **Category Pills:** Filter articles by *Technology*, *AI*, *Design*, *Business*, and *Lifestyle* with active state horizontal scrolling.

### 3. Reading Utilities
* **Interactive Table of Contents:** Parses markdown headings dynamically, creates anchor scroll targets, and tracks active sections via a scroll-linked `IntersectionObserver`.
* **Reading Progress Bar:** A top-anchored layout bar illustrating article completion percentage.
* **Metadata Insights:** Features calculated reading time indicators, publication dates, and liked counts.

### 4. Interactive Widgets & Actions
* **Newsletter Signup:** Form validation with instant feedback, crowned by a client-side dynamic **confetti celebration** on success.
* **Dynamic Sidebar:** Lists popular numerical posts, category counters, tag clouds, and recent post previews.
* **Theme Switching:** Safe dark/light mode toggle with custom SVG animations.
* **Social Sharing:** Quick buttons to share articles on X (Twitter), LinkedIn, or copy links directly to the clipboard.

---

## 🛠️ Technology Stack

* **Core Framework:** Next.js 15 (App Router / Turbopack) & React 19
* **Data Caching:** TanStack React Query (`@tanstack/react-query`)
* **Styling System:** Tailwind CSS v4 (CSS-first configuration)
* **Icons Library:** Lucide React & Custom inline SVG wrappers
* **Celebrations:** Canvas Confetti (`canvas-confetti`)
* **Theme Manager:** Next Themes (`next-themes`)

---

## 📁 Project Architecture

The application is structured for production-grade scalability:

```text
src/
├── app/                  # Next.js App Router endpoints
│   ├── api/              # Local Mock API Route Handlers
│   ├── blog/[id]/        # Dynamic post detail route (PPR)
│   ├── layout.tsx        # Base wrapper & global SEO metadata
│   ├── page.tsx          # Homepage server-rendered (SSR) entrypoint
│   └── globals.css       # Design system tokens, glassmorphism, animations
├── components/           # Modular React components
│   ├── Navbar.tsx        # Sticky translucent header & drawers
│   ├── Footer.tsx        # Semantic layout footer
│   ├── HomeClient.tsx    # Homepage state & react-query container
│   ├── Sidebar.tsx       # Newsletter & widgets block
│   └── ...               # Card, Carousel, MarkdownRenderer, etc.
├── hooks/                # Custom React hooks (useDebounce, etc.)
├── lib/                  # Helper utilities and mockup dataset
├── providers/            # QueryClient and Theme wrappers
└── types/                # Global TypeScript definitions
```

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/ganga8089/blog.git
cd blog
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to view the application.

### 3. Build & Verify Optimizations
To compile the production build and verify typescript, routing, and linter standards:
```bash
npm run build
npm run lint
```
