import { useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import CalBookingButton from "./DemoBookingButton";
import logo from "../assets/darklogo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <div className="nav-inner">
        {/* LEFT SIDE */}
        <div className="nav-left">
          {/* Hamburger (mobile only) */}
          <button
            className="hamburger"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? "✕" : "☰"}
          </button>

          {/* Logo */}
          <div className="logo">
            <img src={logo} alt="ScaleupCFO logo" />
            <span>ScaleupCFO AI</span>
          </div>

          {/* Desktop Navigation */}
          <ul className="nav-links-desktop">
            <li>
              <HashLink smooth to="/#products">Products</HashLink>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <HashLink smooth to="/#comparison">Why Us</HashLink>
            </li>
            <li>
              <HashLink smooth to="/#resources">Resources</HashLink>
            </li>
          </ul>
        </div>

        {/* RIGHT SIDE CTA (desktop only) */}
        <div className="nav-ctas">
          <CalBookingButton
            title="Schedule Demo"
            module_name="Navbar scheduleDemo"
            className="btn-primary-nav"
          />
        </div>
      </div>

      {/* MOBILE SLIDE MENU (LEFT) */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <ul className="nav-links-mobile">
          <li>
            <HashLink smooth to="/#products" onClick={() => setIsOpen(false)}>
              Products
            </HashLink>
          </li>
          <li>
            <Link to="/services" onClick={() => setIsOpen(false)}>
              Services
            </Link>
          </li>
          <li>
            <HashLink smooth to="/#comparison" onClick={() => setIsOpen(false)}>
              Why Us
            </HashLink>
          </li>
          <li>
            <HashLink smooth to="/#resources" onClick={() => setIsOpen(false)}>
              Resources
            </HashLink>
          </li>
        </ul>

        <CalBookingButton
          title="Schedule Demo"
          module_name="Navbar scheduleDemo mobile"
          className="btn-primary-nav"
          onClick={() => setIsOpen(false)}
        />
      </div>
    </nav>
  );
}
