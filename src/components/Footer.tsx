"use client";

import Link from "next/link";
import { Hexagon, Heart } from "lucide-react";

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & Description */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent text-primary-foreground shadow-sm">
                <Hexagon className="w-4.5 h-4.5 fill-primary-foreground/15" />
              </div>
              <span className="font-bold text-lg tracking-tight">Oronium</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Discover stories, technical guides, and design thoughts from modern engineers, creators, and researchers.
            </p>
            <div className="flex gap-4 pt-2">
              <Link
                href="https://twitter.com"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Follow Oronium on Twitter"
              >
                <TwitterIcon className="w-5 h-5" />
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Follow Oronium on GitHub"
              >
                <GithubIcon className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Follow Oronium on LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Categories Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Categories</h3>
            <ul className="space-y-2">
              {["Technology", "AI", "Design", "Business", "Lifestyle"].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/#categories`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#trending" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Trending Articles
                </Link>
              </li>
              <li>
                <Link href="/#newsletter" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Newsletter
                </Link>
              </li>
              <li>
                <Link href="mailto:hello@oronium.io" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Support & Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 Oronium Inc. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> &amp; Next.js.
          </p>
        </div>
      </div>
    </footer>
  );
}
