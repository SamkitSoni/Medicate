import ProfileInfo from '@/components/shared/ProfileInfo';
import { getDoctorById } from '@/lib/actions/doctor.actions';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react';

interface Doctor {
  profile_photo: string;
  name: string;  
  isVerified: boolean;
  subscription: {
    basicPlan:boolean;
    eliteCarePremier: boolean;
    expertCarePlus:boolean;
  };
}

const Profile = async ({ params }: { params: { doctorId: string } }) => {
  const doctor: Doctor | null = await getDoctorById(params.doctorId);
  const currentdoctorId = await currentUser()

  if (!doctor) {
    return <p>Doctor not found.</p>;
  }

  return (
    <>
    <section className='flex flex-col items-center p-5 w-full min-h-screen'>
        <ProfileInfo 
        doctor={doctor}
        // @ts-expect-error currentDoctorId type mismatch with ProfileInfo props
        currentDoctorId={currentdoctorId?.id}
        /> 
    </section>

    </>
  );
};

export default Profile;
