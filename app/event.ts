// ============================================================
// <picanthon> — datos del evento (fuente única de verdad)
// Editá acá y se actualiza en toda la landing, el schema y /llms.txt.
// ============================================================

/** Identidad pública del sitio. */
export const SITE_NAME = "Picanthon";
/** Nombre completo de esta edición. */
export const EVENT_NAME = "Picanthon Cyberseguridad 2026";
export const SITE_URL = "https://build101.dev";
export const CANONICAL_URL = `${SITE_URL}/`;
/** Imagen del preview del link: archivo estático app/opengraph-image.jpg (con su
 *  opengraph-image.alt.txt), mismo lenguaje que el flyer de redes. */
export const OG_IMAGE_URL = `${SITE_URL}/opengraph-image.jpg`;
// el logo de marca es el avatar "b_" que renderiza la ruta /icon en build.
export const LOGO_URL = `${SITE_URL}/icon`;

/** Metadata principal para buscadores (~155 caracteres, sin cortes en SERP). */
export const SEO_TITLE =
  "Picanthon Cyberseguridad 2026 | Buenos Aires";
export const SEO_DESCRIPTION =
  "Picanthon Cyberseguridad 2026 es la hackathon de ciberseguridad. El sábado 5 de diciembre, de 9 a 21 hs, en las oficinas de Safe U en Buenos Aires.";

/** Descripción larga para datos estructurados (Event) y answer engines. */
export const EVENT_DESCRIPTION =
  "Picanthon Cyberseguridad 2026 es una hackathon de ciberseguridad, presencial, en las oficinas de Safe U en Buenos Aires. El sábado 5 de diciembre de 2026, de 9 a 21 hs, los equipos buscan fallas, construyen una defensa y la muestran funcionando.";

/** Acompañamiento a los equipos, compartido por la landing y /llms.txt. */
export const MENTORS_DESCRIPTION =
  "Durante el sábado, los equipos cuentan con mentores para intercambiar ideas, resolver dudas y avanzar con sus proyectos.";

/** Última actualización de contenido del sitio (bumpeala con cada anuncio real:
 *  consigna, mentores, jurado, sponsors, cronograma, prensa). Alimenta sitemap y schema. */
export const CONTENT_UPDATED_ISO = "2026-10-30T00:00:00-03:00";

/** ¿Están abiertas las inscripciones?
 *  En `false` la landing no linkea al formulario: los CTAs, la terminal, el FAQ,
 *  el schema y /llms.txt anuncian el cierre, y /api/inscripcion rechaza
 *  envíos. */
export const APPLY_OPEN: boolean = false;

// Copy del cierre — un solo lugar para editar el anuncio.
export const APPLY_CLOSED_LABEL = "inscripciones cerradas";
export const APPLY_CLOSED_MESSAGE = "Las inscripciones están cerradas. Gracias por el interés en picanthon.";

/** Ruta del formulario propio (elegir camino: con equipo o buscando uno). */
export const APPLY_PATH = "/inscripcion";
export const APPLY_URL = `${SITE_URL}${APPLY_PATH}`;

/** Redes oficiales: se muestran en el footer y alimentan schema.org sameAs
 *  (consolidan la entidad picanthon). */
export const SOCIALS = [
  { key: "instagram", label: "Instagram", handle: "@picantestartups", url: "https://www.instagram.com/picantestartups/" },
  { key: "linkedin", label: "LinkedIn", handle: "Picante", url: "https://www.linkedin.com/company/picant-e/" },
  { key: "web", label: "Web", handle: "picante.fund", url: "https://www.picante.fund/" },
] as const;
export const SOCIAL_PROFILES: string[] = SOCIALS.map((s) => s.url);

/** Sede: oficinas de Safe U en Buenos Aires. El pin es el de la ciudad;
 *  la calle exacta de la oficina no está confirmada. */
export const VENUE = "Oficinas Safe U";
export const VENUE_SHORT = "Safe U";
export const VENUE_ADDRESS = "Buenos Aires";
export const VENUE_LOCALITY = "Buenos Aires";
export const VENUE_REGION = "Buenos Aires";
export const VENUE_COUNTRY = "AR";
export const VENUE_POSTAL_CODE = "";
export const VENUE_GEO = { lat: -34.6037, lng: -58.3816 };
export const VENUE_MAPS =
  "https://www.google.com/maps/search/?api=1&query=Oficinas+Safe+U+Buenos+Aires";

/** Sábado 5 de diciembre de 2026. El domingo no se usa. */
export const EVENT_DATES = "sáb 5 dic 2026";
export const EVENT_DATES_LONG = "sábado 5 de diciembre de 2026, de 9 a 21 hs";
export const EVENT_HOURS = "9 a 21 hs";
export const EVENT_START_DATE = "2026-12-05";

/** Apertura y cierre del mismo sábado. */
export const EVENT_KICKOFF_ISO = "2026-12-05T09:00:00-03:00";
export const EVENT_END_ISO = "2026-12-05T21:00:00-03:00";
/** Cierre de código del domingo: fin de la ventana de /wrapped (totales,
 *  "a último minuto"); lo que se commiteó después no cuenta. El script de
 *  ingesta lo lee de acá y se puede pisar en cada corrida con
 *  `CIERRE=HH:MM npm run metrics`. */
export const CODE_FREEZE_ISO = "2026-12-05T21:00:00-03:00";

/** Un solo día. La sede cierra a la noche. */
export const SCHEDULE = [
  {
    day: "sábado 5",
    hours: "09:00 a 21:00",
    note: "Nos encontramos, construimos y mostramos.",
  },
];

/** Quién organiza esta edición, en el orden del anuncio. */
export const ORGANIZERS = [
  { name: "Safe U" },
  { name: "Faraday", url: "https://faradaysec.com" },
  { name: "Talo Pay", url: "https://talo.com.ar" },
  { name: "Fardo", url: "https://www.heyfardo.com" },
  { name: "Picante", url: "https://www.picante.fund/" },
] as const;

/** Inscripciones: cierre. */
export const APPLY_DEADLINE_ISO = "2026-10-09T23:59:00-03:00";
export const APPLY_DEADLINE = "9 de octubre";
/** Hora de cierre (hora de Uruguay). Mostrarla siempre junto a la fecha. */
export const APPLY_DEADLINE_TIME = "23:59 hs";
/** Fecha y hora de cierre, para cualquier texto que hable del límite. */
export const APPLY_DEADLINE_FULL = `${APPLY_DEADLINE}, ${APPLY_DEADLINE_TIME}`;

/** ¿Se puede enviar una inscripción ahora? `APPLY_OPEN` y además antes del
 *  cierre (se acepta hasta el final del minuto 23:59). La API lo chequea en
 *  cada envío y el formulario al abrirse, así el cierre es automático aunque
 *  nadie cambie `APPLY_OPEN`. Las páginas estáticas (textos de la landing)
 *  siguen dependiendo de `APPLY_OPEN`: pasalo a `false` después del cierre. */
export function isApplyOpen(now = Date.now()) {
  return APPLY_OPEN && now < Date.parse(APPLY_DEADLINE_ISO) + 60_000;
}

/** Formato. */
export const TEAM_SIZE = "3";
/** Equipos que compiten. */
export const TEAMS_TOTAL = 13;

/** Organizadores. El orden es el de la landing (participantes · mentores ·
 *  sponsors). Los mails se muestran solo en el footer. */
export const TEAM = [
  {
    key: "ramiro",
    name: "Ramiro",
    role: "Participants Lead",
    area: "participants",
    email: "ramiro@build101.dev",
    linkedin: "https://www.linkedin.com/in/ramiro-colo-martinez/",
    photo: "/team/ramiro.webp",
    school: { name: "Universidad de Montevideo", detail: "Software Engineering", logo: "/team/um.png" },
    work: { name: "OrderEAT", detail: "Product Engineer", logo: "/team/ordereat.jpg" },
  },
  {
    key: "bruno",
    name: "Bruno",
    role: "Mentors Lead",
    area: "mentors",
    email: "bruno@build101.dev",
    linkedin: "https://www.linkedin.com/in/bruno-ramos-um/",
    photo: "/team/bruno.webp",
    school: { name: "Universidad de Montevideo", detail: "Software Engineering", logo: "/team/um.png" },
    work: { name: "Horizon", detail: "AI Product Engineer", logo: "/team/horizon.jpg" },
  },
  {
    key: "mateo",
    name: "Mateo",
    role: "Sponsors Lead",
    area: "sponsors",
    email: "mateo@build101.dev",
    linkedin: "https://www.linkedin.com/in/mateovidalsilva/",
    photo: "/team/mateo.webp",
    school: { name: "Universidad de la República", detail: "Electrical Engineering", logo: "/team/udelar-fing.jpg" },
    work: { name: "nBlock", detail: "Founding Engineer", logo: "/team/nblock.jpg" },
  },
] as const;

export const TEAM_EMAILS = TEAM.map((p) => p.email);

/** Mail de esta edición. Es el que abre “escribir a equipo picante”. */
export const PICANTE_EMAIL = "fgir@picante.fun";

/** Founders de Picante. Solo alimentan el bloque “también invertimos”. */
export const FOUNDERS = [
  {
    key: "ades",
    name: "Federico Ades",
    role: "Founder",
    photo: "/team/fede-ades.webp",
    linkedin: "https://www.linkedin.com/company/picant-e/",
    note: "Picante",
  },
  {
    key: "gir",
    name: "Federico Gir",
    role: "Founder",
    photo: "/team/fede-gir.webp",
    linkedin: "https://www.linkedin.com/in/federicogir/",
    note: "Picante",
  },
] as const;

/** Jurado. El orden es a propósito: la grilla va de a 4 (3 en tablet, 2 en
 *  el celular), así que la primera fila es lo que más se ve. Arriba, los
 *  nombres que más pesan para un builder: los founders de PedidosYa y
 *  Nowports, el Centro Nacional de IA y el decano de la casa (FIUM coorganiza).
 *  Después se alternan producto/tech, inversión e IA aplicada, sin dos de la
 *  misma empresa juntos. `role` es el cargo principal y `note` lo que se suma
 *  (ex cargos, angel investor). Fotos: recortes sin fondo de 360×360 en
 *  public/jury/, encuadrados como los de public/team/. */
type Juror = {
  key: string;
  name: string;
  role: string;
  note?: string;
  linkedin?: string;
};

export const JURY: readonly (Juror & { photo: string })[] = (
  [
    {
      key: "ruben",
      name: "Ruben Sosenke",
      role: "Co-founder PedidosYa (ex CTO)",
      note: "Angel Investor",
      linkedin: "https://www.linkedin.com/in/rsosenke/",
    },
    {
      key: "maximiliano",
      name: "Maximiliano Casal",
      role: "Co-founder & CEO Nowports",
      note: "Presidente Endeavor Uruguay · Angel Investor",
      linkedin: "https://www.linkedin.com/in/maxicasal/",
    },
    {
      key: "matias",
      name: "Matías Di Martino",
      role: "CSO Instituto Vidart",
      note: "Centro Nacional de IA",
      linkedin: "https://www.linkedin.com/in/j-matias-di-martino-7a6582170/",
    },
    {
      key: "rafael",
      name: "Rafael Sotelo",
      role: "Decano FIUM",
      note: "Universidad de Montevideo",
      linkedin: "https://www.linkedin.com/in/rafael-sotelo/",
    },
    {
      key: "juanjo",
      name: "Juan José Behrend",
      role: "Co-founder & CPTO Akua",
      note: "Angel Investor",
      linkedin: "https://www.linkedin.com/in/juanjosebehrend/",
    },
    {
      key: "federico",
      name: "Federico Gir",
      role: "Co-founder Picante",
      note: "Angel Investor",
      linkedin: "https://www.linkedin.com/in/federicogir/",
    },
    {
      key: "maria",
      name: "María Michelena",
      role: "Co-founder InGenia",
      note: "Angel Investor",
      linkedin: "https://www.linkedin.com/in/mariamichelena/",
    },
    {
      key: "santiago",
      name: "Santiago García da Rosa",
      role: "CTO Lynk Markets",
      note: "ex CTO Nowports",
      linkedin: "https://www.linkedin.com/in/santiago-garc%C3%ADa-da-rosa-3441623a/",
    },
    {
      key: "fernando",
      name: "Fernando Suzacq",
      role: "Co-founder & CEO Pento",
      linkedin: "https://www.linkedin.com/in/fsuzacq/",
    },
    {
      key: "florencia",
      name: "Florencia Polcaro",
      role: "Co-founder & COO BigCheese",
      linkedin: "https://www.linkedin.com/in/florenciapolcaro/",
    },
    {
      key: "ignacio",
      name: "Ignacio Acuña",
      role: "Co-founder & CTO Promtior",
      note: "ex CTO Urudata",
      linkedin: "https://www.linkedin.com/in/ignacioacuna7b88384b/",
    },
    {
      key: "esteban",
      name: "Esteban Salsano",
      role: "CEO odev.tech",
      note: "Angel Investor",
      linkedin: "https://www.linkedin.com/in/esteban-salsano/",
    },
  ] satisfies Juror[]
).map((j) => ({ ...j, photo: `/jury/${j.key}.webp` }));

/** Contactos por intención. */
export const PARTICIPANTS_EMAIL = TEAM[0].email;
export const MENTORS_EMAIL = TEAM[1].email;
export const SPONSORS_EMAIL = TEAM[2].email;

/** Contacto principal: donde la UI o el schema muestran un solo mail. */
export const CONTACT_EMAIL = PARTICIPANTS_EMAIL;
