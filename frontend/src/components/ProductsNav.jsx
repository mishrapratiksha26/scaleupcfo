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
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    setIsOpen(false); // close menu on mobile after click
  };

  return (
    <nav className={`products-nav-wrapper ${scrolled ? "scrolled" : ""}`}>
      {/* Mobile header */}
      <div className="products-nav-header">
        <span className="products-nav-title">Products</span>
        <button
          className="products-nav-hamburger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle products navigation"
        >
          ☰
        </button>
      </div>

      {/* Links row */}
      <div className={`products-nav-inner ${isOpen ? "products-nav-inner-open" : ""}`}>
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleClick(item.id)}
              style={{
                // ALL nav link styles INLINE
                background: 'none',
                cursor: 'pointer',
                fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                color: isActive ? '#34D399' : 'white',
                padding: '0.5rem 0.75rem',
                borderBottom: isActive ? '2px solid #34D399' : '2px solid transparent',
                transition: 'all 0.3s ease',
                fontWeight: isActive ? '600' : '500',
                textShadow: isActive ? '0 0 12px rgba(52, 211, 153, 0.6)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#34D399';
                  e.currentTarget.style.textShadow = '0 0 12px rgba(52, 211, 153, 0.6)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.textShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
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
