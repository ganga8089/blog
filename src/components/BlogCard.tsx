import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Heart } from "lucide-react";
import { Post } from "@/types";

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  // Format Date beautifully
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group relative flex flex-col h-full rounded-2xl border border-border/80 bg-card/20 backdrop-blur-sm overflow-hidden glow-hover transition-all duration-300 hover:-translate-y-1">
      {/* Cover Image */}
      <div className="relative w-full aspect-video overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Category Badge overlay */}
        <span className="absolute top-4 left-4 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-md bg-background/80 text-foreground backdrop-blur-md border border-white/5">
          {post.category}
        </span>
      </div>

      {/* Card Content Body */}
      <div className="flex flex-col flex-1 p-5 space-y-4">
        {/* Metadata info row */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {formattedDate}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" /> {post.readTime}
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-2 flex-1">
          <Link href={`/blog/${post.id}`} className="block">
            <h3 className="text-lg font-bold tracking-tight line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-200">
              {post.title}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold text-muted-foreground/90 bg-secondary/40 px-2 py-0.5 rounded-md border border-border/30"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer Info Row */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center gap-2.5">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-8 h-8 rounded-full object-cover border border-border"
              loading="lazy"
            />
            <span className="text-xs font-semibold text-foreground/80 line-clamp-1">
              {post.author.name}
            </span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="flex items-center gap-1 text-xs">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/10 group-hover:fill-rose-500/30 transition-all duration-300" />{" "}
              {post.likes}
            </span>
            <Link
              href={`/blog/${post.id}`}
              className="text-xs font-semibold text-primary flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform duration-200"
              aria-label={`Read ${post.title}`}
            >
              Read <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
