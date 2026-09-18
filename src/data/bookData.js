const BASE = import.meta.env.BASE_URL || '/';
const getAsset = (path) => `${BASE.endsWith('/') ? BASE : `${BASE}/`}${path.replace(/^\//, '')}`;

export const BOOKS_DATA = [
  {
    id: "alienverse-ai-standards",
    title: "Alienverse: AI Software Engineering Standards",
    series: "Developer Series - 1",
    author: "Arshak Roshan",
    genre: "Sci-Fi",
    price: 29.99,
    originalPrice: 39.99,
    rating: 5.0,
    reviewCount: 3840,
    cover: getAsset("images/alienverse_ai_front.jpg"),
    backCover: getAsset("images/alienverse_ai_back.jpg"),
    badge: "Developer Series #1",
    featured: true,
    formats: ["Hardcover", "eBook", "Audiobook"],
    tagline: "When humans get stuck, aliens arrive.",
    synopsis: "Artificial Intelligence Guide: Alienverse (Developer Series - 1). The definitive blueprint for next-generation AI software engineering standards. From foundational autonomous workflows to symbiotic neural architectures, Arshak Roshan unpacks how human engineers and frontier models co-create transcendent software systems.",
    excerpt: "When humans get stuck, aliens arrive. The next leap in software development is not merely faster syntax—it is symbiotic intelligence. Building systems that can reason, adapt, and self-correct requires an entirely new discipline of engineering rigor.",
    quote: "A visionary synthesis of technical discipline and cosmological foresight. The standard every modern software architect must master.",
    audioDuration: "11h 45m",
    pageCount: 420,
    publisher: "Alienverse Press",
    isbn: "978-0-9912-7041-0",
    publishedYear: 2026,
  }
];

export const FEATURED_AUTHOR = {
  name: "Arshak Roshan",
  title: "Author & AI Systems Architect",
  avatar: "",
  signatureBook: "Alienverse: AI Software Engineering Standards",
  bio: "Arshak Roshan is the author of the acclaimed Alienverse Developer Series, articulating new software engineering standards for the synthetic intelligence era. His work merges technical systems architecture with cosmological foresight.",
  quote: "“When humans get stuck, aliens arrive. The next leap in software development belongs to those who build beyond terrestrial limits.”",
  stats: [
    { label: "Series", value: "Developer #1" },
    { label: "Rating", value: "5.0 ★" },
    { label: "Edition", value: "Triple Release" }
  ],
  awards: [
    "Pioneer in AI Software Engineering Standards 2026",
    "Author of the Alienverse Developer Series"
  ]
};

export const TESTIMONIALS = [
  {
    id: "t1",
    name: "Dr. Evelyn Ward",
    role: "Literature & Tech Fellow, Oxford",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    comment: "ALIENVERSE's developer series introduces an unprecedented paradigm for software engineering. The physical collector's edition is museum-grade craftsmanship.",
    rating: 5,
    book: "Alienverse: AI Software Engineering Standards"
  },
  {
    id: "t2",
    name: "Julian Chen",
    role: "AI Systems Architect, Synthetica",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    comment: "'When humans get stuck, aliens arrive.' Arshak Roshan's guide fundamentally shifted how our engineering team builds agentic software.",
    rating: 5,
    book: "Alienverse: AI Software Engineering Standards"
  },
  {
    id: "t3",
    name: "Samantha Morales",
    role: "Engineering Director & Podcast Host",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    comment: "The audio preview feature and instant chapter sample allowed our entire engineering team to review before bulk ordering hardcovers for the tech library.",
    rating: 5,
    book: "Alienverse: AI Software Engineering Standards"
  }
];

export const GENRES = [
  "All Books"
];

