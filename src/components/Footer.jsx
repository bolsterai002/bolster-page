import React from "react";
import { BookOpen, Truck, ShieldCheck, Leaf, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        {/* Guarantees / Perks Bar */}
        <div className="perks-bar">
          <div className="perk-item">
            <div className="perk-icon-circle">
              <Truck size={16} />
            </div>
            <div>
              <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Fast Express Dispatch
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Complimentary tracked shipping over $35
              </div>
            </div>
          </div>

          <div className="perk-item">
            <div className="perk-icon-circle">
              <ShieldCheck size={16} />
            </div>
            <div>
              <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-primary)" }}>
                30-Day Reader Guarantee
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Hassle-free exchanges and instant refunds
              </div>
            </div>
          </div>

          <div className="perk-item">
            <div className="perk-icon-circle">
              <Leaf size={16} />
            </div>
            <div>
              <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Sustainable Eco-Printing
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                FSC-certified acid-free paper & vegetable ink
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="footer-grid">
          {/* Brand Info */}
          <div>
            <div className="brand-logo" style={{ marginBottom: "1rem" }}>
              <div className="brand-icon-box">
                <BookOpen size={16} />
              </div>
              <span>ALIENVERSE</span>
            </div>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.6, maxWidth: "320px", marginBottom: "1.2rem" }}>
              A sanctuary for thoughtful literature, rare collector editions, and captivating stories designed to elevate human consciousness.
            </p>
            <div style={{ display: "flex", gap: "12px", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
              <span>Follow our literary journeys across the universe.</span>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <div className="footer-col-title">Curations</div>
            <ul className="footer-links-list">
              <li><a href="#catalog" className="footer-link-item">Bestselling Speculative Fiction</a></li>
              <li><a href="#catalog" className="footer-link-item">Cognitive Sciences & AI</a></li>
              <li><a href="#catalog" className="footer-link-item">Mindfulness & Philosophy</a></li>
              <li><a href="#catalog" className="footer-link-item">Signed Collector’s Editions</a></li>
              <li><a href="#catalog" className="footer-link-item">Audiobook Exclusives</a></li>
            </ul>
          </div>

          {/* Column 3: The Guild */}
          <div>
            <div className="footer-col-title">The Guild</div>
            <ul className="footer-links-list">
              <li><a href="#author" className="footer-link-item">Author Spotlight</a></li>
              <li><a href="#reviews" className="footer-link-item">Reader Community Reviews</a></li>
              <li><a href="#newsletter" className="footer-link-item">Monthly Book Club</a></li>
              <li><a href="#newsletter" className="footer-link-item">Publish With Us</a></li>
              <li><a href="#" className="footer-link-item">Sustainability Charter</a></li>
            </ul>
          </div>

          {/* Column 4: Help */}
          <div>
            <div className="footer-col-title">Assistance</div>
            <ul className="footer-links-list">
              <li><a href="#" className="footer-link-item">Track Your Package</a></li>
              <li><a href="#" className="footer-link-item">Shipping Destinations</a></li>
              <li><a href="#" className="footer-link-item">Returns & Exchanges</a></li>
              <li><a href="#" className="footer-link-item">Digital Audiobook FAQ</a></li>
              <li><a href="#" className="footer-link-item">Direct Concierge Support</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} ALIENVERSE. All rights reserved.
          </div>
          <div className="footer-legal-links">
            <a href="#" className="footer-link-item">Privacy Policy</a>
            <a href="#" className="footer-link-item">Terms of Service</a>
            <a href="#" className="footer-link-item">Accessibility Statement</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
