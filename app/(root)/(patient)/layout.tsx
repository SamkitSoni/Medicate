import { Plus_Jakarta_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/landingpage/Sidebar"; // Import Sidebar component

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export default function PatientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={cn(
        "min-h-screen bg-white dark:bg-dark-300 font-sans antialiased flex",
        fontSans.variable
      )}
    >
      {/* Sidebar Component */}
      <Sidebar />

      <div className="flex flex-col flex-1 md:ml-60 sm:ml-40">
        <main className="flex-1 w-full flex flex-col">
          <section
            className={cn(
              "flex-1 flex flex-col pb-6 max-md:pb-14",
              fontSans.variable
            )}
          >
            <div className={cn("font-sans antialiased w-full", fontSans.variable)}>
              {children}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
