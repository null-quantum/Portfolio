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
  title: "Dhruvendra Patel — Junior Full-Stack Developer",
  description: "Junior Full-Stack Developer skilled in React, Node.js, TypeScript & AI-driven workflows. Explore case studies like the NutriFit Platform and MoneyFlow, plus live code demos.",
  keywords: ["Dhruvendra Patel", "dhruv", "Junior Full-Stack Developer", "React", "Node.js", "TypeScript", "Google Gemini", "Portfolio", "NutriFit", "MoneyFlow"],
  authors: [{ name: "Dhruvendra Patel" }],
  openGraph: {
    title: "Dhruvendra Patel — Junior Full-Stack Developer",
    description: "React, Node.js & AI-Driven Workflows. Case studies, live demos, and real code.",
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
