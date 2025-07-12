import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/dark-mode/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import ClientLayout from "./ClientLayout";
import Navbar from "@/components/landingpage/Navbar";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Medicate",
  description: "A healthcare management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-white dark:bg-dark-300 font-sans antialiased flex flex-col",
            fontSans.variable
          )}
        >
          <ThemeProvider>
            <Navbar />
            <main className="flex-1 min-h-screen w-full">
              <ClientLayout>
                <section className={cn("flex min-h-screen flex-1 flex-col pb-6 pt-28 max-md:pb-14 sm:px-8", fontSans.variable)}>
                  <div className={cn(
            "font-sans antialiased w-full",
            fontSans.variable
          )}>{children}</div>
                </section>
              </ClientLayout>
            </main>
            {/* <Footer /> */}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}