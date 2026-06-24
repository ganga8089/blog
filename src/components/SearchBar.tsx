"use client";

import { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Keypress listener for Ctrl+K / Cmd+K to focus input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
        <Search className="w-4.5 h-4.5" />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search articles by title, tags, authors..."
        className="w-full pl-11 pr-16 py-3 text-sm rounded-xl border border-border/80 bg-card/25 backdrop-blur-sm placeholder:text-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition-all duration-200"
        aria-label="Search articles"
      />
      {value ? (
        <button
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-3 flex items-center px-1.5 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      ) : (
        <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none">
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-medium text-muted-foreground border border-border/80 bg-secondary/50 rounded-md">
            <span>⌘</span>
            <span>K</span>
          </kbd>
        </div>
      )}
    </div>
  );
}
