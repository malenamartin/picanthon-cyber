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

// Esta edición todavía no tiene sponsors confirmados. Las categorías quedan
// armadas y vacías: cuando se confirmen, se cargan acá y aparecen en la página,
// en /llms.txt y en el schema.
export const TIERS: Tier[] = [
  { key: "gold", label: "gold sponsors", size: "gold", items: [] },
  { key: "silver", label: "silver sponsors", size: "silver", items: [] },
  { key: "partners", label: "partners", size: "partner", cols: 4, items: [] },
  { key: "instituciones", label: "instituciones que nos apoyan", size: "partner", cols: 4, items: [] },
];
