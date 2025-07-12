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
import { submitVaccinationRecord } from "@/lib/actions/medicalhistory.actions";
import Image from "next/image";
import { useUploadThing } from "@/lib/uploadthing";
import { Input } from "../ui/input";

// Define form schema with zod
const VaccinationFormSchema = z.object({
  vaccineName: z.string().min(1, "Vaccination name is required"),
  dateOfVaccination: z.date().or(z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date')),
  dosage: z.string().nonempty(),
  healthcareProvider: z.string(),
  certificateUrl: z.string().optional(),
});

type MedicalHistoryFormData = z.infer<typeof VaccinationFormSchema>;

const VaccinationForm = ({ userId }: { userId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { startUpload } = useUploadThing("Vaccination_doc");
  const [certificateUrl, setCertificateUrl] = useState<File | null>(null);  
  const router = useRouter();

  const form = useForm<MedicalHistoryFormData>({
    resolver: zodResolver(VaccinationFormSchema),
    defaultValues: {
      vaccineName: "",
      dateOfVaccination: "",
      dosage: "",
      healthcareProvider: "",
      certificateUrl: ""
    },
  });

  const onSubmit = async (values: MedicalHistoryFormData) => {
    setIsLoading(true);
  
    if (certificateUrl) {
      const medRes = await startUpload([certificateUrl]);
      if (medRes && medRes[0].url) {
        values.certificateUrl = medRes[0].url;
      }
    }
  
    try {
      const history = {
        vaccineName: values.vaccineName,
        dateOfVaccination: values.dateOfVaccination,
        dosage: values.dosage,
        healthcareProvider: values.healthcareProvider,
        certificateUrl: values.certificateUrl,
        userId: userId,  // Make sure no extra fields like phone, email, name are included here
      };
  // @ts-expect-error submitVaccinationRecord function type mismatch with history object
      const newHistory = await submitVaccinationRecord(history);
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
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Vaccination History</h1>
          <p className="text-gray-600 dark:text-gray-400">Submit the vaccination history for doctor&apos;s review and future reference.</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Vaccine Name */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="vaccineName"
            label="Vaccine Name"
            placeholder="E.g, COVID-19, Influenza"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          {/* Healthcare Provider */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="healthcareProvider"
            label="Doctor Name"
            placeholder="E.g., Dr. Smith, Dr. John..."
            iconSrc="/assets/icons/user.svg"
            iconAlt="doctor"
          />

          {/* Dosage */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="dosage"
            label="Dosage"
            placeholder="E.g., 1st dose, 2nd dose, booster"
            iconSrc="/assets/icons/user.svg"
            iconAlt="diseases"
          />

          {/* Vaccine Date */}
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="dateOfVaccination"
            label="Vaccine Date"
            iconSrc="/assets/icons/calender.svg"
            iconAlt="date"
          />
        </section>

        {/* File Upload */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">Upload Medical Records</h2>
          <FormField
            control={form.control}
            name="certificateUrl"
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
                    onChange={(e) => handleFileChange(e, setCertificateUrl, field.onChange)}
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
