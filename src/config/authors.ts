export interface AuthorProfile {
  description: string;
  avatarUrl?: string;
}

export const authorProfiles: Record<string, AuthorProfile> = {
  "amira-cole": {
    description:
      "Amira covers startup strategy, founder operations, and the changing mechanics of venture-backed company building.",
  },
  "elena-park": {
    description:
      "Elena follows electric mobility, charging infrastructure, fleet operations, and the industrial shift around transport.",
  },
  "mara-ionescu": {
    description:
      "Mara reports on global technology policy, infrastructure, connectivity, and the institutions shaping digital markets.",
  },
  "nadia-chen": {
    description:
      "Nadia tracks markets, capital flows, cloud spending, semiconductors, and the financial signals behind technology cycles.",
  },
  "rafael-stone": {
    description:
      "Rafael writes about science, research infrastructure, climate systems, quantum computing, and emerging lab-to-market signals.",
  },
  "theo-grant": {
    description:
      "Theo covers AI systems, model economics, enterprise adoption, and the infrastructure choices behind applied machine intelligence.",
  },
};
