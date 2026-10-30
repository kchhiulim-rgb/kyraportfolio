export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  tools: string[];
  skills: string[];
  coverImage: string;
  images: string[];
  sections?: {
    title: string;
    content: string;
    images?: string[];
    pdf?: {
      src: string;
      title?: string;
    };
  }[];
}

export const projects: Project[] = [
  {
    slug: "fulcrumroasters",
    title: "Fulcrum Brand Identity System",
    subtitle: "Fulcrum Coffee Roasters",
    description:
      "Branding, Visual Design",
    tools: [
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Adobe Lightroom Classic",
      "Klaviyo",
      "Branding",
      "Photography",
      "Video editing",
      "Script writing",
      "Graphic design",
    ],
    skills: [],
    coverImage: "/projects/fulcrum/cover.png",
    images: [],
    sections: [
      {
        title: "Problem:",
        content:
          '"Fulcrum Coffee Roasters is the parent brand over three distinct product lines: Silver Cup, Urban City, and Fulcrum Coffee (Origin). But the parent brand had little presence of its own. Media presence and materials leaned on the product brands, particularly Fulcrum Coffee (Origin), instead of the parent identity."',
      },
      {
        title: "Solution:",
        content:
          'I led a full brand refresh for Fulcrum Coffee Roasters, building a distinct parent-brand identity (the "F" monogram system, typography, and color palette) applied consistently across Instagram, email, signage, apparel, and packaging. I designed the Instagram highlights architecture (Seasonal, Fulcrum Café, Our Brands, Learn More) so the parent brand anchored the account while each product brand kept its own distinct presence within that system.',
      },
      {
        title: "Brand Guide",
        content: "",
        pdf: {
          src: "/projects/fulcrum/brand-guide.pdf",
          title: "Updated Brand Guide",
        },
      },
      {
        title: "Instagram Feed",
        content: "",
        images: ["/projects/fulcrum/instagram-feed.png"],
      },
      {
        title: "SEASONAL",
        content: "",
        images: ["/projects/fulcrum/highlights/seasonal.png"],
      },
      {
        title: "OUR BRANDS",
        content: "",
        images: ["/projects/fulcrum/highlights/brands.png"],
      },
      {
        title: "FULCRUM CAFÉ",
        content: "",
        images: ["/projects/fulcrum/highlights/cafe.png"],
      },
      {
        title: "LEARN MORE",
        content: "",
        images: ["/projects/fulcrum/highlights/learnmore.png"],
      },
      {
        title: "Single Origin Coffee Educational Series",
        content: "",
      },
      {
        title: "",
        content:
          "Supporting the rollout, I jumpstarted the creation of two original Instagram Reels series spotlighting wholesale café partners across WA and profiling single-origin coffee farmers, extending the new brand voice into video. I wrote and produced scripts from live subject interviews and led the visual storytelling through the final edit.",
      },
      {
        title: "Small Business Highlight Reels",
        content: "",
      },
      {
        title: "Barista Training Manual Redesign",
        content:
          "The branding in the previous version of the Barista Handbook leaned on the visual identity of one the product brands, 'Fulcrum Coffee,' whereas the updated book better reflects the branding of the parent brand 'Fulcrum Coffee Roasters.' While Fulcrum Coffee's branding has a more geometric design style with blue tones, Fulcrum Coffee Roasters has a brown & gray color palette with minimalistic & modern design elements.",
        images: ["/projects/fulcrum/barista/cover-design.png", "/projects/fulcrum/barista/mockup.png"],
      },
      {
        title: "",
        content:
          "The layout of the book spreads were improved to support the ease of use for baristas. Text and relevant graphic elements were display on the same spreads to make it easier to follow along. In the previous version of the handbook, diagrams and text were separated, requiring the user to flip back-and-forth to connect information. Making sure those elements are seen together helps the reader navigate and understand ideas better throughout the book; some examples are the machine and dose diagrams, and the drink glossary.",
        images: ["/projects/fulcrum/barista/page-toc.jpg", "/projects/fulcrum/barista/page-tamping.jpg", "/projects/fulcrum/barista/page-extraction.jpg"],
      },
      {
        title: "Full Manual",
        content: "",
        pdf: {
          src: "/projects/fulcrum/barista-fundamentals.pdf",
          title: "Barista Fundamentals Manual",
        },
      },
      {
        title: "Newsletter for Business to Consumer Communications",
        content:
          "To enhance communications with retail customers, I created a Welcome email flow. I planned a 3-part flow series to introduce who we are, dive into our range of coffees, highlight our subscription program, and promote our blog.",
        images: ["/projects/fulcrum/email/mockup.png"],
      },
      {
        title: "Email Templates",
        content: "",
        images: ["/projects/fulcrum/email/welcome.jpg", "/projects/fulcrum/email/subscription.jpg", "/projects/fulcrum/email/top-brews.jpg"],
      },
      {
        title: "Product Photography",
        content: "",
        images: ["/projects/fulcrum/photoshoot/01.jpg", "/projects/fulcrum/photoshoot/02.jpg", "/projects/fulcrum/photoshoot/03.jpg", "/projects/fulcrum/photoshoot/04.jpg", "/projects/fulcrum/photoshoot/05.jpg", "/projects/fulcrum/photoshoot/06.jpg"],
      },
      {
        title: "Merchandise & Packaging",
        content: "",
        images: ["/projects/fulcrum/merch/tote.png", "/projects/fulcrum/merch/postcard-01.png", "/projects/fulcrum/merch/postcard-04.png", "/projects/fulcrum/merch/holiday-card.png"],
      },
    ],
  },
  {
    slug: "14thseattleaaff",
    title: "14th Annual SAAFF",
    subtitle: "Seattle Asian American Film Festival",
    description:
      "Art Direction, Graphic Design, Photography",
    tools: [
      "Adobe Illustrator",
      "Adobe Photoshop",
      "InDesign",
      "Art Direction",
      "Graphic Design",
      "Print",
    ],
    skills: [],
    coverImage: "/projects/14th-saaaff/cover.png",
    images: [],
    sections: [
      {
        title: "",
        content:
          "The 14th annual festival was the first with a fully staffed design team, and I was its first Art Director. The design team brainstormed a theme around interconnectedness in the Asian diaspora and the overlapping identities across Asian cultures, then built a shared moodboard around it. I built the style guide and managed the workback schedule, creative direction, and guidelines for each assignment, so seven designers could produce one consistent look.",
      },
      {
        title: "",
        content:
          "I formalized our festival theme into a full brand guide covering color, typography, and image treatment, then pitched the concept to festival leadership and led a team of 7 designers in applying it across the full range of festival touchpoints.",
      },
      {
        title: "Program Book",
        content: "",
        images: ["/projects/14th-saaaff/program/cover.png", "/projects/14th-saaaff/program/flip.gif"],
      },
      {
        title: "Merchandise",
        content: "",
        images: ["/projects/14th-saaaff/merch/sticker-red.png", "/projects/14th-saaaff/merch/sticker-blue.png", "/projects/14th-saaaff/merch/sticker-green.png", "/projects/14th-saaaff/merch/name-tag.png", "/projects/14th-saaaff/merch/tote-red.png", "/projects/14th-saaaff/merch/tote-black.png"],
      },
      {
        title: "Shirt Design",
        content: "",
        images: ["/projects/14th-saaaff/merch/shirt.gif"],
      },
      {
        title: "Opening Night",
        content: "",
        images: ["/projects/14th-saaaff/ie-photo.png"],
      },
    ],
  },
  {
    slug: "dp5",
    title: "Disposable Parts 5th Edition",
    subtitle: "Disposable Parts Magazine",
    description:
      "Graphic Design",
    tools: [
      "Adobe Illustrator",
      "Adobe InDesign",
      "Graphic Design",
      "Print",
    ],
    skills: [],
    coverImage: "/projects/dp5/cover.png",
    images: [],
    sections: [
      {
        title: "",
        content:
          'Disposable Parts built its 5th edition around "Digital Natives," an early-2000s internet aesthetic exploring how a generation grew up online. Every contributing designer had to work within a shared moodboard and type system so the issue held together despite having many hands on it.',
      },
      {
        title: "",
        content:
          "Working from the set moodboard and typography system, I designed 6 spreads that each carried the early-2000s internet reference points (interface chrome, period-specific type treatments, low-fi digital textures) while staying visually consistent with the rest of the issue. Designs went through multiple rounds of editorial critique, and I revised based on that feedback rather than treating a first draft as final.",
      },
      {
        title: "Magazine Spreads",
        content: "",
        images: ["/projects/dp5/mockup-3.png", "/projects/dp5/mockup-4.png", "/projects/dp5/mockup-5.png"],
      },
      {
        title: "Back Cover",
        content: "",
        images: ["/projects/dp5/back-cover.jpg"],
      },
    ],
  },
  {
    slug: "seattleaaff",
    title: "13th Annual SAAFF",
    subtitle: "Seattle Asian American Film Festival",
    description:
      "Art Direction, Graphic Design",
    tools: [
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Art Direction",
      "Graphic Design",
      "Print",
    ],
    skills: [],
    coverImage: "/projects/13th-saaaff/cover.png",
    images: [],
    sections: [
      {
        title: "",
        content:
          "Led art direction for 13th annual film festival - playing on nostalgic themes and the hype of plushies from surprise boxes. Created all social media and print graphics.",
      },
      {
        title: "Festival Graphics",
        content: "",
        images: ["/projects/13th-saaaff/thumbnail.gif"],
      },
      {
        title: "Event Photos",
        content: "",
        images: ["/projects/13th-saaaff/hana.jpg", "/projects/13th-saaaff/opening-night.jpg"],
      },
    ],
  },
  {
    slug: "c-id-summer-cinema",
    title: "C-ID Summer Cinema",
    subtitle: "Chinatown-International District Outdoor Summer Cinema",
    description:
      "Art Direction, Graphic Design",
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
          "In 2024, I created the poster design and social media assets for the annual Summer Cinema series presented by the Seattle Asian American Film Festival, partnered with Seattle Parks and Recreation.",
      },
      {
        title: "",
        content:
          "Inspired by Hing Hay Park, a beloved gathering space in the Chinatown-International District of Seattle. I illustrated a pagoda and built the palette around retro shapes and pastel, sunset-toned colors to keep the tone warm and inviting rather than purely promotional.",
      },
      {
        title: "Poster Mockup",
        content: "",
        images: ["/projects/cid-cinema/mockup.png"],
      },
      {
        title: "",
        content:
          "The Summer Cinema series needed to draw more people to a free outdoor event in the Chinatown-International District (the C-ID), Seattle's historic Chinatown neighborhood. The design had to feel fun and welcoming enough to pull people into the neighborhood itself, with the hope that attendees would also support local Chinatown businesses while they were there.",
      },
      {
        title: "Poster design ranked among the festival's top 5 most-engaged Instagram posts, Spring 2024 through Fall 2025.",
        content: "",
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
