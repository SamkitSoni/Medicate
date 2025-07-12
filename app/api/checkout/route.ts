import Razorpay from 'razorpay';


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});


export async function POST(request: Request) {
  try {

    const { amount } = await request.json();
    
    // Create an order with Razorpay
    const subscription = await razorpay.orders.create({
      amount: amount*100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        key1: "value3",
        key2: "value2"
      }
    });

    return new Response(JSON.stringify({ subscription }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error creating subscription:', error); // Add logging
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
