import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem } from "@/lib/types";
import { getProductById, getVariantById } from "@/lib/product-data";
import { toast } from "sonner";

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
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("cart");
    }

    // Calculate cart totals
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.18; // 18% GST
    const totalAmount = subtotal + tax; // Exclude discount

    setCartSubtotal(subtotal);
    setCartTax(tax);
    setCartTotal(totalAmount);
  }, [cartItems]);

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
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(item => {
        if (isSample) {
          return item.productId === productId && item.isSample === true;
        } else {
          return item.productId === productId && item.variantId === variantId;
        }
      });

      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        toast.success("Cart updated successfully");
        return updatedItems;
      } else {
        // Item doesn't exist, add new item
        toast.success("Product added to cart");
        return [...prevItems, itemToAdd];
      }
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
