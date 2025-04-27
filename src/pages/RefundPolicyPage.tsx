import React from 'react';
import Layout from '../components/layout/Layout';

const RefundPolicyPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Replacement, Return & Refund Policy</h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
          Please read our policy carefully to understand the terms and conditions for replacements, payments, and shipping.
        </p>

        {/* Section 1: Replacement Validity */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">1. Replacement Validity</h2>
          <p className="text-gray-700">
            Replacement is accepted only within <strong>15 days</strong> after delivery.
          </p>
        </div>

        {/* Section 2: Eligible Cases for Replacement */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">2. Eligible Cases for Replacement</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Discoloration due to chemical reaction</li>
          </ul>
        </div>

        {/* Section 3: Requirements for Replacement */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">3. Requirements for Replacement</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Upload clear front photos of the product.</li>
            <li>Manufacturing date should be clearly visible in the photo.</li>
            <li>The balance product must be returned in the original box packing, same as sent by Thinner Mart.</li>
            <li>Seal should be intact.</li>
            <li>Product should be properly packed in a box.</li>
          </ul>
        </div>

        {/* Section 4: Shipping Instructions */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">4. Shipping Instructions</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Send the product to your nearest transport office.</li>
            <li>Do not pay any amount to the transporter.</li>
            <li>Tell them to select the “To-Pay” payment method – it’s a free replacement.</li>
          </ul>
        </div>

        {/* Section 5: Replacement Process */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">5. Replacement Process</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Once we receive your parcel, we will verify the quantity.</li>
            <li>The same quantity will be shipped to you as a replacement.</li>
            <li>
              If your parcel is eligible for replacement and meets our policies, we’ll ship and deliver the replacement products within <strong>7 working days</strong> after verification.
            </li>
            <li>The entire replacement process can take up to <strong>15 working days</strong>.</li>
          </ul>
        </div>

        {/* Section 6: Note */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">6. Note</h2>
          <p className="text-gray-700">
            <strong>There are no returns and no refunds.</strong> Only replacements are allowed in eligible cases.
          </p>
        </div>

        {/* Section 7: Payment */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">7. Payment</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>We accept payments via PhonePe or Razorpay Gateway.</li>
            <li>Multiple payment options available:</li>
            <ul className="list-disc list-inside ml-6 space-y-1">
              <li>UPI</li>
              <li>Credit Card</li>
              <li>Net Banking, etc.</li>
            </ul>
            <li>All prices include GST.</li>
            <li>Safe and secure payments ensured via Razorpay and PhonePe.</li>
          </ul>
        </div>

        {/* Section 8: Shipping & Delivery */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">8. Shipping & Delivery</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Orders are processed and dispatched within <strong>24–48 hours</strong> after payment confirmation.</li>
            <li>Order cancellation is not allowed once the order is placed.</li>
            <li>For assistance, please contact customer care.</li>
            <li>Free delivery on all orders.</li>
            <li>
              Estimated delivery time: <strong>5–7 days</strong>, depending on your location. Delivery time may increase for remote or distant areas.
            </li>
            <li>In case of high volume of orders, shipping may be delayed. We may contact you regarding the same.</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default RefundPolicyPage;