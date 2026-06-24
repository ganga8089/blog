"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Hexagon, Menu, X, ArrowRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/#categories" },
  { name: "Trending", href: "/#trending" },
  { name: "About", href: "/#about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      let targetElement = document.getElementById(targetId);
      
      if (targetId === "categories") {
        targetElement = document.getElementById("articles-grid");
      } else if (targetId === "about") {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
        return;
      }
      
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/70 backdrop-blur-md shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent text-primary-foreground shadow-md shadow-primary/10 group-hover:scale-105 transition-all duration-300">
                <Hexagon className="w-5.5 h-5.5 fill-primary-foreground/15 animate-[spin_8s_linear_infinite]" />
              </div>
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                Oronium
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href.startsWith("/#") && pathname === "/");
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.href)}
                  className={`text-sm font-medium transition-colors hover:text-foreground relative py-1.5 ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-primary to-accent" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Menu */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/#newsletter"
              onClick={(e) => handleNavLinkClick(e, "/#newsletter")}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wide rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/15 active:scale-95 transition-all duration-200"
            >
              Subscribe <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/40 border border-transparent hover:border-border transition-colors duration-200"
              aria-expanded={isOpen}
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <div
        className={`md:hidden fixed inset-x-0 top-16 sm:top-20 z-45 border-b border-border/80 bg-background/95 backdrop-blur-lg shadow-xl transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => {
                setIsOpen(false);
                handleNavLinkClick(e, link.href);
              }}
              className="block px-3 py-2.5 rounded-lg text-base font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary/40 border border-transparent hover:border-border transition-all duration-200"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-border/60">
            <Link
              href="/#newsletter"
              onClick={(e) => {
                setIsOpen(false);
                handleNavLinkClick(e, "/#newsletter");
              }}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/95 transition-colors"
            >
              Subscribe Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
