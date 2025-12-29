import { useState } from "react";
import logo from "../assets/cfologo.png"
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import CalBookingButton from "./DemoBookingButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="ScaleupCFO logo" className="logo-image" />
        <span><a href="https://scaleupcfo.in/">ScaleupCFO AI</a></span>
      </div>

      {/* DESKTOP LINKS - Always visible on large screens */}
      <ul className="nav-links-desktop">
        <li><HashLink smooth to="/#products">Products</HashLink></li>
        <li><Link to="/services">Services</Link></li>
        <li><HashLink smooth to="/#comparison">Why Us</HashLink></li>
        <li><HashLink smooth to="/#resources">Resources</HashLink></li>
      </ul>

      {/* HAMBURGER - Only visible on mobile */}
      <button
        className="hamburger ml-auto"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      {/* MOBILE MENU - Hidden by default */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <ul className="nav-links-mobile">
          <li><HashLink smooth to="/#products">Products</HashLink></li>
          <li><Link to="/services">Services</Link></li>
          <li><HashLink smooth to="/#comparison">Why Us</HashLink></li>
          <li><HashLink smooth to="/#resources">Resources</HashLink></li>
        </ul>
      </div>

      {/* CTA - Always visible */}
      <div className="nav-ctas">
        <CalBookingButton
        title="Schedule Demo"
        paramName="Navbar scheduleDemo"
        className="btn-primary-nav"/>
      </div>
    </nav>
  );
}
