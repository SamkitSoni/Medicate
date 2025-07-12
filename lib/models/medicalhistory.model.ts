import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the Medical History document
interface IMedicalHistory extends Document {
  userId:string;
  patientName: string;
  previousDoctors?: string;
  currentDiseases?: string;
  medications?: string;
  medicalDocuments: string;
}

// Define the Medical History schema
const MedicalHistorySchema: Schema<IMedicalHistory> = new Schema(
  {
    userId: {type: String, required: true},
    patientName: { type: String, required: true }, // Patient name is required
    previousDoctors: { type: String }, // Optional field for previous doctors
    currentDiseases: { type: String }, // Optional field for current diseases
    medications: { type: String }, // Optional field for list of medications
    medicalDocuments: {type: String},
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the model for the Medical History collection
const MedicalHistory: Model<IMedicalHistory> = mongoose.models.MedicalHistory || mongoose.model<IMedicalHistory>('MedicalHistory', MedicalHistorySchema);

export default MedicalHistory;
