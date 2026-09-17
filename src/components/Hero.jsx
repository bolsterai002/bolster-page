import React from "react";
import { ArrowRight, Headphones } from "lucide-react";
import BenchoBookCarousel from "./BenchoBookCarousel";

export default function Hero({ books, onPreviewBook, onAddToCart }) {
  const featuredBook = books[0];

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Header Block: Category Pill, Stacked Title, Minimal Subtitle */}
          <div className="hero-header-block">

            <h1 className="hero-title">
              Step Inside.<br />
              Stories That<br />
              Reshape.
            </h1>

            <p className="hero-description">
              Hand-curated literature. Signed collector’s editions. Lossless spatial audiobooks. Drag, swipe, or click the 3D book stack carousel to explore our collection.
            </p>
          </div>

          {/* 3D Orbital Book Stack Carousel */}
          <div className="hero-stack-area">
            <BenchoBookCarousel
              books={books}
              onPreviewBook={onPreviewBook}
              onAddToCart={onAddToCart}
              spread={114}
              depth={135}
              sink={100}
              settle={0}
            />
          </div>

          {/* Bottom Action & Social Proof Block */}
          <div className="hero-bottom-block">
            <div className="hero-cta-group">
              <a href="#catalog" className="btn-primary">
                <span>Explore Full Catalog</span>
                <ArrowRight size={15} />
              </a>

              <button 
                className="btn-secondary" 
                onClick={() => onPreviewBook(featuredBook)}
              >
                <Headphones size={15} color="var(--primary)" />
                <span>Listen Audio Sample</span>
              </button>
            </div>

            {/* Social Proof Metrics */}
            <div className="hero-metrics">
              <div className="metric-item">
                <span className="metric-number">50,000+</span>
                <span className="metric-label">Avid Readers</span>
              </div>
              <div className="metric-item">
                <span className="metric-number">4.95 ★</span>
                <span className="metric-label">Average Score</span>
              </div>
              <div className="metric-item">
                <span className="metric-number">100%</span>
                <span className="metric-label">Eco-Print Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
