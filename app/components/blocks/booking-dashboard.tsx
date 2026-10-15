"use client";

import { ChevronLeft, ChevronRight, Clock3, MapPin, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { ActionModal } from "../ui/action-modal";
import { CountUpValue, parseCountUpParts } from "../ui/count-up-value";

type BookingEvent = {
  id: string;
  date: string;
  guest: string;
  room: string;
  time: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  location: string;
};

const tiles = [
  { label: "Occupancy", value: "74%", accent: "text-indigo-600 dark:text-indigo-300", hint: "+6% WoW" },
  { label: "New bookings", value: "482", accent: "text-emerald-600 dark:text-emerald-400", hint: "+3.1%" },
  { label: "Cancellations", value: "18", accent: "text-amber-600 dark:text-amber-300", hint: "Stable" },
  { label: "Avg. fare", value: "$124", accent: "text-rose-600 dark:text-rose-300", hint: "+$7" },
];

const events: BookingEvent[] = [
  {
    id: "bk-001",
    date: "2026-05-06",
    guest: "Emma Miller",
    room: "Suite A12",
    time: "09:30",
    status: "Confirmed",
    location: "North Tower",
  },
  {
    id: "bk-002",
    date: "2026-05-06",
    guest: "Noah Garcia",
    room: "Deluxe B04",
    time: "13:00",
    status: "Pending",
    location: "East Wing",
  },
  {
    id: "bk-003",
    date: "2026-05-11",
    guest: "Ava Wilson",
    room: "Standard C08",
    time: "10:45",
    status: "Confirmed",
    location: "West Annex",
  },
  {
    id: "bk-004",
    date: "2026-05-18",
    guest: "Lucas Brown",
    room: "Suite A02",
    time: "18:10",
    status: "Cancelled",
    location: "North Tower",
  },
  {
    id: "bk-005",
    date: "2026-05-18",
    guest: "Sophia Moore",
    room: "Deluxe B14",
    time: "20:15",
    status: "Confirmed",
    location: "East Wing",
  },
  {
    id: "bk-006",
    date: "2026-05-22",
    guest: "Liam Anderson",
    room: "Garden G03",
    time: "11:30",
    status: "Pending",
    location: "Garden View",
  },
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function BookingDashboard() {
  const [viewMonth, setViewMonth] = useState(new Date(2026, 4, 1));
  const [selectedDate, setSelectedDate] = useState("2026-05-06");
  const [bookings, setBookings] = useState<BookingEvent[]>(events);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [draftGuest, setDraftGuest] = useState("");
  const [draftRoom, setDraftRoom] = useState("");
  const [draftTime, setDraftTime] = useState("");
  const [draftLocation, setDraftLocation] = useState("");
  const [draftStatus, setDraftStatus] = useState<BookingEvent["status"]>("Pending");

  const calendarDays = useMemo(() => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startOffset = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: Date[] = [];

    for (let i = 0; i < startOffset; i += 1) {
      cells.push(new Date(year, month, i - startOffset + 1));
    }
    for (let d = 1; d <= daysInMonth; d += 1) {
      cells.push(new Date(year, month, d));
    }
    while (cells.length % 7 !== 0) {
      cells.push(new Date(year, month + 1, cells.length - (startOffset + daysInMonth) + 1));
    }
    return cells;
  }, [viewMonth]);

  const monthlyEvents = useMemo(() => {
    const monthPrefix = `${viewMonth.getFullYear()}-${String(viewMonth.getMonth() + 1).padStart(2, "0")}`;
    return bookings.filter((event) => event.date.startsWith(monthPrefix));
  }, [bookings, viewMonth]);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, BookingEvent[]>();
    monthlyEvents.forEach((event) => {
      const existing = map.get(event.date) ?? [];
      map.set(event.date, [...existing, event]);
    });
    return map;
  }, [monthlyEvents]);

  const selectedDayEvents = eventsByDate.get(selectedDate) ?? [];

  const resetDraft = () => {
    setDraftGuest("");
    setDraftRoom("");
    setDraftTime("");
    setDraftLocation("");
    setDraftStatus("Pending");
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tiles.map((tile) => (
          <Card key={tile.label} className="p-5">
            <p className="text-sm font-medium text-zinc-500">{tile.label}</p>
            <CountUpBookingValue className={`mt-3 text-3xl font-semibold tracking-tight ${tile.accent}`} value={tile.value} />
            <p className="mt-2 text-sm text-zinc-500">{tile.hint}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.55fr_minmax(0,1fr)]">
        <Card className="p-0">
          <div className="flex items-center justify-between border-b border-slate-200/80 px-6 py-4 dark:border-white/10">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Booking calendar</h2>
              <p className="text-sm text-zinc-500">Track daily arrivals and status updates</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setViewMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
                className="grid size-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                aria-label="Previous month"
              >
                <ChevronLeft size={16} />
              </button>
              <p className="min-w-[140px] text-center text-sm font-semibold">
                {viewMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </p>
              <button
                type="button"
                onClick={() => setViewMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
                className="grid size-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                aria-label="Next month"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="px-6 pb-6 pt-4">
            <div className="mb-2 grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
              {weekDays.map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((date) => {
                const iso = toIsoDate(date);
                const isCurrentMonth = date.getMonth() === viewMonth.getMonth();
                const isSelected = iso === selectedDate;
                const dayEvents = eventsByDate.get(iso) ?? [];

                return (
                  <button
                    key={iso}
                    type="button"
                    onClick={() => {
                      setSelectedDate(iso);
                      setShowCreateModal(true);
                    }}
                    className={`relative min-h-[86px] rounded-2xl border p-2.5 text-left transition ${
                      isSelected
                        ? "border-violet-400 bg-violet-50 shadow-sm dark:border-violet-700 dark:bg-violet-950/30"
                        : "border-slate-200/80 bg-white hover:border-violet-200 hover:bg-slate-50/70 dark:border-white/10 dark:bg-zinc-900/40 dark:hover:border-violet-900 dark:hover:bg-zinc-900/70"
                    }`}
                  >
                    <span
                      className={`text-sm font-semibold ${
                        isCurrentMonth ? "text-slate-800 dark:text-zinc-100" : "text-zinc-400"
                      }`}
                    >
                      {date.getDate()}
                    </span>
                    {dayEvents.length > 0 ? (
                      <span className="absolute bottom-2.5 left-2.5 inline-flex rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
                        {dayEvents.length} book
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </Card>

        <Card className="p-0">
          <div className="flex items-center justify-between border-b border-slate-200/80 px-5 py-4 dark:border-white/10">
            <div>
              <h3 className="text-base font-semibold tracking-tight">Daily schedule</h3>
              <p className="text-sm text-zinc-500">
                {new Date(selectedDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <Button
              type="button"
              variant="primary"
              className="h-9 px-3 text-xs"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus size={14} className="mr-1" />
              Add
            </Button>
          </div>

          <div className="space-y-3 px-5 py-4">
            {selectedDayEvents.length === 0 ? (
              <p className="rounded-xl border border-dashed border-slate-200 px-3 py-10 text-center text-sm text-zinc-500 dark:border-zinc-700">
                No bookings for this day.
              </p>
            ) : (
              selectedDayEvents.map((event) => (
                <article
                  key={event.id}
                  className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.22)] dark:border-white/10 dark:bg-zinc-900/70"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">{event.guest}</p>
                      <p className="text-sm text-zinc-500">{event.room}</p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                        event.status === "Confirmed"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                          : event.status === "Pending"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                            : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>
                  <div className="mt-3 space-y-1.5 text-xs text-zinc-500">
                    <p className="inline-flex items-center gap-1.5">
                      <Clock3 size={13} />
                      {event.time}
                    </p>
                    <p className="inline-flex items-center gap-1.5">
                      <MapPin size={13} />
                      {event.location}
                    </p>
                  </div>
                </article>
              ))
            )}
          </div>
        </Card>
      </div>
      <ActionModal
        open={showCreateModal}
        title="Add schedule appointment"
        description={`Create appointment for ${new Date(selectedDate).toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        })}.`}
        confirmLabel="Save appointment"
        onClose={() => {
          setShowCreateModal(false);
          resetDraft();
        }}
        onConfirm={() => {
          if (!draftGuest.trim() || !draftRoom.trim() || !draftTime.trim() || !draftLocation.trim()) return;
          setBookings((prev) => [
            ...prev,
            {
              id: `bk-${Date.now()}`,
              date: selectedDate,
              guest: draftGuest.trim(),
              room: draftRoom.trim(),
              time: draftTime.trim(),
              location: draftLocation.trim(),
              status: draftStatus,
            },
          ]);
          setShowCreateModal(false);
          resetDraft();
        }}
      >
        <Input
          placeholder="Guest name"
          value={draftGuest}
          onChange={(event) => setDraftGuest(event.target.value)}
        />
        <Input
          placeholder="Room (e.g. Suite A09)"
          value={draftRoom}
          onChange={(event) => setDraftRoom(event.target.value)}
        />
        <Input
          placeholder="Time (e.g. 15:30)"
          value={draftTime}
          onChange={(event) => setDraftTime(event.target.value)}
        />
        <Input
          placeholder="Location (e.g. North Tower)"
          value={draftLocation}
          onChange={(event) => setDraftLocation(event.target.value)}
        />
        <div className="grid grid-cols-3 gap-2">
          {(["Pending", "Confirmed", "Cancelled"] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setDraftStatus(status)}
              className={`rounded-xl border px-2.5 py-2 text-xs font-semibold transition ${
                draftStatus === status
                  ? "border-[var(--theme-accent-soft)] bg-[var(--theme-accent-bg)] text-[var(--theme-accent-deep)] dark:bg-[var(--theme-accent-bg-dark)] dark:text-[var(--theme-accent-ink)]"
                  : "border-zinc-200 text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </ActionModal>
    </div>
  );
}

function CountUpBookingValue({ value, className }: { value: string; className: string }) {
  const parsed = parseCountUpParts(value);
  return (
    <CountUpValue
      value={parsed.value}
      prefix={parsed.prefix}
      suffix={parsed.suffix}
      decimals={parsed.decimals}
      durationMs={850}
      className={className}
    />
  );
}
