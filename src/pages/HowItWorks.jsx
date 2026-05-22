import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './HowItWorks.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  out: { opacity: 0, y: -20, transition: { duration: 0.6 } }
};

const HowItWorks = () => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="how-it-works-page"
    >
      {/* Top Dark Banner */}
      <section className="hiw-banner container section-padding">
        <div className="hiw-banner-inner">
          <div className="hiw-banner-left">
            <h2>How<br/>ManushyaM&trade; Works</h2>
            <p>For reduced hair fall in just 1 oil shot.</p>
            <Link to="/product/combo" className="btn-primary">EXPLORE THE SCIENCE &rarr;</Link>
          </div>
          
          <div className="hiw-banner-steps">
            <div className="hiw-step">
              <div className="hiw-step-circle">1</div>
              <h4>Healthy Hair</h4>
              <p>Strong hair with optimal nutrition at the root.</p>
            </div>
            <div className="hiw-arrow">&rarr;</div>
            <div className="hiw-step">
              <div className="hiw-step-circle">2</div>
              <h4>Weak Hair Shaft</h4>
              <p>Nutrients deplete over time leading to weak, brittle hair.</p>
            </div>
            <div className="hiw-arrow">&rarr;</div>
            <div className="hiw-step">
              <div className="hiw-step-circle">3</div>
              <h4>Replenished Hair<br/>with ManushyaM&trade;</h4>
              <p>Bio-actives nourish deeply, strengthen from within and help reduce hair fall.</p>
            </div>
          </div>

          <div className="hiw-banner-right">
            <ul className="benefits-list">
              <li>
                <span className="benefit-icon">💧</span>
                <div>
                  <strong>Deep Nourishment</strong>
                  <p>Nourishes the root where it matters most.</p>
                </div>
              </li>
              <li>
                <span className="benefit-icon">💪</span>
                <div>
                  <strong>Strengthens from Within</strong>
                  <p>Strengthens hair from the root to the shaft.</p>
                </div>
              </li>
              <li>
                <span className="benefit-icon">📉</span>
                <div>
                  <strong>Reduces Hair Fall</strong>
                  <p>Helps reduce hair fall from the 3rd application.</p>
                </div>
              </li>
              <li>
                <span className="benefit-icon">🌿</span>
                <div>
                  <strong>Powered by Nature</strong>
                  <p>Unique blend of Ayurvedic bio-actives & natural oils.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* DHT Blocker Section */}
      <section className="dht-section container section-padding">
        <div className="dht-content">
          <div className="dht-left">
            <h2>DHT BLOCKER</h2>
            <h3>Adaptogenic support from Ginseng Root Extract</h3>
            <p className="dht-desc">
              Ginseng adaptogens help support the scalp's natural defense against DHT — promoting stronger-looking hair from the roots.
            </p>
            
            <div className="dht-features-grid">
              <div className="dht-feature">
                <div className="icon">🛡️</div>
                <h4>Helps reduce DHT stress on follicles</h4>
                <p>Supports the scalp's natural defense against DHT.</p>
              </div>
              <div className="dht-feature">
                <div className="icon">🌱</div>
                <h4>Supports stronger-looking roots</h4>
                <p>Helps nourish hair roots for resilience and strength.</p>
              </div>
              <div className="dht-feature">
                <div className="icon">💧</div>
                <h4>Promotes a healthier scalp environment</h4>
                <p>Helps maintain scalp balance for optimal hair conditions.</p>
              </div>
              <div className="dht-feature">
                <div className="icon">🌿</div>
                <h4>Adaptogenic botanical support for hair wellness</h4>
                <p>Ginseng adaptogens help the scalp adapt to daily stressors.</p>
              </div>
            </div>
          </div>
          
          <div className="dht-right">
            <div className="dht-diagram-card">
              <h4 className="diagram-title">HOW DHT AFFECTS HAIR FOLLICLES</h4>
              <div className="diagram-row">
                <div className="diagram-col">
                  <h5>BEFORE: DHT ATTACKS</h5>
                  {/* Diagram Placeholder */}
                  <div className="diagram-img" style={{backgroundColor: '#e8dec8', height: '200px'}}></div>
                  <p>DHT binds to follicles and can shrink the root, leading to weaker, thinner hair.</p>
                </div>
                <div className="diagram-arrow">&rarr;</div>
                <div className="diagram-col">
                  <h5>AFTER: DHT BLOCKED</h5>
                  {/* Diagram Placeholder */}
                  <div className="diagram-img" style={{backgroundColor: '#e8dec8', height: '200px'}}></div>
                  <p>Ginseng adaptogens help support natural protection against DHT, helping maintain healthier follicles.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Concern */}
      <section className="concern-section container section-padding">
        <div className="section-header">
          <span className="line"></span>
          <h2>Shop by Concern</h2>
          <span className="line"></span>
        </div>
        
        <div className="concern-grid">
          <div className="concern-card">
            <div className="icon">👨</div>
            <h4>Hair Fall<br/>For Men</h4>
            <p>Reduce hair fall & boost strength with Ayurvedic care for men.</p>
            <Link to="/product/men" className="btn-outline btn-full">SHOP NOW &rarr;</Link>
          </div>
          <div className="concern-card">
            <div className="icon">👩</div>
            <h4>Hair Fall<br/>For Women</h4>
            <p>Control hair fall & nourish naturally for stronger, healthier hair.</p>
            <Link to="/product/women" className="btn-outline btn-full">SHOP NOW &rarr;</Link>
          </div>
          <div className="concern-card">
            <div className="icon">🌱</div>
            <h4>Weak<br/>Roots</h4>
            <p>Strengthen roots & improve scalp health from within.</p>
            <Link to="/product/combo" className="btn-outline btn-full">SHOP NOW &rarr;</Link>
          </div>
          <div className="concern-card">
            <div className="icon">🍃</div>
            <h4>Thinning<br/>Hair</h4>
            <p>Improve density & reduce thinning with herbal actives.</p>
            <Link to="/product/combo" className="btn-outline btn-full">SHOP NOW &rarr;</Link>
          </div>
          <div className="concern-card">
            <div className="icon">❄️</div>
            <h4>Dandruff &<br/>Itchy Scalp</h4>
            <p>Soothe scalp irritation & fight dandruff effectively</p>
            <Link to="/product/combo" className="btn-outline btn-full">SHOP NOW &rarr;</Link>
          </div>
          <div className="concern-card">
            <div className="icon">🧴</div>
            <h4>Complete Hair<br/>Fall Routine</h4>
            <p>Complete Ayurvedic routine for total hair care.</p>
            <Link to="/product/combo" className="btn-outline btn-full">SHOP NOW &rarr;</Link>
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="ingredients-section container section-padding">
        <div className="section-header">
          <span className="line"></span>
          <h2>Ingredients for Reduced Hair Fall</h2>
          <span className="line"></span>
        </div>
        
        <div className="ingredients-layout">
          <div className="ingredients-left">
            <h4 className="sub-title">3 Powerful Extracts</h4>
            <div className="extracts-grid">
              <div className="ingredient-item">
                <div className="ing-img-placeholder"></div>
                <h5>Korean<br/>Ginseng Extract</h5>
                <p>The best alternative to DHT blocker comes from Ginseng.</p>
              </div>
              <div className="ingredient-item">
                <div className="ing-img-placeholder"></div>
                <h5>Indian<br/>Bhringaraj Extract</h5>
                <p>Eclipta/bhringaraj improves circulation to the scalp, with anti-inflammatory properties.</p>
              </div>
              <div className="ingredient-item">
                <div className="ing-img-placeholder"></div>
                <h5>Curcumin Extracts</h5>
                <p>Curcumin (haldi) extracts nourish the hair and act as synergistic for thicker, shinier hair.</p>
              </div>
            </div>
          </div>
          
          <div className="ingredients-right">
            <h4 className="sub-title">4 Nourishing Oils</h4>
            <div className="oils-grid">
              <div className="ingredient-item inline">
                <div className="ing-img-placeholder small"></div>
                <h5>Jojoba Oil</h5>
              </div>
              <div className="ingredient-item inline">
                <div className="ing-img-placeholder small"></div>
                <h5>Tea Tree Oil</h5>
              </div>
              <div className="ingredient-item inline">
                <div className="ing-img-placeholder small"></div>
                <h5>Peppermint Oil</h5>
              </div>
              <div className="ingredient-item inline">
                <div className="ing-img-placeholder small"></div>
                <h5>Sesame<br/>Seed Oil</h5>
              </div>
            </div>
          </div>
        </div>
        
        <div className="support-ingredients">
          <h4 className="sub-title center">Key Support Ingredients</h4>
          <div className="support-grid">
            {/* Added 5 support ingredients based on UI */}
            <div className="support-item">
              <div className="icon">🧅</div>
              <div className="text">
                <h5>Onion Seed</h5>
                <p>Rich in sulphur & flavonoids, help strengthen roots and reduce hair fall.</p>
              </div>
            </div>
            <div className="support-item">
              <div className="icon">🌺</div>
              <div className="text">
                <h5>Bakuchiol</h5>
                <p>Retinol alternative that supports stronger roots and healthy scalp.</p>
              </div>
            </div>
            <div className="support-item">
              <div className="icon">🧬</div>
              <div className="text">
                <h5>Biotin</h5>
                <p>Supports keratin production for stronger hair.</p>
              </div>
            </div>
            <div className="support-item">
              <div className="icon">☀️</div>
              <div className="text">
                <h5>Vitamin D</h5>
                <p>Supports healthy hair follicles & improves hair cycle.</p>
              </div>
            </div>
            <div className="support-item">
              <div className="icon">🌰</div>
              <div className="text">
                <h5>Pumpkin Seed Extract</h5>
                <p>Rich in nutrients that support scalp health and hair strength.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default HowItWorks;
