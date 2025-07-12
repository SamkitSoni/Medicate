import Footer from '@/components/landingpage/Footer';
import Subscribe from '@/components/payments/Subscribe'
import { getDoctorById } from '@/lib/actions/doctor.actions';
import React from 'react'

interface Doctor {
  name: string;
  email: string;
  phone: string;
  address: string;
  doctorId:string;
}

const Subscription = async({ params }: { params: { doctorId: string } }) => {
  const doctor: Doctor = await getDoctorById(params.doctorId);
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
       <div className='w-full mt-5'>
       <Subscribe doctor={doctor}/>
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