import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  MapPin,
  ArrowLeft,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, updateCartQuantity, removeFromCart, placeOrder } = useApp();
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      updateCartQuantity(productId, newQuantity);
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryAddress.trim()) return;

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Place order
    const orderId = placeOrder(deliveryAddress.trim());

    console.log("Order placed:", {
      orderId,
      items: cart,
      deliveryAddress,
      total,
    });

    // Navigate to confirmation
    navigate("/order-confirmation");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 bg-gray-50 flex items-center justify-center py-20">
          <div className="max-w-md mx-auto text-center px-4">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-200 rounded-2xl flex items-center justify-center">
              <ShoppingCart className="w-10 h-10 text-gray-400" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your Cart is Empty
            </h1>

            <p className="text-gray-600 mb-8">
              Add some products from our suppliers to get started
            </p>

            <Link
              to="/suppliers"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
            >
              Browse Products
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link
                to="/suppliers"
                className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Shopping Cart
            </h1>
            <p className="text-gray-600">
              Review your items and place your order
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Cart Items ({cart.length})
                  </h2>
                </div>

                <div className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <div
                      key={item.productId}
                      className="p-6 flex items-center space-x-4"
                    >
                      {/* Product Image Placeholder */}
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <ShoppingCart className="w-6 h-6 text-orange-500" />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          by {item.supplierName}
                        </p>
                        <p className="text-lg font-semibold text-green-600 mt-1">
                          ${item.price.toFixed(2)} / unit
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.productId,
                                item.quantity - 1,
                              )
                            }
                            className="p-2 hover:bg-gray-50 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.productId,
                                item.quantity + 1,
                              )
                            }
                            className="p-2 hover:bg-gray-50 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm sticky top-8">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Order Summary
                  </h2>

                  {/* Order Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>
                        Subtotal (
                        {cart.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                        items)
                      </span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery Fee</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Address Form */}
                  <form onSubmit={handlePlaceOrder} className="space-y-6">
                    <div>
                      <label
                        htmlFor="deliveryAddress"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Delivery Address *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <textarea
                          id="deliveryAddress"
                          required
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          rows={3}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none"
                          placeholder="Enter your complete delivery address..."
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!deliveryAddress.trim() || isSubmitting}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 transition-all duration-200"
                    >
                      {isSubmitting ? "Placing Order..." : "Place Order"}
                    </button>
                  </form>

                  <p className="text-xs text-gray-500 mt-4 text-center">
                    By placing your order, you agree to our terms and conditions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
