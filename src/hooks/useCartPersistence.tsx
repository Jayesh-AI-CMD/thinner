import { useEffect } from "react";

export const useCartPersistence = (
  cartItems: any[],
  setCartItems: (items: any[]) => void,
  setCartSubtotal: (subtotal: number) => void,
  setCartTax: (tax: number) => void,
  setCartTotal: (total: number) => void
) => {
  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
      }
    }
  }, [setCartItems]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("cart");
    }

    // Calculate cart totals
    const subtotal = cartItems.reduce((total, item) => {
      const selectedVariant = item?.product_variants?.find((data) => data?.id == item?.variantId )

      return total + selectedVariant.price * item.quantity
    }, 0);
    const tax = subtotal * 0.18; // 18% GST
    const totalAmount = subtotal + tax; // Exclude discount

    setCartSubtotal(subtotal);
    setCartTax(tax);
    setCartTotal(totalAmount);
  }, [cartItems, setCartSubtotal, setCartTax, setCartTotal]);
};