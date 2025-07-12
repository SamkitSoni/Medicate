import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-dark-1 py-8 border-t">
      <section className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row justify-between items-start lg:items-center">
        {/* Left Section: Logo and Copyright */}
        <div className="mb-6 lg:mb-0 flex flex-col lg:flex-row lg:items-center lg:gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-2 lg:mb-0">
            <Image
              src="/assets/icons/logo-icon.svg"
              alt="Medicate logo"
              width={42}
              height={42}
            />
            <span className="text-lg font-semibold">
              Medicate
            </span>
          </div>
          {/* Copyright */}
          <p className="text-gray-500 lg:ml-4">
            © copyright 2025. All rights reserved.
          </p>
        </div>

        {/* Right Section: Navigation Links */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {/* Legal Column */}
          <div className="text-white">
            <h3 className="font-bold text-gray-800 dark:text-white">Legal</h3>
            <ul className="mt-2 space-y-1">
              <li>
                <Link href="/privacy-policy" className="text-gray-500 hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="text-gray-500 hover:underline">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-gray-500 hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Register Column */}
          <div className="text-white">
            <h3 className="font-bold text-gray-800 dark:text-white">Doctors</h3>
            <ul className="mt-2 space-y-1">
              <li>
                <Link href="/doctor/register" className="text-gray-500 hover:underline">
                  Sign Up as a Doctor
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
