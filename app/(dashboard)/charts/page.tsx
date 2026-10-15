import { ChartsGallery } from "@/app/components/blocks/charts-gallery";

export const metadata = { title: "Charts · Nuxem", description: "Chart gallery" };

export default function ChartsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Charts</h2>
        <p className="text-sm text-zinc-500">Lightweight demos using Recharts, sized for dashboard panels.</p>
      </div>
      <ChartsGallery />
    </div>
  );
}
