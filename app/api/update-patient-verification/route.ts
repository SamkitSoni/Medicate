import dbConnect from "@/lib/dbConnect";
import Patient from "@/lib/models/patient.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { patientId, paymentId, selectedPlan } = await req.json();


    if (!patientId || !paymentId || !selectedPlan) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const now = new Date();
    const endDate = new Date();
    endDate.setDate(now.getDate() + 30);

    const subscriptionUpdate = {
      'subscription.basic': selectedPlan === 'basic',
      'subscription.plus': selectedPlan === 'plus',
      'subscription.premium': selectedPlan === 'premium',
      'subscription.startDate': now,
      'subscription.endDate': endDate,
    };


    const updatedPatient = await Patient.findOneAndUpdate(
      { userId: patientId },
      { $set: { ...subscriptionUpdate, paymentId } },
      { new: true }
    );

    if (!updatedPatient) {
      return NextResponse.json({ message: 'Patient not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Subscription updated successfully', patient: updatedPatient });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error updating Patient verification:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: errorMessage }, { status: 500 });
  }
}
