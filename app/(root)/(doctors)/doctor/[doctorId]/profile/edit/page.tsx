import AccountProfile from "@/components/forms/DoctorForm";
import { getDoctorByDoctorId } from "@/lib/actions/doctor.actions";
import { currentUser } from "@clerk/nextjs/server";


interface ProfilePageProps {
  params: {
    doctorId: string;
  };
}

const ProfilePage: React.FC<ProfilePageProps> = async ({ params }) => {
  const doctor = await getDoctorByDoctorId(params.doctorId);
  const user = await currentUser();
  if(!user) return null;

  const doctorId = user.id


  const doctorData = {
    profile_photo: doctor.profile_photo || "",
    name: doctor.name || "",
    phone: doctor.phone || "",
    email: doctor.email || "",
    specialities: doctor.specialities || "",
    experience: doctor.experience || "",
    qualifications: doctor.qualifications || "",
    certificate: doctor.certificate || "",
    hospitalName: doctor.hospitalName || "",
    address: doctor.address || "",
    days: doctor.days || "",
    hours: doctor.hours || "",
    onboarded: doctor.onboarded || false,
    doctorId: doctor.doctorId || doctorId,
  };

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <h1 className="header mb-10">Edit profile</h1>
          <AccountProfile doctorId={params.doctorId} doctor={doctorData} />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              &copy; 2025 Medicate
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
