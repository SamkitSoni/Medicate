"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChangeEvent, useState } from "react";
import CustomFormField from "../shared/CustomFormField";
import { FormFieldType } from "@/constants";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import SubmitButton from "../shared/SubmitButton";
import { useRouter } from "next/navigation";
import { submitPrescriptionRecord } from "@/lib/actions/medicalhistory.actions";
import Image from "next/image";
import { useUploadThing } from "@/lib/uploadthing";
import { Input } from "../ui/input";

// Define form schema with zod
const PrescriptionFormSchema = z.object({
  prescriptionName: z.string().min(1, "Prescription name is required"),
  dateIssued: z.date().or(z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date')),
  additionalNotes: z.string(),
  prescribingDoctor: z.string(),
  prescriptionFileUrl: z.string().optional(),
});

type MedicalHistoryFormData = z.infer<typeof PrescriptionFormSchema>;

const VaccinationForm = ({ userId }: { userId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { startUpload } = useUploadThing("prescription_record");
  const [prescriptionFileUrl, setPrescriptionFileUrl] = useState<File | null>(null);  
  const router = useRouter();

  const form = useForm<MedicalHistoryFormData>({
    resolver: zodResolver(PrescriptionFormSchema),
    defaultValues: {
      prescriptionName: "",
      dateIssued: "",
      additionalNotes: "",
      prescribingDoctor: "",
      prescriptionFileUrl: ""
    },
  });

  const onSubmit = async (values: MedicalHistoryFormData) => {
    setIsLoading(true);
  
    if (prescriptionFileUrl) {
      const medRes = await startUpload([prescriptionFileUrl]);
      if (medRes && medRes[0].url) {
        values.prescriptionFileUrl = medRes[0].url;
      }
    }
  
    try {
      const history = {
        prescriptionName: values.prescriptionName,
        dateIssued: values.dateIssued,
        additionalNotes: values.additionalNotes,
        prescribingDoctor: values.prescribingDoctor,
        prescriptionFileUrl: values.prescriptionFileUrl,
        userId: userId,  // Make sure no extra fields like phone, email, name are included here
      };
  // @ts-expect-error submitPrescriptionRecord function type mismatch with history object
      const newHistory = await submitPrescriptionRecord(history);
      if (newHistory) {
        router.push(`/patients/${userId}/medical-records/add-medical-records`);
      }
    } catch (error) {
      console.log(error);
    }
  
    setIsLoading(false);
  };
  

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    const file = e.target.files?.[0] || null;
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result?.toString() || "";
        fieldChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section className="space-y-4">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Prescription History</h1>
          <p className="text-gray-600 dark:text-gray-400">Submit the prescription history for doctor&apos;s review and future reference.</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Vaccine Name */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="prescriptionName"
            label="Prescription Name"
            placeholder="E.g, Anti-inflammatory, Antibiotics"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          {/* Healthcare Provider */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="prescribingDoctor"
            label="Doctor Name"
            placeholder="E.g., Dr. Smith, Dr. John..."
            iconSrc="/assets/icons/user.svg"
            iconAlt="doctor"
          />

          {/* Vaccine Date */}
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="dateIssued"
            label="Issued Date"
            iconSrc="/assets/icons/calender.svg"
            iconAlt="date"
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="additionalNotes"
            label="Additional Notes"
            placeholder="E.g., Morning-evening"
            iconSrc="/assets/icons/user.svg"
            iconAlt="diseases"
          />
        </section>

        {/* File Upload */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">Upload Prescription file</h2>
          <FormField
            control={form.control}
            name="prescriptionFileUrl"
            render={({ field }) => (
              <FormItem className="flex-col justify-center items-center gap-4">
                <FormLabel className="flex flex-col justify-center items-center w-68 h-48 border-2 cursor-pointer rounded-md">
                  {field.value ? (
                    <div className="relative h-48 w-full px-5">
                      <Image
                        src={field.value}
                        alt="certificate"
                        layout="fill"
                        priority
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <Image
                      src="/assets/icons/document.svg"
                      alt="certificate"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  )}
                </FormLabel>
                <FormControl className="flex-1 text-base-semibold text-gray-200">
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="Choose certificate Photo"
                    className="account-form_image-input"
                    onChange={(e) => handleFileChange(e, setPrescriptionFileUrl, field.onChange)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </section>

        {/* Submit Button */}
        <SubmitButton isLoading={isLoading}>Submit</SubmitButton>
      </form>
    </Form>
  );
};

export default VaccinationForm;
