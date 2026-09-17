import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, ShoppingBag, Star } from "lucide-react";

// Clamp & Lerp helper utilities
const clamp = (val, min, max) => Math.min(max, Math.max(min, val));
const lerp = (a, b, t) => a + (b - a) * t;
const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

// Organic tilts and floating rhythms per card
const ORGANIC_TILTS = [-3.8, 2.4, -1.8, 3.2, -2.1];
const FLOAT_DURATIONS = [5.2, 6.1, 5.7, 6.5, 5.9];

export default function BenchoBookCarousel({
  books,
  onPreviewBook,
  onAddToCart,
  spread = 114,
  depth = 135,
  sink = 100,
  settle = 0
}) {
  const containerRef = useRef(null);
  const slotsRef = useRef([]);
  const turnRef = useRef(0);
  const animFrameRef = useRef(0);
  const dragRef = useRef(null);

  const [isHeld, setIsHeld] = useState(false);
  const [activeBookIndex, setActiveBookIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute mobile-friendly responsive spread & dimensions
  const isMobile = windowWidth <= 480;
  const isTablet = windowWidth > 480 && windowWidth <= 768;
  const effectiveSpread = isMobile ? 64 : isTablet ? 86 : spread;
  const cardWidth = isMobile ? 140 : isTablet ? 170 : 210;
  const cardHeight = isMobile ? 205 : isTablet ? 250 : 305;
  const stageHeight = isMobile ? 250 : isTablet ? 290 : 345;

  const total = books.length;
  const PULL_FACTOR = isMobile ? 95 : 140;

  // Calculate 3D Ring transforms for all cards
  const updateCardTransforms = useCallback(() => {
    const currentTurn = turnRef.current;
    
    // Determine closest front card index
    let normalizedTurn = currentTurn % total;
    if (normalizedTurn < 0) normalizedTurn += total;
    const closestIndex = Math.round(normalizedTurn) % total;
    setActiveBookIndex(closestIndex);

    slotsRef.current.forEach((slot, i) => {
      if (!slot) return;
      const th = (i - currentTurn) * ((Math.PI * 2) / total);
      const f = (Math.cos(th) + 1) / 2;
      const x = Math.sin(th) * effectiveSpread;
      const y = -(1 - f) * (isMobile ? 20 : 30);
      const s = lerp(1 - clamp(depth, 0, 150) / 200, 1, f);
      const z = Math.round(f * 100);
      const tilt = ORGANIC_TILTS[i % ORGANIC_TILTS.length];

      slot.style.transform = `translate(-50%, -50%) translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) rotate(${tilt}deg) scale(${s.toFixed(4)})`;
      slot.style.zIndex = String(z);
      slot.style.opacity = String(0.7 + f * 0.3);
    });
  }, [total, effectiveSpread, depth, isMobile]);

  useLayoutEffect(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  // Smooth animation to a target turn
  const animateToTurn = (targetTurn) => {
    cancelAnimationFrame(animFrameRef.current);
    const startTurn = turnRef.current;
    if (startTurn === targetTurn) {
      updateCardTransforms();
      return;
    }
    const duration = 460;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      turnRef.current = lerp(startTurn, targetTurn, easeOutQuart(progress));
      updateCardTransforms();
      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      }
    };
    animFrameRef.current = requestAnimationFrame(tick);
  };

  const step = (delta) => {
    const nextTarget = Math.round(turnRef.current) + delta;
    animateToTurn(nextTarget);
  };

  const handleCardClick = (index) => {
    if (dragRef.current && dragRef.current.moved) return;
    
    const current = turnRef.current;
    let delta = (index - (current % total)) % total;
    if (delta > total / 2) delta -= total;
    if (delta < -total / 2) delta += total;

    if (Math.abs(delta) < 0.18) {
      onPreviewBook(books[index]);
    } else {
      animateToTurn(Math.round(current + delta));
    }
  };

  const handlePointerDown = (e) => {
    cancelAnimationFrame(animFrameRef.current);
    dragRef.current = {
      x0: e.clientX,
      turn0: turnRef.current,
      lastX: e.clientX,
      lastTime: e.timeStamp,
      vx: 0,
      moved: false,
    };
    setIsHeld(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.x0;
    if (!dragRef.current.moved && Math.abs(dx) > 3) {
      dragRef.current.moved = true;
    }
    const dt = Math.max(1, e.timeStamp - dragRef.current.lastTime);
    dragRef.current.vx = (dragRef.current.vx + (e.clientX - dragRef.current.lastX) / dt) / 2;
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastTime = e.timeStamp;

    turnRef.current = dragRef.current.turn0 - dx / PULL_FACTOR;
    updateCardTransforms();
  };

  const handlePointerUp = () => {
    if (!dragRef.current) return;
    const { vx } = dragRef.current;
    dragRef.current = null;
    setIsHeld(false);

    const momentum = clamp(-vx * 150 / PULL_FACTOR, -2, 2);
    const target = Math.round(turnRef.current + momentum);
    animateToTurn(target);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };

  const activeBook = books[activeBookIndex] || books[0];

  return (
    <div className="bencho-carousel-container" ref={containerRef}>
      {/* 3D Orbit Ring Stage */}
      <div className="car" style={{ height: `${stageHeight}px` }}>
        <div
          className="car-track"
          data-held={isHeld}
          role="region"
          aria-label="3D Orbital Book Stack Carousel"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {books.map((book, i) => (
            <div
              key={book.id}
              ref={(el) => (slotsRef.current[i] = el)}
              className="car-slot"
              style={{ width: `${cardWidth}px`, height: `${cardHeight}px` }}
              onClick={() => handleCardClick(i)}
            >
              <div
                className="car-float"
                style={{
                  animationDuration: `${FLOAT_DURATIONS[i % FLOAT_DURATIONS.length]}s`,
                  "--lift": isMobile ? "4px" : "6px",
                  "--sway": "1deg",
                }}
              >
                <BenchoCard
                  book={book}
                  sink={isMobile ? 50 : sink}
                  isHeld={isHeld}
                  corner={isMobile ? 14 : 18}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Orbit Navigation Controls & Active Book Bar */}
      <div className="carousel-control-hud">
        <button
          className="carousel-nav-btn"
          onClick={() => step(-1)}
          aria-label="Previous Book"
          title="Previous Book"
        >
          <ChevronLeft size={13} />
        </button>

        {/* Current Active Book Indicator Info */}
        <div className="active-book-info">
          <div className="active-book-meta">
            <span className="active-book-badge">{activeBook.badge}</span>
            <div className="active-book-rating">
              <Star size={10} fill="#e87a1e" color="#e87a1e" />
              <span>{activeBook.rating}</span>
            </div>
          </div>
          <h4 className="active-book-title">{activeBook.title}</h4>
          <p className="active-book-author">by {activeBook.author}</p>
        </div>

        <button
          className="carousel-nav-btn"
          onClick={() => step(1)}
          aria-label="Next Book"
          title="Next Book"
        >
          <ChevronRight size={13} />
        </button>
      </div>

      {/* Quick Actions for Currently Front Book */}
      <div className="active-book-actions">
        <button
          className="btn-secondary active-action-btn"
          onClick={() => onPreviewBook(activeBook)}
        >
          <Play size={11} fill="#075e4d" color="#075e4d" />
          <span>Preview</span>
        </button>

        <button
          className="btn-primary active-action-btn"
          onClick={() => onAddToCart(activeBook)}
        >
          <ShoppingBag size={11} />
          <span>Add ${activeBook.price.toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
}

// 3D Pointer Sink Card Component
function BenchoCard({ book, sink, isHeld, corner }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e) => {
    const el = cardRef.current;
    if (!el || isHeld) return;
    const rect = el.getBoundingClientRect();
    const nx = clamp(((e.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
    const ny = clamp(((e.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
    setTilt({ x: nx, y: ny });
    setIsHovered(true);
  };

  const handlePointerOut = (e) => {
    const el = cardRef.current;
    const next = e.relatedTarget;
    if (!el || !next || !(next instanceof Node) || !el.contains(next)) {
      setIsHovered(false);
      setTilt({ x: 0, y: 0 });
    }
  };

  const sinkFactor = clamp(sink, 0, 100) / 100;
  const maxTilt = sinkFactor * 11;
  const rx = isHovered ? -tilt.y * maxTilt : 0;
  const ry = isHovered ? tilt.x * maxTilt : 0;
  const tz = isHovered ? -8 * sinkFactor : 0;

  const sheenX = ((tilt.x + 1) / 2) * 100;
  const sheenY = ((tilt.y + 1) / 2) * 100;
  const sheenAlpha = isHovered ? sinkFactor * 0.4 : 0;

  return (
    <div
      ref={cardRef}
      className="car-card"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerOut}
      onPointerCancel={() => setIsHovered(false)}
      style={{
        borderRadius: `${corner}px`,
        backgroundImage: `url(${book.cover})`,
        transform: `translateZ(${tz.toFixed(1)}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`,
      }}
    >
      <span
        className="car-sheen"
        style={{
          borderRadius: `${corner}px`,
          backgroundImage: `
            radial-gradient(45% 40% at ${sheenX.toFixed(1)}% ${sheenY.toFixed(1)}%, rgba(255, 255, 255, ${sheenAlpha.toFixed(2)}) 0%, rgba(255, 255, 255, 0) 100%),
            radial-gradient(55% 45% at ${(100 - sheenX).toFixed(1)}% ${(100 - sheenY).toFixed(1)}%, rgba(0, 0, 0, ${(sheenAlpha * 0.5).toFixed(2)}) 0%, rgba(0, 0, 0, 0) 100%)
          `,
        }}
      />
      <div className="bencho-card-badge">{book.genre}</div>
    </div>
  );
}
