export type MediaType = "image" | "video";

export type MediaItem = {
  type: MediaType;
  src: string;
  poster?: string;
  alt: string;
  caption: string;
  detail: string;
};

export type FeaturedProject = {
  id: string;
  title: string;
  tag: string;
  oneLine: string;
  heroBlurb?: string;
  mediaSide: "start" | "end";
  summaryBullets: string[];
  summaryNote?: string;
  albumAspect?: string;
  /** Hash-scroll offset. Default `scroll-mt-24`. Smaller = land further down. */
  scrollMarginClass?: string;
  media: MediaItem[];
};

export type EntrySection = {
  heading: string;
  intro?: string;
  bullets: string[];
};

export type CompactEntry = {
  id: string;
  title: string;
  tag?: string;
  mediaSide: "start" | "end";
  heroBlurb?: string;
  intro?: string;
  bullets?: string[];
  sections?: EntrySection[];
  layout?: "default" | "compact";
  albumAspect?: string;
  albumMaxHeight?: string;
  albumChrome?: "inset" | "plain";
  /** Hash-scroll offset. Default `scroll-mt-24`. Smaller = land further down. */
  scrollMarginClass?: string;
  media: MediaItem[];
};

export type EducationItem = {
  id: string;
  school: string;
  years: string;
  note: string;
  icon: string;
  iconAlt: string;
};

export type SiteContent = {
  title: string;
  email: string;
  phone?: string;
  resumePdf: string;
  aiEthicsPdf: string;
  hero: {
    name: string;
    portrait: {
      src: string;
      alt: string;
    };
  };
  education: EducationItem[];
  featured: FeaturedProject[];
  interests: CompactEntry[];
  internships: CompactEntry[];
};
