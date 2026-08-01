import "./globals.css";
import { Raleway, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const ralewayHeading = Raleway({subsets:['latin'],variable:'--font-heading'});

const inter = Inter({subsets:['latin'],variable:'--font-sans'});


export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", "font-sans", inter.variable, ralewayHeading.variable)}>
      <body className="min-h-full flex flex-col">
        {/* Navbar */}
        <Toaster position="top-right" richColors />
        {children}
      </body>
      {/* Footer */}
    </html>
  );
}
