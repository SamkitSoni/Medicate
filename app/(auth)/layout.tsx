import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/dark-mode/theme-provider";
import {ClerkProvider} from '@clerk/nextjs'
import {dark} from "@clerk/themes"

const fontSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight : ['300', '400', '500', '600', '700'],
  variable: '--font-sans'
 });

export const metadata: Metadata = {
  title: "Medicate",
  description: "A healthcare management system",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    appearance={{
      baseTheme: dark,
      variables: {
        colorPrimary: "#24AE7C",
        fontSize: '16px'
      }
    }}
    >
    <html lang="en">
      <body className={cn('min-h-screen bg-dark-300 font-sans antialiased flex justify-center items-center', fontSans.variable)}>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
          >
        {children}
        </ThemeProvider>
        
        </body>
    </html>
    </ClerkProvider>
  );
}
