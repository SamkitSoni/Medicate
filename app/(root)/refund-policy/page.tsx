import Link from 'next/link';
import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-dark-300 text-gray-800 dark:text-white">
      <header className="bg-gray-800 text-white p-4">
        <section className="container mx-auto flex justify-between">
          <Link href="/terms-and-conditions" className="hover:text-gray-400">Terms and Conditions</Link>
          <Link href="/privacy-policy" className="hover:text-gray-400">Privacy Policy</Link>
          <Link href="/contact-us" className="hover:text-gray-400">Contact Us</Link>
        </section>
      </header>
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Refunds and Cancellations Policy</h1>
        <p className="mb-4">Our refund and cancellation policy is designed to be fair and transparent. Please read the following terms carefully.</p>

        <h2 className="text-2xl font-semibold mb-2">Refunds</h2>
        <p className="mb-4">Once you subscribed! there will no refund allowed. But if you get error while making payments then the amount will be credited back to the customer&apos;s bank account.</p>

        <h2 className="text-2xl font-semibold mb-2">Cancellations</h2>
        <p className="mb-4">To cancel a service, please contact us within 24 hours of purchase. Cancellations made after this period may not be eligible for a refund.</p>

        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p>If you have any questions regarding refunds or cancellations, please contact us at <a target='_blank' href="mailto:gauravnardia07@gmail.com" className="text-green-500 hover:underline">gauravnardia07@gmail.com</a>.</p>
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2025 Medicate</p>
      </footer>
    </div>
  );
};

export default RefundPolicy;
