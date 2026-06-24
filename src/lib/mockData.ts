import { Post } from "@/types";

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "Designing the Future: The Dark Mode Aesthetics of Modern SaaS Interfaces",
    excerpt: "Why dark interfaces dominate modern SaaS tools and how to design accessible, premium glassmorphism themes.",
    content: `
# Designing the Future: The Dark Mode Aesthetics of Modern SaaS Interfaces

Dark mode is no longer just a toggle; it’s a design language. Modern SaaS products like Linear, Vercel, and Stripe have popularized a specific visual style: deep charcoal background values, vibrant neon glow accents, crisp micro-borders, and high-quality typography.

In this article, we’ll explore how to design accessible, modern, and high-fidelity dark interfaces using CSS and Tailwind CSS.

## The Psychology of Dark Theme Aesthetics

Why do developers and power users love dark interfaces?
1. **Reduced Eye Strain:** In low-light environments, high-contrast dark modes emit less light.
2. **Visual Hierarchy:** Neon accents and light text elements stand out with much higher contrast against dark backdrops.
3. **Premium Feel:** Similar to luxury physical goods, dark color palettes evoke sleekness, precision, and modernity.

## Implementing Premium Glassmorphism

To create depth in a dark interface, we use glassmorphism. Instead of raw black, layering semi-transparent backgrounds with backdrop blur creates a sense of physical space:

\`\`\`css
.glass-panel {
  background: rgba(17, 17, 17, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
\`\`\`

Using Tailwind, this becomes:
\`\`\`html
<div class="bg-neutral-900/70 backdrop-blur-md border border-white/10 rounded-xl p-6">
  <!-- Content -->
</div>
\`\`\`

## Accessible Typography

When designing dark themes, never use pure white (#FFF) on pure black (#000) for body text. It creates a "halation" effect, making the text appear to glow or bleed, which tires the reader's eyes. Instead, opt for soft off-whites like \`#E5E5E5\` or \`#D4D4D4\`, and keep high-contrast white only for headings.

Stay tuned as we dive deeper into component architecture in the next chapters!
    `,
    category: "Design",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    author: {
      name: "Marcus Aurelius",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      bio: "Lead Designer at Oronium. Obsessed with high-contrast layouts, typography, and dark mode interfaces.",
      role: "Lead UI Designer"
    },
    createdAt: "2026-06-20T10:00:00.000Z",
    readTime: "5 min read",
    likes: 142,
    tags: ["UI/UX", "TailwindCSS", "SaaS Design", "Glassmorphism"],
    commentsCount: 12,
    featured: true,
    trending: true
  },
  {
    id: "2",
    title: "Next.js 15 App Router: Optimizing Server Actions and Suspense for Scale",
    excerpt: "Dive deep into the new performance APIs in Next.js 15, dynamic route optimizations, and instant page transitions.",
    content: `
# Next.js 15 App Router: Optimizing Server Actions and Suspense for Scale

Next.js 15 brings powerful new optimizations for both server-side components and client interactions. If you're building high-traffic production web apps, understanding the internals of data fetching, React Server Components (RSC), and cache invalidations is key.

In this deep dive, we'll examine exactly how to squeeze every millisecond of speed out of your next deployment.

## Understanding Server Components vs. Client Actions

Server Components are the foundation of Next.js 15. They allow you to render components on the server and stream the HTML payload to the client. This significantly reduces JavaScript bundle sizes, as complex libraries can remain server-only.

## Caching Strategy and TanStack Query

While Next.js provides built-in caching for server data fetches, client-side interactions require robust state management. Integrating React Query provides:
* **Stale-while-revalidate** caching model.
* Polling and background updates.
* Prefetching routes on hover.

## The Power of Instant Client Transitions

As highlighted in the latest API specifications:
> For slow client-side navigations, simply adding \`<Suspense>\` is not enough. To unlock instant navigations, Next.js 15 supports exporting \`unstable_instant\` from the page route.

This allows immediate page navigation while the async data streams in, giving a latency-free UX. Let's see how to configure it:

\`\`\`typescript
// src/app/blog/[id]/page.tsx
export const unstable_instant = true;

export default async function BlogPage({ params }) {
  // Page load starts immediately, streaming data below
  return (
    <Suspense fallback={<BlogDetailSkeleton />}>
      <BlogPostContent id={params.id} />
    </Suspense>
  );
}
\`\`\`

This optimization makes client-side transit feel like a native application!
    `,
    category: "Technology",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    author: {
      name: "Devon Webb",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      bio: "Next.js Developer & Core Contributor. Enjoys writing custom hooks and squeezing milliseconds out of compilation.",
      role: "Senior Frontend Engineer"
    },
    createdAt: "2026-06-22T14:30:00.000Z",
    readTime: "8 min read",
    likes: 289,
    tags: ["Next.js", "React Query", "Web Performance", "Server Actions"],
    commentsCount: 24,
    featured: true,
    trending: false
  },
  {
    id: "3",
    title: "The Rise of Autonomous AI Agents in Software Engineering Lifecycle",
    excerpt: "How generative models and autonomous agents are reshaping compilation, debugging, and continuous integration workflows.",
    content: `
# The Rise of Autonomous AI Agents in Software Engineering Lifecycle

Software engineering is undergoing a tectonic shift. Artificial Intelligence has evolved from autocomplete tools into autonomous coding agents that can plan, execute, debug, and verify complex modifications within nested folders.

## The Cognitive Loop: Plan, Execute, Verify

Traditional software development follows standard lifecycles. AI coding assistants implement a dynamic cognitive cycle:
1. **Research & Planning:** Checking existing designs, finding code patterns, and writing explicit specifications before editing.
2. **Scaffolding & Execution:** Modifying files with high-precision replacements.
3. **Verification:** Running unit tests, compiling the bundle, and inspecting outputs using a sandboxed browser environment.

## Collaborative Coding: The Next Frontier

AI agents are not here to replace developers, but rather to pair-program. By delegating boilerplate, routing setup, and CSS polish to agents, senior developers can focus on product architecture, security standards, and business logic.
    `,
    category: "AI",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=1200&auto=format&fit=crop&q=80",
    author: {
      name: "Dr. Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      bio: "AI Researcher and Tech Advisor. Speaks at international workshops on AI ethics and cognitive engineering agent architectures.",
      role: "Director of AI Research"
    },
    createdAt: "2026-06-23T08:15:00.000Z",
    readTime: "6 min read",
    likes: 312,
    tags: ["Artificial Intelligence", "DevOps", "AI Coding", "Future of Work"],
    commentsCount: 41,
    featured: false,
    trending: true
  },
  {
    id: "4",
    title: "Scaling SaaS Products from Zero to 10M Users: Architectural Patterns",
    excerpt: "Proven cloud strategies, caching layers, and database sharding techniques that power today's fastest-growing SaaS products.",
    content: `
# Scaling SaaS Products from Zero to 10M Users

Scaling is a multi-phase evolutionary process. If you treat a 10M-user app with the same architecture as a 10k-user prototype, your servers will buckle and your cloud bill will skyrocket.

## Stage 1: The Monolith and Single DB
Keep it simple. A standard relational DB (PostgreSQL) and a monolithic server are extremely reliable. Do not over-engineer microservices on day one.

## Stage 2: Caching and Read Replicas
When reads begin to dominate:
* Add a **Redis Cache** for fast session stores and static catalog caching.
* Create read replicas of your database to scale database reading queries.

## Stage 3: Sharding & Global CDNs
At global scale, use edge computing (Vercel, Cloudflare Pages) to serve content as close to users as possible, coupled with horizontally sharded databases.
    `,
    category: "Business",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    author: {
      name: "Alex Sterling",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
      bio: "Co-Founder and CTO of ScalerHub. Formerly VP of Engineering at Unicorn Inc.",
      role: "CTO & Co-Founder"
    },
    createdAt: "2026-06-18T09:00:00.000Z",
    readTime: "10 min read",
    likes: 215,
    tags: ["Cloud Architecture", "SaaS", "Postgres", "Redis"],
    commentsCount: 18,
    featured: false,
    trending: false
  },
  {
    id: "5",
    title: "The Solopreneur Mindset: Designing Creative Digital Products from Bali",
    excerpt: "How nomad creators design, launch, and market lightweight SaaS products while travelling around the world.",
    content: `
# The Solopreneur Mindset: Designing Creative Digital Products

With modern tools like Next.js, Tailwind, and Vercel, the barrier to launching a software startup has dropped to zero. Single-developer software products generate millions in recurring revenue. Here is how they achieve it.

## Minimize the Scope
Do not build a platform; build a feature. Solve one specific problem exceptionally well.

## Automate Everything
Use Stripe Billing for subscriptions, Resend for transactional emails, and Ingest/Log layers for tracking issues. Your time should be spent on design and customer acquisition.

## The Digital Nomad Lifestyle
Working from locations like Bali provides high quality of life at a manageable cost, giving you the runway to iterate on ideas without financial anxiety.
    `,
    category: "Lifestyle",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80",
    author: {
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      bio: "Digital Nomad, Writer, and Solopreneur. Launches micro-SaaS products from beautiful beach cafes.",
      role: "Nomad Creator"
    },
    createdAt: "2026-06-15T12:00:00.000Z",
    readTime: "4 min read",
    likes: 95,
    tags: ["Solopreneur", "Digital Nomad", "SaaS marketing", "Productivity"],
    commentsCount: 8,
    featured: false,
    trending: true
  },
  {
    id: "6",
    title: "The Typography Guide for Premium Digital Interfaces",
    excerpt: "How selecting the right type scale, letter spacing, and line height can elevate a web interface from ordinary to world-class.",
    content: `
# The Typography Guide for Premium Digital Interfaces

Typography is 95% of web design. When you look at high-end SaaS applications, the typography looks incredibly clean and readable. That is not by accident—it is the result of strict layout mathematical formulas.

## Choosing the Right Type Scale
A type scale creates harmony. Use a scale like **Major Third** (1.25) or **Perfect Fourth** (1.33) to determine size differences between headers, subtitles, and body copy.

## Letter Spacing (Tracking)
As text sizes grow, letter spacing should decrease:
* For display headings (32px+), apply negative letter spacing (\`tracking-tight\` or \`tracking-tighter\` in Tailwind).
* For body text, keep it neutral (\`tracking-normal\`).
* For small uppercase labels, add extra letter-spacing (\`tracking-widest\`).

## Establishing a Rhythm
Ensure your line heights (\`leading\`) are matched to font sizes. For body text, \`leading-relaxed\` (1.625) provides optimal scan speed.
    `,
    category: "Design",
    coverImage: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1200&auto=format&fit=crop&q=80",
    author: {
      name: "Marcus Aurelius",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      bio: "Lead Designer at Oronium. Obsessed with high-contrast layouts, typography, and dark mode interfaces.",
      role: "Lead UI Designer"
    },
    createdAt: "2026-06-12T16:20:00.000Z",
    readTime: "6 min read",
    likes: 178,
    tags: ["Typography", "Design System", "CSS", "UI Design"],
    commentsCount: 14,
    featured: false,
    trending: false
  },
  {
    id: "7",
    title: "Building Real-Time Multi-Agent Collaboration Boards using WebSocket APIs",
    excerpt: "Explore how to synchronize state between multiple active AI agents and developers working in a shared terminal and file environment.",
    content: `
# Building Real-Time Multi-Agent Collaboration Boards

In the next generation of software tools, multiple specialized agents will work concurrently on your repository. Ensuring real-time coordination, file conflict resolution, and synchronization is an engineering challenge.

## The WebSocket Sync Layer
We use persistent socket connections to emit file system diff states. When Agent A starts writing to a file, we instantly lock the file range for other agents, preventing write collisions.

## OT vs CRDT
To resolve edits on the same document:
* **Operational Transformation (OT):** Used by Google Docs; server-centric and highly ordered.
* **Conflict-free Replicated Data Types (CRDT):** Decentralized and excellent for offline-first agent syncing.
    `,
    category: "AI",
    coverImage: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200&auto=format&fit=crop&q=80",
    author: {
      name: "Dr. Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      bio: "AI Researcher and Tech Advisor. Speaks at international workshops on AI ethics and cognitive engineering agent architectures.",
      role: "Director of AI Research"
    },
    createdAt: "2026-06-08T09:40:00.000Z",
    readTime: "7 min read",
    likes: 254,
    tags: ["WebSockets", "CRDT", "Real-Time Systems", "AI Agents"],
    commentsCount: 22,
    featured: false,
    trending: false
  },
  {
    id: "8",
    title: "Mastering Tailwind CSS v4 and the @theme Directive Rules",
    excerpt: "Learn how to use Tailwind CSS v4's new CSS-first configuration to manage design tokens, customize core components, and optimize build speed.",
    content: `
# Mastering Tailwind CSS v4 and the @theme Directive

Tailwind CSS v4 introduces a revolutionary configuration method. Gone is the javascript-heavy \`tailwind.config.js\`. Instead, you configure your design tokens directly inside your CSS file using the new \`@theme\` directive.

## Introducing CSS-First Configuration

In v4, Tailwind parses your global CSS file for theme directives and turns them into CSS variables automatically:

\`\`\`css
@import "tailwindcss";

@theme {
  --color-brand-cyan: #06b6d4;
  --font-display: "Outfit", sans-serif;
}
\`\`\`

These tokens are immediately available as utility classes like \`text-brand-cyan\` and \`font-display\`.

## Performance Enhancements

Because Tailwind CSS v4 uses a Rust-based compiler engine, your builds are up to 10x faster. It also automatically generates modern CSS custom properties that support runtime adjustments, making dark theme switching smoother than ever!
    `,
    category: "Technology",
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
    author: {
      name: "Devon Webb",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      bio: "Next.js Developer & Core Contributor. Enjoys writing custom hooks and squeezing milliseconds out of compilation.",
      role: "Senior Frontend Engineer"
    },
    createdAt: "2026-06-05T11:00:00.000Z",
    readTime: "5 min read",
    likes: 198,
    tags: ["TailwindCSS", "CSS", "Frontend Dev", "Web Build"],
    commentsCount: 15,
    featured: false,
    trending: false
  }
];
