
import { supabase } from "@/integrations/supabase/client";
import { CartItem, Order, Address, GSTDetails } from "@/lib/types";

// Create a new order
export const createOrder = async (
  items: CartItem[],
  subtotal: number,
  tax: number,
  total: number,
  shippingAddress: Address,
  paymentMethod: string,
  gstDetails?: GSTDetails
): Promise<Order> => {
  console.log("🚀 ~ orderItems ~ items:", items)
  try {
    const user = supabase.auth.getUser();
    if (!user) {
      throw new Error("User must be logged in to create an order");
    }

    // Create the order
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        user_id: (await user).data.user?.id,
        subtotal,
        tax,
        total,
        shipping_address: shippingAddress.street,
        shipping_city: shippingAddress.city,
        shipping_state: shippingAddress.state,
        shipping_pincode: shippingAddress.postalCode,
        shipping_name: shippingAddress.name || "",
        shipping_email: shippingAddress.email || "",
        shipping_phone: shippingAddress.phone || "",
        payment_method: paymentMethod,
        gst_number: gstDetails?.gstNumber,
        gst_business_name: gstDetails?.businessName,
        gst_address: gstDetails?.address ? JSON.stringify(gstDetails.address) : null,
      })
      .select()
      .single();

    if (error) throw error;

    // Create order items
    const orderItems = items.map((item) => {
      const selectedVariant = item?.product_variants?.find((data) => data?.id == item?.variantId);
      return ({
        order_id: order.id,
        product_id: item.id,
        variant_id: item.variantId,
        is_sample: item.isSample || false,
        quantity: item.quantity,
        price: selectedVariant.price,
        name: item.name,
        size: item.size,
      })
    });

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);

    if (itemsError) throw itemsError;

    return {
      id: order.id,
      userId: order.user_id,
      items,
      subtotal,
      tax,
      shipping: 0, // Add shipping cost calculation if needed
      total,
      status: order.status as Order["status"],
      paymentStatus: "pending",
      paymentMethod,
      shippingAddress,
      gstDetails,
      createdAt: order.created_at,
    };
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Fetch orders for the current user
export const fetchUserOrders = async (): Promise<Order[]> => {
  try {
    const { data: orders, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (*)
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return orders.map((order) => {
      const items = order.order_items.map((item: any) => ({
        productId: item.product_id,
        variantId: item.variant_id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        image: "", // We would need to fetch this separately
        isSample: item.is_sample,
      }));

      const shippingAddress: Address = {
        street: order.shipping_address,
        city: order.shipping_city,
        state: order.shipping_state,
        postalCode: order.shipping_pincode,
        country: "India",
        name: order.shipping_name,
        email: order.shipping_email,
        phone: order.shipping_phone,
      };

      let gstDetails: GSTDetails | undefined;
      if (order.gst_number) {
        gstDetails = {
          gstNumber: order.gst_number,
          businessName: order.gst_business_name || "",
          address: order.gst_address ? JSON.parse(order.gst_address) : shippingAddress,
        };
      }

      return {
        id: order.id,
        userId: order.user_id,
        items,
        subtotal: order.subtotal,
        tax: order.tax,
        shipping: 0, // Add shipping cost if it's stored
        total: order.total,
        status: order.status as Order["status"],
        paymentStatus: "pending", // This should be stored in the database
        paymentMethod: order.payment_method,
        shippingAddress,
        gstDetails,
        createdAt: order.created_at,
      };
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};

// Fetch a single order by ID
export const fetchOrderById = async (orderId: string): Promise<Order | null> => {
  try {
    const { data: order, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (*)
      `)
      .eq("id", orderId)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // No rows returned
      throw error;
    }

    const items = order.order_items.map((item: any) => ({
      productId: item.product_id,
      variantId: item.variant_id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      size: item.size,
      image: "", // We would need to fetch this separately
      isSample: item.is_sample,
    }));

    const shippingAddress: Address = {
      street: order.shipping_address,
      city: order.shipping_city,
      state: order.shipping_state,
      postalCode: order.shipping_pincode,
      country: "India",
      name: order.shipping_name,
      email: order.shipping_email,
      phone: order.shipping_phone,
    };

    let gstDetails: GSTDetails | undefined;
    if (order.gst_number) {
      gstDetails = {
        gstNumber: order.gst_number,
        businessName: order.gst_business_name || "",
        address: order.gst_address ? JSON.parse(order.gst_address) : shippingAddress,
      };
    }

    return {
      id: order.id,
      userId: order.user_id,
      items,
      subtotal: order.subtotal,
      tax: order.tax,
      shipping: 0, // Add shipping cost if it's stored
      total: order.total,
      status: order.status as Order["status"],
      paymentStatus: "pending", // This should be stored in the database
      paymentMethod: order.payment_method,
      shippingAddress,
      gstDetails,
      createdAt: order.created_at,
    };
  } catch (error) {
    console.error("Error fetching order by id:", error);
    throw error;
  }
};
