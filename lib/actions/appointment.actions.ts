"use server"

import Appointment from "../models/appointment.model";
import { formatDateTime, parseStringify } from "../utils";
import dbConnect from "../dbConnect";
import mongoose from "mongoose";
import Doctor from "../models/doctor.model";
import Patient from "../models/patient.model";
import twilio from 'twilio';
import { revalidatePath } from "next/cache";

const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_ID; 
const authToken = process.env.TWILIO_AUTH_TOKEN;



export const createAppointment = async (appointmentData: {
  userId: string;
  primaryPhysician: string;
  reason: string;
  schedule: Date;
  status: string;
  note: string | undefined;
}) => {
  await dbConnect();

  try {
    const { userId, primaryPhysician, reason, schedule, status, note } = appointmentData;

    // Custom validation for userId if it's not a MongoDB ObjectId
    if (typeof userId !== 'string' || !userId.startsWith('user_')) {
      throw new Error(`Invalid userId: ${userId}`);
    }

    // Find the doctor by primaryPhysician ID
    const physician = await Doctor.findById(primaryPhysician);
    if (!physician) {
      throw new Error(`Primary Physician not found with ID: ${primaryPhysician}`);
    }

    // Find the patient by custom userId (modify query based on your schema)
    const patient = await Patient.findOne({ userId }, 'name phone email');
    if (!patient) {
      throw new Error(`Patient not found with ID: ${userId}`);
    }

    // Create the appointment
    const newAppointment = new Appointment({
      userId: userId,  // Store the custom userId as-is
      doctorId: physician._id,
      primaryPhysician: {
        _id: physician._id,
        name: physician.name,
        profilePhoto: physician.profile_photo,
      },
      reason,
      schedule,
      status,
      note,
      patient: {
        _id: patient._id,
        name: patient.name,
        phone: patient.phone,
        email: patient.email,
      },
    });

    await newAppointment.save();

    await Doctor.updateOne(
      { _id: physician._id },
      { $addToSet: { appointment: newAppointment._id } }
    );

    return JSON.parse(JSON.stringify(newAppointment));
  } catch (error) {
    console.error('An error occurred while creating a new appointment:', error);
    throw new Error('Error creating appointment');
  }
};




export const getAppointmentsByUserId = async (userId: string) => {
  try {
    // Fetch all appointments for the given user ID
    const appointments = await Appointment.find({ userId }).lean();
    return appointments.length > 0 ? parseStringify(appointments) : null;
  } catch (error) {
    console.error("Error fetching appointments for user:", error);
    return null;
  }
};




type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  appointment: {
    primaryPhysician: {
      name: string;
  profile_photo?: string;
  _id: string;
    };
    reason: string;
    schedule: Date;
    status: string;
    note: string;
    userId: string;
    cancellationReason?: string;
  };
  type: "schedule" | "cancel";
};



export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    await dbConnect();

    // Custom validation for userId if it's not a MongoDB ObjectId
    if (typeof userId !== 'string' || !userId.startsWith('user_')) {
      throw new Error(`Invalid userId: ${userId}`);
    }
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      appointment,
      { new: true }
    );

    if (!updatedAppointment) {
      throw new Error("Failed to update appointment");
    }

    let message: string;

    //find appointment by appointmentId

    const appointments = await Appointment.findById(appointmentId).exec();

    if (!appointment) {
      console.error(`No appointment found with ID: ${appointmentId}`);
      return null;
    }
       // @ts-expect-error: appointments structure may not match exact type definition
    const doctorName = appointments?.primaryPhysician.name;

    if (type === "schedule") {
      message = `Greetings from Medicate. Your appointment is confirmed for ${formatDateTime(
        appointment.schedule
      ).dateTime}  with Dr.  ${doctorName || 'Unknown'}. Note: ${appointment.note}`;
    } else if (type === "cancel") {
      message = `We regret to inform you that your appointment for ${formatDateTime(
        appointment.schedule
      ).dateTime} is cancelled. Reason: ${appointment.cancellationReason}.`;
    } else {
      message = "";
    }

    await notifyPatient(userId, message);


    await revalidatePath('/doctor')
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error("An error occurred while updating an appointment:", error);
    throw new Error("Failed to update appointment");
  }
};


export const getAppointment = async (appointmentId: string) => {
  try {
    // Validate if appointmentId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      throw new Error("Invalid ObjectId");
    }

    // Find appointment by id
    const appointment = await Appointment.findById(appointmentId).lean();
    return appointment ? parseStringify(appointment) : null;
  } catch (error) {
    console.error("Error fetching appointment:", error);
    return null;
  }
};



// Send SMS Notification
export const sendSMSNotification = async (phoneNumber: string, message: string) => {
  try {
    const client = twilio(accountSid, authToken);

    const messageResponse = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });
    return messageResponse;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw new Error('Failed to send SMS notification');
  }
};

const getPatientPhoneNumber = async (userId: string): Promise<string | null> => {
  const patient = await Patient.findOne({userId});
  return patient ? patient.phone : null;
};

const notifyPatient = async (userId: string, message: string) => {
  const phoneNumber = await getPatientPhoneNumber(userId);

  if (phoneNumber) {
    sendSMSNotification(phoneNumber, message)
      .then(() => {
        console.log('Message sent successfully');
      })
      .catch(error => {
        console.error('Failed to send SMS:', error);
      });
  } else {
    console.error('Patient phone number not found');
  }
};