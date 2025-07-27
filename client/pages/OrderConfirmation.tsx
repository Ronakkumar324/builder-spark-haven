import { Link } from "react-router-dom";
import { CheckCircle, Home, Package, Clock, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";

export default function OrderConfirmation() {
  const { orders, currentUser } = useApp();

  // Get the most recent order for the current user
  const latestOrder = orders
    .filter((order) => order.vendorId === currentUser?.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  const estimatedDelivery = new Date();
  estimatedDelivery.setHours(estimatedDelivery.getHours() + 2);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gradient-to-br from-green-50 to-emerald-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>

            {/* Success Message */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Order Placed Successfully!
            </h1>

            <p className="text-xl text-gray-600 mb-8">
              Thank you for your order. We've received your request and will
              process it shortly.
            </p>

            {/* Order Details */}
            {latestOrder && (
              <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                  Order Details
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium text-gray-900">
                      {latestOrder.id}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-bold text-green-600 text-lg">
                      ${latestOrder.total.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-gray-600 block text-sm">
                        Delivery Address:
                      </span>
                      <span className="font-medium text-gray-900">
                        {latestOrder.deliveryAddress}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <span className="text-gray-600 block text-sm">
                        Estimated Delivery:
                      </span>
                      <span className="font-medium text-gray-900">
                        {estimatedDelivery.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Package className="w-5 h-5 text-gray-400" />
                      <span className="font-medium text-gray-900">
                        Items Ordered ({latestOrder.items.length})
                      </span>
                    </div>
                    <div className="space-y-2">
                      {latestOrder.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-gray-600">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="font-medium text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Next Steps */}
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-blue-900 mb-3">
                What happens next?
              </h3>
              <div className="text-left space-y-2 text-blue-800">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">
                    Suppliers will prepare your items
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">
                    You'll receive delivery updates via SMS
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">
                    Items will be delivered to your address
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </Link>

              <Link
                to="/suppliers"
                className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
              >
                <Package className="w-4 h-4" />
                Continue Shopping
              </Link>
            </div>

            {/* Support Info */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Need help with your order?{" "}
                <button
                  onClick={() =>
                    window.open("https://wa.me/1234567890", "_blank")
                  }
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Contact us on WhatsApp
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
