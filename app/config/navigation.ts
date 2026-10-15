import type { LucideIcon } from "lucide-react";
import { CalendarDays, Layout, LayoutDashboard, Mail, Settings, User, Users } from "lucide-react";

export type PageTabItem = { label: string; href: string };

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  subtitle?: string;
};

export type NavSection = {
  id: string;
  title: string;
  defaultOpen?: boolean;
  items: NavItem[];
};

export const authPageTabs: PageTabItem[] = [
  { label: "Login", href: "/auth/login" },
  { label: "Sign up", href: "/auth/sign-up" },
];

export const navSections: NavSection[] = [
  {
    id: "core",
    title: "Core",
    defaultOpen: true,
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
        subtitle: "Overview · stats & recent activity",
      },
    ],
  },
  {
    id: "management",
    title: "Management",
    defaultOpen: true,
    items: [
      {
        label: "Omra",
        href: "/admin/omra",
        icon: CalendarDays,
        subtitle: "Manage Omra packages",
      },
      {
        label: "Pilgrims",
        href: "/admin/pilgrims",
        icon: Users,
        subtitle: "Pilgrim registry & passports",
      },
      {
        label: "Content",
        href: "/admin/content",
        icon: Layout,
        subtitle: "Hero, gallery, FAQ & blocks",
      },
      {
        label: "Messages",
        href: "/admin/contact",
        icon: Mail,
        subtitle: "Contact form submissions",
      },
    ],
  },
  {
    id: "settings",
    title: "Settings",
    defaultOpen: false,
    items: [
      {
        label: "General",
        href: "/admin/settings",
        icon: Settings,
        subtitle: "Agency settings",
      },
      {
        label: "My account",
        href: "/admin/account",
        icon: User,
        subtitle: "Profile & password",
      },
    ],
  },
];

const allNavItems: NavItem[] = navSections.flatMap((s) => s.items);

export function resolvePageMeta(pathname: string): { title: string; subtitle: string } {
  const exact = allNavItems.find((i) => i.href === pathname);
  if (exact) {
    return { title: exact.label, subtitle: exact.subtitle ?? "Nusuk Admin" };
  }

  const byPrefix = [...allNavItems]
    .filter((i) => i.href !== "/admin" && pathname.startsWith(i.href))
    .sort((a, b) => b.href.length - a.href.length)[0];
  if (byPrefix) {
    return { title: byPrefix.label, subtitle: byPrefix.subtitle ?? "Nusuk Admin" };
  }

  if (pathname === "/admin") {
    return { title: "Dashboard", subtitle: "Overview · stats & recent activity" };
  }

  return { title: "Nusuk", subtitle: "Admin Panel" };
}

export function getTabGroupForPath(_pathname: string): PageTabItem[] | null {
  return null;
}
