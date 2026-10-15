import { NextResponse } from "next/server";
import { getAgencySettings, updateAgencySettings } from "@/app/lib/data-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await getAgencySettings();
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const settings = await updateAgencySettings(body);
  return NextResponse.json(settings);
}
