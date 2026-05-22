import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ProductDetails.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  out: { opacity: 0, y: -20, transition: { duration: 0.6 } }
};

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Description');

  // Dummy product data mapping based on ID
  const products = {
    men: {
      title: "Men Anti-Hairfall Therapy",
      price: "499",
      rating: "4.8",
      desc: "A powerful Ayurvedic duo designed to reduce hair fall, strengthen roots, and promote natural hair growth for men.",
      features: [
        "Strengthens hair roots",
        "Reduces hair fall & breakage",
        "Nourishes scalp & prevents dandruff",
        "Made with Ayurvedic actives",
        "Suitable for all hair types"
      ],
      image: "/assets/Men Anti-Hairfall Therapy/Men Hero Image.png" // Placeholder
    },
    women: {
      title: "Women Anti-Hairfall Therapy",
      price: "599",
      rating: "4.8",
      desc: "A powerful Ayurvedic oil crafted to reduce hair fall, nourish the scalp, and promote natural hair growth for women.",
      features: [
        "Strengthens hair roots",
        "Reduces hair fall & breakage",
        "Nourishes scalp & improves hair texture",
        "Made with Ayurvedic actives",
        "Suitable for all hair types"
      ],
      image: "/assets/Women Anti-HairFall Therapy Combo Pack/Women Anti-Hairfall Therapy.png"
    },
    combo: {
      title: "Men Anti-Hairfall Combo",
      price: "799",
      rating: "4.8",
      desc: "The perfect Ayurvedic combo for complete hair care. Cleanses, nourishes, and strengthens for visibly thicker, healthier hair.",
      features: [
        "Strengthens hair roots",
        "Reduces hair fall & breakage",
        "Nourishes scalp & prevents dandruff",
        "Made with Ayurvedic actives",
        "Suitable for all hair types"
      ],
      image: "/assets/Women Anti-HairFall Therapy Combo Pack/Men Anti-Hairfall Therapy Combo .png"
    }
  };

  const product = products[id] || products.combo;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
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
        <Link to="/">Home</Link> &gt; <Link to="/shop">Shop</Link> &gt; <span>{product.title}</span>
      </div>

      <section className="product-main container">
        {/* Left Gallery */}
        <div className="product-gallery">
          <div className="thumbnails">
            <button className="nav-btn">^</button>
            <div className="thumb active" style={{backgroundImage: `url("${product.image}")`}}></div>
            <div className="thumb"></div>
            <div className="thumb"></div>
            <div className="thumb"></div>
            <div className="thumb"></div>
            <button className="nav-btn">v</button>
          </div>
          <div className="main-image">
            <div className="img-view" style={{backgroundImage: `url("${product.image}")`}}></div>
            <button className="zoom-btn">🔍 Zoom</button>
          </div>
        </div>

        {/* Right Info */}
        <div className="product-info">
          <h1>{product.title}</h1>
          <div className="price">₹{product.price}</div>
          
          <div className="rating-badge">
            <span className="star-rating">{product.rating} ★</span>
            <span className="rating-text">on Amazon & Flipkart</span>
            <span className="rating-icons">a f</span>
          </div>

          <p className="product-desc">{product.desc}</p>

          <ul className="product-features">
            {product.features.map((feat, idx) => (
              <li key={idx}><span className="check">✓</span> {feat}</li>
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
            <button className="btn-add-cart">🛒 Add to Cart</button>
            <button className="btn-buy-now">⚡ Buy Now</button>
          </div>

          <div className="trust-badges-product">
            <div className="t-badge">
              <div className="icon">💳</div>
              <span>Razorpay<br/>Secure Payments</span>
            </div>
            <div className="t-badge">
              <div className="icon">💵</div>
              <span>COD<br/>Available</span>
            </div>
            <div className="t-badge">
              <div className="icon">📦</div>
              <span>Shiprocket<br/>Shipping</span>
            </div>
            <div className="t-badge">
              <div className="icon">📄</div>
              <span>GST Invoice<br/>Available</span>
            </div>
          </div>
          <div className="trusted-by">
            <span style={{color: '#4CAF50'}}>✓</span> Trusted by 10,000+ customers across India
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
              {tab === 'Description' && '📄 '}
              {tab === 'Benefits' && '✨ '}
              {tab === 'Ingredients' && '🌿 '}
              {tab === 'How to Use' && '⏲️ '}
              {tab === 'Shipping & COD' && '🚚 '}
              {tab === 'FAQ' && '❓ '}
              {tab}
            </button>
          ))}
        </div>
        <div className="tab-content">
          <div className="desc-left">
            <p>
              The {product.title} combo includes Anti-Hairfall Shampoo (100ml) and Men Hair Oil (100ml), formulated with powerful Ayurvedic herbs and natural actives.
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
              <div className="b-item"><span className="icon">🌿</span> Ayurvedic & Natural</div>
              <div className="b-item"><span className="icon">🚫</span> Paraben Free</div>
              <div className="b-item"><span className="icon">🚫</span> Sulfate Free</div>
              <div className="b-item"><span className="icon">🚫</span> Silicone Free</div>
              <div className="b-item"><span className="icon">🐰</span> Cruelty Free</div>
              <div className="b-item"><span className="icon">👨</span> For All Hair Types</div>
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
            <Link to="/product/women" className="btn-primary" style={{width: '100%', justifyContent: 'center'}}>Add to Cart</Link>
          </div>
          <div className="r-product-card">
            <div className="r-img" style={{backgroundImage: 'url("/assets/Women%20Anti-HairFall%20Therapy%20Combo%20Pack/Men%20Anti-Hairfall%20Therapy%20Combo%20.png")'}}></div>
            <h4>Men Anti-Hairfall Combo</h4>
            <p className="price">₹799</p>
            <Link to="/product/combo" className="btn-primary" style={{width: '100%', justifyContent: 'center'}}>Add to Cart</Link>
          </div>
          <div className="r-product-card">
            <div className="r-img" style={{backgroundImage: 'url("/assets/Women%20Anti-HairFall%20Therapy%20Combo%20Pack/Women%20Anti-Hairfall%20Therapy.png")'}}></div>
            <h4>Women Anti-Hairfall Combo</h4>
            <p className="price">₹899</p>
            <Link to="/product/combo" className="btn-primary" style={{width: '100%', justifyContent: 'center'}}>Add to Cart</Link>
          </div>
          <button className="carousel-nav">&gt;</button>
        </div>
      </section>
    </motion.div>
  );
};

export default ProductDetails;
