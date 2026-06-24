"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Link2, ArrowLeft, ArrowRight, Check, Share2 } from "lucide-react";
import { Post } from "@/types";

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// ----------------------------------------------------
// 1. Reading Progress Bar Indicator
// ----------------------------------------------------
export function ReadingProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight === 0) return;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{ transform: `scaleX(${scrollProgress / 100})` }}
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}

// ----------------------------------------------------
// 2. Table Of Contents Component
// ----------------------------------------------------
interface HeadingItem {
  level: number;
  text: string;
  id: string;
}

export function TableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState("");

  // Memoize heading calculations dynamically from markdown content
  const headings = useMemo(() => {
    const headingRegex = /^(##|###)\s+(.+)$/gm;
    const items: HeadingItem[] = [];
    let match;

    // Reset regex index
    headingRegex.lastIndex = 0;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1] === "##" ? 2 : 3;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      items.push({ level, text, id });
    }
    return items;
  }, [content]);

  // Track active heading on scroll
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      { rootMargin: "0px 0px -40% 0px", threshold: 0.6 }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]); // Re-observe only when content changes (implying headings updated)

  if (headings.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
        Table of Contents
      </h3>
      <nav className="space-y-2">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(heading.id)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
              setActiveId(heading.id);
            }}
            className={`block text-xs font-medium transition-all hover:text-primary ${
              heading.level === 3 ? "pl-4 text-muted-foreground/70" : "text-muted-foreground"
            } ${
              activeId === heading.id
                ? "text-primary! font-bold translate-x-1"
                : ""
            }`}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}

// ----------------------------------------------------
// 3. Social Share Buttons
// ----------------------------------------------------
export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-3 py-6 border-y border-border/50">
      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-1.5">
        <Share2 className="w-3.5 h-3.5" /> Share Article
      </h4>
      <div className="flex gap-2">
        <button
          onClick={() =>
            window.open(
              `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                title
              )}&url=${encodeURIComponent(window.location.href)}`,
              "_blank"
            )
          }
          className="flex items-center justify-center w-8 h-8 rounded-lg border border-border/80 bg-secondary/10 text-muted-foreground hover:text-foreground hover:bg-secondary/45 transition-colors"
          aria-label="Share on Twitter"
        >
          <TwitterIcon className="w-4 h-4" />
        </button>
        <button
          onClick={() =>
            window.open(
              `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                window.location.href
              )}`,
              "_blank"
            )
          }
          className="flex items-center justify-center w-8 h-8 rounded-lg border border-border/80 bg-secondary/10 text-muted-foreground hover:text-foreground hover:bg-secondary/45 transition-colors"
          aria-label="Share on LinkedIn"
        >
          <LinkedinIcon className="w-4 h-4" />
        </button>
        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center w-8 h-8 rounded-lg border border-border/80 bg-secondary/10 text-muted-foreground hover:text-foreground hover:bg-secondary/45 transition-colors"
          aria-label="Copy post link"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Link2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 4. Related Posts Widget
// ----------------------------------------------------
interface RelatedPostsProps {
  posts: Post[];
  currentId: string;
  category: string;
}

export function RelatedPosts({ posts, currentId, category }: RelatedPostsProps) {
  // Filter category matching posts, excluding active post
  const related = posts
    .filter((post) => post.category === category && post.id !== currentId)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="space-y-6 pt-12 border-t border-border">
      <h3 className="text-xl font-bold tracking-tight">Related Articles</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {related.map((post) => (
          <div key={post.id} className="group space-y-3">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-border/70">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                {post.category}
              </span>
              <Link href={`/blog/${post.id}`} className="block">
                <h4 className="font-bold text-sm line-clamp-2 group-hover:text-primary transition-colors duration-200 text-foreground">
                  {post.title}
                </h4>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 5. Prev/Next Navigation
// ----------------------------------------------------
interface PrevNextProps {
  prevPost?: Post;
  nextPost?: Post;
}

export function PrevNextNavigation({ prevPost, nextPost }: PrevNextProps) {
  if (!prevPost && !nextPost) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-8 border-t border-border/60">
      {prevPost ? (
        <Link
          href={`/blog/${prevPost.id}`}
          className="group flex flex-col items-start gap-1 p-5 rounded-xl border border-border/80 bg-card/25 hover:border-primary/45 transition-colors text-left"
        >
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> Previous Post
          </span>
          <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {prevPost.title}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {nextPost ? (
        <Link
          href={`/blog/${nextPost.id}`}
          className="group flex flex-col items-end gap-1 p-5 rounded-xl border border-border/80 bg-card/25 hover:border-primary/45 transition-colors text-right"
        >
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            Next Post <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
          <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {nextPost.title}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}
    </div>
  );
}
