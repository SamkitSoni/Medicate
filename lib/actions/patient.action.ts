"use server"
import { RegisterUserParams } from "@/types";
import dbConnect from "../dbConnect";
import Patient from "../models/patient.model";
import { parseStringify } from "../utils";
import { revalidatePath } from 'next/cache';

export interface CreateUser {
  userId?: string;
  name: string;
  email: string;
  phone: string;
}

export async function createUser(user:CreateUser) {
    try {
      await dbConnect();

     const newPatient = await Patient.create(user);
    
      return parseStringify(newPatient);

      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        throw new Error(`Failed to create user: ${errorMessage}`);
      }


}

export const getUser = async (userId: string) => {
  try {
    await dbConnect();
     
    const user = Patient.findOne({ userId }).exec();
    return parseStringify(user);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch user");
  }
};

export const registerPatient = async ({
  profile_photo,
  name,
  email,
  phone,
  userId,
  dob,
  gender,
  address,
  occupation,
  emergencyContactName,
  emergencyContactNumber,
  primaryPhysician,
  insuranceProvider,
  insurancePolicyNumber,
  allergies,
  currentMedications,
  medicalHistory,
  identificationType,
  identificationNumber,
  identificationDocument,
  privacyConsent,
  treatmentConsent,
  disclosureConsent,
  registered
}: RegisterUserParams) => {
  try {
    dbConnect();

    const updateFields: Record<string, unknown> = {
      userId,
      profile_photo,
      name,
      email,
      phone,
      dob,
      gender,
      address,
      occupation,
      emergencyContactName,
      emergencyContactNumber,
      primaryPhysician,
      insuranceProvider,
      insurancePolicyNumber,
      allergies,
      currentMedications,
      medicalHistory,
      identificationType,
      identificationNumber,
      identificationDocument,
      privacyConsent,
      treatmentConsent,
      disclosureConsent,
      registered
    };

    const existingPatient = await Patient.findOne({ userId });

    let result;
    if (existingPatient) {
      // Update the existing patient
      result = await Patient.findOneAndUpdate(
        { userId },
        { $set: updateFields },
        { new: true }
      );
    } else {
      // Create a new patient
      updateFields.userId = userId;
      result = await Patient.create(updateFields);
    }

    // Specify the path to revalidate
    revalidatePath(`/patients/${userId}/profile`);

    return parseStringify(result);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};


export const getPatient = async (userId: string) => {
  try {
    await dbConnect();
    if (!userId || typeof userId !== 'string') {
      throw new Error("Invalid userId");
    }
    const user = await Patient.findById(userId);
    return parseStringify(user);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch patient");
  }
};

export const getPatientById = async (userId: string) => {
  try {
    await dbConnect();
    if (!userId || typeof userId !== 'string') {
      throw new Error("Invalid userId");
    }
    const user = await Patient.findOne({ userId }); // Query based on a custom `userId` field
    return parseStringify(user);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch patient");
  }
};
