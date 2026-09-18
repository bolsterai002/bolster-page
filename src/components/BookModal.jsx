import React, { useState, useEffect } from "react";
import { X, Star, Play, Pause, ShoppingBag, Check, RotateCw, Sparkles } from "lucide-react";

export default function BookModal({ book, isOpen, onClose, onAddToCart, isInCart }) {
  const [activeTab, setActiveTab] = useState("synopsis"); // 'synopsis' | 'excerpt' | 'audio'
  const [selectedFormat, setSelectedFormat] = useState("Hardcover");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(25);
  const [coverSide, setCoverSide] = useState("front"); // 'front' | 'back'

  useEffect(() => {
    if (book) {
      setSelectedFormat(book.formats?.[0] || "Hardcover");
      setActiveTab("synopsis");
      setIsPlayingAudio(false);
      setCoverSide("front");
    }
  }, [book]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Audio animation timer
  useEffect(() => {
    let interval;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => (prev >= 100 ? 0 : prev + 2));
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  if (!isOpen || !book) return null;

  // Calculate format price
  let formatMultiplier = 1;
  if (selectedFormat === "eBook") formatMultiplier = 0.65;
  if (selectedFormat === "Audiobook") formatMultiplier = 0.85;
  const currentFormatPrice = (book.price * formatMultiplier).toFixed(2);

  const displayCover = coverSide === "back" && book.backCover ? book.backCover : book.cover;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={14} />
        </button>

        <div className="modal-grid">
          {/* Cover & Details Sidebar */}
          <div>
            <div className="modal-cover-wrapper">
              <img
                src={displayCover}
                alt={`${book.title} ${coverSide === "back" ? "Back Cover" : "Front Cover"}`}
                className="modal-cover-img"
                onClick={() => book.backCover && setCoverSide((prev) => (prev === "front" ? "back" : "front"))}
                style={{ cursor: book.backCover ? "pointer" : "default" }}
                title={book.backCover ? "Click to flip cover" : undefined}
              />
              {book.backCover && (
                <button
                  type="button"
                  className="modal-cover-flip-btn"
                  onClick={() => setCoverSide((prev) => (prev === "front" ? "back" : "front"))}
                  title={`Flip to ${coverSide === "front" ? "Back Cover" : "Front Cover"}`}
                >
                  <RotateCw size={12} />
                  <span>{coverSide === "front" ? "View Back" : "View Front"}</span>
                </button>
              )}
            </div>

            {/* Front / Back Switcher Pills */}
            {book.backCover && (
              <div className="modal-cover-toggle-pills">
                <button
                  type="button"
                  className={`modal-cover-pill ${coverSide === "front" ? "active" : ""}`}
                  onClick={() => setCoverSide("front")}
                >
                  Front Cover
                </button>
                <button
                  type="button"
                  className={`modal-cover-pill ${coverSide === "back" ? "active" : ""}`}
                  onClick={() => setCoverSide("back")}
                >
                  Back Cover
                </button>
              </div>
            )}

            {/* Inscription quote if viewing back cover */}
            {coverSide === "back" && book.tagline && (
              <div className="modal-back-tagline-box">
                <span className="modal-back-tagline-label">Back Cover Inscription</span>
                <p className="modal-back-tagline-text">"{book.tagline}"</p>
              </div>
            )}

            <div style={{ marginTop: "1.2rem", fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: "6px" }}>
              {book.series && <div><strong>Series:</strong> {book.series}</div>}
              <div><strong>Publisher:</strong> {book.publisher}</div>
              <div><strong>Pages:</strong> {book.pageCount} pages</div>
              <div><strong>ISBN:</strong> {book.isbn}</div>
              <div><strong>Release:</strong> {book.publishedYear}</div>
            </div>
          </div>

          {/* Right Column Content */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.5rem" }}>
              <span className="book-badge" style={{ position: "static" }}>{book.badge}</span>
              <span style={{ fontSize: "0.82rem", color: "var(--text-accent)", fontWeight: 600 }}>{book.genre}</span>
            </div>

            <h2 style={{ fontSize: "1.8rem", marginBottom: "0.3rem" }}>{book.title}</h2>
            <p style={{ fontSize: "1rem", color: "var(--text-secondary)", marginBottom: "0.8rem" }}>
              Written by <strong>{book.author}</strong>
            </p>

            {/* Rating Stars */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "1.2rem", color: "var(--amber)" }}>
              <div style={{ display: "flex", gap: "2px" }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill="#f59e0b" />
                ))}
              </div>
              <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>{book.rating}</span>
              <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                ({book.reviewCount.toLocaleString()} verified reviews)
              </span>
            </div>

            {/* Format Selection */}
            <div style={{ marginBottom: "1.2rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>
                Select Format
              </label>
              <div style={{ display: "flex", gap: "8px" }}>
                {book.formats.map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setSelectedFormat(fmt)}
                    style={{
                      padding: "0.45rem 1rem",
                      borderRadius: "8px",
                      background: selectedFormat === fmt ? "var(--primary)" : "rgba(255, 255, 255, 0.05)",
                      color: selectedFormat === fmt ? "#fff" : "var(--text-secondary)",
                      border: "1px solid " + (selectedFormat === fmt ? "var(--primary)" : "var(--border-subtle)"),
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs Navigation */}
            {/* Tabs Navigation */}
            <div className="modal-tabs">
              <button
                className={`modal-tab-btn ${activeTab === "synopsis" ? "active" : ""}`}
                onClick={() => setActiveTab("synopsis")}
              >
                Synopsis
              </button>
              {book.characterImage && (
                <button
                  className={`modal-tab-btn ${activeTab === "character" ? "active" : ""}`}
                  onClick={() => setActiveTab("character")}
                >
                  Side Characters
                </button>
              )}
              <button
                className={`modal-tab-btn ${activeTab === "excerpt" ? "active" : ""}`}
                onClick={() => setActiveTab("excerpt")}
              >
                Chapter Sample
              </button>
              <button
                className={`modal-tab-btn ${activeTab === "audio" ? "active" : ""}`}
                onClick={() => setActiveTab("audio")}
              >
                Audiobook Teaser ({book.audioDuration})
              </button>
            </div>

            {/* Tab Contents */}
            <div style={{ flex: 1, minHeight: "140px" }}>
              {activeTab === "synopsis" && (
                <div>
                  <p style={{ lineHeight: 1.7, fontSize: "0.98rem", marginBottom: "1rem" }}>
                    {book.synopsis}
                  </p>
                  <blockquote style={{
                    padding: "0.8rem 1rem",
                    background: "rgba(99, 102, 241, 0.08)",
                    borderLeft: "3px solid var(--primary)",
                    borderRadius: "4px",
                    fontStyle: "italic",
                    fontSize: "0.9rem",
                    color: "var(--text-primary)"
                  }}>
                    {book.quote}
                  </blockquote>
                </div>
              )}

              {activeTab === "character" && book.characterImage && (
                <div className="modal-character-container">
                  <div className="modal-character-img-wrap">
                    <img
                      src={book.characterImage}
                      alt="Alienverse Side Character: The Alien Mentor & Human Apprentice"
                      className="modal-character-img"
                    />
                    <div className="modal-character-badge">
                      <Sparkles size={11} color="#000" />
                      <span>Side Character Concept</span>
                    </div>
                  </div>
                  <div className="modal-character-details">
                    <h4 className="modal-character-title">The Alien Mentor & The Human Apprentice</h4>
                    <p className="modal-character-quote">"When humans get stuck, aliens arrive."</p>
                    <p className="modal-character-desc">
                      Official concept design for the Alienverse Developer Series. Depicting the symbiotic partnership between extraterrestrial intelligence and terrestrial software engineers solving complex neural architecture challenges.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "excerpt" && (
                <div style={{
                  padding: "1.2rem",
                  background: "rgba(0, 0, 0, 0.25)",
                  borderRadius: "10px",
                  border: "1px solid var(--border-subtle)",
                  maxHeight: "180px",
                  overflowY: "auto",
                  fontFamily: "var(--font-serif)",
                  lineHeight: 1.8,
                  fontSize: "1.05rem"
                }}>
                  <p style={{ color: "var(--text-primary)", fontStyle: "italic", lineHeight: 1.7, fontSize: "0.95rem" }}>
                    "{book.excerpt}"
                  </p>
                </div>
              )}

              {activeTab === "audio" && (
                <div>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "0.8rem" }}>
                    Narrated by the author and full cast with immersive spatial audio soundscape.
                  </p>
                  
                  <div className="audio-preview-box">
                    <button 
                      className="audio-play-btn"
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      title={isPlayingAudio ? "Pause" : "Play Sample"}
                    >
                      {isPlayingAudio ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: "2px" }} />}
                    </button>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "6px" }}>
                        <span>Sample Excerpt: Chapter 1</span>
                        <span>{isPlayingAudio ? "Playing 01:24 / 05:00" : "05:00"}</span>
                      </div>

                      {/* Waveform Bars */}
                      <div className="audio-waveform">
                        {[40, 70, 30, 85, 95, 60, 45, 80, 100, 65, 35, 90, 75, 55, 30, 85, 60, 40].map((h, idx) => (
                          <div
                            key={idx}
                            className={`wave-bar ${isPlayingAudio ? "active" : ""}`}
                            style={{
                              height: `${h}%`,
                              animationDelay: `${idx * 0.08}s`
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Modal Actions */}
            <div className="modal-bottom-action-bar">
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Price for {selectedFormat}</span>
                <span style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>
                  ${currentFormatPrice}
                </span>
              </div>

              <button
                className="btn-primary"
                style={{ padding: "0.65rem 1.4rem", fontSize: "0.88rem" }}
                onClick={() => {
                  onAddToCart({ ...book, selectedFormat, price: parseFloat(currentFormatPrice) });
                }}
              >
                {isInCart ? (
                  <>
                    <Check size={15} />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={15} />
                    <span>Add {selectedFormat} to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
