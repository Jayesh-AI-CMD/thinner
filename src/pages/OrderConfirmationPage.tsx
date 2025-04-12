
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyPaymentStatus } from "@/services/paymentService";
import Layout from "@/components/layout/Layout";
import { Check, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Order } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";

const OrderConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const verifyPayment = async () => {
      if (!user) {
        setError("You must be logged in to view order confirmation");
        setLoading(false);
        return;
      }
      
      const orderId = searchParams.get("orderId");
      const paymentId = searchParams.get("paymentId");
      
      if (!orderId || !paymentId) {
        setError("Invalid order confirmation URL");
        setLoading(false);
        return;
      }
      
      try {
        const result = await verifyPaymentStatus(orderId, paymentId);
        
        if (!result.success) {
          setError(result.error || "Failed to verify payment");
          setLoading(false);
          return;
        }
        
        if (result.order) {
          setOrder(result.order);
        } else {
          setError("Order details not found");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
        toast({
          variant: "destructive",
          title: "Error",
          description: err.message || "Failed to verify order payment",
        });
      } finally {
        setLoading(false);
      }
    };
    
    verifyPayment();
  }, [searchParams, user, toast]);
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-8"></div>
          <h2 className="text-2xl font-bold text-center">Verifying your order...</h2>
          <p className="text-gray-500 text-center mt-2">Please wait while we confirm your payment</p>
        </div>
      </Layout>
    );
  }
  
  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-center">Something went wrong</h2>
          <p className="text-gray-500 text-center mt-2 mb-6">{error}</p>
          <Button onClick={() => navigate("/")}>Return to Home</Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-20 h-20 flex items-center justify-center bg-primary/10 rounded-full mb-6">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Order Confirmed!</h1>
            <p className="text-gray-500 mt-2">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </div>
          
          {order && (
            <div className="space-y-6">
              <div className="border-t border-b py-4">
                <h2 className="font-semibold text-lg mb-3">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Order Number:</span>
                    <span className="font-medium">{order.id.slice(0, 10)}...</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Order Date:</span>
                    <span className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Order Status:</span>
                    <span className="font-medium capitalize">{order.status}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Payment Method:</span>
                    <span className="font-medium">{order.paymentMethod}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="font-semibold text-lg mb-3">Items Ordered</h2>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                      <div className="flex items-center">
                        <div className="mr-4">
                          <span className="text-sm font-medium">{item.quantity}x</span>
                        </div>
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{((item.price * item.quantity) / 100).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{(order.subtotal / 100).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18% GST)</span>
                  <span>₹{(order.tax / 100).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{(order.total / 100).toLocaleString()}</span>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h2 className="font-semibold text-lg mb-3">Shipping Information</h2>
                <address className="not-italic text-sm">
                  <p className="font-medium">{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.postalCode}</p>
                  <p>{order.shippingAddress.country}</p>
                  <p className="mt-2">{order.shippingAddress.phone}</p>
                  <p>{order.shippingAddress.email}</p>
                </address>
              </div>
            </div>
          )}
          
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={() => navigate("/products")}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmationPage;
