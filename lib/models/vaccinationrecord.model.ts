import mongoose, { Schema, Document, Model } from 'mongoose';

interface IVaccination extends Document {
  userId: string;
  vaccineName: string;
  dateOfVaccination: Date;
  dosage: string;
  healthcareProvider: string;
  certificateUrl: string;
}

const VaccinationRecordSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    vaccineName: { type: String, required: true },
    dateOfVaccination: { type: Date, required: true },
    dosage: { type: String, required: true },
    healthcareProvider: { type: String, required: true },
    certificateUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

// Correct model check
const VaccinationRecord: Model<IVaccination> =
  mongoose.models.VaccinationRecord || mongoose.model<IVaccination>('VaccinationRecord', VaccinationRecordSchema);

export default VaccinationRecord;
