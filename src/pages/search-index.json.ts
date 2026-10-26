import { getCollection } from "astro:content";
import { formatDate, getReadMinutes, postHref, visiblePosts } from "@/lib/posts";

export async function GET() {
  const posts = visiblePosts(await getCollection("posts")).map((post) => {
    const image = post.data.cover.src;

    return {
      title: post.data.title,
      excerpt: post.data.excerpt,
      category: post.data.category,
      tags: post.data.tags,
      author: post.data.author.name,
      date: post.data.date.toISOString(),
      dateLabel: formatDate(post.data.date),
      readMinutes: getReadMinutes(post),
      href: postHref(post),
      image: {
        src: image.src,
        width: image.width,
        height: image.height,
        alt: post.data.cover.alt,
      },
    };
  });

  return new Response(JSON.stringify({ posts }), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
