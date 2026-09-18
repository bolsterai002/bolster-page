import React from "react";
import { Award, BookOpen, Star, Sparkles, Feather } from "lucide-react";
import { FEATURED_AUTHOR } from "../data/bookData";

export default function AuthorSpotlight({ onSelectAuthorBook }) {
  const author = FEATURED_AUTHOR;

  return (
    <section id="author" className="author-section">
      <div className="container">
        <div className={`author-card ${!author.characterImage && !author.avatar ? "author-card-no-photo" : ""}`}>
          {/* Side Character Design Column */}
          {(author.characterImage || author.avatar) && (
            <div className="author-img-wrap character-img-wrap">
              <img
                src={author.characterImage || author.avatar}
                alt="Alienverse Side Character: The Alien Mentor & Student"
                className="author-img character-spotlight-img"
              />
              <div className="author-badge-pill character-badge-pill">
                <Sparkles size={13} color="#000000" />
                <span>Alienverse: AI Software Engineering Standards</span>
              </div>
            </div>
          )}

          {/* Author Narrative Column */}
          <div className="author-content-col">
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.6rem" }}>
              <Feather size={14} color="var(--primary)" />
              <span className="section-tag" style={{ marginBottom: 0 }}>Author & Universe Creator</span>
            </div>

            <h2 className="author-name">{author.name}</h2>
            {author.title && (
              <p style={{ color: "var(--text-accent)", fontWeight: 600, fontSize: "1.05rem", marginBottom: "1.2rem" }}>
                {author.title}
              </p>
            )}

            {author.quote && (
              <blockquote className="author-quote-box">
                {author.quote}
              </blockquote>
            )}

            {author.bio ? (
              <p style={{ lineHeight: 1.7, fontSize: "0.98rem", marginBottom: "1.5rem" }}>
                {author.bio}
              </p>
            ) : (
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", fontStyle: "italic", marginBottom: "1.8rem", marginTop: "0.8rem" }}>
                Author details, biography, and upcoming releases will be added soon.
              </p>
            )}

            {/* Metrics */}
            {author.stats && author.stats.length > 0 && (
              <div className="author-stats-grid">
                {author.stats.map((st) => (
                  <div key={st.label} style={{ textAlign: "center" }}>
                    <div className="author-stat-value">{st.value}</div>
                    <div className="author-stat-lbl">{st.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Author Awards */}
            {author.awards && author.awards.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "1.8rem" }}>
                {author.awards.map((award, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.86rem", color: "var(--text-secondary)" }}>
                    <Sparkles size={13} color="#f59e0b" />
                    <span>{award}</span>
                  </div>
                ))}
              </div>
            )}

            <button
              className="btn-primary author-cta-btn"
              onClick={onSelectAuthorBook}
            >
              <BookOpen size={15} />
              <span>Explore "{author.signatureBook}"</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
