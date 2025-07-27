import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Plus,
  Edit,
  Trash2,
  DollarSign,
  Hash,
  TrendingUp,
  ShoppingBag,
  Save,
  X,
  AlertCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp, Product } from "@/context/AppContext";

interface EditingProduct {
  id: string;
  name: string;
  price: string;
  stock: string;
}

export default function SupplierDashboard() {
  const navigate = useNavigate();
  const {
    currentUser,
    userType,
    suppliers,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useApp();

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<EditingProduct | null>(
    null,
  );
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
  });
  const [stockUpdates, setStockUpdates] = useState<{ [key: string]: string }>(
    {},
  );

  // Access guard - redirect if not logged in as supplier
  if (userType !== "supplier" || !currentUser) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 bg-gray-50 flex items-center justify-center py-20">
          <div className="max-w-md mx-auto text-center px-4">
            <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-2xl flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Access Denied
            </h1>

            <p className="text-gray-600 mb-8">
              This dashboard is only available for logged-in suppliers. Please
              log in to continue.
            </p>

            <button
              onClick={() => navigate("/login/supplier")}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
            >
              Login as Supplier
            </button>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // Get current supplier's data
  const currentSupplier = suppliers.find((s) => s.id === currentUser?.id);

  // Get orders for this supplier's products
  const supplierOrders = orders.filter((order) =>
    order.items.some((item) =>
      currentSupplier?.products.some(
        (product) => product.id === item.productId,
      ),
    ),
  );

  const totalRevenue = supplierOrders.reduce((sum, order) => {
    const supplierItems = order.items.filter((item) =>
      currentSupplier?.products.some(
        (product) => product.id === item.productId,
      ),
    );
    return (
      sum +
      supplierItems.reduce(
        (itemSum, item) => itemSum + item.price * item.quantity,
        0,
      )
    );
  }, 0);

  const totalProducts = currentSupplier?.products.length || 0;
  const totalStock =
    currentSupplier?.products.reduce(
      (sum, product) => sum + product.stock,
      0,
    ) || 0;

  const handleAddProduct = () => {
    if (
      !newProduct.name.trim() ||
      !newProduct.price ||
      !newProduct.stock ||
      !currentSupplier
    )
      return;

    addProduct(currentSupplier.id, {
      name: newProduct.name.trim(),
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock, 10),
    });

    // Reset form
    setNewProduct({ name: "", price: "", stock: "" });
    setShowAddProduct(false);

    // Show success message
    alert("Product added successfully! ✅");
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct({
      id: product.id,
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
    });
  };

  const handleSaveEdit = () => {
    if (!editingProduct) return;

    const updates = {
      name: editingProduct.name.trim(),
      price: parseFloat(editingProduct.price),
      stock: parseInt(editingProduct.stock, 10),
    };

    updateProduct(editingProduct.id, updates);
    setEditingProduct(null);

    alert("Product updated successfully! ✅");
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: string, productName: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${productName}"? This action cannot be undone.`,
      )
    ) {
      deleteProduct(productId);
      alert("Product deleted successfully! ✅");
    }
  };

  const handleStockUpdate = (productId: string) => {
    const newStock = stockUpdates[productId];
    if (newStock && !isNaN(parseInt(newStock, 10))) {
      updateProduct(productId, { stock: parseInt(newStock, 10) });
      setStockUpdates((prev) => ({ ...prev, [productId]: "" }));
      alert("Stock updated successfully! ✅");
    }
  };

  const handleEditPrice = (productId: string) => {
    const product = currentSupplier?.products.find((p) => p.id === productId);
    if (!product) return;

    const newPrice = prompt("Enter new price:", product.price.toString());
    if (newPrice && !isNaN(parseFloat(newPrice))) {
      updateProduct(productId, { price: parseFloat(newPrice) });
      alert("Price updated successfully! ✅");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Supplier Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome back, {currentSupplier?.fullName}! Manage your products
              and track your business.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Products
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {totalProducts}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Stock
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {totalStock}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Hash className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Revenue
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    ${totalRevenue.toFixed(2)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add Product Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Add New Product
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                      }
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      placeholder="e.g., Fresh Tomatoes"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price per unit *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, price: e.target.value })
                      }
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock Quantity *
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={newProduct.stock}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, stock: e.target.value })
                      }
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      placeholder="0"
                    />
                  </div>

                  <button
                    onClick={handleAddProduct}
                    disabled={
                      !newProduct.name.trim() ||
                      !newProduct.price ||
                      !newProduct.stock
                    }
                    className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Product
                  </button>
                </div>
              </div>
            </div>

            {/* Product Management Table */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Product Management
                  </h2>
                </div>

                {!currentSupplier?.products.length ? (
                  <div className="p-12 text-center">
                    <Package className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No products yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Start by adding your first product using the form on the
                      left.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Stock
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Update Stock
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentSupplier?.products.map((product) => (
                          <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center mr-3">
                                  <Package className="w-5 h-5 text-orange-500" />
                                </div>
                                <div className="text-sm font-medium text-gray-900">
                                  {product.name}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center text-sm text-gray-900">
                                <DollarSign className="w-4 h-4 mr-1" />
                                {product.price.toFixed(2)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center text-sm text-gray-900">
                                <Hash className="w-4 h-4 mr-1" />
                                {product.stock}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  min="0"
                                  value={stockUpdates[product.id] || ""}
                                  onChange={(e) =>
                                    setStockUpdates((prev) => ({
                                      ...prev,
                                      [product.id]: e.target.value,
                                    }))
                                  }
                                  className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                  placeholder={product.stock.toString()}
                                />
                                <button
                                  onClick={() => handleStockUpdate(product.id)}
                                  disabled={!stockUpdates[product.id]}
                                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  Update
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleEditPrice(product.id)}
                                  className="p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded"
                                  title="Edit Price"
                                >
                                  <DollarSign className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleEditProduct(product)}
                                  className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded"
                                  title="Edit Product"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteProduct(
                                      product.id,
                                      product.name,
                                    )
                                  }
                                  className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                                  title="Delete Product"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          {supplierOrders.length > 0 && (
            <div className="mt-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Orders
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {supplierOrders.slice(0, 6).map((order) => {
                    const supplierItems = order.items.filter((item) =>
                      currentSupplier?.products.some(
                        (product) => product.id === item.productId,
                      ),
                    );
                    const orderTotal = supplierItems.reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0,
                    );

                    return (
                      <div
                        key={order.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-gray-900 text-sm">
                              {order.id}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <p className="font-semibold text-green-600 text-sm">
                            ${orderTotal.toFixed(2)}
                          </p>
                        </div>
                        <div className="space-y-1">
                          {supplierItems.map((item, index) => (
                            <p key={index} className="text-xs text-gray-600">
                              {item.name} × {item.quantity}
                            </p>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
