import React, { useState } from "react";
import { X, Trash2, Plus, Minus, ArrowRight, Tag, ShieldCheck, ShoppingBag } from "lucide-react";
import WhatsAppIcon from "./icons/WhatsAppIcon";

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onCheckout
}) {
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  if (!isOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "READ20") {
      setDiscountApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid code. Try 'READ20' for 20% off!");
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = discountApplied ? subtotal * 0.2 : 0;
  const shipping = subtotal > 35 || subtotal === 0 ? 0 : 4.99;
  const total = Math.max(0, subtotal - discount + shipping);

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-drawer-header">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ShoppingBag size={16} color="var(--primary)" />
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Your Bookbag</h3>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
            </span>
          </div>
          <button className="nav-icon-btn" onClick={onClose} aria-label="Close cart">
            <X size={15} />
          </button>
        </div>

        {/* Cart Items Body */}
        <div className="cart-drawer-body">
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 1rem", color: "var(--text-muted)" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.05)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                <ShoppingBag size={22} color="var(--text-muted)" />
              </div>
              <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                Your cart is empty
              </p>
              <p style={{ fontSize: "0.85rem", marginBottom: "1.5rem" }}>
                Looks like you haven't added any books yet.
              </p>
              <button
                className="btn-primary"
                onClick={() => {
                  onClose();
                  const el = document.getElementById("catalog");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Browse Books
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}-${item.selectedFormat || 'Standard'}`} className="cart-item">
                <img src={item.cover} alt={item.title} className="cart-item-img" />
                <div className="cart-item-info">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <h4 className="cart-item-title">{item.title}</h4>
                      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                        {item.selectedFormat || "Hardcover"} Edition &bull; by {item.author}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id, item.selectedFormat)}
                      style={{ color: "var(--text-muted)", transition: "color 0.2s ease" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                      title="Remove item"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  <div className="cart-quantity-row">
                    <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>

                    <div className="qty-controls">
                      <button
                        className="qty-btn"
                        onClick={() => onUpdateQty(item.id, item.selectedFormat, item.quantity - 1)}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: "0.85rem", fontWeight: 700, minWidth: "18px", textAlign: "center" }}>
                        {item.quantity}
                      </span>
                      <button
                        className="qty-btn"
                        onClick={() => onUpdateQty(item.id, item.selectedFormat, item.quantity + 1)}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="cart-promo-row">
              <input
                type="text"
                placeholder="Discount code (try READ20)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="promo-input"
              />
              <button type="submit" className="promo-btn">
                Apply
              </button>
            </form>
            {discountApplied && (
              <p style={{ fontSize: "0.8rem", color: "#10b981", marginBottom: "0.8rem" }}>
                ✓ 20% Readers Guild discount applied!
              </p>
            )}
            {promoError && (
              <p style={{ fontSize: "0.8rem", color: "#ef4444", marginBottom: "0.8rem" }}>
                {promoError}
              </p>
            )}

            {/* Calculations */}
            <div className="cart-summary-line">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {discountApplied && (
              <div className="cart-summary-line" style={{ color: "#10b981" }}>
                <span>Discount (READ20)</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="cart-summary-line">
              <span>Estimated Shipping</span>
              <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
            </div>

            <div className="cart-total-line">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              className="btn-primary btn-checkout-whatsapp"
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "0.85rem 1rem",
                gap: "8px"
              }}
              onClick={() => onCheckout({ subtotal, discount, discountApplied, promoCode, shipping, total })}
            >
              <WhatsAppIcon size={17} />
              <span>Proceed to Checkout</span>
              <ArrowRight size={15} />
            </button>

            <div className="cart-checkout-wa-note">
              <span>Orders sent via WhatsApp to <strong>+91 97458 82435</strong> with book details & cover</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "0.6rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
              <ShieldCheck size={13} color="#10b981" />
              <span>256-Bit SSL Encrypted &bull; 30-Day Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
