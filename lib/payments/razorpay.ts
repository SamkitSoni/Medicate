import Razorpay from 'razorpay'


const razorpayKeyId = process.env.RAZORPAY_KEY_ID as string;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET as string;

if (!razorpayKeyId || !razorpayKeySecret) {
  throw new Error('Razorpay keys are not defined in environment variables.');
}

const razorpay = new Razorpay({ 
    key_id: razorpayKeyId, 
    key_secret: razorpayKeySecret 
})


export default razorpay