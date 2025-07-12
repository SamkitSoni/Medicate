"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { redirect, usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import {
  FormFieldType,
  GenderOptions,
  IdentificationTypes,
} from "@/constants";


import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import { PatientFormValidation } from "@/lib/validation/patient";
import { registerPatient } from "@/lib/actions/patient.action";
import CustomFormField from "../shared/CustomFormField";
import SubmitButton from "../shared/SubmitButton";
import { Doctor, RegisterUserParams } from "@/types";
import { Button } from "../ui/button";
import { useUploadThing } from "@/lib/uploadthing";
import { Input } from "../ui/input";

interface RegisterFormProps {
  doctor: Doctor[];
  userId: string;
  patient: RegisterUserParams;
}


const RegisterForm = ({  
  doctor,
  userId,
  patient
  
}:RegisterFormProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { startUpload } = useUploadThing("patient_profile_photo");
  const { startUpload: startUploadCertificate } = useUploadThing("patient_identification_document");
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);
  const [identificationDocument, setidentificationDocument] = useState<File | null>(null);  
  const [isLoading, setIsLoading] = useState(false);
  

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      profile_photo: patient?.profile_photo || "",
      name: patient?.name || "",
      phone: patient?.phone || "",
      email: patient?.email || "",
      gender: patient?.gender || 'male',
      dob: patient?.dob || "",
      occupation: patient?.occupation || "",
      emergencyContactName: patient?.emergencyContactName || "",
      emergencyContactNumber: patient?.emergencyContactNumber || "",
      address: patient?.address || "",
          // @ts-expect-error consent fields might have different types than expected string
      privacyConsent: patient?.privacyConsent || "",
          // @ts-expect-error consent fields might have different types than expected string
      disclosureConsent: patient?.disclosureConsent || "",
          // @ts-expect-error consent fields might have different types than expected string
      treatmentConsent: patient?.treatmentConsent || "",
      userId: userId || userId,
      insuranceProvider: patient?.insuranceProvider || "",
      insurancePolicyNumber: patient?.insurancePolicyNumber || "",
      medicalHistory: patient?.medicalHistory || "",
      identificationType: patient?.identificationType || "",
      identificationNumber:patient?.identificationNumber || "",
      identificationDocument: patient?.identificationDocument || "",
      primaryPhysician: patient?.primaryPhysician || "",
      currentMedications: patient?.currentMedications || "",
      allergies: patient?.allergies || "",
      registered: patient?.registered || ""
    },
  });

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true);

    if (profilePhotoFile) {
      const imgRes = await startUpload([profilePhotoFile]);
      if (imgRes && imgRes[0].url) {
        values.profile_photo = imgRes[0].url;
      }
    }

    if (identificationDocument) {
      const cerRes = await startUploadCertificate([identificationDocument]);
      if (cerRes && cerRes[0].url) {
        values.identificationDocument = cerRes[0].url;
      }
    }

    try {
      const patient = {
        userId: userId,
        profile_photo: values.profile_photo,
        name: values.name,
        email: values.email,
        phone: values.phone,
        dob: new Date(values.dob),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies || "",
        currentMedications: values.currentMedications || "",
        medicalHistory: values.medicalHistory || "",
        identificationType: values.identificationType || "",
        identificationNumber: values.identificationNumber || "",
        identificationDocument: values.identificationDocument || undefined,        
        privacyConsent: values.privacyConsent,
        treatmentConsent: values.treatmentConsent,
        disclosureConsent: values.disclosureConsent,
        registered: true,
      };

      const newPatient = await registerPatient(patient);

      if (newPatient) {
        if (pathname === `/patients/${userId}/profile/edit`) {
          router.back();
        } else {
          redirect(`/patients/${userId}/new-appointment`);
        }
      }
      

    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const handleView = (doctorId: string) => {
    redirect(`/doctor/${doctorId}/profile`);
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-12"
      >
        <section className="space-y-4">
          <h1 className="header text-white">Welcome 👋</h1>
          <p className="text-dark-700">Let us know about yourself.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>


                {/*  Profile Photo */}
                <p className="sub-header">Add Profile Photo</p>
                <FormField
                 control={form.control}
                 name="profile_photo"
                 render={({ field }) => (
                   <FormItem className="flex items-center gap-4">
                     <FormLabel className="account-form_image-label">
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
                    className="object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Choose qualification certificate"
                  className="account-form_image-input"
                  onChange={(e) => handleFileChange(e, setProfilePhotoFile, field.onChange)}                />
              </FormControl>
            </FormItem>
          )}
        />

          {/* NAME */}

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          {/* EMAIL & PHONE */}
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

          {/* BirthDate & Gender */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="dob"
              label="Date of birth"
            />

            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>

          {/* Address & Occupation */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="address"
              label="Address"
              placeholder="14 street, New york, NY - 5101"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="occupation"
              label="Occupation"
              placeholder=" Software Engineer"
            />
          </div>

          {/* Emergency Contact Name & Emergency Contact Number */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Emergency contact name"
              placeholder="Guardian's name"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label="Emergency contact number"
              placeholder="(555) 123-4567"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>

          {/* PRIMARY CARE PHYSICIAN */}
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary physician"
            placeholder="Select a Doctor"
          >
            {doctor && doctor.length > 0 ? (
              doctor.map((doc) => (
                // @ts-expect-error doc object properties don't match expected types
                <div key={doc._id} className="flex items-center gap-2">
                {/* @ts-expect-error SelectItem value expects string but _id might be ObjectId */}
                <SelectItem value={doc._id}>
                  <div className="flex cursor-pointer items-center gap-2">
                    {doc.profile_photo && (
                      <div className="relative h-8 w-8">
                        <Image
                          src={doc.profile_photo}
                          layout="fill"
                          alt="doctor"
                          className="rounded-full object-cover w-[500px] h-[500px] border border-dark-500"
                        />
                      </div>
                    )}
                    <p className="text-white font-semibold">{doc.name}</p>
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
                <Button onClick={() => handleView(doc.doctorId)} className="ml-2 text-white font-semibold bg-green-500">
                  View
                </Button>
              </div>
              ))
            ) : (
              <SelectItem value="no_doctors">No doctors available</SelectItem>
            )}
          </CustomFormField>


          {/* INSURANCE & POLICY NUMBER */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insuranceProvider"
              label="Insurance provider"
              placeholder="BlueCross BlueShield"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Insurance policy number"
              placeholder="ABC123456789"
            />
          </div>

          {/* ALLERGY & CURRENT MEDICATIONS */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Allergies (if any)"
              placeholder="Peanuts, Penicillin, Pollen"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="currentMedication"
              label="Current medications"
              placeholder="Ibuprofen 200mg, Levothyroxine 50mcg"
            />
          </div>

          {/* FAMILY MEDICATION & PAST MEDICATIONS */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label=" Family medical history (if relevant)"
              placeholder="Mother had brain cancer, Father has hypertension"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Past medical history"
              placeholder="Appendectomy in 2015, Asthma diagnosis in childhood"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verfication</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Identification Type"
            placeholder="Select identification type"
          >
            {IdentificationTypes.map((type, i) => (
              <SelectItem key={type + i} value={type} className="text-white">
                {type}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="identificationNumber"
            label="Identification Number"
            placeholder="123456789"
          />

        {/* Certificate */}
        <h2 className="sub-header">Add scanned document</h2>
        <FormField
          control={form.control}
          name="identificationDocument"
          render={({ field }) => (
            <FormItem className="fex-col justify-center items-center gap-4">
              <FormLabel className="flex flex-col justify-center items-center w-68 h-48 border-2 cursor-pointer rounded-md">
                {field.value ? (
                  <div className="relative h-48 w-full px-5">
                    <Image
                      src={field.value}
                      alt="identificationDocument"
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
                  onChange={(e) => handleFileChange(e, setidentificationDocument, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="I consent to receive treatment for my health condition."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="I consent to the use and disclosure of my health
            information for treatment purposes."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="I acknowledge that I have reviewed and agree to the
            privacy policy"
          />
        </section>

        <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;