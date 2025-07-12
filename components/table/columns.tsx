"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { formatDateTime } from "@/lib/utils";
import { StatusBadge } from "../shared/StatusBadge";
import { Appointment } from "@/types"; // Import Doctor type from your types module
import { AppointmentModal } from "../shared/AppointmentModal";
import Link from "next/link";

export const columns: ColumnDef<Appointment, unknown>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return <p className="text-14-medium">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;
      return <Link href={`/patients/${appointment.userId}/profile`} className="text-14-medium">
        
        {appointment.patient.name || "No Name"}
        
        </Link>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={appointment.status} />
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(appointment.schedule).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const appointment = row.original;
      const doctor = appointment.primaryPhysician;

      return (
        <div className="flex items-center gap-3">
          {doctor.name && doctor.profilePhoto && (
            <div className="w-8 h-8 relative">
              <Image
                src={doctor.profilePhoto}
                alt="doctor"
                layout="fill"
                className="object-cover rounded-full"
              />
            </div>
          )}
          <p className="whitespace-nowrap">Dr. {doctor.name || "No Name"}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <div className="flex gap-1">
          <AppointmentModal
            userId={appointment.userId}
            appointment={appointment}
            type="schedule"
            title="Schedule Appointment"
            description="Please confirm the following details to schedule."
            doctorId={appointment.primaryPhysician._id}
            />

          <AppointmentModal
            userId={appointment.userId}
            appointment={appointment}
            type="cancel"
            title="Cancel Appointment"
            description="Are you sure you want to cancel your appointment?"
            doctorId={appointment.primaryPhysician._id} 
            />
        </div>
      );
    },
  },
];
