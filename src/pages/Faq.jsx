import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import './Faq.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  out: { opacity: 0, y: -20, transition: { duration: 0.6 } }
};

const faqData = [
  {
    category: "Products & Ingredients",
    questions: [
      {
        q: "What makes ManushyaM products different from regular hair care?",
        a: "ManushyaM therapies are curatively prepared using a 5000-year-old Kashayam Ayurvedic process. We handpick premium herbs and nourish them in high-quality oils over slow heat in small batches, ensuring maximum bio-active potency. Unlike commercial alternatives, our products are completely free from synthetic parabens, sulfates, and silicones."
      },
      {
        q: "Are the ingredients ethically sourced?",
        a: "Yes, all our botanical extracts, adaptogens (such as Korean Ginseng), and nourishing carrier oils (Bhringraj, Sesame, Jojoba) are ethically sourced from sustainable farms that practice organic harvesting methods."
      },
      {
        q: "Is Korean Ginseng effective for hair fall control?",
        a: "Yes. Ginseng is a powerful adaptogen that acts as a natural DHT blocker. It helps support the scalp's defenses against follicular stress, encouraging root retention and hair strength."
      }
    ]
  },
  {
    category: "Usage & Suitability",
    questions: [
      {
        q: "How often should I use the Anti-Hairfall Therapy?",
        a: "For optimal results, we recommend our 3-shot weekly ritual. Apply the therapy oil to your scalp and massage gently. Leave it on for 30 to 60 minutes, then rinse using a mild, chemical-free cleanser."
      },
      {
        q: "Are these products suitable for all hair types?",
        a: "Our formulations are designed to be gender-focused and are pH balanced. They are suitable for all hair textures, color-treated hair, and dry or oily scalp types."
      },
      {
        q: "How soon can I expect to see results?",
        a: "Most users notice a visible reduction in hair breakage and improved scalp hydration within 3 to 4 applications of the ritual. Consistent weekly application yields the best long-term outcomes."
      }
    ]
  },
  {
    category: "Orders & Shipping",
    questions: [
      {
        q: "Do you offer free shipping?",
        a: "Yes, we offer free shipping across India on all orders above 500. For orders below 500, a nominal shipping fee of 50 is charged."
      },
      {
        q: "How can I track my order?",
        a: "Once your order is processed and dispatched, we will send you an email with your Shiprocket tracking details. You can also view your live order status by logging into your account and visiting the Order History page."
      },
      {
        q: "What is your typical delivery timeline?",
        a: "Metro cities typically receive deliveries within 2 to 4 business days. For other regions, it usually takes between 5 to 7 business days."
      }
    ]
  },
  {
    category: "Payments & Refunds",
    questions: [
      {
        q: "What payment options are available?",
        a: "We support secure payments powered by Razorpay, including all major Credit/Debit Cards, Net Banking, UPI (Google Pay, PhonePe, Paytm), and Cash on Delivery (COD)."
      },
      {
        q: "What is your refund policy?",
        a: "Due to the personal nature of hair care products, we do not accept returns on opened items. However, if your order arrives damaged or you receive incorrect products, contact our support team within 48 hours for a replacement or full refund."
      }
    ]
  }
];

const AccordionItem = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <div className="faq-accordion-item">
      <button className="faq-question-btn" onClick={toggleOpen}>
        <span>{question}</span>
        {isOpen ? <ChevronUp size={18} className="faq-icon-gold" /> : <ChevronDown size={18} />}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: { height: { duration: 0.3 }, opacity: { duration: 0.2, delay: 0.05 } } }}
            exit={{ height: 0, opacity: 0, transition: { height: { duration: 0.3 }, opacity: { duration: 0.15 } } }}
            className="faq-answer-wrapper"
          >
            <div className="faq-answer-content">
              <p>{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Faq = () => {
  const [activeIndices, setActiveIndices] = useState({});

  const toggleItem = (catIdx, qIdx) => {
    const key = `${catIdx}-${qIdx}`;
    setActiveIndices(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="faq-page container"
    >
      <div className="faq-header">
        <HelpCircle size={32} className="faq-title-icon" />
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about our therapies, shipping, and payments.</p>
      </div>

      <div className="faq-sections">
        {faqData.map((section, catIdx) => (
          <div key={catIdx} className="faq-category-section">
            <h2 className="faq-category-title">{section.category}</h2>
            <div className="faq-accordion">
              {section.questions.map((item, qIdx) => {
                const key = `${catIdx}-${qIdx}`;
                return (
                  <AccordionItem
                    key={qIdx}
                    question={item.q}
                    answer={item.a}
                    isOpen={!!activeIndices[key]}
                    toggleOpen={() => toggleItem(catIdx, qIdx)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Faq;
