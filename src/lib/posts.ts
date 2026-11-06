import type { CollectionEntry } from "astro:content";
import { categories, categoryDescriptions, type Category } from "@/config/categories";
import { authorProfiles } from "@/config/authors";

export type Post = CollectionEntry<"posts">;
export { categories, categoryDescriptions, type Category };

export interface AuthorArchive {
  name: string;
  slug: string;
  role: string;
  description: string;
  avatarUrl?: string;
  posts: Post[];
}

export const categoryAccent: Record<Category, string> = {
  "Global Dispatch": "text-global",
  "AI Frontier": "text-ai",
  "Market Pulse": "text-market",
  "EV Shift": "text-ev",
  "Science Lab": "text-science",
  "Startup Watch": "text-startup",
};

export const categorySlug = (category: Category) =>
  category.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-");

export const categoryFromSlug = (slug: string): Category | undefined =>
  categories.find((category) => categorySlug(category) === slug);

export const tagSlug = (tag: string) =>
  tag
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export const authorSlug = (name: string) => tagSlug(name);

export const authorHref = (name: string) => `/author/${authorSlug(name)}/`;

export const postSlug = (post: Post) => post.id.replace(/\/index$/, "");

export const postHref = (post: Post) => `/post/${postSlug(post)}/`;

const readingWordsPerMinute = 225;

export const getReadMinutes = (post: Post) => {
  const body = post.body ?? "";
  const text = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/<[^>]+>/g, " ");
  const words = text.match(/[\p{L}\p{N}]+(?:['’.-][\p{L}\p{N}]+)*/gu)?.length ?? 0;

  return Math.max(1, Math.ceil(words / readingWordsPerMinute));
};

export const byNewest = (a: Post, b: Post) => b.data.date.getTime() - a.data.date.getTime();

export const visiblePosts = (posts: Post[]) =>
  posts.filter((post) => !post.data.draft).sort(byNewest);

export const excludePosts = (posts: Post[], excluded: Post[]) => {
  const excludedIds = new Set(excluded.map((post) => post.id));
  return posts.filter((post) => !excludedIds.has(post.id));
};

export const getByCategory = (posts: Post[], category: Category, limit?: number) => {
  const list = visiblePosts(posts).filter((post) => post.data.category === category);
  return typeof limit === "number" ? list.slice(0, limit) : list;
};

export const getTrending = (posts: Post[], limit = 5) => {
  const visible = visiblePosts(posts);
  const trending = visible.filter((post) => post.data.trending);
  return [...trending, ...visible.filter((post) => !post.data.trending)].slice(0, limit);
};

export const getRelated = (posts: Post[], current: Post, limit = 3) =>
  visiblePosts(posts)
    .filter((post) => post.id !== current.id)
    .sort((a, b) => {
      const categoryScore =
        Number(b.data.category === current.data.category) -
        Number(a.data.category === current.data.category);
      return categoryScore || byNewest(a, b);
    })
    .slice(0, limit);

export const getAllTags = (posts: Post[]) =>
  Array.from(new Set(visiblePosts(posts).flatMap((post) => post.data.tags))).sort((a, b) =>
    a.localeCompare(b),
  );

export const getAuthors = (posts: Post[]): AuthorArchive[] => {
  const grouped = new Map<string, AuthorArchive>();

  visiblePosts(posts).forEach((post) => {
    const name = post.data.author.name;
    const slug = authorSlug(name);
    const profile = authorProfiles[slug];

    if (!grouped.has(slug)) {
      grouped.set(slug, {
        name,
        slug,
        role: post.data.author.role,
        description:
          profile?.description ??
          `${name} writes for ${post.data.author.role.toLowerCase()}, covering the signals and decisions shaping technology markets.`,
        avatarUrl: profile?.avatarUrl,
        posts: [],
      });
    }

    grouped.get(slug)?.posts.push(post);
  });

  return Array.from(grouped.values()).sort((a, b) => a.name.localeCompare(b.name));
};

export const getAuthorBySlug = (posts: Post[], slug: string) =>
  getAuthors(posts).find((author) => author.slug === slug);

export const formatDate = (date: Date, style: "short" | "long" = "short") =>
  new Intl.DateTimeFormat("en-US", {
    month: style === "short" ? "short" : "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
