import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="hero">
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Discover Your Travel Personality
        </motion.h1>
        
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Upload your travel photos and connect with like-minded adventurers
        </motion.p>

        <motion.div 
          className="hero-cta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button className="primary-button" onClick={() => navigate('/quiz')}>
            Try Now - Free
          </button>
        </motion.div>

        <motion.div 
          className="hero-features"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="feature-card">
            <h3>Share Photos</h3>
            <p>Upload your travel memories</p>
            <button onClick={() => navigate('/upload')}>Upload Photos</button>
          </div>
          
          <div className="feature-card">
            <h3>Join Groups</h3>
            <p>Connect with fellow travelers</p>
            <button onClick={() => navigate('/groups')}>Explore Groups</button>
          </div>
          
          <div className="feature-card">
            <h3>Plan Trips</h3>
            <p>Discover new destinations</p>
            <button onClick={() => navigate('/planning')}>Start Planning</button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;