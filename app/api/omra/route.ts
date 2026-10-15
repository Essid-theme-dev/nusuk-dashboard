import { NextResponse } from "next/server";
import {
  createOmraPackage,
  deleteOmraPackage,
  getOmraPackages,
  getOmraPackagesPaginated,
  slugify,
  updateOmraPackage,
} from "@/app/lib/data-store";
import type { OmraPackage, OmraStatus, UpsertOmraInput } from "@/app/features/omra/types";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");

  if (page) {
    const result = await getOmraPackagesPaginated({
      page: Number(page),
      pageSize: Number(searchParams.get("pageSize") ?? 10),
      search: searchParams.get("search") ?? undefined,
      status: (searchParams.get("status") as OmraStatus) || undefined,
    });
    return NextResponse.json(result);
  }

  const packages = await getOmraPackages();
  return NextResponse.json(packages);
}

export async function POST(request: Request) {
  const body = (await request.json()) as UpsertOmraInput;
  if (!body.titleFr || !body.titleAr) {
    return NextResponse.json({ error: "Title required" }, { status: 400 });
  }
  const slug = body.slug ?? slugify(body.titleFr);
  const existing = await getOmraPackages();
  if (existing.some((p) => p.slug === slug)) {
    return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
  }
  const pkg = await createOmraPackage({ ...body, slug });
  return NextResponse.json(pkg, { status: 201 });
}

export async function PUT(request: Request) {
  const body = (await request.json()) as OmraPackage;
  if (!body.id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }
  const updated = await updateOmraPackage(body.id, body);
  return NextResponse.json(updated);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
  const ok = await deleteOmraPackage(id);
  return NextResponse.json({ success: ok });
}
