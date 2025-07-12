"use client";
import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

interface Props {
  userId: string;
  patient: {
    _id: string;
    profile_photo: string;
    name: string;
    dob: string;
    gender: string;
    email: string;
    phone: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
  };


  doctor: {
  doctorId: string;
  }
}

const PatientProfile = ({ userId, patient, doctor }: Props) => {
  const router = useRouter();
  const currentDate = new Date();  // Convert patient DOB from string to Date object and calculate age
  const patientDob = new Date(patient.dob);
  let age = currentDate.getFullYear() - patientDob.getFullYear();
  const monthDiff = currentDate.getMonth() - patientDob.getMonth();
  const dayDiff = currentDate.getDate() - patientDob.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  const patientData = {
    id: patient._id,
    profile_photo: patient.profile_photo,
    name: patient.name,
    age,
    gender: patient.gender,
    email: patient.email,
    phone: patient.phone,
    emergencyContact: {
      name: patient.emergencyContactName,
      phone: patient.emergencyContactNumber,
    },
    subscription:{
      basic: {},
      plus: {},
      premium: {}
    }
  };

  const addRecord = () => {
    // @ts-expect-error patient.subscription properties might not exist with expected names
    if(patient.subscription.Plus || patient.subscription.Premium === true){
      router.push(`/patients/${userId}/medical-records/add-medical-records`);
    }else{
      router.push(`/patients/${userId}/pricing`);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-dark-1 py-12 px-4">
      {/* Profile Header */}
      <div className="max-w-4xl w-full bg-white dark:bg-dark-400 shadow-md rounded-lg p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
        {/* Profile Picture */}
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-green-500">
          <Image
            src={patient.profile_photo}
            alt="Patient Profile"
            width={160}
            height={160}
            className="object-cover"
            priority
          />
        </div>

        {/* Patient Info */}
        <div className="flex flex-col text-gray-800 dark:text-white gap-4 text-center md:text-left">
          <h1 className="flex justify-center md:justify-start items-center gap-2 text-2xl md:text-3xl font-bold">
            {patientData.name}

            {
            patientData.subscription.basic||
            patientData.subscription.plus || 
            patientData.subscription.premium === true
            ?
            <Image
            src="/assets/icons/green-tick.svg"
            alt='tick'
            width={25}
            height={25}
            />

            :
            ""
            }
            
            </h1>
          <p className="text-md">Age: {patientData.age}</p>
          <p className="text-md">Gender: {patientData.gender}</p>
          <p className="text-md">
            <span className="font-semibold">Email:</span> {patientData.email}
          </p>
          <p className="text-md">
            <span className="font-semibold">Phone:</span> {patientData.phone}
          </p>
         {userId === doctor.doctorId ?
              <Button 
              onClick={() => router.push(`/patients/${userId}/profile/edit`)} 
              className="mt-4 py-2 px-6 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition duration-300">
              Edit Profile
            </Button>
            : " " 
        }
        </div>
      </div>

      {/* Medical History Section */}
      <section className="max-w-4xl w-full bg-white dark:bg-dark-400 shadow-md rounded-lg p-6 md:p-10 mt-6">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Medical History</h2>
          <Button
            onClick={addRecord}
            className="sm:text-md bg-green-500 hover:bg-green-400 font-bold text-white mb-4">
            View Medical Records
          </Button>
        </div>
      </section>

      {/* Contact Info */}
      <div className="max-w-4xl w-full bg-white text-gray-800 dark:text-white dark:bg-dark-400 shadow-md rounded-lg p-6 md:p-10 mt-6">
        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold">Emergency Contact</h3>
            <p>{patientData.emergencyContact.name} - {patientData.emergencyContact.phone}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientProfile;
