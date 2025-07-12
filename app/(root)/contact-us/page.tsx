import React from 'react';
import { Mail, MapPin, Phone, Clock, Send, MessageCircle } from 'lucide-react';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-dark-400 dark:via-dark-300 dark:to-dark-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            We&apos;re here to help you with any questions about our medical services. 
            Reach out to us anytime.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Feel free to reach out to us through any of the following channels. 
                We&apos;re committed to providing you with the best healthcare experience.
              </p>
            </div>

            <div className="grid gap-6">
              {/* Company Info */}
              <div className="flex items-start space-x-4 p-6 bg-white dark:bg-dark-400 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-green-100 dark:bg-green-600/20 p-3 rounded-full">
                  <MessageCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Company</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">Medicate</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Your trusted healthcare partner providing comprehensive medical services.
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4 p-6 bg-white dark:bg-dark-400 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 dark:bg-blue-600/20 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Email</h3>
                  <a 
                    href="mailto:samkitsoni09@gmail.com" 
                    className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors mt-1 inline-block"
                  >
                    samkitsoni09@gmail.com
                  </a>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Send us an email for general inquiries and support.
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-4 p-6 bg-white dark:bg-dark-400 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-red-100 dark:bg-red-600/20 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Location</h3>
                  <address className="text-gray-600 dark:text-gray-300 not-italic mt-1">
                    Rajasthan, India
                  </address>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Visit us at our main location for in-person consultations.
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start space-x-4 p-6 bg-white dark:bg-dark-400 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-purple-100 dark:bg-purple-600/20 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Business Hours</h3>
                  <div className="text-gray-600 dark:text-gray-300 mt-1 space-y-1">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 4:00 PM</p>
                    <p>Sunday: Emergency services only</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-dark-400 rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Send us a Message
            </h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-dark-300 dark:text-white transition-colors"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-dark-300 dark:text-white transition-colors"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-dark-300 dark:text-white transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-dark-300 dark:text-white transition-colors"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-dark-300 dark:text-white transition-colors resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-4 px-6 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>

        {/* Emergency Contact Banner */}
        <div className="mt-16 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Emergency Services</h3>
          <p className="text-lg opacity-90 mb-6">
            For medical emergencies, please call your local emergency services or visit the nearest hospital.
          </p>
          <div className="flex items-center justify-center space-x-2">
            <Phone className="w-5 h-5" />
            <span className="font-semibold">Emergency Hotline: 108</span>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-300">&copy; 2025 Medicate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ContactUs;
