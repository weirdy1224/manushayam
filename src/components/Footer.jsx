import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from "../../assets/Logo.png";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top container">
        <div className="footer-brand">
          <img src={logo} alt="ManushyaM Logo" style={{ height: '50px', marginBottom: '16px' }} />
          <p className="brand-desc">
            Ayurvedic anti-hairfall therapy for men and women. Rooted in ancient wisdom. Powered by nature.
          </p>
          <div className="social-icons">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="YouTube">YT</a>
            <a href="#" aria-label="Pinterest">PI</a>
          </div>
        </div>

        <div className="footer-links-group">
          <h4>Shop</h4>
          <ul>
            <li><Link to="/">All Products</Link></li>
            <li><Link to="/product/men">Men's Range</Link></li>
            <li><Link to="/product/women">Women's Range</Link></li>
            <li><Link to="/product/combo">Combos</Link></li>
            <li><Link to="/">Best Sellers</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4>Customer Care</h4>
          <ul>
            <li><Link to="/contact">FAQ</Link></li>
            <li><Link to="/">Shipping & Delivery</Link></li>
            <li><Link to="/">Returns & Refunds</Link></li>
            <li><Link to="/">Track Order</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About ManushyaM</Link></li>
            <li><Link to="/how-it-works">Our Ingredients</Link></li>
            <li><Link to="/blogs">Blogs & Reviews</Link></li>
            <li><Link to="/">Privacy Policy</Link></li>
            <li><Link to="/">Terms & Conditions</Link></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h4>Stay Connected</h4>
          <p>Subscribe for offers, tips & updates.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" />
            <button type="submit" className="btn-primary" style={{ padding: '10px 20px', borderRadius: '0 4px 4px 0' }}>Subscribe</button>
          </form>
          <div className="trust-badges">
            <div className="badge"><span style={{ color: 'var(--primary-gold)' }}>100%</span> Ayurvedic</div>
            <div className="badge">Made in India</div>
            <div className="badge">Cruelty Free</div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-content">
          <p>&copy; 2026 ManushyaM Wellness Pvt. Ltd. All rights reserved.</p>
          <div className="payment-methods">
            <span>VISA</span>
            <span>Mastercard</span>
            <span>RuPay</span>
            <span>UPI</span>
          </div>
          <p className="powered-by">Secure payments powered by <strong>Razorpay</strong></p>
        </div>
      </div>
      
      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/919876543210" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" width="30" height="30" />
      </a>
    </footer>
  );
};

export default Footer;
