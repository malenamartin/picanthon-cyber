// Sponsors por categoría: única fuente para la sección visible
// (components/Sponsors.tsx), /llms.txt y el JSON-LD del evento
// (components/StructuredData.tsx). Lo que ve un agente al scrapear sale de acá,
// así que nunca diverge de lo que ve una persona.

export type Sponsor = {
  name: string;
  logo: string;
  /** Caja máxima del logo dentro de la tarjeta (px, desktop). */
  w: number;
  h: number;
  /** Logos blancos pensados para fondo oscuro: se invierten sobre la tarjeta blanca. */
  invert?: boolean;
  /** Web del sponsor: la tarjeta entera linkea ahí (en otra pestaña). */
  url?: string;
  /** Texto corto para el carrusel de partners e instituciones. */
  blurb?: string;
  /** Destacado dentro de su categoría: va en una fila propia arriba, con
   *  tarjeta y logo más grandes. */
  featured?: boolean;
  /** Logo alto (casi cuadrado): menos relleno vertical para que no quede chico
   *  en una tarjeta baja y ancha. */
  tight?: boolean;
  /** Ocupa una fila completa al final de su categoría. */
  fullWidth?: boolean;
};

export type Tier = {
  key: string;
  label: string;
  size: "gold" | "silver" | "partner" | "small";
  /** Columnas en desktop cuando no coinciden con las del tamaño (para que la fila quede completa). */
  cols?: 4 | 6 | 7;
  items: Sponsor[];
};

// Orden y agrupación definidos por el equipo. Partners = aportes en canje.
export const TIERS: Tier[] = [
  {
    key: "gold",
    label: "gold sponsors",
    size: "gold",
    items: [
      { name: "Toyota", logo: "/sponsors/toyota.svg", w: 158, h: 78, url: "https://www.toyota.com.uy" },
      { name: "Pento", logo: "/sponsors/pento-color.png", w: 158, h: 78, url: "https://pento.ai" },
      { name: "Santander", logo: "/sponsors/santander.svg", w: 158, h: 78, url: "https://www.santander.com.uy" },
      { name: "Nowports", logo: "/sponsors/nowports.png", w: 158, h: 78, url: "https://www.nowports.com" },
      { name: "odev.tech", logo: "/sponsors/odev.svg", w: 158, h: 78, url: "https://odev.tech" },
      { name: "Lynk Markets", logo: "/sponsors/lynk-markets.svg", w: 158, h: 78, url: "https://lynkmarkets.com" },
      { name: "Mozart", logo: "/sponsors/mozart.svg", w: 158, h: 78, url: "https://mozarth.com" },
      { name: "Arnaldo Castro", logo: "/sponsors/arnaldo-castro.svg", w: 158, h: 78, url: "https://arnaldocastro.com.uy" },
      { name: "Estudio Silva Manta y Asociados", logo: "/sponsors/silva-manta.svg", w: 180, h: 90, tight: true },
      { name: "Instituto Vidart", logo: "/sponsors/vidart.svg", w: 158, h: 78, url: "https://vidart.uy", fullWidth: true },
    ],
  },
  {
    key: "silver",
    label: "silver sponsors",
    size: "silver",
    items: [
      { name: "INIT", logo: "/sponsors/init.svg", w: 150, h: 50, url: "https://init.uy" },
      { name: "IEEE", logo: "/sponsors/ieee.svg", w: 150, h: 50, url: "https://r9.ieee.org/uruguay/" },
      { name: "akua", logo: "/sponsors/akua.svg", w: 150, h: 50, url: "https://akua.la" },
      { name: "OrderEAT", logo: "/sponsors/ordereat.svg", w: 140, h: 27, url: "https://www.ordereat.com" },
      { name: "Horizon", logo: "/sponsors/horizon.svg", w: 140, h: 27, url: "https://usehorizon.ai" },
      { name: "Promtior", logo: "/sponsors/promtior.svg", w: 150, h: 27, url: "https://www.promtior.ai" },
    ],
  },
  {
    key: "partners",
    label: "partners",
    size: "partner",
    cols: 4,
    items: [
      { name: "Kiro", logo: "/sponsors/kiro.png", w: 140, h: 55, url: "https://kiro.dev", tight: true, blurb: "Entorno para construir con agentes. Sirve para pasar de una hipótesis de ataque a un prototipo que se puede mostrar." },
      { name: "nBlock", logo: "/sponsors/nblock.png", w: 128, h: 34, url: "https://www.nblock.ai", blurb: "Plataforma de agentes de IA para operar sobre los sistemas que una organización ya tiene." },
      { name: "Lazo", logo: "/sponsors/lazo.png", w: 128, h: 34, url: "https://www.lazo.us", blurb: "Backoffice legal y financiero para startups de la región que necesitan operar en Estados Unidos." },
      { name: "Neocard", logo: "/sponsors/neocard.png", w: 158, h: 34, url: "https://www.neocard.com.uy", blurb: "Pagos y tarjetas para empresas que cobran en Uruguay y tienen que cuidar esa superficie." },
      { name: "Flai", logo: "/sponsors/flai.svg", w: 80, h: 34, url: "https://www.useflai.com", blurb: "Agentes de voz que atienden, venden y resuelven. Un canal más que también hay que asegurar." },
      { name: "Picante", logo: "/sponsors/picante.png", w: 116, h: 42, url: "https://www.picante.fund/", blurb: "Fondo que financia y acelera a founders jóvenes de Latinoamérica, desde el principio." },
      { name: "Tenki", logo: "/sponsors/tenki.svg", w: 128, h: 34, url: "https://tenki.cloud", blurb: "Cómputo en la nube para entrenar y correr cargas pesadas sin armar un cluster propio." },
      { name: "Xiaomi", logo: "/sponsors/xiaomi.png", w: 44, h: 44, url: "https://www.mi.com/latin-es/", tight: true, blurb: "Dispositivos conectados. Cada uno suma una superficie que alguien tiene que defender." },
      { name: "Vercel Security", logo: "", w: 0, h: 0, url: "https://vercel.com/security", blurb: "Firewall, protección de bots y controles para lo que se despliega. La capa de seguridad de la plataforma." },
      { name: "AI Gateway", logo: "", w: 0, h: 0, url: "https://vercel.com/docs/ai-gateway", blurb: "Un solo acceso a cientos de modelos. Menos llaves sueltas y un lugar donde mirar qué se está llamando." },
      { name: "Sandbox", logo: "", w: 0, h: 0, url: "https://vercel.com/docs/sandbox", blurb: "Entornos aislados para correr código que no escribiste vos. Útil cuando el hallazgo hay que reproducirlo." },
    ],
  },
  {
    key: "instituciones",
    label: "instituciones que nos apoyan",
    size: "partner",
    cols: 4,
    items: [
      { name: "Embajada de EE.UU. en Uruguay · Freedom 250", logo: "/sponsors/freedom250.png", w: 120, h: 72, url: "https://uy.usembassy.gov", tight: true, blurb: "La embajada acompaña iniciativas que acercan tecnología y colaboración entre Uruguay y Estados Unidos." },
      { name: "Urucap", logo: "/sponsors/urucap.png", w: 150, h: 40, url: "https://www.urucap.org", blurb: "Fondo de capital de riesgo de Uruguay. Invierte en compañías tecnológicas del país." },
      { name: "ANII", logo: "/sponsors/anii.png", w: 104, h: 28, url: "https://www.anii.org.uy", blurb: "Agencia nacional que financia investigación, innovación y emprendimientos de base tecnológica." },
      { name: "Club del Inversor", logo: "/sponsors/club-del-inversor.png", w: 150, h: 40, url: "https://www.clubdelinversor.uy", blurb: "Comunidad de inversores ángeles que mira proyectos tempranos y los conecta con capital." },
      { name: "CUTI", logo: "/sponsors/cuti.svg", w: 150, h: 40, url: "https://cuti.org.uy", blurb: "La cámara de la industria TI uruguaya. Reúne a las empresas que construyen software en el país." },
      { name: "Initium · Universidad de Montevideo", logo: "/sponsors/initium.png", w: 150, h: 39, url: "https://www.um.edu.uy/initium", blurb: "Incubadora de la Universidad de Montevideo. Acompaña equipos que están empezando." },
      { name: "Ingenio · incubadora del LATU", logo: "/sponsors/ingenio.svg", w: 132, h: 40, invert: true, url: "https://ingenio.org.uy", blurb: "Incubadora del LATU. Espacio para proyectos tecnológicos que necesitan techo y red." },
      { name: "Instituto CPE", logo: "/sponsors/instituto-cpe.png", w: 130, h: 48, url: "https://institutocpe.edu.uy", blurb: "Formación en tecnología y negocios. De ahí salen varias de las personas que construyen en la plaza." },
      { name: "Vercel Docs", logo: "", w: 0, h: 0, url: "https://vercel.com/docs", blurb: "La documentación para desplegar, observar y asegurar lo que el equipo deja funcionando el sábado." },
      { name: "Knowledge Base", logo: "", w: 0, h: 0, url: "https://vercel.com/kb", blurb: "Guías cortas de la plataforma: de un error de deploy a cómo se configura un control de seguridad." },
    ],
  },
];
