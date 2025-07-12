import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='flex flex-col sm:flex-row justify-between items-center  dark:text-white p-4 text-center w-full bottom-0 '>
    <div>
    <Image
       src="/assets/icons/logo-icon.svg"
       alt="logo"
       width={100}
       height={50}
       className="h-10 w-[150px] sm:w-[200px] mx-auto"
     />
    </div>
     <div className="mt-4 space-x-4">
       <Link href="/privacy-policy" className="hover:underline text-sm">Privacy Policy</Link>
       <Link href="/terms-and-conditions" className="hover:underline text-sm">Terms and Conditions</Link>
       <Link href="/refund-policy" className="hover:underline text-sm">Refund Policy</Link>
     </div>
   </footer>
  )
}

export default Footer