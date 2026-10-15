export type BoxedListStatus = "all" | "active" | "archived";

export type BoxedListItem = {
  id: string;
  title: string;
  subtitle: string;
  status: Exclude<BoxedListStatus, "all">;
  category: string;
  updatedAt: string;
};

export const boxedListItems: BoxedListItem[] = [
  {
    id: "1",
    title: "Northwind onboarding",
    subtitle: "12 tasks · Marketing & sales",
    status: "active",
    category: "Project",
    updatedAt: "2h ago",
  },
  {
    id: "2",
    title: "Q4 product launch",
    subtitle: "8 tasks · Growth team",
    status: "active",
    category: "Campaign",
    updatedAt: "Yesterday",
  },
  {
    id: "3",
    title: "Facit design system",
    subtitle: "UI kit · Components & tokens",
    status: "archived",
    category: "Library",
    updatedAt: "Mar 12",
  },
  {
    id: "4",
    title: "Mobile checkout",
    subtitle: "Payments flow · A/B tests",
    status: "active",
    category: "Feature",
    updatedAt: "4d ago",
  },
  {
    id: "5",
    title: "Customer insights",
    subtitle: "Dashboards · Analytics",
    status: "archived",
    category: "Report",
    updatedAt: "Jan 8",
  },
  {
    id: "6",
    title: "Partner API v2",
    subtitle: "Docs · SDK examples",
    status: "active",
    category: "API",
    updatedAt: "1w ago",
  },
];
