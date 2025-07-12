/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
  };
  
  declare type Gender = "male" | "female" | "other";
  declare type Status = "pending" | "scheduled" |  "cancelled";
  
  declare interface CreateUser extends RegisterUserParams {
    name: string;
    email: string;
    phone: string;
  }

  declare interface User extends CreateUserParams {
    id: string;
    name: string;
    email: string;
    phone: string;
  }

  export interface Doctor extends Document {
    map(arg0: (doc: { _id: import("react").Key | null | undefined; profile_photo: string | import("next/dist/shared/lib/get-img-props").StaticImport; name: string | number | bigint | boolean | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | Iterable<import("react").ReactNode> | import("react").ReactPortal | Promise<import("react").AwaitedReactNode> | null | undefined; }) => import("react").JSX.Element): import("react").ReactNode;
    length: number;
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
    hours: string;
    profile_photo: string;
    onboarded: boolean;
    appointment: string[]; // Change according to your needs
    subscription: {
      basicPlan:boolean;
      eliteCarePremier: boolean;
      expertCarePlus:boolean;
    };  
  }
  
  declare interface RegisterUserParams{
    profile_photo: string | undefined;
    name:string;
    email:string;
    phone:string;
    userId:string | undefined;
    dob: date;
    gender: Gender;
    address: string;
    occupation: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    primaryPhysician: string;
    insuranceProvider: string;
    insurancePolicyNumber: string;
    allergies: string | undefined;
    currentMedications: string | undefined;
    medicalHistory: string | undefined ;
    identificationType: string;
    identificationNumber: string;
    identificationDocument: string | undefined;    
    privacyConsent: boolean;
    treatmentConsent: boolean;
    disclosureConsent: boolean;
    registered: boolean;
  }

  declare interface SubmitMedicalHistoryParams {
    userId: string;
    vaccineName: string;
    healthcareProvider: string;
    dateOfVaccination: Date;
    dosage: string;
    certificateUrl:  string | undefined;    
  }

  declare interface SubmitPrescriptionHistoryParams {
    userId: string;
    prescriptionName: string;
    prescribingDoctor: string;
    dateIssued: Date;
    additionalNotes: string;
    prescriptionFileUrl:  string | undefined;    
  }

  declare interface SubmitLabReportHistoryParams {
    userId: string;
    testName: string;
    healthcareProvider: string;
    dateOfTest: Date;
    description: string;
    labReportUrl:  string | undefined;
  }
  
  declare interface CreateAppointmentParams  {
    userId: string;
    primaryPhysician: string;
    reason: string;
    schedule: Date;
    status: Status;
    note: string | undefined;
    patientId: string;
  };
  
 declare type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  patientId: string;
  appointment: {
    primaryPhysician: string;
    reason?: string; 
    schedule: Date;
    status: Status;
    note?: string;  
    userId: string;
    patientId: string;
    cancellationReason?: string;
  };
  type: "schedule" | "cancel";
  };




  export interface Appointment  {
    _id: string;
    patient: {
      _id: string;
      name: string;
    };    schedule: Date;
    status: Status;
    primaryPhysician: {
      email: string;
      doctorId: string;
      _id: string;
      name: string;
      profilePhoto?: string;
    };
    reason: string;
    note: string;
    userId: string;
    cancellationReason: string;
  }

  export interface Doctorss {
    _id: string;
    name: string;
    profilePhoto?: string;
    doctorId: string;
    email: string;
    // Add other properties as needed
  }
