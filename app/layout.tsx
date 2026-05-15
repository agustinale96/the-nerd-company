import type { Metadata } from "next";
import { Archivo, Special_Gothic_Condensed_One, Space_Mono } from "next/font/google";
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const specialGothic = Special_Gothic_Condensed_One({ weight: "400", subsets: ["latin"], variable: "--font-special-gothic", display: "swap" });
const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-space-mono", display: "swap" });

export const metadata: Metadata = {
  title: "The Nerd Company",
  description: "Automatización de productos y procesos digitales.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${specialGothic.variable} ${spaceMono.variable}`}>
      <body>
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
