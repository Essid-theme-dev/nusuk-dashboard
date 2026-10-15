import { NextResponse } from "next/server";
import {
  createPilgrim,
  createPilgrimPayment,
  deletePilgrim,
  deletePilgrimPayment,
  getPilgrimById,
  getPilgrims,
  getPilgrimsPaginated,
  updatePilgrim,
} from "@/app/lib/data-store";
import type { CreatePaymentInput, Pilgrim, PilgrimStatus, UpsertPilgrimInput } from "@/app/features/pilgrims/types";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    const pilgrim = await getPilgrimById(id);
    if (!pilgrim) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(pilgrim);
  }

  const page = searchParams.get("page");

  if (page) {
    const result = await getPilgrimsPaginated({
      page: Number(page),
      pageSize: Number(searchParams.get("pageSize") ?? 10),
      search: searchParams.get("search") ?? undefined,
      omraId: searchParams.get("omraId") ?? undefined,
      status: (searchParams.get("status") as PilgrimStatus) || undefined,
      paymentStatus: (searchParams.get("paymentStatus") as "paid" | "pending") || undefined,
    });
    return NextResponse.json(result);
  }

  const omraId = searchParams.get("omraId") ?? undefined;
  const pilgrims = await getPilgrims(omraId);
  return NextResponse.json(pilgrims);
}

export async function POST(request: Request) {
  const body = (await request.json()) as UpsertPilgrimInput;
  if (!body.omraId || !body.passportNumber) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  try {
    const pilgrim = await createPilgrim(body);
    return NextResponse.json(pilgrim, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Create failed";
    if (message.includes("Unique constraint")) {
      return NextResponse.json({ error: "Passport number already registered" }, { status: 409 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const body = (await request.json()) as Pilgrim;
  if (!body.id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }
  try {
    const updated = await updatePilgrim(body.id, body);
    return NextResponse.json(updated);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Update failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
  const ok = await deletePilgrim(id);
  return NextResponse.json({ success: ok });
}
