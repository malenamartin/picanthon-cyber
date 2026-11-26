import { pageMetadata } from "../../page-metadata";
import { redirect } from "next/navigation";
import { SignupFlow } from "../../components/SignupFlow";
import { APPLY_OPEN, APPLY_PATH } from "../../event";

export const metadata = pageMetadata(
  "/inscripcion/equipo",
  "Inscribí a tu equipo | Picathon Cyberseguridad 2026",
  "Anotá a tus tres integrantes en Picathon Cyberseguridad 2026 en Buenos Aires.",
);

export default function EquipoPage() {
  if (!APPLY_OPEN) redirect(APPLY_PATH);
  return <SignupFlow mode="team" />;
}
