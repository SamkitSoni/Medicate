import cron from 'node-cron';
import dbConnect from '../dbConnect';
import Patient from '../models/patient.model';


// Connect to the database
dbConnect();

// Schedule a job to run every day at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Running daily subscription check...');

  try {
    const now = new Date();

    // Update all subscriptions that have expired
    const result = await Patient.updateMany(
      { 'subscription.endDate': { $lt: now } }, // Condition: endDate is in the past
      {
        $set: {
          'subscription.Basic': false,
          'subscription.Plus': false,
          'subscription.Premium': false,
        },
      }
    );

    console.log(`Updated ${result.modifiedCount} expired subscriptions.`);
  } catch (error) {
    console.error('Error updating subscriptions:', error);
  }
});
