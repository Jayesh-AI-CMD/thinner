import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  ArrowRight
} from "lucide-react";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartSubtotal, cartTax, cartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="bg-gray-50 py-8 md:py-12">
        <div className="container">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="flex justify-center mb-4">
                <ShoppingCart className="h-16 w-16 text-gray-300" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Link to="/products">
                <Button size="lg">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4 border-b bg-gray-50">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold">Cart Items ({cartItems.length})</h2>
                    </div>
                  </div>

                  <div className="divide-y">
                    {cartItems.map((item, index) => (
                      <div key={index} className="p-4 md:p-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center">
                          <div className="w-full md:w-auto flex-shrink-0 md:mr-6 mb-4 md:mb-0">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-20 h-20 object-contain bg-gray-50 rounded-md"
                            />
                          </div>

                          <div className="flex-grow">
                            <h3 className="text-lg font-medium mb-1">{item.name}</h3>
                            {item.size && <p className="text-gray-500 text-sm mb-2">Size: {item.size}</p>}
                            {item.isSample && <p className="text-gray-500 text-sm mb-2">Sample</p>}
                            
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2">
                              <div className="flex items-center mb-3 sm:mb-0">
                                <button
                                  onClick={() => updateQuantity(index, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="w-8 h-8 border border-gray-300 rounded-l-md flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <div className="w-10 h-8 border-t border-b border-gray-300 flex items-center justify-center text-sm">
                                  {item.quantity}
                                </div>
                                <button
                                  onClick={() => updateQuantity(index, item.quantity + 1)}
                                  className="w-8 h-8 border border-gray-300 rounded-r-md flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>

                              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto">
                                <div className="sm:mr-4">
                                  <span className="font-semibold">₹{item.price * item.quantity}</span>
                                  <div className="text-xs text-gray-500">₹{item.price} each</div>
                                </div>
                                <button
                                  onClick={() => removeFromCart(index)}
                                  className="text-red-500 hover:text-red-600"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>₹{cartSubtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">GST (18%)</span>
                      <span>₹{cartTax.toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>₹{cartTotal.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Including ₹{cartTax.toFixed(2)} in taxes
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button 
                      onClick={() => navigate("/checkout")}
                      className="w-full"
                      size="lg"
                    >
                      Proceed to Checkout
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Link to="/products" className="text-brand-600 hover:text-brand-700 text-sm inline-flex items-center">
                      <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
