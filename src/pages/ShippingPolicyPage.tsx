import React from 'react';
import Layout from '../components/layout/Layout';

const ShippingPolicyPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Shipping & Delivery Policy</h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
          At Thinner Mart, we strive to ensure timely and secure delivery of your orders. Please read our shipping and delivery policy carefully.
        </p>

        {/* Section 1: Order Processing */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">1. Order Processing</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Orders are processed and dispatched within <strong>24–48 hours</strong> after payment confirmation.</li>
            <li>Order cancellation is not allowed once the order is placed.</li>
            <li>For assistance, please contact our customer care team.</li>
          </ul>
        </div>

        {/* Section 2: Delivery Details */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">2. Delivery Details</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Free delivery on all orders.</li>
            <li>
              Estimated delivery time: <strong>5–7 days</strong>, depending on your location. Delivery time may increase for remote or distant areas.
            </li>
            <li>
              In case of a high volume of orders, shipping may be delayed. We will contact you regarding any delays.
            </li>
          </ul>
        </div>

        {/* Section 3: Damage During Transport */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">3. Damage During Transport</h2>
          <p className="text-gray-700">
            <strong>Note:</strong> Thinner Mart does not cover damage during transport. Please inspect the package upon delivery and report any issues to the transporter immediately.
          </p>
        </div>

        {/* Section 4: Customer Support */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">4. Customer Support</h2>
          <p className="text-gray-700">
            For any questions or concerns regarding shipping or delivery, please contact us:
          </p>
          <p className="text-gray-700 mt-2">
            📧 Email: <a href="mailto:thinnermart@gmail.com" className="text-brand-500 underline">thinnermart@gmail.com</a>
          </p>
          <p className="text-gray-700 mt-2">
            📞 Phone: <a href="tel:+918452006089" className="text-brand-500 underline">+918452006089</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingPolicyPage;