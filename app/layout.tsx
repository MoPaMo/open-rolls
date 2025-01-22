import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Quintessential, Almendra_SC, Uncial_Antiqua } from "next/font/google";

const quintessential = Quintessential({
  subsets: ["latin"],
  variable: "--font-quintessential",
  weight: "400",
});

const almendraSC = Almendra_SC({
  variable: "--font-almendra-sc",
  subsets: ["latin"],
  weight: "400",
});
const uncialAntiqua = Uncial_Antiqua({
  variable: "--font-ua",
  subsets: ["latin"],
  weight: "400",
});
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "OpenRolls",
  description: "Open Source DnD Character Creator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${quintessential.variable} ${almendraSC.variable} ${uncialAntiqua.variable} antialiased`}
      >
        <div className="p-2">{children}</div>
      </body>
    </html>
  );
}
