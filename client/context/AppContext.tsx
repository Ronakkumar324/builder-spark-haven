import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  supplierId: string;
  supplierName: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  supplierName: string;
}

export interface Vendor {
  id: string;
  fullName: string;
  phone: string;
  businessName: string;
  email: string;
}

export interface Supplier {
  id: string;
  fullName: string;
  phone: string;
  businessName: string;
  email: string;
  products: Product[];
}

export interface Order {
  id: string;
  vendorId: string;
  items: CartItem[];
  deliveryAddress: string;
  total: number;
  date: string;
}

interface AppContextType {
  // State
  vendors: Vendor[];
  suppliers: Supplier[];
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  currentUser: Vendor | Supplier | null;
  userType: 'vendor' | 'supplier' | null;

  // Actions
  registerVendor: (vendor: Omit<Vendor, 'id'>) => void;
  registerSupplier: (supplier: Omit<Supplier, 'id'>, products: Omit<Product, 'id' | 'supplierId' | 'supplierName'>[]) => void;
  addToCart: (product: Product, quantity: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  placeOrder: (deliveryAddress: string) => string;
  clearCart: () => void;
  loginUser: (id: string, type: 'vendor' | 'supplier') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentUser, setCurrentUser] = useState<Vendor | Supplier | null>(null);
  const [userType, setUserType] = useState<'vendor' | 'supplier' | null>(null);

  const registerVendor = (vendorData: Omit<Vendor, 'id'>) => {
    const newVendor: Vendor = {
      ...vendorData,
      id: Date.now().toString(),
    };
    setVendors(prev => [...prev, newVendor]);
    setCurrentUser(newVendor);
    setUserType('vendor');
  };

  const registerSupplier = (
    supplierData: Omit<Supplier, 'id'>, 
    productList: Omit<Product, 'id' | 'supplierId' | 'supplierName'>[]
  ) => {
    const supplierId = Date.now().toString();
    const newSupplier: Supplier = {
      ...supplierData,
      id: supplierId,
      products: [],
    };

    const newProducts: Product[] = productList.map((product, index) => ({
      ...product,
      id: `${supplierId}-${index}`,
      supplierId,
      supplierName: supplierData.businessName,
    }));

    newSupplier.products = newProducts;

    setSuppliers(prev => [...prev, newSupplier]);
    setProducts(prev => [...prev, ...newProducts]);
    setCurrentUser(newSupplier);
    setUserType('supplier');
  };

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.productId === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity,
          supplierName: product.supplierName,
        }];
      }
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const placeOrder = (deliveryAddress: string): string => {
    const orderId = `ORDER-${Date.now()}`;
    const newOrder: Order = {
      id: orderId,
      vendorId: currentUser?.id || '',
      items: [...cart],
      deliveryAddress,
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      date: new Date().toISOString(),
    };

    setOrders(prev => [...prev, newOrder]);
    clearCart();
    return orderId;
  };

  const clearCart = () => {
    setCart([]);
  };

  const loginUser = (id: string, type: 'vendor' | 'supplier') => {
    if (type === 'vendor') {
      const vendor = vendors.find(v => v.id === id);
      if (vendor) {
        setCurrentUser(vendor);
        setUserType('vendor');
      }
    } else {
      const supplier = suppliers.find(s => s.id === id);
      if (supplier) {
        setCurrentUser(supplier);
        setUserType('supplier');
      }
    }
  };

  const value: AppContextType = {
    vendors,
    suppliers,
    products,
    cart,
    orders,
    currentUser,
    userType,
    registerVendor,
    registerSupplier,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    placeOrder,
    clearCart,
    loginUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
