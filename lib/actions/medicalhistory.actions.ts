"use server"

import { SubmitLabReportHistoryParams, SubmitMedicalHistoryParams, SubmitPrescriptionHistoryParams } from "@/types";
import dbConnect from "../dbConnect";
import { parseStringify } from "../utils";
import VaccinationRecord from "../models/vaccinationrecord.model";
import PrescriptionRecord from "../models/Prescription.model";
import LabReport from "../models/labreport.model";

export const submitVaccinationRecord = async ({
  vaccineName,
  dateOfVaccination,
  dosage,
  healthcareProvider,
  certificateUrl,
  userId
}: SubmitMedicalHistoryParams) => {
  try {
    dbConnect();

    // Custom validation for userId if it's a custom string
    if (typeof userId !== 'string' || !userId.startsWith('user_')) {
      throw new Error(`Invalid userId: ${userId}`);
    }

    const updateFields: Record<string, unknown> = {
      vaccineName,
      dateOfVaccination,
      dosage,
      healthcareProvider,
      certificateUrl,
      userId
    };

    const history = await VaccinationRecord.create(updateFields);
    return parseStringify(history);
  } catch (error) {
    console.error("An error occurred while creating a new Vaccine Record:", error);
  }
};


export const submitPrescriptionRecord = async ({
  prescriptionName,
  dateIssued,
  additionalNotes,
  prescribingDoctor,
  prescriptionFileUrl,
  userId
}: SubmitPrescriptionHistoryParams) => {
  try {
    dbConnect();

    // Custom validation for userId if it's a custom string
    if (typeof userId !== 'string' || !userId.startsWith('user_')) {
      throw new Error(`Invalid userId: ${userId}`);
    }

    const updateFields: Record<string, unknown> = {
      prescriptionName,
      dateIssued,
      additionalNotes,
      prescribingDoctor,
      prescriptionFileUrl,
      userId
    };

    const history = await PrescriptionRecord.create(updateFields);
    return parseStringify(history);
  } catch (error) {
    console.error("An error occurred while creating a new prescription Record:", error);
  }
};


export const submitLabReportRecord = async ({
  testName,
  dateOfTest,
  description,
  healthcareProvider,
  labReportUrl,
  userId
}: SubmitLabReportHistoryParams) => {
  try {
    dbConnect();

    // Custom validation for userId if it's a custom string
    if (typeof userId !== 'string' || !userId.startsWith('user_')) {
      throw new Error(`Invalid userId: ${userId}`);
    }

    const updateFields: Record<string, unknown> = {
      testName,
      dateOfTest,
      description,
      healthcareProvider,
      labReportUrl,
      userId
    };

    const history = await LabReport.create(updateFields);
   
    return parseStringify(history);
  } catch (error) {
    console.error("An error occurred while creating a new lab report Record:", error);
  }
};


  export const getVaccinationRecordById = async (userId: string) => {
    try {
      await dbConnect();
      if (!userId || typeof userId !== 'string') {
        throw new Error("Invalid userId");
      }
  
      // Use find to get all records for the userId
      const history = await VaccinationRecord.find({ userId }).sort({createdAt: -1}); 
      return parseStringify(history);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch vaccination record");
    }
  };
  
  export const getPrescriptionRecordById = async (userId: string) => {
    try {
      await dbConnect();
      if (!userId || typeof userId !== 'string') {
        throw new Error("Invalid userId");
      }
  
      // Use find to get all records for the userId
      const history = await PrescriptionRecord.find({ userId }).sort({createdAt: -1}); 
      return parseStringify(history);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch prescription record");
    }
  };

  export const getLabReportById = async (userId: string) => {
    try {
      await dbConnect();
      if (!userId || typeof userId !== 'string') {
        throw new Error("Invalid userId");
      }
  
      // Use find to get all records for the userId
      const history = await LabReport.find({ userId }).sort({createdAt: -1}); 
      return parseStringify(history);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch lab report");
    }
  };
  