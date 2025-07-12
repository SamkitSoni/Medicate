import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../../../app/globals.css";
import { cn } from "@/lib/utils";
import DoctorSidebar from "@/components/landingpage/DoctorSidebar";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Medicate",
  description: "A healthcare management system",
};

export default function DoctorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className={cn("min-h-screen bg-white dark:bg-dark-300 font-sans antialiased", fontSans.variable)}>
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar for Desktop */}
        <DoctorSidebar />

        <main className="flex-1 min-h-screen lg:ml-64"> {/* Adjust margin-left to accommodate sidebar width */}
          <div className="fixed top-0 left-0 right-0 z-40">
            {/* <Navbar /> */}
          </div>

          <div className="pt-16"> {/* Add padding-top to avoid overlap with fixed navbar */}
            <section className="flex flex-col pb-6 max-md:pb-14">
              <div className={cn("font-sans antialiased w-full", fontSans.variable)}>
                {children}
              </div>
            </section>
          </div>
        </main>
      </div>
    </section>
  );
}
