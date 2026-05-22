import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="navbar-wrapper">
      {/* Top Banner */}
      <div className="top-banner">
        <div className="banner-item">
          <span>🚚</span> Free Shipping on all orders
        </div>
        <div className="banner-separator">|</div>
        <div className="banner-item">
          <span>💳</span> COD Available
        </div>
        <div className="banner-separator">|</div>
        <div className="banner-item">
          <span>🔒</span> Razorpay Secure Payments
        </div>
        <div className="banner-separator">|</div>
        <div className="banner-item">
          <span>📦</span> Shiprocket Shipping
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="main-navbar container">
        <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
          <img src="/assets/Logo.png" alt="ManushyaM Logo" style={{ height: '45px' }} />
        </Link>

        <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <li>
            <Link to="/" className={path === '/' ? 'active' : ''} onClick={closeMobileMenu}>Home</Link>
          </li>
          <li>
            <Link to="/about" className={path === '/about' ? 'active' : ''} onClick={closeMobileMenu}>About ManushyaM</Link>
          </li>
          <li className="dropdown">
            <Link to="/solutions" className={path.includes('/product') || path === '/solutions' ? 'active' : ''} onClick={closeMobileMenu}>
              Solutions <span className="dropdown-arrow">▾</span>
            </Link>
          </li>
          <li>
            <Link to="/how-it-works" className={path === '/how-it-works' ? 'active' : ''} onClick={closeMobileMenu}>Ingredients</Link>
          </li>
          <li>
            <Link to="/blogs" className={path === '/blogs' ? 'active' : ''} onClick={closeMobileMenu}>Blogs & Reviews</Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeMobileMenu}>FAQ</Link>
          </li>
          <li>
            <Link to="/contact" className={path === '/contact' ? 'active' : ''} onClick={closeMobileMenu}>Contact Us</Link>
          </li>
        </ul>

        <div className="nav-icons">
          <button className="icon-btn" aria-label="Search">
            <Search size={20} />
          </button>
          <button className="icon-btn" aria-label="Account">
            <User size={20} />
          </button>
          <button className="icon-btn cart-btn" aria-label="Cart">
            <ShoppingBag size={20} />
            <span className="cart-badge">0</span>
          </button>
          <button className="icon-btn mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Toggle Menu">
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

