import DoctorForm from "@/components/forms/DoctorForm";
import { getDoctorByDoctorId } from "@/lib/actions/doctor.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Register = async () => {
  const user = await currentUser();
  
  if (!user) {
    redirect("/sign-in");
  }
  const doctorId = user.id;
  
    const existingDoctor = await getDoctorByDoctorId(doctorId);

    const doctorData = {
      profile_photo: existingDoctor ? existingDoctor.profile_photo : "",
      name: existingDoctor ? existingDoctor.name : "",
      phone: existingDoctor ? existingDoctor.phone : "",
      email: existingDoctor ? existingDoctor.email : "",
      specialities: existingDoctor ? existingDoctor.specialities : "",
      experience: existingDoctor ? existingDoctor.experience : "",
      qualifications: existingDoctor ? existingDoctor.qualifications : "",
      certificate: existingDoctor ? existingDoctor.certificate : "",
      hospitalName: existingDoctor ? existingDoctor.hospitalName : "",
      address: existingDoctor ? existingDoctor.address : "",
      days: existingDoctor ? existingDoctor.days : "",
      hours: existingDoctor ? existingDoctor.hours : "",
      onboarded: true,
      doctorId: doctorId,
    };

    if (existingDoctor) {
      redirect(`/doctor/${doctorId}/dashboard`);
    }

    if(!existingDoctor) {
      <p className="text-white flex justify-center items-center w-full">Loading...</p>

    }
 
    return (
      <div className="flex h-screen max-h-screen">
        <section className="remove-scrollbar container my-auto">
          <div className="sub-container max-w-[496px]">
            <DoctorForm doctorId={doctorId} doctor={doctorData} />
            <div className="text-14-regular mt-20 flex justify-between">
              <p className="justify-items-end text-dark-600 xl:text-left">
                &copy; 2025 Medicate
              </p>
            </div>
          </div>
        </section>
        {/* <Image
          src="/assets/images/onboarding-img.png"
          height={1000}
          width={1000}
          className="side-img max-w-[50%] hidden md:flex remove-scrollbar"
          alt="hero-image"
        /> */}
      </div>
    );
};

export default Register;
