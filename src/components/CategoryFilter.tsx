"use client";

import { useEffect, useRef } from "react";

const CATEGORIES = ["All", "Technology", "AI", "Design", "Business", "Lifestyle"];

interface CategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
}: CategoryFilterProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll active element into view on small screens
  useEffect(() => {
    if (!containerRef.current) return;
    const activeEl = containerRef.current.querySelector('[aria-selected="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedCategory]);

  return (
    <div className="w-full border-b border-border/50 pb-4 mb-8">
      <div className="flex items-center justify-between gap-4">
        {/* Pills container */}
        <div
          ref={containerRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth pb-2 -mb-2 w-full"
          role="tablist"
          aria-label="Filter blog posts by category"
        >
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory.toLowerCase() === category.toLowerCase();
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 px-4 py-2 text-xs font-semibold rounded-lg border transition-all duration-200 active:scale-95 ${
                  isSelected
                    ? "bg-primary border-primary text-primary-foreground shadow-sm shadow-primary/15"
                    : "bg-secondary/35 border-border/80 text-muted-foreground hover:text-foreground hover:bg-secondary/70 hover:border-muted-foreground/35"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
