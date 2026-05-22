import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X, Truck, CreditCard, ShieldCheck, Package } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { cart, currentUser, logout } = useContext(AppContext);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleProfileClick = () => {
    closeMobileMenu();
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="navbar-wrapper">
      {/* Top Banner */}
      <div className="top-banner">
        <div className="banner-item">
          <Truck size={14} className="banner-icon" />
          <span>Free Shipping on all orders</span>
        </div>
        <div className="banner-separator">|</div>
        <div className="banner-item">
          <CreditCard size={14} className="banner-icon" />
          <span>COD Available</span>
        </div>
        <div className="banner-separator">|</div>
        <div className="banner-item">
          <ShieldCheck size={14} className="banner-icon" />
          <span>Razorpay Secure Payments</span>
        </div>
        <div className="banner-separator">|</div>
        <div className="banner-item">
          <Package size={14} className="banner-icon" />
          <span>Shiprocket Shipping</span>
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
              Solutions
            </Link>
          </li>
          <li>
            <Link to="/how-it-works" className={path === '/how-it-works' ? 'active' : ''} onClick={closeMobileMenu}>Ingredients</Link>
          </li>
          <li>
            <Link to="/blogs" className={path === '/blogs' ? 'active' : ''} onClick={closeMobileMenu}>Blogs & Reviews</Link>
          </li>
          <li>
            <Link to="/faq" className={path === '/faq' ? 'active' : ''} onClick={closeMobileMenu}>FAQ</Link>
          </li>
          <li>
            <Link to="/contact" className={path === '/contact' ? 'active' : ''} onClick={closeMobileMenu}>Contact Us</Link>
          </li>
        </ul>

        <div className="nav-icons">
          <button className="icon-btn" aria-label="Search">
            <Search size={20} />
          </button>
          <div 
            className="nav-profile-container"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="icon-btn" onClick={handleProfileClick} aria-label="Account">
              <User size={20} className={currentUser ? 'logged-in-user-icon' : ''} />
            </button>
            {isDropdownOpen && (
              <div className="profile-dropdown">
                {currentUser ? (
                  <>
                    <div className="dropdown-header">
                      <p className="user-name">{currentUser.name}</p>
                      <p className="user-email">{currentUser.email}</p>
                      <span className="role-tag">{currentUser.role === 'admin' ? 'Admin' : 'Customer'}</span>
                    </div>
                    <div className="dropdown-divider"></div>
                    {currentUser.role === 'admin' ? (
                      <Link to="/admin" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                        Admin Panel
                      </Link>
                    ) : (
                      <Link to="/orders" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                        My Orders
                      </Link>
                    )}
                    <button 
                      className="dropdown-item logout-action-btn" 
                      onClick={() => {
                        logout();
                        setIsDropdownOpen(false);
                        navigate('/login');
                      }}
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                      Sign In
                    </Link>
                    <Link to="/login" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
          <button className="icon-btn cart-btn" onClick={() => { closeMobileMenu(); navigate('/cart'); }} aria-label="Cart">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
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


