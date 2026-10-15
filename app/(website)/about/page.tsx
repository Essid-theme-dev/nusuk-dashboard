import { AboutPageClient } from "@/app/components/website/about-page";
import { getHomePageContent } from "@/app/lib/cms-store";

export const metadata = { title: "À propos · Nusuk Tunisie" };

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const cms = await getHomePageContent();
  return <AboutPageClient stats={cms.stats} />;
}
