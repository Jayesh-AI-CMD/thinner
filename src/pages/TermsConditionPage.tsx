import React from 'react';
import Layout from '../components/layout/Layout';

const TermsConditionPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Terms & Conditions</h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
          Please read these terms and conditions carefully before using our website or placing an order. By accessing or using our services, you agree to comply with these terms.
        </p>

        {/* Section 1: Business Eligibility */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">1. Business Eligibility</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Thinner Mart supplies thinners only to GST/MSME registered vendors.</li>
            <li>At the time of placing an order, customers must provide a valid GST Number or MSME Registration Certificate for verification.</li>
            <li>We accept orders strictly for industrial and commercial use only.</li>
            <li>Eligible buyers include:
              <ul className="list-disc list-inside ml-6 space-y-1">
                <li>Industrial units</li>
                <li>Construction sites (via contractors)</li>
                <li>Retailers and distributors</li>
              </ul>
            </li>
            <li>We do not supply for personal or household use.</li>
          </ul>
        </div>

        {/* Section 2: Prohibited Uses */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">2. Prohibited Uses</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>For any unlawful or unauthorized purpose</li>
            <li>To violate any applicable laws or regulations</li>
            <li>To harass, abuse, defame, threaten, or discriminate against others</li>
            <li>To submit false information or impersonate someone else</li>
            <li>To transmit viruses or malicious code that could harm the website or users</li>
            <li>To interfere with the security or functionality of this website</li>
          </ul>
          <p className="text-gray-700 mt-4">
            We reserve the right to suspend or terminate your access if you violate any of these terms.
          </p>
        </div>

        {/* Section 3: Disclaimer of Warranties & Limitation of Liability */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">3. Disclaimer of Warranties & Limitation of Liability</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Thinner Mart provides all products and services on an “as is” and “as available” basis.</li>
            <li>We do not guarantee uninterrupted, secure, or error-free use of our website or services.</li>
            <li>We are not liable for any loss, damage, or inconvenience arising from the use of our website, products, or services.</li>
            <li>This includes, but is not limited to, delays, inaccuracies, or damage caused during shipping or misuse of products.</li>
            <li>In no case shall Thinner Mart or its team be held responsible for indirect, incidental, or consequential damages.</li>
            <li>Thinner Mart shall not be held responsible for any unlawful or illegal activities carried out by buyers or third parties using our products or services.</li>
          </ul>
        </div>

        {/* Section 4: Important Payment Advisory */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">4. Important Payment Advisory</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Please do not make any payments or share financial details without confirmation from our official email.</li>
            <li>If you receive any suspicious request or communication asking for payment, kindly contact our customer care immediately for verification.</li>
            <li>We are not responsible for any loss arising from payments made to unauthorized individuals or unofficial channels.</li>
          </ul>
        </div>

        {/* Section 5: Customer Support */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">5. Customer Support</h2>
          <p className="text-gray-700">
            For any questions or concerns, please contact us:
          </p>
          <p className="text-gray-700 mt-2">
            📧 Email: <a href="mailto:thinnermart@gmail.com" className="text-brand-500 underline">thinnermart@gmail.com</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default TermsConditionPage;