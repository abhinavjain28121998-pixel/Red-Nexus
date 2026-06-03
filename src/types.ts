export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  role?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  readTimeMinutes: number;
  author: Author;
  category: Category;
  tags: string[];
  featured?: boolean;
  trending?: boolean;
}
