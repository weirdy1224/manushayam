import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Truck, CheckCircle, ShieldAlert, ArrowLeft } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import './Checkout.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  out: { opacity: 0, y: -20, transition: { duration: 0.6 } }
};

const Checkout = () => {
  const { cart, placeOrder, currentUser } = useContext(AppContext);
  const navigate = useNavigate();

  // Form Fields
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('razorpay'); // 'razorpay' or 'cod'

  // Processing States
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState('');

  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const delivery = subtotal > 500 ? 0 : 50; // free delivery over 500
  const total = subtotal + tax + delivery;

  // React to empty cart
  React.useEffect(() => {
    if (cart.length === 0 && !isProcessing && !orderPlaced) {
      navigate('/cart');
    }
  }, [cart, navigate, isProcessing, orderPlaced]);

  // Load Razorpay Script helper (defined but commented out in actual integration call)
  /*
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  */

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !phone || !address || !city || !state || !pincode) {
      setError('Please fill in all shipping details.');
      return;
    }

    const shippingDetails = { name, phone, address, city, state, pincode };
    setIsProcessing(true);

    if (paymentMethod === 'razorpay') {
      // DUMMY CHECKOUT PROCESSING (Simulating Razorpay network delay)
      // The following block mimics the async script loading and transaction processing.
      try {
        /*
        // ------------------ ACTUAL RAZORPAY INTEGRATION CODE (Commented Out) ------------------
        const res = await loadRazorpayScript();
        if (!res) {
          setError('Failed to load Razorpay SDK. Check your internet connection.');
          setIsProcessing(false);
          return;
        }

        // Razorpay Options
        const options = {
          key: 'YOUR_RAZORPAY_KEY_ID', // Enter your Key ID from dashboard
          amount: total * 100, // Amount in paisa
          currency: 'INR',
          name: 'ManushyaM Wellness',
          description: 'Ayurvedic Therapy order payment',
          image: '/assets/Logo.png',
          handler: function (response) {
            // Payment success callback
            // response.razorpay_payment_id
            // response.razorpay_order_id
            // response.razorpay_signature
            
            const confirmedOrder = placeOrder(shippingDetails, 'Razorpay Secure');
            setIsProcessing(false);
            navigate('/orders', { state: { newOrder: confirmedOrder } });
          },
          prefill: {
            name: name,
            email: currentUser ? currentUser.email : 'guest@manushayam.com',
            contact: phone
          },
          theme: {
            color: '#c69c6d'
          },
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
            }
          }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        // ------------------ END OF RAZORPAY INTEGRATION CODE ------------------
        */

        // --- MOCK CHECKOUT RUNNING (Dummy API) ---
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulating network latency
        const confirmedOrder = await placeOrder(shippingDetails, 'Razorpay Secure (Mock)');
        setOrderPlaced(true);
        setIsProcessing(false);
        navigate('/orders', { state: { newOrder: confirmedOrder } });

      } catch (err) {
        setError('Payment processing encountered an error.');
        setIsProcessing(false);
      }
    } else {
      // Cash on Delivery Checkout
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const confirmedOrder = await placeOrder(shippingDetails, 'Cash on Delivery');
        setOrderPlaced(true);
        setIsProcessing(false);
        navigate('/orders', { state: { newOrder: confirmedOrder } });
      } catch (err) {
        setError('Order placement encountered an error.');
        setIsProcessing(false);
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="checkout-page container"
    >
      <div className="checkout-back-link">
        <button onClick={() => navigate('/cart')} className="btn-back">
          <ArrowLeft size={16} />
          <span>Back to Cart</span>
        </button>
      </div>

      <h1 className="checkout-title">Secure Checkout</h1>

      {error && (
        <div className="checkout-alert error-alert">
          <ShieldAlert size={18} />
          <span>{error}</span>
        </div>
      )}

      <div className="checkout-layout">
        {/* Left Side: Shipping Form */}
        <form className="checkout-shipping-form" onSubmit={handlePlaceOrder}>
          <h2>Shipping Information</h2>
          
          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="ship-name">Full Name *</label>
              <input 
                type="text" 
                id="ship-name"
                placeholder="Receiver Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                disabled={isProcessing}
              />
            </div>
            <div className="form-group">
              <label htmlFor="ship-phone">Phone Number *</label>
              <input 
                type="tel" 
                id="ship-phone"
                placeholder="10-digit mobile number" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                required 
                disabled={isProcessing}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="ship-address">Street Address *</label>
            <input 
              type="text" 
              id="ship-address"
              placeholder="House, Apartment, Suite, Street name" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              required 
              disabled={isProcessing}
            />
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="ship-city">City *</label>
              <input 
                type="text" 
                id="ship-city"
                placeholder="City" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                required 
                disabled={isProcessing}
              />
            </div>
            <div className="form-group">
              <label htmlFor="ship-state">State *</label>
              <input 
                type="text" 
                id="ship-state"
                placeholder="State" 
                value={state} 
                onChange={(e) => setState(e.target.value)} 
                required 
                disabled={isProcessing}
              />
            </div>
            <div className="form-group">
              <label htmlFor="ship-pincode">Pincode *</label>
              <input 
                type="text" 
                id="ship-pincode"
                placeholder="6-digit pincode" 
                value={pincode} 
                onChange={(e) => setPincode(e.target.value)} 
                required 
                disabled={isProcessing}
              />
            </div>
          </div>

          <div className="payment-method-section">
            <h2>Payment Method</h2>
            <div className="payment-options">
              <label className={`payment-label ${paymentMethod === 'razorpay' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="razorpay" 
                  checked={paymentMethod === 'razorpay'} 
                  onChange={() => setPaymentMethod('razorpay')}
                  disabled={isProcessing}
                />
                <CreditCard size={20} className="payment-icon" />
                <div className="payment-desc">
                  <strong>Razorpay Secure Payments</strong>
                  <span>UPI, Cards, Net Banking</span>
                </div>
              </label>

              <label className={`payment-label ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="cod" 
                  checked={paymentMethod === 'cod'} 
                  onChange={() => setPaymentMethod('cod')}
                  disabled={isProcessing}
                />
                <Truck size={20} className="payment-icon" />
                <div className="payment-desc">
                  <strong>Cash on Delivery (COD)</strong>
                  <span>Pay upon physical delivery</span>
                </div>
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary place-order-btn" 
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing Transaction...' : `Pay ₹${total} & Place Order`}
          </button>
        </form>

        {/* Right Side: Order Summary Card */}
        <div className="checkout-summary-card">
          <h2>Order Summary</h2>
          <div className="checkout-items">
            {cart.map((item) => (
              <div key={item.product.id} className="checkout-item-row">
                <div className="item-info">
                  <span className="item-title">{item.product.title}</span>
                  <span className="item-qty">Qty: {item.quantity}</span>
                </div>
                <span className="item-subtotal">₹{item.product.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="summary-calculations">
            <div className="calc-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="calc-row">
              <span>GST (18%)</span>
              <span>₹{tax}</span>
            </div>
            <div className="calc-row">
              <span>Shipping & Delivery</span>
              <span>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span>
            </div>
            <div className="calc-total-row">
              <span>Grand Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <div className="checkout-trust-points">
            <div className="t-point">
              <CheckCircle size={16} />
              <span>Razorpay encrypted payment protection.</span>
            </div>
            <div className="t-point">
              <CheckCircle size={16} />
              <span>Track orders live after dispatch.</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
