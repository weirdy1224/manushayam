import React from 'react';
import { motion } from 'framer-motion';
import './BlogsReviews.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  out: { opacity: 0, y: -20, transition: { duration: 0.6 } }
};

const BlogsReviews = () => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="blogs-page"
    >
      {/* Top Banner */}
      <section className="blogs-banner container section-padding">
        <div className="blogs-banner-content">
          <h1>Blogs & Reviews</h1>
          <p className="subtitle">Ayurvedic wisdom, real results.</p>
          <p className="desc">Expert advice, honest reviews, and time-tested rituals for stronger, healthier hair.</p>
          
          <div className="rating-badge-large">
            <span className="star-rating">4.8 ★</span>
            <span className="rating-text">on Amazon & Flipkart</span>
            <span className="rating-icons">a f</span>
          </div>

          <div className="banner-features">
            <div className="b-feature">
              <span className="icon">🌿</span>
              <p>Ayurvedic<br/>Time-Tested</p>
            </div>
            <div className="b-feature">
              <span className="icon">🌳</span>
              <p>Backed by<br/>Ayurveda</p>
            </div>
            <div className="b-feature">
              <span className="icon">👥</span>
              <p>Real People<br/>Real Results</p>
            </div>
            <div className="b-feature">
              <span className="icon">⚖️</span>
              <p>Honest<br/>& Helpful</p>
            </div>
          </div>
        </div>
        <div className="blogs-banner-image">
           {/* Placeholder for the products on towels image */}
           <div className="img-placeholder" style={{backgroundImage: 'url("/assets/Men%20Anti-Hairfall%20Therapy/ChatGPT%20Image%20May%203,%202026,%2011_01_51%20AM%20(6).png")'}}></div>
        </div>
      </section>

      <div className="container blogs-layout">
        {/* Sidebar */}
        <aside className="blogs-sidebar">
          <div className="sidebar-widget">
            <h3>Categories</h3>
            <ul className="category-list">
              <li><a href="#" className="active">All Articles</a></li>
              <li><a href="#">Hair Fall Guide</a></li>
              <li><a href="#">Men's Hair Care</a></li>
              <li><a href="#">Women's Hair Care</a></li>
              <li><a href="#">Ayurveda & Ingredients</a></li>
              <li><a href="#">Product Education</a></li>
              <li><a href="#">Lifestyle & Wellness</a></li>
            </ul>
          </div>

          <div className="sidebar-widget widget-stay-updated">
            <h3>Stay Updated</h3>
            <p>Get Ayurvedic tips, new articles & offers.</p>
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" />
              <button type="submit" className="btn-primary">Subscribe</button>
            </form>
            <div className="badges-mini">
              <div className="badge">100% Ayurvedic</div>
              <div className="badge">Made in India</div>
              <div className="badge">Cruelty Free</div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="blogs-main">
          {/* Featured Article */}
          <div className="section-header-small">
            <span className="line"></span>
            <h2>Featured Article</h2>
            <span className="line"></span>
          </div>

          <div className="featured-card">
            <div className="f-image" style={{backgroundImage: 'url("/assets/Women%20Anti-HairFall%20Therapy%20Combo%20Pack/Women%20Anti-Hairfall%20Therapy.png")'}}></div>
            <div className="f-content">
              <span className="category-tag">HAIR FALL GUIDE</span>
              <h3>Why Hair Fall Happens in Men and Women After 21</h3>
              <p>Understand the root causes of hair fall after 21 and how Ayurveda helps restore balance from within for long-term hair health.</p>
              <div className="author-meta">
                <div className="author-avatar">M</div>
                <div>
                  <strong>ManushyaM Ayurveda Team</strong>
                  <span>May 20, 2026 • 6 min read</span>
                </div>
              </div>
              <button className="btn-read-more">Read More &rarr;</button>
            </div>
          </div>

          {/* All Articles */}
          <div className="section-header-small">
            <span className="line"></span>
            <h2>All Articles</h2>
            <span className="line"></span>
          </div>

          <div className="articles-grid">
            <div className="article-card">
              <div className="a-image" style={{backgroundImage: 'url("/assets/Men Anti-Hairfall Therapy/Men Hero Image.png")'}}></div>
              <div className="a-content">
                <span className="category-tag">HAIR FALL GUIDE</span>
                <h4>Why Hair Fall Happens in Men and Women After 21</h4>
                <p>Explain the top causes of hair fall after 21 and Ayurvedic solutions that address the root.</p>
                <div className="a-meta">
                  <span>May 20, 2026 • 6 min read</span>
                </div>
                <button className="btn-outline-small">Read More &rarr;</button>
              </div>
            </div>
            
            <div className="article-card">
              <div className="a-image" style={{backgroundImage: 'url("/assets/Anti-HairFall Shampoo/ChatGPT Image May 3, 2026, 11_01_51 AM (8).png")'}}></div>
              <div className="a-content">
                <span className="category-tag">PRODUCT EDUCATION</span>
                <h4>How to Use Hair Oil Correctly for Hair Fall</h4>
                <p>The right way to oil your scalp for maximum absorption and visible results.</p>
                <div className="a-meta">
                  <span>May 18, 2026 • 5 min read</span>
                </div>
                <button className="btn-outline-small">Read More &rarr;</button>
              </div>
            </div>

            <div className="article-card">
              <div className="a-image" style={{backgroundImage: 'url("/assets/Anti-HairFall Shampoo/ChatGPT Image May 3, 2026, 08_45_57 AM (8).png")'}}></div>
              <div className="a-content">
                <span className="category-tag">AYURVEDA & INGREDIENTS</span>
                <h4>Bhringraj for Hair: Why Ayurveda Loves It</h4>
                <p>Discover the ancient herb Bhringraj and its incredible benefits for hair roots.</p>
                <div className="a-meta">
                  <span>May 16, 2026 • 6 min read</span>
                </div>
                <button className="btn-outline-small">Read More &rarr;</button>
              </div>
            </div>

            <div className="article-card">
              <div className="a-image" style={{backgroundImage: 'url("/assets/Women Anti-HairFall Therapy Combo Pack/Men Anti-Hairfall Therapy Combo .png")'}}></div>
              <div className="a-content">
                <span className="category-tag">LIFESTYLE & WELLNESS</span>
                <h4>3-Shot Hair Ritual: How ManushyaM Fits Into Your Weekly Routine</h4>
                <p>Simple. Effective. Ayurvedic. A weekly ritual that supports hair strength naturally.</p>
                <div className="a-meta">
                  <span>May 14, 2026 • 4 min read</span>
                </div>
                <button className="btn-outline-small">Read More &rarr;</button>
              </div>
            </div>
          </div>

          <div className="load-more-container">
            <button className="btn-outline">Load More Articles &darr;</button>
          </div>
        </main>

        {/* Right Sidebar - Reviews Summary */}
        <aside className="reviews-sidebar">
          <div className="sidebar-widget reviews-widget">
            <h3>What People Love About ManushyaM</h3>
            <div className="rating-huge">4.8 <span>★</span></div>
            <p>Average Rating</p>
            <p className="based-on">based on 10,000+ reviews</p>
            
            <div className="platforms">
              <span className="p-icon">a</span>
              <span className="p-icon">f</span>
            </div>

            <div className="mini-reviews">
              <div className="m-review">
                <div className="stars">★★★★★</div>
                <p>"I see visible reduction in hair fall in just 3 weeks. The 3-shot ritual is a game changer!"</p>
                <span>— Priya S.</span>
              </div>
              <div className="m-review">
                <div className="stars">★★★★★</div>
                <p>"Finally a product that's natural, Ayurvedic and actually works for men too."</p>
                <span>— Rohan M.</span>
              </div>
              <div className="m-review">
                <div className="stars">★★★★★</div>
                <p>"Love the ingredients and how light on scalp yet effective it is. Highly recommend!"</p>
                <span>— Ananya K.</span>
              </div>
            </div>
            
            <button className="btn-primary btn-full">See All Reviews &rarr;</button>
          </div>
        </aside>
      </div>
      
      {/* Reviews Coming Soon Banner */}
      <section className="reviews-coming-soon">
        <div className="container">
          <div className="section-header-small">
            <span className="line"></span>
            <h2>Reviews Coming Soon</h2>
            <span className="line"></span>
          </div>
          <p>Real stories. Real results. Stay tuned!</p>
        </div>
      </section>
    </motion.div>
  );
};

export default BlogsReviews;
