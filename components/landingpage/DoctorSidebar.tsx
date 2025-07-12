"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { doctorsidebarLinks } from "@/constants"; // Ensure this path is correct
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs"; // Assuming you are using Clerk for authentication

const DoctorSidebar = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { userId } = useAuth(); // Extract userId from Clerk's useAuth

  useEffect(() => {
    // Automatically redirect when the user is on the '/profile' route and requiresAuth is true
    const profileLink = doctorsidebarLinks.find((link) => link.route === "/profile");
    if (profileLink?.requiresAuth && pathname === "/profile" && userId) {
      router.push(`/doctor/${userId}/profile`);
    }
  }, [pathname, userId, router]);

  return (
    <>
      {/* Sidebar */}
      <section className={cn("fixed left-0 top-0 flex border-r-[0.3px] dark:border-dark-500 h-screen flex-col justify-between bg-dark-100 dark:bg-white dark:bg-dark-1 p-6 pt-28 text-gray-800 dark:text-white hidden sm:flex lg:w-[264px] z-10", className)}>
        <div className="flex flex-1 flex-col gap-6">
          {doctorsidebarLinks.map((item) => {
            const isActive = pathname === `/doctor/${userId}${item.route}`; // Determine if the link is active

            return (
              <Link href={`/doctor/${userId}${item.route}`} key={item.label} className={cn("flex justify-start items-center transition-all duration-200", { "bg-green-500 p-3 rounded-md": isActive })}>
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  width={24}
                  height={24}
                  className={cn("mr-2 transition-all duration-200", {
                    "brightness-0 invert": isActive,
                    "opacity-75 dark:brightness-0 dark:invert": !isActive,
                  })}
                />
                <p className={`text-lg font-semibold max-lg:hidden transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-800 dark:text-white'}`}>{item.label}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Bottom Navigation Bar for mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-200 p-4 border-t dark:border-gray-800 z-20 flex justify-around sm:hidden border-t-[0.3px] border-dark-500">
        {doctorsidebarLinks.map((item) => {
          const isActive = pathname === `/doctor/${userId}${item.route}`; // Determine if the link is active

          return (
            <Link
              href={`/doctor/${userId}${item.route}`}
              key={item.label}
              className={cn("flex flex-col items-center justify-center text-center p-2 rounded-md transition-all duration-200", {
                "bg-green-500 text-white": isActive,
                "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white": !isActive,
              })}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={24}
                height={24}
                className={cn("mb-1 transition-all duration-200", {
                  "brightness-0 invert": isActive,
                  "opacity-75 dark:brightness-0 dark:invert": !isActive,
                })}
              />
                <p className={`text-sm font-semibold transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-800 dark:text-white'}`}>{item.label}</p>
                </Link>
          );
        })}
      </div>
    </>
  );
};

export default DoctorSidebar;
