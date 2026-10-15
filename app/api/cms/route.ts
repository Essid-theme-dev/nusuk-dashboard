import { NextResponse } from "next/server";
import { createCmsItem, deleteCmsItem, getAllCmsContent, getHomePageContent, updateCmsItem } from "@/app/lib/cms-store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const scope = searchParams.get("scope");
  const content = scope === "admin" ? await getAllCmsContent() : await getHomePageContent();
  return NextResponse.json(content);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, data } = body as { type: string; data: Record<string, unknown> };
    if (!type || !data) return NextResponse.json({ error: "type and data required" }, { status: 400 });
    const item = await createCmsItem(type as Parameters<typeof createCmsItem>[0], data);
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Create failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { type, id, data } = body as { type: string; id: string; data: Record<string, unknown> };
    if (!type || !id) return NextResponse.json({ error: "type and id required" }, { status: 400 });
    const item = await updateCmsItem(type as Parameters<typeof updateCmsItem>[0], id, data);
    return NextResponse.json(item);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Update failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  if (!type || !id) return NextResponse.json({ error: "type and id required" }, { status: 400 });
  const ok = await deleteCmsItem(type as Parameters<typeof deleteCmsItem>[0], id);
  return NextResponse.json({ success: ok });
}
