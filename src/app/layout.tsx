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
  title: "Dhruvendra Patel — Web Developer (Frontend)",
  description: "Web Developer (Frontend) skilled in React, TypeScript, Tailwind CSS & AI integrations. Explore my deployed projects: NutriFit and MoneyFlow.",
  keywords: ["Dhruvendra Patel", "dhruv", "Web Developer", "Frontend Developer", "React", "TypeScript", "Portfolio", "NutriFit", "MoneyFlow"],
  authors: [{ name: "Dhruvendra Patel" }],
  openGraph: {
    title: "Dhruvendra Patel — Web Developer (Frontend)",
    description: "React · TypeScript · AI-Driven Web Apps. Deployed projects, live demos, and real code.",
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
