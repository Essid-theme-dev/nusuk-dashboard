import { AppSurface } from "@/app/components/blocks/app-surface";

export const metadata = { title: "Survey · Apps", description: "Survey app surface" };

export default function SurveyAppPage() {
  return (
    <AppSurface
      eyebrow="Apps · Survey"
      title="Run lightweight surveys alongside live metrics"
      body="Compose multi-step questionnaires, reuse templates, export responses—all without leaving the chrome of your dashboard."
    />
  );
}
