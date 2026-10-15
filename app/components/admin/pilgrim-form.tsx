"use client";

import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { OmraPackage } from "@/app/features/omra/types";
import type { Pilgrim, PilgrimPayment, PilgrimStatus } from "@/app/features/pilgrims/types";
import { t } from "@/app/lib/i18n";
import { readLanguage, APP_LANGUAGE_EVENT, type AppLanguage } from "@/app/lib/language";
import { clsx } from "clsx";

function useAdminLanguage() {
  const [lang, setLang] = useState<AppLanguage>("FR");
  useEffect(() => {
    setLang(readLanguage());
    const handler = (e: Event) => setLang((e as CustomEvent<AppLanguage>).detail);
    window.addEventListener(APP_LANGUAGE_EVENT, handler);
    return () => window.removeEventListener(APP_LANGUAGE_EVENT, handler);
  }, []);
  return lang;
}

const emptyPilgrim = (): Partial<Pilgrim> => ({
  firstName: "",
  lastName: "",
  firstNameAr: "",
  lastNameAr: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  passportNumber: "",
  passportExpiry: "",
  passportIssueDate: "",
  passportIssuePlace: "",
  photoUrl: "",
  passportImageUrl: "",
  omraId: "",
  status: "registered" as PilgrimStatus,
  emergencyContact: "",
  emergencyPhone: "",
  notes: "",
});

type PilgrimFormProps = { id?: string };

export function PilgrimForm({ id }: PilgrimFormProps) {
  const lang = useAdminLanguage();
  const router = useRouter();
  const [form, setForm] = useState<Partial<Pilgrim>>(emptyPilgrim());
  const [payments, setPayments] = useState<PilgrimPayment[]>([]);
  const [omraList, setOmraList] = useState<OmraPackage[]>([]);
  const [saving, setSaving] = useState(false);
  const [photoPreview, setPhotoPreview] = useState("");
  const [passportPreview, setPassportPreview] = useState("");
  const [newPayment, setNewPayment] = useState({ amount: "", note: "", paidAt: new Date().toISOString().slice(0, 10) });

  useEffect(() => {
    fetch("/api/omra").then((r) => r.json()).then(setOmraList);
  }, []);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/pilgrims?id=${id}`)
      .then((r) => r.json())
      .then((found: Pilgrim) => {
        setForm(found);
        setPayments(found.payments ?? []);
        setPhotoPreview(found.photoUrl ?? "");
        setPassportPreview(found.passportImageUrl ?? "");
      });
  }, [id]);

  const selectedOmra = omraList.find((o) => o.id === form.omraId);
  const omraPrice = selectedOmra?.price ?? form.omraPrice ?? 0;
  const currency = selectedOmra?.currency ?? form.omra?.currency ?? "TND";
  const totalPaid = payments.reduce((s, p) => s + p.amount, 0);
  const remaining = Math.max(0, omraPrice - totalPaid);
  const isPaid = omraPrice > 0 && totalPaid >= omraPrice;
  const progress = omraPrice > 0 ? Math.min(100, (totalPaid / omraPrice) * 100) : 0;

  const update = (key: keyof Pilgrim, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setPhotoPreview(dataUrl);
      update("photoUrl", dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handlePassportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setPassportPreview(dataUrl);
      update("passportImageUrl", dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleAddPayment = async () => {
    const amount = Number(newPayment.amount);
    if (!id || !amount || amount <= 0) return;
    const res = await fetch("/api/pilgrims/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pilgrimId: id,
        amount,
        note: newPayment.note || undefined,
        paidAt: newPayment.paidAt,
      }),
    });
    if (res.ok) {
      const payment = await res.json();
      setPayments((prev) => [payment, ...prev]);
      setNewPayment({ amount: "", note: "", paidAt: new Date().toISOString().slice(0, 10) });
    }
  };

  const handleDeletePayment = async (paymentId: string) => {
    if (!confirm(t(lang, "Delete confirm"))) return;
    await fetch(`/api/pilgrims/payments?id=${paymentId}`, { method: "DELETE" });
    setPayments((prev) => prev.filter((p) => p.id !== paymentId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const method = id ? "PUT" : "POST";
    const { payments: _p, totalPaid: _t, omraPrice: _op, paymentStatus: _ps, remaining: _r, omra: _o, ...payload } = form as Pilgrim;
    const body = id ? { ...payload, id } : payload;
    const res = await fetch("/api/pilgrims", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSaving(false);
    if (res.ok) router.push("/admin/pilgrims");
  };

  const inputClass =
    "w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900";

  return (
    <form onSubmit={handleSubmit} className="nusuk-page-anim mx-auto max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{id ? t(lang, "Edit") : t(lang, "New Pilgrim")}</h2>
        <Link href="/admin/pilgrims" className="text-sm text-[#c9a227]">{t(lang, "Back to list")}</Link>
      </div>

      {/* Payment summary */}
      {form.omraId ? (
        <section className="rounded-2xl border border-[#c9a227]/25 bg-gradient-to-br from-[#faf8f4] to-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-[#1a1208]">{t(lang, "Payment")}</h3>
              <p className="mt-1 text-sm text-zinc-500">
                {totalPaid.toLocaleString()} / {omraPrice.toLocaleString()} {currency}
              </p>
            </div>
            <span className={clsx(
              "rounded-full px-4 py-1.5 text-sm font-bold",
              isPaid ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800",
            )}>
              {isPaid ? t(lang, "Paid") : t(lang, "Payment pending")}
            </span>
          </div>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-zinc-200">
            <div
              className={clsx("h-full rounded-full transition-all", isPaid ? "bg-emerald-500" : "bg-[#c9a227]")}
              style={{ width: `${progress}%` }}
            />
          </div>
          {!isPaid && remaining > 0 ? (
            <p className="mt-2 text-sm font-medium text-amber-700">
              {t(lang, "Remaining")}: {remaining.toLocaleString()} {currency}
            </p>
          ) : null}
        </section>
      ) : null}

      {/* Photo & passport */}
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-4 font-semibold">{t(lang, "Photo")} & {t(lang, "Passport image")}</h3>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-medium text-zinc-500">{t(lang, "Photo")}</p>
            <div className="flex items-center gap-4">
              <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50">
                {photoPreview ? (
                  <Image src={photoPreview} alt="" width={112} height={112} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-xs text-zinc-400">{t(lang, "Photo")}</span>
                )}
              </div>
              <input type="file" accept="image/*" onChange={handlePhotoChange} className="text-sm" />
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-zinc-500">{t(lang, "Passport image")}</p>
            <div className="flex items-center gap-4">
              <div className="flex h-28 w-40 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[#c9a227]/40 bg-[#faf8f4]">
                {passportPreview ? (
                  <Image src={passportPreview} alt="" width={160} height={112} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-xs text-zinc-400">{t(lang, "Passport image")}</span>
                )}
              </div>
              <input type="file" accept="image/*" onChange={handlePassportChange} className="text-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* Personal info */}
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-4 font-semibold">{t(lang, "Personal info")}</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">{t(lang, "First name")}</label>
            <input required className={inputClass} value={form.firstName ?? ""} onChange={(e) => update("firstName", e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{t(lang, "Last name")}</label>
            <input required className={inputClass} value={form.lastName ?? ""} onChange={(e) => update("lastName", e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{t(lang, "Email")}</label>
            <input required type="email" className={inputClass} value={form.email ?? ""} onChange={(e) => update("email", e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{t(lang, "Phone")}</label>
            <input required className={inputClass} value={form.phone ?? ""} onChange={(e) => update("phone", e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{t(lang, "Date of birth")}</label>
            <input required type="date" className={inputClass} value={form.dateOfBirth ?? ""} onChange={(e) => update("dateOfBirth", e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium">{t(lang, "Select Omra")}</label>
            <select required className={inputClass} value={form.omraId ?? ""} onChange={(e) => update("omraId", e.target.value)}>
              <option value="">—</option>
              {omraList.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.titleFr} — {new Date(o.departureDate).toLocaleDateString("fr-TN")} — {o.price.toLocaleString()} {o.currency}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Passport info */}
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-4 font-semibold">{t(lang, "Passport info")}</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">{t(lang, "Passport number")}</label>
            <input required className={inputClass} value={form.passportNumber ?? ""} onChange={(e) => update("passportNumber", e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{t(lang, "Passport expiry")}</label>
            <input required type="date" className={inputClass} value={form.passportExpiry ?? ""} onChange={(e) => update("passportExpiry", e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{t(lang, "Passport issue date")}</label>
            <input required type="date" className={inputClass} value={form.passportIssueDate ?? ""} onChange={(e) => update("passportIssueDate", e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{t(lang, "Passport issue place")}</label>
            <input required className={inputClass} value={form.passportIssuePlace ?? ""} onChange={(e) => update("passportIssuePlace", e.target.value)} />
          </div>
        </div>
      </section>

      {/* Payments installments */}
      {id ? (
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-4 font-semibold">{t(lang, "Payment installments")}</h3>
          <div className="mb-4 grid gap-3 rounded-xl border border-dashed border-[#c9a227]/30 bg-[#faf8f4]/50 p-4 sm:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">{t(lang, "Amount")}</label>
              <input
                type="number"
                min={1}
                className={inputClass}
                value={newPayment.amount}
                onChange={(e) => setNewPayment((p) => ({ ...p, amount: e.target.value }))}
                placeholder="1000"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">{t(lang, "Date")}</label>
              <input
                type="date"
                className={inputClass}
                value={newPayment.paidAt}
                onChange={(e) => setNewPayment((p) => ({ ...p, paidAt: e.target.value }))}
              />
            </div>
            <div className="sm:col-span-1">
              <label className="mb-1 block text-xs font-medium text-zinc-500">{t(lang, "Notes")}</label>
              <input
                className={inputClass}
                value={newPayment.note}
                onChange={(e) => setNewPayment((p) => ({ ...p, note: e.target.value }))}
                placeholder={t(lang, "Installment note")}
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleAddPayment}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1a1208] px-4 py-2.5 text-sm font-semibold text-[#c9a227] hover:bg-[#c9a227] hover:text-[#1a1208]"
              >
                <Plus size={16} />
                {t(lang, "Add installment")}
              </button>
            </div>
          </div>
          {payments.length > 0 ? (
            <div className="space-y-2">
              {payments.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50/50 px-4 py-3">
                  <div>
                    <p className="font-semibold text-[#1a1208]">
                      {p.amount.toLocaleString()} {currency}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {new Date(p.paidAt).toLocaleDateString("fr-TN")}
                      {p.note ? ` · ${p.note}` : ""}
                    </p>
                  </div>
                  <button type="button" onClick={() => handleDeletePayment(p.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-zinc-400">{t(lang, "No payments yet")}</p>
          )}
        </section>
      ) : (
        <p className="rounded-xl border border-dashed border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-500">
          {t(lang, "Save pilgrim first to add payments")}
        </p>
      )}

      {/* Emergency & status */}
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-4 font-semibold">{t(lang, "Emergency contact")}</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">{t(lang, "Emergency contact")}</label>
            <input required className={inputClass} value={form.emergencyContact ?? ""} onChange={(e) => update("emergencyContact", e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{t(lang, "Phone")}</label>
            <input required className={inputClass} value={form.emergencyPhone ?? ""} onChange={(e) => update("emergencyPhone", e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{t(lang, "Status")}</label>
            <select className={inputClass} value={form.status ?? "registered"} onChange={(e) => update("status", e.target.value)}>
              <option value="registered">{t(lang, "Registered")}</option>
              <option value="confirmed">{t(lang, "Confirmed")}</option>
              <option value="visa_pending">{t(lang, "Visa pending")}</option>
              <option value="cancelled">{t(lang, "Cancelled")}</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium">{t(lang, "Notes")}</label>
            <textarea rows={3} className={inputClass} value={form.notes ?? ""} onChange={(e) => update("notes", e.target.value)} />
          </div>
        </div>
      </section>

      <button
        type="submit"
        disabled={saving}
        className="rounded-xl bg-[#1a1208] px-8 py-3 text-sm font-bold text-[#c9a227] hover:bg-[#c9a227] hover:text-[#1a1208] disabled:opacity-50"
      >
        {saving ? "..." : t(lang, "Save")}
      </button>
    </form>
  );
}
