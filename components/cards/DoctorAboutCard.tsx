import clsx from "clsx";
import Image from "next/image";

type StatCardType = "Qualification" | "Speciality" | "Experience" | "Address" | "Days" | "Timing";


type StatCardProps = {
  type:StatCardType;  
  label: string;
  icon: string;
};

export const DoctorAboutCard = ({ label, icon, type }: StatCardProps) => {
  return (
     <>
     <div
    className={clsx("stat-card", {
        "bg-appointments": type === "Qualification" || type === "Address",
        "bg-pending": type === "Speciality" || type === "Days",
        "bg-cancelled": type === "Experience" || type === "Timing",
      })}
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          height={32}
          width={32}
          alt="appointments"
          className="size-8 w-fit"
        />
        <h2 className="font-semibold text-lg text-white">{label}</h2>
      </div>
      <p className="text-xl font-semibold">{type}</p>
    </div>
     </>
  );
};