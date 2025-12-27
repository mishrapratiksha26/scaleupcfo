// src/components/ProductsNav.js
import { useState } from "react";
import { useActiveProductSection } from "../hooks/useActiveProductSection";

const navItems = [
  { id: "product-dashboard", label: "Dashboard" },
  { id: "product-ar-ap", label: "AR / AP" },
  { id: "product-treasury", label: "Treasury" },
  { id: "product-sales-to-cash", label: "Sales to Cash" },
  { id: "product-tds", label: "TDS" },
];

export default function ProductsNav() {
  const active = useActiveProductSection();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsOpen(false); // close menu on mobile after click
  };

  return (
    <nav className="products-nav-wrapper">
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
