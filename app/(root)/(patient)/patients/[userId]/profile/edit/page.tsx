import RegisterForm from '@/components/forms/RegisterForm'
import { getDoctor } from '@/lib/actions/doctor.actions'
import { getPatientById } from '@/lib/actions/patient.action'
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'


const editProfile = async() => {
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


  const patientData = {
    profile_photo: user.profile_photo || "",
    name: user.name || "",
    phone: user.phone || "",
    email: user.email || "",
    gender: user.gender,
    dob: user.dob || "",
    occupation: user.occupation || "",
    emergencyContactName: user.emergencyContactName || "",
    emergencyContactNumber: user.emergencyContactNumber || "",
    address: user.address || "",
    privacyConsent: user.privacyConsent || "",
    disclosureConsent: user.disclosureConsent || "",
    treatmentConsent: user.treatmentConsent || "",
    userId: userId || "",
    insurancePolicyNumber: user.insurancePolicyNumber || "",
    medicalHistory: user.medicalHistory || "",
    identificationType: user.identificationType || "",
    identificationNumber: user.identificationNumber || "",
    identificationDocument: user.identificationDocument || "",
    insuranceProvider: user.insuranceProvider || "",
    primaryPhysician: user.primaryPhysician || "",
    currentMedications: user.currentMedications || "",
    allergies: user.allergies || "",
    registered: user.registered || ""
  };
  




  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
           <div className='w-full flex mb-12 justify-start items-center gap-1'>
           <Image
            src="/assets/icons/logo-icon.svg"
            height={1000}
            width={1000}
            alt="patient"
            className=" h-10 w-fit"
          /> <p className='text-xl font-bold'>Medicate</p>
           </div>

        <RegisterForm 
        doctor={fetcheddoctor}
        userId={userId}
        patient={patientData}
        />
        </div>
    </section>

     <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px] hidden md:flex"
      />
    </div>
  )
}

export default editProfile;