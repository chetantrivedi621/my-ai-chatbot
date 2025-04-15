import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Apka Smart AI Assistant
            <span className="gradient-text"> 24/7 Available</span>
          </h1>
          <p className="hero-subtitle">
            Kisi bhi topic par chat karein, sawaal puchein, aur instant answers paayein.
            Humara AI chatbot aapki har conversation ko smarter banata hai.
          </p>
          <div className="cta-buttons">
            <Link to="/register" className="cta-button primary">
              Abhi Start Karein
            </Link>
            <Link to="/login" className="cta-button secondary">
              Login Karein
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/doodle-chatbot-home-image.svg" alt="AI Chatbot Interface" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Khaas Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>Smart Responses</h3>
            <p>Advanced AI ke saath natural conversations</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Replies</h3>
            <p>Milliseconds mein accurate answers</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Chat</h3>
            <p>End-to-end encrypted conversations</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Har Device Par</h3>
            <p>Mobile, desktop, tablet - sabhi par available</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2 className="section-title">Kaise Use Karein</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Account Banayein</h3>
            <p>Free registration karein</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Chat Start Karein</h3>
            <p>Koi bhi topic choose karein</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Answers Paayein</h3>
            <p>Instant smart responses</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start?</h2>
          <p>Abhi join karein aur smart AI assistant ka experience karein</p>
          <Link to="/register" className="cta-button primary">
            Free Registration Karein
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 