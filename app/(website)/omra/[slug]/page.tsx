import { notFound } from "next/navigation";
import { OmraDetailView } from "@/app/components/website/omra-card";
import { getOmraBySlug } from "@/app/lib/data-store";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const pkg = await getOmraBySlug(slug);
  if (!pkg) return { title: "Omra · Nusuk" };
  return { title: `${pkg.titleFr} · Nusuk`, description: pkg.descriptionFr };
}

export default async function OmraDetailPage({ params }: Props) {
  const { slug } = await params;
  const pkg = await getOmraBySlug(slug);
  if (!pkg) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <OmraDetailView pkg={pkg} />
    </div>
  );
}
