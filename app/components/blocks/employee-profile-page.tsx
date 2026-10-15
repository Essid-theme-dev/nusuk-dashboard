"use client";

import { useState } from "react";
import Image from "next/image";
import { demoAvatars } from "@/app/lib/demo-avatars";
import { CalendarDays, Clock3, Mail, MapPin, Phone, Star, Users } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ActionModal } from "../ui/action-modal";

const upcoming = [
  { id: "a1", title: "Consultation - New client", time: "09:30 - 10:15", room: "Room A2", status: "Confirmed" },
  { id: "a2", title: "Follow-up appointment", time: "11:00 - 11:45", room: "Room B1", status: "Pending" },
  { id: "a3", title: "Procedure review", time: "14:30 - 15:00", room: "Room C4", status: "Confirmed" },
];

const timeline = [
  "Checked in first patient for 09:30 session.",
  "Submitted treatment note for Emma Jackson.",
  "Updated availability for next week.",
  "Completed 4 appointments today.",
];

export function EmployeeProfilePage() {
  const [messageOpen, setMessageOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden p-0">
        <div className="flex flex-wrap gap-2 px-6 pt-4">
          {["Dermatology", "Patient Care", "Clinical Lead"].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--theme-accent-soft)] bg-[var(--theme-accent-bg)] px-2.5 py-1 text-[11px] font-semibold text-[var(--theme-accent-deep)] dark:bg-[var(--theme-accent-bg-dark)] dark:text-[var(--theme-accent-ink)]"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-5 px-6 pb-6 pt-4 md:flex-row md:items-end md:justify-between">
          <div className="flex items-end gap-4">
            <div className="relative h-24 w-24 overflow-hidden rounded-2xl border-4 border-white bg-zinc-100 shadow-lg dark:border-zinc-900">
              <Image src={demoAvatars.employeeProfile} alt="Employee portrait" fill className="object-cover" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Appointment employee</p>
              <h2 className="text-2xl font-semibold tracking-tight">Dr. Sophie Evans</h2>
              <p className="mt-1 text-sm text-zinc-500">Dermatology specialist · 8 years experience</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setMessageOpen(true)}>Message</Button>
            <Button variant="primary" onClick={() => setBookOpen(true)}>Book appointment</Button>
          </div>
        </div>
      </Card>

      <div className="grid gap-5 xl:grid-cols-[1.35fr_minmax(0,1fr)]">
        <div className="space-y-5">
          <Card>
            <h3 className="text-lg font-semibold tracking-tight">Profile details</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <p className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                <Mail size={14} />
                sophie.evans@nuxem.studio
              </p>
              <p className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                <Phone size={14} />
                +1 (555) 010-184
              </p>
              <p className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                <MapPin size={14} />
                4th floor, North Clinic
              </p>
              <p className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                <Users size={14} />
                128 active patients
              </p>
            </div>
            <p className="mt-4 text-sm text-zinc-500">
              Focused on personalized treatment plans and post-care follow-up. Works with the clinical operations
              team to keep appointment quality high and wait times low.
            </p>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold tracking-tight">User information</h3>
              <Badge tone="green">Verified</Badge>
            </div>
            <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200/80 dark:border-zinc-800">
              <table className="min-w-full border-collapse text-sm">
                <tbody>
                  {[
                    ["Employee ID", "EMP-1024"],
                    ["Department", "Dermatology"],
                    ["License", "MD-CA-88913"],
                    ["Joined", "March 2018"],
                    ["Location", "North Clinic, Floor 4"],
                    ["Primary Language", "English"],
                  ].map(([label, value]) => (
                    <tr key={label} className="nuxem-row-anim border-b border-zinc-100 last:border-b-0 dark:border-zinc-800/80">
                      <td className="w-44 bg-zinc-50/80 px-4 py-2.5 font-medium text-zinc-600 dark:bg-zinc-900/50 dark:text-zinc-300">
                        {label}
                      </td>
                      <td className="px-4 py-2.5 text-zinc-700 dark:text-zinc-200">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold tracking-tight">Upcoming appointments</h3>
              <p className="text-sm text-zinc-500">Today</p>
            </div>
            <div className="mt-4 space-y-3">
              {upcoming.map((item) => (
                <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-200/80 bg-zinc-50/60 px-3.5 py-3 dark:border-zinc-800 dark:bg-zinc-900/45">
                  <div>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-zinc-500">
                      <Clock3 size={12} />
                      {item.time} · {item.room}
                    </p>
                  </div>
                  <Badge tone={item.status === "Confirmed" ? "green" : "amber"}>{item.status}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <h3 className="text-lg font-semibold tracking-tight">Performance snapshot</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/60 p-3 dark:border-zinc-800 dark:bg-zinc-900/45">
                <p className="text-xs uppercase tracking-wide text-zinc-500">Rating</p>
                <p className="mt-1 inline-flex items-center gap-1 text-xl font-semibold">
                  4.8 <Star size={16} className="text-amber-500" />
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/60 p-3 dark:border-zinc-800 dark:bg-zinc-900/45">
                <p className="text-xs uppercase tracking-wide text-zinc-500">Attendance</p>
                <p className="mt-1 text-xl font-semibold">98%</p>
              </div>
              <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/60 p-3 dark:border-zinc-800 dark:bg-zinc-900/45">
                <p className="text-xs uppercase tracking-wide text-zinc-500">Appointments this week</p>
                <p className="mt-1 text-xl font-semibold">34</p>
              </div>
              <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/60 p-3 dark:border-zinc-800 dark:bg-zinc-900/45">
                <p className="text-xs uppercase tracking-wide text-zinc-500">Avg. session</p>
                <p className="mt-1 text-xl font-semibold">42m</p>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold tracking-tight">Recent activity</h3>
            <ol className="mt-4 space-y-3">
              {timeline.map((item, index) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                    {index + 1}
                  </span>
                  <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/60 px-3.5 py-2.5 text-sm dark:border-zinc-800 dark:bg-zinc-900/45">
                    {item}
                  </div>
                </li>
              ))}
            </ol>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold tracking-tight">Availability</h3>
            <p className="mt-2 inline-flex items-center gap-1 text-sm text-zinc-500">
              <CalendarDays size={14} />
              Monday - Friday · 08:30 to 17:30
            </p>
            <Button variant="primary" className="mt-4 w-full" onClick={() => setScheduleOpen(true)}>
              Edit schedule
            </Button>
          </Card>
        </div>
      </div>

      <ActionModal
        open={messageOpen}
        title="Send message"
        description="Create a quick message for Dr. Sophie Evans."
        confirmLabel="Send"
        onClose={() => setMessageOpen(false)}
        onConfirm={() => setMessageOpen(false)}
      />

      <ActionModal
        open={bookOpen}
        title="Book appointment"
        description="Confirm a new appointment with this specialist."
        confirmLabel="Book"
        onClose={() => setBookOpen(false)}
        onConfirm={() => setBookOpen(false)}
      />

      <ActionModal
        open={scheduleOpen}
        title="Edit schedule"
        description="Save updated availability for this employee."
        confirmLabel="Save schedule"
        onClose={() => setScheduleOpen(false)}
        onConfirm={() => setScheduleOpen(false)}
      />
    </div>
  );
}
