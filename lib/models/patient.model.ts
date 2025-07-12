import mongoose, { Schema, Document, Model } from 'mongoose';

interface IPatient extends Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  privacyConsent: boolean;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  address: string;
  occupation: string;
  emergencyContactName?: string;
  emergencyContactNumber?: string;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  dob?: Date;
  gender?: 'male' | 'female' | 'other';
  medicalHistory?: string;
  identificationType?: string;
  identificationDocumentId?: string;
  primaryPhysician?: string;
  identificationDocumentUrl?: string;
  currentMedications?: string;
  allergies?: string;
  subscription: {
    basic: boolean;
    plus: boolean;
    premium: boolean;
    startDate?: Date;
    endDate?: Date;
  };
}

const PatientSchema: Schema = new Schema({
  userId: { type: String, unique: true},
  profile_photo: { type: String, },
  name: { type: String, },
  email: { type: String,},
  phone: { type: String,  },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  dob: { type: Date },
  occupation: { type: String },
  address: { type: String},
  emergencyContactName: { type: String },
  emergencyContactNumber: { type: String },
  status: { type: String, required: true, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  privacyConsent: { type: Boolean },
  disclosureConsent: {type: Boolean},
  treatmentConsent: {type: Boolean},
  insuranceProvider:{type: String},
  insurancePolicyNumber:{type: String},
  medicalHistory: { type: String },
  identificationType: { type: String },
  identificationDocument:{type: String},
  primaryPhysician: {type: String},
  currentMedications: { type: String },
  allergies: { type: String },
  registered: { type: Boolean, default: false },
  subscription: {
    basic: { type: Boolean, default: false },
    plus: { type: Boolean, default: false },
    premium: { type: Boolean, default: false },
    startDate: { type: Date },
    endDate: { type: Date },
  },
}, {
  timestamps: true,
});

const Patient: Model<IPatient> = mongoose.models.Patient || mongoose.model<IPatient>('Patient', PatientSchema);

export default Patient;
