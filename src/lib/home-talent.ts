export type HomeTalent = {
  id: string;
  name: string;
  image: string;
  category: string;
  followers: string;
  profileUrl: string;
  objectPosition?: string;
};

// Source: 官网博主信息.xlsx, 工作表1 rows 2–15.
// Only rows with an embedded photograph are included; follower counts are
// the supplied workbook values, rather than live channel statistics.
export const homeTalent: HomeTalent[] = [
  {
    id: "wittmanns-welt",
    name: "Wittmanns Welt",
    image: "/images/creators/wittmanns-welt.webp",
    category: "Tech",
    followers: "184k",
    profileUrl: "https://www.youtube.com/@wittmannswelt/",
  },
  {
    id: "hf-outdoors",
    name: "HF Outdoors",
    image: "/images/creators/hf-outdoors.webp",
    category: "Outdoors",
    followers: "428k",
    profileUrl: "https://www.youtube.com/@Hfoutdoorsyt/",
  },
  {
    id: "umit-memisoglu",
    name: "Ümit Memisoglu",
    image: "/images/creators/umit-memisoglu.webp",
    category: "Tech & Cooking",
    followers: "2.5M",
    profileUrl: "https://www.tiktok.com/@umihito",
  },
  {
    id: "better-together-homestead",
    name: "Better Together Homestead",
    image: "/images/creators/better-together-homestead.webp",
    category: "Off-grid",
    followers: "317k",
    profileUrl: "https://www.youtube.com/@BetterTogetherLife/",
  },
  {
    id: "outdoors-with-erik",
    name: "Outdoors with Erik",
    image: "/images/creators/outdoors-with-erik.webp",
    category: "Outdoors",
    followers: "506k",
    profileUrl: "https://www.youtube.com/@OutdoorswithErik",
  },
  {
    id: "travis-mcp",
    name: "Travis MCP",
    image: "/images/creators/travis-mcp.webp",
    category: "Tech",
    followers: "130k",
    profileUrl: "https://www.youtube.com/@TravisMCP",
    objectPosition: "50% 0%",
  },
  {
    id: "jolatetv",
    name: "jolatetv",
    image: "/images/creators/jolatetv.webp",
    category: "Tech",
    followers: "89.7k",
    profileUrl: "https://www.youtube.com/@jolatetv8150",
  },
  {
    id: "daddyfamtech",
    name: "DaddyFamtech",
    image: "/images/creators/daddyfamtech.webp",
    category: "Tech",
    followers: "220k",
    profileUrl: "https://www.youtube.com/@DaddyFamtech",
  },
  {
    id: "david-nogueira",
    name: "David Nogueira",
    image: "/images/creators/david-nogueira.webp",
    category: "TV & Tech",
    followers: "59.9k",
    profileUrl: "https://www.youtube.com/@davidnogueira_TechNogueira",
  },
  {
    id: "tusaliya",
    name: "tusaliya",
    image: "/images/creators/tusaliya.webp",
    category: "Home & Tech",
    followers: "550k",
    profileUrl: "https://www.instagram.com/tusaliya/reels/",
  },
  {
    id: "aurelie-morganmalau",
    name: "Aurelie-MorganMalau",
    image: "/images/creators/aurelie-morganmalau.webp",
    category: "Tech",
    followers: "156k",
    profileUrl: "https://www.youtube.com/@Aurelie-MorganMalau/videos",
  },
];
