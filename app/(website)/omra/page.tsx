import { OmraListPageClient } from "@/app/components/website/omra-list-page";
import { getOmraPackages } from "@/app/lib/data-store";

export const metadata = { title: "Nos Omra · Nusuk" };

export const dynamic = "force-dynamic";

export default async function OmraListPage() {
  const packages = await getOmraPackages();
  return <OmraListPageClient packages={packages} />;
}
