import PatientProfile from '@/components/shared/PatientProfile'
import { getDoctor } from '@/lib/actions/doctor.actions'
import { getPatientById } from '@/lib/actions/patient.action'
import { SearchParamProps } from '@/types'
import React from 'react'

const Profile = async({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatientById(userId);
  const doctor = await getDoctor();

  return (
    <section className='w-full min-h-screen'>
        <PatientProfile  userId={userId} patient={patient} doctor={doctor} />
    </section>
  )
}

export default Profile