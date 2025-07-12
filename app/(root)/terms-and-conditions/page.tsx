import Link from 'next/link';
import React from 'react';
import { FileText, Scale, AlertTriangle, Users, Shield, Clock, Mail, ExternalLink } from 'lucide-react';

const TermsAndConditions = () => {
  const lastUpdated = "January 15, 2025";

  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: <FileText className="w-6 h-6" />,
      content: [
        "By accessing, browsing, or using the Medicate platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.",
        "These terms constitute a legally binding agreement between you and Medicate regarding your use of our services.",
        "If you do not agree with any part of these terms, you must not use our website or services.",
        "Your continued use of the platform after any modifications to these terms constitutes acceptance of the updated terms."
      ]
    },
    {
      id: "services",
      title: "Description of Services",
      icon: <Users className="w-6 h-6" />,
      content: [
        "Medicate provides an online healthcare platform that connects patients with licensed healthcare providers for consultations, appointments, and medical services.",
        "Our services include appointment scheduling, virtual consultations, prescription management, and health record maintenance.",
        "We facilitate communication between patients and healthcare providers but do not provide medical advice directly.",
        "All medical advice, diagnoses, and treatments are provided by licensed healthcare professionals through our platform.",
        "We reserve the right to modify, suspend, or discontinue any aspect of our services at any time with appropriate notice."
      ]
    },
    {
      id: "user-responsibilities",
      title: "User Responsibilities",
      icon: <Shield className="w-6 h-6" />,
      content: [
        "You must provide accurate, current, and complete information when creating your account and using our services.",
        "You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.",
        "You must not use our platform for any illegal, unauthorized, or prohibited purposes.",
        "You agree not to interfere with or disrupt the platform's functionality or security measures.",
        "You must comply with all applicable laws and regulations when using our services.",
        "You are responsible for any content you submit through our platform and must ensure it does not violate any rights or laws."
      ]
    },
    {
      id: "medical-disclaimer",
      title: "Medical Disclaimer",
      icon: <AlertTriangle className="w-6 h-6" />,
      content: [
        "Medicate is a technology platform that facilitates healthcare services but does not practice medicine or provide medical advice.",
        "All medical services are provided by independent, licensed healthcare professionals who are solely responsible for their medical advice and treatment decisions.",
        "Our platform is not intended for emergency medical situations. In case of emergency, contact local emergency services immediately.",
        "The information provided through our platform is for informational purposes only and should not replace professional medical advice.",
        "We do not guarantee the accuracy, completeness, or reliability of any medical information or advice provided through our platform.",
        "Always consult with qualified healthcare professionals for medical concerns and follow their guidance."
      ]
    },
    {
      id: "privacy-data",
      title: "Privacy and Data Protection",
      icon: <Scale className="w-6 h-6" />,
      content: [
        "Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy.",
        "We implement appropriate security measures to protect your personal and health information in accordance with healthcare regulations.",
        "You consent to the collection, use, and sharing of your information as described in our Privacy Policy.",
        "We comply with applicable data protection laws including HIPAA and other relevant healthcare privacy regulations.",
        "You have certain rights regarding your personal data as outlined in our Privacy Policy."
      ]
    },
    {
      id: "payments-billing",
      title: "Payments and Billing",
      icon: <Clock className="w-6 h-6" />,
      content: [
        "Payment for services is due at the time of booking or as otherwise specified for your chosen service plan.",
        "All fees are non-refundable unless otherwise specified in our refund policy or required by applicable law.",
        "We reserve the right to change our pricing with appropriate notice to existing users.",
        "You are responsible for maintaining current payment information and for any charges incurred under your account.",
        "Subscription services will automatically renew unless cancelled in accordance with the cancellation terms.",
        "Failed payments may result in suspension or termination of your access to premium services."
      ]
    },
    {
      id: "limitation-liability",
      title: "Limitation of Liability",
      icon: <Shield className="w-6 h-6" />,
      content: [
        "To the maximum extent permitted by law, Medicate shall not be liable for any indirect, incidental, special, consequential, or punitive damages.",
        "Our total liability for any claims arising from your use of our services shall not exceed the amount you paid for the services in the 12 months preceding the claim.",
        "We do not warrant that our platform will be uninterrupted, error-free, or completely secure.",
        "You acknowledge that your use of our platform is at your own risk, and you assume full responsibility for any risks associated with your use.",
        "Some jurisdictions do not allow the exclusion of certain warranties or limitations of liability, so some limitations may not apply to you."
      ]
    },
    {
      id: "termination",
      title: "Termination",
      icon: <ExternalLink className="w-6 h-6" />,
      content: [
        "You may terminate your account at any time by following the account closure process outlined in your account settings.",
        "We reserve the right to suspend or terminate your account immediately if you violate these terms or engage in inappropriate conduct.",
        "Upon termination, your access to the platform will cease, but certain provisions of these terms will survive termination.",
        "We may retain certain information as required by law or for legitimate business purposes even after account termination.",
        "Termination does not relieve you of any obligations that accrued prior to termination."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-dark-400 dark:via-dark-300 dark:to-dark-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <Scale className="w-16 h-16 mr-4" />
            <h1 className="text-5xl font-bold">Terms and Conditions</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Please read these terms carefully before using our healthcare platform. 
            These terms govern your use of Medicate&apos;s services and establish our mutual rights and responsibilities.
          </p>
          <div className="flex items-center justify-center mt-6 text-blue-100">
            <Clock className="w-5 h-5 mr-2" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-16">
        {/* Introduction */}
        <div className="bg-white dark:bg-dark-400 rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Welcome to Medicate</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of the Medicate healthcare platform, 
            including our website, mobile applications, and related services (collectively, the &quot;Platform&quot;). 
            By using our Platform, you enter into a legally binding agreement with us.
          </p>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Important Notice</h3>
                <p className="text-yellow-700 dark:text-yellow-300">
                  Please read these terms carefully and ensure you understand them before using our services. 
                  If you have any questions, please contact us before proceeding.
                </p>
              </div>
            </div>
          </div>
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

        {/* Terms Sections */}
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
            <h2 className="text-3xl font-bold mb-4">Questions About These Terms?</h2>
            <p className="text-xl opacity-90 mb-6 max-w-2xl mx-auto">
              If you have any questions about these Terms and Conditions or need clarification on any aspect, 
              please don&apos;t hesitate to contact us. We&apos;re here to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              <a
                href="mailto:gauravnardia07@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-3 rounded-lg transition-all duration-200"
              >
                <Mail className="w-5 h-5" />
                <span>samkitsoni09@gmail.com</span>
              </a>
              <Link
                href="/contact-us"
                className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-3 rounded-lg transition-all duration-200"
              >
                <FileText className="w-5 h-5" />
                <span>Contact Form</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Related Policies */}
        <div className="mt-12 bg-white dark:bg-dark-400 rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Policies</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/privacy-policy"
              className="flex items-center space-x-4 p-6 bg-gray-50 dark:bg-dark-300 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-200 transition-colors group"
            >
              <Shield className="w-8 h-8 text-blue-500 group-hover:text-blue-600" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Privacy Policy
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Learn how we protect and handle your personal information
                </p>
              </div>
            </Link>
            <Link
              href="/refund-policy"
              className="flex items-center space-x-4 p-6 bg-gray-50 dark:bg-dark-300 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-200 transition-colors group"
            >
              <ExternalLink className="w-8 h-8 text-green-500 group-hover:text-green-600" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400">
                  Refund Policy
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Understand our refund and cancellation policies
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Updates Notice */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
            Changes to These Terms
          </h3>
          <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
            We may update these Terms and Conditions from time to time to reflect changes in our services, 
            legal requirements, or business practices. When we make significant changes, we will notify you 
            through email or a prominent notice on our platform at least 30 days before the changes take effect. 
            Your continued use of our services after the effective date constitutes acceptance of the updated terms.
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

export default TermsAndConditions;
