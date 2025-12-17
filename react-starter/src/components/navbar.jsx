import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      {/* Logo */}
      <div className="logo">ScaleupCFO</div>

      {/* Hamburger button (visible on mobile) */}
      <button
        className="hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      {/* Nav links */}
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><a href="#platform">Platform</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#comparison">Why Us</a></li>
        <li><a href="#security">Security</a></li>
        <li><a href="#resources">Resources</a></li>
      </ul>

      {/* CTA buttons */}
      <div className="nav-ctas">
        <button className="btn-secondary-nav">Schedule Demo</button>
        <button className="btn-primary-nav">Start Free Trial</button>
      </div>
    </nav>
  );
}