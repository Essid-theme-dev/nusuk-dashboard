import { NextResponse } from "next/server";
import { createContactMessage, getContactMessages, markContactMessageRead, deleteContactMessage } from "@/app/lib/data-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const messages = await getContactMessages();
  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, message } = body as Record<string, string>;
  if (!name || !email || !phone || !message) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }
  const created = await createContactMessage({ name, email, phone, message });
  return NextResponse.json(created, { status: 201 });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { id, read } = body as { id: string; read: boolean };
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
  await markContactMessageRead(id, read);
  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
  const ok = await deleteContactMessage(id);
  return NextResponse.json({ success: ok });
}
