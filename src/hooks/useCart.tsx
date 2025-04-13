import { createContext, useContext, useState, ReactNode } from "react";
import { CartItem } from "@/lib/types";
import { getProductById, getVariantById } from "@/lib/product-data";
import { toast } from "sonner";
import { useCartPersistence } from "./useCartPersistence";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (productId: string, quantity: number, variantId?: string, isSample?: boolean) => void;
  removeFromCart: (itemIndex: number) => void;
  updateQuantity: (itemIndex: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartSubtotal: number;
  cartTax: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [cartTax, setCartTax] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useCartPersistence(cartItems, setCartItems, setCartSubtotal, setCartTax, setCartTotal);

  const addToCart = (productId: string, quantity: number, variantId?: string, isSample: boolean = false) => {
    const product = getProductById(productId);
    
    if (!product) {
      toast.error("Product not found");
      return;
    }

    let itemToAdd: CartItem;

    if (isSample) {
      // Add sample to cart
      itemToAdd = {
        productId,
        name: `${product.name} Sample`,
        price: product.samplePrice,
        quantity,
        image: product.mainImage,
        isSample: true
      };
    } else if (variantId) {
      // Add specific variant to cart
      const variant = getVariantById(productId, variantId);
      
      if (!variant) {
        toast.error("Product variant not found");
        return;
      }

      itemToAdd = {
        productId,
        variantId,
        name: product.name,
        price: variant.price,
        quantity,
        size: variant.size,
        image: variant.image
      };
    } else {
      toast.error("Please select a product variant");
      return;
    }

    setCartItems(prevItems => {
      // Always add a new item to the cart, even if it has the same productId and variantId
      toast.success("Product added to cart");
      return [...prevItems, itemToAdd];
    });
  };

  const removeFromCart = (itemIndex: number) => {
    setCartItems(prevItems => {
      const newItems = [...prevItems];
      newItems.splice(itemIndex, 1);
      toast.success("Item removed from cart");
      return newItems;
    });
  };

  const updateQuantity = (itemIndex: number, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems(prevItems => {
      const newItems = [...prevItems];
      newItems[itemIndex].quantity = quantity;
      return newItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    toast.success("Cart cleared");
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartSubtotal,
      cartTax
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
