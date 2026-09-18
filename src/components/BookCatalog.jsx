import React, { useState } from "react";
import { Star, Eye, Plus, Check, Heart, Search, X, BookOpen, RotateCw } from "lucide-react";
import { GENRES } from "../data/bookData";

export default function BookCatalog({
  books,
  selectedGenre,
  onSelectGenre,
  searchQuery,
  onSearchChange,
  wishlist,
  onToggleWishlist,
  cart,
  onAddToCart,
  onPreviewBook,
  searchInputRef
}) {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleCardFlip = (bookId) => {
    setFlippedCards((prev) => ({
      ...prev,
      [bookId]: !prev[bookId]
    }));
  };

  const filteredBooks = books.filter((book) => {
    const matchesGenre =
      selectedGenre === "All Books" || book.genre.toLowerCase() === selectedGenre.toLowerCase();
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <section id="catalog" className="catalog-section">
      <div className="container">
        {/* Section Title */}
        <div className="section-header">
          <div className="section-tag">Curated Collections</div>
          <h2 className="section-title">Discover Your Next Obsession</h2>
          <p className="section-desc">
            Explore our curated catalog of award-winning science fiction, provocative non-fiction, and timeless philosophical reflections.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="filter-bar">
          <div className="genre-pills">
            {GENRES.map((genre) => (
              <button
                key={genre}
                className={`genre-pill ${selectedGenre === genre ? "active" : ""}`}
                onClick={() => onSelectGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>

          <div className="search-box">
            <Search size={17} className="search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              className="search-input"
              placeholder="Search title, author, genre..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                }}
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Books Grid */}
        {books.length === 0 ? (
          <div className="catalog-empty-card">
            <div className="catalog-empty-icon-wrap">
              <BookOpen size={28} />
            </div>
            <h3 className="catalog-empty-title">Catalog Updating Soon</h3>
            <p className="catalog-empty-desc">
              All books have been temporarily archived as we prepare our next seasonal drop of hand-curated literature and rare editions.
            </p>
            <a href="#newsletter" className="btn-primary" style={{ marginTop: "1.2rem", display: "inline-flex" }}>
              Get Launch Notified
            </a>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 1rem", color: "var(--text-muted)" }}>
            <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
              No books found matching "<strong>{searchQuery}</strong>"
            </p>
            <button
              className="btn-secondary"
              onClick={() => {
                onSearchChange("");
                onSelectGenre("All Books");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="books-grid">
            {filteredBooks.map((book) => {
              const isWishlisted = wishlist.includes(book.id);
              const isInCart = cart.some((item) => item.id === book.id);

              return (
                <article key={book.id} className="book-card">
                  {/* Book Cover */}
                  <div
                    className="book-cover-container"
                    onClick={() => onPreviewBook(book)}
                    title="Click for quick preview"
                  >
                    <img
                      src={flippedCards[book.id] && book.backCover ? book.backCover : book.cover}
                      alt={`${book.title} ${flippedCards[book.id] ? "Back Cover" : "Front Cover"}`}
                      className="book-cover-img"
                      loading="lazy"
                    />
                    <span className="book-badge">{book.badge}</span>

                    {book.backCover && (
                      <button
                        type="button"
                        className="card-cover-flip-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCardFlip(book.id);
                        }}
                        title={`Flip to ${flippedCards[book.id] ? "Front Cover" : "Back Cover"}`}
                        aria-label="Flip cover"
                      >
                        <RotateCw size={11} />
                        <span>{flippedCards[book.id] ? "Front" : "Back"}</span>
                      </button>
                    )}

                    <button
                      type="button"
                      className={`wishlist-toggle-btn ${isWishlisted ? "active" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(book);
                      }}
                      title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
                      aria-label="Toggle Wishlist"
                    >
                      <Heart
                        size={14}
                        fill={isWishlisted ? "#ec4899" : "none"}
                        color={isWishlisted ? "#ec4899" : "currentColor"}
                      />
                    </button>
                  </div>

                  {/* Book Details */}
                  <div className="book-info">
                    <div className="book-meta-top">
                      <span className="book-genre-label">{book.genre}</span>
                      <div className="book-rating">
                        <Star size={11} fill="#f59e0b" />
                        <span>{book.rating}</span>
                        <span className="book-review-count" style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
                          ({book.reviewCount})
                        </span>
                      </div>
                    </div>

                    <h3
                      className="book-title"
                      style={{ cursor: "pointer" }}
                      onClick={() => onPreviewBook(book)}
                    >
                      {book.title}
                    </h3>
                    <p className="book-author">by {book.author}</p>

                    {/* Format Chips */}
                    <div className="book-formats-list">
                      {book.formats.map((fmt) => (
                        <span key={fmt} className="format-chip">
                          {fmt}
                        </span>
                      ))}
                    </div>

                    {/* Pricing & Actions */}
                    <div className="book-card-bottom">
                      <div className="book-price-wrap">
                        <span className="current-price">${book.price.toFixed(2)}</span>
                        {book.originalPrice && (
                          <span className="original-price">
                            ${book.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <div className="card-actions">
                        <button
                          className="btn-card-preview"
                          onClick={() => onPreviewBook(book)}
                          title="View summary and excerpt"
                        >
                          <Eye size={12} style={{ marginRight: "3px", verticalAlign: "middle" }} />
                          Preview
                        </button>

                        <button
                          className="btn-card-cart"
                          onClick={() => onAddToCart(book)}
                          title={isInCart ? "Added to cart" : "Add to cart"}
                          aria-label="Add to cart"
                        >
                          {isInCart ? <Check size={13} /> : <Plus size={13} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
