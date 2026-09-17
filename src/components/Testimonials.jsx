import React from "react";
import { Star, MessageSquareQuote, CheckCircle2 } from "lucide-react";
import { TESTIMONIALS } from "../data/bookData";

export default function Testimonials() {
  return (
    <section id="reviews" className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Reader Community</div>
          <h2 className="section-title">Loved by Curious Minds Worldwide</h2>
          <p className="section-desc">
            Join over 50,000 thinkers, creators, and bibliophiles who find their next favorite obsession through ALIENVERSE.
          </p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="testimonial-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <div className="testimonial-stars">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={13} fill="#f59e0b" />
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", color: "#10b981" }}>
                  <CheckCircle2 size={13} />
                  <span>Verified Reader</span>
                </div>
              </div>

              <p className="testimonial-text">"{t.comment}"</p>

              <div style={{ fontSize: "0.78rem", color: "var(--text-accent)", marginBottom: "1.2rem", fontWeight: 600 }}>
                Regarding: <em>{t.book}</em>
              </div>

              <div className="testimonial-author-row">
                <img src={t.avatar} alt={t.name} className="reviewer-avatar" />
                <div>
                  <div className="reviewer-name">{t.name}</div>
                  <div className="reviewer-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
