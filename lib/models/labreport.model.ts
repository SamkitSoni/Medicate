import mongoose, { Schema, Document, Model } from 'mongoose';

interface ILabReport extends Document {
    userId: string;
    testName: string;
    healthcareProvider: string;
    dateOfTest: Date;
    description:string;
    labReportUrl: string;
  }

const LabReportSchema  : Schema = new Schema({
    userId: { type: String , required: true },
    testName: { type: String, required: true },
    dateOfTest: { type: Date, required: true },
    healthcareProvider: { type: String, required: true },
    labReportUrl: { type: String },
    description: { type: String },
    
  }, {
    timestamps: true,
  });
  
  const LabReport: Model<ILabReport> = mongoose.models.LabReport || mongoose.model<ILabReport>('LabReport', LabReportSchema  );
  
  export default LabReport;

