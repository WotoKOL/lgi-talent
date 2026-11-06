export type CaseAudience = "Brands" | "Creators";

export type CaseStudy = {
  slug: string;
  audience: CaseAudience;
  category: "Online" | "Offline";
  cardTitle: string;
  cardDescription: string;
  image: string;
  kind: "project" | "approach";
  eyebrow: string;
  headline: string;
  summary: string;
  tags: string[];
  facts: { label: string; value: string }[];
  metrics: { value: string; label: string; note?: string }[];
  challenge: string;
  approach: { title: string; text: string }[];
  deliverables: { title: string; text: string }[];
  outcome: string;
  measurementNote?: string;
  cover: { kicker: string; title: string; line: string };
};

// Source: LGI官网中文文案策划完整版.docx and its Markdown export.
// B01–B03 use the revised project details (source lines 748–870). Other
// entries describe documented service methods rather than unconfirmed cases.
// Gallery titles, descriptions, categories and image basenames are preserved.
export const caseStudies: CaseStudy[] = [
  {
    slug: "product-launches",
    audience: "Brands",
    category: "Online",
    cardTitle: "Product launches",
    cardDescription:
      "Unboxings, reviews, and real-world stories that introduce your next release.",
    image: "brand-content",
    kind: "approach",
    eyebrow: "PRODUCT LAUNCHES / OUR APPROACH",
    headline: "One launch. Many ways to experience it.",
    summary:
      "Bring a new product into the content people already watch. LGI connects creator selection, tailored briefs and publishing coordination around a clear launch plan.",
    tags: ["Product launches", "Creator content", "Coordinated publishing"],
    facts: [
      { label: "Focus", value: "New product introductions" },
      { label: "Formats", value: "Unboxings, reviews and everyday use" },
      { label: "Channels", value: "YouTube, Instagram and TikTok" },
      { label: "LGI role", value: "Strategy, creator matching and delivery" },
    ],
    metrics: [],
    challenge:
      "A launch needs a consistent product story across creators with different audiences, production styles and schedules. The task is to coordinate that shared moment while giving each creator room to explain the product in a way their audience understands.",
    approach: [
      {
        title: "Start with the product in use",
        text: "Identify the product benefits, audience and relevant use cases before choosing content formats or creators.",
      },
      {
        title: "Match the story to the creator",
        text: "Select creators whose interests, content style and audience suit the product, then tailor the brief to their point of view.",
      },
      {
        title: "Bring the launch schedule together",
        text: "Coordinate commercial terms, product information, content review and publishing dates within the agreed launch window.",
      },
      {
        title: "Follow through on delivery",
        text: "Track agreed deliverables and published content, then bring the project learnings into the next planning conversation.",
      },
    ],
    deliverables: [
      {
        title: "A creator and content plan",
        text: "A shortlist and content direction shaped around the product, target audience and launch objectives.",
      },
      {
        title: "Tailored creative briefs",
        text: "Clear product information with room for unboxings, hands-on reviews and relevant everyday scenarios.",
      },
      {
        title: "Coordinated publishing",
        text: "An agreed schedule covering content review, release timing and delivery follow-up.",
      },
    ],
    outcome:
      "The approach brings a shared launch message into a range of creator voices and use cases. The focus is a coordinated body of product content, with delivery reviewed against the scope agreed for the campaign.",
    cover: {
      kicker: "CAMPAIGN APPROACH",
      title: "The next\nrelease.",
      line: "Creator-led introductions, built around your next release.",
    },
  },
  {
    slug: "ifa-2026",
    audience: "Brands",
    category: "Offline",
    cardTitle: "Trade shows, brought to life",
    cardDescription:
      "Creator outreach, event coverage, and on-site execution for CES, IFA, and beyond.",
    image: "brand-local",
    kind: "project",
    eyebrow: "IFA 2026 / BERLIN",
    headline: "From the booth to a story people understand.",
    summary:
      "At IFA 2026, LGI supported Midea, Changhong and other technology brands with creator outreach, product experiences, on-site filming and publishing follow-up. A separate Berlin gathering brought brands and creators together in person.",
    tags: ["International trade shows", "European market", "Content co-creation"],
    facts: [
      { label: "Brands", value: "Midea, Changhong and other tech brands" },
      { label: "When", value: "September 2026" },
      { label: "Where", value: "Berlin, Germany" },
      { label: "LGI role", value: "Creator outreach and on-site coordination" },
    ],
    metrics: [
      {
        value: "Berlin",
        label: "Project city",
        note: "IFA creator activities and the brand–creator gathering took place in Berlin.",
      },
      {
        value: "30+",
        label: "Brands at the networking event",
        note: "Participants in the separate brand–creator gathering on September 5, 2026.",
      },
    ],
    challenge:
      "Technology at a busy exhibition can be difficult to explain beyond the booth. The project needed to turn product features and hands-on experiences into content relevant to consumer electronics and smart-home audiences, while coordinating creators throughout the show.",
    approach: [
      {
        title: "Find relevant technology voices",
        text: "Match creators with the product categories and topics on show, including consumer electronics, smart home and emerging technology.",
      },
      {
        title: "Create space for hands-on stories",
        text: "Organize booth visits, product demonstrations and filming opportunities so creators can experience the products before explaining them.",
      },
      {
        title: "Coordinate the full show journey",
        text: "Connect pre-show outreach and scheduling with on-site hosting, shoot coordination and post-show publishing follow-up.",
      },
      {
        title: "Bring brands and creators together",
        text: "Host face-to-face conversations about content style, audience fit and potential collaborations at the September 5 Berlin gathering.",
      },
    ],
    deliverables: [
      {
        title: "Product experiences at the booth",
        text: "Creator visits and filming around technology demonstrations and real product use.",
      },
      {
        title: "Creator-led exhibition content",
        text: "Product experiences, short-form video, livestreams and social sharing developed around the show.",
      },
      {
        title: "A brand–creator gathering",
        text: "A separate networking event in Berlin, giving participating brands and creators an opportunity to discuss their collaboration needs.",
      },
    ],
    outcome:
      "The work translated exhibition experiences into creator-led product content and social sharing. The Berlin gathering also gave brands and creators a setting to explore content direction and potential partnerships face to face.",
    measurementNote:
      "The 30+ figure refers only to brands participating in the September 5 networking event. It does not describe the number of brands served across the IFA campaign or a marketing performance result.",
    cover: {
      kicker: "IFA 2026 · BERLIN",
      title: "IFA\n2026",
      line: "Creator outreach, booth experiences and on-site coordination.",
    },
  },
  {
    slug: "ces-2026",
    audience: "Brands",
    category: "Online",
    cardTitle: "Content that starts a conversation",
    cardDescription:
      "Social campaigns shaped around the way people discover and share.",
    image: "brand-platforms",
    kind: "project",
    eyebrow: "CES 2026 / LAS VEGAS",
    headline: "93 tech creators. Stories beyond the show floor.",
    summary:
      "At CES 2026, LGI brought together 93 international technology creators and coordinated creator content with on-site execution. The projects produced 101 original pieces of content across YouTube, Instagram and TikTok.",
    tags: ["Tech creators", "Cross-platform content", "On-site execution"],
    facts: [
      { label: "Brands", value: "TCL, Hisense, Dreame and other tech brands" },
      { label: "When", value: "January 2026" },
      { label: "Where", value: "Las Vegas, United States" },
      { label: "Scope", value: "Combined CES projects across multiple brands" },
    ],
    metrics: [
      {
        value: "93",
        label: "Technology creators",
        note: "Participating creators reported across the combined CES projects.",
      },
      {
        value: "101",
        label: "Original content pieces",
        note: "Published content reported in the project recap.",
      },
      {
        value: "3",
        label: "Social platforms",
        note: "YouTube, Instagram and TikTok.",
      },
    ],
    challenge:
      "CES puts many products and competing stories into a short exhibition window. Each brand needed creators who could make its technology relevant, supported by coordinated access, filming and publishing across the event.",
    approach: [
      {
        title: "Build a layered creator lineup",
        text: "Connect technology brands with creators at different scales, including Unbox Therapy and JerryRigEverything, around suitable products and content angles.",
      },
      {
        title: "Plan beyond a single booth visit",
        text: "Shape the content journey around pre-show anticipation, booth tours, hands-on experiences, technical explanations and post-show publishing.",
      },
      {
        title: "Connect the plan to the show floor",
        text: "Coordinate booth scouting, creator introductions, shoot schedules and on-site changes throughout the exhibition.",
      },
      {
        title: "Manage content through publication",
        text: "Follow content communication, reviews, publishing checks and data collection across the agreed project timeline.",
      },
    ],
    deliverables: [
      {
        title: "A technology creator matrix",
        text: "A coordinated mix of creator voices for product discovery, hands-on reviews and technical storytelling.",
      },
      {
        title: "On-site product content",
        text: "Booth experiences, product demonstrations and creator filming supported by local event coordination.",
      },
      {
        title: "Cross-platform publishing",
        text: "Original content shared across YouTube, Instagram and TikTok, with publishing checks and project reporting.",
      },
    ],
    outcome:
      "Across the CES projects, 93 creators participated and 101 original content pieces were published. Their hands-on experiences presented technology products through different creator perspectives on three social platforms.",
    measurementNote:
      "These figures are combined totals for multiple brands, not the results of an individual brand campaign. The 101-piece total follows the project recap; the treatment of repeat cross-platform posts and the final reporting cutoff are not specified.",
    cover: {
      kicker: "CES 2026 · LAS VEGAS",
      title: "CES\n2026",
      line: "93 technology creators across a combined CES program.",
    },
  },
  {
    slug: "tcl-nfl-los-angeles",
    audience: "Brands",
    category: "Offline",
    cardTitle: "A moment worth showing up for",
    cardDescription:
      "Local creators at pop-ups, brand experiences, and launch events.",
    image: "service-events",
    kind: "project",
    eyebrow: "TCL × NFL / LOS ANGELES",
    headline: "Big screens meet football culture.",
    summary:
      "For TCL’s NFL new-season pop-up in Los Angeles, LGI connected creator strategy, talent outreach, content planning and local execution around football culture and the big-screen viewing experience.",
    tags: ["Sports marketing", "Brand activation", "U.S. local execution"],
    facts: [
      { label: "Client / event", value: "TCL · NFL new-season pop-up" },
      { label: "When", value: "September 12–13, 2026" },
      { label: "Where", value: "Westfield Century City, Los Angeles" },
      { label: "LGI role", value: "Creator strategy, local execution and delivery" },
    ],
    metrics: [
      {
        value: "2",
        label: "Days of live activation",
        note: "September 12–13, 2026.",
      },
      {
        value: "3",
        label: "Content platforms",
        note: "Instagram, TikTok and YouTube.",
      },
    ],
    challenge:
      "The event needed to connect TCL’s viewing experience with football culture and everyday life in Los Angeles. A shared brand theme also had to work naturally for creators with different sporting identities, cultural backgrounds and audiences.",
    approach: [
      {
        title: "Build around a familiar cultural moment",
        text: "Connect the new NFL season, Los Angeles and watching football together as the basis for creator selection and content direction.",
      },
      {
        title: "Bring different football perspectives together",
        text: "Coordinate participation from Antonio Gates, sports creator Deestroying, flag-football athlete Ashlea Klam and creators from different cultural backgrounds.",
      },
      {
        title: "Make the experience part of the story",
        text: "Tailor briefs around each creator’s identity and audience, with opportunities for fan interactions, viewing experiences and on-site recording.",
      },
      {
        title: "Support the day and the delivery",
        text: "Connect outreach and negotiations with local hosting, shoot coordination and post-event content delivery.",
      },
    ],
    deliverables: [
      {
        title: "Creator and talent coordination",
        text: "Outreach, commercial communication and on-site support for the participating sports and lifestyle voices.",
      },
      {
        title: "Live brand experiences",
        text: "Creator participation around big-screen viewing, fan interactions and the event’s football theme.",
      },
      {
        title: "Content beyond the event",
        text: "Pre-event content, creator coverage, official video and event edits extending the two-day experience onto social platforms.",
      },
    ],
    outcome:
      "The pop-up connected an in-person viewing experience with creator coverage and brand video. Pre-event stories, on-site content and event edits carried the two-day activation across multiple social platforms.",
    measurementNote:
      "The figures describe the event duration and content platforms. No verified attendance, view or engagement totals are stated for this project.",
    cover: {
      kicker: "TCL × NFL · LOS ANGELES",
      title: "TCL × NFL",
      line: "Two days of viewing experiences, creator coverage and local execution.",
    },
  },
  {
    slug: "long-term-brand-partnerships",
    audience: "Brands",
    category: "Online",
    cardTitle: "Partnerships with staying power",
    cardDescription:
      "Ongoing creator relationships that grow with your brand.",
    image: "creator-growth",
    kind: "approach",
    eyebrow: "LONG-TERM PARTNERSHIPS / OUR APPROACH",
    headline: "Build on the work. Keep the right connections.",
    summary:
      "A continuing creator program needs a clear brand direction and enough flexibility for different markets. LGI connects strategy, creator relationships, local content and delivery across successive projects.",
    tags: ["Long-term partnerships", "Local content", "Multi-market coordination"],
    facts: [
      { label: "Focus", value: "Ongoing creator partnerships" },
      { label: "Planning", value: "Brand direction and market relevance" },
      { label: "Content", value: "Product experiences and everyday use" },
      { label: "LGI role", value: "Strategy through delivery and project recap" },
    ],
    metrics: [],
    challenge:
      "A consistent brand message can take different forms in different markets. Ongoing work needs to respect local language, habits and content preferences while keeping creator selection, commercial coordination and delivery connected over time.",
    approach: [
      {
        title: "Plan around each market",
        text: "Use the local content environment and audience priorities to shape creator profiles, product messages and campaign direction.",
      },
      {
        title: "Choose relationships with a clear fit",
        text: "Match creators to the product and audience, from technology explanations to home and lifestyle experiences.",
      },
      {
        title: "Connect shared direction with local execution",
        text: "Coordinate matching, commercial discussions, content planning and delivery while allowing the expression to suit each market.",
      },
      {
        title: "Carry the learning forward",
        text: "Review creator performance, content feedback and execution experience to inform the next stage of planning.",
      },
    ],
    deliverables: [
      {
        title: "A continuing content direction",
        text: "Brand priorities translated into relevant creator and content plans for each stage of the program.",
      },
      {
        title: "Creator relationship management",
        text: "Support for creator selection, cooperation terms, content communication and delivery across projects.",
      },
      {
        title: "Project learning for the next brief",
        text: "Recaps that bring audience feedback and delivery experience into future creator choices and content decisions.",
      },
    ],
    outcome:
      "The purpose is continuity: a shared brand direction, creator relationships that fit the work and a clearer basis for the next campaign. Each project contributes experience that can shape later content planning and local execution.",
    cover: {
      kicker: "PARTNERSHIP APPROACH",
      title: "Better,\ntogether.",
      line: "Market by market. Project by project. A shared direction.",
    },
  },
  {
    slug: "brand-creator-experiences",
    audience: "Brands",
    category: "Offline",
    cardTitle: "From a shared idea to a shared stage",
    cardDescription:
      "Creative collaboration that moves from the feed into the real world.",
    image: "service-partnerships",
    kind: "approach",
    eyebrow: "BRAND–CREATOR EXPERIENCES / OUR APPROACH",
    headline: "A shared setting. A more useful conversation.",
    summary:
      "Bring brands and local creators together around products they can experience. LGI connects product demonstrations, hands-on content and face-to-face conversations within a relevant real-world setting.",
    tags: ["Local experiences", "Brand–creator dialogue", "Content co-creation"],
    facts: [
      { label: "Focus", value: "In-person brand and creator experiences" },
      { label: "Format", value: "Demonstrations, product trials and conversation" },
      { label: "Content", value: "Creator-led on-site filming" },
      { label: "LGI role", value: "Creator matching and event coordination" },
    ],
    metrics: [],
    challenge:
      "An event has to offer creators a reason to attend and a product experience worth talking about. Bringing different brands and content styles into one setting also calls for a clear format, useful hands-on time and space for meaningful conversations.",
    approach: [
      {
        title: "Start with a setting people recognize",
        text: "Build the event around a relevant shared theme, such as home life, so product experiences relate to the local audience’s routines and interests.",
      },
      {
        title: "Match products and local perspectives",
        text: "Bring together brands and creators whose product interests, audiences and content styles make the interaction relevant.",
      },
      {
        title: "Move from demonstration to experience",
        text: "Connect product presentations with hands-on trials and filming opportunities, allowing creators to explore their own content angles.",
      },
      {
        title: "Make room for the next conversation",
        text: "Create time for brands and creators to discuss product feedback, creative direction and potential cooperation face to face.",
      },
    ],
    deliverables: [
      {
        title: "A relevant experience format",
        text: "An event flow that connects the product setting, brand demonstrations and creator participation.",
      },
      {
        title: "Hands-on content opportunities",
        text: "Time and coordination for creators to experience products and film content in a real-world setting.",
      },
      {
        title: "Direct brand–creator dialogue",
        text: "A setting for conversations about audience fit, content ideas and possible future collaboration.",
      },
    ],
    outcome:
      "The approach puts product understanding and human connection into the same experience. It gives creators material for relevant content while allowing brands to hear feedback and explore whether there is a fit for further collaboration.",
    cover: {
      kicker: "EXPERIENCE APPROACH",
      title: "Meet.\nMake.\nConnect.",
      line: "Products to try. Stories to make. People to connect.",
    },
  },
  {
    slug: "brand-deals-for-creators",
    audience: "Creators",
    category: "Online",
    cardTitle: "Brand deals that fit your world",
    cardDescription:
      "Connect with global brands that share your interests and respect your audience.",
    image: "creator-opportunities",
    kind: "approach",
    eyebrow: "CREATOR SUPPORT / BRAND PARTNERSHIPS",
    headline: "The right opportunity starts with your point of view.",
    summary:
      "Your content, audience and style shape the partnership. LGI helps connect those strengths with relevant brand opportunities and supports the commercial details behind the work.",
    tags: ["Brand matching", "Commercial support", "Creative collaboration"],
    facts: [
      { label: "For", value: "Creators exploring brand collaborations" },
      { label: "Starting point", value: "Content, personal style and audience fit" },
      { label: "Support", value: "Rates, rights, contracts and project coordination" },
      { label: "Creative focus", value: "A clear brief and your own expression" },
    ],
    metrics: [],
    challenge:
      "A brand opportunity has to make sense for the creator and the audience. Alongside the creative idea, details such as rates, usage rights, exclusivity, deadlines and revisions need to be understood before the content can move forward.",
    approach: [
      {
        title: "Understand your content and audience",
        text: "Look at your niche, personal style, audience and past collaborations to understand what a relevant brand opportunity could look like.",
      },
      {
        title: "Match the opportunity to the fit",
        text: "Connect brand requirements with the creator’s interests and content strengths instead of treating every opportunity as interchangeable.",
      },
      {
        title: "Clarify the commercial details",
        text: "Support discussions around rates, scheduling, deliverables, usage rights, exclusivity and the scope of revisions.",
      },
      {
        title: "Keep the work moving",
        text: "Help translate brand needs into a clear creative brief, coordinate project milestones and follow payment and delivery requirements.",
      },
    ],
    deliverables: [
      {
        title: "Relevant brand introductions",
        text: "Opportunities considered against your content, style and audience rather than follower count alone.",
      },
      {
        title: "Clear cooperation terms",
        text: "Commercial support covering the agreed deliverables, schedule, content usage and other practical requirements.",
      },
      {
        title: "Project and creative coordination",
        text: "Support from brief communication and content milestones through delivery and payment follow-up.",
      },
    ],
    outcome:
      "The aim is a partnership with a clear creative fit and understandable commercial terms. With the project details coordinated, creators have a clearer basis for deciding on opportunities and focusing on the work they want to make.",
    cover: {
      kicker: "CREATOR SUPPORT",
      title: "Your voice.\nThe right fit.",
      line: "Partnerships built around content, audience and creative fit.",
    },
  },
  {
    slug: "creator-events-and-experiences",
    audience: "Creators",
    category: "Offline",
    cardTitle: "Beyond the feed",
    cardDescription:
      "Meet brands in person through events, experiences, and creative collaborations.",
    image: "creator-looking-for",
    kind: "approach",
    eyebrow: "CREATOR SUPPORT / LIVE EXPERIENCES",
    headline: "Bring your perspective into the experience.",
    summary:
      "Brand events can offer creators new ways to experience products and tell stories. LGI supports the practical coordination around the opportunity, from schedules and on-site communication to content expectations.",
    tags: ["Brand experiences", "Event invitations", "On-site support"],
    facts: [
      { label: "For", value: "Creators exploring in-person opportunities" },
      { label: "Formats", value: "Events, product experiences and co-creation" },
      { label: "Support", value: "Scheduling, on-site communication and delivery" },
      { label: "Creative focus", value: "Your own perspective on the experience" },
    ],
    metrics: [],
    challenge:
      "A live collaboration involves more than attending an event. Schedules, access, filming requirements and content delivery need to work together, while the experience itself should remain relevant to the creator’s interests and audience.",
    approach: [
      {
        title: "Find a relevant live opportunity",
        text: "Consider events and product experiences that connect with the creator’s subject matter, audience and commercial direction.",
      },
      {
        title: "Set expectations before arrival",
        text: "Clarify the schedule, collaboration requirements, content deliverables and usage terms before the experience begins.",
      },
      {
        title: "Connect the people on the ground",
        text: "Coordinate communication with the brand and event team so creators understand where to be and what filming opportunities are available.",
      },
      {
        title: "Follow the content through delivery",
        text: "Support project communication after the event, keeping agreed content and publishing requirements connected to the original brief.",
      },
    ],
    deliverables: [
      {
        title: "Opportunity and event coordination",
        text: "A relevant introduction supported by the schedule and cooperation details needed to take part.",
      },
      {
        title: "On-site communication",
        text: "Coordination around the event, product experiences and filming requirements.",
      },
      {
        title: "Content delivery support",
        text: "Continued project communication around the agreed content, reviews and publishing arrangements.",
      },
    ],
    outcome:
      "The aim is to let creators engage with the experience and find their own story while practical requirements stay coordinated. A relevant event can also create space to get to know brands and discuss possible future work in person.",
    cover: {
      kicker: "CREATOR SUPPORT",
      title: "Beyond\nthe feed.",
      line: "Live experiences with the practical support to take part.",
    },
  },
  {
    slug: "long-term-creator-growth",
    audience: "Creators",
    category: "Online",
    cardTitle: "Space to build what comes next",
    cardDescription:
      "Explore repeat partnerships and long-term commercial opportunities with a dedicated team.",
    image: "creator-growth",
    kind: "approach",
    eyebrow: "CREATOR SUPPORT / LONG-TERM PLANNING",
    headline: "Make room for the next chapter of your work.",
    summary:
      "Commercial direction can develop alongside your content. LGI helps creators explore ongoing partnerships, representation opportunities and the project support needed to keep creating.",
    tags: ["Long-term planning", "Ongoing partnerships", "Business support"],
    facts: [
      { label: "For", value: "Creators planning their commercial direction" },
      { label: "Opportunities", value: "Repeat work, ambassadorships and events" },
      { label: "Support", value: "Partnership planning and project coordination" },
      { label: "Starting point", value: "Your content, audience and growth goals" },
    ],
    metrics: [],
    challenge:
      "Individual projects can fill the calendar without making the longer-term direction clear. Creators need a way to consider new opportunities alongside existing commitments, creative priorities and the commercial details that make collaboration workable.",
    approach: [
      {
        title: "Understand where you want to go",
        text: "Review content strengths, audience, past brand work and future goals as a starting point for the commercial conversation.",
      },
      {
        title: "Explore opportunities beyond one brief",
        text: "Consider ongoing brand relationships, ambassadorships, event invitations and other relevant ways to develop the creator’s business.",
      },
      {
        title: "Coordinate the work behind the content",
        text: "Support negotiations, contracts, project milestones and payment follow-up so each collaboration has a clear practical foundation.",
      },
      {
        title: "Keep future choices connected",
        text: "Use the creator’s evolving priorities and collaboration experience to inform conversations about what comes next.",
      },
    ],
    deliverables: [
      {
        title: "A commercial direction conversation",
        text: "A review of the creator’s content, audience and goals to inform relevant brand and representation opportunities.",
      },
      {
        title: "Ongoing opportunity exploration",
        text: "Support in considering repeat partnerships, longer-term brand roles and event opportunities that fit the creator’s direction.",
      },
      {
        title: "Business and project support",
        text: "Coordination around commercial terms, contracts, delivery and payment requirements across collaborations.",
      },
    ],
    outcome:
      "The purpose is a more considered commercial path, with opportunities assessed against the creator’s goals and content. Long-term work starts with fit and clear communication, then develops through the collaborations both sides choose to pursue.",
    cover: {
      kicker: "CREATOR SUPPORT",
      title: "Your next\nchapter.",
      line: "Commercial opportunities considered around your own direction.",
    },
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
