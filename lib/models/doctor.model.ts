import mongoose, { Schema, Document, Model } from 'mongoose';
import { IAppointment } from './appointment.model';

export interface IDoctor extends Document {
  doctorId: string;
  name: string;
  email: string;
  phone: string;
  specialities: string;
  qualifications: string;
  experience: string;
  hospitalAffiliation?: string;
  address?: string;
  days: string;
  certificate: string;
  hours: string; 
  profile_photo: string;
  onboarded: boolean;
  appointment: IAppointment[];
  subscription: {
    basicPlan: boolean;
    expertCarePlus: boolean;
    eliteCarePremier: boolean;
    startDate?: Date;
    endDate?: Date;
  };
  
}

const DoctorSchema: Schema = new Schema({
  doctorId: {
    type: String,
    unique: true,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  specialities: { type: String, required: true },
  qualifications: { type: String },
  experience: { type: String, required: true },
  hospitalName: { type: String },
  address: { type: String },
    days: { type: String },
    hours: {
     type: String,
  },
  profile_photo: { type: String, },
  certificate: { type: String, },
  appointment: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  }],
  onboarded: {
    type: Boolean,
    default: false
  },
  subscription: {
    basicPlan: { type: Boolean, default: false },
    expertCarePlus: { type: Boolean, default: false },
    eliteCarePremier: { type: Boolean, default: false },
    startDate: { type: Date },
    endDate: { type: Date },
  },
}, {
  timestamps: true,
});

const Doctor: Model<IDoctor> = mongoose.models.Doctor || mongoose.model<IDoctor>('Doctor', DoctorSchema);

export default Doctor;
