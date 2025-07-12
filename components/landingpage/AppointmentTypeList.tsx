'use client';

import { useRouter } from 'next/navigation';
import HomeCard from '../cards/HomeCard';

const AppointmentTypeList = () => {
  const router = useRouter()
  
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/assets/icons/add-meeting.svg"
        title="Book Appointment"
        description="Book your appointment"
        handleClick={() => router.push('/patients/register')}
      />
    </section>
  );
};

export default AppointmentTypeList;