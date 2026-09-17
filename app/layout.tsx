import "./globals.css";
import { Raleway, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import type { Metadata } from "next";

const ralewayHeading = Raleway({ subsets: ['latin'], variable: '--font-heading' });

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "Rent Nest",
  description: "Find your perfect rental property with RentNest.",
  icons: {
    icon: "/RentNestLogo.svg",
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", "font-sans", inter.variable, ralewayHeading.variable)}>
      {/* <head>
        <link rel="icon" type="image/svg" href="/RentNestLogo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Rent Nest</title>
      </head> */}
      <body className="min-h-full flex flex-col">
        {/* Navbar */}
        <Toaster position="top-right" richColors />
        {children}
      </body>
      {/* Footer */}
    </html>
  );
}
