"use client";

import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // attempts to work around the rate limiting :')
      retryDelay: (attemptIndex) => 15000 + 10000 * attemptIndex,
      retry: 3,
      gcTime: 1000 * 60 * 60, // 1 hour cache
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Meero test</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={cn(
          "dark min-h-screen antialiased transition-all",
          inter.className,
          montserrat.variable
        )}
      >
        <QueryClientProvider client={queryClient}>
          <main className="m-auto min-h-screen max-w-7xl p-4 flex flex-col gap-4 lg:p-8 lg:gap-8">
            {children}
          </main>
        </QueryClientProvider>
        <Toaster richColors />
        <div className="fixed inset-[20%] block rounded-full bg-black/5 dark:bg-white/15 blur-3xl z-[-1]" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
