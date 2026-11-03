export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  intro?: string;
  role?: string;
  description?: string;
  year?: string;
  tools: string[];
  skills: string[];
  coverImage: string;
  images: string[];
  overlayImage?: string;
  sections?: {
    title: string;
    content: string;
    images?: string[];
    nameTag?: string;
    badges?: string[];
    videos?: { src: string; thumbnail?: string }[];
    videographerCredit?: string;
    pdf?: {
      src: string;
      title?: string;
      disclaimer?: string;
    };
    columns?: {
      header: string;
      images: string[];
    }[];
    isCompactText?: boolean;
    stacked?: boolean;
    padding?: string;
    overlap?: { background: string; overlay: string };
    afterOverlap?: string[];
    firstRow?: string;
    secondRow?: string[];
    isStatsBox?: boolean;
  }[];
}

export const projects: Project[] = [
  {
    slug: "fulcrumroasters",
    title: "Fulcrum Brand Identity System",
    subtitle: "Fulcrum Coffee Roasters",
    intro:
      "Fulcrum Coffee Roasters is a Seattle-based coffee roaster, wholesaler, and retailer focusing on sustainable farming practices and community connection.",
    role: "Visual Designer and Marketing Assistant",
    description: "Branding, Visual Design",
    year: "2024-2026",
    tools: [
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Adobe Lightroom Classic",
      "Klavyio",
      "Branding",
      "Photography",
      "Video editing",
      "Script writing",
      "Graphic design",
    ],
    skills: [],
    coverImage: "/ezgif-optimized.gif",
    images: [],
    sections: [
      {
        title: "",
        content: "",
        images: ["/projects/fulcrum/email/mockup.png"],
      },
      {
        title: "Problem:",
        content:
          'Fulcrum Coffee Roasters is the parent brand over three distinct product lines: Silver Cup, Urban City, and Fulcrum Coffee (Origin). But the parent brand had little presence of its own. Media presence and materials leaned on the product brands, particularly Fulcrum Coffee (Origin), instead of the parent identity.',
        images: ["/projects/fulcrum/brand-guide.png", "/projects/fulcrum/old-instagram-feed.png"],
      },
      {
        title: "Solution:",
        content:
          'I led a full brand refresh for Fulcrum Coffee Roasters, building a distinct parent-brand identity (the "F" monogram system, typography, and color palette) applied consistently across Instagram, email, signage, apparel, and packaging. I designed the Instagram highlights architecture (Seasonal, Fulcrum Café, Our Brands, Learn More) so the parent brand anchored the account while each product brand kept its own distinct presence within that system.',
        images: ["/projects/fulcrum/fcr-brand-guide.png", "/projects/fulcrum/new-instagram-feed.png"],
      },
      {
        title: "Social Media",
        content:
          "Fulcrum's Instagram page had high quality photos but lacked a consistent brand identity for its audience to resonate with. With the Marketing Director, I brainstormed ways to make more valuable and engaging content that educates our audience about our company. The posts had low engagement although the account was active and posted frequently. I redesigned our highlights and incorporated more graphic design/text based work to capture viewers' attention. We grew our Instagram following by 2.8k followers in 18 months and maintained above average engagement rates (49% compared to other food industry accounts at 6.4%).",
        images: [],
      },
      {
        title: "",
        content: "",
        columns: [
          {
            header: "SEASONAL",
            images: ["/projects/fulcrum/drinks-blue.png"],
          },
          {
            header: "OUR BRANDS",
            images: ["/projects/fulcrum/brands-2.png"],
          },
          {
            header: "LEARN MORE",
            images: ["/projects/fulcrum/learn-more.png"],
          },
        ],
      },
      {
        title: "",
        content: "",
        images: ["/projects/fulcrum/fallmenu.gif", "/projects/fulcrum/brands.gif", "/projects/fulcrum/learn-more.gif"],
      },
      {
        title: "Single Origin Coffee Educational Series",
        content: "",
        images: [],
        videos: [
          { src: "/videos/fulcrum/Colombia Reel V1.mp4", thumbnail: "/videos/fulcrum/Colombia Reel Thumbnail.png" },
          { src: "/videos/fulcrum/El Salvador Reel Final.mp4", thumbnail: "/videos/fulcrum/El Salvador Thumbnail.png" },
          { src: "/videos/fulcrum/Reel 5 - Sustaining Community.mp4", thumbnail: "/videos/fulcrum/Sustaining Community Thumbnail.png" },
          { src: "/videos/fulcrum/HeritageReel4_Final.mp4", thumbnail: "/videos/fulcrum/Heritage Thumbnail.png" },
          { src: "/videos/fulcrum/francisca-reel-2-v2.mp4", thumbnail: "/videos/fulcrum/Francisca Reel Thumbnail.png" },
        ],
        videographerCredit: "Videographer: Dan Taylor",
      },
      {
        title: "",
        content:
          "Supporting the rollout, I jumpstarted the creation of two original Instagram Reels series spotlighting wholesale café partners across WA and profiling single-origin coffee farmers, extending the new brand voice into video. I recorded, edited, wrote, and produced scripts from live subject interviews and led the visual storytelling.",
        images: [],
      },
      {
        title: "Small Business Highlight Reels",
        content: "",
        images: [],
        videos: [
          { src: "/videos/fulcrum/FrenchGuysReelCC.mp4", thumbnail: "/videos/fulcrum/French Guys Thumbnail.jpg" },
          { src: "/videos/fulcrum/70 and Sunny Reel.mp4", thumbnail: "/videos/fulcrum/70 and Sunny Thumbnail.JPG" },
          { src: "/videos/fulcrum/Coffee Tab Reel RESYNCED White Subtitles.mp4", thumbnail: "/videos/fulcrum/Coffee Tab Thumbnail New.jpg" },
          { src: "/videos/fulcrum/Friend Museum Reel Synced.mp4", thumbnail: "/videos/fulcrum/Friend Museum Thumbnail.jpg" },
          { src: "/videos/fulcrum/Bonito Reel Final Synced.mp4", thumbnail: "/videos/fulcrum/Bonito Thumbnail.JPEG" },
          { src: "/videos/fulcrum/Indi Chocolate Reel.mp4", thumbnail: "/videos/fulcrum/Indi Chocolate Thumbnail.jpg" },
        ],
      },
      {
        title: "Barista Training Manual Redesign",
        content: "",
        images: ["/projects/fulcrum/barista-thumbnail.png"],
      },
      {
        title: "",
        content:
          "The branding in the previous version of the Barista Handbook leaned on the visual identity of one the product brands, 'Fulcrum Coffee,' whereas the updated book better reflects the branding of the parent brand 'Fulcrum Coffee Roasters.' While Fulcrum Coffee's branding has a more geometric design style with blue tones, Fulcrum Coffee Roasters has a brown & gray color palette with minimalistic & modern design elements.\n\nThe layout of the book spreads were improved to support the ease of use for baristas. Text and relevant graphic elements were display on the same spreads to make it easier to follow along. In the previous version of the handbook, diagrams and text were separated, requiring the user to flip back-and-forth to connect information. Making sure those elements are seen together helps the reader navigate and understand ideas better throughout the book; some examples are the machine and dose diagrams, and the drink glossary.",
        images: [],
        isCompactText: true,
      },
      {
        title: "",
        content: "",
        pdf: {
          src: "/barista-old.pdf",
          title: "Old Version Barista Fundamentals",
        },
      },
      {
        title: "",
        content: "",
        pdf: {
          src: "/barista-new.pdf",
          title: "Barista Fundamentals 2026 Redesign",
          disclaimer: "*Select blank pages omitted, page numbers do not accurately reflect print ready version",
        },
      },
      {
        title: "Merchandise",
        content: "",
        stacked: true,
        padding: "pl-16 md:pl-24 pr-16 md:pr-24",
        images: [
          "/projects/fulcrum/merch/brian-alfred-tote-mockup.png",
          "/projects/fulcrum/merch/tote-gif.gif",
          "/projects/fulcrum/merch/sticker-sheet-master.png",
          "/projects/fulcrum/merch/phone-with-3d-stickers-mockup.png",
          "/projects/fulcrum/merch/sticker-sheet-mockup.png",
          "/projects/fulcrum/merch/winter-roast-label.png",
          "/projects/fulcrum/merch/holiday-blend-email.png",
          "/projects/fulcrum/merch/valentines-day-card.gif",
          "/projects/fulcrum/merch/packing-label.jpg",
          "/projects/fulcrum/merch/cyber-monday.jpg",
          "/projects/fulcrum/merch/world-cup-sticker-sheet.png",
          "/projects/fulcrum/merch/world-cup-specials-reel.mp4",
        ],
        overlap: {
          background: "/projects/fulcrum/merch/tote-mockup.png",
          overlay: "/projects/fulcrum/merch/black-tote2.png",
        },
        afterOverlap: [
          "/projects/fulcrum/merch/photoshoppped-box.jpg",
        ],
      },
      {
        title: "Newsletter for B2B and B2C Communications",
        content:
          "We noticed that some of our wholesale customers had trouble navigating our newly remodeled website so I created instructional graphics to teach them to to start online orders. I also expanded on some of the services we provide, such as equipment maintenance and barista training to help customers access the resources available to them.\n\nTo enhance communications with retail customers, I created a Welcome email flow. I planned a 3-part flow series to introduce who we are, dive into our range of coffees, highlight our subscription program, and promote our blog.",
        firstRow: "/projects/fulcrum/merch/welcome-email-mockup.png",
        secondRow: [
          "/projects/fulcrum/flow1.gif",
          "/projects/fulcrum/flow2.gif",
          "/projects/fulcrum/flow3.gif"
        ],
      },
    ],
  },
  {
    slug: "14thseattleaaff",
    title: "14th Annual Seattle Asian American Film Festival",
    subtitle: "Seattle Asian American Film Festival",
    intro:
      "The 14th annual festival was the first with a fully staffed design team, and I was its first Art Director. The design team brainstormed a theme around interconnectedness in the Asian diaspora and the overlapping identities across Asian cultures, then built a shared moodboard around it. I built the style guide and managed the workback schedule, creative direction, and guidelines for each assignment, so seven designers could produce one consistent look.",
    role: "Art Director\n\nTeam: Joanna Chou, Mia Van Inwegen, Lena Schiffler, Vinaayak Selvamuthu, Kerensa Suzara, Ian Teodoro, Jolin Tran",
    description:
      "Art Direction, Graphic Design, Photography",
    year: "2025-2026",
    tools: [
      "Adobe Illustrator",
      "Adobe Photoshop",
      "InDesign",
      "Art Direction",
      "Graphic Design",
      "Print",
    ],
    skills: [],
    coverImage: "/saaff2026.gif",
    images: [],
    sections: [
      {
        title: "Style Guide",
        content:
          "I formalized our festival theme into a full brand guide covering color, typography, and image treatment, then pitched the concept to festival leadership and led a team of 7 designers in applying it across the full range of festival touchpoints.",
        images: [
          "/projects/14th-saaaff/style-guide/page-1.png",
          "/projects/14th-saaaff/style-guide/page-4.png",
          "/projects/14th-saaaff/style-guide/page-2.png",
          "/projects/14th-saaaff/style-guide/page-3.png",
        ],
      },
      {
        title: "Program Book",
        content: "",
        images: ["/projects/14th-saaaff/program/flip.gif"],
      },
      {
        title: "Merchandise",
        content: "",
        images: ["/projects/14th-saaaff/merch/shirt.gif"],
      },
      {
        title: "",
        content: "",
        nameTag: "/projects/14th-saaaff/merch/name-tag.png",
        images: [
          "/projects/14th-saaaff/merch/sticker-red.png",
          "/projects/14th-saaaff/merch/sticker-blue.png",
          "/projects/14th-saaaff/merch/sticker-green.png",
        ],
        badges: [
          "/projects/14th-saaaff/merch/badges/tadashi-nakamura.png",
          "/projects/14th-saaaff/merch/badges/ie-saaff-badge.png",
          "/projects/14th-saaaff/merch/badges/apicat-saaff-badge.png",
          "/projects/14th-saaaff/merch/badges/viper-fengz.png",
        ],
      },
      {
        title: "",
        content: "",
        images: ["/projects/14th-saaaff/merch/tote-black.png", "/projects/14th-saaaff/merch/tote-red.png"],
      },
      {
        title: "Feature on The International Examiner",
        content: "",
        images: ["/projects/14th-saaaff/ie-photo.png"],
      },
      {
        title: "",
        content: "",
        images: ["/projects/14th-saaaff/ie2026.gif"],
      },
    ],
  },
  {
    slug: "dp5",
    title: "Disposable Parts 5th Edition",
    subtitle: "Disposable Parts Magazine",
    intro:
      'Disposable Parts built its 5th edition around "Digital Natives," an early-2000s internet aesthetic exploring how a generation grew up online.',
    role: "Graphic Designer",
    description:
      "Graphic Design",
    year: "2026",
    tools: [
      "Adobe Illustrator",
      "Adobe InDesign",
      "Graphic Design",
      "Print",
    ],
    skills: [],
    coverImage: "/projects/dp5/cover.png",
    images: [],
    overlayImage: "/projects/dp5/digital-natives.webp",
    sections: [
      {
        title: "",
        content:
          "Working from the set moodboard and typography system, I designed 6 spreads that each carried the early-2000s internet reference points (interface chrome, period-specific type treatments, low-fi digital textures) while staying visually consistent with the rest of the issue. Designs went through multiple rounds of editorial critique, and I revised based on that feedback rather than treating a first draft as final.",
      },
      {
        title: "Moodboard",
        content: "",
        images: ["/projects/dp5/moodboard.webp"],
      },
      {
        title: "Magazine Spreads",
        content: "",
        images: ["/projects/dp5/mockup-3.png"],
      },
      {
        title: "",
        content: "",
        images: ["/projects/dp5/mockup-4.png"],
      },
      {
        title: "",
        content: "",
        images: ["/projects/dp5/mockup-5.png"],
      },
    ],
  },
  {
    slug: "seattleaaff",
    title: "13th Annual Seattle Asian American Film Festival",
    subtitle: "Seattle Asian American Film Festival",
    intro:
      "Led art direction for 13th annual film festival - playing on nostalgic themes and the hype of plushies from surprise boxes. Created all social media and print graphics.\n\nIllustrations by Felix Tran/@softvelvetboy",
    role: "Art Director",
    description:
      "13th Annual Film Festival",
    year: "2023",
    tools: [
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Art Direction",
      "Graphic Design",
      "Print",
    ],
    skills: [],
    coverImage: "/saff-2025-popcorn.gif",
    images: [],
    sections: [
      {
        title: "Moodboard",
        content: "",
        images: ["/projects/13th-saaaff/moodboard.png"],
      },
      {
        title: "Print",
        content: "",
        images: [
          "/projects/13th-saaaff/print/mockup.png",
          "/projects/13th-saaaff/print/pocket-design.gif"
        ],
      },
      {
        title: "",
        content: "",
        images: ["/projects/13th-saaaff/print/on-prints.png", "/projects/13th-saaaff/print/badge-mockup.png"],
      },
      {
        title: "Social",
        content: "",
        images: ["/projects/13th-saaaff/social/instagram-mockup.png"],
      },
      {
        title: "",
        content: "",
        images: [
          "/projects/13th-saaaff/social/save-the-date.png",
          "/projects/13th-saaaff/social/call-for-films.jpg",
          "/projects/13th-saaaff/social/how2fest.png",
          "/projects/13th-saaaff/social/ticketing.png",
          "/projects/13th-saaaff/social/virtfest.png",
          "/projects/13th-saaaff/social/queer-af-shorts.png",
        ],
      },
    ],
  },
  {
    slug: "c-id-summer-cinema",
    title: "C-ID Summer Cinema",
    subtitle: "Chinatown-International District Outdoor Summer Cinema",
    intro:
      "In 2024, I created the poster design and social media assets for the annual Summer Cinema series presented by the Seattle Asian American Film Festival, partnered with Seattle Parks and Recreation.",
    role: "Graphic Designer",
    description:
      "Art Direction, Graphic Design",
    year: "2024",
    tools: [
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Adobe Lightroom Classic",
      "Illustration",
      "Graphic Design",
      "Print",
    ],
    skills: [],
    coverImage: "/projects/cid-cinema/cover.png",
    images: [],
    sections: [
      {
        title: "",
        content:
          "Inspired by Hing Hay Park, a beloved gathering space in the Chinatown-International District of Seattle. I illustrated a pagoda and built the palette around retro shapes and pastel, sunset-toned colors to keep the tone warm and inviting rather than purely promotional.",
      },
      {
        title: "Mood Board",
        content: "",
        images: ["/projects/cid-cinema/mood-board.webp"],
      },
      {
        title: "",
        content:
          "The Summer Cinema series needed to draw more people to a free outdoor event in the Chinatown-International District (the C-ID), Seattle's historic Chinatown neighborhood. The design had to feel fun and welcoming enough to pull people into the neighborhood itself, with the hope that attendees would also support local Chinatown businesses while they were there.",
      },
      {
        title: "",
        content: "",
        images: ["/projects/cid-cinema/poster-watermark.webp"],
      },
      {
        title: "",
        content: "",
        images: ["/projects/cid-cinema/social-post.webp"],
      },
      {
        title: "",
        content: "",
        images: ["/projects/cid-cinema/instagram-mockup.jpg"],
      },
      {
        title: "",
        content: "",
        images: ["/projects/cid-cinema/summer-cinema-mockup.jpg"],
      },
      {
        title: "",
        content: "Poster design ranked among the festival's top 5 most-engaged Instagram posts, Spring 2024 through Fall 2025.",
        isStatsBox: true,
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectIndex(slug: string): number {
  return projects.findIndex((p) => p.slug === slug);
}
