import { useState } from "react";
import {
  Search,
  ShoppingCart,
  Plus,
  MessageCircle,
  Package,
  DollarSign,
  Building,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";

export default function SupplierList() {
  const { products, addToCart, cart } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.supplierName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getQuantity = (productId: string) => quantities[productId] || 1;

  const setQuantity = (productId: string, quantity: number) => {
    if (quantity > 0) {
      setQuantities((prev) => ({ ...prev, [productId]: quantity }));
    }
  };

  const handleAddToCart = (product: any) => {
    const quantity = getQuantity(product.id);
    addToCart(product, quantity);

    // Reset quantity after adding
    setQuantities((prev) => ({ ...prev, [product.id]: 1 }));

    // Show success feedback
    const button = document.getElementById(`add-btn-${product.id}`);
    if (button) {
      const originalText = button.innerHTML;
      button.innerHTML = "✓ Added";
      button.className = button.className.replace(
        "bg-orange-500 hover:bg-orange-600",
        "bg-green-500",
      );
      setTimeout(() => {
        button.innerHTML = originalText;
        button.className = button.className.replace(
          "bg-green-500",
          "bg-orange-500 hover:bg-orange-600",
        );
      }, 1000);
    }
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Browse Suppliers
            </h1>
            <p className="text-gray-600">
              Find products from local suppliers in your area
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products or suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {products.length === 0
                  ? "No products available"
                  : "No products found"}
              </h3>
              <p className="text-gray-600">
                {products.length === 0
                  ? "Suppliers will add their products here"
                  : "Try adjusting your search terms"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                >
                  {/* Product Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                    <Package className="w-12 h-12 text-orange-500" />
                  </div>

                  {/* Product Details */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>

                    <div className="flex items-center text-gray-600 mb-3">
                      <Building className="w-4 h-4 mr-2" />
                      <span className="text-sm">{product.supplierName}</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-green-600">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-lg font-bold">
                          {product.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">
                          / unit
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Stock: {product.stock}
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            setQuantity(product.id, getQuantity(product.id) - 1)
                          }
                          disabled={getQuantity(product.id) <= 1}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-medium">
                          {getQuantity(product.id)}
                        </span>
                        <button
                          onClick={() =>
                            setQuantity(product.id, getQuantity(product.id) + 1)
                          }
                          disabled={getQuantity(product.id) >= product.stock}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-sm font-medium text-gray-900">
                        ${(product.price * getQuantity(product.id)).toFixed(2)}
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      id={`add-btn-${product.id}`}
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => window.open("https://wa.me/1234567890", "_blank")}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
          title="WhatsApp Support"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Cart Indicator */}
      {totalCartItems > 0 && (
        <div className="fixed bottom-6 left-6 z-50">
          <div className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg">
            <span className="font-medium">{totalCartItems} items in cart</span>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
