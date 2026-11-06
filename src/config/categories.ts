export const categories = [
  "Global Dispatch",
  "AI Frontier",
  "Market Pulse",
  "EV Shift",
  "Science Lab",
  "Startup Watch",
] as const;

export type Category = (typeof categories)[number];

/** One-line standfirst per section. Used under section headings and on
 *  category pages, so a section never reads as a bare label. */
export const categoryDescriptions: Record<Category, string> = {
  "Global Dispatch":
    "Policy, trade rules, and the infrastructure moving technology across borders.",
  "AI Frontier": "Model releases, inference economics, and the systems being wired around them.",
  "Market Pulse": "Capital flows, valuations, and the numbers behind the technology cycle.",
  "EV Shift": "Batteries, charging, and the industrial build-out behind electric transport.",
  "Science Lab": "Instruments, materials, and research edging out of the lab.",
  "Startup Watch": "Founders, funding, and the products finding their first real market.",
};
