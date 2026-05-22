import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './Solutions.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  out: { opacity: 0, y: -20, transition: { duration: 0.6 } }
};

const Solutions = () => {
  const { products } = useContext(AppContext);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="solutions-page"
    >
      {/* Page Header */}
      <section className="solutions-header container">
        <h1 className="solutions-title">Our Solutions</h1>
        <p className="solutions-subtitle">
          Ayurvedic anti-hair-fall therapies tailored for stronger, healthier hair.
        </p>
      </section>

      {/* Solutions Grid */}
      <section className="solutions-grid-section container">
        <div className="solutions-grid">
          {products.map((prod) => (
            <div key={prod.id} className="solution-card ui-card">
              <div className="solution-image">
                <div 
                  className="img-bg" 
                  style={{ backgroundImage: `url("${prod.image}")` }}
                ></div>
              </div>
              <div className="solution-content">
                {prod.id === 'women' && <span className="badge-best">Bestseller</span>}
                {prod.id === 'combo' && <span className="badge-value">Best Value</span>}
                {!prod.isDefault && <span className="badge-value" style={{ backgroundColor: '#006857' }}>Custom Remedy</span>}
                <h3>{prod.title}</h3>
                <p className="price">₹{prod.price}</p>
                <p className="desc">{prod.desc}</p>
                <div className="solution-actions">
                  <Link to={`/product/${prod.id}`} className="btn-primary">View Details &rarr;</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Solutions;

