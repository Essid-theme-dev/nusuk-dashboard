import { prisma } from "@/app/lib/prisma";
import type { HomePageContent } from "@/app/features/cms/types";

const activeOrder = { where: { active: true }, orderBy: { sortOrder: "asc" as const } };

export async function getHomePageContent(): Promise<HomePageContent> {
  const [heroSlides, stats, features, testimonials, faqs, destinations, gallery, videos, achievements, promos] =
    await Promise.all([
      prisma.heroSlide.findMany(activeOrder),
      prisma.statCounter.findMany(activeOrder),
      prisma.featureBlock.findMany(activeOrder),
      prisma.testimonial.findMany(activeOrder),
      prisma.faqItem.findMany(activeOrder),
      prisma.destination.findMany(activeOrder),
      prisma.galleryImage.findMany(activeOrder),
      prisma.videoBlock.findMany(activeOrder),
      prisma.achievement.findMany(activeOrder),
      prisma.promoBanner.findMany(activeOrder),
    ]);

  return { heroSlides, stats, features, testimonials, faqs, destinations, gallery, videos, achievements, promos };
}

export async function getAllCmsContent() {
  const [heroSlides, stats, features, testimonials, faqs, destinations, gallery, videos, achievements, promos] =
    await Promise.all([
      prisma.heroSlide.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.statCounter.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.featureBlock.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.faqItem.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.destination.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.galleryImage.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.videoBlock.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.achievement.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.promoBanner.findMany({ orderBy: { sortOrder: "asc" } }),
    ]);

  return { heroSlides, stats, features, testimonials, faqs, destinations, gallery, videos, achievements, promos };
}

type CmsType =
  | "hero-slides"
  | "stats"
  | "features"
  | "testimonials"
  | "faqs"
  | "destinations"
  | "gallery"
  | "videos"
  | "achievements"
  | "promos";

const modelMap = {
  "hero-slides": prisma.heroSlide,
  stats: prisma.statCounter,
  features: prisma.featureBlock,
  testimonials: prisma.testimonial,
  faqs: prisma.faqItem,
  destinations: prisma.destination,
  gallery: prisma.galleryImage,
  videos: prisma.videoBlock,
  achievements: prisma.achievement,
  promos: prisma.promoBanner,
} as const;

export async function createCmsItem(type: CmsType, data: Record<string, unknown>) {
  const model = modelMap[type] as unknown as { create: (args: { data: Record<string, unknown> }) => Promise<unknown> };
  return model.create({ data });
}

export async function updateCmsItem(type: CmsType, id: string, data: Record<string, unknown>) {
  const model = modelMap[type] as unknown as {
    update: (args: { where: { id: string }; data: Record<string, unknown> }) => Promise<unknown>;
  };
  return model.update({ where: { id }, data });
}

export async function deleteCmsItem(type: CmsType, id: string) {
  try {
    const model = modelMap[type] as unknown as { delete: (args: { where: { id: string } }) => Promise<unknown> };
    await model.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}
