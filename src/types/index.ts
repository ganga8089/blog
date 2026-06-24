export interface Author {
  name: string;
  avatar: string;
  bio: string;
  role: string;
}

export interface Comment {
  id: string;
  authorName: string;
  avatar: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  coverImage: string;
  author: Author;
  createdAt: string;
  readTime: string;
  likes: number;
  tags: string[];
  commentsCount: number;
  featured?: boolean;
  trending?: boolean;
}
