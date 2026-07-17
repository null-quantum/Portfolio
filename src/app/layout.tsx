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
  title: "Dhruvendra Patel — Developer Portfolio",
  description: "Dhruvendra Patel builds interactive, animated web apps with Next.js, React, TypeScript, Framer Motion, 3D and Prisma. Explore projects like the NutriFit Platform and try the live demos.",
  keywords: ["Dhruvendra Patel", "dhruv", "developer portfolio", "Next.js", "React", "TypeScript", "Framer Motion", "React 3D", "Prisma", "NutriFit"],
  authors: [{ name: "Dhruvendra Patel" }],
  openGraph: {
    title: "Dhruvendra Patel — Developer Portfolio",
    description: "Interactive projects, live code demos, and a 3D playground built with Next.js, React & TypeScript.",
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
