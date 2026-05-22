import React from 'react';
import { motion } from 'framer-motion';
import './Loader.css';

const Loader = () => {
  // Animation variants
  const containerVariants = {
    initial: {
      position: 'fixed',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f9f5f0', // var(--bg-cream)
      zIndex: 9999,
    },
    animate: {
      backgroundColor: 'rgba(249, 245, 240, 0)', // Fade out background
      pointerEvents: 'none',
      transition: {
        delay: 3,
        duration: 0.8,
        ease: 'easeInOut'
      }
    }
  };

  const logoVariants = {
    initial: {
      scale: 1.5,
      y: 0,
      x: 0,
    },
    animate: {
      scale: 0.5,
      // Move to top left (approximate navbar logo position)
      y: '-40vh',
      x: '-40vw',
      opacity: 0,
      transition: {
        delay: 3, // Wait 3 seconds
        duration: 1, // 1 second transition
        ease: [0.6, 0.01, -0.05, 0.95], // Elegant ease
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="loader-container"
    >
      <motion.div
        variants={logoVariants}
        initial="initial"
        animate="animate"
        className="loader-logo"
      >
        <motion.img 
          src="/assets/Logo.png" 
          alt="ManushyaM Logo"
          style={{ width: '250px' }}
          animate={{ 
            scale: [1, 1.1, 1],
            filter: ['drop-shadow(0px 0px 0px rgba(198,156,109,0))', 'drop-shadow(0px 0px 20px rgba(198,156,109,0.8))', 'drop-shadow(0px 0px 0px rgba(198,156,109,0))']
          }}
          transition={{ duration: 1.5, repeat: 2, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Loader;
