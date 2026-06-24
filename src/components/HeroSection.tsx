import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { Post } from "@/types";

interface HeroSectionProps {
  trendingPost?: Post;
}

export default function HeroSection({ trendingPost }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-border/50">
      {/* Background Gradient Orbs */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-primary/10 blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/10 w-96 h-96 rounded-full bg-accent/80 blur-[140px] pointer-events-none -z-10 opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Powered by Oronium Engine
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-foreground">
                Discover Stories, <br />
                <span className="bg-gradient-to-r from-primary via-indigo-400 to-accent bg-clip-text text-transparent">
                  Ideas & Insights
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-normal max-w-xl">
                Dive deep into detailed articles covering modern engineering architecture, generative AI systems, accessible UI design, and creative life.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/#articles-grid"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background font-semibold hover:bg-foreground/90 transition-all shadow-md active:scale-98"
              >
                Read Articles <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#newsletter"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border bg-card/40 backdrop-blur-sm font-semibold hover:bg-secondary/40 transition-all hover:border-primary/40"
              >
                Join Newsletter
              </Link>
            </div>
          </div>

          {/* Right column: Dynamic Trending Post Preview */}
          {trendingPost && (
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-accent opacity-20 group-hover:opacity-30 blur-lg transition duration-500" />
              <div className="relative glass-panel rounded-2xl p-6 md:p-8 space-y-6 glow-hover">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 text-amber-500 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <TrendingUp className="w-3.5 h-3.5" /> Trending now
                  </span>
                  <span className="text-xs text-muted-foreground">{trendingPost.readTime}</span>
                </div>

                <div className="space-y-3">
                  <Link
                    href={`/blog/${trendingPost.id}`}
                    className="block group-hover:text-primary transition-colors duration-300"
                  >
                    <h3 className="text-lg sm:text-xl font-bold line-clamp-2 leading-snug">
                      {trendingPost.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {trendingPost.excerpt}
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center justify-between pt-4 border-t border-border/60">
                  <div className="flex items-center gap-3">
                    <img
                      src={trendingPost.author.avatar}
                      alt={trendingPost.author.name}
                      className="w-10 h-10 rounded-full object-cover border border-border"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="text-sm font-semibold">{trendingPost.author.name}</h4>
                      <p className="text-xs text-muted-foreground">{trendingPost.author.role}</p>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${trendingPost.id}`}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-secondary/80 text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                    aria-label="Read Trending Article"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
