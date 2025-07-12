import RegisterForm from '@/components/forms/RegisterForm'
import { getDoctor } from '@/lib/actions/doctor.actions'
import {  getPatientById } from '@/lib/actions/patient.action'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'


const Register = async() => {
  const patient = await currentUser();
  if (!patient) {
    redirect("/sign-in");
  }
  const userId = patient.id;
  const fetcheddoctor = await getDoctor();
  const user = await getPatientById(patient.id);

  if(!fetcheddoctor){
    return console.log("doctor are not available right now")
  }

  if(user){
    redirect(`/patients/${userId}/new-appointment`);
  }


  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
           <Link href="/">
           </Link>

        <RegisterForm 
        doctor={fetcheddoctor}
        userId={userId}
        patient={user}
        />
        </div>
    </section>
    </div>
  )
}

export default Register