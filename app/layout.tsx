import type { Metadata } from "next";
import { Archivo, Special_Gothic_Condensed_One, VT323, Space_Mono } from "next/font/google";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const specialGothic = Special_Gothic_Condensed_One({ weight: "400", subsets: ["latin"], variable: "--font-special-gothic", display: "swap" });
const vt323 = VT323({ weight: "400", subsets: ["latin"], variable: "--font-vt323", display: "swap" });
const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-space-mono", display: "swap" });

export const metadata: Metadata = {
  title: "The Nerd Company",
  description: "Automatización de productos y procesos digitales.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${specialGothic.variable} ${vt323.variable} ${spaceMono.variable}`}>
      <body><SmoothScroll>{children}</SmoothScroll></body>
    </html>
  );
}
