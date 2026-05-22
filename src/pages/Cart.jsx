import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import './Cart.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  out: { opacity: 0, y: -20, transition: { duration: 0.6 } }
};

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, currentUser } = useContext(AppContext);
  const navigate = useNavigate();

  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const delivery = subtotal > 500 || subtotal === 0 ? 0 : 50; // free delivery over 500
  const total = subtotal + tax + delivery;

  const handleCheckout = () => {
    if (!currentUser) {
      // Redirect to login but save the checkout redirect path
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
    } else {
      navigate('/checkout');
    }
  };

  if (cart.length === 0) {
    return (
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        className="cart-page-empty container"
      >
        <div className="empty-cart-content">
          <ShoppingBag size={48} className="empty-cart-icon" />
          <h2>Your Cart is Empty</h2>
          <p>You haven't added any therapies to your cart yet.</p>
          <Link to="/solutions" className="btn-primary">
            Explore Solutions
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="cart-page container"
    >
      <h1 className="cart-title">Your Shopping Cart</h1>

      <div className="cart-layout">
        {/* Left Side: Items list */}
        <div className="cart-items-list">
          {cart.map((item) => (
            <div key={item.product.id} className="cart-item-card">
              <div 
                className="cart-item-img" 
                style={{ backgroundImage: `url("${item.product.image}")` }}
              ></div>
              <div className="cart-item-details">
                <div className="item-header">
                  <h3>{item.product.title}</h3>
                  <button 
                    className="btn-remove"
                    onClick={() => removeFromCart(item.product.id)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <p className="item-price">₹{item.product.price}</p>
                <div className="item-controls">
                  <div className="qty-controls">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                      <Minus size={14} />
                    </button>
                    <input type="text" value={item.quantity} readOnly />
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="item-subtotal">
                    Subtotal: <span>₹{item.product.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Price Summary */}
        <div className="cart-summary-card">
          <h2>Order Summary</h2>
          <div className="summary-rows">
            <div className="summary-row">
              <span>Subtotal ({cart.reduce((acc, curr) => acc + curr.quantity, 0)} items)</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="summary-row">
              <span>GST (18%)</span>
              <span>₹{tax}</span>
            </div>
            <div className="summary-row">
              <span>Shipping & Delivery</span>
              <span>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span>
            </div>
            {delivery > 0 && (
              <p className="shipping-hint">Add items worth ₹{500 - subtotal} more for FREE shipping</p>
            )}
            <div className="summary-total-row">
              <span>Estimated Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <button 
            className="btn-primary checkout-btn"
            onClick={handleCheckout}
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={16} />
          </button>
          
          <div className="cart-safety-note">
            <p>Secure checkouts with standard encryption.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
