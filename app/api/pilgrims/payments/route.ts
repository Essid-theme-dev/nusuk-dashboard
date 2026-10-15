import { NextResponse } from "next/server";
import { createPilgrimPayment, deletePilgrimPayment } from "@/app/lib/data-store";
import type { CreatePaymentInput } from "@/app/features/pilgrims/types";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json()) as CreatePaymentInput;
  if (!body.pilgrimId || !body.amount || body.amount <= 0) {
    return NextResponse.json({ error: "Invalid payment" }, { status: 400 });
  }
  const payment = await createPilgrimPayment(body);
  return NextResponse.json(payment, { status: 201 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
  const ok = await deletePilgrimPayment(id);
  return NextResponse.json({ success: ok });
}
