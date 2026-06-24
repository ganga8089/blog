import { NextResponse } from "next/server";
import { mockPosts } from "@/lib/mockData";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "9", 10);

    let filteredPosts = [...mockPosts];

    // Filter by Category
    if (category && category.toLowerCase() !== "all") {
      filteredPosts = filteredPosts.filter(
        (post) => post.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by Search Query
    if (search) {
      const query = search.toLowerCase();
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.author.name.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          post.category.toLowerCase().includes(query)
      );
    }

    // Paginate
    const total = filteredPosts.length;
    const startIndex = (page - 1) * limit;
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      posts: paginatedPosts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("API Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
