import React, { useState } from "react";
import { Play, Sparkles, BookOpen, Headphones, Star, Check, Plus, Layers } from "lucide-react";

export default function HeroStackShowcase({ books, onPreviewBook, onAddToCart }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Stack panels configuration mapping exactly to the reference photo's tactile porcelain, amber, and forest emerald cards
  const stackItems = [
    {
      book: books[0], // The Celestial Atlas
      id: "panel-porcelain",
      monogram: "CA",
      code: "VOL. 01",
      subtitle: "ASTRONOMY & SCI-FI",
      themeClass: "stack-theme-porcelain",
      playColor: "#075e4d", // Forest Emerald capsule button from reference
      playIconColor: "#ffffff",
      buttonGlow: "rgba(7, 94, 77, 0.35)",
      accentIcon: <Sparkles size={16} />,
      tag1: { label: "EDITION", val: "HARDCOVER + ART" },
      tag2: { label: "AUDIOBOOK", val: "14H 32M LOSSLESS" },
    },
    {
      book: books[2] || books[1], // Whispers of the Sunken City
      id: "panel-amber",
      monogram: "SC",
      code: "VOL. 02",
      subtitle: "MYTHIC ADVENTURE",
      themeClass: "stack-theme-amber",
      playColor: "#ffffff", // Pure white pill button from reference
      playIconColor: "#e87a1e",
      buttonGlow: "rgba(255, 255, 255, 0.6)",
      accentIcon: <Headphones size={16} />,
      tag1: { label: "DEPTH", val: "200M EXPEDITION" },
      tag2: { label: "NARRATION", val: "SPATIAL AUDIO" },
    },
    {
      book: books[1] || books[3], // Architects of the Mind
      id: "panel-emerald",
      monogram: "AM",
      code: "VOL. 03",
      subtitle: "COGNITIVE SCIENCES",
      themeClass: "stack-theme-emerald",
      playColor: "#ffffff", // Pure white pill button from reference
      playIconColor: "#075e4d",
      buttonGlow: "rgba(255, 255, 255, 0.6)",
      accentIcon: <Layers size={16} />,
      tag1: { label: "RESEARCH", val: "SYNAPTIC BIO" },
      tag2: { label: "PREVIEW", val: "CHAPTER 01 AUDIO" },
    }
  ];

  return (
    <div className="hero-stack-container">
      <div className="stack-wrapper">
        {stackItems.map((item, index) => {
          const isActive = activeIndex === index;
          const book = item.book;

          return (
            <div
              key={item.id}
              className={`stack-panel ${item.themeClass} ${isActive ? "active" : "collapsed"}`}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {/* Background ambient texture / graphic */}
              <div className="panel-ambient-overlay"></div>

              {/* Panel Header */}
              <div className="panel-header">
                <div className="panel-tag-group">
                  <span className="panel-code">{item.code}</span>
                  {isActive && <span className="panel-subtitle">{item.subtitle}</span>}
                </div>
                <div className="panel-monogram">{item.monogram}</div>
              </div>

              {/* Central Visual & Floating Cover Showcase */}
              <div className="panel-body">
                {/* Large Title (shown prominently when active) */}
                <div className="panel-title-wrap">
                  <h3 className="panel-book-title">{book.title}</h3>
                  <p className="panel-book-author">by {book.author}</p>
                </div>

                {/* 3D Floating Book Cover & Play Button */}
                <div className="panel-center-stage">
                  <div className="floating-artwork-wrap">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="floating-book-art"
                      loading="eager"
                    />

                    {/* Circular Tactile Play / Preview Button */}
                    <button
                      className="stack-play-btn"
                      style={{
                        background: item.playColor,
                        boxShadow: `0 8px 24px ${item.buttonGlow}`,
                        color: item.playIconColor,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onPreviewBook(book);
                      }}
                      title={`Listen sample / preview ${book.title}`}
                      aria-label="Play book sample"
                    >
                      <Play
                        size={20}
                        fill={item.playIconColor}
                        style={{ marginLeft: "3px" }}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Metadata Bar */}
              <div className="panel-footer">
                <div className="footer-col">
                  <span className="footer-label">{item.tag1.label}</span>
                  <span className="footer-value">{item.tag1.val}</span>
                  <div className="footer-icon-line">
                    <BookOpen size={14} />
                  </div>
                </div>

                <div className="footer-col">
                  <span className="footer-label">{item.tag2.label}</span>
                  <span className="footer-value">{item.tag2.val}</span>
                  <div className="footer-icon-line">
                    {item.accentIcon}
                  </div>
                </div>

                {isActive && (
                  <div className="footer-action-col">
                    <button
                      className="stack-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(book);
                      }}
                      title="Quick add to cart"
                    >
                      <Plus size={16} />
                      <span>${book.price.toFixed(2)}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
