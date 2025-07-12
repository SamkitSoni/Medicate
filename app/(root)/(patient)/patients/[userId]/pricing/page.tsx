import Footer from '@/components/landingpage/Footer';
import { getPatientById } from '@/lib/actions/patient.action';
import { redirect } from 'next/navigation';
import React from 'react'

interface Patient {
  subscription: {
    basicPlan?: boolean;
    eliteCarePremier?: boolean;
    expertCarePlus?: boolean;
    plus?: boolean;
    premium?: boolean;
  };
  name: string; 
  email: string;
  phone: string;
  address: string;
  userId:string;
}

const pricing = async({ params }: { params: { userId: string } }) => {
  const patient: Patient = await getPatientById(params.userId);
  if(patient.subscription.plus || patient.subscription.premium === true){
    redirect(`/patients/${params.userId}/medical-records/add-medical-records`)
  }
  
  return (
    <section className='flex flex-col w-full min-h-screen justify-center items-center'>
       <div className='w-full m-5'>
         <h1 className='font-bold text-center w-full text-gray-800 dark:text-white text-4xl sm:text-5xl'>
         Be our premium member <br/> and leverage our plateform more efficiently.
         </h1>
         <h3 className='font-semibold  text-gray-800 dark:text-white text-center w-full mt-5 text-xl sm:text-2xl px-3'>
          Get started with a plan.
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

export default pricing