
import { supabase } from "@/integrations/supabase/client";
import { Order } from "@/lib/types";

interface PaymentResponse {
  success: boolean;
  paymentUrl?: string;
  paymentId?: string;
  error?: string;
}

export const initiatePhonePePayment = async (
  orderId: string,
  amount: number
): Promise<PaymentResponse> => {
  try {
    // Get the base URL dynamically
    const baseUrl = window.location.origin;
    const callbackUrl = `${baseUrl}/order/confirmation`;
    
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error("User must be logged in to process payment");
    }

    // Call the PhonePe payment function
    const { data, error } = await supabase.functions.invoke("phonepe-payment", {
      body: {
        amount,
        orderId,
        callbackUrl,
        userId: user.id,
      },
    });

    if (error) throw error;

    return data as PaymentResponse;
  } catch (error: any) {
    console.error("Error initiating PhonePe payment:", error);
    return {
      success: false,
      error: error.message || "Payment initialization failed",
    };
  }
};

export const verifyPaymentStatus = async (
  orderId: string,
  paymentId: string
): Promise<{
  success: boolean;
  order?: Order;
  error?: string;
}> => {
  // In a real implementation, you would verify with PhonePe
  // For now, we'll just check if the order exists with the payment ID
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .eq("payment_id", paymentId)
      .single();

    if (error) throw error;

    if (!data) {
      return {
        success: false,
        error: "Order not found or payment verification failed",
      };
    }

    // Update order status to processing after payment
    const { error: updateError } = await supabase
      .from("orders")
      .update({ 
        status: "processing",
      })
      .eq("id", orderId);

    if (updateError) throw updateError;

    // Fetch the full order details
    const order = await fetchOrderById(orderId);

    return {
      success: true,
      order: order || undefined,
    };
  } catch (error: any) {
    console.error("Error verifying payment:", error);
    return {
      success: false,
      error: error.message || "Payment verification failed",
    };
  }
};

// Helper function to fetch an order by ID
const fetchOrderById = async (orderId: string): Promise<Order | null> => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (*)
      `)
      .eq("id", orderId)
      .single();

    if (error) throw error;

    // Transform the data to match our Order type
    const items = data.order_items.map((item: any) => ({
      productId: item.product_id,
      variantId: item.variant_id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      size: item.size,
      image: "", // We would need to fetch this separately
      isSample: item.is_sample,
    }));

    const shippingAddress = {
      street: data.shipping_address,
      city: data.shipping_city,
      state: data.shipping_state,
      postalCode: data.shipping_pincode,
      country: "India",
      name: data.shipping_name,
      email: data.shipping_email,
      phone: data.shipping_phone,
    };

    let gstDetails;
    if (data.gst_number) {
      gstDetails = {
        gstNumber: data.gst_number,
        businessName: data.gst_business_name || "",
        address: data.gst_address ? JSON.parse(data.gst_address) : shippingAddress,
      };
    }

    return {
      id: data.id,
      userId: data.user_id,
      items,
      subtotal: data.subtotal,
      tax: data.tax,
      shipping: 0,
      total: data.total,
      status: data.status,
      paymentStatus: data.payment_id ? "paid" : "pending",
      paymentMethod: data.payment_method,
      shippingAddress,
      gstDetails,
      createdAt: data.created_at,
    };
  } catch (error) {
    console.error("Error fetching order by id:", error);
    return null;
  }
};
