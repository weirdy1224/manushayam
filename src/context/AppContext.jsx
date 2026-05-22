import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Auth state - persist session info locally
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('manushayam_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Dynamic products list from MongoDB
  const [products, setProducts] = useState([]);

  // Cart state (client-side only for convenience)
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('manushayam_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Orders state
  const [orders, setOrders] = useState([]);

  // Fetch initial products from Express/MongoDB
  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error('Error fetching products from backend:', err);
    }
  };

  // Fetch initial orders
  const fetchOrders = async () => {
    if (!currentUser) {
      setOrders([]);
      return;
    }

    try {
      let url = '/api/orders';
      // If user is logged in and not admin, fetch only their orders
      if (currentUser.role !== 'admin') {
        url = `/api/orders?email=${encodeURIComponent(currentUser.email)}`;
      }
      
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error('Error fetching orders from backend:', err);
    }
  };

  // Initial load
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch orders when user logins/changes
  useEffect(() => {
    fetchOrders();
  }, [currentUser]);

  // Keep localStorage in sync for Cart and User
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('manushayam_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('manushayam_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('manushayam_cart', JSON.stringify(cart));
  }, [cart]);

  // Auth actions
  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setCurrentUser(data.user);
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message || 'Invalid email or password' };
      }
    } catch (err) {
      console.error('Login request failed:', err);
      return { success: false, message: 'Server connection error' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setCurrentUser(data.user);
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message || 'Registration failed' };
      }
    } catch (err) {
      console.error('Registration request failed:', err);
      return { success: false, message: 'Server connection error' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setOrders([]);
  };

  // Cart actions
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.product.id === product.id);
      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      }
      return [...prevCart, { product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart => prevCart.map(item => 
      item.product.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Order actions
  const placeOrder = async (shippingDetails, paymentMethod) => {
    const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    const tax = Math.round(subtotal * 0.18); // 18% GST
    const delivery = subtotal > 500 ? 0 : 50; // free delivery over 500
    const total = subtotal + tax + delivery;

    const orderPayload = {
      shippingDetails,
      paymentMethod,
      items: cart.map(item => ({
        product: {
          id: item.product.id,
          title: item.product.title,
          price: item.product.price,
          desc: item.product.desc,
          image: item.product.image
        },
        quantity: item.quantity
      })),
      subtotal,
      tax,
      delivery,
      total,
      userEmail: currentUser ? currentUser.email : 'guest@manushayam.com',
      userName: currentUser ? currentUser.name : shippingDetails.name
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      if (res.ok) {
        const newOrder = await res.json();
        setOrders(prevOrders => [newOrder, ...prevOrders]);
        clearCart();
        return newOrder;
      } else {
        throw new Error('Failed to save order in backend');
      }
    } catch (err) {
      console.error('Error placing order:', err);
      throw err;
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        const updatedOrder = await res.json();
        setOrders(prevOrders => prevOrders.map(order => 
          order.id === orderId ? updatedOrder : order
        ));
        return { success: true };
      }
    } catch (err) {
      console.error('Error updating order status:', err);
      return { success: false };
    }
  };

  // Product management actions (Admin) - expects a FormData object for uploads
  const addProduct = async (formData) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        body: formData // Content-Type is auto set by browser to multipart/form-data
      });

      if (res.ok) {
        const newProduct = await res.json();
        setProducts(prevProducts => [...prevProducts, newProduct]);
        return { success: true };
      } else {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to add product');
      }
    } catch (err) {
      console.error('Error adding product:', err);
      throw err;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
        return { success: true };
      } else {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to delete product');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      throw err;
    }
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      products,
      cart,
      orders,
      login,
      register,
      logout,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      placeOrder,
      updateOrderStatus,
      addProduct,
      deleteProduct,
      refreshProducts: fetchProducts
    }}>
      {children}
    </AppContext.Provider>
  );
};
