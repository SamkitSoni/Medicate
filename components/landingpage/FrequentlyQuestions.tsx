import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const FrequentlyQuestions = () => {
  const router = useRouter();


  const handleappointment = () => {
    router.push('/patients/register')
  }

  return (
    <main className='bg-dark-300 p-5 sm:p-10 lg:p-20'>
      <div className='mt-20'>
        <h1 className='text-4xl sm:text-6xl font-bold text-center text-green-500'>Frequently asked questions.</h1>
      </div>

      {/** --------------questions---------------- */}
      <div className='mt-20 lg:px-96 md:px-10 px-1'>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className='text-xl text-white text-left sm:text-2xl  hover:no-underline'> How do I book an appointment with a doctor?</AccordionTrigger>
            <AccordionContent className='text-lg sm:text-xl text-left text-gray-500 '>
            To book an appointment, simply click on book appointment button, submit the forms. when doctor schedule your appointment you will receive a sms of your appointment with time date and doctor name.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className='text-xl text-white text-left sm:text-2xl  hover:no-underline'>Are the doctors on your platform verified?</AccordionTrigger>
            <AccordionContent className='text-lg sm:text-xl text-gray-500 text-left'>
            Yes, all doctors on our platform are thoroughly verified. We ensure that they are qualified and have the necessary credentials to provide healthcare services. You can trust that you are receiving care from reputable professionals.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className='text-xl text-white text-left sm:text-2xl hover:no-underline'> Do you offer customer support?</AccordionTrigger>
            <AccordionContent className='text-lg sm:text-xl text-gray-500 text-left'>
            Yes, we have a dedicated customer support team available to assist you with any queries or issues. You can reach out to us via email, phone, or live chat on our website.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className='text-xl text-white text-left sm:text-2xl hover:no-underline'>What if I need urgent medical attention?</AccordionTrigger>
            <AccordionContent className='text-lg sm:text-xl text-gray-500 text-left'>
            For any medical emergencies, please call your local emergency services immediately. we are working for emergency consultations and appointments.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger className='text-xl text-white text-left sm:text-2xl hover:no-underline'>Can I consult with a doctor online?</AccordionTrigger>
            <AccordionContent className='text-lg sm:text-xl text-gray-500 text-left'>
            Right now We dont offer telemedicine consultations where you can speak with doctors via video calls from the comfort of your home.
            But we are woking on it. you soon able to consult online.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="relative my-20 rounded-xl w-full h-40 md:h-80">
        <Image src="/assets/images/onboarding-img.png" fill alt="Background" className="object-cover rounded-2xl hover:brightness-100 transition duration-300 ease-in brightness-50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-green-500 text-center">Still thinking?</h1>
          <h1 className="text-md sm:text-2xl font-semibold text-white text-center">Claim your first appointment now!</h1>
          <div className='mt-5'>
          <Button onClick={handleappointment} className="bg-green-500 text-white text-lg font-semibold rounded-md hover:bg-green-400 px-6 sm:text-xl">Claim now</Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default FrequentlyQuestions 