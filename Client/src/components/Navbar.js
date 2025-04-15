import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css'; // Import the custom CSS file for Navbar styles

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const renderNavLinks = (isMobile = false) => {
    const linkClass = isMobile ? 'mobile-nav-link' : 'navbar-link';
    
    return (
      <>
        <Link to="/" className={`${linkClass} ${isActive('/')}`}>
          Home
        </Link>
        {!isAuthenticated ? (
          <>
            <Link to="/login" className={`${linkClass} ${isActive('/login')}`}>
              Login
            </Link>
            <Link to="/register" className={`${linkClass} ${isActive('/register')}`}>
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/chat" className={`${linkClass} ${isActive('/chat')}`}>
              Chat
            </Link>
            <Link to="/profile" className={`${linkClass} ${isActive('/profile')}`}>
              Profile
            </Link>
            <button 
              onClick={handleLogout}
              className={linkClass}
            >
              Logout
            </button>
          </>
        )}
      </>
    );
  };

  return (
    <nav className="navbar">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          AI Chatbot
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links">
          {renderNavLinks()}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="menu-button"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-menu">
            {renderNavLinks(true)}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
