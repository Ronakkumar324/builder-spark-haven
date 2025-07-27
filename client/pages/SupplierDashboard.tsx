import { useState } from 'react';
import { Package, Plus, Edit, Trash2, DollarSign, Hash, TrendingUp, ShoppingBag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useApp, Product } from '@/context/AppContext';

export default function SupplierDashboard() {
  const { currentUser, userType, suppliers, orders } = useApp();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    stock: '',
  });

  // Get current supplier's data
  const currentSupplier = userType === 'supplier' 
    ? suppliers.find(s => s.id === currentUser?.id)
    : null;

  // Get orders for this supplier's products
  const supplierOrders = orders.filter(order =>
    order.items.some(item => 
      currentSupplier?.products.some(product => product.id === item.productId)
    )
  );

  const totalRevenue = supplierOrders.reduce((sum, order) => {
    const supplierItems = order.items.filter(item =>
      currentSupplier?.products.some(product => product.id === item.productId)
    );
    return sum + supplierItems.reduce((itemSum, item) => itemSum + (item.price * item.quantity), 0);
  }, 0);

  const totalProducts = currentSupplier?.products.length || 0;
  const totalStock = currentSupplier?.products.reduce((sum, product) => sum + product.stock, 0) || 0;

  const handleAddProduct = () => {
    if (!newProduct.name.trim() || !newProduct.price || !newProduct.stock) return;

    // In a real app, this would update the supplier's products in the backend
    console.log('Adding product:', newProduct);
    
    // Reset form
    setNewProduct({ name: '', price: '', stock: '' });
    setShowAddProduct(false);
    
    // Show success message
    alert('Product added successfully!');
  };

  if (userType !== 'supplier' || !currentSupplier) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 bg-gray-50 flex items-center justify-center py-20">
          <div className="max-w-md mx-auto text-center px-4">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-200 rounded-2xl flex items-center justify-center">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Access Denied
            </h1>
            
            <p className="text-gray-600 mb-8">
              This dashboard is only available for registered suppliers.
            </p>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Supplier Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome back, {currentSupplier.fullName}! Manage your products and track your business.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-3xl font-bold text-gray-900">{totalProducts}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Stock</p>
                  <p className="text-3xl font-bold text-gray-900">{totalStock}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Hash className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-green-600">${totalRevenue.toFixed(2)}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Products List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Your Products
                    </h2>
                    <button
                      onClick={() => setShowAddProduct(true)}
                      className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Product
                    </button>
                  </div>
                </div>
                
                {currentSupplier.products.length === 0 ? (
                  <div className="p-12 text-center">
                    <Package className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No products yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Start by adding your first product to your catalog
                    </p>
                    <button
                      onClick={() => setShowAddProduct(true)}
                      className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Your First Product
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {currentSupplier.products.map((product) => (
                      <div key={product.id} className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
                              <Package className="w-6 h-6 text-orange-500" />
                            </div>
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">
                                {product.name}
                              </h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                <span className="flex items-center gap-1">
                                  <DollarSign className="w-4 h-4" />
                                  {product.price.toFixed(2)} / unit
                                </span>
                                <span className="flex items-center gap-1">
                                  <Hash className="w-4 h-4" />
                                  {product.stock} in stock
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-red-400 hover:text-red-600 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Recent Orders & Add Product Form */}
            <div className="lg:col-span-1 space-y-6">
              {/* Add Product Form */}
              {showAddProduct && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Add New Product
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name
                      </label>
                      <input
                        type="text"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        placeholder="e.g., Fresh Tomatoes"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price per unit
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        placeholder="0.00"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        placeholder="0"
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={handleAddProduct}
                        disabled={!newProduct.name.trim() || !newProduct.price || !newProduct.stock}
                        className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Add Product
                      </button>
                      <button
                        onClick={() => setShowAddProduct(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Orders */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Orders
                </h3>
                
                {supplierOrders.length === 0 ? (
                  <div className="text-center py-6">
                    <ShoppingBag className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500 text-sm">No orders yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {supplierOrders.slice(0, 5).map((order) => {
                      const supplierItems = order.items.filter(item =>
                        currentSupplier?.products.some(product => product.id === item.productId)
                      );
                      const orderTotal = supplierItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                      
                      return (
                        <div key={order.id} className="border border-gray-200 rounded-lg p-3">
                          <div className="flex justify-between items-start">
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
                          <div className="mt-2">
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
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
