// src/app/layout.tsx
import "@/styles/theme-variables.css";
import "@/app/globals.css";
import type { Metadata, Viewport } from "next";
import {
  Inter,
  Manrope,
  JetBrains_Mono,
  Space_Grotesk,
  Space_Mono,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
} from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin", "latin-ext"],
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-ibm-plex-sans",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "Portfolio - Fullstack Developer & DevOps Engineer",
  description:
    "Zaawansowane portfolio techniczne prezentujące umiejętności w zakresie fullstack developmentu i inżynierii DevOps.",
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "DevOps",
    "Fullstack",
    "Developer",
    "Portfolio",
  ],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground font-sans antialiased",
          inter.variable,
          manrope.variable,
          jetbrainsMono.variable,
          spaceGrotesk.variable,
          spaceMono.variable,
          ibmPlexSans.variable,
          ibmPlexMono.variable
        )}
      >
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
