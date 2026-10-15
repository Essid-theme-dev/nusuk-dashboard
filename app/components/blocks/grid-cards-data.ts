export type GridTile = {
  id: string;
  title: string;
  meta: string;
  tone: "indigo" | "emerald" | "amber" | "rose";
};

export const productTiles: GridTile[] = [
  { id: "p1", title: "Canvas backpack", meta: "Inventory · 128 in stock", tone: "indigo" },
  { id: "p2", title: "Steel bottle", meta: "New · SKU-9021", tone: "emerald" },
  { id: "p3", title: "Noise buds", meta: "Bundles · Promo", tone: "amber" },
  { id: "p4", title: "USB-C hub", meta: "Accessories · 42 sold", tone: "rose" },
  { id: "p5", title: "Desk mat", meta: "Home office", tone: "indigo" },
  { id: "p6", title: "4K webcam", meta: "Pro series", tone: "emerald" },
];

export const projectTiles: GridTile[] = [
  { id: "r1", title: "Orbit rollout", meta: "Milestone · 68% complete", tone: "indigo" },
  { id: "r2", title: "Northwind QA", meta: "Sprint · 12 issues", tone: "amber" },
  { id: "r3", title: "Data lake", meta: "Infra · In progress", tone: "emerald" },
  { id: "r4", title: "Design tokens", meta: "UX · Stable", tone: "rose" },
  { id: "r5", title: "Mobile parity", meta: "Eng · Watch", tone: "indigo" },
  { id: "r6", title: "Partner API", meta: "Beta · SLA 99.9%", tone: "emerald" },
];
