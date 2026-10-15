import type { OmraPackage as PrismaOmra, Pilgrim as PrismaPilgrim, PilgrimPayment as PrismaPayment, AgencySettings as PrismaAgency } from "@prisma/client";
import type { OmraPackage } from "@/app/features/omra/types";
import type { Pilgrim, PilgrimPayment } from "@/app/features/pilgrims/types";

export type AgencySettings = {
  id: string;
  nameFr: string;
  nameAr: string;
  email: string;
  phone: string;
  addressFr: string;
  addressAr: string;
  hoursFr: string;
  hoursAr: string;
  facebookUrl: string | null;
  taglineFr: string | null;
  taglineAr: string | null;
  logoUrl: string | null;
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  updatedAt: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  read: boolean;
  createdAt: string;
};

function toDateString(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function toIsoString(d: Date): string {
  return d.toISOString();
}

export function mapOmra(row: PrismaOmra & { _count?: { pilgrims: number } }): OmraPackage {
  return {
    id: row.id,
    slug: row.slug,
    titleFr: row.titleFr,
    titleAr: row.titleAr,
    descriptionFr: row.descriptionFr,
    descriptionAr: row.descriptionAr,
    price: row.price,
    currency: row.currency,
    durationDays: row.durationDays,
    departureDate: toDateString(row.departureDate),
    returnDate: toDateString(row.returnDate),
    hotelMakkah: row.hotelMakkah,
    hotelMadinah: row.hotelMadinah,
    includesFr: row.includesFr,
    includesAr: row.includesAr,
    image: row.image,
    status: row.status,
    maxPilgrims: row.maxPilgrims,
    registeredCount: row._count?.pilgrims ?? 0,
    featured: row.featured,
    guideFr: row.guideFr ?? undefined,
    guideAr: row.guideAr ?? undefined,
    guidePhone: row.guidePhone ?? undefined,
    createdAt: toIsoString(row.createdAt),
    updatedAt: toIsoString(row.updatedAt),
  };
}

export function mapPayment(row: PrismaPayment): PilgrimPayment {
  return {
    id: row.id,
    pilgrimId: row.pilgrimId,
    amount: row.amount,
    note: row.note ?? undefined,
    paidAt: toDateString(row.paidAt),
    createdAt: toIsoString(row.createdAt),
  };
}

export function mapPilgrim(
  row: PrismaPilgrim & {
    omra?: { titleFr: string; departureDate: Date; price: number; currency: string };
    payments?: PrismaPayment[];
  },
): Pilgrim {
  const payments = row.payments?.map(mapPayment);
  const totalPaid = payments?.reduce((s, p) => s + p.amount, 0) ?? 0;
  const omraPrice = row.omra?.price;
  const remaining = omraPrice != null ? Math.max(0, omraPrice - totalPaid) : undefined;
  const paymentStatus =
    omraPrice != null ? (totalPaid >= omraPrice ? "paid" : "pending") : undefined;

  return {
    id: row.id,
    firstName: row.firstName,
    lastName: row.lastName,
    firstNameAr: row.firstNameAr ?? undefined,
    lastNameAr: row.lastNameAr ?? undefined,
    email: row.email,
    phone: row.phone,
    dateOfBirth: toDateString(row.dateOfBirth),
    passportNumber: row.passportNumber,
    passportExpiry: toDateString(row.passportExpiry),
    passportIssueDate: toDateString(row.passportIssueDate),
    passportIssuePlace: row.passportIssuePlace,
    photoUrl: row.photoUrl ?? undefined,
    passportImageUrl: row.passportImageUrl ?? undefined,
    omraId: row.omraId,
    status: row.status,
    emergencyContact: row.emergencyContact,
    emergencyPhone: row.emergencyPhone,
    notes: row.notes ?? undefined,
    createdAt: toIsoString(row.createdAt),
    updatedAt: toIsoString(row.updatedAt),
    payments,
    totalPaid,
    omraPrice,
    paymentStatus,
    remaining,
    omra: row.omra
      ? {
          titleFr: row.omra.titleFr,
          departureDate: toDateString(row.omra.departureDate),
          price: row.omra.price,
          currency: row.omra.currency,
        }
      : undefined,
  };
}

export function mapAgency(row: PrismaAgency): AgencySettings {
  return {
    id: row.id,
    nameFr: row.nameFr,
    nameAr: row.nameAr,
    email: row.email,
    phone: row.phone,
    addressFr: row.addressFr,
    addressAr: row.addressAr,
    hoursFr: row.hoursFr,
    hoursAr: row.hoursAr,
    facebookUrl: row.facebookUrl,
    taglineFr: row.taglineFr,
    taglineAr: row.taglineAr,
    logoUrl: row.logoUrl,
    primaryColor: row.primaryColor ?? "#111111",
    accentColor: row.accentColor ?? "#c87941",
    backgroundColor: row.backgroundColor ?? "#ffffff",
    updatedAt: toIsoString(row.updatedAt),
  };
}

export function parseDate(value: string): Date {
  return new Date(`${value}T00:00:00.000Z`);
}
