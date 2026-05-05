import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Nerd Company",
  description: "Something nerdy is coming. Get early access.",
  openGraph: {
    title: "The Nerd Company",
    description: "Something nerdy is coming. Get early access.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
