import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, Droplets, Sparkles, Globe, Check } from 'lucide-react';
import './About.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  out: { opacity: 0, y: -20, transition: { duration: 0.6 } }
};

const About = () => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="about-page"
    >
      {/* Intro Section */}
      <section className="about-intro-section container section-padding">
        <div className="about-intro-card">
          <div className="intro-content">
            <div className="icon-decorator">✧</div>
            <span className="badge-text">OUR PHILOSOPHY</span>
            <h2>About ManushyaM</h2>
            <div className="icon-decorator-small">✧</div>
            <p>
              ManushyaM is curatively prepared using a 5000-year-old KASHAYAM Ayurvedic process.
              We offer the purest, natural solution that aims to enhance yourself, encouraging you to
              embrace a radiant and healthier you.
            </p>
            <div className="btn-group">
              <Link to="/product/men" className="btn-primary">Shop Men &rarr;</Link>
              <Link to="/product/women" className="btn-primary">Shop Women &rarr;</Link>
            </div>
          </div>
          <div className="intro-image">
            <div className="img-placeholder" style={{backgroundImage: 'url("/assets/Women%20Anti-HairFall%20Therapy%20Combo%20Pack/Women%20Anti-Hairfall%20Therapy.png")'}}></div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story-section container">
        <div className="story-card">
          <div className="story-image">
            <div className="img-placeholder" style={{backgroundImage: 'url("/assets/Women%20Anti-HairFall%20Therapy%20Combo%20Pack/Women%20Anti-Hairfall%20Therapy.png")'}}></div>
          </div>
          <div className="story-content">
            <span className="badge-text">OUR STORY</span>
            <h2>Rooted in Ayurveda.<br/>Inspired by Nature.</h2>
            <div className="icon-decorator-small">✧</div>
            <p>
              ManushyaM is born from the timeless wisdom of Ayurveda and a deep respect for nature's intelligence. Our journey began with a simple belief—that true care nurtures from the root.
            </p>
            <p>
              We blend ancient knowledge with modern understanding to craft therapies that honor your hair, your wellbeing, and our planet. Every formula is a tribute to mindful living, sustainable choices, and generations of holistic healing.
            </p>
          </div>
        </div>
      </section>

      {/* Why ManushyaM Section */}
      <section className="why-section container section-padding">
        <div className="why-header">
          <span className="line"></span>
          <span className="badge-text" style={{margin: 0}}>WHY MANUSHYAM</span>
          <span className="line"></span>
        </div>
        
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon"><Leaf size={24} /></div>
            <h4>Rooted in Ayurveda</h4>
            <p>Inspired by ancient wisdom, proven by time.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><Leaf size={24} /></div>
            <h4>Pure Ingredients</h4>
            <p>Handpicked herbs and nourishing oils of the highest quality.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><Droplets size={24} /></div>
            <h4>Mindful Formulation</h4>
            <p>Crafted in small batches with care and intention.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><Sparkles size={24} /></div>
            <h4>Scalp & Hair Wellbeing</h4>
            <p>Therapies that nurture balance, strength and natural beauty.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><Globe size={24} /></div>
            <h4>Conscious & Caring</h4>
            <p>We blend tradition with thoughtful innovation.</p>
          </div>
        </div>
      </section>

      {/* Promise Section */}
      <section className="promise-section container">
        <div className="promise-card">
          <div className="promise-content">
            <span className="badge-text">OUR PROMISE</span>
            <h2>Conscious. Creative. Caring.</h2>
            <div className="icon-decorator-small">✧</div>
            <p>
              We source ethically, blend mindfully and create therapies that honor your hair, your wellbeing and our planet.
            </p>
            <ul className="promise-list">
              <li>
                <Check size={14} className="check-icon-gold" style={{ display: 'inline', marginRight: '8px' }} />
                <span>Ethically sourced ingredients</span>
              </li>
              <li>
                <Check size={14} className="check-icon-gold" style={{ display: 'inline', marginRight: '8px' }} />
                <span>Sustainable & eco-friendly practices</span>
              </li>
              <li>
                <Check size={14} className="check-icon-gold" style={{ display: 'inline', marginRight: '8px' }} />
                <span>Transparent & honest formulations</span>
              </li>
              <li>
                <Check size={14} className="check-icon-gold" style={{ display: 'inline', marginRight: '8px' }} />
                <span>Care - for you, your hair and our planet</span>
              </li>
            </ul>
          </div>
          <div className="promise-image">
            <div className="img-placeholder" style={{backgroundImage: 'url("/assets/Anti-HairFall%20Shampoo/ChatGPT%20Image%20May%203,%202026,%2011_01_51%20AM%20(8).png")'}}></div>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="bottom-banner-section">
        <div className="container banner-text">
          <p>At ManushyaM, we don't just create therapies.</p>
          <h3>We preserve a legacy of healing, and share it with you.</h3>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
