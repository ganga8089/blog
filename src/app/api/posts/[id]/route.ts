import { NextResponse } from "next/server";
import { mockPosts } from "@/lib/mockData";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = mockPosts.find((p) => p.id === id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("API Single Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}
