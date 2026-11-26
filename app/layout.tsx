import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import {
  CANONICAL_URL,
  SITE_NAME,
  SITE_URL,
} from "./event";
import "./globals.css";

// Tres voces: Instrument Serif para la tapa y los titulares, Geist Sans para
// leer, Geist Mono para hora, sede, comandos y labels.
const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  keywords: [
    "picathon",
    "Picathon Cyberseguridad 2026",
    "hackathon ciberseguridad",
    "hackathon buenos aires",
    "ciberseguridad",
    "safe u",
    "seguridad ofensiva",
  ],
  authors: [{ name: SITE_NAME, url: CANONICAL_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "event",
};

// El sitio es oscuro siempre: un solo themeColor, sin variante por sistema.
export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // Un solo tema: el color sale de los tokens del CSS, así que no hay script
    // de pre-paint, ni data-theme, ni riesgo de flash de tema equivocado.
    <html lang="es-AR" className={`${sans.variable} ${mono.variable} ${display.variable}`}>
      <body>
        <a className="skip-link" href="#contenido">Saltar al contenido</a>
        {children}
      </body>
    </html>
  );
}
