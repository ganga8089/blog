import { mockPosts } from "@/lib/mockData";
import HomeClient from "@/components/HomeClient";
import { Suspense } from "react";

export default async function HomePage() {
  // Pre-fetch/compile data on server load
  const initialPosts = [...mockPosts];

  return (
    <Suspense fallback={<div className="min-h-screen bg-background animate-pulse" />}>
      <HomeClient initialPosts={initialPosts} />
    </Suspense>
  );
}
