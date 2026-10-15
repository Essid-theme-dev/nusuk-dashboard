"use client";

import { CheckCircle2, CircleAlert, Image as ImageIcon, Info, Play, SlidersHorizontal, Table2 } from "lucide-react";
import { ChevronDown, ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Tabs } from "@/app/components/ui/tabs";
import { ImageViewer, type ImageViewerItem } from "@/app/components/ui/image-viewer";

type ShowcaseTab = "forms" | "data" | "feedback" | "media";

const tabs: { id: ShowcaseTab; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { id: "forms", label: "Forms", icon: SlidersHorizontal },
  { id: "data", label: "Data", icon: Table2 },
  { id: "feedback", label: "Feedback", icon: Info },
  { id: "media", label: "Media", icon: ImageIcon },
];

const tableRows = [
  { id: "CMP-301", name: "Landing redesign", owner: "Emma", status: "Done", progress: 100 },
  { id: "CMP-302", name: "Checkout revamp", owner: "Noah", status: "In progress", progress: 72 },
  { id: "CMP-303", name: "Help center", owner: "Lina", status: "Review", progress: 56 },
  { id: "CMP-304", name: "Mobile dashboard", owner: "Mason", status: "Blocked", progress: 34 },
  { id: "CMP-305", name: "Pricing experiments", owner: "Sofia", status: "Done", progress: 100 },
  { id: "CMP-306", name: "Onboarding flow", owner: "Ethan", status: "In progress", progress: 80 },
  { id: "CMP-307", name: "Brand refresh", owner: "Ava", status: "Review", progress: 60 },
  { id: "CMP-308", name: "Billing accuracy", owner: "Oliver", status: "Blocked", progress: 30 },
];

const galleryImages = [
  { id: 1, src: "https://picsum.photos/seed/dashboard-team-sync/900/600" },
  { id: 2, src: "https://picsum.photos/seed/marketing-planning-wall/900/600" },
  { id: 3, src: "https://picsum.photos/seed/product-design-review/900/600" },
  { id: 4, src: "https://picsum.photos/seed/analytics-command-center/900/600" },
  { id: 5, src: "https://picsum.photos/seed/customer-support-desk/900/600" },
  { id: 6, src: "https://picsum.photos/seed/project-kanban-session/900/600" },
];

export function ComponentsShowcasePage() {
  const [activeTab, setActiveTab] = useState<ShowcaseTab>("forms");
  const [showModal, setShowModal] = useState(false);
  const [sliderValue, setSliderValue] = useState(45);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [accordionOpen, setAccordionOpen] = useState<"a" | "b" | "c">("a");

  const [tableQuery, setTableQuery] = useState("");
  const [tablePage, setTablePage] = useState(1);

  const currentImage = useMemo(() => galleryImages[galleryIndex % galleryImages.length], [galleryIndex]);

  const viewerItems: ImageViewerItem[] = useMemo(
    () =>
      galleryImages.map((img) => ({
        src: img.src,
        alt: `Gallery image ${img.id}`,
      })),
    [],
  );

  const filteredTableRows = useMemo(() => {
    const q = tableQuery.trim().toLowerCase();
    if (!q) return tableRows;
    return tableRows.filter((r) => r.name.toLowerCase().includes(q) || r.owner.toLowerCase().includes(q) || r.id.toLowerCase().includes(q));
  }, [tableQuery]);

  const tablePageSize = 4;
  const tableTotalPages = Math.max(1, Math.ceil(filteredTableRows.length / tablePageSize));
  const clampedTablePage = Math.min(tableTotalPages, Math.max(1, tablePage));
  const tableSlice = filteredTableRows.slice((clampedTablePage - 1) * tablePageSize, clampedTablePage * tablePageSize);

  const toastTimer = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2300);
  };

  return (
    <div className="space-y-6">
      <Card className="p-5">
        <Tabs tabs={tabs} activeId={activeTab} onChange={setActiveTab} />
      </Card>

      {activeTab === "forms" ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="space-y-4 p-6">
            <h3 className="text-lg font-semibold">Inputs and controls</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input placeholder="Text input" />
              <Input type="email" placeholder="Email" />
              <Input type="password" placeholder="Password" />
              <Input type="number" placeholder="Number" />
              <Input type="url" placeholder="Website URL" />
              <Input type="tel" placeholder="Phone number" />
              <Input type="date" />
              <Input type="time" />
              <Input type="month" />
              <Input type="week" />
              <Input type="color" defaultValue="#7c3aed" className="h-10 p-1.5" />
              <Input type="file" className="h-10 pt-1.5" />
            </div>
            <textarea
              placeholder="Textarea"
              className="min-h-[90px] w-full rounded-xl border border-slate-200 bg-slate-50/85 px-3.5 py-2.5 text-sm outline-none focus:border-[var(--theme-accent)] focus:bg-white focus:ring-4 focus:ring-[var(--theme-accent-ring)] dark:border-zinc-700 dark:bg-zinc-900"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-zinc-300">
                <input type="checkbox" className="size-4 accent-[var(--theme-accent)]" defaultChecked />
                Enable notifications
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-zinc-300">
                <input type="radio" name="plan" className="size-4 accent-[var(--theme-accent)]" defaultChecked />
                Pro plan
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600 dark:text-zinc-300">Select role</p>
                <select className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/85 px-3.5 text-sm text-slate-700 outline-none focus:border-[var(--theme-accent)] focus:ring-4 focus:ring-[var(--theme-accent-ring)] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
                  <option>Designer</option>
                  <option>Developer</option>
                  <option>Product</option>
                  <option>Manager</option>
                </select>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600 dark:text-zinc-300">Toggle</p>
                <button
                  type="button"
                  role="switch"
                  aria-checked={true}
                  className="relative inline-flex h-8 w-14 items-center rounded-full bg-[var(--theme-accent)] px-1 transition-colors"
                  onClick={() => toastTimer("Toggle clicked (demo).")}
                >
                  <span className="inline-flex size-6 items-center justify-center rounded-full bg-white shadow-sm transition-transform translate-x-6" />
                </button>
              </div>
            </div>
          </Card>

          <Card className="space-y-4 p-6">
            <h3 className="text-lg font-semibold">Buttons and slider</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="secondary" disabled>
                Disabled
              </Button>
              <Button className="bg-emerald-600 text-white hover:bg-emerald-500">Success</Button>
              <Button className="bg-rose-600 text-white hover:bg-rose-500">Danger</Button>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-600 dark:text-zinc-300">Slider value: {sliderValue}%</p>
              <input
                type="range"
                min={0}
                max={100}
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
                className="w-full accent-[var(--theme-accent)]"
              />
            </div>
          </Card>
        </div>
      ) : null}

      {activeTab === "data" ? (
        <Card className="p-0">
          <div className="flex items-center justify-between border-b border-slate-200/80 px-5 py-4 dark:border-zinc-800">
            <h3 className="text-lg font-semibold">Styled table</h3>
            <Input
              placeholder="Search by name/owner/id..."
              className="h-9 w-[240px]"
              value={tableQuery}
              onChange={(e) => {
                setTableQuery(e.target.value);
                setTablePage(1);
              }}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50/80 dark:bg-zinc-900/60">
                <tr className="text-left text-slate-500 dark:text-zinc-400">
                  <th className="px-5 py-3 font-semibold">ID</th>
                  <th className="px-5 py-3 font-semibold">Name</th>
                  <th className="px-5 py-3 font-semibold">Owner</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Progress</th>
                </tr>
              </thead>
              <tbody>
                {tableSlice.length > 0 ? (
                  tableSlice.map((row) => (
                    <tr key={row.id} className="nuxem-row-anim border-t border-slate-100 dark:border-zinc-800/90">
                      <td className="px-5 py-3 font-medium">{row.id}</td>
                      <td className="px-5 py-3">{row.name}</td>
                      <td className="px-5 py-3">{row.owner}</td>
                      <td className="px-5 py-3">
                        <Badge tone={row.status === "Blocked" ? "red" : row.status === "Review" ? "amber" : "green"}>
                          {row.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-3">
                        <div className="h-2.5 w-32 rounded-full bg-zinc-200 dark:bg-zinc-700">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[var(--brand-fill-from)] to-[var(--brand-fill-to)]"
                            style={{ width: `${row.progress}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center text-zinc-500 dark:text-zinc-400">
                      No results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between gap-4 px-5 py-4">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Page {clampedTablePage} of {tableTotalPages}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                onClick={() => setTablePage((p) => Math.max(1, p - 1))}
                disabled={clampedTablePage === 1}
              >
                <ChevronLeft size={14} className="mr-1" />
                Prev
              </Button>
              <Button
                variant="secondary"
                onClick={() => setTablePage((p) => Math.min(tableTotalPages, p + 1))}
                disabled={clampedTablePage === tableTotalPages}
              >
                Next
                <ChevronRight size={14} className="ml-1" />
              </Button>
            </div>
          </div>
        </Card>
      ) : null}

      {activeTab === "feedback" ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="space-y-4 p-6">
            <h3 className="text-lg font-semibold">Dialogs and dropdowns</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" onClick={() => setShowModal(true)}>
                Open popup
              </Button>
              <Button variant="secondary" onClick={() => toastTimer("Saved successfully.")}>
                Toast demo
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/25 dark:text-emerald-300">
                <CheckCircle2 size={15} /> Profile updated successfully.
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/25 dark:text-amber-300">
                <CircleAlert size={15} /> API token expires in 2 days.
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <p className="text-sm font-semibold">Dropdown menu</p>
              <div className="relative inline-block">
                <Button variant="secondary" onClick={() => setDropdownOpen((v) => !v)}>
                  Actions <ChevronDown size={14} className="ml-1" />
                </Button>
                {dropdownOpen ? (
                  <div className="absolute right-0 z-10 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:text-zinc-200 dark:hover:bg-zinc-900"
                      onClick={() => {
                        setDropdownOpen(false);
                        toastTimer("New item created.");
                      }}
                    >
                      <Plus size={15} />
                      Create item
                    </button>
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:text-zinc-200 dark:hover:bg-zinc-900"
                      onClick={() => {
                        setDropdownOpen(false);
                        toastTimer("Item deleted (demo).");
                      }}
                    >
                      <Trash2 size={15} />
                      Delete item
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </Card>

          <Card className="space-y-4 p-6">
            <h3 className="text-lg font-semibold">Accordion</h3>
            <div className="space-y-3">
              {[
                { id: "a" as const, title: "Reusable layout blocks", body: "Cards, tables, forms, and media patterns share the same spacing and shadow system." },
                { id: "b" as const, title: "Consistent dark mode", body: "Neutral surfaces keep text readable while violet accents stay premium." },
                { id: "c" as const, title: "Interactive behavior", body: "Tabs, dropdowns, modals, and image viewing work like a production dashboard." },
              ].map((item) => {
                const open = accordionOpen === item.id;
                return (
                  <div key={item.id} className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 dark:border-zinc-800 dark:bg-zinc-950/40">
                    <button
                      type="button"
                      onClick={() => setAccordionOpen(item.id)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-slate-800 dark:text-zinc-100"
                    >
                      <span>{item.title}</span>
                      <ChevronDown size={16} className={`transition ${open ? "rotate-180" : ""}`} />
                    </button>
                    {open ? <div className="px-4 pb-4 text-sm text-slate-600 dark:text-zinc-300">{item.body}</div> : null}
                  </div>
                );
              })}
            </div>
            <div className="grid gap-3 sm:grid-cols-2 pt-1">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-sm text-slate-500 dark:text-zinc-400">Standard card</p>
                <p className="mt-2 text-lg font-semibold">$34,300</p>
              </div>
              <div className="rounded-2xl border border-[var(--theme-accent-soft)] bg-[var(--theme-accent-bg)] p-4 shadow-sm dark:border-[var(--theme-accent-soft)] dark:bg-[var(--theme-accent-bg-dark)]">
                <p className="text-sm text-[var(--theme-accent-deep)] dark:text-[var(--theme-accent-ink)]">Highlighted card</p>
                <p className="mt-2 text-lg font-semibold">+18%</p>
              </div>
            </div>
          </Card>
        </div>
      ) : null}

      {activeTab === "media" ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="space-y-4 p-6">
            <h3 className="text-lg font-semibold">Gallery</h3>
            <div className="grid grid-cols-3 gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => {
                    setViewerIndex(idx);
                    setViewerOpen(true);
                  }}
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/5 bg-black/20 transition hover:border-[var(--theme-accent-soft)]"
                >
                  <Image src={img.src} alt={`Gallery ${img.id}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </Card>

          <Card className="space-y-4 p-6">
            <h3 className="text-lg font-semibold">Image slider</h3>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
              <Image src={currentImage.src} alt="Slider preview" fill className="object-cover" />
            </div>
            <div className="flex items-center justify-between">
              <Button variant="secondary" onClick={() => setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}>
                Previous
              </Button>
              <p className="text-sm text-slate-500 dark:text-zinc-400">
                {galleryIndex + 1} / {galleryImages.length}
              </p>
              <Button
                variant="secondary"
                onClick={() => {
                  setViewerIndex(galleryIndex);
                  setViewerOpen(true);
                }}
              >
                View
              </Button>
              <Button variant="primary" onClick={() => setGalleryIndex((prev) => (prev + 1) % galleryImages.length)}>
                <Play size={14} className="mr-1" />
                Next
              </Button>
            </div>
          </Card>
        </div>
      ) : null}

      {viewerOpen ? (
        <ImageViewer items={viewerItems} index={viewerIndex} onIndexChange={setViewerIndex} onClose={() => setViewerOpen(false)} />
      ) : null}

      {showModal ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/45 px-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
            <h4 className="text-lg font-semibold">Confirm action</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-zinc-300">
              This is a professionally styled popup component with clear actions.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setShowModal(false)}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      ) : null}
      {toast ? (
        <div className="fixed bottom-6 left-1/2 z-[80] w-full max-w-sm -translate-x-1/2 px-4">
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-xl dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
            {toast}
          </div>
        </div>
      ) : null}
    </div>
  );
}
