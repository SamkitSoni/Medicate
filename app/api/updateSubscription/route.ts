import dbConnect from '@/lib/dbConnect';
import Doctor from '@/lib/models/doctor.model';
import { NextResponse } from 'next/server';
// import { sendReminderSms } from '@/lib/sms'; // You need to implement this function to send SMS

export async function POST() {
  try {
    await dbConnect();

    // Find doctors with expired subscriptions or those about to expire in 5 days
    const now = new Date();
    const reminderDate = new Date();
    reminderDate.setDate(now.getDate() + 5);

    // Update expired subscriptions
    await Doctor.updateMany(
      { 'subscription.endDate': { $lt: now } },
      { $set: { 'subscription.basicPlan': false, 'subscription.expertCarePlus': false, 'subscription.eliteCarePremier': false } }
    );

    return NextResponse.json({ message: 'Subscriptions updated and reminders sent successfully' });
  } catch (error) {
    console.error('Error updating subscriptions:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
