import React from 'react';
import Layout from '../components/layout/Layout';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p>At Thinner Mart, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you visit our website or interact with our services.</p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <ul className="list-disc pl-6">
          <li>Personal Details: Name, phone number, email address, shipping address, billing address.</li>
          <li>Payment Information: UPI, credit/debit card details (via secure gateways like Razorpay and PhonePe – we do not store card details).</li>
          <li>Order Details: Purchase history, order preferences, transaction details.</li>
          <li>Device & Log Information: IP address, browser type, access times, and pages visited.</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6">
          <li>Process and fulfill your orders</li>
          <li>Send order updates and confirmations</li>
          <li>Improve customer experience and website functionality</li>
          <li>Respond to your inquiries and provide customer support</li>
          <li>Comply with legal and regulatory obligations</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-2">3. Sharing Your Information</h2>
        <p>We do not sell or trade your personal information. We may share data with:</p>
        <ul className="list-disc pl-6">
          <li>Trusted third-party service providers (e.g., payment gateways, shipping partners)</li>
          <li>Legal authorities if required under applicable law</li>
        </ul>
        <p>All shared data is handled with strict confidentiality.</p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">4. Payment Security</h2>
        <p>All payments are securely processed through trusted third-party gateways like Razorpay and PhonePe. We do not store or access your payment credentials.</p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">5. Cookies & Tracking</h2>
        <p>We may use cookies to improve your browsing experience. These help us:</p>
        <ul className="list-disc pl-6">
          <li>Remember your preferences</li>
          <li>Understand usage patterns</li>
          <li>Enhance website functionality</li>
        </ul>
        <p>You can choose to disable cookies through your browser settings.</p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">6. Updates to This Policy</h2>
        <p>This policy may be updated from time to time. Any changes will be posted on this page with the revised date.</p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">7. Contact Us</h2>
        <p>For any questions about this Privacy Policy, reach out to:</p>
      </div>
    </Layout>
  );
};

export default PrivacyPolicyPage;