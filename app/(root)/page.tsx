import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Video from '@/components/shared/Video';
import Footer from '@/components/shared/Footer';
import { HoverEffect } from '@/components/ui/card-hover-effect';
import { projects } from '@/constants';
import { TimelineDemo } from '@/components/shared/TimelineDemo';

const Home = async() => {
  const user = await currentUser()
  if(!user){
    return redirect('/sign-in')
  }
  return (
    <>
    <section className="w-full flex flex-col md:flex-row justify-start gap-5 -mt-10 md:mt-0">
      {/* Left Section */}
      <div className="flex-1 mt-10 p-3 sm:p-12">
        <h1 className="text-3xl sm:text-4xl text-gray-800 dark:text-white font-bold max-w-[570px] text-left transition-colors duration-200">
          What If Today&apos;s Delay Becomes Tomorrow&apos;s Emergency?
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-300 max-w-[570px] mt-4 transition-colors duration-200">
          Don&apos;t gamble with your health. Get the care you need—fast, reliable, and right when you need it. Because every second matters.
        </p>

        <div className=' sm:mt-8 mt-5'>
          <Link href="patients/register">
          <Button className='text-xl text-white py-6 bg-green-500 hover:bg-green-400 shadow-xl transition-all duration-200 hover:shadow-2xl transform hover:-translate-y-1'>Book Appointment</Button>
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex flex-col gap-3 items-center justify-center p-4 sm:p-12 rounded-lg">
        {/* Video Section */}
        <div className="w-full h-40 sm:h-64 rounded-lg flex items-center justify-center">
          <Video
            src="/assets/videos/hero-video.mp4"
            className="w-full max-w-5xl rounded-2xl"
          />    
        </div>

        {/* Gradient Boxes Section */}
        <div className="w-full grid grid-cols-2 text-center gap-4 items-center justify-center">
          {/* Box 1 */}
          <div className="relative h-80 w-75">
           {/* Image */}
           <Image
             src="/assets/images/hero-img1.jpeg"
             layout="fill"
             objectFit="cover"
             alt="hero image"
             className="absolute inset-0 rounded-lg"
           />
         </div>

          {/* Box 2 */}
          <div className="relative h-80 w-75">
           {/* Image */}
           <Image
             src="/assets/images/hero-img2.webp"
             layout="fill"
             objectFit="cover"
             alt="hero image"
             className="absolute inset-0 rounded-lg"
           />
         </div>
        </div>
      </div>
    </section>
   
   <div>
    <h1 className='text-4xl text-center font-bold mt-10'>
      Why We are Best For You ?
    </h1>
    <HoverEffect items={projects} />
   </div>
   
   <div className="-mt-8">
    <TimelineDemo/>
   </div>

    <div>
      <Footer/>
    </div>
    </>
  );
};

export default Home;
