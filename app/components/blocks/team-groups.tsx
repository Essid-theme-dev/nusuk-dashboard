import Image from "next/image";
import { Megaphone, Palette, Wrench } from "lucide-react";
import { demoAvatars } from "@/app/lib/demo-avatars";
import { Card } from "../ui/card";

const groups = [
  {
    name: "Design Team",
    members: 8,
    lead: "Mira Stone",
    focus: "UI system",
    activeProjects: 4,
    roster: [
      { name: "Mira Stone", avatar: demoAvatars.miraStone },
      { name: "Olivia Reed", avatar: demoAvatars.oliviaReed },
      { name: "Ethan Brooks", avatar: demoAvatars.ethanBrooks },
    ],
    extraMembers: ["Liam Foster", "Ava Collins", "Noah Price", "Grace Turner", "Mason Bell"],
    icon: Palette,
    cover: "https://picsum.photos/seed/design-team-studio/1000/600",
  },
  {
    name: "Development Team",
    members: 14,
    lead: "Alex Carter",
    focus: "Platform delivery",
    activeProjects: 7,
    roster: [
      { name: "Alex Carter", avatar: demoAvatars.alexCarter },
      { name: "Noah Smith", avatar: demoAvatars.noahSmith },
      { name: "Emma Lewis", avatar: demoAvatars.emmaLewis },
    ],
    extraMembers: ["Lucas Green", "Ella Adams", "James Ward", "Sofia Hayes", "Henry Cole"],
    icon: Wrench,
    cover: "https://picsum.photos/seed/development-team-standup/1000/600",
  },
  {
    name: "Marketing Team",
    members: 6,
    lead: "Sophie Evans",
    focus: "Campaign growth",
    activeProjects: 3,
    roster: [
      { name: "Sophie Evans", avatar: demoAvatars.sophieEvans },
      { name: "Lina Porter", avatar: demoAvatars.linaPorter },
      { name: "Mason Clark", avatar: demoAvatars.masonClark },
    ],
    extraMembers: ["Emma Brooks", "David Stone", "Mila Reed"],
    icon: Megaphone,
    cover: "https://picsum.photos/seed/marketing-campaign-room/1000/600",
  },
];

export function TeamGroups() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {groups.map((group) => {
        const Icon = group.icon;
        return (
          <Card key={group.name} className="group hover-lift overflow-hidden p-0">
            <div className="relative h-32 w-full overflow-hidden">
              <Image src={group.cover} alt={`${group.name} cover`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/25 to-black/55" />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full border border-[var(--theme-accent-soft)] bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-[var(--theme-accent-deep)] dark:bg-zinc-900/85 dark:text-[var(--theme-accent-ink)]">
                  <Icon size={12} />
                  {group.focus}
                </span>
                <span className="rounded-full bg-zinc-900/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white dark:bg-zinc-100 dark:text-zinc-900">
                  Team
                </span>
              </div>
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">User group</p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight">{group.name}</h3>
              <p className="mt-1 text-sm text-zinc-500">{group.members} members</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/80 px-2.5 py-2 text-center dark:border-zinc-800 dark:bg-zinc-900/45">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">Active</p>
                  <p className="mt-0.5 text-sm font-semibold text-zinc-700 dark:text-zinc-200">{group.activeProjects}</p>
                </div>
                <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/80 px-2.5 py-2 text-center dark:border-zinc-800 dark:bg-zinc-900/45">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">Lead</p>
                  <p className="mt-0.5 truncate text-sm font-semibold text-zinc-700 dark:text-zinc-200">{group.lead.split(" ")[0]}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex -space-x-2">
                  {group.roster.map((member) => (
                    <div key={member.name} className="group/avatar relative h-7 w-7 overflow-visible">
                      <div className="relative h-7 w-7 overflow-hidden rounded-full border-2 border-white dark:border-zinc-900">
                        <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                      </div>
                      <span className="pointer-events-none absolute -top-9 left-1/2 z-20 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 shadow-lg group-hover/avatar:block dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
                        {member.name}
                      </span>
                    </div>
                  ))}
                </div>
                <span className="group/extra relative text-xs text-zinc-500">
                  +{Math.max(group.members - 3, 0)} more
                  <span className="pointer-events-none absolute -top-2 left-1/2 z-20 hidden min-w-[170px] -translate-x-1/2 -translate-y-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-[11px] font-semibold text-slate-700 shadow-lg group-hover/extra:block dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
                    <span className="mb-1 block text-[10px] uppercase tracking-wide text-zinc-400">Other members</span>
                    <span className="block space-y-1">
                      {group.extraMembers.map((member) => (
                        <span key={member} className="block">
                          {member}
                        </span>
                      ))}
                    </span>
                  </span>
                </span>
              </div>
              <p className="mt-3 inline-flex items-center rounded-full border border-[var(--theme-accent-soft)] bg-[var(--theme-accent-bg)] px-2.5 py-1 text-sm font-medium text-[var(--theme-accent-deep)] dark:bg-[var(--theme-accent-bg-dark)] dark:text-[var(--theme-accent-ink)]">
                Lead: {group.lead}
              </p>
            </div>
          </Card>
        );
      })}
    </section>
  );
}
