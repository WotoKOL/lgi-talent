import { homeTalent, type HomeTalent } from "@/lib/home-talent";

export type CreatorPlatform = "YouTube" | "TikTok" | "Instagram";

export type CreatorProfile = HomeTalent & {
  country: string;
  contentTopics: string[];
  bio: string;
  platform: CreatorPlatform;
  handle: string;
};

type CreatorDetails = Pick<CreatorProfile, "country" | "contentTopics" | "bio">;

// Source: 官网博主信息.xlsx, 工作表1 columns D, F and G.
// Biographies and countries preserve the workbook text. Topic labels only
// normalize capitalization and split the source's combined categories.
const creatorDetails: Record<string, CreatorDetails> = {
  "wittmanns-welt": {
    country: "Germany",
    contentTopics: ["Tech"],
    bio: "Making technology exciting with hands-on reviews, clever innovations, and gadgets that make everyday life better.",
  },
  "hf-outdoors": {
    country: "US",
    contentTopics: ["Outdoors"],
    bio: "Getting hands-on with outdoor adventures, rugged gear, and automotive projects built for life beyond the ordinary.",
  },
  "umit-memisoglu": {
    country: "Germany",
    contentTopics: ["Tech", "Cooking"],
    bio: "Bringing tech and cooking vlogs together through creative content that makes everyday discoveries fun and inspiring.",
  },
  "better-together-homestead": {
    country: "US",
    contentTopics: ["Off-grid"],
    bio: "Embracing family life, big homestead dreams, and outdoor adventures while building a life together from the ground up.",
  },
  "outdoors-with-erik": {
    country: "US",
    contentTopics: ["Outdoors"],
    bio: "Transforming outdoor spaces, tackling ambitious projects, and inspiring viewers to make the most of their own backyards.",
  },
  "travis-mcp": {
    country: "US",
    contentTopics: ["Tech"],
    bio: "Travis MCP is a US-based tech YouTuber covering the latest smartphones, tech news, and consumer electronics, with a focus on product reviews and hands-on experiences.",
  },
  jolatetv: {
    country: "France",
    contentTopics: ["Tech"],
    bio: "Jonathan is a French tech creator specializing in consumer electronics, computer hardware, smart devices, and in-depth product reviews.",
  },
  daddyfamtech: {
    country: "France",
    contentTopics: ["Tech"],
    bio: "Pierre is a French tech creator focusing on smart home technology, family-oriented gadgets, and innovative consumer electronics.",
  },
  "david-nogueira": {
    country: "France",
    contentTopics: ["TV", "Tech"],
    bio: "David is a French tech reviewer specializing in consumer electronics, smart gadgets, and practical technology reviews.",
  },
  tusaliya: {
    country: "Germany",
    contentTopics: ["Home", "Tech"],
    bio: "Tusaliya is a lifestyle content creator sharing engaging short-form videos featuring everyday life and product experiences.",
  },
  "aurelie-morganmalau": {
    country: "France",
    contentTopics: ["Tech"],
    bio: "Aurélie and Morgan are a French creator duo focusing on family lifestyle, smart home technology, consumer electronics, and practical product reviews.",
  },
};

const platforms: Record<string, CreatorPlatform> = {
  "www.youtube.com": "YouTube",
  "www.tiktok.com": "TikTok",
  "www.instagram.com": "Instagram",
};

// Names, photographs, counts and channel URLs share the homepage's verified
// source. Platform and handle are derived from those public channel URLs.
// The three workbook rows without photographs remain excluded.
export const creatorProfiles: CreatorProfile[] = homeTalent.map((talent) => {
  const channel = new URL(talent.profileUrl);
  const account = channel.pathname.split("/").find(Boolean)!;

  return {
    ...talent,
    ...creatorDetails[talent.id],
    platform: platforms[channel.hostname],
    handle: account.startsWith("@") ? account : `@${account}`,
  };
});
