import type { Metadata } from "next";
import { Archivo, Special_Gothic_Condensed_One } from "next/font/google";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const specialGothic = Special_Gothic_Condensed_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-special-gothic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Nerd Company",
  description: "Something nerdy is coming.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${specialGothic.variable}`}>
      <body><SmoothScroll>{children}</SmoothScroll></body>
    </html>
  );
}
