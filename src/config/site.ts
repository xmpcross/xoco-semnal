import { categories } from "./categories";

export const siteConfig = {
  name: "Semnal",
  tagline: "Technology, markets, and science in motion",
  title: "Semnal - Technology, startups, AI, markets, EVs, and science",
  description:
    "A modern editorial news theme for technology, startups, AI, business, electric mobility, science, and markets.",
  siteUrl: "https://semnal.xocoweb.workers.dev",
  authorName: "Andrei Alba",
  email: "editorial@example.com",
  language: "en",
  locale: "en_US",
  socialImage: "/og-image.png",
  newsletter: {
    action: "",
    method: "post",
    emailFieldName: "email",
    eyebrow: "Signal Briefing",
    title: "A smarter daily read on technology and capital.",
    description:
      "One concise editorial briefing on AI, startups, markets, EVs, science, and the global technology shifts underneath them.",
    buttonLabel: "Subscribe",
    note: "Free. One email a day, no partner sends. Unsubscribe in a click.",
  },
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/semnal",
      icon: "/icons/linkedin.svg",
    },
    { label: "X", href: "https://x.com/semnal", icon: "/icons/x.svg" },
    { label: "YouTube", href: "https://www.youtube.com/@semnal", icon: "/icons/youtube.svg" },
    { label: "RSS", href: "/rss.xml", icon: "/icons/rss.svg" },
  ],
};

const categorySlug = (category: string) =>
  category.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-");

export const navigation = categories.map((category) => ({
  label: category,
  href: `/category/${categorySlug(category)}/`,
}));
