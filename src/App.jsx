import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import ProductDetails from './pages/ProductDetails';
import BlogsReviews from './pages/BlogsReviews';
import ContactUs from './pages/ContactUs';
import Solutions from './pages/Solutions';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Admin from './pages/Admin';
import Faq from './pages/Faq';

// Context
import { AppProvider } from './context/AppContext';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const AppContent = () => {
  const [loading, setLoading] = useState(true);

  // Initial 4-second loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // Wait 4 seconds to allow transition
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader />}
      
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.8s ease-in-out', transitionDelay: '3s' }}>
        <Navbar />
        <ScrollToTop />
        <main>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/blogs" element={<BlogsReviews />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/faq" element={<Faq />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;

