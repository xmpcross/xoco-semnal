# Customization Guide

Use this guide when adapting Semnal for a real publication.

## Site Settings

Edit [src/config/site.ts](./src/config/site.ts) first. It controls the site name, tagline, default metadata, canonical domain, contact email, social image, social links, and newsletter form settings.

Update `siteConfig.siteUrl` before building for production. Canonical URLs, social image URLs, RSS, robots, sitemap, and JSON-LD all depend on it.

Set `siteConfig.language` and `siteConfig.locale` together. The HTML `lang` attribute uses `language`, Open Graph locale uses `locale`, and RSS derives its language value from those settings.

## Categories

Categories live in one place: [src/config/categories.ts](./src/config/categories.ts). Add, remove, or rename categories there, then update demo posts so every `category` frontmatter value still matches the allowed list.

Header and footer navigation are generated from that same category list in [src/config/site.ts](./src/config/site.ts). You do not edit navigation labels or URLs separately unless you customize the layout components.

## Authors

Author archives are generated automatically from post frontmatter. Every visible post with:

```yaml
author:
  name: "Rafael Stone"
  role: "Science Reporter"
```

contributes to `/author/rafael-stone/`, and the full contributor index lives at `/authors/`. Author names are used for grouping, so keep spelling consistent across posts.

Customize profile descriptions and optional portraits in [src/config/authors.ts](./src/config/authors.ts):

```ts
export const authorProfiles = {
  "rafael-stone": {
    description: "Short author bio shown on the profile page.",
    avatarUrl: "/authors/rafael-stone.jpg",
  },
};
```

If `avatarUrl` is missing, the page uses an initial avatar. For local portraits, put square images in `public/authors/` and reference them with `/authors/file-name.jpg`. Keep portraits optimized and confirm usage rights before publishing.

When adding a new author, add at least one post with that author name, then optionally add a matching profile entry keyed by the generated slug.

## Reading Time

Reading time is calculated automatically from each post body in [src/lib/posts.ts](./src/lib/posts.ts). Editors do not need to add a `readMinutes` frontmatter field.

The computed value is reused by story cards, article pages, search results, the generated search index, and Article JSON-LD. If you change the reading-time formula, check those surfaces together.

## Newsletter

The newsletter form is intentionally provider-neutral. Configure it in `siteConfig.newsletter`:

```ts
newsletter: {
  action: "https://example.com/newsletter",
  method: "post",
  emailFieldName: "email",
}
```

Leave `action` empty while the form is only a visual starter. For production, connect it to your email provider or replace [src/components/NewsletterSignup.astro](./src/components/NewsletterSignup.astro) with provider-specific markup.

You can also edit the newsletter `eyebrow`, `title`, `description`, `buttonLabel`, and `note` in `siteConfig.newsletter`. `note` is the small print under the form. Keep the email field label in place if you customize the form markup.

## Search

The search page lives at [src/pages/search.astro](./src/pages/search.astro). Its data source is [src/pages/search-index.json.ts](./src/pages/search-index.json.ts), which is generated at build time from visible posts.

Search enhancement also appears in [src/components/SiteHeader.astro](./src/components/SiteHeader.astro). Header search opens a shared overlay dialog when JavaScript is available, with focus handling, Escape/backdrop close behavior, and scroll locking. Without JavaScript, the search buttons are normal links to `/search/`.

The overlay form and search page form both use real `GET` submissions to `/search/`. When changing indexed post fields, update the search index and both ranking functions so header search and page search stay consistent.

## Images

Posts keep images next to each Markdown file. Each cover needs useful alt text and a credit URL. Astro optimizes theme-controlled images during build, but source images should still be reasonably sized before shipping a production site.

Author portraits are not required. If you add them through `src/config/authors.ts`, store local portraits under `public/authors/` or use trusted absolute URLs. Prefer square images so the archive avatar crop remains predictable.

Replace these launch assets before publishing:

- [preview.webp](./preview.webp) for README and marketplace previews
- [public/favicon.svg](./public/favicon.svg) for the browser icon
- [public/og-image.png](./public/og-image.png) for default social sharing

Social brand icons live in [public/icons](./public/icons). Non-brand control icons are inline through [src/components/Icon.astro](./src/components/Icon.astro), so you can adjust those without adding an icon package. The share sheet draws its own marks from Phosphor Icons (MIT) in [src/icons/phosphor](./src/icons/phosphor), imported with `?raw`; add an SVG there and register it in [src/components/ShareSheet.astro](./src/components/ShareSheet.astro) to add a target.

Marketplace-only screenshots can be added if your sales channel asks for them; they are not required by the site runtime.

## Pages

Core static pages live in [src/pages](./src/pages):

- `about.astro`
- `authors.astro`
- `contact.astro`
- `privacy.astro`
- `search.astro`

Replace the starter copy with publication-specific masthead, advertising, privacy, and legal information.

Dynamic and generated templates also live in [src/pages](./src/pages), including `post/[slug].astro`, `author/[author].astro`, `category/[category].astro`, `tag/[tag].astro`, `all-news/[...page].astro`, `rss.xml.ts`, `robots.txt.ts`, and `search-index.json.ts`.

## Theme Tokens

Global colors, typography, borders, focus styles, dark mode, and motion rules live in [src/styles/global.css](./src/styles/global.css). Prefer editing tokens near the top of that file before changing individual components.

Dark mode uses the `data-theme` attribute on the root element after the inline theme script runs. The current default is light mode unless the visitor chooses and saves dark mode with the theme toggle.

Dark colors are centralized in the `:root[data-theme="dark"]` block and mirrored in the `prefers-color-scheme: dark` fallback block. Start with `--background`, `--surface`, `--card`, `--muted`, `--muted-foreground`, `--border`, `--border-strong`, and `--background-wash` when changing the overall dark-mode feel. Search and mobile menu shadows/backdrops are defined farther down in the same stylesheet and should stay neutral unless you intentionally want tinted overlays.

`--rule` is the grey used by section rules. It is deliberately lighter than the text colour so a 2px divider reads as a divider rather than a second headline.

`--header-height` is the height of the sticky header. Sticky sidebars and heading scroll offsets are derived from it, so change it there rather than in individual pages if you resize the header.

## Fonts

Three self-hosted variable families ship in [public/fonts](./public/fonts), with their licences alongside:

- **Libre Franklin** (`--font-display`) for headlines and the wordmark
- **Geist** (`--font-sans`) for body copy, with a real italic
- **IBM Plex Mono** (`--font-mono`) for eyebrows, timestamps, and rank numbers

Every family is subset to latin and latin-ext, so there are no external font requests. Libre Franklin and Geist latin are preloaded in [src/layouts/BaseLayout.astro](./src/layouts/BaseLayout.astro); IBM Plex Mono is left to swap. To change a family, replace the `@font-face` blocks and the matching `--font-*` token, and update the preload links.

## Motion

Blocks above the fold rise in on load with a short stagger (`.opener`), and everything below is scroll-driven through CSS view timelines (`.reveal`, `.grid-cards`, `.section-rule`). Where a browser lacks view timelines, `BaseLayout` registers an IntersectionObserver fallback instead; content is visible by default, so it never depends on JavaScript. Neither layer runs under `prefers-reduced-motion: reduce`.

Add `.reveal` to a block to animate it as one unit, or `.grid-cards` to a grid so its children stagger in.

## Components

Reusable components live in [src/components](./src/components). Most are static `.astro` components. The header owns the mobile navigation and search overlay scripts; article pages own the copy-link script.

The main component responsibilities are:

- `Icon.astro` for local Lucide-style non-brand control icons
- `SiteHeader.astro` for navigation, theme toggle, mobile menu, live wire, header search, and sticky header scroll reveal behavior
- `SiteFooter.astro` for footer navigation, social links, RSS, robots, and sitemap links
- `PostCard.astro` for reusable story card layouts
- `CategorySection.astro`, `LatestNewsList.astro`, and `PopularStories.astro` for homepage/news modules
- `NewsletterSignup.astro` and `PromoBanner.astro` for conversion and promotional areas
- `ShareButton.astro` and `ShareSheet.astro` for article sharing: one sheet per page, opened by any number of buttons
- `SectionIndex.astro` for the desk index band on the home page

The main header uses a solid `bg-surface` background instead of a translucent backdrop. It hides while scrolling down and returns on upward scroll, keyboard focus, and when the mobile menu or search overlay is open. The live wire ticker is intentionally outside that sticky header behavior so it scrolls with the page content.

## Metadata

Default metadata is centralized in [src/layouts/BaseLayout.astro](./src/layouts/BaseLayout.astro). Pass `title`, `description`, `image`, `type`, `noindex`, pagination URLs, or `structuredData` from a page when it needs page-specific SEO.

Use absolute or root-relative image paths for `siteConfig.socialImage`. The layout converts them to absolute social image URLs with `siteConfig.siteUrl`.
