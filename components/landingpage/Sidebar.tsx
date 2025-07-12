"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants"; // Assuming this is where sidebarLinks are defined
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs"; // Assuming you are using Clerk for authentication

const Sidebar = ({ className }: { className?: string }) => {
  const [subscribed] = useState(false)
  const pathname = usePathname();
  const { userId } = useAuth(); // Extract userId from Clerk's useAuth

  


  const getLinkProps = (item: { 
    label: string; 
    route: string; 
    imgURL: string; 
    requiresAuth?: boolean;
  }) => {

    if (item.label === "Add Records" && userId && subscribed ) {
      return {
        href: `/patients/${userId}/medical-records/add-medical-records`, // Dynamic route for adding medical records
        isActive: pathname === `/patients/${userId}/medical-records/add-medical-records`,
        classes: cn("flex gap-4 items-center p-4 rounded-lg justify-start", {
          "bg-green-500 ": pathname === `/patients/${userId}/medical-records/add-medical-records`,
        }),
      };
    }

    if(item.label === "Add Records" && userId && !subscribed){
      return {
        href: `/patients/${userId}/pricing`, // Dynamic route for adding medical records
        classes: cn("flex gap-4 items-center p-4 rounded-lg justify-start", {
          "bg-green-500 text-white": pathname === `/patients/${userId}/medical-records/add-medical-records`,
        }),
      };
    }


    if (item.label === "Reserve Slot" && userId) {
      return {
        href: `/patients/${userId}/new-appointment`, 
        isActive: pathname === `/patients/${userId}/new-appointment`,
        classes: cn("flex gap-4 items-center p-4 rounded-lg justify-start", {
          "bg-green-500": pathname === `/patients/${userId}/new-appointment`,
        }),
      };
    }

    // General link handling
    const href = item.requiresAuth && userId ? `/patients/${userId}/profile` : item.route;
    const isActive = pathname === href || pathname.startsWith(`${href}/`);

    return {
      href,
      isActive,
      classes: cn("flex gap-4 items-center p-4 rounded-lg justify-start", {
        "bg-green-500 text-white": isActive,
      }),
    };
  };

  return (
    <>
      {/* Sidebar */}
      <section className={cn("fixed left-0 top-0 flex h-screen flex-col justify-between dark:bg-dark-300 border-r-[0.3px] text-gray-800 dark:border-dark-500 p-6 pt-28 dark:text-white hidden z-10 sm:flex lg:w-[264px]", className)}>
        <div className="flex flex-1 flex-col gap-6">
          {sidebarLinks.map((item) => {
            const { href, isActive, classes } = getLinkProps(item);

            return (
              <Link href={href} key={item.label} className={classes}>
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  width={24}
                  height={24}
                  className={`transition-all duration-200 ${isActive ? "brightness-0 invert" : "dark:brightness-0 dark:invert brightness-100"}`}
                />
                <p className={`text-lg font-semibold max-lg:hidden transition-colors duration-200 ${isActive ? 'text-white dark:text-white' : 'text-gray-800 dark:text-white'}`}>{item.label}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Bottom Navigation Bar for mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-200 p-4 border-t dark:border-gray-800 z-20 flex justify-around sm:hidden">
  {sidebarLinks.map((item) => {
    const { href, isActive, classes } = getLinkProps(item); // Check if the current route is active

    return (
      <Link
        href={href}
        key={item.label}
        className={classes}
      >
        <Image
          src={item.imgURL}
          alt={item.label}
          width={24}
          height={24}
          className={`transition-all duration-200 ${isActive ? "brightness-0 invert" : "dark:brightness-0 dark:invert brightness-100"}`}
        />
        {/* <p className="text-sm font-semibold">{item.label}</p> */}
      </Link>
    );
  })}
</div>
    </>
  );
};

export default Sidebar;
