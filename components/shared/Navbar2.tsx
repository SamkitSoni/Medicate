import Image from "next/image"
import Link from "next/link"

const Navbar2 = () => {
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex w-full">
        <div className="flex items-center justify-start">
       <Link href="/">
       <Image src="/assets/icons/logo-full.svg" alt="Apple" width={150} height={150} />
       </Link>
        </div> 
      </nav>
    </header>
  )
}

export default Navbar2