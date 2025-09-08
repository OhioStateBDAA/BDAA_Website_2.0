import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Anaheim, Courier_Prime } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anaheim = Anaheim({
  subsets: ["latin"],
  variable: "--font-primary",
  weight: ["400"],
  display: "swap",
});

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BDAA",
  description: "Big Data Analytics Association at The Ohio State University - Inspiring students to think analytically and connecting them to data analytics opportunities.",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/BDAALogo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${anaheim.variable} ${courierPrime.variable} antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
