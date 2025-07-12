"use server"
import dbConnect from "../dbConnect";
import Doctor from "../models/doctor.model";
import Appointment from "../models/appointment.model";
import { parseStringify } from "../utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// Define the interface for Doctor
interface Doctor {
  doctorId: string;
  name: string;
  phone: string;
  email: string;
  specialities: string;
  experience: string;
  qualifications: string;
  certificate: string;
  profile_photo: string; 
  hospitalName: string;
  address: string;
    days: string; 
    hours: string; 
  onboarded: boolean;
  path: string; 
}

export async function createDoctor(doctorData: Doctor) {
  const user = await currentUser();
  if (!user) return null;

  const doctorId = user.id; // Use the current user's ID as the doctor ID

  try {
    // Connect to the database
    await dbConnect();

    // Check if a doctor with this ID already exists
    const existingDoctor = await Doctor.findOne({ doctorId });

    let result;
    if (existingDoctor) {
      // Update the existing doctor
      result = await Doctor.findOneAndUpdate(
        { doctorId }, // Query
        { $set: doctorData }, // Update
        { new: true } // Options: return the updated document
      );
    } else {
      // Create a new doctor
      doctorData.doctorId = doctorId; // Assign the doctor ID
      result = await Doctor.create(doctorData);
    }

    revalidatePath(doctorData.path);

    return parseStringify(result); // Return the updated or created doctor document

  } catch (error: unknown) {
    console.error("Error creating or updating doctor:", error);
    throw new Error("Failed to create or update doctor");
  }
}

export async function checkDoctorRegistration() {
  const user = await currentUser();

  if (!user) {
    // Handle the case where there is no user logged in
    throw new Error("User not authenticated");
  }

  try {
    // Connect to the database
    await dbConnect();

    // Check if a doctor exists with the current user ID
    const doctor = await Doctor.findOne({ doctorId: user.id }).exec();

    if (doctor) {
      // If doctor details are found, redirect to the dashboard
      redirect(`/doctor/${user.id}/dashboard`);
    } else {
      // If no doctor details are found, redirect to the registration form
      redirect(`/doctor/register`);
    }
  } catch (error) {
    console.error("Failed to check doctor registration:", error);
    throw new Error("Failed to check doctor registration");
  }
}


export const getDoctor = async () => {
  try {
    await dbConnect();
    const doctors = await Doctor.find();
    if (!doctors || doctors.length === 0) {
      throw new Error('No doctors found');
    }
    return parseStringify(doctors);
  } catch (error) {
    console.error('Failed to fetch doctors:', error);
    throw new Error('Failed to fetch doctors');
  }
};


export const getDoctorAppointment = async () => {
  const user = await currentUser();
  const doctorId = user!.id;

  try {
    await dbConnect();

    // Check if doctorId is a valid string and handle it appropriately
    if (!doctorId || typeof doctorId !== 'string' || doctorId.length === 0) {
      throw new Error(`Invalid DoctorId: ${doctorId}`);
    }
 
    // Fetch doctor by Clerk ID
    const doctor = await Doctor.findOne({  doctorId }).lean(); // Adjust field name if necessary
    if (!doctor) {
      throw new Error(`Doctor with Clerk ID ${doctorId} not found`);
    }

    // Fetch all appointments for the doctor
    const appointments = await Appointment.find({ _id: { $in: doctor.appointment } })
    .sort({ schedule: -1 }) 
    .lean();
 
    if (!appointments || appointments.length === 0) {
      return parseStringify({
        totalCount: 0,
        scheduledCount: 0,
        pendingCount: 0,
        cancelledCount: 0,
        appointments: [],
      });
    }

    // Count appointment statuses
    const counts = appointments.reduce((acc, appointment) => {
      if (appointment.status === 'scheduled') {
        acc.scheduledCount += 1;
      } else if (appointment.status === 'pending') {
        acc.pendingCount += 1;
      } else if (appointment.status === 'cancelled') {
        acc.cancelledCount += 1;
      }
      return acc;
    }, {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    });

    // Return data in parsed format
    return parseStringify({
      totalCount: appointments.length,
      ...counts,
      appointments: parseStringify(appointments),
    });
  } catch (error) {
    console.error("Error fetching appointments for doctor:", error);
    return parseStringify(null); // Consistent return type
  }
};

export const getDoctorById = async (doctorId: string) => {
  await dbConnect(); 
  const doctors = await Doctor.findOne({  doctorId }).exec();
  
  if (!doctors) {
    throw new Error(`Doctor with ID ${doctorId} not found`);
  }

  return parseStringify(doctors);
};

export const getDoctorByDoctorId = async (doctorId: string) => {
  await dbConnect(); // Connect to the database

  const doctor = await Doctor.findOne({  doctorId }).exec();
 
  return parseStringify(doctor)
};