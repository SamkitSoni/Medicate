import { Button } from "@/components/ui/button";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import { isValidObjectId } from "mongoose";
import Image from "next/image";
import Link from "next/link";

const RequestSuccess = async ({ searchParams, params: { userId } }: SearchParamProps) => {
  // Extract appointmentId and ensure it's a string
  const appointmentId = Array.isArray(searchParams?.appointmentId)
    ? searchParams.appointmentId[0]
    : searchParams?.appointmentId;

  // Add a check to ensure appointmentId is valid
  if (!appointmentId) {
    console.error("appointmentId is undefined");
    return (
      <div className="flex h-screen max-h-screen px-[5%]">
        <div className="success-img">
          <Link href="/">
            <Image src="/assets/icons/logo-full.svg" height={1000} width={1000} alt="logo" className="h-10 w-fit" />
          </Link>

          <section className="flex flex-col items-center">
            <h2 className="header mb-6 max-w-[600px] text-center">
              Error: <span className="text-red-500">appointmentId is undefined</span>
            </h2>
          </section>
        </div>
      </div>
    );
  }

  // Validate appointmentId
  if (!isValidObjectId(appointmentId)) {
    console.error("Invalid appointmentId format:", appointmentId);
    return (
      <div className="flex h-screen max-h-screen px-[5%]">
        <div className="success-img">
          <Link href="/">
            <Image src="/assets/icons/logo-full.svg" height={1000} width={1000} alt="logo" className="h-10 w-fit" />
          </Link>

          <section className="flex flex-col items-center">
            <h2 className="header mb-6 max-w-[600px] text-center">
              Error: <span className="text-red-500">Invalid appointmentId format</span>
            </h2>
          </section>
        </div>
      </div>
    );
  }

  // Fetch appointment
  const appointment = await getAppointment(appointmentId);

  if (!appointment) {
    console.error("Failed to fetch appointment");
    return (
      <div className="flex h-screen max-h-screen px-[5%]">
        <div className="success-img">
          <Link href="/">
            <Image src="/assets/icons/logo-full.svg" height={1000} width={1000} alt="logo" className="h-10 w-fit" />
          </Link>

          <section className="flex flex-col items-center">
            <h2 className="header mb-6 max-w-[600px] text-center">
              Error: <span className="text-red-500">Failed to fetch appointment</span>
            </h2>
          </section>
        </div>
      </div>
    );
  }


  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p className=" text-gray-800 dark:text-white">We&apos;ll be in touch shortly to confirm via sms.</p>
        </section>

        <section className="request-details text-gray-800 dark:text-white">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 relative rounded-full">
              <Image
                src={appointment.primaryPhysician.profilePhoto} 
                alt="doctor"
                layout="fill"
                className="rounded-full object-cover"
              />
            </div>
            <p className="whitespace-nowrap text-gray-800 dark:text-white">Dr. {appointment.primaryPhysician.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p className=" text-gray-800 dark:text-white">{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default RequestSuccess;
