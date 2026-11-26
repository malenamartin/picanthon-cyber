import { pageMetadata } from "../../page-metadata";
import { redirect } from "next/navigation";
import { SignupFlow } from "../../components/SignupFlow";
import { APPLY_OPEN, APPLY_PATH } from "../../event";

export const metadata = pageMetadata(
  "/inscripcion/solo",
  "Busco equipo | Picathon Cyberseguridad 2026",
  "Anotate a Picathon Cyberseguridad 2026 y te ayudamos a encontrar equipo en Buenos Aires.",
);

export default function SoloPage() {
  if (!APPLY_OPEN) redirect(APPLY_PATH);
  return <SignupFlow mode="solo" />;
}
