import { supabase } from "@/integrations/supabase/client";
import { Order } from "@/lib/types";

interface PaymentResponse {
  success: boolean;
  paymentUrl?: string;
  paymentId?: string;
  error?: string;
}

/**
 * Initiates a PhonePe payment by invoking the Supabase Edge Function.
 * 
 * @param orderId - The ID of the order
 * @param amount - The payment amount
 * @returns A promise resolving to the payment response
 */
export const initiatePhonePePayment = async (
  orderId: string,
  amount: number
): Promise<PaymentResponse> => {
  try {
    // Get the base URL dynamically
    const baseUrl = window.location.origin;
    const callbackUrl = `${baseUrl}/order/confirmation`;
    // const callbackUrl = `https://thinnermart.com/order/confirmation`;

    // Get the current authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("User must be logged in to process payment");
    }

    // Invoke the PhonePe payment Edge Function
    const { data, error } = await supabase.functions.invoke("phonepe-init-live", {
      body: {
        amount: amount * 100,
        orderId: orderId,
        callbackUrl:callbackUrl,
        userId: user.id,
      },
    });

    if (error) {
      console.error("Edge Function invocation failed:", error);
      throw new Error("Failed to initiate payment");
    }

    return data as PaymentResponse;
  } catch (error: any) {
    console.error("Error initiating PhonePe payment:", error);
    return {
      success: false,
      error: error.message || "Payment initialization failed",
    };
  }
};

/**
 * Verifies the payment status for a given order and payment ID.
 * 
 * @param orderId - The ID of the order
 * @param paymentId - The payment ID
 * @returns A promise resolving to the payment verification response
 */
export const verifyPaymentStatus = async (
  orderId: string,
  paymentId: string
): Promise<{
  success: boolean;
  order?: Order;
  error?: string;
}> => {
  try {
    // Check if the order exists with the specified payment ID
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .eq("payment_id", paymentId)
      .single();

    if (error) {
      console.error("Order verification failed:", error);
      throw new Error("Order not found or payment verification failed");
    }

    // Update the order status to "processing" after payment
    const { error: updateError } = await supabase
      .from("orders")
      .update({ 
        status: "processing" as const, // Type assertion to ensure it matches the expected literal type
      })
      .eq("id", orderId);

    if (updateError) {
      console.error("Failed to update order status:", updateError);
      throw new Error("Failed to update order status");
    }

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

/**
 * Fetches an order by its ID, including related order items.
 * 
 * @param orderId - The ID of the order
 * @returns A promise resolving to the order details or null if not found
 */
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

    if (error) {
      console.error("Error fetching order by ID:", error);
      throw new Error("Failed to fetch order details");
    }

    // Transform the data to match our Order type
    const items = data.order_items.map((item: any) => ({
      productId: item.product_id,
      variantId: item.variant_id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      size: item.size,
      image: "", // Placeholder, fetch image separately if necessary
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
      status: data.status as Order["status"], // Type assertion to match OrderStatus
      paymentStatus: data.payment_id ? "paid" : "pending",
      paymentMethod: data.payment_method,
      shippingAddress,
      gstDetails,
      createdAt: data.created_at,
    };
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    return null;
  }
};