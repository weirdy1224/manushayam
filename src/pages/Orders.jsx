import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Search, Calendar, MapPin, Truck, CheckCircle2, Clock } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import './Orders.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  out: { opacity: 0, y: -20, transition: { duration: 0.6 } }
};

const Orders = () => {
  const { orders, currentUser, logout } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  // For searching specific order IDs (great for guests or direct lookups)
  const [searchId, setSearchId] = useState('');
  const [searchedOrder, setSearchedOrder] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Get orders belonging to this user
  const userOrders = orders.filter(
    order => order.userEmail === (currentUser ? currentUser.email : 'guest@manushayam.com')
  );

  // If redirected immediately after placing an order
  useEffect(() => {
    if (location.state?.newOrder) {
      setSuccessMessage(`Order ${location.state.newOrder.id} placed successfully!`);
      setSearchedOrder(location.state.newOrder);
      // Clear location state to prevent repeat alerts
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchError('');
    setSearchedOrder(null);

    if (!searchId.trim()) return;

    const trimmed = searchId.trim().toUpperCase();
    try {
      const res = await fetch(`/api/orders/${trimmed}`);
      if (res.ok) {
        const data = await res.json();
        setSearchedOrder(data);
      } else {
        setSearchError('Order not found. Please verify the ID (e.g. MSY-123456).');
      }
    } catch (err) {
      console.error('Error tracking order:', err);
      setSearchError('Error connecting to server. Please try again.');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing':
        return <Clock size={20} className="status-icon processing" />;
      case 'Shipped':
        return <Truck size={20} className="status-icon shipped" />;
      case 'Delivered':
        return <CheckCircle2 size={20} className="status-icon delivered" />;
      default:
        return <Package size={20} className="status-icon" />;
    }
  };

  const renderTimeline = (status) => {
    const steps = ['Processing', 'Shipped', 'Delivered'];
    const currentStepIdx = steps.indexOf(status);

    return (
      <div className="order-timeline">
        {steps.map((step, idx) => (
          <div 
            key={step} 
            className={`timeline-step ${idx <= currentStepIdx ? 'active' : ''} ${step.toLowerCase()}`}
          >
            <div className="timeline-node">
              {idx < currentStepIdx ? <CheckCircle2 size={12} /> : idx + 1}
            </div>
            <span className="timeline-label">{step}</span>
            {idx < steps.length - 1 && (
              <div className={`timeline-line ${idx < currentStepIdx ? 'active' : ''}`}></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderOrderCard = (order) => (
    <div key={order.id} className="order-tracking-card">
      <div className="order-tracking-header">
        <div className="header-info">
          <span className="order-id-badge">{order.id}</span>
          <div className="header-meta">
            <span className="meta-item">
              <Calendar size={14} />
              <span>{order.date}</span>
            </span>
          </div>
        </div>
        <div className="order-total-badge">
          Total Paid: <span>₹{order.total}</span>
        </div>
      </div>

      <div className="order-tracking-body">
        {/* Status Timeline */}
        <div className="timeline-section">
          <h4>Order Status: <span className={`status-text ${order.status.toLowerCase()}`}>{order.status}</span></h4>
          {renderTimeline(order.status)}
        </div>

        <div className="details-section">
          {/* Shipping Address */}
          <div className="shipping-address-box">
            <h5>
              <MapPin size={14} />
              <span>Shipping Details</span>
            </h5>
            <p><strong>{order.shippingDetails.name}</strong></p>
            <p>{order.shippingDetails.phone}</p>
            <p>{order.shippingDetails.address}</p>
            <p>{order.shippingDetails.city}, {order.shippingDetails.state} - {order.shippingDetails.pincode}</p>
            <p className="payment-method-desc">Payment Method: <em>{order.paymentMethod}</em></p>
          </div>

          {/* Items Purchased */}
          <div className="order-items-box">
            <h5>
              <Package size={14} />
              <span>Items Purchased</span>
            </h5>
            <div className="items-list">
              {order.items.map((item, idx) => (
                <div key={idx} className="purchased-item-row">
                  <span className="item-name">{item.product.title}</span>
                  <span className="item-qty">Qty: {item.quantity}</span>
                  <span className="item-price">₹{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="price-breakdown">
              <div className="br-row">
                <span>Subtotal:</span>
                <span>₹{order.subtotal}</span>
              </div>
              <div className="br-row">
                <span>GST (18%):</span>
                <span>₹{order.tax}</span>
              </div>
              <div className="br-row">
                <span>Shipping:</span>
                <span>{order.delivery === 0 ? 'FREE' : `₹${order.delivery}`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="orders-page container"
    >
      <div className="orders-page-header">
        <h1 className="orders-title">Track Your Orders</h1>
        {currentUser && (
          <button className="btn-outline logout-btn" onClick={() => { logout(); navigate('/login'); }}>
            Log Out
          </button>
        )}
      </div>

      {successMessage && (
        <div className="orders-alert success-alert">
          <CheckCircle2 size={20} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Direct Order Lookup */}
      <div className="orders-search-section">
        <form className="orders-search-form" onSubmit={handleSearch}>
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Track by Order ID (e.g. MSY-123456)" 
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary search-submit-btn">
            Track
          </button>
        </form>

        {searchError && (
          <p className="search-error">{searchError}</p>
        )}

        {searchedOrder && (
          <div className="searched-order-result">
            <h3>Lookup Result</h3>
            {renderOrderCard(searchedOrder)}
          </div>
        )}
      </div>

      {/* Order List */}
      <div className="orders-history-section">
        <h2>Your Order History</h2>
        
        {userOrders.length === 0 ? (
          <div className="no-orders-box">
            <Package size={36} className="no-orders-icon" />
            <p>No orders found under this account.</p>
            <button onClick={() => navigate('/solutions')} className="btn-outline">
              Shop Our Range
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {userOrders.map(order => renderOrderCard(order))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Orders;
