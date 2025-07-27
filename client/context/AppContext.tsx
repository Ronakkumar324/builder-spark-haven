import React, { createContext, useContext, useState, ReactNode } from "react";

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
  userType: "vendor" | "supplier" | null;

  // Actions
  registerVendor: (vendor: Omit<Vendor, "id">) => void;
  registerSupplier: (
    supplier: Omit<Supplier, "id">,
    products: Omit<Product, "id" | "supplierId" | "supplierName">[],
  ) => void;
  addToCart: (product: Product, quantity: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  placeOrder: (deliveryAddress: string) => string;
  clearCart: () => void;
  loginUser: (id: string, type: "vendor" | "supplier") => void;

  // Product Management
  addProduct: (
    supplierId: string,
    product: Omit<Product, "id" | "supplierId" | "supplierName">,
  ) => void;
  updateProduct: (
    productId: string,
    updates: Partial<Pick<Product, "name" | "price" | "stock">>,
  ) => void;
  deleteProduct: (productId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
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
  const [currentUser, setCurrentUser] = useState<Vendor | Supplier | null>(
    null,
  );
  const [userType, setUserType] = useState<"vendor" | "supplier" | null>(null);

  const registerVendor = (vendorData: Omit<Vendor, "id">) => {
    const newVendor: Vendor = {
      ...vendorData,
      id: Date.now().toString(),
    };
    setVendors((prev) => [...prev, newVendor]);
    setCurrentUser(newVendor);
    setUserType("vendor");
  };

  const registerSupplier = (
    supplierData: Omit<Supplier, "id">,
    productList: Omit<Product, "id" | "supplierId" | "supplierName">[],
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

    setSuppliers((prev) => [...prev, newSupplier]);
    setProducts((prev) => [...prev, ...newProducts]);
    setCurrentUser(newSupplier);
    setUserType("supplier");
  };

  const addToCart = (product: Product, quantity: number) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.productId === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        return [
          ...prev,
          {
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity,
            supplierName: product.supplierName,
          },
        ];
      }
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const placeOrder = (deliveryAddress: string): string => {
    const orderId = `ORDER-${Date.now()}`;
    const newOrder: Order = {
      id: orderId,
      vendorId: currentUser?.id || "",
      items: [...cart],
      deliveryAddress,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      date: new Date().toISOString(),
    };

    setOrders((prev) => [...prev, newOrder]);
    clearCart();
    return orderId;
  };

  const clearCart = () => {
    setCart([]);
  };

  const loginUser = (id: string, type: "vendor" | "supplier") => {
    if (type === "vendor") {
      const vendor = vendors.find((v) => v.id === id);
      if (vendor) {
        setCurrentUser(vendor);
        setUserType("vendor");
      }
    } else {
      const supplier = suppliers.find((s) => s.id === id);
      if (supplier) {
        setCurrentUser(supplier);
        setUserType("supplier");
      }
    }
  };

  const addProduct = (
    supplierId: string,
    productData: Omit<Product, "id" | "supplierId" | "supplierName">,
  ) => {
    const supplier = suppliers.find((s) => s.id === supplierId);
    if (!supplier) return;

    const newProduct: Product = {
      ...productData,
      id: `${supplierId}-${Date.now()}`,
      supplierId,
      supplierName: supplier.businessName,
    };

    // Update products array
    setProducts((prev) => [...prev, newProduct]);

    // Update supplier's products
    setSuppliers((prev) =>
      prev.map((s) =>
        s.id === supplierId
          ? { ...s, products: [...s.products, newProduct] }
          : s,
      ),
    );

    // Update current user if they are the supplier
    if (currentUser?.id === supplierId && userType === "supplier") {
      setCurrentUser((prev) =>
        prev
          ? { ...prev, products: [...(prev as Supplier).products, newProduct] }
          : null,
      );
    }
  };

  const updateProduct = (
    productId: string,
    updates: Partial<Pick<Product, "name" | "price" | "stock">>,
  ) => {
    // Update products array
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId ? { ...product, ...updates } : product,
      ),
    );

    // Update suppliers array
    setSuppliers((prev) =>
      prev.map((supplier) => ({
        ...supplier,
        products: supplier.products.map((product) =>
          product.id === productId ? { ...product, ...updates } : product,
        ),
      })),
    );

    // Update current user if they are a supplier
    if (userType === "supplier" && currentUser) {
      const updatedSupplier = suppliers.find((s) => s.id === currentUser.id);
      if (updatedSupplier) {
        setCurrentUser({
          ...updatedSupplier,
          products: updatedSupplier.products.map((product) =>
            product.id === productId ? { ...product, ...updates } : product,
          ),
        });
      }
    }
  };

  const deleteProduct = (productId: string) => {
    // Remove from products array
    setProducts((prev) => prev.filter((product) => product.id !== productId));

    // Remove from suppliers array
    setSuppliers((prev) =>
      prev.map((supplier) => ({
        ...supplier,
        products: supplier.products.filter(
          (product) => product.id !== productId,
        ),
      })),
    );

    // Update current user if they are a supplier
    if (userType === "supplier" && currentUser) {
      const updatedSupplier = suppliers.find((s) => s.id === currentUser.id);
      if (updatedSupplier) {
        setCurrentUser({
          ...updatedSupplier,
          products: updatedSupplier.products.filter(
            (product) => product.id !== productId,
          ),
        });
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
    addProduct,
    updateProduct,
    deleteProduct,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
