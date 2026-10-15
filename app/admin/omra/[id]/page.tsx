import { OmraForm } from "@/app/components/admin/omra-form";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return { title: `Edit Omra ${id} · Nusuk Admin` };
}

export default async function EditOmraPage({ params }: Props) {
  const { id } = await params;
  return <OmraForm id={id} />;
}
