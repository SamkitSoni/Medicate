import React from 'react';
import { Shield, Eye, Lock, Users, FileText, Mail, Calendar } from 'lucide-react';

const PrivacyPolicy = () => {
  const lastUpdated = "January 15, 2025";

  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: <FileText className="w-6 h-6" />,
      content: [
        "Personal information you provide directly to us, such as your name, email address, phone number, and medical history when you register for our services.",
        "Payment information including billing addresses and payment method details when you subscribe to our services.",
        "Health information that you choose to share with healthcare providers through our platform.",
        "Usage data including how you interact with our website, pages visited, and features used.",
        "Device information such as IP address, browser type, and operating system for security and optimization purposes."
      ]
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      icon: <Eye className="w-6 h-6" />,
      content: [
        "Provide, maintain, and improve our healthcare services and platform functionality.",
        "Facilitate communication between patients and healthcare providers.",
        "Process payments and manage your subscription to our services.",
        "Send you important updates about your account, appointments, and service changes.",
        "Ensure the security and integrity of our platform and prevent fraudulent activities.",
        "Comply with legal obligations and healthcare regulations including HIPAA compliance."
      ]
    },
    {
      id: "data-protection",
      title: "Data Protection & Security",
      icon: <Lock className="w-6 h-6" />,
      content: [
        "We implement industry-standard encryption protocols to protect your data both in transit and at rest.",
        "Access to your personal and health information is strictly limited to authorized personnel on a need-to-know basis.",
        "Regular security audits and vulnerability assessments are conducted to maintain the highest security standards.",
        "We comply with healthcare data protection regulations including HIPAA and other applicable privacy laws.",
        "However, please note that no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security."
      ]
    },
    {
      id: "information-sharing",
      title: "Information Sharing",
      icon: <Users className="w-6 h-6" />,
      content: [
        "We do not sell, trade, or rent your personal information to third parties for marketing purposes.",
        "Health information is only shared with healthcare providers you explicitly choose to consult with.",
        "We may share information with trusted service providers who assist us in operating our platform, subject to strict confidentiality agreements.",
        "Information may be disclosed if required by law, court order, or to protect the rights and safety of our users and the public.",
        "In the event of a business transfer, your information may be transferred as part of the transaction, subject to the same privacy protections."
      ]
    },
    {
      id: "your-rights",
      title: "Your Privacy Rights",
      icon: <Shield className="w-6 h-6" />,
      content: [
        "Access: You have the right to access and review your personal information stored in our systems.",
        "Correction: You can request corrections to inaccurate or incomplete personal information.",
        "Deletion: You may request deletion of your personal information, subject to legal and regulatory requirements.",
        "Data Portability: You can request a copy of your data in a structured, machine-readable format.",
        "Withdrawal of Consent: You can withdraw your consent for certain data processing activities at any time.",
        "Complaint: You have the right to file a complaint with relevant data protection authorities if you believe your privacy rights have been violated."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-dark-400 dark:via-dark-300 dark:to-dark-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-16 h-16 mr-4" />
            <h1 className="text-5xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Your privacy and the security of your health information are our top priorities. 
            Learn how we collect, use, and protect your data.
          </p>
          <div className="flex items-center justify-center mt-6 text-blue-100">
            <Calendar className="w-5 h-5 mr-2" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-16">
        {/* Introduction */}
        <div className="bg-white dark:bg-dark-400 rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Commitment to Your Privacy</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            At Medicate, we understand that your health information is deeply personal and sensitive. 
            This Privacy Policy explains how we collect, use, protect, and share your information when you use our healthcare platform. 
            We are committed to maintaining the highest standards of privacy protection and compliance with applicable healthcare regulations.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-white dark:bg-dark-400 rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Table of Contents</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-dark-300 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-200 transition-colors group"
              >
                <div className="text-blue-500 group-hover:text-blue-600">
                  {section.icon}
                </div>
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white font-medium">
                  {section.title}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Privacy Policy Sections */}
        <div className="space-y-12">
          {sections.map((section) => (
            <div
              key={section.id}
              id={section.id}
              className="bg-white dark:bg-dark-400 rounded-2xl shadow-xl p-8"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-blue-100 dark:bg-blue-600/20 p-3 rounded-full text-blue-600 dark:text-blue-400">
                  {section.icon}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{section.title}</h2>
              </div>
              <div className="space-y-4">
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Questions About Your Privacy?</h2>
            <p className="text-xl opacity-90 mb-6 max-w-2xl mx-auto">
              If you have any questions about this Privacy Policy or how we handle your data, 
              we&apos;re here to help. Your privacy concerns are important to us.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              <a
                href="mailto:gauravnardia07@gmail.com"
                className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-3 rounded-lg transition-all duration-200"
              >
                <Mail className="w-5 h-5" />
                <span>samkitsoni09@gmail.com</span>
              </a>
              <a
                href="/contact-us"
                className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-3 rounded-lg transition-all duration-200"
              >
                <FileText className="w-5 h-5" />
                <span>Contact Form</span>
              </a>
            </div>
          </div>
        </div>

        {/* Changes Notice */}
        <div className="mt-12 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-yellow-800 dark:text-yellow-200 mb-4">
            Changes to This Privacy Policy
          </h3>
          <p className="text-yellow-700 dark:text-yellow-300 leading-relaxed">
            We may update this Privacy Policy from time to time to reflect changes in our practices, 
            technology, legal requirements, or other factors. When we make changes, we will update the 
            &quot;Last updated&quot; date at the top of this policy and notify you through email or a prominent 
            notice on our website. We encourage you to review this Privacy Policy periodically to stay 
            informed about how we protect your information.
          </p>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-300">&copy; 2025 Medicate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
