"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SelectItem } from "@/components/ui/select";
import { Doctor, Appointment, Status } from "@/types";
import { createAppointment, updateAppointment } from "@/lib/actions/appointment.actions";
import { getAppointmentSchema } from "@/lib/validation/appointment";
import CustomFormField from "../shared/CustomFormField";
import { FormFieldType } from "@/constants";
import SubmitButton from "../shared/SubmitButton";
import { Form } from "../ui/form";
import { Button } from "../ui/button";



interface Props {
  userId: string;
  type: "create" | "schedule" | "cancel";
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  doctor?: Doctor[]; // Assuming it's an array of Doctor objects
}

const AppointmentForm = ({
  userId,
  type,
  appointment,
  setOpen,
  doctor,
}: Props) => {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment?.primaryPhysician._id,
      schedule: appointment ? new Date(appointment.schedule) : new Date(Date.now()),
      reason: appointment?.reason || "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof AppointmentFormValidation>) => {
    setIsLoading(true);
    const status: Status = type === "schedule" ? "scheduled" : type === "cancel" ? "cancelled" : "pending";

    try {
      if (type === "create" && userId) {
        const appointmentData = {
          userId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          status,
          note: values.note,
        };

        const newAppointment = await createAppointment(appointmentData);

        if (newAppointment) {
          form.reset();
          router.push(`/patients/${userId}/new-appointment/success?appointmentId=${newAppointment._id}`);
        }
      } else if (type !== "create" && appointment) {
        const appointmentToUpdate = {
          appointmentId: appointment._id,
          userId,
          appointment: {
            // @ts-expect-error primaryPhysician type mismatch with expected string format
            primaryPhysician: values.primaryPhysician.name,
            reason: values.reason ?? "",
            schedule: new Date(values.schedule),
            status,
            note: values.note ?? "",
            userId,
            cancellationReason: values.cancellationReason ?? "",
          },
          type,
        };
        const updatedAppointment = await updateAppointment(appointmentToUpdate);

        if (updatedAppointment) {
          if (setOpen) setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.error("Submit Error:", error);
    }
    setIsLoading(false);
  };

  const handleView = (doctorId: string) => {
    redirect(`/doctor/${doctorId}/profile`);
  };

  const buttonLabel = type === "cancel" ? "Cancel Appointment" : type === "schedule" ? "Schedule Appointment" : "Create Appointment";

 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        {type === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-gray-600 dark:text-dark-700">Request a new appointment in 10 seconds.</p>
          </section>
        )}

        {type !== "cancel" && (
          <>
            {type !== "schedule" && (
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="primaryPhysician"
                label="Select Doctor"
                placeholder="Select a doctor"
              >
               {doctor && doctor.length > 0 ? (
                  doctor.map((doc) => (
                    // @ts-expect-error doc object type mismatch with expected interface
                    <div key={doc._id} className="flex items-center gap-2">
                      {/* @ts-expect-error SelectItem value type mismatch */}
                      <SelectItem value={doc._id}>
                        <div className="flex cursor-pointer items-center gap-2">
                          {doc.profile_photo && (
                            <div className="relative h-8 w-8">
                              <Image
                                src={doc.profile_photo}
                                layout="fill"
                                alt="doctor"
                                className="rounded-full object-contain border dark:border-dark-500"
                              />
                            </div>
                          )}
                          <p className=" text-gray-800 dark:text-white font-semibold">{doc.name}</p>
                          {doc.subscription.basicPlan || doc.subscription.eliteCarePremier || doc.subscription.expertCarePlus && (
                           <Image
                             src="/assets/icons/green-tick.svg" // Use the correct path for the green tick icon
                             height={20}
                             width={20}
                             alt="Verified"
                             className="mr-2"
                             />
                            )}
                        </div>
                      </SelectItem>
                      <Button onClick={() => handleView(doc.doctorId)} className="ml-2 bg-green-500 text-white font-semibold">
                         View
                      </Button>
                    </div>
                  ))
                ) : (
                  <SelectItem value="no_doctors">No doctors available</SelectItem>
                )}
              </CustomFormField>
            )}


             <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="dd/MM/yyyy-h:mm aa"
            />

            <div className={`flex flex-col gap-6 ${type === "create" && "xl:flex-row"}`}>
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Appointment reason"
                placeholder="Annual monthly check-up"
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Comments/notes"
                placeholder="Prefer afternoon appointments, if possible"
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Urgent meeting came up"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;