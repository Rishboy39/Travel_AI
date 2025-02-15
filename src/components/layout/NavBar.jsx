import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/global/Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <motion.div 
        className="nav-content"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" className="nav-logo">
          TravelAI
        </Link>
        
        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </Link>
          <Link to="/upload" className={location.pathname === '/upload' ? 'active' : ''}>
            Upload
          </Link>
          <Link to="/groups" className={location.pathname === '/groups' ? 'active' : ''}>
            Groups
          </Link>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;