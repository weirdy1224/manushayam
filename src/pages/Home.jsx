import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, Droplets, Sparkles, Shield, Clock, Smile } from 'lucide-react';
import './Home.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  out: { opacity: 0, y: -20, transition: { duration: 0.6 } }
};

const Home = () => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="home-page"
    >
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Rooted in<br />Ritual.
          </h1>
          <p className="hero-subtitle">
            Ayurvedic anti-hair-fall therapy<br />for stronger, healthier hair.
          </p>
          <Link to="/solutions" className="btn-hero">
            SHOP THERAPY &rarr;
          </Link>
          <div className="hero-link">
            <Link to="/about">OUR PHILOSOPHY</Link>
          </div>
        </div>
      </section>

      <div className="home-container">
        {/* Best Seller Section - Overlaps Hero */}
        <section className="bestseller-section overlapping-card">
          <div className="bestseller-image">
            <div className="img-placeholder" style={{backgroundImage: 'url("assets/Women Anti-HairFall Therapy Combo Pack/Women Anti-Hairfall Therapy.png")'}}></div>
          </div>
          <div className="bestseller-content">
            <span className="badge-text">BESTSELLER</span>
            <h2>Ayurvedic<br />Anti-Hair Fall<br />Therapy</h2>
            <p>
              Root-strengthening therapy that reduces hair fall and nourishes deeply from within.
            </p>
            <Link to="/product/combo" className="shop-now-link">
              SHOP NOW &rarr;
            </Link>
          </div>
        </section>

        {/* Features Row */}
        <section className="features-section ui-card">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon"><Leaf size={24} /></div>
              <h4>8 Medicinal Herbs</h4>
              <p>Potent & Pure</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><Droplets size={24} /></div>
              <h4>4 Nourishing Oils</h4>
              <p>Deeply Restorative</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><Sparkles size={24} /></div>
              <h4>Chemical Free</h4>
              <p>Safe & Gentle</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><Shield size={24} /></div>
              <h4>100% Ayurvedic</h4>
              <p>Rooted in Tradition</p>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="philosophy-section ui-card">
          <div className="philosophy-image">
            <div className="img-placeholder" style={{backgroundImage: 'url("/assets/dddd (1).png")'}}></div>
          </div>
          <div className="philosophy-content">
            <span className="badge-text">OUR PHILOSOPHY</span>
            <h2>Conscious. Creative. Caring.</h2>
            <p>
              We source ethically, blend mindfully and create therapies that honor your hair, your wellbeing and our planet.
            </p>
            <Link to="/about" className="learn-more-link">
              LEARN MORE &rarr;
            </Link>
          </div>
        </section>

        {/* Ritual Section */}
        <section className="ritual-section ui-card">
          <div className="ritual-title-wrapper">
            <span className="line"></span>
            <h3>THE MANUSHYAM RITUAL</h3>
            <span className="line"></span>
          </div>
          <div className="ritual-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-icon"><Droplets size={24} /></div>
              <div className="step-text">
                <h4>APPLY</h4>
                <p>Massage gently into scalp & roots.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-icon"><Clock size={24} /></div>
              <div className="step-text">
                <h4>NOURISH</h4>
                <p>Leave on for 30-60 minutes.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-icon"><Smile size={24} /></div>
              <div className="step-text">
                <h4>RINSE</h4>
                <p>Wash with a mild, natural cleanser.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="testimonial-section ui-card">
          <div className="quote-mark">"</div>
          <p className="testimonial-text">
            "After just a few weeks, my hair feels stronger, fall has reduced and the shine is incredible."
          </p>
          <div className="testimonial-author">
            <div className="stars">★★★★★</div>
            <h4>ANANYA S.</h4>
            <p>Verified Customer</p>
          </div>
        </section>

      </div>
    </motion.div>
  );
};

export default Home;
