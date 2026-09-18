import React, { useState, useEffect } from "react";
import { Star, CheckCircle2, MessageSquarePlus, Send, X, Feather } from "lucide-react";
import { BOOKS_DATA } from "../data/bookData";

const STORAGE_KEY = "alienverse_customer_reviews";

export default function Testimonials({ onAddToast }) {
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const defaultBookTitle = BOOKS_DATA[0]?.title || "Alienverse: AI Software Engineering Standards";

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [bookName, setBookName] = useState(defaultBookTitle);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    } catch (e) {
      console.error("Failed to save reviews", e);
    }
  }, [reviews]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim() || !bookName.trim()) return;

    const newReview = {
      id: "rev-" + Date.now(),
      name: name.trim(),
      book: bookName.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    };

    setReviews((prev) => [newReview, ...prev]);
    setName("");
    setComment("");
    setRating(5);
    setSubmitted(true);

    if (onAddToast) {
      onAddToast("Thank you! Your review has been posted.");
    }

    setTimeout(() => {
      setSubmitted(false);
      setIsFormOpen(false);
    }, 1600);
  };

  const getInitials = (str) => {
    if (!str) return "R";
    const parts = str.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return str.slice(0, 2).toUpperCase();
  };

  return (
    <section id="reviews" className="testimonials-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">Reader Community</div>
          <h2 className="section-title">Customer Reviews & Impressions</h2>
          <p className="section-desc">
            Real feedback from readers and engineers experiencing the Alienverse series.
          </p>

          <div style={{ marginTop: "1.4rem", display: "flex", justifyContent: "center" }}>
            <button
              className="btn-primary"
              style={{ padding: "0.55rem 1.4rem", fontSize: "0.88rem", gap: "8px" }}
              onClick={() => setIsFormOpen((prev) => !prev)}
            >
              {isFormOpen ? <X size={15} /> : <MessageSquarePlus size={15} />}
              <span>{isFormOpen ? "Cancel" : "Write a Customer Review"}</span>
            </button>
          </div>
        </div>

        {/* Review Form Card */}
        {isFormOpen && (
          <div className="review-form-wrap">
            <form onSubmit={handleSubmit} className="review-form-card">
              <div className="review-form-header">
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0, color: "var(--text-primary)" }}>Add Your Book Review</h3>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: "4px 0 0" }}>
                    Share your experience with fellow readers and developers
                  </p>
                </div>
                <button
                  type="button"
                  className="nav-icon-btn"
                  onClick={() => setIsFormOpen(false)}
                  aria-label="Close form"
                >
                  <X size={15} />
                </button>
              </div>

              {submitted ? (
                <div style={{ padding: "2.5rem 1rem", textAlign: "center", color: "#10b981" }}>
                  <CheckCircle2 size={38} style={{ margin: "0 auto 0.75rem" }} />
                  <h4 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0 }}>Review Submitted!</h4>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginTop: "6px" }}>
                    Thank you for sharing your review with our community.
                  </p>
                </div>
              ) : (
                <div className="review-form-grid">
                  <div className="form-group">
                    <label className="review-label">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="review-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="review-label">Book Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter book title"
                      value={bookName}
                      onChange={(e) => setBookName(e.target.value)}
                      className="review-input"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label className="review-label">Your Rating</label>
                    <div className="rating-select-row">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="star-rate-btn"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                          title={`${star} Star${star > 1 ? "s" : ""}`}
                        >
                          <Star
                            size={22}
                            fill={(hoverRating || rating) >= star ? "#f59e0b" : "none"}
                            color={(hoverRating || rating) >= star ? "#f59e0b" : "var(--text-muted)"}
                          />
                        </button>
                      ))}
                      <span className="rating-num-label">{rating} of 5 Stars</span>
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label className="review-label">Your Review</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Write your honest thoughts, key takeaways, or feedback..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="review-textarea"
                    />
                  </div>

                  <div className="form-group full-width" style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "0.5rem" }}>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setIsFormOpen(false)}
                      style={{ padding: "0.55rem 1.1rem", fontSize: "0.85rem" }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      style={{ padding: "0.55rem 1.4rem", fontSize: "0.85rem", gap: "7px" }}
                    >
                      <Send size={14} />
                      <span>Post Review</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}

        {/* Review Cards Grid or Empty State */}
        {reviews.length > 0 ? (
          <div className="testimonials-grid">
            {reviews.map((t) => (
              <div key={t.id} className="testimonial-card customer-review-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
                  <div className="testimonial-stars" style={{ marginBottom: 0 }}>
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", color: "#10b981", fontWeight: 600 }}>
                    <CheckCircle2 size={13} />
                    <span>Verified Reader</span>
                  </div>
                </div>

                <p className="testimonial-text">"{t.comment}"</p>

                <div style={{ fontSize: "0.8rem", color: "var(--text-accent)", marginBottom: "1.2rem", fontWeight: 600 }}>
                  Regarding: <em>{t.book}</em>
                </div>

                <div className="testimonial-author-row">
                  <div className="reviewer-initials-avatar">
                    {getInitials(t.name)}
                  </div>
                  <div>
                    <div className="reviewer-name">{t.name}</div>
                    <div className="reviewer-role">{t.date || "Verified Reader"}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !isFormOpen && (
            <div className="review-empty-state">
              <div className="empty-icon-circle">
                <Feather size={28} color="var(--primary)" />
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                No Customer Reviews Yet
              </h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", maxWidth: "420px", margin: "0 auto 1.4rem" }}>
                Have you read <strong>{defaultBookTitle}</strong>? Be the first reader to submit your review!
              </p>
              <button
                className="btn-primary"
                onClick={() => setIsFormOpen(true)}
                style={{ padding: "0.6rem 1.5rem", fontSize: "0.88rem", gap: "8px" }}
              >
                <MessageSquarePlus size={15} />
                <span>Write the First Review</span>
              </button>
            </div>
          )
        )}
      </div>
    </section>
  );
}
