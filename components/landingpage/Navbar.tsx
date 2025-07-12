"use client"
import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun } from "lucide-react"
import { Button } from '../ui/button';

const Navbar = () => {
  const { setTheme } = useTheme()

  return (
    <div className="flex-between fixed z-50 w-full bg-white dark:bg-dark-300 border-b-[0.3px] dark:border-dark-500 px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/icons/logo-icon.svg"
          width={32}
          height={32}
          alt="logo"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-green-500 dark:text-white max-sm:hidden">
          Medicate
        </p>
      </Link>
      <div className="flex-between gap-5">
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className='focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-gray-300 dark:border-dark-500 bg-white dark:bg-dark-400 hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors duration-200'>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-gray-800 dark:text-gray-200" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-gray-800 dark:text-gray-200" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className='bg-white dark:bg-dark-400 dark:border-dark-500 border-gray-300'>
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className="cursor-pointer text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors duration-200"
        >
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="cursor-pointer text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors duration-200"
        >
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className="cursor-pointer text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors duration-200"
        >
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
        {/* Render placeholder or loading state to avoid mismatches */}
        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
