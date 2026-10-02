import type { Metadata } from "next";
import { Playfair_Display, DM_Mono, Instrument_Sans, Caveat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-display",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-signature",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sahil Saini — Portfolio",
  description: "Personal portfolio of Sahil Saini, full-stack engineer and motion designer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmMono.variable} ${instrumentSans.variable} ${caveat.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
