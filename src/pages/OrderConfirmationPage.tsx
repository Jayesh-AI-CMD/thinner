import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-20 h-20 flex items-center justify-center bg-primary/10 rounded-full mb-6">
          <Check className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-center">Payment Successful!</h1>
        <p className="text-gray-500 text-center mt-4">
          Thank you for your payment. You can view your order details on the orders page.
        </p>
        <div className="mt-8">
          <Button onClick={() => navigate("/orders")}>Go to Orders Page</Button>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmationPage;
