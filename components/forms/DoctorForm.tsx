"use client";

import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { ChangeEvent, useState} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, usePathname, useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/shared/SubmitButton"; 
import { DoctorFormValidation } from "@/lib/validation/doctor";
import CustomFormField from "../shared/CustomFormField";
import { Experience, FormFieldType, Specialities } from "@/constants";
import { SelectItem } from "../ui/select";
import { createDoctor } from "@/lib/actions/doctor.actions";
import { useUploadThing } from "@/lib/uploadthing";

interface Doctor {
  profile_photo: string;
  doctorId: string;
  name: string;
  phone: string;
  email: string;
  specialities: string;
  experience: string;
  qualifications: string;
  certificate: string;
  hospitalName: string;
  address: string;
  days: string;
  hours: string;
  onboarded: boolean;
}

interface Props {
  doctorId: string;
  doctor: Doctor;
  
}

const AccountProfile = ({ doctor, doctorId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { startUpload } = useUploadThing("profile_photo");
  const { startUpload: startUploadCertificate } = useUploadThing("certificate");
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);
  const [certificateFile, setCertificateFile] = useState<File | null>(null);  
  const [isRegistered] = useState<boolean>(false);
 



  const form = useForm<z.infer<typeof DoctorFormValidation>>({
    resolver: zodResolver(DoctorFormValidation),
    defaultValues:{
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
    },
  });

  const onSubmit = async (values: z.infer<typeof DoctorFormValidation>) => {
    setIsLoading(true);


    if (profilePhotoFile) {
      const imgRes = await startUpload([profilePhotoFile]);
      if (imgRes && imgRes[0].url) {
        values.profile_photo = imgRes[0].url;
      }
    }

    if (certificateFile) {
      const cerRes = await startUploadCertificate([certificateFile]);
      if (cerRes && cerRes[0].url) {
        values.certificate = cerRes[0].url;
      }
    }

    try {
      await createDoctor({
        name: values.name || "",
        phone: values.phone || "",
        email: values.email || "",
        specialities: values.specialities || "",
        experience: values.experience || "",
        qualifications: values.qualifications || "",
        certificate: values.certificate || "",
        profile_photo: values.profile_photo || "",
        hospitalName: values.hospitalName || "",
        address: values.address || "",
        days: values.days || "",
        hours: values.hours || "",
        onboarded: true,
        doctorId: doctorId,
        path: pathname,
      });

      if (pathname === `/doctor/${doctorId}/profile/edit`) {
        router.back();
      } else {
        redirect(`/doctor/${doctorId}/dashboard`);
      }

    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
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



  if (isRegistered) {
    return <p>Doctor is already registered.</p>;
  }

  return (
    <div className="bg-white dark:bg-dark-300 rounded-lg p-6 shadow-lg dark:shadow-dark-400/20 border border-gray-100 dark:border-dark-500">
      <Form {...form}>
        <form
          className="flex flex-col justify-start gap-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
      {/*  Profile Photo */}
            <h2 className="sub-header text-gray-800 dark:text-white">Add Profile Photo</h2>
                <FormField
                 control={form.control}
                 name="profile_photo"
                 render={({ field }) => (
                   <FormItem className="flex items-center gap-4">
                     <FormLabel className="account-form_image-label border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-400">
                       {field.value ? (
                         <Image
                          src={field.value}
                          alt="profile_icon"
                           fill
                           priority
                           className="rounded-full object-cover"
                         />
                ) : (
                  <Image
                    src="/assets/profile.svg"
                    alt="profile_icon"
                    width={24}
                    height={24}
                    className="object-contain opacity-60 dark:opacity-80"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-800 dark:text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Choose profile photo"
                  className="account-form_image-input bg-white dark:bg-dark-300 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
                  onChange={(e) => handleFileChange(e, setProfilePhotoFile, field.onChange)}                />
              </FormControl>
            </FormItem>
          )}
        />

       <div className="flex flex-col gap-6 xl:flex-row">

        {/* Name Field */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="hospitalName"
          label="Hospital Name"
          placeholder="Hospital name"
        />

      </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email address"
            placeholder="johndoe@gmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="(555) 123-4567"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        {/* Specialities Field */}
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="specialities"
          label="Whats your speciality"
          placeholder="Select a speciality"
        >
          {Specialities.map((speciality, i) => (
            <SelectItem key={speciality.name + i} value={speciality.name}>
              <div className="flex cursor-pointer items-center gap-2">
                <p>{speciality.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        {/* Experience Field */}
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="experience"
          label="Experience"
          placeholder="experience"
        >
          {Experience.map((experience, i) => (
            <SelectItem key={experience.year + i} value={experience.year}>
              <div className="flex cursor-pointer items-center gap-2">
                <p>{experience.year}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

      </div>

        {/* Qualifications Field */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="qualifications"
          label="Qualifications"
          placeholder="MBBS"
        />

        {/* Certificate */}
        <h2 className="sub-header text-gray-800 dark:text-white">Add scanned certificate</h2>
        <FormField
          control={form.control}
          name="certificate"
          render={({ field }) => (
            <FormItem className="fex-col justify-center items-center gap-4">
              <FormLabel className="flex flex-col justify-center items-center w-68 h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer rounded-md bg-white dark:bg-dark-400 hover:bg-gray-50 dark:hover:bg-dark-300 transition-colors">
                {field.value ? (
                  <div className="relative h-48 w-full px-5">
                    <Image
                      src={field.value}
                      alt="certificate"
                      layout="fill"
                      priority
                      className="object-cover rounded-md"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Image
                      src="/assets/icons/document.svg"
                      alt="certificate"
                      width={32}
                      height={32}
                      className="object-contain opacity-60 dark:opacity-80"
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Click to upload certificate</p>
                  </div>
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-800 dark:text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Choose certificate Photo"
                  className="account-form_image-input bg-white dark:bg-dark-300 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
                  onChange={(e) => handleFileChange(e, setCertificateFile, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="address"
          label="Office Address"
          placeholder="Enter your office address"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="days"
            label="Available Days"
            placeholder="Mon-Fri"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="hours"
            label="Available Hours"
            placeholder="9AM-5PM"
          />
        </div>

        <SubmitButton
          isLoading={isLoading}
        >
        submit
        </SubmitButton>
      </form>
    </Form>
    </div>
  );
};

export default AccountProfile;
