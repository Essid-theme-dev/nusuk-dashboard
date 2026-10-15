export type HeroSlide = {
  id: string;
  badgeFr: string | null;
  badgeAr: string | null;
  titleFr: string;
  titleAr: string;
  subtitleFr: string;
  subtitleAr: string;
  image: string;
  videoUrl: string | null;
  ctaLabelFr: string;
  ctaLabelAr: string;
  ctaLink: string;
  sortOrder: number;
  active: boolean;
};

export type StatCounter = {
  id: string;
  value: string;
  suffix: string | null;
  labelFr: string;
  labelAr: string;
  sortOrder: number;
  active: boolean;
};

export type FeatureBlock = {
  id: string;
  icon: string;
  titleFr: string;
  titleAr: string;
  descFr: string;
  descAr: string;
  sortOrder: number;
  active: boolean;
};

export type Testimonial = {
  id: string;
  nameFr: string;
  nameAr: string;
  locationFr: string | null;
  locationAr: string | null;
  textFr: string;
  textAr: string;
  avatar: string | null;
  rating: number;
  sortOrder: number;
  active: boolean;
};

export type FaqItem = {
  id: string;
  questionFr: string;
  questionAr: string;
  answerFr: string;
  answerAr: string;
  sortOrder: number;
  active: boolean;
};

export type Destination = {
  id: string;
  nameFr: string;
  nameAr: string;
  descFr: string | null;
  descAr: string | null;
  image: string;
  tourCount: number;
  link: string | null;
  sortOrder: number;
  active: boolean;
};

export type GalleryImage = {
  id: string;
  image: string;
  captionFr: string | null;
  captionAr: string | null;
  sortOrder: number;
  active: boolean;
};

export type VideoBlock = {
  id: string;
  titleFr: string;
  titleAr: string;
  descFr: string | null;
  descAr: string | null;
  videoUrl: string;
  thumbnail: string;
  sortOrder: number;
  active: boolean;
};

export type Achievement = {
  id: string;
  titleFr: string;
  titleAr: string;
  orgFr: string;
  orgAr: string;
  year: string;
  sortOrder: number;
  active: boolean;
};

export type PromoBanner = {
  id: string;
  titleFr: string;
  titleAr: string;
  subtitleFr: string | null;
  subtitleAr: string | null;
  image: string | null;
  ctaFr: string;
  ctaAr: string;
  ctaLink: string;
  style: string;
  sortOrder: number;
  active: boolean;
};

export type HomePageContent = {
  heroSlides: HeroSlide[];
  stats: StatCounter[];
  features: FeatureBlock[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
  destinations: Destination[];
  gallery: GalleryImage[];
  videos: VideoBlock[];
  achievements: Achievement[];
  promos: PromoBanner[];
};
