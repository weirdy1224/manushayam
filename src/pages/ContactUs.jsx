import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Lock, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Package, 
  Users, 
  Truck, 
  CreditCard, 
  DollarSign, 
  FileText, 
  RefreshCw, 
  User, 
  ChevronRight 
} from 'lucide-react';
import './ContactUs.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  out: { opacity: 0, y: -20, transition: { duration: 0.6 } }
};

const ContactUs = () => {
  const navigate = useNavigate();

  const handleQaClick = () => {
    navigate('/faq');
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="contact-page"
    >
      {/* Top Banner */}
      <section className="contact-banner container section-padding">
        <div className="contact-banner-content">
          <h1>Contact Us</h1>
          <p className="desc">We're here to help you on your journey to stronger, healthier, and more confident hair.</p>
        </div>
        <div className="contact-banner-image">
           <div className="img-placeholder" style={{backgroundImage: 'url("/assets/Women%20Anti-HairFall%20Therapy%20Combo%20Pack/Men%20Anti-Hairfall%20Therapy%20Combo%20.png")'}}></div>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-main container section-padding">
        <div className="contact-layout">
          
          {/* Form */}
          <div className="contact-form-section">
            <div className="section-header-small">
              <span className="line"></span>
              <h2>Send Us a Message</h2>
              <span className="line"></span>
            </div>
            
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="form-group">
                  <input type="text" placeholder="Full Name *" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Email Address *" required />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group phone-group">
                  <select className="country-code">
                    <option value="+91">+91</option>
                  </select>
                  <input type="tel" placeholder="Enter phone number" />
                </div>
                <div className="form-group">
                  <select className="topic-select" defaultValue="">
                    <option value="" disabled>Select a topic</option>
                    <option value="order">Order Query</option>
                    <option value="product">Product Information</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <textarea placeholder="Type your message here..." rows="5" required></textarea>
              </div>
              
              <div className="form-submit">
                <button type="submit" className="btn-primary">Send Message &rarr;</button>
                <div className="privacy-note">
                  <Lock size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                  <span>We respect your privacy. Your information is safe with us.</span>
                </div>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="contact-info-section">
            <div className="section-header-small">
              <span className="line"></span>
              <h2>We're Here to Help</h2>
              <span className="line"></span>
            </div>
            <p className="info-intro">Reach out to us anytime through your preferred channel. Our team will get back to you as soon as possible.</p>
            
            <div className="info-grid">
              <div className="info-card">
                <div className="icon whatsapp"><MessageSquare size={20} /></div>
                <div className="details">
                  <h4>WhatsApp Support</h4>
                  <p>Quickest way to get help</p>
                  <a href="tel:+917829600018">+91 78296 00018 &rarr;</a>
                </div>
              </div>
              
              <div className="info-card">
                <div className="icon email"><Mail size={20} /></div>
                <div className="details">
                  <h4>Email Support</h4>
                  <p>Drop us an email</p>
                  <a href="mailto:care@manushyam.com">care@manushyam.com &rarr;</a>
                </div>
              </div>
              
              <div className="info-card address-card">
                <div className="icon location"><MapPin size={20} /></div>
                <div className="details">
                  <h4>Business Address</h4>
                  <p>Bengaluru, Karnataka, India</p>
                  <address>
                    ManushyaM Wellness Pvt. Ltd.<br/>
                    4th Floor, 12th Main,<br/>
                    Indiranagar, Bengaluru,<br/>
                    Karnataka - 560038
                  </address>
                </div>
              </div>
              
              <div className="info-card">
                <div className="icon order"><Package size={20} /></div>
                <div className="details">
                  <h4>Order Support</h4>
                  <p>Help with orders & tracking</p>
                  <a href="tel:+917829600018">+91 78296 00018 &rarr;</a>
                </div>
              </div>

              <div className="info-card">
                <div className="icon collab"><Users size={20} /></div>
                <div className="details">
                  <h4>Collaboration Queries</h4>
                  <p>Partnerships & collaborations</p>
                  <a href="mailto:hello@manushyam.com">hello@manushyam.com &rarr;</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Strip */}
      <section className="trust-strip container">
        <div className="trust-item">
          <span className="icon"><Truck size={20} /></span>
          <div>
            <strong>Shiprocket</strong>
            <p>Reliable & Fast Shipping</p>
          </div>
        </div>
        <div className="trust-item">
          <span className="icon"><CreditCard size={20} /></span>
          <div>
            <strong>Razorpay</strong>
            <p>Secure Payments</p>
          </div>
        </div>
        <div className="trust-item">
          <span className="icon"><DollarSign size={20} /></span>
          <div>
            <strong>COD Available</strong>
            <p>Cash on Delivery</p>
          </div>
        </div>
        <div className="trust-item">
          <span className="icon"><FileText size={20} /></span>
          <div>
            <strong>GST Invoice</strong>
            <p>Invoice Available</p>
          </div>
        </div>
      </section>

      {/* Quick Answers */}
      <section className="quick-answers container section-padding">
        <div className="section-header-small">
          <span className="line"></span>
          <h2>Quick Answers</h2>
          <span className="line"></span>
        </div>
        <p className="subtitle-center">Find answers to common questions</p>

        <div className="qa-grid">
          <button className="qa-btn" onClick={handleQaClick}>
            <span className="icon"><Package size={16} /></span>
            <span>Orders & Shipping</span>
            <ChevronRight size={14} className="qa-arrow-icon" />
          </button>
          <button className="qa-btn" onClick={handleQaClick}>
            <span className="icon"><CreditCard size={16} /></span>
            <span>Payments & Refunds</span>
            <ChevronRight size={14} className="qa-arrow-icon" />
          </button>
          <button className="qa-btn" onClick={handleQaClick}>
            <span className="icon"><FileText size={16} /></span>
            <span>Products & Usage</span>
            <ChevronRight size={14} className="qa-arrow-icon" />
          </button>
          <button className="qa-btn" onClick={handleQaClick}>
            <span className="icon"><RefreshCw size={16} /></span>
            <span>Returns & Cancellation</span>
            <ChevronRight size={14} className="qa-arrow-icon" />
          </button>
          <button className="qa-btn" onClick={handleQaClick}>
            <span className="icon"><User size={16} /></span>
            <span>Account & Others</span>
            <ChevronRight size={14} className="qa-arrow-icon" />
          </button>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="still-questions container section-padding">
        <div className="sq-card">
          <div className="sq-content">
            <h2>Still have questions?</h2>
            <p>We'd love to hear from you!</p>
            <p className="sub">Our team is here to support you on your hair care journey.</p>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <MessageSquare size={16} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
          <div className="sq-image" style={{backgroundImage: 'url("/assets/Women%20Anti-HairFall%20Therapy%20Combo%20Pack/Women%20Anti-Hairfall%20Therapy.png")'}}></div>
        </div>
      </section>
    </motion.div>
  );
};

export default ContactUs;
