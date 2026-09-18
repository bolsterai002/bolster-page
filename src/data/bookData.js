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
    characterImage: getAsset("images/alien_mentor_character.jpg"),
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

export const SIDE_CHARACTER = {
  name: "The Alien Mentor & Student",
  role: "Side Characters • Alienverse Developer Series",
  image: getAsset("images/alien_mentor_character.jpg"),
  tagline: "When humans get stuck, aliens arrive.",
  description: "The Alien Mentor guiding the next generation through the frontiers of Artificial Intelligence and synthetic software architecture."
};

export const FEATURED_AUTHOR = {
  name: "Arshak Roshan",
  title: "Author & AI Systems Architect",
  avatar: "",
  characterImage: getAsset("images/alien_mentor_character.jpg"),
  signatureBook: "Alienverse: AI Software Engineering Standards",
  bio: "Arshak Roshan is the author of the acclaimed Alienverse Developer Series, articulating new software engineering standards for the synthetic intelligence era. His work merges technical systems architecture with cosmological foresight.",
  quote: "“When humans get stuck, aliens arrive. The next leap in software development belongs to those who build beyond terrestrial limits.”",
  stats: [
    { label: "Series", value: "Developer #1" }
  ],
  awards: []
};

export const TESTIMONIALS = [];

export const GENRES = [
  "All Books"
];

