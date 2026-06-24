import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Heart } from "lucide-react";
import { mockPosts } from "@/lib/mockData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import {
  ReadingProgressBar,
  TableOfContents,
  ShareButtons,
  RelatedPosts,
  PrevNextNavigation,
} from "@/components/BlogDetailComponents";

export const unstable_instant = {
  prefetch: "runtime",
  samples: [
    {
      params: { id: "1" },
    },
  ],
};

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

// Generate dynamic SEO metadata tags for each blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = mockPosts.find((p) => p.id === id);

  if (!post) {
    return {
      title: "Post Not Found | Oronium",
      description: "The requested blog article was not found.",
    };
  }

  return {
    title: `${post.title} | Oronium Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }],
      type: "article",
      publishedTime: post.createdAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

import { Suspense } from "react";

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <>
      {/* Scroll reading progress bar */}
      <ReadingProgressBar />

      <Suspense fallback={<div className="h-16 bg-background border-b border-border/60 animate-pulse" />}>
        <Navbar />
      </Suspense>

      <Suspense fallback={<BlogDetailSkeleton />}>
        {params.then(({ id }) => (
          <BlogPostContent id={id} />
        ))}
      </Suspense>

      <Suspense fallback={<div className="h-40 bg-secondary/10 animate-pulse" />}>
        <Footer />
      </Suspense>
    </>
  );
}

function BlogDetailSkeleton() {
  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-pulse">
      {/* Back Link Shimmer */}
      <div className="h-4 w-28 shimmer-bg rounded mb-8" />
      {/* Cover image Shimmer */}
      <div className="w-full h-[280px] sm:h-[400px] md:h-[460px] rounded-2xl shimmer-bg mb-10 md:mb-14" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left widget shimmer */}
        <div className="lg:col-span-3 space-y-6">
          <div className="h-32 shimmer-bg rounded-xl" />
          <div className="h-48 shimmer-bg rounded-xl" />
        </div>
        {/* Right content shimmer */}
        <div className="lg:col-span-9 space-y-6">
          <div className="h-10 w-3/4 shimmer-bg rounded" />
          <div className="h-4 w-1/4 shimmer-bg rounded" />
          <div className="h-4 w-full shimmer-bg rounded pt-4" />
          <div className="h-4 w-full shimmer-bg rounded" />
          <div className="h-4 w-5/6 shimmer-bg rounded" />
        </div>
      </div>
    </main>
  );
}

async function BlogPostContent({ id }: { id: string }) {
  const postIndex = mockPosts.findIndex((p) => p.id === id);
  const post = postIndex !== -1 ? mockPosts[postIndex] : null;

  if (!post) {
    notFound();
  }

  const prevPost = postIndex > 0 ? mockPosts[postIndex - 1] : undefined;
  const nextPost = postIndex < mockPosts.length - 1 ? mockPosts[postIndex + 1] : undefined;

  // Format creation date
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Back Link */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Back to Articles
        </Link>
      </div>

      {/* Cover image hero container */}
      <div className="relative w-full h-[280px] sm:h-[400px] md:h-[460px] rounded-2xl overflow-hidden border border-border/80 shadow-lg mb-10 md:mb-14">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        
        {/* Category Overlay */}
        <span className="absolute bottom-6 left-6 px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider shadow-md">
          {post.category}
        </span>
      </div>

      {/* Main Column Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left sticky widget panel: Table of Contents & Social Shares */}
        <div className="lg:col-span-3 space-y-8 lg:sticky lg:top-24">
          {/* Author info card */}
          <div className="glass-panel rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-11 h-11 rounded-full object-cover border border-border"
              />
              <div>
                <h4 className="text-sm font-bold text-foreground">{post.author.name}</h4>
                <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{post.author.role}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-normal">{post.author.bio}</p>
          </div>

          {/* Sticky Table of Contents */}
          <div className="hidden lg:block glass-panel rounded-xl p-5">
            <TableOfContents content={post.content} />
          </div>

          {/* Social Share utilities */}
          <div className="glass-panel rounded-xl p-5">
            <ShareButtons title={post.title} />
          </div>
        </div>

        {/* Right main read panel: Post content rendering */}
        <div className="lg:col-span-9 space-y-8">
          <div className="space-y-4">
            {/* Meta tags */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-primary" /> {formattedDate}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-primary" /> {post.readTime}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1 text-rose-500">
                <Heart className="w-4 h-4 fill-rose-500/10" /> {post.likes} likes
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              {post.title}
            </h1>
          </div>

          {/* Rendered post markup */}
          <article className="border-t border-border/60 pt-8">
            <MarkdownRenderer content={post.content} />
          </article>

          {/* Tag aggregates cloud for active post */}
          <div className="flex flex-wrap gap-2 pt-6 border-t border-border/50">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold px-2.5 py-1 rounded-md bg-secondary text-muted-foreground border border-border/30"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Bottom route navigation */}
          <PrevNextNavigation prevPost={prevPost} nextPost={nextPost} />

          {/* Related Posts Widget */}
          <RelatedPosts posts={mockPosts} currentId={post.id} category={post.category} />
        </div>
      </div>
    </main>
  );
}
