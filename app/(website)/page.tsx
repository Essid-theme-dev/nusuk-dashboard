import { HomePageClient } from "@/app/components/website/home-page";
import { getHomePageContent } from "@/app/lib/cms-store";
import { getOmraPackages } from "@/app/lib/data-store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [packages, cms] = await Promise.all([getOmraPackages(), getHomePageContent()]);
  return <HomePageClient packages={packages} cms={cms} />;
}
