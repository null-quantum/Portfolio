import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jb-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dhruvendra Patel — Entry-Level Frontend Developer",
  description: "Entry-Level Frontend Developer | React, Next.js, TypeScript & Tailwind CSS. 6 months industry experience, 2+ deployed projects. Explore NutriFit and MoneyFlow.",
  keywords: ["Dhruvendra Patel", "dhruv", "Frontend Developer", "Entry-Level Developer", "React", "Next.js", "TypeScript", "Tailwind CSS", "Portfolio", "NutriFit", "MoneyFlow"],
  authors: [{ name: "Dhruvendra Patel" }],
  metadataBase: new URL("https://portfolio-quantnull.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dhruvendra Patel — Entry-Level Frontend Developer",
    description: "React · Next.js · TypeScript · Tailwind CSS. 6 months industry experience, 2+ deployed projects.",
    url: "https://portfolio-quantnull.vercel.app",
    siteName: "Dhruvendra Patel — Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
