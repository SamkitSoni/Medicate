import razorpay from '@/lib/payments/razorpay';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, contact } = req.body;

    try {
      const customer = await razorpay.customers.create({
        name,
        email,
        contact,
      });

      res.status(200).json({ customer });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      res.status(500).json({ error: errorMessage });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
