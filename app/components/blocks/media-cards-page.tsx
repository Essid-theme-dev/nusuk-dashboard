"use client";

import Image from "next/image";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

const mediaItems = [
  { id: "m1", title: "Workspace dashboard", tag: "Analytics", src: "https://picsum.photos/seed/analytics-war-room/800/500" },
  { id: "m2", title: "Campaign overview", tag: "Marketing", src: "https://picsum.photos/seed/marketing-campaign-review/800/500" },
  { id: "m3", title: "Product showcase", tag: "Ecommerce", src: "https://picsum.photos/seed/product-showcase-briefing/800/500" },
  { id: "m4", title: "Team sprint board", tag: "Projects", src: "https://picsum.photos/seed/sprint-board-standup/800/500" },
  { id: "m5", title: "Support workflow", tag: "Operations", src: "https://picsum.photos/seed/support-ops-dashboard/800/500" },
  { id: "m6", title: "Onboarding flow", tag: "Experience", src: "https://picsum.photos/seed/customer-onboarding-map/800/500" },
];

export function MediaCardsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Media</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">Image cards gallery</h2>
          <p className="mt-1 text-sm text-zinc-500">Showcase cards with image previews, metadata, and quick actions.</p>
        </div>
        <Button variant="primary">Upload media</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {mediaItems.map((item) => (
          <Card key={item.id} className="overflow-hidden p-0">
            <div className="relative aspect-[16/10] w-full">
              <Image src={item.src} alt={item.title} fill className="object-cover" />
            </div>
            <div className="space-y-3 p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold tracking-tight">{item.title}</p>
                <span className="rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-violet-700 dark:border-violet-900/70 dark:bg-violet-950/40 dark:text-violet-300">
                  {item.tag}
                </span>
              </div>
              <p className="text-sm text-zinc-500">Facit-inspired media card with lightweight details and actions.</p>
              <div className="flex gap-2">
                <Button className="h-9 px-3 text-xs">Preview</Button>
                <Button variant="primary" className="h-9 px-3 text-xs">
                  Use asset
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
