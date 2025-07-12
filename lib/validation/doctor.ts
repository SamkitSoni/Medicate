import * as z from "zod";

export const DoctorFormValidation = z.object({
  profile_photo: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email(),

  specialities: z.string().min(2, "Select at least one doctor"),
  experience: z.string().min(2, "Select at least one"),
  qualifications: z.string().min(1, "Qualifications are required"),
  certificate: z.string().optional(),
  hospitalName: z.string().min(1, "Hospital Name is required"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),  
    days: z.string().min(1, "Days are required"),
  hours: z.string().min(1, "Hours are required"),
  onboarded: z.boolean(),
  doctorId: z.string()
  
});
