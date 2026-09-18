import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, X, CornerDownLeft, BookOpen, Search, Compass } from "lucide-react";

const BASE = import.meta.env.BASE_URL || '/';
const getAsset = (path) => `${BASE.endsWith('/') ? BASE : `${BASE}/`}${path.replace(/^\//, '')}`;

export default function MorphSurface({ onSelectBook, books = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [aiResponse, setAiResponse] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Click outside to collapse
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Keyboard shortcut: Escape to close, Cmd+Enter to submit
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && isOpen) {
        handleSearchSubmit(e);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, query]);

  // Focus input on expand
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setAiResponse(null);

    setTimeout(() => {
      setIsSearching(false);
      const matched = books && books.length > 0
        ? books.find(
            (b) =>
              b.title.toLowerCase().includes(query.toLowerCase()) ||
              b.genre.toLowerCase().includes(query.toLowerCase()) ||
              b.author.toLowerCase().includes(query.toLowerCase())
          ) || books[0]
        : null;

      if (matched) {
        setAiResponse({
          text: `Based on your request, I highly recommend exploring "${matched.title}" by ${matched.author}. It is a standout ${matched.genre} masterwork that perfectly matches your curiosity.`,
          book: matched,
        });
      } else {
        setAiResponse({
          text: "Our catalog is currently being updated with upcoming releases and rare editions. Please check back shortly or join our Readers Guild below!",
          book: null,
        });
      }
    }, 450);
  };

  const handleChipClick = (suggestion) => {
    setQuery(suggestion);
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      const matched = books && books.length > 0
        ? books.find((b) => b.genre.toLowerCase().includes("sci-fi")) || books[0]
        : null;

      if (matched) {
        setAiResponse({
          text: `Here is a curated literary match: "${matched.title}" (${matched.genre}). Readers love its poignant depth and expansive worldbuilding.`,
          book: matched,
        });
      } else {
        setAiResponse({
          text: "Our catalog is currently being updated with upcoming releases and rare editions. Please check back shortly or join our Readers Guild below!",
          book: null,
        });
      }
    }, 400);
  };

  return (
    <div className="morph-surface-anchor" ref={containerRef}>
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 420,
          damping: 32,
        }}
        className={`morph-surface ${isOpen ? "expanded" : "dock"}`}
      >
        {!isOpen ? (
          <motion.button
            layout="position"
            className="morph-dock-btn"
            onClick={() => setIsOpen(true)}
            aria-label="Ask AI Book Concierge"
          >
            <div className="morph-dock-avatar-wrap">
              <img
                src={getAsset("images/alien_mentor_character.jpg")}
                alt="Alien Mentor"
                className="morph-dock-avatar"
              />
            </div>
            <span className="morph-dock-label">
              <span className="dock-label-full">Ask Alien Mentor Concierge...</span>
              <span className="dock-label-short">Ask Alien Concierge...</span>
            </span>
            <div className="morph-dock-key">
              <span>⌘K</span>
            </div>
          </motion.button>
        ) : (
          /* Expanded Panel State */
          <motion.div
            layout="position"
            className="morph-panel-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="morph-header">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div className="morph-header-avatar-wrap">
                  <img
                    src={getAsset("images/alien_mentor_character.jpg")}
                    alt="Alien Mentor"
                    className="morph-header-avatar"
                  />
                  <span className="morph-avatar-online-dot" />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <h4 style={{ fontSize: "0.92rem", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
                      Alien Mentor AI Guide
                    </h4>
                    <span className="morph-character-pill">Side Character</span>
                  </div>
                  <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", margin: "2px 0 0" }}>
                    "When humans get stuck, aliens arrive." • Universe Concierge
                  </p>
                </div>
              </div>
              <button
                className="morph-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close panel"
              >
                <X size={13} />
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSearchSubmit} className="morph-form">
              <div className="morph-input-wrap">
                <Search size={14} className="morph-search-icon" />
                <textarea
                  ref={inputRef}
                  rows={2}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="E.g., 'Recommend a thrilling hard sci-fi novel about deep space exploration'..."
                  className="morph-textarea"
                />
              </div>

              {/* Suggestion Chips */}
              <div className="morph-chips-row">
                <button
                  type="button"
                  className="morph-chip"
                  onClick={() => handleChipClick("Recommend deep space sci-fi")}
                >
                  🚀 Deep Space Sci-Fi
                </button>
                <button
                  type="button"
                  className="morph-chip"
                  onClick={() => handleChipClick("Mindfulness & Stillness")}
                >
                  🍵 Mindful Stillness
                </button>
                <button
                  type="button"
                  className="morph-chip"
                  onClick={() => handleChipClick("Cognitive AI future")}
                >
                  🧠 Neural Future
                </button>
              </div>

              {/* Action Bar */}
              <div className="morph-action-bar">
                <span className="morph-shortcut-hint">
                  Press <strong>⌘ + Enter</strong> to ask
                </span>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: "0.45rem 1.1rem", fontSize: "0.82rem" }}
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <span>Thinking...</span>
                  ) : (
                    <>
                      <span>Find Reads</span>
                      <CornerDownLeft size={12} />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* AI Response Card */}
            <AnimatePresence>
              {aiResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="morph-result-card"
                >
                  <p style={{ fontSize: "0.88rem", lineHeight: 1.6, color: "var(--text-secondary)", marginBottom: "0.8rem" }}>
                    {aiResponse.text}
                  </p>
                  {aiResponse.book && (
                    <div
                      className="morph-book-preview-chip"
                      onClick={() => {
                        if (onSelectBook) onSelectBook(aiResponse.book);
                        setIsOpen(false);
                      }}
                    >
                      <img
                        src={aiResponse.book.cover}
                        alt={aiResponse.book.title}
                        className="morph-book-thumb"
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 800, fontSize: "0.85rem", color: "var(--text-primary)" }}>
                          {aiResponse.book.title}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                          ${aiResponse.book.price.toFixed(2)} &bull; {aiResponse.book.genre}
                        </div>
                      </div>
                      <div className="btn-secondary" style={{ padding: "0.35rem 0.8rem", fontSize: "0.75rem" }}>
                        View Details
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export { MorphSurface };
