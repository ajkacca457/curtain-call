import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          Privacy <span className="text-indigo-600">Policy</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Your privacy is important to us. This Privacy Policy explains how CurtainsCall collects, uses, and protects your personal information.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 border-l-4 border-indigo-600 pl-4">
          Information We Collect
        </h2>
        <p className="text-gray-600 leading-relaxed mb-2">
          When you use CurtainsCall, we may collect the following information:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Personal information such as your name, email address, and payment details.</li>
          <li>Booking history and preferences for shows and events.</li>
          <li>Device and usage information to improve platform performance.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 border-l-4 border-indigo-600 pl-4">
          How We Use Your Information
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>To process your bookings and payments securely.</li>
          <li>To communicate booking confirmations, updates, and support messages.</li>
          <li>To personalize your experience and recommend shows based on your interests.</li>
          <li>To maintain and improve our services, website, and app functionality.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 border-l-4 border-indigo-600 pl-4">
          Sharing Your Information
        </h2>
        <p className="text-gray-600 leading-relaxed">
          We do not sell your personal information. We may share limited data with third-party service providers to:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Process payments securely.</li>
          <li>Deliver tickets and booking confirmations.</li>
          <li>Improve our marketing and analytics.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 border-l-4 border-indigo-600 pl-4">
          Security of Your Data
        </h2>
        <p className="text-gray-600 leading-relaxed">
          We implement reasonable technical and organizational measures to protect your personal information from unauthorized access, use, or disclosure. All payments are processed through secure, trusted payment gateways.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 border-l-4 border-indigo-600 pl-4">
          Your Rights
        </h2>
        <p className="text-gray-600 leading-relaxed">
          You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at 
          <span className="font-medium"> support@curtainscall.com</span>.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 border-l-4 border-indigo-600 pl-4">
          Changes to This Policy
        </h2>
        <p className="text-gray-600 leading-relaxed">
          CurtainsCall may update this Privacy Policy periodically. We will notify users of significant changes by email or via our website.
        </p>
      </section>

      <p className="text-gray-600 text-sm mt-12">
        Last updated: December 2025
      </p>
    </div>
  )
}

export default PrivacyPolicy
