import AppointmentForm from "@/components/forms/AppointmentForm";
import { getDoctor } from "@/lib/actions/doctor.actions";
import { getUser } from "@/lib/actions/patient.action";
import { SearchParamProps } from "@/types";
import Image from "next/image";

export default async function NewAppointment({ params: { userId } }: SearchParamProps) {
  try {
     const patient = await getUser(userId);
     const fetchedDoctor = await getDoctor();

    return (
      <div className="flex h-screen max-h-screen">
        <section className="remove-scrollbar container my-auto">
          <div className="sub-container max-w-[860px] flex-1 justify-between">
            <AppointmentForm  
              type="create"
              userId={userId}
              // @ts-expect-error patient prop type mismatch with AppointmentForm
              patient={patient}
              doctor={fetchedDoctor}
            />

            <div className="text-14-regular flex justify-between">
              <p className="copyright mt-10 ">
                &copy; 2024 Medicate
              </p>
            </div>
          </div>
        </section>
        <Image
          src="/assets/images/appointment-img.png"
          height={1000}
          width={1000}
          className="side-img max-w-[390px] bg-bottom hidden md:flex"
          alt="appointment"
        />
      </div>
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error in NewAppointment:", errorMessage);

    return (
      <div className="flex h-screen max-h-screen items-center justify-center">
        <p className="text-red-500">An error occurred while fetching data: {errorMessage}</p>
      </div>
    );
  }
}
