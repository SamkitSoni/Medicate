"use client";
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { patientsubscriptionPlans } from '@/constants';
import { IndianRupee } from 'lucide-react';
import Image from 'next/image';

// Define interfaces for type safety
// Note: Window.Razorpay is declared in Subscribe.tsx to avoid conflicts

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface SubscribeProps {
  patient: {
    name: string;
    email: string;
    phone: string;
    address: string;
    userId: string;
  };
}

const PatientSubscribe = ({ patient }: SubscribeProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => console.log('Razorpay script loaded');
    script.onerror = () => console.error('Failed to load Razorpay script');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubscribe = async (planId: string, amount: number) => {
    try {
      setLoading(true);
      setSelectedPlan(planId);
  
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });
  
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }  

      const { subscription } = await res.json();

            // Check if Razorpay script is loaded
            if (!window.Razorpay) {
                throw new Error('Razorpay script not loaded');
              }
  
  
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: subscription.amount,
        currency: subscription.currency,
        name: "Medicate",
        description: "Subscription Payment",
        image: "/assets/icons/logo-icon.svg",
        order_id: subscription.id,
        handler: async function (response: RazorpayResponse) {
            try {
            await fetch('/api/update-patient-verification', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                patientId: patient.userId,
                selectedPlan: planId,
                paymentId: response.razorpay_payment_id,
              }),
            });
            alert('Payment Successful');
            redirect(`/patients/${patient.userId}/medical-records/add-medical-records`);
          } catch (error) {
            console.error('Error updating patient verification:', error);
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: patient.name,
          email: patient.email,
          contact: patient.phone,
        },
        notes: {
            address: patient.address,
            invoice_id: subscription.invoice_id,
          },
        theme: { color: "#24AE7C" },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
      rzp.on('payment.failed', function (response: { error: { description: string; }; }) {
        alert('Payment Failed: ' + response.error.description);
        setLoading(false);
      });
    } catch (error) {
      console.error('Error in subscription:', error);
      alert('An error occurred during the subscription process. Please try again.');
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col md:flex-row justify-center text-gray-800 dark:text-white items-center gap-6 p-3 sm:p-5 w-full min-h-screen bg-white dark:bg-dark-300">
      {patientsubscriptionPlans.map((plan) => (
        <Card key={plan.id} className={`${plan.card}`}>
          <CardHeader className='mb-4'>
            <CardTitle className='font-bold text-green-500 text-4xl'>{plan.title}</CardTitle>
            <CardDescription className="text-2xl font-bold flex">
              <IndianRupee />{plan.amount}/month
              <span className='text-lg text-white sm:text-lg font-light flex justify-center items-center ml-2 bg-green-500 rounded-md'>{plan.head}</span>
            </CardDescription>
            <h1>{plan.description}</h1>
          </CardHeader>
          <CardContent className='flex flex-col gap-5'>
            <ul className='list-disc list-inside flex flex-col gap-3 h-[60vh]'>
              {plan.features.map((feature) => (
                <p key={feature.id} className='flex gap-2 items-center'>
                  <Image src={feature.img} width={20} height={20} alt='feature' />
                  {feature.title}
                </p>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className={plan.btn} onClick={() => handleSubscribe(plan.id.toString(), plan.amount)} disabled={loading}>
              {loading && selectedPlan === plan.id ? 'Processing...' : plan.button}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
};

export default PatientSubscribe;
