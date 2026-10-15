import type { OmraStatus, PaginatedResult, UpsertOmraInput } from "@/app/features/omra/types";
import type { CreatePaymentInput, PilgrimStatus, UpsertPilgrimInput } from "@/app/features/pilgrims/types";
import { mapAgency, mapOmra, mapPilgrim, mapPayment, parseDate, type AgencySettings, type ContactMessage } from "@/app/lib/mappers";
import { prisma } from "@/app/lib/prisma";

const omraInclude = { _count: { select: { pilgrims: true } } } as const;

const pilgrimInclude = {
  omra: { select: { titleFr: true, departureDate: true, price: true, currency: true } },
  payments: { orderBy: { paidAt: "desc" as const } },
} as const;

export async function getOmraPackages(): Promise<ReturnType<typeof mapOmra>[]> {
  const rows = await prisma.omraPackage.findMany({
    include: omraInclude,
    orderBy: { departureDate: "asc" },
  });
  return rows.map(mapOmra);
}

export async function getOmraPackagesPaginated(params: {
  search?: string;
  status?: OmraStatus;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<Awaited<ReturnType<typeof mapOmra>>>> {
  const page = Math.max(1, params.page ?? 1);
  const pageSize = Math.min(50, Math.max(5, params.pageSize ?? 10));
  const where = {
    ...(params.status ? { status: params.status } : {}),
    ...(params.search
      ? {
          OR: [
            { titleFr: { contains: params.search, mode: "insensitive" as const } },
            { titleAr: { contains: params.search } },
            { guideFr: { contains: params.search, mode: "insensitive" as const } },
            { guideAr: { contains: params.search } },
            { slug: { contains: params.search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [total, rows] = await Promise.all([
    prisma.omraPackage.count({ where }),
    prisma.omraPackage.findMany({
      where,
      include: omraInclude,
      orderBy: { departureDate: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  return {
    items: rows.map(mapOmra),
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export async function getOmraBySlug(slug: string) {
  const row = await prisma.omraPackage.findUnique({
    where: { slug },
    include: omraInclude,
  });
  return row ? mapOmra(row) : undefined;
}

export async function getOmraById(id: string) {
  const row = await prisma.omraPackage.findUnique({
    where: { id },
    include: omraInclude,
  });
  return row ? mapOmra(row) : undefined;
}

export async function createOmraPackage(input: UpsertOmraInput) {
  const slug = input.slug ?? slugify(input.titleFr);
  const row = await prisma.omraPackage.create({
    data: {
      slug,
      titleFr: input.titleFr,
      titleAr: input.titleAr,
      descriptionFr: input.descriptionFr,
      descriptionAr: input.descriptionAr,
      price: input.price,
      currency: input.currency,
      durationDays: input.durationDays,
      departureDate: parseDate(input.departureDate),
      returnDate: parseDate(input.returnDate),
      hotelMakkah: input.hotelMakkah,
      hotelMadinah: input.hotelMadinah,
      includesFr: input.includesFr,
      includesAr: input.includesAr,
      image: input.image,
      guideFr: input.guideFr ?? null,
      guideAr: input.guideAr ?? null,
      guidePhone: input.guidePhone ?? null,
      status: input.status,
      maxPilgrims: input.maxPilgrims,
      featured: input.featured,
    },
    include: omraInclude,
  });
  return mapOmra(row);
}

export async function updateOmraPackage(id: string, input: UpsertOmraInput & { slug?: string }) {
  const row = await prisma.omraPackage.update({
    where: { id },
    data: {
      slug: input.slug,
      titleFr: input.titleFr,
      titleAr: input.titleAr,
      descriptionFr: input.descriptionFr,
      descriptionAr: input.descriptionAr,
      price: input.price,
      currency: input.currency,
      durationDays: input.durationDays,
      departureDate: parseDate(input.departureDate),
      returnDate: parseDate(input.returnDate),
      hotelMakkah: input.hotelMakkah,
      hotelMadinah: input.hotelMadinah,
      includesFr: input.includesFr,
      includesAr: input.includesAr,
      image: input.image,
      guideFr: input.guideFr ?? null,
      guideAr: input.guideAr ?? null,
      guidePhone: input.guidePhone ?? null,
      status: input.status as OmraStatus,
      maxPilgrims: input.maxPilgrims,
      featured: input.featured,
    },
    include: omraInclude,
  });
  return mapOmra(row);
}

export async function deleteOmraPackage(id: string): Promise<boolean> {
  try {
    await prisma.omraPackage.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}

export async function getPilgrims(omraId?: string) {
  const rows = await prisma.pilgrim.findMany({
    where: omraId ? { omraId } : undefined,
    include: pilgrimInclude,
    orderBy: { createdAt: "desc" },
  });
  return rows.map(mapPilgrim);
}

export async function getPilgrimsPaginated(params: {
  search?: string;
  omraId?: string;
  status?: PilgrimStatus;
  paymentStatus?: "paid" | "pending";
  page?: number;
  pageSize?: number;
}) {
  const page = Math.max(1, params.page ?? 1);
  const pageSize = Math.min(50, Math.max(5, params.pageSize ?? 10));
  const where = {
    ...(params.omraId ? { omraId: params.omraId } : {}),
    ...(params.status ? { status: params.status } : {}),
    ...(params.search
      ? {
          OR: [
            { firstName: { contains: params.search, mode: "insensitive" as const } },
            { lastName: { contains: params.search, mode: "insensitive" as const } },
            { email: { contains: params.search, mode: "insensitive" as const } },
            { phone: { contains: params.search } },
            { passportNumber: { contains: params.search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  if (params.paymentStatus) {
    const rows = await prisma.pilgrim.findMany({
      where,
      include: pilgrimInclude,
      orderBy: { createdAt: "desc" },
    });
    const mapped = rows.map(mapPilgrim).filter((p) => p.paymentStatus === params.paymentStatus);
    const total = mapped.length;
    const start = (page - 1) * pageSize;
    return {
      items: mapped.slice(start, start + pageSize),
      total,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
    };
  }

  const [total, rows] = await Promise.all([
    prisma.pilgrim.count({ where }),
    prisma.pilgrim.findMany({
      where,
      include: pilgrimInclude,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  return {
    items: rows.map(mapPilgrim),
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export async function getPilgrimById(id: string) {
  const row = await prisma.pilgrim.findUnique({
    where: { id },
    include: pilgrimInclude,
  });
  return row ? mapPilgrim(row) : undefined;
}

export async function createPilgrim(input: UpsertPilgrimInput) {
  const row = await prisma.pilgrim.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      firstNameAr: input.firstNameAr,
      lastNameAr: input.lastNameAr,
      email: input.email,
      phone: input.phone,
      dateOfBirth: parseDate(input.dateOfBirth),
      passportNumber: input.passportNumber,
      passportExpiry: parseDate(input.passportExpiry),
      passportIssueDate: parseDate(input.passportIssueDate),
      passportIssuePlace: input.passportIssuePlace,
      photoUrl: input.photoUrl,
      passportImageUrl: input.passportImageUrl,
      omraId: input.omraId,
      status: input.status,
      emergencyContact: input.emergencyContact,
      emergencyPhone: input.emergencyPhone,
      notes: input.notes,
    },
    include: pilgrimInclude,
  });
  await syncOmraStatus(input.omraId);
  return mapPilgrim(row);
}

export async function updatePilgrim(id: string, input: UpsertPilgrimInput) {
  const existing = await prisma.pilgrim.findUnique({ where: { id } });
  const row = await prisma.pilgrim.update({
    where: { id },
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      firstNameAr: input.firstNameAr,
      lastNameAr: input.lastNameAr,
      email: input.email,
      phone: input.phone,
      dateOfBirth: parseDate(input.dateOfBirth),
      passportNumber: input.passportNumber,
      passportExpiry: parseDate(input.passportExpiry),
      passportIssueDate: parseDate(input.passportIssueDate),
      passportIssuePlace: input.passportIssuePlace,
      photoUrl: input.photoUrl,
      passportImageUrl: input.passportImageUrl,
      omraId: input.omraId,
      status: input.status,
      emergencyContact: input.emergencyContact,
      emergencyPhone: input.emergencyPhone,
      notes: input.notes,
    },
    include: pilgrimInclude,
  });
  await syncOmraStatus(input.omraId);
  if (existing && existing.omraId !== input.omraId) {
    await syncOmraStatus(existing.omraId);
  }
  return mapPilgrim(row);
}

export async function createPilgrimPayment(input: CreatePaymentInput) {
  const row = await prisma.pilgrimPayment.create({
    data: {
      pilgrimId: input.pilgrimId,
      amount: input.amount,
      note: input.note,
      paidAt: input.paidAt ? parseDate(input.paidAt) : new Date(),
    },
  });
  return mapPayment(row);
}

export async function deletePilgrimPayment(id: string): Promise<boolean> {
  try {
    await prisma.pilgrimPayment.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}

export async function deletePilgrim(id: string): Promise<boolean> {
  try {
    const pilgrim = await prisma.pilgrim.findUnique({ where: { id } });
    if (!pilgrim) return false;
    await prisma.pilgrim.delete({ where: { id } });
    await syncOmraStatus(pilgrim.omraId);
    return true;
  } catch {
    return false;
  }
}

async function syncOmraStatus(omraId: string) {
  const omra = await prisma.omraPackage.findUnique({
    where: { id: omraId },
    include: { _count: { select: { pilgrims: true } } },
  });
  if (!omra || omra.status === "closed") return;

  const count = omra._count.pilgrims;
  const nextStatus = count >= omra.maxPilgrims ? "full" : "available";
  if (omra.status !== nextStatus) {
    await prisma.omraPackage.update({
      where: { id: omraId },
      data: { status: nextStatus },
    });
  }
}

export async function getAgencySettings(): Promise<AgencySettings> {
  let settings = await prisma.agencySettings.findUnique({ where: { id: "default" } });
  if (!settings) {
    settings = await prisma.agencySettings.create({
      data: {
        id: "default",
        facebookUrl: "https://www.facebook.com/profile.php?id=61565876218155",
        taglineFr: "Votre partenaire de confiance pour l'Omra et le Hajj",
        taglineAr: "شريككم الموثوق للعمرة والحج",
        primaryColor: "#111111",
        accentColor: "#c87941",
        backgroundColor: "#ffffff",
      },
    });
  }
  return mapAgency(settings);
}

export async function updateAgencySettings(
  data: Partial<Omit<AgencySettings, "id" | "updatedAt">>,
): Promise<AgencySettings> {
  const row = await prisma.agencySettings.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      nameFr: data.nameFr ?? "Nusuk Services Touristiques",
      nameAr: data.nameAr ?? "نسك للخدمات السياحية",
      email: data.email ?? "contact@nusuk-dz.com",
      phone: data.phone ?? "+213 555 000 000",
      addressFr: data.addressFr ?? "Le Bardo, Tunis, Tunisie",
      addressAr: data.addressAr ?? "الجزائر، الجزائر",
      hoursFr: data.hoursFr ?? "Lun - Sam : 9h - 18h",
      hoursAr: data.hoursAr ?? "الإثنين - السبت: 9ص - 6م",
      facebookUrl: data.facebookUrl ?? null,
      taglineFr: data.taglineFr ?? null,
      taglineAr: data.taglineAr ?? null,
      logoUrl: data.logoUrl ?? "/logo.jpg",
      primaryColor: data.primaryColor ?? "#111111",
      accentColor: data.accentColor ?? "#c87941",
      backgroundColor: data.backgroundColor ?? "#ffffff",
    },
    update: data,
  });
  return mapAgency(row);
}

export async function createContactMessage(input: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<ContactMessage> {
  const row = await prisma.contactMessage.create({ data: input });
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    message: row.message,
    read: row.read,
    createdAt: row.createdAt.toISOString(),
  };
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const rows = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    message: row.message,
    read: row.read,
    createdAt: row.createdAt.toISOString(),
  }));
}

export async function markContactMessageRead(id: string, read: boolean) {
  await prisma.contactMessage.update({ where: { id }, data: { read } });
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  try {
    await prisma.contactMessage.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
