// src/components/ProductsNav.js
import { useState } from "react";
import { useActiveProductSection } from "../hooks/useActiveProductSection";

const navItems = [
  { id: "product-dashboard", label: "AI CFO Dashboard" },
  { id: "product-ar-ap", label: "AI AR/AP Module" },
  { id: "product-treasury", label: "AI Treasury Module" },
  { id: "product-sales-to-cash", label: "AI Sales to Cash Reconcilation" },
  { id: "product-tds", label: "AI TDS Reconcilation" },
];

export default function ProductsNav() {
  const active = useActiveProductSection();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    setIsOpen(false); // close menu on mobile after click
  };

  return (
    <nav className="products-nav-wrapper" style={{marginBottom:0}}>
      {/* Mobile header + hamburger */}
      <div className="products-nav-header">
        <span className="products-nav-title">Products</span>
        <button
          className="products-nav-hamburger"
          onClick={() => setIsOpen((open) => !open)}
          aria-label="Toggle products navigation"
        >
          ☰
        </button>
      </div>

      {/* Links row (desktop: always visible, mobile: toggled) */}
      <div
        className={`products-nav-inner ${
          isOpen ? "products-nav-inner-open" : ""
        }`}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleClick(item.id)}
            className={
              active === item.id
                ? "products-nav-link products-nav-link-active"
                : "products-nav-link"
            }
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
