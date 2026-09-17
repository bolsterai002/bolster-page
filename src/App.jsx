import React, { useState, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BookCatalog from "./components/BookCatalog";
import BookModal from "./components/BookModal";
import CartDrawer from "./components/CartDrawer";
import AuthorSpotlight from "./components/AuthorSpotlight";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import MorphSurface from "@/components/smoothui/morph-surface";
import { BOOKS_DATA } from "./data/bookData";
import { CheckCircle2, ShoppingBag, Heart, Sparkles, X } from "lucide-react";

export default function App() {
  const [books] = useState(BOOKS_DATA);
  const [selectedGenre, setSelectedGenre] = useState("All Books");
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState(["alienverse"]);
  const [cart, setCart] = useState([
    {
      ...BOOKS_DATA[0],
      quantity: 1,
      selectedFormat: "Hardcover"
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [previewBook, setPreviewBook] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  const searchInputRef = useRef(null);

  // Trigger toast
  const addToast = (text, icon = <CheckCircle2 size={15} color="#10b981" />) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, text, icon }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  // Add to cart
  const handleAddToCart = (book) => {
    const format = book.selectedFormat || "Hardcover";
    setCart((prev) => {
      const existing = prev.find((item) => item.id === book.id && item.selectedFormat === format);
      if (existing) {
        return prev.map((item) =>
          item.id === book.id && item.selectedFormat === format
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...book, selectedFormat: format, quantity: 1 }];
      }
    });
    addToast(`Added "${book.title}" (${format}) to your cart!`, <ShoppingBag size={15} color="var(--primary)" />);
  };

  // Update cart item quantity
  const handleUpdateQty = (id, format, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(id, format);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedFormat === format
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  // Remove from cart
  const handleRemoveFromCart = (id, format) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.selectedFormat === format)));
    addToast("Item removed from cart");
  };

  // Toggle wishlist
  const handleToggleWishlist = (book) => {
    if (wishlist.includes(book.id)) {
      setWishlist((prev) => prev.filter((id) => id !== book.id));
      addToast(`Removed "${book.title}" from Wishlist`);
    } else {
      setWishlist((prev) => [...prev, book.id]);
      addToast(`Saved "${book.title}" to your Wishlist!`, <Heart size={15} color="#ec4899" fill="#ec4899" />);
    }
  };

  // Checkout execution
  const handleCheckout = () => {
    const randomOrderNum = "ALN-" + Math.floor(100000 + Math.random() * 900000);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCart([]);
    setIsCartOpen(false);
    setOrderConfirmed({
      orderId: randomOrderNum,
      itemCount
    });
  };

  // Scroll to search
  const handleSearchNavClick = () => {
    const el = document.getElementById("catalog");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        if (searchInputRef.current) searchInputRef.current.focus();
      }, 400);
    }
  };

  const featuredBook = books[0];

  return (
    <div className="app-layout">
      {/* Background Animated Orbs */}
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-orb orb-1"></div>
        <div className="ambient-orb orb-2"></div>
        <div className="ambient-orb orb-3"></div>
      </div>

      {/* Navigation */}
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onSearchClick={handleSearchNavClick}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero
          books={books}
          onPreviewBook={(book) => setPreviewBook(book)}
          onAddToCart={handleAddToCart}
        />

        {/* Catalog & Filter Section */}
        <BookCatalog
          books={books}
          selectedGenre={selectedGenre}
          onSelectGenre={(genre) => setSelectedGenre(genre)}
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          cart={cart}
          onAddToCart={handleAddToCart}
          onPreviewBook={(book) => setPreviewBook(book)}
          searchInputRef={searchInputRef}
        />

        {/* Author Spotlight */}
        <AuthorSpotlight
          onSelectAuthorBook={() => {
            const authorBook = books.find((b) => b.author.includes("Elena Vance")) || books[0];
            setPreviewBook(authorBook);
          }}
        />

        {/* Reader Testimonials */}
        <Testimonials />

        {/* Readers Club Newsletter */}
        <Newsletter
          onSubscribeSuccess={(email) => {
            addToast(`Voucher READ20 unlocked for ${email}!`, <Sparkles size={15} color="#f59e0b" />);
          }}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Book Preview Modal */}
      <BookModal
        book={previewBook}
        isOpen={!!previewBook}
        onClose={() => setPreviewBook(null)}
        onAddToCart={(item) => {
          handleAddToCart(item);
        }}
        isInCart={previewBook ? cart.some((c) => c.id === previewBook.id) : false}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      {/* Order Confirmation Modal */}
      {orderConfirmed && (
        <div className="modal-overlay" onClick={() => setOrderConfirmed(null)}>
          <div className="modal-content" style={{ maxWidth: "480px" }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setOrderConfirmed(null)}>
              <X size={15} />
            </button>
            <div className="checkout-success-box">
              <div className="success-icon-circle">
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>Order Confirmed!</h3>
              <p style={{ color: "var(--text-secondary)", marginBottom: "1rem", fontSize: "0.95rem" }}>
                Thank you for supporting literature and authors. Your order has been placed successfully.
              </p>
              <div style={{ background: "rgba(255, 255, 255, 0.04)", padding: "1rem", borderRadius: "10px", marginBottom: "1.5rem", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "4px" }}>Order Reference Number</div>
                <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "1px" }}>{orderConfirmed.orderId}</div>
                <div style={{ fontSize: "0.8rem", color: "#10b981", marginTop: "4px" }}>{orderConfirmed.itemCount} book(s) dispatched for shipping</div>
              </div>
              <button
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => setOrderConfirmed(null)}
              >
                Continue Exploring
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SmoothUI MorphSurface AI Concierge Dock */}
      <MorphSurface
        books={books}
        onSelectBook={(book) => setPreviewBook(book)}
      />

      {/* Toast Notifications */}
      <div className="toast-wrap" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast">
            {toast.icon}
            <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>{toast.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
