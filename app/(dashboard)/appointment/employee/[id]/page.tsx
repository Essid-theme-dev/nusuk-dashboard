import { EmployeeProfilePage } from "@/app/components/blocks/employee-profile-page";

export const metadata = {
  title: "Employee profile · Appointment",
  description: "Appointment employee profile details",
};

/** Required for `output: "export"` — pre-render at least one id (links use /1). */
export function generateStaticParams() {
  return [{ id: "1" }];
}

export default function AppointmentEmployeeProfilePage() {
  return <EmployeeProfilePage />;
}
