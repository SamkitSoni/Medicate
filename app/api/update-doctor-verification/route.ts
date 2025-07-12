
import dbConnect from '@/lib/dbConnect';
import Doctor from '@/lib/models/doctor.model';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const { doctorId, paymentId, selectedPlan } = await req.json();


    if (!doctorId || !paymentId || !selectedPlan) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const now = new Date();
    const endDate = new Date();
    endDate.setDate(now.getDate() + 30);

    const subscriptionUpdate = {
      'subscription.basicPlan': selectedPlan === 'basicPlan',
      'subscription.expertCarePlus': selectedPlan === 'expertCarePlus',
      'subscription.eliteCarePremier': selectedPlan === 'eliteCarePremier',
      'subscription.startDate': now,
      'subscription.endDate': endDate,
    };

    // Update the doctor's verification status
    const updatedDoctor = await Doctor.findOneAndUpdate(
      { doctorId },
      { $set: { ...subscriptionUpdate, paymentId } },
      { new: true }
    );

    if (!updatedDoctor) {
      return NextResponse.json({ message: 'Doctor not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Subscription updated successfully', doctor: updatedDoctor });
  } catch (error) {
    console.error('Error updating doctor verification:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
