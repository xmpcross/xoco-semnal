# Semnal - Astro News/Magazine Theme

[![Semnal theme preview](/preview.webp)](https://semnal.xocoweb.workers.dev/)

[![Astro 7](https://img.shields.io/badge/Astro-7-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Configured-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: Commercial](https://img.shields.io/badge/License-Commercial-2563eb?style=for-the-badge)](./LICENSE)

**Demo publication:** [Semnal](https://semnal.xocoweb.workers.dev/)

Semnal is a modern Astro news and magazine theme for technology, startups, AI, markets, electric mobility, science, and global business coverage. It is built for mostly static output, fast editorial pages, crawlable content, and easy customization.

## Features

- Magazine homepage with featured story, latest rail, secondary story grid, popular stories, category modules, newsletter, and promo/ad placements
- Dynamic category, tag, author, archive, article, RSS, robots, sitemap, and 404 pages
- Markdown content powered by Astro content collections
- Frontmatter validation for titles, excerpts, categories, dates, authors, tags, images, trending state, and drafts
- Automatic reading-time calculation from post body content
- Central site, author profile, navigation, social, newsletter, and SEO defaults
- Canonical URLs, RSS, Open Graph, Twitter/X cards, and JSON-LD structured data
- Accessible skip link, landmarks, labels, keyboard-friendly mobile navigation, and visible focus states
- Light/dark theme toggle with a neutral charcoal dark palette
- Solid sticky header that hides while scrolling down and returns when scrolling back up
- Lightweight client-side search over a generated static JSON index
- Local Lucide-style control icons without a runtime icon dependency
- Responsive Astro image handling for local story images
- Tailwind CSS 4 design tokens and three self-hosted variable fonts, with no external font requests
- Provider-neutral newsletter form and static about, contact, and privacy starter pages

## Tech Stack

- Astro 7
- Tailwind CSS 4 via the Vite plugin
- Vite 8
- TypeScript
- Astro content collections
- `@astrojs/sitemap`
- `rehype-slug`
- Sharp for image processing

## Requirements

- Node.js `22.12.0` or newer
- npm

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Format the project:

```bash
npm run format
```

Run the release QA checks:

```bash
npm run release:check
```

## First-Time Setup

1. Update the main site settings in [src/config/site.ts](./src/config/site.ts):

- `name`
- `title`
- `description`
- `siteUrl`
- `authorName`
- `email`
- `locale`
- `socialImage`
- `newsletter`
- `socials`

Navigation links are generated from categories in [src/config/categories.ts](./src/config/categories.ts). Update that file when you add, remove, or rename sections.

2. Update author profile settings in [src/config/authors.ts](./src/config/authors.ts):

- author slugs
- descriptions
- optional avatar URLs

Author archive pages are generated from post frontmatter. The profile config lets you enrich those generated pages with publication-ready bios and portraits.

3. Update package metadata in [package.json](./package.json):

- `name`
- `description`
- `author`
- `homepage`
- `repository`

4. Replace the preview assets:

- [preview.webp](./preview.webp) - README/marketplace preview image
- [public/favicon.svg](./public/favicon.svg)
- [public/og-image.png](./public/og-image.png)
  Add any marketplace-only screenshots separately if your sales channel requires them. They are not used by the site runtime.

## Content Editing

Posts live in [src/content/posts](./src/content/posts). Each post is a folder with an `index.md` file and a colocated cover image referenced in frontmatter.

Required frontmatter:

```yaml
title: "Story title"
excerpt: "Short summary for cards and metadata."
category: "AI Frontier"
date: 2026-07-07
author:
  name: "Author Name"
  role: "Editor"
tags:
  - "tag"
cover:
  src: ./cover.jpg
  alt: "Useful image description"
  creditName: "Photographer / Source"
  creditUrl: "https://example.com"
```

Optional frontmatter:

- `tags` - defaults to an empty list
- `trending` - defaults to `false`; marks stories for the header ticker and mobile menu
- `draft` - defaults to `false`; set to `true` to hide a post from generated pages, RSS, and listings

Valid categories are defined in [src/config/categories.ts](./src/config/categories.ts). If you add or rename a category, update that file and then update any post frontmatter that uses the old value.

Reading time is calculated automatically from the post body at build time.

### Search

Search is powered by the generated endpoint at `/search-index.json` and the static page at `/search/`. The index includes visible post titles, excerpts, categories, tags, authors, dates, reading time, URLs, and optimized image metadata. Draft posts are excluded.

The header search progressively enhances into a shared overlay dialog with instant results when JavaScript is available. Without JavaScript, header search controls still link to `/search/`, and search forms submit with normal `GET` requests.

### Author Pages

Each visible post author automatically gets an archive page at `/author/author-name/`, and all authors are listed at `/authors/`.

The author `name` and `role` come from post frontmatter. Keep author names consistent across posts so archives group correctly. For example, `Rafael Stone` and `R. Stone` would generate separate authors.

Customize author descriptions and optional avatars in [src/config/authors.ts](./src/config/authors.ts):

```ts
export const authorProfiles = {
  "author-name": {
    description: "Short author bio for the profile page.",
    avatarUrl: "/authors/author-name.jpg",
  },
};
```

If `avatarUrl` is omitted, the theme shows a generated initial avatar. For local avatar files, place images in `public/authors/` and reference them with an absolute path such as `/authors/author-name.jpg`. Use square images where possible, and make sure you have rights to publish author portraits.

## Customization

Global theme tokens and reusable utility classes live in [src/styles/global.css](./src/styles/global.css). Start there for colors, typography, spacing, borders, focus styles, dark mode, and shared interaction states.

Dark mode colors are centralized in the `:root[data-theme="dark"]` token block in [src/styles/global.css](./src/styles/global.css). Adjust `--background`, `--surface`, `--card`, `--muted`, borders, and overlay/shadow colors there before editing individual components.

The sticky header in [src/components/SiteHeader.astro](./src/components/SiteHeader.astro) uses a solid `bg-surface` background. Its small inline script hides the header while scrolling down and reveals it on upward scroll, keyboard focus, or when the mobile menu/search overlay is open. The live wire ticker remains outside that sticky header behavior.

Edit categories in [src/config/categories.ts](./src/config/categories.ts), site identity in [src/config/site.ts](./src/config/site.ts), and stories/images in [src/content/posts](./src/content/posts).

Reusable components live in [src/components](./src/components):

- `CategorySection.astro`
- `CategoryTag.astro`
- `Icon.astro`
- `LatestNewsList.astro`
- `NewsletterSignup.astro`
- `PopularStories.astro`
- `PostCard.astro`
- `PromoBanner.astro`
- `SectionHeader.astro`
- `SectionIndex.astro`
- `ShareButton.astro`
- `ShareSheet.astro`
- `SiteFooter.astro`
- `SiteHeader.astro`

Pages live in [src/pages](./src/pages). The main templates are:

- Home: `index.astro`
- About: `about.astro`
- Contact/advertising: `contact.astro`
- Privacy: `privacy.astro`
- Search: `search.astro`
- Search index: `search-index.json.ts`
- Article detail: `post/[slug].astro`
- Author index: `authors.astro`
- Author archive: `author/[author].astro`
- Category archive: `category/[category].astro`
- Tag archive: `tag/[tag].astro`
- Paginated archive: `all-news/[...page].astro`
- RSS: `rss.xml.ts`
- Robots: `robots.txt.ts`
- 404: `404.astro`

For detailed customization notes, see [CUSTOMIZATION.md](./CUSTOMIZATION.md).

## SEO

The theme uses `siteConfig.siteUrl` from [src/config/site.ts](./src/config/site.ts) to generate absolute URLs for canonical tags, social images, RSS, robots, and the sitemap. Update it before publishing.

`BaseLayout.astro` centralizes page titles, descriptions, canonical URLs, Open Graph tags, Twitter/X card tags, RSS discovery, pagination links, robots noindex handling, and JSON-LD. Article and author pages pass their own structured data, while other pages use the default `WebSite` schema.

The sitemap is generated by `@astrojs/sitemap` during `npm run build`. Robots output is generated by [src/pages/robots.txt.ts](./src/pages/robots.txt.ts), RSS by [src/pages/rss.xml.ts](./src/pages/rss.xml.ts), and the search index by [src/pages/search-index.json.ts](./src/pages/search-index.json.ts).

## Accessibility and JavaScript

The theme includes a skip link, semantic landmarks, one clear `h1` per page, labeled forms, visible focus styles, keyboard-friendly mobile navigation and search overlay behavior, and reduced-motion handling. The mobile navigation and search overlay support Escape-to-close and keep keyboard focus inside the open panel.

JavaScript is limited to color mode, mobile navigation, drag scrolling on the mobile trending rail, search enhancement, and article copy-link feedback. There are no hydrated framework islands by default.

## Deployment

Deploy as a standard static Astro site on Vercel, Netlify, Cloudflare Workers static assets, Cloudflare Pages, or any static host.

For Cloudflare Workers static assets, use:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`

Before launch:

- Set `siteUrl` in [src/config/site.ts](./src/config/site.ts)
- Replace demo posts, images, authors, credits, and contact details
- Replace the favicon, preview, and Open Graph images
- Confirm `homepage` and `repository` in [package.json](./package.json)
- Run `npm run release:check`
- Check generated canonical URLs, RSS, robots, and sitemap output
- Test keyboard navigation, focus states, mobile layout, and color contrast

For packaging, support, and version history, see:

- [SUPPORT.md](./SUPPORT.md)
- [CHANGELOG.md](./CHANGELOG.md)

## Template Catalogue Notes

This package is configured as a paid commercial template. It is marked `"private": true` to prevent accidental npm publishing, and the package license points to the custom license text in [LICENSE](./LICENSE).

The included demo content is realistic placeholder editorial content. Buyers should replace it before publishing a real site and verify rights for any images they keep.

## License

Semnal is licensed under the [Semnal Commercial Template License](./LICENSE).
