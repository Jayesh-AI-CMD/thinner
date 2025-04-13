import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { createOrder } from "@/services/orderService";
import { initiatePhonePePayment } from "@/services/paymentService";
import { CreditCard, Truck, AlertCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Address, CartItem, GSTDetails } from "@/lib/types";

// Removed unused CartContextType interface

const CheckoutPage = () => {
  const { cartItems, cartTotal, cartSubtotal, cartTax, clearCart, } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("phonepe");
  const [shippingAddress, setShippingAddress] = useState<Address>({
    name: user?.user_metadata?.name || "",
    email: user?.email || "",
    phone: user?.user_metadata?.phone || "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });
  
  const [useGST, setUseGST] = useState(false);
  const [gstDetails, setGstDetails] = useState<GSTDetails>({
    gstNumber: "",
    businessName: "",
    address: { ...shippingAddress },
  });
  
  const [sameAsShipping, setSameAsShipping] = useState(true);

  // Update the total calculation to include coupon discount
  const adjustedCartTotal = cartTotal;

  console.log("Cart Items in CheckoutPage:", cartItems);
  
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
    
    // Update GST address if same as shipping
    if (sameAsShipping) {
  setGstDetails((prev) => ({
    ...prev,
    address: { ...shippingAddress },
  }));
    }
  };
  
  const handleGSTDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "gstNumber" || name === "businessName") {
      setGstDetails((prev) => ({ ...prev, [name]: value }));
    } else {
      setGstDetails((prev) => ({
        ...prev,
        address: { ...prev.address, [name.replace("gst_", "")]: value },
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast({
        variant: "destructive",
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Create the order first
      const order = await createOrder(
        cartItems,
        cartSubtotal,
        cartTax,
        adjustedCartTotal,
        shippingAddress,
        paymentMethod,
        useGST ? gstDetails : undefined
      );
      
      // Process the payment based on the selected method
      if (paymentMethod === "phonepe") {
        const paymentResponse = await initiatePhonePePayment(order.id, adjustedCartTotal / 100); // Convert to rupees
        
        if (!paymentResponse.success) {
          throw new Error(paymentResponse.error || "Payment failed");
        }
        
        // Clear the cart
        clearCart();
        
        // Redirect to PhonePe payment page
        window.location.href = paymentResponse.paymentUrl as string;
      } else if (paymentMethod === "bank_transfer") {
        // For Bank Transfer, just redirect to confirmation
        clearCart();
        navigate(`/order/confirmation?orderId=${order.id}&paymentId=bank_transfer_${Date.now()}`);
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        variant: "destructive",
        title: "Checkout failed",
        description: error.message || "An error occurred during checkout.",
      });
      setLoading(false);
    }
  };
  
  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="mb-8 text-muted-foreground">Add some products to your cart before proceeding to checkout.</p>
          <Button onClick={() => navigate("/products")}>Continue Shopping</Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">Checkout</h1>
        
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Customer Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={shippingAddress.name} 
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={shippingAddress.phone} 
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={shippingAddress.email} 
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="street">Address</Label>
                  <Textarea 
                    id="street" 
                    name="street" 
                    value={shippingAddress.street} 
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      name="city" 
                      value={shippingAddress.city} 
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input 
                      id="state" 
                      name="state" 
                      value={shippingAddress.state} 
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input 
                    id="postalCode" 
                    name="postalCode" 
                    value={shippingAddress.postalCode} 
                    onChange={handleAddressChange}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">GST Details (Optional)</h2>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="use-gst"
                    checked={useGST}
                    onCheckedChange={setUseGST}
                  />
                  <Label htmlFor="use-gst">Enable GST Invoice</Label>
                </div>
              </div>
              
              {useGST && (
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="gstNumber">GST Number</Label>
                    <Input 
                      id="gstNumber" 
                      name="gstNumber" 
                      value={gstDetails.gstNumber} 
                      onChange={handleGSTDetailsChange}
                      required={useGST}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input 
                      id="businessName" 
                      name="businessName" 
                      value={gstDetails.businessName} 
                      onChange={handleGSTDetailsChange}
                      required={useGST}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <Switch
                      id="same-as-shipping"
                      checked={sameAsShipping}
                      onCheckedChange={(checked) => {
                        setSameAsShipping(checked);
                        if (checked) {
                          setGstDetails(prev => ({ ...prev, address: { ...shippingAddress } }));
                        }
                      }}
                    />
                    <Label htmlFor="same-as-shipping">Same as shipping address</Label>
                  </div>
                  
                  {!sameAsShipping && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="gst_street">Business Address</Label>
                        <Textarea 
                          id="gst_street" 
                          name="gst_street" 
                          value={gstDetails.address.street} 
                          onChange={handleGSTDetailsChange}
                          required={useGST && !sameAsShipping}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="gst_city">City</Label>
                          <Input 
                            id="gst_city" 
                            name="gst_city" 
                            value={gstDetails.address.city} 
                            onChange={handleGSTDetailsChange}
                            required={useGST && !sameAsShipping}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="gst_state">State</Label>
                          <Input 
                            id="gst_state" 
                            name="gst_state" 
                            value={gstDetails.address.state} 
                            onChange={handleGSTDetailsChange}
                            required={useGST && !sameAsShipping}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="gst_postalCode">Postal Code</Label>
                        <Input 
                          id="gst_postalCode" 
                          name="gst_postalCode" 
                          value={gstDetails.address.postalCode} 
                          onChange={handleGSTDetailsChange}
                          required={useGST && !sameAsShipping}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column - Order Summary and Payment */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="divide-y">
              {cartItems.map((item, index) => (
                <div key={index} className="py-4 flex justify-between">
                  <div className="flex items-start">
                    <div className="w-16 h-16 rounded overflow-hidden mr-4">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.size && `Size: ${item.size}`}
                        {item.isSample && " (Sample)"}
                      </p>
                      <p className="text-sm">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium">₹{((item.price * item.quantity) / 100).toLocaleString()}</p>
                </div>
              ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>₹{(cartSubtotal / 100).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span>₹{(cartTax / 100).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Coupon Discount</span>
                <span>-₹{(cartTotal - adjustedCartTotal) / 100}</span>
              </div>
              <div className="flex justify-between text-lg font-bold mt-2">
                <span>Total</span>
                <span>₹{(adjustedCartTotal / 100).toLocaleString()}</span>
              </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                <div className="flex items-center space-x-3 rounded-md border p-4">
                  <RadioGroupItem value="phonepe" id="phonepe" />
                  <Label htmlFor="phonepe" className="flex-1 cursor-pointer">
                    <div className="flex items-center">
                      <CreditCard className="mr-2 h-5 w-5 text-purple-600" />
                      <span>PhonePe / UPI</span>
                    </div>
                  </Label>
                </div>

                {paymentMethod === "phonepe" && (
                  <div className="mt-4 space-y-2">
                    <Label htmlFor="mobileNumber">Enter Mobile Number</Label>
                    <Input
                      id="mobileNumber"
                      name="mobileNumber"
                      type="text"
                      placeholder="e.g., 9876543210"
                      required
                    />

                    <div className="flex items-center my-2">
                      <Separator className="flex-1" />
                      <span className="px-2 text-sm text-muted-foreground">OR</span>
                      <Separator className="flex-1" />
                    </div>

                    <Label htmlFor="upiId">Enter UPI ID</Label>
                    <Input
                      id="upiId"
                      name="upiId"
                      type="text"
                      placeholder="e.g., user@upi"
                      required
                    />
                  </div>
                )}

                <div className="flex items-center space-x-3 rounded-md border p-4">
                  <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                  <Label htmlFor="bank_transfer" className="flex-1 cursor-pointer">
                    <div className="flex items-center">
                      <Truck className="mr-2 h-5 w-5 text-gray-600" />
                      <span>Bank Transfer</span>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <Truck className="h-4 w-4 mr-2 text-green-600" />
                  <span>Free delivery on all orders</span>
                </div>
                
                <div className="bg-gray-50 rounded-md p-4 text-sm">
                  <p>By placing this order, you agree to our <a href="#" className="text-primary underline">Terms and Conditions</a> and <a href="#" className="text-primary underline">Privacy Policy</a>.</p>
                </div>
                
                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent rounded-full"></span>
                      Processing...
                    </span>
                  ) : (
                    `Place Order • ₹${(adjustedCartTotal / 100).toLocaleString()}`
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
