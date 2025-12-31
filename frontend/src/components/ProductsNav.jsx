import { useState, useEffect } from "react";
import { useActiveProductSection } from "../hooks/useActiveProductSection";

const navItems = [
  { id: "product-dashboard", label: "AI CFO Dashboard" },
  { id: "product-ar-ap", label: "AI AR/AP Module" },
  { id: "product-treasury", label: "AI Treasury Module" },
  { id: "product-sales-to-cash", label: "AI Sales to Cash Reconciliation" },
  { id: "product-tds", label: "AI TDS Reconciliation" },
];

export default function ProductsNav() {
  const active = useActiveProductSection();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`products-nav-wrapper ${scrolled ? "scrolled" : ""}`}>
      {/* Mobile header */}
      <div className="products-nav-header">
        <span className="products-nav-title" style={{ color: "white" }}>Products</span>
        <button
          className="products-nav-hamburger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle products navigation"
        >
          ☰
        </button>
      </div>

      {/* Links row */}
      <div
  className={`products-nav-inner ${isOpen ? "products-nav-inner-open" : ""}`}
  style={{
    display: isOpen ? "flex" : "none",
    flexDirection: "column",
    gap: "0.75rem",
    padding: "1rem",
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    background: "rgba(0,0,0,0.9)", // ← transparent black background
    color: "white",                // ← white text
    borderTop: "none",
    boxShadow: "none",
    zIndex: 10,
    backdropFilter: "blur(12px)",       // optional depth effect
    WebkitBackdropFilter: "blur(12px)", // Safari support
  }}
>
  {navItems.map((item) => {
    const isActive = active === item.id;
    return (
      <button
        key={item.id}
        type="button"
        onClick={() => handleClick(item.id)}
        className={`products-nav-link ${isActive ? "products-nav-link-active" : ""}`}
        style={{
          color: "white",
          background: "transparent",
          textAlign: "left",
          padding: "1rem",
          borderRadius: "0.75rem",
          fontWeight: isActive ? "600" : "500",
          borderLeft: isActive ? "3px solid #34D399" : "none",
          textShadow: isActive ? "0 0 12px rgba(52, 211, 153, 0.6)" : "none",
        }}
      >
        {item.label}
      </button>
    );
  })}
</div>
    </nav>
  );
}