import Footer from '@/components/landingpage/Footer';
import React from 'react'

const Subscription = async({ params }: { params: { doctorId: string } }) => {
  console.log('Doctor subscription page for:', params.doctorId); // TODO: Implement subscription functionality
  return (
    <section className='flex flex-col w-full min-h-screen justify-center items-center'>
       <div className='w-full m-5'>
         <h1 className='font-bold text-center w-full text-green-500 text-4xl sm:text-5xl'>
          Get patient trust <br/> and build a strong relationship bond.
         </h1>
         <h3 className='font-semibold text-green-500 dark:text-white text-center w-full mt-5 text-xl sm:text-2xl px-3'>
          Choose the plan, build strong bond and skyrocket your sales.
         </h3>
        </div>
       <div className='w-full mt-5 p-8'>
         <div className='text-center text-gray-600 dark:text-gray-400'>
           <p className='text-lg'>Subscription functionality is currently unavailable.</p>
           <p className='mt-2'>Please contact support for more information.</p>
         </div>
       </div>
       <div>
       {/* <Reviews/> */}
       </div>
       <div className='w-full'>
        <Footer/>
       </div>
    </section>
  )
}

export default Subscription