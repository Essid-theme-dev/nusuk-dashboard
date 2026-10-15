import { PilgrimForm } from "@/app/components/admin/pilgrim-form";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return { title: `Edit Pilgrim ${id} · Nusuk Admin` };
}

export default async function EditPilgrimPage({ params }: Props) {
  const { id } = await params;
  return <PilgrimForm id={id} />;
}
