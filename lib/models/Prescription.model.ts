import mongoose, { Schema, Document, Model } from 'mongoose';

interface IPrescription extends Document {
    userId: string;
    prescriptionName: string;
    prescribingDoctor: string;
    dateIssued: Date;
    additionalNotes:string;
    prescriptionFileUrl: string;
  }

const PrescriptionSchema : Schema = new Schema({
    userId: { type: String, required: true },
    prescriptionName: { type: String, required: true },
    prescribingDoctor: { type: String, required: true },
    dateIssued: { type: Date, required: true },
    prescriptionFileUrl: { type: String },
    additionalNotes: { type: String },
    
  }, {
    timestamps: true,
  });
  
  const PrescriptionRecord: Model<IPrescription> = mongoose.models.PrescriptionRecord || mongoose.model<IPrescription>('PrescriptionRecord', PrescriptionSchema );
  
  export default PrescriptionRecord;

