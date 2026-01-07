import { useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import CalBookingButton from "./DemoBookingButton";
import logo from "../assets/ScaleupCFO_transparent.png";

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
  <Link to="/" className="flex items-center gap-2 bg-black">
    <img src={logo} alt="ScaleupCFO logo" className="h-8 w-8" />
    <span className="font-bold text-white">ScaleupCFO AI</span>
  </Link>
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
            <li>
              <Link to="/about">About Us</Link>
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
            <li>
            <Link to="/about" onClick={() => setIsOpen(false)}>
              About Us
            </Link>
          </li>
        </ul>

        <div className="mt-6 md:hidden">
  <CalBookingButton
    title="Schedule Demo"
    module_name="Navbar scheduleDemo mobile"
    onClick={() => setIsOpen(false)}
    className="
      w-full
      rounded-xl
      bg-emerald-500
      py-4
      text-center
      font-semibold
      text-black
      hover:bg-emerald-400
      transition
    "
  />
</div>

      </div>
    </nav>
  );
}
