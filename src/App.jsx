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
import WhatsAppIcon from "./components/icons/WhatsAppIcon";

const WHATSAPP_PHONE = "919745882435";
const WHATSAPP_DISPLAY_PHONE = "+91 97458 82435";

const getAbsoluteAssetUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const baseUrl = "https://bolsterai002.github.io/bolster-page";
  const cleanPath = path.replace(/^\/?(bolster-page\/)?/, "");
  return `${baseUrl}/${cleanPath}`;
};

export default function App() {
  const [books] = useState(BOOKS_DATA);
  const [selectedGenre, setSelectedGenre] = useState("All Books");
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
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

  // Checkout execution with WhatsApp messaging
  const handleCheckout = (checkoutSummary = {}) => {
    if (cart.length === 0) return;

    const randomOrderNum = "ALN-" + Math.floor(100000 + Math.random() * 900000);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = checkoutSummary.subtotal ?? cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discount = checkoutSummary.discount ?? 0;
    const promoCode = checkoutSummary.promoCode || "";
    const shipping = checkoutSummary.shipping ?? (subtotal > 35 || subtotal === 0 ? 0 : 4.99);
    const total = checkoutSummary.total ?? Math.max(0, subtotal - discount + shipping);

    const formattedDate = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });

    const itemsText = cart
      .map((item, idx) => {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        const frontCover = getAbsoluteAssetUrl(item.cover);
        const backCover = item.backCover ? getAbsoluteAssetUrl(item.backCover) : null;

        const lines = [
          `*${idx + 1}. ${item.title}*`,
          `   ✍️ *Author:* ${item.author || "Arshak Roshan"}`,
          `   🏷️ *Format:* ${item.selectedFormat || "Hardcover"} Edition`,
          `   🔢 *Quantity:* ${item.quantity}`,
          `   💵 *Unit Price:* $${item.price.toFixed(2)} (Subtotal: $${itemTotal})`,
        ];

        if (frontCover) {
          lines.push(`   🖼️ *Cover Photo:* ${frontCover}`);
        }
        if (backCover) {
          lines.push(`   📖 *Back Cover:* ${backCover}`);
        }

        return lines.join("\n");
      })
      .join("\n\n");

    const messageLines = [
      `🛒 *NEW BOOK ORDER - Alienverse*`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `📋 *Order Ref:* ${randomOrderNum}`,
      `📅 *Date:* ${formattedDate}`,
      ``,
      `📚 *ORDERED BOOKS (${itemCount} Item${itemCount > 1 ? "s" : ""}):*`,
      `────────────────────`,
      itemsText,
      `────────────────────`,
      `💰 *Items Subtotal:* $${subtotal.toFixed(2)}`,
    ];

    if (discount > 0) {
      messageLines.push(`🎟️ *Discount (${promoCode || "READ20"}):* -$${discount.toFixed(2)}`);
    }

    messageLines.push(
      `🚚 *Shipping:* ${shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}`,
      `💳 *TOTAL PAYABLE:* $${total.toFixed(2)}`,
      `━━━━━━━━━━━━━━━━━━━━`,
      ``,
      `💬 *Customer Note:*`,
      `Hello! I would like to purchase the book order above from Alienverse. Please confirm availability and share payment/delivery options. Thank you!`
    );

    const fullMessage = messageLines.join("\n");
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(fullMessage)}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setCart([]);
    setIsCartOpen(false);
    setOrderConfirmed({
      orderId: randomOrderNum,
      itemCount,
      total: total.toFixed(2),
      whatsappUrl,
      whatsappNumber: WHATSAPP_DISPLAY_PHONE,
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
            const authorBook = books.find((b) => b.author?.toLowerCase().includes("arshak") || b.author?.toLowerCase().includes("roshan")) || books[0];
            if (authorBook) {
              setPreviewBook(authorBook);
            } else {
              addToast("New editions will be available soon!");
            }
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
              <div className="success-icon-circle" style={{ background: "rgba(34, 197, 94, 0.15)", color: "#22c55e" }}>
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ fontSize: "1.7rem", marginBottom: "0.5rem" }}>Order Sent to WhatsApp!</h3>
              <p style={{ color: "var(--text-secondary)", marginBottom: "1.1rem", fontSize: "0.93rem", lineHeight: 1.5 }}>
                Your order receipt, book details, and cover photo have been generated and sent to WhatsApp.
              </p>
              <div style={{ background: "rgba(255, 255, 255, 0.04)", padding: "1.1rem", borderRadius: "12px", marginBottom: "1.4rem", border: "1px solid var(--border-subtle)", textAlign: "left" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Order Reference</span>
                  <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "0.5px" }}>{orderConfirmed.orderId}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Recipient WhatsApp</span>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#22c55e" }}>{orderConfirmed.whatsappNumber}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-subtle)", paddingTop: "8px", marginTop: "4px" }}>
                  <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Total ({orderConfirmed.itemCount} item{orderConfirmed.itemCount > 1 ? "s" : ""})</span>
                  <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>${orderConfirmed.total}</span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <a
                  href={orderConfirmed.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary btn-checkout-whatsapp"
                  style={{ width: "100%", justifyContent: "center", textDecoration: "none", padding: "0.85rem" }}
                >
                  <WhatsAppIcon size={18} />
                  <span>Open WhatsApp Chat</span>
                </a>
                <button
                  className="btn-secondary"
                  style={{ width: "100%", justifyContent: "center", padding: "0.75rem" }}
                  onClick={() => setOrderConfirmed(null)}
                >
                  Continue Browsing
                </button>
              </div>
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
