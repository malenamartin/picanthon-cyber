import Link from "next/link";
import { SignupPaths } from "../components/SignupPaths";
import { APPLY_DEADLINE_FULL, APPLY_OPEN, PARTICIPANTS_EMAIL } from "../event";

export default function InscripcionPage() {
  return (
    <div className="wrap flow">
      <div className="flow-context">
        <p className="eyebrow">// {APPLY_OPEN ? "inscripciones abiertas" : "inscripciones cerradas"}</p>
        <h1 className="flow-title">{APPLY_OPEN ? "tu próximo build empieza acá." : "las inscripciones cerraron."}</h1>
        <p className="flow-intro">
          {APPLY_OPEN
            ? `Fecha límite: ${APPLY_DEADLINE_FULL}. Elegí cómo venís: con equipo o buscando uno.`
            : "Si ya te postulaste y tenés dudas sobre tu inscripción, podés escribirle a Ramiro."}
        </p>
      </div>
      <div className="flow-main">
        {APPLY_OPEN ? <SignupPaths /> : (
          <Link href="/#evento" className="btn btn-primary">ver el programa →</Link>
        )}
      </div>
      <div className="flow-aside">
        <p>¿Tenés alguna duda?</p>
        <a href={`mailto:${PARTICIPANTS_EMAIL}`} className="link-strong">
          hablá con Ramiro ↗
        </a>
      </div>
    </div>
  );
}
