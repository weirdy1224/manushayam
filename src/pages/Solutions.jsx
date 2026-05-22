import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Solutions.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  out: { opacity: 0, y: -20, transition: { duration: 0.6 } }
};

const Solutions = () => {
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
          {/* Men Therapy */}
          <div className="solution-card ui-card">
            <div className="solution-image">
              <div 
                className="img-bg" 
                style={{ backgroundImage: 'url("/assets/Men Anti-Hairfall Therapy/Men Hero Image.png")' }}
              ></div>
            </div>
            <div className="solution-content">
              <h3>Men Anti-Hairfall Therapy</h3>
              <p className="price">₹499</p>
              <p className="desc">
                A powerful Ayurvedic duo designed to reduce hair fall, strengthen roots, and promote natural hair growth for men.
              </p>
              <div className="solution-actions">
                <Link to="/product/men" className="btn-primary">View Details &rarr;</Link>
              </div>
            </div>
          </div>

          {/* Women Therapy */}
          <div className="solution-card ui-card">
            <div className="solution-image">
              <div 
                className="img-bg" 
                style={{ backgroundImage: 'url("/assets/Women Anti-HairFall Therapy Combo Pack/Women Anti-Hairfall Therapy.png")' }}
              ></div>
            </div>
            <div className="solution-content">
              <span className="badge-best">Bestseller</span>
              <h3>Women Anti-Hairfall Therapy</h3>
              <p className="price">₹599</p>
              <p className="desc">
                A powerful Ayurvedic oil crafted to reduce hair fall, nourish the scalp, and promote natural hair growth for women.
              </p>
              <div className="solution-actions">
                <Link to="/product/women" className="btn-primary">View Details &rarr;</Link>
              </div>
            </div>
          </div>

          {/* Combo */}
          <div className="solution-card ui-card">
            <div className="solution-image">
              <div 
                className="img-bg" 
                style={{ backgroundImage: 'url("/assets/Women Anti-HairFall Therapy Combo Pack/Men Anti-Hairfall Therapy Combo .png")' }}
              ></div>
            </div>
            <div className="solution-content">
              <span className="badge-value">Best Value</span>
              <h3>Men Anti-Hairfall Combo</h3>
              <p className="price">₹799</p>
              <p className="desc">
                The perfect Ayurvedic combo for complete hair care. Cleanses, nourishes, and strengthens for visibly thicker, healthier hair.
              </p>
              <div className="solution-actions">
                <Link to="/product/combo" className="btn-primary">View Details &rarr;</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Solutions;
