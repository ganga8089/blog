"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Sparkles, Send, Tag, Flame, FolderOpen, Calendar } from "lucide-react";
import { Post } from "@/types";

interface SidebarProps {
  posts: Post[];
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export default function Sidebar({ posts, selectedCategory = "All", onSelectCategory }: SidebarProps) {
  // 1. Compute Popular Posts (Sorted by likes)
  const popularPosts = [...posts].sort((a, b) => b.likes - a.likes).slice(0, 4);

  // 2. Compute Recent Posts
  const recentPosts = [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);

  // 3. Compute Category counts
  const categoryCounts = posts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 4. Compute unique tags and occurrence counts
  const tagsWithCounts = posts.reduce((acc, post) => {
    post.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const popularTags = Object.keys(tagsWithCounts)
    .sort((a, b) => tagsWithCounts[b] - tagsWithCounts[a])
    .slice(0, 8);

  return (
    <aside className="space-y-10 lg:sticky lg:top-24">
      {/* 1. Newsletter Card */}
      <NewsletterCard />

      {/* 2. Popular Posts */}
      <div className="glass-panel rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2 pb-3 border-b border-border/50">
          <Flame className="w-4.5 h-4.5 text-amber-500 fill-amber-500/10" /> Popular Articles
        </h3>
        <div className="space-y-4.5">
          {popularPosts.map((post, index) => (
            <div key={post.id} className="flex gap-4 group">
              <span className="text-2xl font-extrabold text-muted-foreground/35 group-hover:text-primary transition-colors select-none leading-none pt-1">
                0{index + 1}
              </span>
              <div className="space-y-1">
                <Link
                  href={`/blog/${post.id}`}
                  className="text-sm font-bold leading-snug line-clamp-2 hover:text-primary transition-colors text-foreground"
                >
                  {post.title}
                </Link>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span className="font-semibold">{post.category}</span>
                  <span>•</span>
                  <span>{post.likes} likes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Categories Widget */}
      <div className="glass-panel rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2 pb-3 border-b border-border/50">
          <FolderOpen className="w-4.5 h-4.5 text-primary" /> Categories
        </h3>
        <ul className="space-y-2.5">
          <li>
            <button
              onClick={() => onSelectCategory?.("All")}
              className={`flex items-center justify-between w-full text-sm py-1 font-semibold transition-all hover:translate-x-1 ${
                selectedCategory.toLowerCase() === "all"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>All Articles</span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border/30 font-bold">
                {posts.length}
              </span>
            </button>
          </li>
          {Object.entries(categoryCounts).map(([cat, count]) => {
            const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <li key={cat}>
                <button
                  onClick={() => onSelectCategory?.(cat)}
                  className={`flex items-center justify-between w-full text-sm py-1 font-semibold transition-all hover:translate-x-1 ${
                    isSelected ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span>{cat}</span>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border/30 font-bold">
                    {count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 4. Recent Posts Widget */}
      <div className="glass-panel rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2 pb-3 border-b border-border/50">
          <Calendar className="w-4.5 h-4.5 text-primary" /> Recent Posts
        </h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id} className="flex gap-3 group">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-14 h-14 object-cover rounded-lg border border-border group-hover:scale-102 transition-transform duration-300 flex-shrink-0"
              />
              <div className="space-y-1">
                <Link
                  href={`/blog/${post.id}`}
                  className="text-xs font-bold leading-normal line-clamp-2 hover:text-primary transition-colors text-foreground"
                >
                  {post.title}
                </Link>
                <span className="text-[10px] text-muted-foreground block">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Tags Cloud Widget */}
      <div className="glass-panel rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2 pb-3 border-b border-border/50">
          <Tag className="w-4.5 h-4.5 text-primary" /> Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Link
              key={tag}
              href={`/#articles-grid`}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-border/80 bg-secondary/20 hover:border-primary/45 hover:bg-secondary/40 text-muted-foreground hover:text-foreground transition-all duration-200"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}

// ----------------------------------------------------
// Isolated NewsletterCard component with Confetti
// ----------------------------------------------------
function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    // Simulate API subscribing delay
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setMessage("Thank you! You have been successfully subscribed.");

      // Fire confetti burst dynamically to prevent server-side Date.now() build checks
      import("canvas-confetti").then((module) => {
        const confettiFn = module.default;
        confettiFn({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#6366f1", "#818cf8", "#3b82f6", "#10b981"],
        });
      });
    }, 1200);
  };

  return (
    <div id="newsletter" className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-6 shadow-md shadow-primary/5">
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-primary/10 blur-xl pointer-events-none -z-10" />

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
            <Mail className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
            Newsletter <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500/10" />
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="text-base font-bold text-foreground">Subscribe to insights</h3>
          <p className="text-xs text-muted-foreground leading-normal">
            Get the latest guides on SaaS engineering, frontend architectures, and AI workflows delivered directly to your inbox.
          </p>
        </div>

        <form onSubmit={handleSubscribe} className="space-y-2">
          <div className="relative">
            <input
              type="email"
              value={email}
              disabled={status === "loading" || status === "success"}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
              className="w-full px-4 py-2.5 pl-4 pr-10 text-xs rounded-lg border border-border bg-background placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1.5 focus:ring-primary focus:border-transparent transition-all"
              aria-label="Email address for newsletter"
            />
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-7.5 h-7.5 rounded-md bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 transition-colors"
              aria-label="Subscribe submit"
            >
              {status === "loading" ? (
                <div className="w-3.5 h-3.5 border-2 border-background border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {message && (
            <p
              className={`text-[11px] font-semibold ${
                status === "success" ? "text-emerald-500" : "text-rose-500"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
