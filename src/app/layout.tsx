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
  title: "Dhruvendra Patel — Entry-Level Full-Stack Developer",
  description: "Entry-Level Full-Stack Developer | React, Next.js, TypeScript, Node.js & PostgreSQL. 6 months industry experience, 2+ deployed projects. Explore NutriFit and MoneyFlow.",
  keywords: ["Dhruvendra Patel", "dhruv", "Full-Stack Developer", "Entry-Level Developer", "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Portfolio", "NutriFit", "MoneyFlow"],
  authors: [{ name: "Dhruvendra Patel" }],
  openGraph: {
    title: "Dhruvendra Patel — Entry-Level Full-Stack Developer",
    description: "React · Next.js · TypeScript · Node.js · PostgreSQL. 6 months industry experience, 2+ deployed projects.",
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
