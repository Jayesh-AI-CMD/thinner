import React from 'react';
import Layout from '../components/layout/Layout';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
          At Thinner Mart, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you visit our website or interact with our services.
        </p>

        {/* Section 1: Information We Collect */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Personal Details:</strong> Name, phone number, email address, shipping address, billing address.</li>
            <li><strong>Payment Information:</strong> UPI, credit/debit card details (via secure gateways like Razorpay and PhonePe – we do not store card details).</li>
            <li><strong>Order Details:</strong> Purchase history, order preferences, transaction details.</li>
            <li><strong>Device & Log Information:</strong> IP address, browser type, access times, and pages visited.</li>
          </ul>
        </div>

        {/* Section 2: How We Use Your Information */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Process and fulfill your orders</li>
            <li>Send order updates and confirmations</li>
            <li>Improve customer experience and website functionality</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Comply with legal and regulatory obligations</li>
          </ul>
        </div>

        {/* Section 3: Sharing Your Information */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">3. Sharing Your Information</h2>
          <p className="text-gray-700 mb-2">
            We do not sell or trade your personal information. We may share data with:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Trusted third-party service providers (e.g., payment gateways, shipping partners)</li>
            <li>Legal authorities if required under applicable law</li>
          </ul>
          <p className="text-gray-700 mt-2">
            All shared data is handled with strict confidentiality.
          </p>
        </div>

        {/* Section 4: Payment Security */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">4. Payment Security</h2>
          <p className="text-gray-700">
            All payments are securely processed through trusted third-party gateways like Razorpay and PhonePe. We do not store or access your payment credentials.
          </p>
        </div>

        {/* Section 5: Cookies & Tracking */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">5. Cookies & Tracking</h2>
          <p className="text-gray-700 mb-2">
            We may use cookies to improve your browsing experience. These help us:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Remember your preferences</li>
            <li>Understand usage patterns</li>
            <li>Enhance website functionality</li>
          </ul>
          <p className="text-gray-700 mt-2">
            You can choose to disable cookies through your browser settings.
          </p>
        </div>

        {/* Section 6: Updates to This Policy */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">6. Updates to This Policy</h2>
          <p className="text-gray-700">
            This policy may be updated from time to time. Any changes will be posted on this page with the revised date.
          </p>
        </div>

        {/* Section 7: Contact Us */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
          <p className="text-gray-700">
            For any questions about this Privacy Policy, reach out to: <a href="mailto:thinnermart@gmail.com" className="text-brand-500 underline">thinnermart@gmail.com</a> or call on <a href="tel:+918452006089" className="text-brand-500 underline">+918452006089</a>.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicyPage;