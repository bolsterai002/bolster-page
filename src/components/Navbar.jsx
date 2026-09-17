import React, { useState } from "react";
import { BookOpen, ShoppingBag, Heart, Search, Menu, X } from "lucide-react";

export default function Navbar({ cartCount, wishlistCount, onOpenCart, onSearchClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="navbar-wrap">
      <div className="container">
        <nav className="navbar">
          {/* Brand Logo */}
          <a href="#" className="brand-logo">
            <div className="brand-icon-box">
              <BookOpen className="brand-icon" />
            </div>
            <span className="brand-name">
              ALIENVERSE
            </span>
          </a>

          {/* Desktop Nav Links */}
          <ul className="nav-links">
            <li><a href="#catalog" className="nav-link">Catalog</a></li>
            <li><a href="#author" className="nav-link">Author Spotlight</a></li>
            <li><a href="#reviews" className="nav-link">Community</a></li>
            <li><a href="#newsletter" className="nav-link">Readers Club</a></li>
          </ul>

          {/* Action Buttons */}
          <div className="nav-actions">
            <button
              className="nav-icon-btn"
              onClick={onSearchClick}
              title="Search Catalog"
              aria-label="Search Catalog"
            >
              <Search className="action-icon" />
            </button>

            <button
              className="nav-icon-btn"
              title="Saved Wishlist"
              aria-label="Wishlist"
              onClick={() => {
                const el = document.getElementById("catalog");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Heart className="action-icon" />
              {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
            </button>

            <button
              className="nav-icon-btn"
              onClick={onOpenCart}
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="action-icon" />
              {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
            </button>

            <a href="#catalog" className="btn-primary desktop-only-btn" style={{ padding: "0.55rem 1.15rem", fontSize: "0.85rem" }}>
              Explore Books
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              className="nav-icon-btn mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </nav>

        {/* Mobile Slide-down Navigation Panel */}
        {mobileMenuOpen && (
          <div className="mobile-nav-panel">
            <ul className="mobile-nav-links">
              <li>
                <button className="mobile-nav-link-btn" onClick={() => handleNavClick("catalog")}>
                  <span>Book Catalog & Collections</span>
                </button>
              </li>
              <li>
                <button className="mobile-nav-link-btn" onClick={() => handleNavClick("author")}>
                  <span>Author of the Month</span>
                </button>
              </li>
              <li>
                <button className="mobile-nav-link-btn" onClick={() => handleNavClick("reviews")}>
                  <span>Community Reviews</span>
                </button>
              </li>
              <li>
                <button className="mobile-nav-link-btn" onClick={() => handleNavClick("newsletter")}>
                  <span>Join Readers Guild (20% Off)</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
