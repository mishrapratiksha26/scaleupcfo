import { useState } from "react";
import logo from "../assets/cfologo.png"
const GMEET_BOOKING_URL = "https://calendar.app.google/68pzDLFzNKqkoAgUA";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="ScaleupCFO logo" className="logo-image" />
        <span>ScaleupCFO</span>
      </div>

      {/* Hamburger button (visible on mobile) */}
      <button
        className="hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><a href="#platform">Platform</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#comparison">Why Us</a></li>
        {/* <li><a href="#security">Security</a></li> */}
        <li><a href="#resources">Resources</a></li>
      </ul>

      <div className="nav-ctas">
        <a 
          href={GMEET_BOOKING_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-secondary-nav"
        >
          Schedule Demo
        </a>
      </div>
    </nav>
  );
}
