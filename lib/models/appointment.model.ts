import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAppointment extends Document {
  patient: mongoose.Types.ObjectId;
  schedule: Date;
  reason: string;
  note?: string; 
  primaryPhysician: string;
  status: 'scheduled' |'pending' | 'cancelled'; 
  userId: mongoose.Types.ObjectId;
  cancellationReason?: string;
}

const AppointmentSchema: Schema = new Schema({
  appointmentId: {
    type: String,
  },
  patient: {
     id:{
      type: Schema.Types.ObjectId,
      ref: 'Patient',
     },
    name: {
      type: String,
    },

  },
  schedule: {
    type: Date,
  },
  reason: {
    type: String,
  },
  note: {
    type: String,
  },
  primaryPhysician: {
    _id: { type: Schema.Types.ObjectId, ref: 'PrimaryPhysician' },
    name: { type: String },
    profilePhoto: { type: String},
  },

  status: {
    type: String,
    enum: ['scheduled', 'pending', 'cancelled'],
    required: true,
    default: 'pending',
  },

  userId: {
    type: String,
  },
  cancellationReason: {
    type: String,
  },
}, {
  timestamps: true,
});


const Appointment: Model<IAppointment> = mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);

export default Appointment;
