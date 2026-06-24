"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, BookOpen, User } from "lucide-react";
import { Post } from "@/types";

interface FeaturedCarouselProps {
  posts: Post[];
}

export default function FeaturedCarousel({ posts }: FeaturedCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % posts.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  // Auto-play interval
  useEffect(() => {
    if (posts.length <= 1) return;

    const nextSlide = () => {
      setActiveIndex((prev) => (prev + 1) % posts.length);
    };

    timerRef.current = setInterval(nextSlide, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [posts.length]);

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % posts.length);
      }, 6000);
    }
  };

  if (!posts || posts.length === 0) return null;

  return (
    <div className="relative group w-full overflow-hidden rounded-2xl border border-border/80 bg-card/10 backdrop-blur-md mb-12 shadow-xl">
      {/* Slider Viewport */}
      <div className="relative h-[480px] sm:h-[420px] md:h-[450px] w-full">
        {posts.map((post, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={post.id}
              className={`absolute inset-0 w-full h-full flex flex-col md:flex-row transition-all duration-700 ease-in-out ${
                isActive
                  ? "opacity-100 translate-x-0 pointer-events-auto"
                  : "opacity-0 translate-x-full pointer-events-none"
              }`}
            >
              {/* Cover Image Half */}
              <div className="relative w-full h-44 sm:h-52 md:h-full md:w-1/2 overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background/90 md:from-transparent via-transparent to-transparent" />
                <span className="absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1 rounded-md bg-primary/95 text-primary-foreground text-xs font-bold uppercase tracking-wider">
                  Featured
                </span>
              </div>

              {/* Text Details Half */}
              <div className="flex flex-col justify-center p-6 sm:p-8 md:p-12 md:w-1/2 space-y-4 sm:space-y-6 bg-card/60">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-md bg-secondary text-foreground text-xs font-semibold">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> {post.readTime}
                  </span>
                </div>

                <Link href={`/blog/${post.id}`} className="block group/link">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight group-hover/link:text-primary transition-colors line-clamp-3 leading-snug">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-sm text-muted-foreground line-clamp-3 font-normal">
                  {post.excerpt}
                </p>

                {/* Author footer */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-border/50">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-9 h-9 rounded-full object-cover border border-border"
                  />
                  <div>
                    <h4 className="text-sm font-semibold flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-muted-foreground" /> {post.author.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">{post.author.role}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls (Arrows) */}
      {posts.length > 1 && (
        <>
          <button
            onClick={() => {
              handlePrev();
              resetTimer();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background/80 hover:bg-background text-foreground hover:scale-105 active:scale-95 transition-all opacity-0 group-hover:opacity-100 z-10"
            aria-label="Previous featured post"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              handleNext();
              resetTimer();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background/80 hover:bg-background text-foreground hover:scale-105 active:scale-95 transition-all opacity-0 group-hover:opacity-100 z-10"
            aria-label="Next featured post"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Pagination dots indicators */}
      {posts.length > 1 && (
        <div className="absolute bottom-4 right-6 flex items-center gap-2 z-10 bg-background/40 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/5">
          {posts.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                resetTimer();
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? "w-6 bg-primary" : "w-2 bg-muted-foreground/45 hover:bg-muted-foreground/75"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
