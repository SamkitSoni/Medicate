import { DoctorAboutCard } from '@/components/cards/DoctorAboutCard';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getDoctorById } from '@/lib/actions/doctor.actions';
import Image from 'next/image';

interface Doctor {
  profile_photo: string;
  name: string;  
  specialities: string;
  qualifications: string;
  experience:string;
  address:string;
  hours:string;
  days:string 
  certificate:string;
}

const page = async({ params }: { params: { doctorId: string } }) => {
  const doctor: Doctor | null = await getDoctorById(params.doctorId);

  return (
   <>
    <section className="w-full flex justify-center items-center p-5">
     <div className='w-full flex justify-between items-center bg-dark-300 mb-5  rounded-md z-10'>
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={200}
            height={50}
            className="h-10 w-[100px] sm:w-[200px]"
          />
      </div>
    </section>

    <section className='w-full h-full px-3'>
      <h1 className='text-xl font-semibold p-5'>Doctor Certificate</h1>
         <Dialog>
            <DialogTrigger asChild>
            <div className='w-full h-[30vh] relative cursor-pointer'>
           <Image
            src={doctor?.certificate || ""}
            alt='certificate'
            fill
            className='w-full object-cover rounded-md border-2 border-dark-400'
             />
            </div>
            </DialogTrigger>
            <DialogContent className='rounded-md bg-dark-300'>
            <DialogTitle></DialogTitle>
              <DialogHeader>
                <DialogDescription className='mb-20 md:w-full h-[30vw]'>
                  <div className='flex justify-center items-center w-full h-full'>
                    <Image 
                    className="shadow-md shadow-black object-contain" 
                    src={doctor?.certificate || ""} 
                    alt="certificate" 
                    fill 
                    />
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
    </section>

       <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 px-3 mt-8 mb-40">
      {doctor && (
        <>
          <DoctorAboutCard
            type="Timing"
            label={doctor.hours || "Not added yet"}
            icon="/assets/icons/clock.svg"
          />
          <DoctorAboutCard
            type="Days"
            label={doctor.days || "Not added yet"}
            icon="/assets/icons/calendar.svg"
          />
          <DoctorAboutCard
            type="Speciality"
            label={doctor.specialities || "Not added yet"}
            icon="/assets/icons/stethoscope.svg"
          />
          <DoctorAboutCard
            type="Qualification"
            label={doctor.qualifications || "Not added yet"}
            icon="/assets/icons/google-doc.svg"
          />
          <DoctorAboutCard
            type="Experience"
            label={doctor.experience || "Not added yet"}
            icon="/assets/icons/add.svg"
          />
          <DoctorAboutCard
            type="Address"
            label={doctor.address || "Not added yet"}
            icon="/assets/icons/address.svg"
          />
        </>
      )}
    </section>
   </>
  );
};

export default page;