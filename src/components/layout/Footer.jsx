import React from 'react';
import '../../styles/global/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>TravelAI</h3>
          <p>Discover your travel personality through AI-powered photo analysis</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/upload">Upload Photos</a></li>
            <li><a href="/groups">Group Planning</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact</h4>
          <ul>
            <li>Email: hello@travelai.com</li>
            <li>Support: support@travelai.com</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 TravelAI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;