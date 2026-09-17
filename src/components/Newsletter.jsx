import React, { useState } from "react";
import { Mail, Sparkles, Check, ArrowRight } from "lucide-react";

export default function Newsletter({ onSubscribeSuccess }) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setIsSubmitted(true);
    onSubscribeSuccess(email);
  };

  return (
    <section id="newsletter" className="newsletter-section">
      <div className="container">
        <div className="newsletter-box">
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255, 255, 255, 0.08)", padding: "0.35rem 0.95rem", borderRadius: "9999px", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-accent)", marginBottom: "1.2rem" }}>
            <Sparkles size={13} />
            <span>Join the Readers Guild</span>
          </div>

          <h2 className="newsletter-title">Unlock 20% Off Your First Order</h2>
          <p className="newsletter-desc">
            Subscribe to our weekly dispatch featuring handpicked literary gems, author dialogues, and exclusive access to first-edition drops.
          </p>

          {isSubmitted ? (
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(16, 185, 129, 0.15)", border: "1px solid #10b981", padding: "0.85rem 1.6rem", borderRadius: "9999px", color: "#10b981", fontWeight: 600 }}>
              <Check size={15} />
              <span>Welcome to the Guild! Use code <strong>READ20</strong> at checkout.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="newsletter-form">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn-primary">
                <span>Join Free</span>
                <ArrowRight size={14} />
              </button>
            </form>
          )}

          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "1rem" }}>
            Zero spam. Unsubscribe at any time with one click.
          </p>
        </div>
      </div>
    </section>
  );
}
