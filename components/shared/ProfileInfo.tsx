"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { MoveLeftIcon, User } from 'lucide-react';

interface Doctor {
  doctorId?: string;
  appointment?: [];
  profile_photo: string;
  name: string;
  experience?: string;
  hospitalName?: string;
  isVerified: boolean;
  subscription: {
    basicPlan:boolean;
    eliteCarePremier: boolean;
    expertCarePlus:boolean;
  };
}

interface ProfileInfoProps {
  doctor: Doctor;
  currentDoctorId: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ doctor, currentDoctorId }) => {
  const [isViewingOwnProfile, setIsViewingOwnProfile] = useState(false);
  const router = useRouter();
  const doctorId = doctor.doctorId;

  const handleEditProfile = () => {
    if (doctorId) {
      router.push(`/doctor/${doctorId}/profile/edit`);
    }
  };

  const handleDashboard = () => {
    if (doctorId) {
      router.push(`/doctor/${doctorId}/dashboard`);
    }
  };

  const handleAppointment = () => {
    if (doctorId) {
      router.back();
    }
  };

  const handleAbout = () => {
    if (doctorId) {
      router.push(`/doctor/${doctorId}/about`);
    }
  };

  useEffect(() => {
    const currentId = currentDoctorId;
    setIsViewingOwnProfile(doctorId === currentId);
  }, [currentDoctorId, doctorId]);

  return (
    <>
  <section className='flex flex-col w-full md:w-[800px] py-5 rounded-md shadow-md sm:dark:bg-dark-400 bg-white text-gray-800 dark:text-white sm:px-5 sm:shadow-md '>
  <div className='flex flex-col sm:flex-row w-full'>
    
    {/* Left Section: Profile Photo and Doctor Name */}
    <div className='flex flex-col justify-center items-center w-full sm:w-[230px]'>
      <div className='relative w-[125px] h-[125px] md:w-[100px] md:h-[100px]'>
        <Image
          src={doctor.profile_photo}
          alt='profile photo'
          fill
          className='object-cover rounded-full'
        />
      </div>
      <div className='flex justify-center sm:justify-start items-center mt-2'>
        <p className='text-md font-semibold'>Dr. {doctor.name}</p>
        {(doctor.subscription.basicPlan || doctor.subscription.eliteCarePremier || doctor.subscription.expertCarePlus) && (
          <div className='relative w-5 h-5 md:w-5 md:h-5 ml-[0.5px]'>
            <Image
              src="/assets/icons/green-tick.svg"
              alt='verification tick'
              fill
              className='object-cover rounded-full'
            />
          </div>
        )}
      </div>
    </div>
    
    {/* Right Section: Stats */}
    <div className='flex justify-center items-center w-full mt-8 sm:mt-0'>
      <div className='flex w-full justify-center sm:justify-between items-center gap-10 md:gap-4'>
        <div className='text-center w-1/3'>
          <p className='text-gray-600 dark:text-gray-300 text-lg'>{doctor.hospitalName || 'N/A'}</p>
          <p className='text-lg font-semibold'>Hospital</p>
        </div>
        <div className='text-center w-1/3'>
          <p className='text-gray-600 dark:text-gray-300 text-lg'>{doctor.appointment?.length || 0}</p>
          <p className='text-lg font-semibold'>Trusted&nbsp;patients</p>
        </div>
        <div className='text-center w-1/3'>
          <p className='text-gray-600 dark:text-gray-300 text-lg'>{doctor.experience?.substring(0, 8) || 'N/A'}</p>
          <p className='text-lg font-semibold'>Experience</p>
        </div>
      </div>
    </div>
  </div>

  {/* Buttons Section */}
  <div className='flex flex-col w-full mt-5'>
    {isViewingOwnProfile ? (
      <>
        <Button onClick={handleEditProfile} className="dark:bg-gray-800 bg-gray-200  text-lg hover:dark:bg-gray-900 w-full">
          Edit profile
        </Button>
        <Button onClick={handleDashboard} className="bg-green-500 text-white text-lg hover:bg-green-300 w-full mt-2">
          Dashboard
        </Button>
      </>
    ) : (
      <>
        <Button onClick={handleAppointment} className="bg-gray-800 hover:bg-gray-900 text-lg w-full mt-2 flex gap-3">
          <MoveLeftIcon />&nbsp;Go back
        </Button>
        <Button onClick={handleAbout} className="bg-green-500 hover:bg-green-300 text-lg w-full mt-2 flex gap-3">
          <User />About doctor
        </Button>
      </>
    )}
  </div>
</section>

    </>
  );
};

export default ProfileInfo;
