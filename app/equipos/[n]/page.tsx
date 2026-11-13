import { redirect } from "next/navigation";
import { TEAMS, slug } from "../data";

export const dynamicParams = false;

export function generateStaticParams() {
  return TEAMS.map((t) => ({ n: slug(t) }));
}

export default function EquipoPage() {
  redirect("/equipos");
}
