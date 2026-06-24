"use client";

import { useState, useEffect, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowUp, BookOpen, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { Post } from "@/types";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import FeaturedCarousel from "./FeaturedCarousel";
import CategoryFilter from "./CategoryFilter";
import SearchBar from "./SearchBar";
import BlogCard from "./BlogCard";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useDebounce } from "@/hooks/useDebounce";

interface HomeClientProps {
  initialPosts: Post[];
}

export default function HomeClient({ initialPosts }: HomeClientProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const debouncedSearch = useDebounce(search, 300);



  // Back to top indicator threshold
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // React Query fetch & cache query logic
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", category, debouncedSearch, page],
    queryFn: async () => {
      const url = `/api/posts?category=${encodeURIComponent(
        category
      )}&search=${encodeURIComponent(debouncedSearch)}&page=${page}&limit=6`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch blog posts");
      return res.json();
    },
    // Populate cache instantly on first load using server-rendered initialPosts
    initialData:
      page === 1 && category === "All" && !debouncedSearch
        ? {
            posts: initialPosts,
            total: initialPosts.length,
            page: 1,
            totalPages: Math.ceil(initialPosts.length / 6),
          }
        : undefined,
    placeholderData: (prev) => prev,
  });

  const scrollGridIntoView = () => {
    document.getElementById("articles-grid")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Trending & Featured posts subsets computed from initial load
  const trendingPost = initialPosts.find((p) => p.trending) || initialPosts[0];
  const featuredPosts = initialPosts.filter((p) => p.featured);

  return (
    <>
      <Suspense fallback={<div className="h-16 bg-background border-b border-border/60 animate-pulse" />}>
        <Navbar />
      </Suspense>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero Area */}
        <HeroSection trendingPost={trendingPost} />

        {/* Featured Posts Carousel */}
        <section id="trending" className="pt-16">
          <div className="space-y-2 mb-8 text-center sm:text-left">
            <h2 className="text-2xl font-extrabold tracking-tight">Featured Stories</h2>
            <p className="text-sm text-muted-foreground">Handpicked deep-dives and engineering highlights.</p>
          </div>
          <FeaturedCarousel posts={featuredPosts} />
        </section>

        {/* Articles Grid, Categories Filter, Search Bar */}
        <section id="articles-grid" className="pt-12 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Main Stream */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight">Discover Articles</h2>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="w-full sm:w-72">
                    <SearchBar value={search} onChange={(val) => { setSearch(val); setPage(1); }} />
                  </div>
                  <div className="w-full">
                    <CategoryFilter selectedCategory={category} setSelectedCategory={(cat) => { setCategory(cat); setPage(1); }} />
                  </div>
                </div>
              </div>

              {/* Grid content conditional logic */}
              {isError ? (
                <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-6 text-center space-y-3">
                  <AlertTriangle className="w-8 h-8 text-rose-500 mx-auto" />
                  <h4 className="font-bold text-foreground">Something went wrong</h4>
                  <p className="text-sm text-muted-foreground">{error?.message || "Could not retrieve articles."}</p>
                </div>
              ) : isLoading ? (
                // Shimmer Skeleton Loaders
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="rounded-2xl border border-border/80 bg-card/25 p-5 space-y-4 animate-pulse">
                      <div className="aspect-video w-full shimmer-bg rounded-xl" />
                      <div className="h-4 w-1/3 shimmer-bg rounded" />
                      <div className="h-6 w-full shimmer-bg rounded" />
                      <div className="h-4 w-5/6 shimmer-bg rounded" />
                      <div className="flex items-center gap-3 pt-3 border-t border-border/50">
                        <div className="w-8 h-8 rounded-full shimmer-bg" />
                        <div className="h-3 w-1/4 shimmer-bg rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : data?.posts?.length === 0 ? (
                // Empty state illustration
                <div className="rounded-2xl border border-border/80 bg-card/10 p-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-secondary/40 flex items-center justify-center mx-auto text-muted-foreground">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-foreground">No posts found</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                      We couldn&apos;t find any articles matching &quot;{search}&quot; in the category &quot;{category}&quot;.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSearch("");
                      setCategory("All");
                    }}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-foreground text-background"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                // Blog Grid
                <div className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {data?.posts?.map((post: Post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>

                  {/* Pagination control footer */}
                  {data?.totalPages > 1 && (
                    <div className="flex items-center justify-between pt-4 border-t border-border/60">
                      <button
                        onClick={() => {
                          setPage((p) => Math.max(p - 1, 1));
                          scrollGridIntoView();
                        }}
                        disabled={page === 1}
                        className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg border border-border/80 bg-card/40 hover:bg-secondary/40 disabled:opacity-40 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" /> Previous
                      </button>
                      <span className="text-xs font-semibold text-muted-foreground">
                        Page {page} of {data?.totalPages}
                      </span>
                      <button
                        onClick={() => {
                          setPage((p) => Math.min(p + 1, data.totalPages));
                          scrollGridIntoView();
                        }}
                        disabled={page === data?.totalPages}
                        className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg border border-border/80 bg-card/40 hover:bg-secondary/40 disabled:opacity-40 transition-colors"
                      >
                        Next <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Sidebar Columns */}
            <div className="lg:col-span-4 space-y-10">
              <Sidebar
                posts={initialPosts}
                selectedCategory={category}
                onSelectCategory={(cat) => {
                  setCategory(cat);
                  setPage(1);
                  scrollGridIntoView();
                }}
              />
            </div>
          </div>
        </section>
      </main>

      <Suspense fallback={<div className="h-40 bg-secondary/10 animate-pulse" />}>
        <Footer />
      </Suspense>

      {/* Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 flex items-center justify-center w-10 h-10 rounded-full border border-border shadow-lg bg-background/80 hover:bg-background text-foreground backdrop-blur-sm z-50 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 ${
          showScrollTop ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-4 invisible pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-4.5 h-4.5" />
      </button>
    </>
  );
}
