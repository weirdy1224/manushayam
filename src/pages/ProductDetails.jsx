import React, { useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  ShoppingCart, 
  Zap, 
  CreditCard, 
  DollarSign, 
  Package, 
  FileText, 
  Check, 
  Sparkles, 
  Leaf, 
  Clock, 
  Truck, 
  HelpCircle, 
  Ban, 
  Heart, 
  User, 
  Star,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { AppContext } from '../context/AppContext';
import './ProductDetails.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  out: { opacity: 0, y: -20, transition: { duration: 0.6 } }
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Description');

  // Find product by id, fallback to combo
  const product = products.find(p => p.id === id) || products.find(p => p.id === 'combo') || products[0];

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCartClick = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  const handleBuyNowClick = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="product-page"
    >
      <div className="breadcrumb container">
        <Link to="/">Home</Link> &gt; <Link to="/solutions">Shop</Link> &gt; <span>{product.title}</span>
      </div>

      <section className="product-main container">
        {/* Left Gallery */}
        <div className="product-gallery">
          <div className="thumbnails">
            <button className="nav-btn"><ChevronUp size={16} /></button>
            <div className="thumb active" style={{backgroundImage: `url("${product.image}")`}}></div>
            <div className="thumb"></div>
            <div className="thumb"></div>
            <div className="thumb"></div>
            <div className="thumb"></div>
            <button className="nav-btn"><ChevronDown size={16} /></button>
          </div>
          <div className="main-image">
            <div className="img-view" style={{backgroundImage: `url("${product.image}")`}}></div>
            <button className="zoom-btn">
              <Search size={14} />
              <span>Zoom</span>
            </button>
          </div>
        </div>

        {/* Right Info */}
        <div className="product-info">
          <h1>{product.title}</h1>
          <div className="price">₹{product.price}</div>
          
          <div className="rating-badge">
            <span className="star-rating">
              {product.rating} <Star size={12} style={{ display: 'inline', fill: 'currentColor' }} />
            </span>
            <span className="rating-text">on Amazon & Flipkart</span>
          </div>

          <p className="product-desc">{product.desc}</p>

          <ul className="product-features">
            {(product.features || []).map((feat, idx) => (
              <li key={idx}>
                <Check size={14} className="check-icon-gold" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>

          <div className="quantity-selector">
            <span>Quantity:</span>
            <div className="qty-controls">
              <button onClick={handleDecrease}>-</button>
              <input type="text" value={quantity} readOnly />
              <button onClick={handleIncrease}>+</button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="btn-add-cart" onClick={handleAddToCartClick}>
              <ShoppingCart size={18} />
              <span>Add to Cart</span>
            </button>
            <button className="btn-buy-now" onClick={handleBuyNowClick}>
              <Zap size={18} />
              <span>Buy Now</span>
            </button>
          </div>

          <div className="trust-badges-product">
            <div className="t-badge">
              <div className="icon"><CreditCard size={20} /></div>
              <span>Razorpay<br/>Secure Payments</span>
            </div>
            <div className="t-badge">
              <div className="icon"><DollarSign size={20} /></div>
              <span>COD<br/>Available</span>
            </div>
            <div className="t-badge">
              <div className="icon"><Package size={20} /></div>
              <span>Shiprocket<br/>Shipping</span>
            </div>
            <div className="t-badge">
              <div className="icon"><FileText size={20} /></div>
              <span>GST Invoice<br/>Available</span>
            </div>
          </div>
          <div className="trusted-by">
            <Check size={14} className="trusted-check-green" /> 
            <span>Trusted by 10,000+ customers across India</span>
          </div>
        </div>
      </section>

      {/* Product Tabs */}
      <section className="product-tabs-section container">
        <div className="tabs-header">
          {['Description', 'Benefits', 'Ingredients', 'How to Use', 'Shipping & COD', 'FAQ'].map(tab => (
            <button 
              key={tab} 
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'Description' && <FileText size={14} style={{ marginRight: '6px' }} />}
              {tab === 'Benefits' && <Sparkles size={14} style={{ marginRight: '6px' }} />}
              {tab === 'Ingredients' && <Leaf size={14} style={{ marginRight: '6px' }} />}
              {tab === 'How to Use' && <Clock size={14} style={{ marginRight: '6px' }} />}
              {tab === 'Shipping & COD' && <Truck size={14} style={{ marginRight: '6px' }} />}
              {tab === 'FAQ' && <HelpCircle size={14} style={{ marginRight: '6px' }} />}
              <span>{tab}</span>
            </button>
          ))}
        </div>
        <div className="tab-content">
          <div className="desc-left">
            <p>
              The {product.title} therapy is formulated with powerful Ayurvedic herbs and natural actives to support scalp health and root viability.
            </p>
            <p>
              This potent combination helps reduce hair fall, strengthens roots, nourishes the scalp, and promotes healthy hair growth.
            </p>
            <p>
              Regular use leads to visibly stronger, thicker, and healthier hair.
            </p>
          </div>
          <div className="desc-right">
            <div className="badges-grid">
              <div className="b-item">
                <Leaf size={16} className="tab-badge-icon" /> 
                <span>Ayurvedic & Natural</span>
              </div>
              <div className="b-item">
                <Ban size={16} className="tab-badge-icon" /> 
                <span>Paraben Free</span>
              </div>
              <div className="b-item">
                <Ban size={16} className="tab-badge-icon" /> 
                <span>Sulfate Free</span>
              </div>
              <div className="b-item">
                <Ban size={16} className="tab-badge-icon" /> 
                <span>Silicone Free</span>
              </div>
              <div className="b-item">
                <Heart size={16} className="tab-badge-icon" /> 
                <span>Cruelty Free</span>
              </div>
              <div className="b-item">
                <User size={16} className="tab-badge-icon" /> 
                <span>For All Hair Types</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* You May Also Like */}
      <section className="related-products container section-padding">
        <div className="section-header">
          <span className="line"></span>
          <h2>You May Also Like</h2>
          <span className="line"></span>
        </div>
        
        <div className="related-carousel">
          <button className="carousel-nav">&lt;</button>
          <div className="r-product-card">
            <div className="r-img" style={{backgroundImage: 'url("/assets/Women%20Anti-HairFall%20Therapy%20Combo%20Pack/Women%20Anti-Hairfall%20Therapy.png")'}}></div>
            <h4>Women Anti-Hairfall Therapy</h4>
            <p className="price">₹599</p>
            <Link to="/product/women" className="btn-primary" style={{width: '100%', justifyContent: 'center'}}>View Details</Link>
          </div>
          <div className="r-product-card">
            <div className="r-img" style={{backgroundImage: 'url("/assets/Women%20Anti-HairFall%20Therapy%20Combo%20Pack/Men%20Anti-Hairfall%20Therapy%20Combo%20.png")'}}></div>
            <h4>Men Anti-Hairfall Combo</h4>
            <p className="price">₹799</p>
            <Link to="/product/combo" className="btn-primary" style={{width: '100%', justifyContent: 'center'}}>View Details</Link>
          </div>
          <div className="r-product-card">
            <div className="r-img" style={{backgroundImage: 'url("/assets/Women%20Anti-HairFall%20Therapy%20Combo%20Pack/Women%20Anti-Hairfall%20Therapy.png")'}}></div>
            <h4>Women Anti-Hairfall Combo</h4>
            <p className="price">₹899</p>
            <Link to="/product/combo" className="btn-primary" style={{width: '100%', justifyContent: 'center'}}>View Details</Link>
          </div>
          <button className="carousel-nav">&gt;</button>
        </div>
      </section>
    </motion.div>
  );
};

export default ProductDetails;
