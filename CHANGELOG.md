# Changelog

All notable changes to Semnal are documented here.

## 1.2.1 - 2026-10-21

- Updated Astro to 7.4.1 and other dependencies.
- Updated `AGENTS.md` for Astro 7.
- Files check out with LF line endings on every platform.
- Added the build command to `wrangler.jsonc`.

## 1.2.0 - 2026-09-08

- Replaced the theme's typefaces with three self-hosted variable fonts: Libre Franklin for headlines, Geist for prose, and IBM Plex Mono for eyebrows, timestamps, and rank numbers. Previously both display and body named Inter without ever loading it, so most readers saw a system sans.
- Subset each family to latin and latin-ext WOFF2 under `public/fonts`, with the licence text alongside. There are still no external font requests; Libre Franklin and Geist latin are preloaded, IBM Plex Mono is left to swap.
- Took story cards out of their boxes. Posts now sit directly on the page with the picture and hairline rules doing the framing, instead of a bordered card on a raised surface. The layouts are unchanged.
- Added scroll motion. Blocks above the fold rise in on load with a short stagger (`.opener`), and everything below is scroll-driven through CSS view timelines (`.reveal`, `.grid-cards`, `.section-rule`). `BaseLayout` registers an IntersectionObserver fallback only where view timelines are missing, and neither layer runs under reduced motion.
- Added easing and elevation tokens, and made hover states use them: covers scale inside their frame, headlines take the accent, and the sticky header casts a shadow once it detaches.
- Removed the dateline strip above the home page hero, and the divider under it.
- Removed the dot from category eyebrows. The label is now a chip tinted from the accent it already carries, so a new section colour needs no matching background token.
- Removed the ad slot from the theme: `AdSlot.astro`, `siteConfig.adLabel`, the home page placement, and the related documentation.
- Added a desk index band in its place, listing every section with its story count and the piece it is leading with.
- Rebuilt the newsletter as a centred block on one flat theme colour, so it is light in light mode and dark in dark mode: a short heading, the description, the field under it, and a small-print note. Added `buttonLabel` and `note` to `siteConfig.newsletter`.
- Replaced the row of social share icons with a single share control opening a share sheet, matching the pattern used across the newer themes. It is a native `<dialog>`, so the focus trap, Escape key, and backdrop come for free; it carries eleven targets with the long tail behind "More", plus the page link with a copy button. The sheet sits under the byline and again at the end of the reading, above the previous/next links. Its marks are Phosphor Icons (MIT) held locally in `src/icons/phosphor`.
- Set the mobile menu's page links as plain stacked text instead of bordered buttons, so they read as a list rather than four controls.
- Added hairlines between grid columns, painted in the gutter so every column keeps the same content width.
- Added a one-line standfirst per section in `src/config/categories.ts`, shown under section headings and on category pages, and set section labels flush on their rule instead of floating above it.
- Added a topics rail to the home page, capped at 14 tags so adding tags to the site never grows that block past its column, and a briefing promo that no longer repeats the newsletter's own call to action.
- Softened every section rule to a grey `--rule` token instead of the text colour, so a 2px divider reads as a divider rather than a second headline.
- Retuned both palettes: warm paper and ink blue in light mode, a deeper neutral in dark. Category accents were darkened in light mode to clear AA against the page.
- Reset the article page sidebar to park just under the sticky header rather than 11rem down the page, so it no longer drifts and never slides beneath the masthead when the header reveals on an upward scroll. Sticky offsets and heading scroll margins now derive from a `--header-height` token.
- Gave article bodies an editorial setting: a drop cap on the opening paragraph, rules above section headings, a banded pull quote, and accented list markers.
- Slowed the live wire ticker and paused it on hover so a headline can be clicked.
- Fixed the drop cap never rendering: the child combinator sat inside `:global()`, which compiled to an invalid selector.
- Fixed a missing space in the story count on category and tag pages.

## 1.1.0 - 2026-07-18

- Added automatic reading-time calculation from post body content and removed the required `readMinutes` frontmatter field.
- Updated post cards, article metadata, search results, search index output, and Article JSON-LD to use computed reading time.
- Simplified demo post frontmatter by removing manual reading-time values across the sample content set.
- Refined article pages with compact metadata icons, a mobile-friendly two-line metadata rhythm, heading styles for `h2` through `h6`, and share controls near the article header.
- Replaced rough non-brand control icons with a local Lucide-style Astro icon component, avoiding a new runtime dependency.
- Removed unused local SVG assets for search, sun, moon, and copy-link icons while keeping social brand icons intact.
- Consolidated header search into a shared accessible overlay dialog with focus handling, Escape/backdrop close behavior, and scroll locking.
- Updated the search page and header controls to use the new local icon component.
- Tightened the live wire marquee timing.
- Refined dark mode with a deeper neutral background, charcoal surfaces/cards, and neutral overlays instead of the previous blue-tinted palette.
- Updated the sticky header to use a solid theme surface and reveal on upward scroll while keeping the live wire ticker in the normal page flow.

## 1.0.0 - 2026-06-23

- Initial commercial release.
- Added Astro 7 magazine templates for home, posts, categories, tags, paginated archives, RSS, robots, sitemap, 404, about, contact, and privacy pages.
- Added typed content collections, centralized categories, SEO metadata, Open Graph, Twitter/X cards, and JSON-LD.
- Added light/dark color mode, accessible mobile navigation, newsletter configuration, ad slots, and responsive Astro images.
