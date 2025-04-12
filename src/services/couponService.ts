
import { supabase } from "@/integrations/supabase/client";
import { Coupon } from "@/lib/types";

// Fetch all active coupons
export const fetchActiveCoupons = async (): Promise<Coupon[]> => {
  try {
    const { data, error } = await supabase
      .from("coupons")
      .select("*")
      .eq("active", true)
      .gte("expires_at", new Date().toISOString())
      .order("code");

    if (error) throw error;

    return data.map((coupon) => ({
      id: coupon.id,
      code: coupon.code,
      discountType: coupon.discount_type as "percentage" | "fixed",
      discountValue: coupon.discount_value,
      minimumPurchase: coupon.min_order_value,
      expiryDate: coupon.expires_at,
      usageLimit: 0, // Add this field to the database if needed
      usageCount: 0, // Add this field to the database if needed
    }));
  } catch (error) {
    console.error("Error fetching active coupons:", error);
    throw error;
  }
};

// Validate a coupon code
export const validateCoupon = async (code: string, subtotal: number): Promise<Coupon | null> => {
  try {
    const { data, error } = await supabase
      .from("coupons")
      .select("*")
      .eq("code", code)
      .eq("active", true)
      .gte("expires_at", new Date().toISOString())
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // Coupon not found
      throw error;
    }

    // Check if minimum order value is met
    if (subtotal < data.min_order_value) {
      return null;
    }

    return {
      id: data.id,
      code: data.code,
      discountType: data.discount_type as "percentage" | "fixed",
      discountValue: data.discount_value,
      minimumPurchase: data.min_order_value,
      expiryDate: data.expires_at,
      usageLimit: 0, // Add this field to the database if needed
      usageCount: 0, // Add this field to the database if needed
    };
  } catch (error) {
    console.error("Error validating coupon:", error);
    throw error;
  }
};
