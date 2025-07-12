"use client";
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { subscriptionPlans } from '@/constants';
import { IndianRupee } from 'lucide-react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

// Define interfaces for type safety
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string | undefined;
  amount: number;
  Currency?: string;
  currency?: string;
  name: string;
  description: string;
  image: string;
  order_id: string;
  handler: (response: RazorpayResponse) => Promise<void>;
  prefill?: {
    name: string;
    email: string;
    contact: string;
  };
  notes?: {
    address: string;
    invoice_id: string;
  };
  theme: { color: string };
  method?: {
    emi: boolean;
    paylater: boolean;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open(): void;
  on(event: string, callback: (response: RazorpayFailureResponse) => void): void;
}

interface RazorpayFailureResponse {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: {
      order_id: string;
      payment_id: string;
    };
  };
}

interface SubscribeProps {
    doctor: {
      name: string;
      email: string;
      phone: string;
      address: string;
      doctorId:string;
    };
  }

const Subscribe = ({doctor}:SubscribeProps) => {
  const [, setSelectedPlan] = useState<string | null>(null);

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

  const handleSubscribe = async (planId:string, amount: number) => {
    try {

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
        Currency: subscription.currency,
        name: "Medicate",
        description: "Subscription Payment",
        image: "/assets/icons/logo-icon.svg",
        order_id: subscription.id, 
        handler: async function (response: RazorpayResponse) {
          try {
            await fetch('/api/update-doctor-verification', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                doctorId: doctor.doctorId,
                selectedPlan: planId,
                paymentId: response.razorpay_payment_id,
              }),
            });
  
            alert('Payment Successful');
            redirect(`/doctor/${doctor.doctorId}/profile`)
          } catch (error) {
            console.error('Error updating doctor verification:', error);
            redirect(`/doctor/${doctor.doctorId}/profile`)
          }
        },
        prefill: {
          name: doctor.name,
          email: doctor.email,
          contact: doctor.phone,
        },
        notes: {
          address: doctor.address,
          invoice_id: subscription.invoice_id,
        },
        theme: {
          color: "#24AE7C",
          
        },
        method: {
            emi: false,  
            paylater: false,
          },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on('payment.failed', function (response: RazorpayFailureResponse) {
        alert('Payment Failed');
        console.error('Error:', response.error);
      });
    } catch (error) {
      console.error('Error in subscription:', error);
    }
  };

  return (
   <>
    
    <section className="flex flex-col md:flex-row justify-center text-gray-800 dark:text-white items-center gap-6  sm:p-5 w-full min-h-screen bg-white dark:bg-dark-300">
      {subscriptionPlans.map((plan) => (
        <Card key={plan.id} className={plan.card}>
          <CardHeader className='mb-4'>
            <CardTitle className='font-bold text-green-500 text-4xl'>{plan.title}</CardTitle>
            <CardDescription className="text-2xl font-bold flex "><IndianRupee/>{plan.amount}/month<span className='text-lg sm:text-lg font-light flex justify-center items-center ml-2 bg-green-500 text-white rounded-md'>{plan.head}</span></CardDescription>
            <h1>{plan.description}</h1>
          </CardHeader>
          <CardContent className='flex flex-col gap-5'>
          <ul className='list-disc list-inside flex flex-col gap-3 h-[60vh]'>
              {plan.features.map((feature) => (
                <p key={feature.id} className='flex gap-2 items-center'><Image src={feature.img} width={20} height={20} alt='feature'/>{feature.title}</p>
              ))}
            </ul>          
            </CardContent>
          <CardFooter className="flex justify-center">
            <Button className={plan.btn} onClick={() => handleSubscribe(plan.id.toString(), plan.amount)}>Get Started</Button>
          </CardFooter>
        </Card>
      ))}
    </section>
   </>
  );
};

export default Subscribe;
